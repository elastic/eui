/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';

import { useLoadingAriaLabel } from './_loading_strings';
import { euiLoadingElasticRingStyles } from './loading_elastic_ring.styles';
import { EUI_LOADING_ELASTIC_RING_LOGO_PATH } from './loading_elastic_ring_path';

export const MODES = ['sweep', 'pulse'] as const;
export type EuiLoadingElasticRingMode = (typeof MODES)[number];

export const SIZES = ['m', 'l', 'xl'] as const;
export type EuiLoadingElasticRingSize = (typeof SIZES)[number];

const SIZE_PX: Record<EuiLoadingElasticRingSize, number> = {
  m: 80,
  l: 96,
  xl: 120,
};

/** Stroke width in viewBox units (viewBox is 120), per size. */
const SIZE_THICKNESS: Record<EuiLoadingElasticRingSize, number> = {
  m: 4,
  l: 5,
  xl: 8,
};

/** Centre mark rendered size in CSS px, per size. */
const SIZE_MARK_PX: Record<EuiLoadingElasticRingSize, number> = {
  m: 24,
  l: 28,
  xl: 36,
};

/**
 * Approximate axis-aligned size of the mark path in the 120 viewBox.
 * Used to scale the path so it renders at SIZE_MARK_PX.
 */
const MARK_PATH_VIEWBOX_SIZE = 36;
const VIEWBOX_SIZE = 120;

export type EuiLoadingElasticRingProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /** Animation style while loading. */
    mode?: EuiLoadingElasticRingMode;
    /**
     * Set `false` to settle into the static design (~600ms).
     * Once settle starts it always finishes before loading can resume.
     */
    loading?: boolean;
    /** Preset size. Default `xl` (120px). */
    size?: EuiLoadingElasticRingSize;
    /**
     * Visually hidden status text.
     * Defaults to the shared loading i18n string.
     */
    label?: string;
  };

const R = 55.5;
const C = 2 * Math.PI * R;
/** Static design: [startDeg, endDeg] clockwise from 3 o'clock (SVG circle default). */
const SEGS: Array<[number, number]> = [
  [0, 72],
  [72, 201.6],
  [201.6, 239],
  [239, 289],
  [289, 360],
];
// POC: brand logo colours — not Borealis semantic tokens (same pattern as logo icons)
const SEG_COLORS = ['#FEC514', '#48EFCF', '#0B64DD', '#FF957D', '#F04E98'];
const BASE = SEGS.map(([a, b]) => (b - a + 72) / 2);
const SETTLE_S = 0.6;
// POC: speeds not public API
const SWEEP_SPEED = 1.1;
const PULSE_SPEED = 0.8;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const smoothstep = (x: number) => x * x * (3 - 2 * x);

/** Same query EUI uses via `euiCantAnimate` — read live each frame / on change. */
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

interface FrameProps {
  mode: EuiLoadingElasticRingMode;
  loading: boolean;
  sweepSpeed: number;
  pulseSpeed: number;
  reduceMotion: boolean;
}
interface SettleState {
  hold: number;
  from: number | null;
  target: number;
  em0: number;
  out: number | null;
  prevL: boolean;
}
type Lay = Array<[number, number]>;

/** Per-frame animation state. Mutates DOM directly; React never re-renders per frame. */
class LoadingElasticRingEngine {
  private t0: number | null = null;
  // sweep
  private lastS: number | null = null;
  private sLock = false;
  private sMix = 0;
  private sClk = 0;
  private sResume = false;
  private sFixedCi: number | null = null;
  private prevLay: Lay | null = null;
  private sRot = 0;
  private sOff = 0;
  private sweepCi: number | null = null;
  private sweepSeg: number | null = null;
  private sweepR: number[] = [];
  private sweepLay: Lay | null = null;
  // pulse
  private last: number | null = null;
  private pLock = false;
  private mix = 0;
  private intro = 0;
  private clk = 0;
  private steps = new Map<number, { c: number; a: number }>();
  private settle: Record<'s' | 'p', SettleState> = {
    s: { hold: 0, from: null, target: 0, em0: 0, out: null, prevL: true },
    p: { hold: 0, from: null, target: 0, em0: 0, out: null, prevL: true },
  };

