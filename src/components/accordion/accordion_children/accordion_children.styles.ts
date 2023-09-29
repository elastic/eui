/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import bezierEasing from 'bezier-easing';

import { UseEuiTheme } from '../../../services';
import {
  logicalCSS,
  euiCanAnimate,
  euiFocusRing,
} from '../../../global_styling';

export const euiAccordionAnimationVars = {
  duration: 'normal' as const,
  easing: 'resistance' as const,
};

export const euiAccordionChildrenStyles = (
  { euiTheme }: UseEuiTheme,
  animations: ReturnType<typeof euiAccordionAnimations>
) => ({
  euiAccordion__children: css`
    ${euiCanAnimate} {
      transform-origin: top;
    }
  `,
  opening: css`
    ${animations.opening.childrenAnimation}
  `,
  closing: css`
    ${animations.closing.childrenAnimation}
  `,
  isLoading: css`
    align-items: center;
    display: flex;
  `,
  xs: css`
    padding: ${euiTheme.size.xs};
  `,
  s: css`
    padding: ${euiTheme.size.s};
  `,
  m: css`
    padding: ${euiTheme.size.base};
  `,
  l: css`
    padding: ${euiTheme.size.l};
  `,
  xl: css`
    padding: ${euiTheme.size.xl};
  `,
});

export const euiAccordionChildWrapperStyles = (
  euiThemeContext: UseEuiTheme,
  animations: ReturnType<typeof euiAccordionAnimations>
) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiAccordion__childWrapper: css`
      overflow: hidden;

      ${euiCanAnimate} {
        transform-origin: top;
        transition: opacity
          ${euiTheme.animation[euiAccordionAnimationVars.duration]}
          ${euiTheme.animation[euiAccordionAnimationVars.easing]};
      }

      /* NOTE: Safari is slightly flaky about showing the focus-visible outline
         on click when it should only show on keyboard enter. However, the minor
         visual impact of this is not worth the accessibility loss to keyboard
         users on Chrome & FF */
      ${euiFocusRing(euiThemeContext)}
    `,
    isClosed: css`
      ${logicalCSS('height', 0)}
      opacity: 0;
    `,
    closing: css`
      opacity: 0;
      ${animations.closing.wrapperAnimation}
    `,
    isOpen: css`
      ${logicalCSS('height', 'auto')}
      opacity: 1;
    `,
    opening: css`
      ${animations.opening.wrapperAnimation}
    `,
  };
};

export const euiAccordionAnimations = (
  animationVars: UseEuiTheme['euiTheme']['animation']
) => {
  const duration = animationVars[euiAccordionAnimationVars.duration]!;
  const easing = animationVars[euiAccordionAnimationVars.easing]!;

  return {
    opening: {
      ...accordionAnimationUtils.generate({
        direction: 'expand',
        duration,
        easing,
      }),
    },
    closing: {
      ...accordionAnimationUtils.generate({
        direction: 'collapse',
        duration,
        easing,
      }),
    },
  };
};

/**
 * Utilities for generating animations/keyframes with any specified duration & easing
 * Returns two animations - for the wrapper and children (which contains the inverted scale logic)
 *
 * Credit to https://github.com/valdrinkoshi/animation-keyframes for the skeleton
 * base of this logic, and https://developer.chrome.com/blog/performant-expand-and-collapse/
 * for the original inspiration
 *
 * TODO: Accordion is the only one using this for now, but consider moving this
 * to services/ if more use-cases arise
 */

const accordionAnimationUtils = {
  generate({
    direction,
    duration,
    easing,
    options,
  }: {
    direction: 'collapse' | 'expand';
    duration: string;
    easing: string;
    options?: { fps?: number; axis?: 'X' | 'Y' }; // Including the option for a horizontal accordion some day
  }) {
    const framesCount = this.getFramesCount(duration, options?.fps);
    const easingCallback = this.getEasing(easing);

    const [wrapperAnimation, childrenAnimation] = this.generateKeyframes({
      from: direction === 'expand' ? 0 : 1,
      to: direction === 'expand' ? 1 : 0,
      framesCount,
      easingCallback,
      axis: options?.axis,
    });

    return {
      wrapperAnimation: this.animationCSS(wrapperAnimation, duration),
      childrenAnimation: this.animationCSS(childrenAnimation, duration),
    };
  },

  generateKeyframes({
    framesCount,
    easingCallback,
    from,
    to,
    axis = 'Y',
  }: {
    framesCount: number;
    easingCallback: bezierEasing.EasingFunction | null;
    from: 0 | 1;
    to: 1 | 0;
    axis?: 'X' | 'Y';
  }) {
    const animation = [];
    const inverseAnimation = [];

    for (let i = 0; i < framesCount; i++) {
      const step = i / (framesCount - 1);

      const percentage = this.formatNumber(100 * step);
      const easeRatio = easingCallback ? easingCallback(step) : step;

      const scale = this.formatNumber(from + (to - from) * easeRatio);
      const inverseScale = scale !== 0 ? this.formatNumber(1 / scale) : 1000;

      animation.push(`${percentage}% { transform: scale${axis}(${scale}); }`);
      inverseAnimation.push(
        `${percentage}% { transform: scale${axis}(${inverseScale}); }`
      );
    }

    return [
      keyframes`${animation.join('\n')}`,
      keyframes`${inverseAnimation.join('\n')}`,
    ];
  },

  animationCSS(animation: string, duration: string) {
    return css`
      ${euiCanAnimate} {
        animation-name: ${animation};
        animation-duration: ${duration};
        animation-timing-function: step-end;
        will-change: transform;
        contain: content;
      }
    `;
  },

  getFramesCount(duration: string, fps: number = 60) {
    const durationNum = parseInt(duration, 10);
    if (durationNum <= 0 || fps <= 0) {
      throw new Error('Invalid animation duration');
    }

    const isMilliseconds = duration.endsWith('ms');
    const framesCount = isMilliseconds
      ? Math.round((durationNum * fps) / 1000)
      : durationNum * fps;

    if (!framesCount || framesCount === 1) {
      throw new Error('Not enough frames to render an animation');
    }

    return framesCount;
  },

  getEasing(easingName: string) {
    if (easingName.startsWith('cubic-bezier(') && easingName.endsWith(')')) {
      return this.getCubicBezierEasing(easingName);
    }

    switch (easingName) {
      // https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function#values
      case 'ease':
        return bezierEasing(0.25, 0.1, 0.25, 1.0);
      case 'ease-in':
        return bezierEasing(0.42, 0, 1.0, 1.0);
      case 'ease-out':
        return bezierEasing(0, 0, 0.58, 1.0);
      case 'ease-in-out':
        return bezierEasing(0.42, 0, 0.58, 1.0);
      case 'linear':
      default:
        return null;
    }
  },

  getCubicBezierEasing(easing: string) {
    const stringArgs = easing.match(/^cubic-bezier\(([\d., ]*)\)$/)![1];
    const args = stringArgs.split(',').map((arg: string) => Number(arg.trim()));

    type ExpectedEasingType = [number, number, number, number];
    if (args.length !== 4) {
      throw new Error('Invalid cubic-bezier syntax');
    }

    return bezierEasing(...(args as ExpectedEasingType));
  },

  formatNumber(number: number) {
    return Number(number.toFixed(5));
  },
};
