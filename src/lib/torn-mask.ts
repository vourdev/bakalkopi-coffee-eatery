import type { CSSProperties } from "react";

// Tepi sobek foto. Tiap tepi menghasilkan dua SVG data-URI dari geometri dan noise yang sama:
// "mask" memotong kontur foto (CSS mask-image, lihat @utility torn-* di globals.css),
// "paint" adalah cat kuas di atas krem dan tepi foto (TornPaint, di luar topeng). Foto tidak didistorsi.

const LENGTH = 1000;
// Data-URI tidak bisa membaca variabel CSS, jadi warna cat ditulis di sini.
const INK = "#22170f";
const PAPER = "#ffffff";

// PRNG berbenih: geometri tetap, server dan klien identik.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];
/** [pusat, lebar, kekuatan], pusat dan lebar dalam pecahan panjang tepi (0 = atas/kiri). */
export type Zone = readonly [number, number, number];
export interface TornLayer {
  mask: string;
  paint: string;
}

// Catmull-Rom melalui titik kendali berjarak sama.
function spline(pts: readonly number[], t: number) {
  const n = pts.length - 1;
  const x = Math.min(Math.max(t, 0), 1) * n;
  const i = Math.min(Math.floor(x), n - 1);
  const f = x - i;
  const p0 = pts[Math.max(i - 1, 0)];
  const p1 = pts[i];
  const p2 = pts[i + 1];
  const p3 = pts[Math.min(i + 2, n)];
  return 0.5 * (2 * p1 + (p2 - p0) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f + (3 * p1 - p0 - 3 * p2 + p3) * f * f * f);
}

const zoneAt = (zones: readonly Zone[], t: number) =>
  Math.min(1, zones.reduce((s, [c, w, k]) => s + k * Math.exp(-(((t - c) / w) ** 2)), 0));

interface Noise {
  /** Frekuensi displacement [melintang, sepanjang] tepi. */
  shred: [number, number];
  scale: number;
}

export type Side = "left" | "top" | "bottom";

// Semua hitungan memakai sumbu tepi kiri: u = jarak dari sisi krem, v = sepanjang tepi. Atas menukar sumbu, bawah juga dicerminkan.
function svgWriter(side: Side, depth: number, seed: number, noise: Noise) {
  const xy = ([u, v]: Pt) =>
    side === "left" ? `${Math.round(u)},${Math.round(v)}` : `${Math.round(v)},${Math.round(side === "top" ? u : depth - u)}`;
  const poly = (pts: Pt[]) => `M${pts.map(xy).join("L")}Z`;
  const [w, h] = side === "left" ? [depth, LENGTH] : [LENGTH, depth];
  const region = `x='-200' y='-200' width='${w + 400}' height='${h + 400}'`;
  const freq = ([a, b]: [number, number]) => (side === "left" ? `${a} ${b}` : `${b} ${a}`);
  const shred =
    `<feTurbulence type='fractalNoise' baseFrequency='${freq(noise.shred)}' numOctaves='4' seed='${seed}' result='n'/>` +
    `<feDisplacementMap in2='n' scale='${noise.scale.toFixed(1)}' xChannelSelector='R' yChannelSelector='G'`;
  // Filter t: serat sobek halus. Hanya untuk kontur dan pita; bentuk tipis (bulu, olesan) tercabik bila ikut.
  const defs = `<filter id='t' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB' ${region}>${shred} in='SourceGraphic'/></filter>`;

  const wrap = (body: string) => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'>${defs}${body}</svg>`;
    // Escape minimal: di dalam url("...") hanya % # < > yang wajib; koma dan spasi dibiarkan agar tidak membengkak 3x.
    return `url("data:image/svg+xml,${svg.replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E")}")`;
  };
  return { poly, region, wrap };
}

