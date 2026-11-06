import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import {
  euiCanAnimate,
  useEuiMemoizedStyles,
  useEuiTheme,
  UseEuiTheme,
} from '@elastic/eui';

// Navbar travels 5px on a 24px mark. Hero travel is 3px at that size.
const LOGO_BURST_RATIO = 3 / 24;
// 16 × extraSlow keeps the 8s loop.
const LOGO_PULSE_INTERVAL_MULTIPLE = 16;

const tokenMs = (value: string | number | undefined) => {
  const parsed = typeof value === 'number' ? value : parseFloat(value ?? '');
  return Math.round(parsed || 500);
};

function useLogoPulse() {
  const { euiTheme } = useEuiTheme();
  const holdMs = tokenMs(euiTheme.animation.extraSlow);
  const intervalMs = holdMs * LOGO_PULSE_INTERVAL_MULTIPLE;
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    if (reduceMotion.matches) {
      return undefined;
    }

    let holdTimer = 0;
    const pulse = () => {
      setIsPulsing(true);
      holdTimer = window.setTimeout(() => setIsPulsing(false), holdMs);
    };

    pulse();
    const interval = window.setInterval(pulse, intervalMs);
    const onChange = () => {
      if (!reduceMotion.matches) {
        return;
      }
      window.clearInterval(interval);
      window.clearTimeout(holdTimer);
      setIsPulsing(false);
    };
    reduceMotion.addEventListener('change', onChange);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(holdTimer);
      reduceMotion.removeEventListener('change', onChange);
    };
  }, [holdMs, intervalMs]);

  return isPulsing;
}

const getLogoStyles = ({ euiTheme }: UseEuiTheme) => ({
  logo: css`
    display: block;
    flex-shrink: 0;
    overflow: visible;
    block-size: var(--banner-title-font-size);
    inline-size: var(--banner-title-font-size);
    /* 3px of travel when the mark is 24px tall */
    --eui-logo-burst: calc(var(--banner-title-font-size) * ${LOGO_BURST_RATIO});

    @supports (-moz-appearance: none) {
      clip-path: inset(calc(var(--eui-logo-burst) * -1.6));
    }

    .euiHomepageLogo__piece {
      transform: translate(0, 0);

      ${euiCanAnimate} {
        transition: transform ${euiTheme.animation.slow}
          ${euiTheme.animation.bounce};
      }
    }
  `,
  logoPulsing: css`
    ${euiCanAnimate} {
      .euiHomepageLogo__pink {
        transform: translate(
          calc(var(--eui-logo-burst) * -1),
          calc(var(--eui-logo-burst) * -1)
        );
      }

      .euiHomepageLogo__yellow {
        transform: translate(var(--eui-logo-burst), var(--eui-logo-burst));
      }

      .euiHomepageLogo__teal {
        transform: translate(
          var(--eui-logo-burst),
          calc(var(--eui-logo-burst) * -1)
        );
      }

      .euiHomepageLogo__blue {
        transform: translate(
          calc(var(--eui-logo-burst) * -1),
          var(--eui-logo-burst)
        );
      }
    }
  `,
});

export function HomepageLogo() {
  const isPulsing = useLogoPulse();
  const styles = useEuiMemoizedStyles(getLogoStyles);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      overflow="visible"
      css={[styles.logo, isPulsing && styles.logoPulsing]}
      aria-hidden="true"
    >
      <path
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
