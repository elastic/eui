import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import {
  euiCanAnimate,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

// Distances are in viewBox units (the mark is 32 × 32)
const LOGO_VIEWBOX = 32;
const LOGO_CENTER = 16;
const LOGO_MAX_PULL = 10;
const LOGO_PARTNER_FOLLOW = 0.2;
const LOGO_SQUEEZE_TRAVEL = 2.5;
const LOGO_STRETCH_ALONG = 0.22;
const LOGO_STRETCH_ACROSS = 0.06;
const LOGO_SQUEEZE_ALONG = 0.1;
const LOGO_SQUEEZE_ACROSS = 0.05;
const LOGO_BRIDGE_THINNING = 1.2;
const LOGO_BRIDGE_MAX_BULGE = 1.5;
const LOGO_SNAP_EASING = 'cubic-bezier(0.34, 1.9, 0.64, 1)';

type PieceId = 'pink' | 'yellow' | 'teal' | 'blue';

type PieceTransform = {
  x: number;
  y: number;
  angle: number;
  along: number;
  across: number;
};

const PIECES: Record<
  PieceId,
  { cx: number; cy: number; partner: PieceId; cross: [PieceId, PieceId] }
> = {
  pink: { cx: 7, cy: 7, partner: 'yellow', cross: ['teal', 'blue'] },
  yellow: { cx: 25, cy: 25, partner: 'pink', cross: ['teal', 'blue'] },
  teal: { cx: 24.5, cy: 7.5, partner: 'blue', cross: ['pink', 'yellow'] },
  blue: { cx: 7.5, cy: 24.5, partner: 'teal', cross: ['pink', 'yellow'] },
};

const PIECE_IDS = Object.keys(PIECES) as PieceId[];

const BRIDGE_REST_LENGTH = Math.hypot(
  PIECES.yellow.cx - PIECES.pink.cx,
  PIECES.yellow.cy - PIECES.pink.cy
);

const toDegrees = (radians: number) => (radians * 180) / Math.PI;

const setTransform = (el: SVGElement, t: PieceTransform) => {
  el.style.setProperty('--x', `${t.x}px`);
  el.style.setProperty('--y', `${t.y}px`);
  el.style.setProperty('--angle', `${t.angle}deg`);
  el.style.setProperty('--along', String(t.along));
  el.style.setProperty('--across', String(t.across));
};

const resetTransform = (el: SVGElement) => {
  el.style.setProperty('--x', '0px');
  el.style.setProperty('--y', '0px');
  el.style.setProperty('--along', '1');
  el.style.setProperty('--across', '1');
};

function useLogoStretch() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) {
      return undefined;
    }

    const bridge = svg.querySelector<SVGElement>('.euiHomepageLogo__bridge');
    const pieces = {} as Record<PieceId, SVGElement>;
    for (const id of PIECE_IDS) {
      const el = svg.querySelector<SVGElement>(`.euiHomepageLogo__${id}`);
      if (!el) {
        return undefined;
      }
      pieces[id] = el;
    }
    if (!bridge) {
      return undefined;
    }

    let grabbed: PieceId | null = null;
    let startX = 0;
    let startY = 0;
    let unitsPerPx = 1;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) {
        return;
      }
      e.preventDefault();

      const rect = svg.getBoundingClientRect();
      unitsPerPx = LOGO_VIEWBOX / rect.width;
      const px = (e.clientX - rect.left) * unitsPerPx;
      const py = (e.clientY - rect.top) * unitsPerPx;

      grabbed = PIECE_IDS.reduce((nearest, id) =>
        Math.hypot(PIECES[id].cx - px, PIECES[id].cy - py) <
        Math.hypot(PIECES[nearest].cx - px, PIECES[nearest].cy - py)
          ? id
          : nearest
      );
      startX = e.clientX;
      startY = e.clientY;

      svg.setPointerCapture(e.pointerId);
      svg.dataset.dragging = '';
      document.documentElement.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!grabbed) {
        return;
      }

      const dx = (e.clientX - startX) * unitsPerPx;
      const dy = (e.clientY - startY) * unitsPerPx;
      const distance = Math.hypot(dx, dy);
      if (!distance) {
        return;
      }

      // Rubber band: 1:1 at first, approaching LOGO_MAX_PULL
      const pull = (LOGO_MAX_PULL * distance) / (distance + LOGO_MAX_PULL);
      const tension = pull / LOGO_MAX_PULL;
      const ux = dx / distance;
      const uy = dy / distance;
      const angle = toDegrees(Math.atan2(dy, dx));

      const next = {} as Record<PieceId, PieceTransform>;
      next[grabbed] = {
        x: ux * pull,
        y: uy * pull,
        angle,
        along: 1 + LOGO_STRETCH_ALONG * tension,
        across: 1 - LOGO_STRETCH_ACROSS * tension,
      };

      const follow = tension * LOGO_PARTNER_FOLLOW;
      next[PIECES[grabbed].partner] = {
        x: ux * pull * LOGO_PARTNER_FOLLOW,
        y: uy * pull * LOGO_PARTNER_FOLLOW,
        angle,
        along: 1 + LOGO_STRETCH_ALONG * follow,
        across: 1 - LOGO_STRETCH_ACROSS * follow,
      };

      for (const id of PIECES[grabbed].cross) {
        const vx = LOGO_CENTER - PIECES[id].cx;
        const vy = LOGO_CENTER - PIECES[id].cy;
        const length = Math.hypot(vx, vy);
        next[id] = {
          x: (vx / length) * LOGO_SQUEEZE_TRAVEL * tension,
          y: (vy / length) * LOGO_SQUEEZE_TRAVEL * tension,
          angle: toDegrees(Math.atan2(vy, vx)),
          along: 1 - LOGO_SQUEEZE_ALONG * tension,
          across: 1 + LOGO_SQUEEZE_ACROSS * tension,
        };
      }

      for (const id of PIECE_IDS) {
        setTransform(pieces[id], next[id]);
      }

      const pinkX = PIECES.pink.cx + next.pink.x;
      const pinkY = PIECES.pink.cy + next.pink.y;
      const yellowX = PIECES.yellow.cx + next.yellow.x;
      const yellowY = PIECES.yellow.cy + next.yellow.y;
      const bridgeAlong =
        Math.hypot(yellowX - pinkX, yellowY - pinkY) / BRIDGE_REST_LENGTH;

      setTransform(bridge, {
        x: (pinkX + yellowX) / 2 - LOGO_CENTER,
        y: (pinkY + yellowY) / 2 - LOGO_CENTER,
        angle: toDegrees(Math.atan2(yellowY - pinkY, yellowX - pinkX)),
        along: bridgeAlong,
        across: Math.min(
          LOGO_BRIDGE_MAX_BULGE,
          bridgeAlong ** -LOGO_BRIDGE_THINNING
        ),
      });
    };

    const onRelease = (e: PointerEvent) => {
      if (!grabbed) {
        return;
      }
      grabbed = null;

      if (svg.hasPointerCapture(e.pointerId)) {
        svg.releasePointerCapture(e.pointerId);
      }
      delete svg.dataset.dragging;
      document.documentElement.style.cursor = '';

      for (const id of PIECE_IDS) {
        resetTransform(pieces[id]);
      }
      resetTransform(bridge);
      bridge.style.setProperty('--angle', '45deg');
    };

    svg.addEventListener('pointerdown', onPointerDown);
    svg.addEventListener('pointermove', onPointerMove);
    svg.addEventListener('pointerup', onRelease);
    svg.addEventListener('pointercancel', onRelease);
    svg.addEventListener('lostpointercapture', onRelease);

    return () => {
      svg.removeEventListener('pointerdown', onPointerDown);
      svg.removeEventListener('pointermove', onPointerMove);
      svg.removeEventListener('pointerup', onRelease);
      svg.removeEventListener('pointercancel', onRelease);
      svg.removeEventListener('lostpointercapture', onRelease);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return ref;
}