// Pita yang menempel di kontur di bagian yang lebarnya cukup; [u, v, lebar] per titik.
function bands(rows: Array<[number, number, number]>, offset = 0): Pt[][] {
  const out: Pt[][] = [];
  let cur: Array<[number, number, number]> = [];
  const flush = () => {
    if (cur.length > 2) {
      out.push([...cur.map(([u, v]) => [u + offset - 0.6, v] as Pt), ...cur.reverse().map(([u, v, w]) => [u + offset + w, v] as Pt)]);
    }
    cur = [];
  };
  for (const row of rows) {
    if (row[2] > 0.3) cur.push(row);
    else flush();
  }
  flush();
  return out;
}

// Gumpalan elips yang memanjang searah garis singgung (slope = du/dv).
function dab(rand: () => number, u: number, v: number, along: number, across: number, slope: number): Pt[] {
  const n = Math.hypot(slope, 1);
  const [tu, tv] = [slope / n, 1 / n];
  const [nu, nv] = [1 / n, -slope / n];
  return Array.from({ length: 8 }, (_, k) => {
    const a = (k / 8) * Math.PI * 2;
    const r = 0.6 + rand() * 0.55;
    const ca = (Math.cos(a) * along) / 2;
    const sa = (Math.sin(a) * across) / 2;
    return [u + (tu * ca + nu * sa) * r, v + (tv * ca + nv * sa) * r] as Pt;
  });
}

// Sapuan kuas kering: beberapa bulu tipis sejajar yang putus-putus, berpangkal di tepi foto dan condong ke krem.
function bristles(rand: () => number, u: number, v: number, len: number, wid: number, slope: number, out: number): Pt[][] {
  const n = Math.hypot(slope, 1);
  const [tu, tv] = [slope / n - out, 1 / n];
  const m = Math.hypot(tu, tv);
  const [du, dv] = [tu / m, tv / m];
  const at = (q: number, off: number, w: number): [Pt, Pt] => {
    const [cu, cv] = [u + du * len * q + dv * off, v + dv * len * q - du * off];
    return [[cu + dv * w, cv - du * w], [cu - dv * w, cv + du * w]];
  };
  const pieces: Pt[][] = [];
  const count = 4 + Math.floor(rand() * 6);
  for (let b = 0; b < count; b++) {
    const off = (rand() - 0.5) * wid;
    // Bulu pinggir lebih pendek, jadi ujung sapuan meruncing.
    const end = (0.55 + rand() * 0.45) * (1 - (Math.abs(off) / wid) * 0.8);
    for (let s = rand() * 0.12; s < end; ) {
      const e = Math.min(end, s + 0.12 + rand() * 0.4);
      const hw = 0.8 + rand() * 2.2;
      const ends = [s, (2 * s + e) / 3, (s + 2 * e) / 3, e].map((q, k) => at(q, off, hw * (k % 3 ? 1 : 0.3) * (1 - q * 0.5)));
      pieces.push([...ends.map(([l]) => l), ...ends.map(([, r]) => r).reverse()]);
      s = e + 0.03 + rand() * 0.12;
    }
  }
  return pieces;
}

const dot = (rand: () => number, u: number, v: number, r: number): Pt[] =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (k / 6) * Math.PI * 2 + rand() * 0.6;
    const rr = r * (0.6 + rand() * 0.6);
    return [u + Math.cos(a) * rr, v + Math.sin(a) * rr * 1.4] as Pt;
  });

interface RipOptions {
  depth: number;
  seed: number;
  /** Posisi tepi (pecahan depth, 0 = sisi krem) di titik berjarak sama sepanjang tepi: siluet gelombang besar. */
  shape: readonly number[];
  /** Zona sobek kasar; di luarnya garis relatif bersih. */
  rough?: readonly Zone[];
  /** Zona gumpalan kuas gelap di krem. */
  ink?: readonly Zone[];
  /** Zona serat kertas putih di tepi foto. */
  paper?: readonly Zone[];
  /** Zona garis gelap tipis di tepi foto. */
  rim?: readonly Zone[];
  /** Tebal garis tepi gelap, pecahan depth. */
  rimWidth?: number;
  /** Ujung atas strip kiri [v rendah, v tinggi, u lompatan]: tepi atas foto yang turun sedikit di dekat sudut. */
  top?: readonly [number, number, number];
}