  tick(
    now: number,
    p: FrameProps,
    el: SVGGElement | null,
    segs: Array<SVGCircleElement | null>
  ) {
    if (this.t0 == null) this.t0 = now;
    if (!el) return;
    const reduce = p.reduceMotion;
    const mode = p.mode;
    const period =
      Math.max(0.3, mode === 'sweep' ? p.sweepSpeed : p.pulseSpeed) * 1000;
    let t = (now - this.t0) / period;
    const rot = reduce ? 0 : (t % 1) * 360;
    let tail = 0;
    let head = 360;
    let sEm = 0;
    let sRotOut = 0;
    let sGf = 0;
    let prevTail: number | null = null;

    if (mode === 'sweep' && !reduce) {
      const dtS = Math.min(0.05, (now - (this.lastS ?? now)) / 1000);
      this.lastS = now;
      if (!p.loading) this.sLock = true;
      // once settling starts it completes before loading can resume
      if (p.loading && this.sLock && this.sMix >= 1) {
        this.sLock = false;
        this.sResume = true;
      }
      const loadingS = p.loading && !this.sLock;
      this.sMix = clamp(this.sMix + (loadingS ? -dtS : dtS) / SETTLE_S, 0, 1);
      sEm = smoothstep(this.sMix);
      this.sClk += dtS * (1 - sEm);
      if (this.sResume) {
        this.sResume = false;
        const rci = Math.floor(this.sClk / (period / 1000) / 2);
        this.sClk = ((2 * rci + 1) * period) / 1000;
        this.sFixedCi = rci;
        this.prevLay = null;
      }
      t = this.sClk / (period / 1000);
      // one sweep cycle = 2 periods: head draws on, short hold, tail erases (overlapping next draw by OV)
      const cyc = (t / 2) % 1;
      const HOLD = 0.12;
      const OV = 0.2;
      const fEnd = 0.5 - HOLD / 2;
      const eStart = 0.5 + HOLD / 2;
      this.newSweepCycle(Math.floor(t / 2));
      if (cyc < fEnd) head = easeInOutCubic(cyc / fEnd) * 360;
      else if (cyc >= eStart)
        tail = easeInOutCubic((cyc - eStart) / (1 + OV - eStart)) * 360;
      if (cyc < OV && this.prevLay) {
        prevTail =
          easeInOutCubic((cyc + 1 - eStart) / (1 + OV - eStart)) * 360;
        prevTail += (360 - prevTail) * sEm;
      }
      sGf =
        cyc < fEnd ? smoothstep(clamp((head / 360 - 0.9) / 0.1, 0, 1)) : 1;
      const vis = clamp(((head - tail) / 360 - 0.8) / 0.2, 0, 1);
      const v = 1 - 0.75 * smoothstep(vis);
      this.sRot += ((dtS * 360) / (period / 1000)) * v * (1 - sEm);
      sRotOut = this.settleRot(
        's',
        this.sRot + this.sOff + 30 * sGf,
        sEm,
        loadingS
      );
      if (tail > 0) head = 360 + tail * sEm;
      else head = head + (360 - head) * sEm;
    }

    if (mode !== 'sweep' && !reduce) {
      this.pulseFrame(now, p, period, el, segs);
      return;
    }

    el.style.transform = `rotate(${
      mode === 'sweep' && !reduce ? sRotOut : rot
    }deg)`;
    this.newSweepCycle(Math.floor(t / 2));
    {
      const n = this.sweepSeg!;
      const gr = 30 * sGf;
      const lay: Lay = [];
      lay[n] = [0, 216 - gr];
      let pos = 216 - gr;
      this.sweepR.forEach((len, k) => {
        const l = (len * (144 + gr)) / 144;
        lay[(n + 1 + k) % 5] = [pos, pos + l];
        pos += l;
      });
      this.sweepLay =
        this.sFixedCi === this.sweepCi
          ? SEGS.map((x) => [x[0], x[1]] as [number, number])
          : lay;
    }
    const LAY: Lay =
      mode === 'sweep' && !reduce
        ? this.sweepLay!.map(([a, b], i) => [
            a + (SEGS[i][0] - a) * sEm,
            b + (SEGS[i][1] - b) * sEm,
          ])
        : SEGS;
    const cut = ([a, b]: [number, number], tl: number, hd: number): Lay =>
      [0, -360, 360]
        .map(
          (sh) =>
            [Math.max(a, tl + sh), Math.min(b, hd + sh)] as [number, number]
        )
        .filter(([s, e]) => e > s)
        .flatMap(([s, e]): Lay =>
          s >= 360
            ? [[s - 360, e - 360]]
            : e > 360
            ? [
                [s, 360],
                [0, e - 360],
              ]
            : [[s, e]]
        )
        .filter(([s, e]) => e > s);
    const usePrev =
      mode === 'sweep' && !reduce && prevTail != null && !!this.prevLay;
    LAY.forEach((seg, i) => {
      const c = segs[i];
      if (!c) return;
      const pieces = cut(seg, tail, head)
        .concat(usePrev ? cut(this.prevLay![i], prevTail!, 360) : [])
        .sort((x, y) => x[0] - y[0]);
      const arr = [0];
      let cur = 0;
      pieces.forEach(([s, e]) => {
        arr.push(((s - cur) / 360) * C, ((e - s) / 360) * C);
        cur = e;
      });
      arr.push(C);
      c.setAttribute('stroke-dasharray', arr.join(' '));
      c.setAttribute('stroke-dashoffset', '0');
    });
  }