const getLogoStyles = ({ euiTheme }: UseEuiTheme) => ({
  logo: css`
    display: block;
    flex-shrink: 0;
    overflow: visible;
    block-size: var(--banner-title-font-size);
    inline-size: var(--banner-title-font-size);
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;

    @supports (-moz-appearance: none) {
      clip-path: inset(-60%);
    }

    &[data-dragging] {
      cursor: grabbing;
    }

    .euiHomepageLogo__piece,
    .euiHomepageLogo__bridge {
      --x: 0px;
      --y: 0px;
      --along: 1;
      --across: 1;
      transform-box: fill-box;
      transform-origin: center;

      ${euiCanAnimate} {
        transition: transform ${euiTheme.animation.normal} ${LOGO_SNAP_EASING};
      }
    }

    .euiHomepageLogo__piece {
      --angle: 0deg;
      transform: translate(var(--x), var(--y)) rotate(var(--angle))
        scale(var(--along), var(--across)) rotate(calc(var(--angle) * -1));
    }

    .euiHomepageLogo__bridge {
      --angle: 45deg;
      transform: translate(var(--x), var(--y)) rotate(var(--angle))
        scale(var(--along), var(--across)) rotate(-45deg);
    }

    &[data-dragging] .euiHomepageLogo__piece,
    &[data-dragging] .euiHomepageLogo__bridge {
      transition: none;
    }
  `,
});

export function HomepageLogo() {
  const ref = useLogoStretch();
  const styles = useEuiMemoizedStyles(getLogoStyles);

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      overflow="visible"
      css={styles.logo}
      aria-hidden="true"
    >
      <path
        className="euiHomepageLogo__bridge"
        fill="#FF957D"
        d="M18 25c-.5-5.5-5.5-10.5-11-11l7-7c.5 5.5 5.5 10.5 11 11l-7 7z"
      />
      <circle
        className="euiHomepageLogo__piece euiHomepageLogo__pink"
        cx="7"
        cy="7"
        r="7"
        fill="#F04E98"
      />
      <circle
        className="euiHomepageLogo__piece euiHomepageLogo__yellow"
        cx="25"
        cy="25"
        r="7"
        fill="#FEC514"
      />
      <path
        className="euiHomepageLogo__piece euiHomepageLogo__teal"
        fill="#00BFB3"
        d="M31 14c-7.18 0-13-5.82-13-13h13v13z"
      />
      <path
        className="euiHomepageLogo__piece euiHomepageLogo__blue"
        fill="#1BA9F5"
        d="M1 18c7.18 0 13 5.82 13 13H1V18z"
      />
    </svg>
  );
}