/** Siluet bergelombang dengan sobekan dan gumpalan kuas kering: tepi foto hero. */
export function ripEdge(side: Side, o: RipOptions): TornLayer {
  const D = o.depth;
  const rand = mulberry32(o.seed);
  const t = (v: number) => v / LENGTH;
  const base = (v: number) => D * spline(o.shape, t(v));
  const slope = (v: number) => (base(v + 6) - base(v - 6)) / 12;
  const rough = (v: number) => 0.2 + 0.8 * zoneAt(o.rough ?? [], t(v));
  const paper = (v: number) => zoneAt(o.paper ?? [], t(v));
  const rim = (v: number) => zoneAt(o.rim ?? [], t(v));

  // Kontur bergumpal: kadang 1-3 titik berturut digeser searah, jadi sobekan berbentuk bongkah, bukan bulu.
  const contour: Pt[] = [];
  let run = 0;
  let runOff = 0;
  for (let v = -60; v <= LENGTH + 60; v += 5 + rand() * 12) {
    const r = rough(v);
    if (run <= 0 && rand() < 0.16 * r) {
      run = 1 + Math.floor(rand() * 3);
      runOff = (rand() < 0.55 ? 1 : -1) * D * (0.03 + rand() * 0.08) * r;
    }
    const off = run-- > 0 ? runOff : 0;
    contour.push([base(v) + (rand() - 0.5) * D * 0.07 * r + off, v]);
  }
  const far = D + 160;
  const body: Pt[] = [[far, -80], ...contour, [far, LENGTH + 80]];

  // Ujung atas dipotong di luar filter: displacement membuat garis mendatar jadi gigi gergaji.
  const cap: Pt[] = [];
  if (o.top) {
    const [low, high, stepU] = o.top;
    for (let u = -10; u < far; u += 2 + rand() * 3) {
      const lvl = u < stepU - 3 ? low : u > stepU + 3 ? high : high + ((low - high) * (stepU + 3 - u)) / 6;
      cap.push([u, lvl + (rand() - 0.5) * 1.6 + (rand() < 0.08 ? (rand() - 0.3) * 4 : 0)]);
    }
    cap.push([far, -200], [-10, -200]);
  }

  const holes: Pt[][] = [];
  for (let i = 0; i < 18; i++) {
    const v = rand() * LENGTH;
    if (rand() > paper(v) * 0.6 + 0.15 * rough(v)) continue;
    holes.push(dot(rand, base(v) + D * (0.05 + rand() * 0.15), v, 1.2 + rand() * 3.5));
  }

  // Sapuan kuas kering di topeng: yang menjorok ke krem adalah foto itu sendiri, seperti rujukan.
  // Bulu yang keluar strip (u < 2) dibuang agar tidak terpotong lurus di batas strip.
  const inside = (pts: Pt[]) => pts.every(([u]) => u > 2);
  const reveal: Pt[][] = [];
  const brushy: Pt[][] = [];
  const inkZones = o.ink ?? [];
  for (let i = 0; i < 110 && inkZones.length; i++) {
    const [c, w, k] = inkZones[Math.floor(rand() * inkZones.length)];
    if (rand() > k) continue;
    const v = (c + (rand() + rand() + rand() - 1.5) * w) * LENGTH;
    if (rand() < 0.55) {
      const u = base(v) + D * 0.04 - D * rand() * 0.04;
      const len = 40 + rand() * 120;
      reveal.push(...bristles(rand, u, v, len, D * (0.06 + rand() * 0.1), slope(v), 0.03 + rand() * 0.12).filter(inside));
    } else {
      const d = dab(rand, base(v) + D * 0.03 - D * Math.pow(rand(), 2) * 0.16, v, 8 + rand() * 26, 1.5 + rand() * 4, slope(v));
      if (inside(d)) brushy.push(d);
    }
  }
  for (let i = 0; i < 30 && inkZones.length; i++) {
    const [c, w] = inkZones[Math.floor(rand() * inkZones.length)];
    const v = (c + (rand() - 0.5) * 3 * w) * LENGTH;
    const d = dot(rand, base(v) - D * (0.02 + rand() * rand() * 0.22), v, 0.6 + rand() * 1.5);
    if (inside(d)) reveal.push(d);
  }

  // Garis gelap tipis (hanya bila zona rim diisi) dan sapuan cat putih kering di atas tepi foto.
  const rimW = o.rimWidth ?? 0.025;
  let rimOn = true;
  let fiberLeft = 0;
  const rimRows: Array<[number, number, number]> = [];
  const fiberRows: Array<[number, number, number]> = [];
  for (const [u, v] of contour) {
    if (rand() < 0.12) rimOn = !rimOn;
    rimRows.push([u, v, rimOn ? D * rimW * (0.4 + rand() * 0.9) * rim(v) : 0]);
    if (fiberLeft <= 0 && rand() < paper(v) * 0.4) fiberLeft = 3 + Math.floor(rand() * 7);
    // Serat putih mengikuti siluet halus, bukan kontur bergumpal, agar tidak bergerigi gergaji.
    fiberRows.push([base(v) + D * 0.01, v, fiberLeft-- > 0 ? D * (0.02 + rand() * 0.04) : 0]);
  }
  const streaks: Pt[][] = [];
  for (let i = 0; i < 40; i++) {
    const v = rand() * LENGTH;
    if (rand() > paper(v)) continue;
    // Cat putih rujukan berupa olesan halus sejajar tepi; bulu hanya sesekali agar tidak bergerigi.
    if (rand() < 0.2) {
      streaks.push(...bristles(rand, base(v) + D * (0.02 + rand() * 0.04), v, 30 + rand() * 60, D * (0.04 + rand() * 0.05), slope(v), -0.02 + rand() * 0.04));
    } else {
      streaks.push(dab(rand, base(v) + D * (0.015 + rand() * 0.04), v, 30 + rand() * 70, 3 + rand() * 6, slope(v)));
    }
  }

  const { poly, region, wrap } = svgWriter(side, D, o.seed, { shred: [0.12, 0.1], scale: Math.min(D * 0.12, 7) });

  const capMask = cap.length ? `<mask id='c' maskUnits='userSpaceOnUse' ${region}><rect ${region} fill='white'/><path d='${poly(cap)}' fill='black'/></mask>` : "";
  const mask = wrap(
    `<mask id='h' maskUnits='userSpaceOnUse' ${region}><rect ${region} fill='white'/>` +
      holes.map((p) => `<path d='${poly(p)}' fill='black'/>`).join("") +
      `</mask>${capMask}<g${cap.length ? ` mask='url(#c)'` : ""}><g filter='url(#t)'><path mask='url(#h)' d='${poly(body)}'/></g>` +
      [...reveal, ...brushy].map((p) => `<path d='${poly(p)}'/>`).join("") +
      `</g>`
  );
  const paint = wrap(
    streaks.map((p) => `<path d='${poly(p)}' fill='${PAPER}'/>`).join("") +
      `<g filter='url(#t)'>` +
      bands(rimRows).map((p) => `<path d='${poly(p)}' fill='${INK}' fill-opacity='0.85'/>`).join("") +
      bands(fiberRows).map((p) => `<path d='${poly(p)}' fill='${PAPER}' fill-opacity='0.92'/>`).join("") +
      `</g>`
  );
  return { mask, paint };
}

/** Variabel topeng untuk kelas torn-*; nama lain dipakai untuk tukar per breakpoint. */
export function tornVars(vars: Record<string, TornLayer>): CSSProperties {
  return Object.fromEntries(Object.entries(vars).map(([k, l]) => [`--torn-${k}`, l.mask])) as CSSProperties;
}