  /** Pulse: segments take turns swelling; widths relax to the static design on settle. */
  private pulseFrame(
    now: number,
    p: FrameProps,
    period: number,
    el: SVGGElement,
    segs: Array<SVGCircleElement | null>
  ) {
    const dt = Math.min(0.05, (now - (this.last ?? now)) / 1000);
    this.last = now;
    if (!p.loading) this.pLock = true;
    if (p.loading && this.pLock && this.mix >= 1) this.pLock = false;
    const loading = p.loading && !this.pLock;
    this.mix = clamp(this.mix + (loading ? -dt : dt) / SETTLE_S, 0, 1);
    const em = smoothstep(this.mix);
    this.intro = Math.min(1, this.intro + dt / 0.45);
    const pHead = (1 - Math.pow(1 - this.intro, 3)) * 360;
    this.clk += dt * (1 - em);
    const t = (this.clk / (period / 1000)) * 1.05;
    const f = t % 1;
    const n = 1.8;
    const T =
      Math.floor(t) +
      Math.pow(f, n) / (Math.pow(f, n) + Math.pow(1 - f, n));
    const g2 = (t + 0.5) % 1;
    const m = 2;
    const G =
      Math.floor(t + 0.5) +
      Math.pow(g2, m) / (Math.pow(g2, m) + Math.pow(1 - g2, m));
    const step = (j: number) => {
      if (!this.steps.has(j)) {
        const prev = this.steps.get(j - 1);
        const prev2 = this.steps.get(j - 2);
        let c = Math.floor(Math.random() * 5);
        if (prev) {
          const opts = [(prev.c + 2) % 5, (prev.c + 3) % 5];
          const fresh = opts.filter((o) => !prev2 || o !== prev2.c);
          c =
            fresh.length === 1 && Math.random() > 0.15
              ? fresh[0]
              : opts[Math.random() < 0.5 ? 0 : 1];
        }
        this.steps.set(j, { c, a: 1.3 + Math.random() * 1.7 });
        if (this.steps.size > 12)
          this.steps.delete(this.steps.keys().next().value as number);
      }
      return this.steps.get(j)!;
    };
    const gj = Math.floor(G);
    [gj - 2, gj - 1, gj, gj + 1].forEach(step);
    const g = [0, 0, 0, 0, 0];
    const capOf = (i: number) => (1.5 * 0.55 * (360 - BASE[i])) / BASE[i] - 0.55;
    [gj - 2, gj - 1, gj].forEach((j) => {
      const d = G - (j + 1);
      const env =
        d < 0
          ? d > -1
            ? Math.pow(Math.cos((Math.PI * d) / 2), 2)
            : 0
          : d < 2
          ? Math.pow(Math.cos((Math.PI * d) / 4), 2)
          : 0;
      if (env > 0) {
        const st = step(j);
        g[st.c] +=
          capOf(st.c) * (0.7 + (0.3 * (st.a - 1.3)) / 1.7) * env;
      }
    });
    const wp = BASE.map((b, i) => b * (0.55 + Math.min(g[i], capOf(i))));
    const kp = 360 / wp.reduce((x, y) => x + y, 0);
    const w = wp.map(
      (x, i) => x * kp * (1 - em) + (SEGS[i][1] - SEGS[i][0]) * em
    );
    const S: number[] = [];
    let acc = 0;
    w.forEach((wi) => {
      S.push(acc);
      acc += wi;
    });
    const nT = Math.floor(t);
    const eT = T - nT;
    const s0 = S[step(nT).c];
    const s1 = S[step(nT + 1).c];
    const F = s0 + ((((s1 - s0) % 360) + 360) % 360) * eT;
    el.style.transform = `rotate(${this.settleRot(
      'p',
      T * 378 - F,
      em,
      loading
    )}deg)`;
    let s = 0;
    w.forEach((wi, i) => {
      const c = segs[i];
      if (!c) return;
      const len = Math.max(0, Math.min(s + wi, pHead) - s);
      c.setAttribute('stroke-dasharray', `${(len / 360) * C} ${C}`);
      c.setAttribute('stroke-dashoffset', `${(-s / 360) * C}`);
      s += len;
    });
  }

  /** While settling, carry rotation forward to the next full turn (+≥120°). */
  private settleRot(
    key: 's' | 'p',
    base: number,
    em: number,
    loading: boolean
  ) {
    const st = this.settle[key];
    let out: number;
    if (!loading) {
      if (st.prevL || st.from == null) {
        st.from = st.out ?? base + st.hold;
        st.hold = st.from - base;
        st.target = Math.ceil((st.from + 120) / 360) * 360;
        st.em0 = em;
      }
      const f =
        st.em0 >= 1 ? 1 : Math.max(0, (em - st.em0) / (1 - st.em0));
      out = (base + st.hold) * (1 - f) + st.target * f;
    } else {
      if (!st.prevL && st.out != null) st.hold = st.out - base;
      out = base + st.hold;
    }
    st.prevL = loading;
    st.out = out;
    return ((out % 360) + 360) % 360;
  }

  /** Each sweep cycle picks a new lead segment and random widths for the rest. */
  private newSweepCycle(ci: number) {
    if (this.sweepCi === ci) return;
    if (this.sweepCi != null && this.sweepLay) {
      this.prevLay = this.sweepLay;
      this.sOff += 30;
    }
    let n: number;
    do {
      n = Math.floor(Math.random() * 5);
    } while (
      this.sweepSeg != null &&
      (n === this.sweepSeg || n === (this.sweepSeg + 4) % 5)
    );
    this.sweepCi = ci;
    this.sweepSeg = n;
    const r = [1, 2, 3, 4].map(() => 0.4 + Math.random() * 1.4);
    const rs = r.reduce((x, y) => x + y, 0);
    this.sweepR = r.map((x) => (x / rs) * 144);
  }
}

/**
 * Live `prefers-reduced-motion` — same media feature as `euiCantAnimate`.
 * Updates when the OS/user preference changes.
 */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(REDUCED_MOTION_QUERY).matches
      : false
  );

  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
};

/**
 * Branded Elastic loading ring (five-segment ring + mark).
 * POC: new component; may later replace or wrap `EuiLoadingElastic`.
 */
export const EuiLoadingElasticRing: FunctionComponent<
  EuiLoadingElasticRingProps
> = ({
  mode = 'sweep',
  loading = true,
  size = 'xl',
  label,
  className,
  ...rest
}) => {
  const classes = classNames('euiLoadingElasticRing', className);
  const styles = useEuiMemoizedStyles(euiLoadingElasticRingStyles);
  const defaultLabel = useLoadingAriaLabel();
  const statusLabel = label ?? defaultLabel;
  const reduceMotion = usePrefersReducedMotion();

  const ringRef = useRef<SVGGElement>(null);
  const segRefs = useRef<Array<SVGCircleElement | null>>([]);
  const frameProps = useRef<FrameProps>({
    mode,
    loading,
    sweepSpeed: SWEEP_SPEED,
    pulseSpeed: PULSE_SPEED,
    reduceMotion,
  });
  frameProps.current = {
    mode,
    loading,
    sweepSpeed: SWEEP_SPEED,
    pulseSpeed: PULSE_SPEED,
    reduceMotion,
  };

  useEffect(() => {
    const engine = new LoadingElasticRingEngine();
    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      engine.tick(now, frameProps.current, ringRef.current, segRefs.current);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const px = SIZE_PX[size];
  const sw = SIZE_THICKNESS[size];
  const markPx = SIZE_MARK_PX[size];
  // Scale path so its on-screen size is markPx (path is authored in the 120 viewBox)
  const markScale =
    (markPx * VIEWBOX_SIZE) / (MARK_PATH_VIEWBOX_SIZE * px);

  return (
    <div
      className={classes}
      css={[styles.euiLoadingElasticRing, styles.euiLoadingElasticRing__size(px)]}
      role="status"
      aria-live="polite"
      aria-busy={loading}
      {...rest}
    >
      <svg
        aria-hidden="true"
        width={px}
        height={px}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        fill="none"
        css={styles.euiLoadingElasticRing__svg}
      >
        <g ref={ringRef} css={styles.euiLoadingElasticRing__ring}>
          {SEGS.map(([a, b], i) => (
            <circle
              key={i}
              ref={(el) => {
                segRefs.current[i] = el;
              }}
              cx="60"
              cy="60"
              r={R}
              stroke={SEG_COLORS[i]}
              strokeWidth={sw}
              strokeDasharray={`${((b - a) / 360) * C} ${C}`}
              strokeDashoffset={(-a / 360) * C}
            />
          ))}
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={EUI_LOADING_ELASTIC_RING_LOGO_PATH}
          css={styles.euiLoadingElasticRing__mark}
          transform={`translate(60 60) scale(${markScale}) translate(-60 -60)`}
        />
      </svg>
      <EuiScreenReaderOnly>
        <span>{statusLabel}</span>
      </EuiScreenReaderOnly>
    </div>
  );
};

EuiLoadingElasticRing.displayName = 'EuiLoadingElasticRing';
