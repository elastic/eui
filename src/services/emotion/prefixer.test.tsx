/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { css, keyframes } from '@emotion/react';
import { cache as defaultEmotionCache } from '@emotion/css';
import createCache from '@emotion/cache';

import { EuiProvider } from '../../components/provider';

import { euiStylisPrefixer } from './prefixer';

describe('euiStylisPrefixer', () => {
  const cacheWithPrefixer = createCache({
    key: 'test',
    stylisPlugins: [euiStylisPrefixer],
  });

  const wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <EuiProvider
      globalStyles={false}
      utilityClasses={false}
      cache={cacheWithPrefixer}
    >
      {children}
    </EuiProvider>
  );

  const getStyleCss = (label: string) => {
    const styleEl = Array.from(
      document.querySelectorAll('style[data-emotion]')
    ).find((el) => el?.textContent?.includes(label)) as HTMLStyleElement;
    if (!styleEl) return;

    // Make output styles a little easier to read
    return styleEl
      .textContent!.replace('{', ' {\n')
      .replace(/;/g, ';\n')
      .replace(/:/g, ': ');
  };

  describe('does prefix', () => {
    test('user-select', () => {
      render(
        <div
          css={css`
            label: user-select;
            user-select: none;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('user-select')).toMatchInlineSnapshot(`
        ".test-8c1x7t-user-select {
        -webkit-user-select: none;
        user-select: none;
        }"
      `);
    });

    test('text-decoration', () => {
      render(
        <div
          css={css`
            label: text-decoration;
            text-decoration: line-through dashed blue;
            text-decoration-line: underline overline;
            text-decoration-style: wavy;
            text-decoration-color: red;
            text-decoration-skip: objects;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('text-decoration')).toMatchInlineSnapshot(`
        ".test-5idn3j-text-decoration {
        -webkit-text-decoration: line-through dashed blue;
        text-decoration: line-through dashed blue;
        text-decoration-line: underline overline;
        text-decoration-style: wavy;
        text-decoration-color: red;
        text-decoration-skip: objects;
        }"
      `);
    });

    test('text-size-adjust', () => {
      render(
        <div
          css={css`
            text-size-adjust: 80%;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('text-size-adjust')).toMatchInlineSnapshot(`
        ".test-15dfadm {
        -webkit-text-size-adjust: 80%;
        text-size-adjust: 80%;
        }"
      `);
    });

    test('box-decoration-break', () => {
      render(
        <div
          css={css`
            label: box-decoration-break;
            box-decoration-break: slice;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('box-decoration-break')).toMatchInlineSnapshot(`
        ".test-m64wfr-box-decoration-break {
        -webkit-box-decoration-break: slice;
        box-decoration-break: slice;
        }"
      `);
    });

    describe('mask CSS', () => {
      render(
        <div
          css={css`
            label: mask-css;
            mask: url(mask.svg);
            mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
            mask-clip: border-box;
            mask-origin: padding-box;
            mask-composite: subtract;
            mask-mode: alpha;
            mask-position: center;
            mask-repeat: repeat-x;
            mask-size: contain;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('mask-css')).toMatchInlineSnapshot(`
        ".test-16l1rpr-mask-css {
        -webkit-mask: url(mask.svg);
        mask: url(mask.svg);
        -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
        mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
        -webkit-mask-clip: border-box;
        mask-clip: border-box;
        -webkit-mask-origin: padding-box;
        mask-origin: padding-box;
        -webkit-mask-composite: subtract;
        mask-composite: subtract;
        -webkit-mask-mode: alpha;
        mask-mode: alpha;
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-repeat: repeat-x;
        mask-repeat: repeat-x;
        -webkit-mask-size: contain;
        mask-size: contain;
        }"
      `);
    });

    test('background-clip text', () => {
      render(
        <div
          css={css`
            label: background-clip;
            /* should not prefix */
            background-clip: content-box;
            /* should prefix */
            background-clip: text;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('background-clip')).toMatchInlineSnapshot(`
        ".test-9vijyk-background-clip {
        background-clip: content-box;
        -webkit-background-clip: text;
        background-clip: text;
        }"
      `);
    });

    test('print-color-adjust', () => {
      render(
        <div
          css={css`
            label: print-color-adjust;
            print-color-adjust: economy;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('print-color-adjust')).toMatchInlineSnapshot(`
        ".test-cx4oo-print-color-adjust {
        -webkit-print-color-adjust: economy;
        print-color-adjust: economy;
        }"
      `);
    });

    test('max-content, min-content, fit-content, and stretch sizing values', () => {
      render(
        <div
          /* eslint-disable local/css-logical-properties */
          css={css`
            label: intrinsic-extrensic-sizing;
            /* should not prefix */
            height: max-content;
            width: min-content;
            max-inline-size: fit-content;
            /* should prefix */
            min-block-size: stretch;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('intrinsic-extrensic-sizing')).toMatchInlineSnapshot(`
        ".test-tsfq3u-intrinsic-extrensic-sizing {
        height: max-content;
        width: min-content;
        max-inline-size: fit-content;
        min-block-size: -webkit-fill-available;
        min-block-size: -moz-available;
        min-block-size: stretch;
        }"
      `);
    });
  });

  describe('does not prefix', () => {
    test('flex CSS', () => {
      render(
        <div
          css={css`
            label: no-flex-prefixes;
            display: flex;
            display: inline-flex;
            align-items: center;
            align-content: center;
            align-self: center;
            justify-content: center;
            flex-shrink: 0;
            flex-grow: 0;
            flex-basis: 100%;
            flex: 1;
            flex-direction: column;
            order: 2;
          `}
        />,
        { wrapper }
      );

      expect(getStyleCss('no-flex-prefixes')).toMatchInlineSnapshot(`
        ".test-1467bft-no-flex-prefixes {
        display: flex;
        display: inline-flex;
        align-items: center;
        align-content: center;
        align-self: center;
        justify-content: center;
        flex-shrink: 0;
        flex-grow: 0;
        flex-basis: 100%;
        flex: 1;
        flex-direction: column;
        order: 2;
        }"
      `);
    });

    test('transform & transition CSS', () => {
      render(
        <div
          css={css`
            label: no-transform-prefixes;
            transform: translateY(-1px);
            transition: transform 2s linear;
          `}
        />,
        { wrapper }
      );

      expect(getStyleCss('no-transform-prefixes')).toMatchInlineSnapshot(`
        ".test-1oc6c8-no-transform-prefixes {
        transform: translateY(-1px);
        transition: transform 2s linear;
        }"
      `);
    });

    test('animation CSS', () => {
      const testAnimation = keyframes`
        from { opacity: 0; }
        to { opacity: 1; }
      `;
      render(
        <div
          css={css`
            label: no-animation-prefixes;
            animation: ${testAnimation};
            animation-name: test;
            animation-delay: 1s;
            animation-direction: reverse;
            animation-duration: 50ms;
            animation-fill-mode: both;
            animation-iteration-count: infinite;
            animation-play-state: paused;
            animation-timing-function: ease-in-out;
          `}
        />,
        { wrapper }
      );

      expect(getStyleCss('no-animation-prefixes')).toMatchInlineSnapshot(`
        ".test-1aw2200-no-animation-prefixes {
        animation: animation-1flhruc;
        animation-name: test;
        animation-delay: 1s;
        animation-direction: reverse;
        animation-duration: 50ms;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-play-state: paused;
        animation-timing-function: ease-in-out;
        }"
      `);
      expect(getStyleCss('@keyframes')).toBeTruthy();
      expect(getStyleCss('@-webkit-keyframes')).toBeFalsy();
    });

    test('position sticky', () => {
      render(
        <div
          css={css`
            label: no-position-sticky-prefix;
            position: sticky;
          `}
        />,
        { wrapper }
      );

      expect(getStyleCss('no-position-sticky-prefix')).toMatchInlineSnapshot(`
        ".test-11x1k54-no-position-sticky-prefix {
        position: sticky;
        }"
      `);
    });

    test('writing mode CSS', () => {
      render(
        <div
          css={css`
            label: no-writing-mode-prefixes;
            writing-mode: vertical-lr;
            writing-mode: vertical-rl;
            writing-mode: horizontal-tb;
          `}
        />,
        { wrapper }
      );

      expect(getStyleCss('no-writing-mode-prefixes')).toMatchInlineSnapshot(`
        ".test-1d4iba8-no-writing-mode-prefixes {
        writing-mode: vertical-lr;
        writing-mode: vertical-rl;
        writing-mode: horizontal-tb;
        }"
      `);
    });

    test('inline logical properties CSS', () => {
      render(
        <div
          css={css`
            label: no-logical-properties-prefixes;
            padding-inline-start: 1rem;
            margin-inline-end: 2em;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('no-logical-properties-prefixes'))
        .toMatchInlineSnapshot(`
        ".test-11697m3-no-logical-properties-prefixes {
        padding-inline-start: 1rem;
        margin-inline-end: 2em;
        }"
      `);
    });

    test('columns CSS', () => {
      render(
        <div
          css={css`
            label: no-columns-prefixes;
            columns: 3;
            column-count: 5;
            column-fill: balance;
            column-gap: 10px;
            column-width: 20px;
            column-span: all;
            column-rule: blue dotted 2px;
          `}
        />,
        { wrapper }
      );

      expect(getStyleCss('no-columns-prefixes')).toMatchInlineSnapshot(`
        ".test-1eossg4-no-columns-prefixes {
        columns: 3;
        column-count: 5;
        column-fill: balance;
        column-gap: 10px;
        column-width: 20px;
        column-span: all;
        column-rule: blue dotted 2px;
        }"
      `);
    });

    test('misc text effect CSS', () => {
      render(
        <div
          css={css`
            label: no-misc-text-effect-prefixes;
            appearance: none;
            hyphens: auto;
            cursor: grab;
          `}
        />,
        { wrapper }
      );
      expect(getStyleCss('no-misc-text-effect-prefixes'))
        .toMatchInlineSnapshot(`
        ".test-29xaas-no-misc-text-effect-prefixes {
        appearance: none;
        hyphens: auto;
        cursor: grab;
        }"
      `);
    });

    test('misc filter/effect/image CSS', () => {
      render(
        <div
          css={css`
            label: no-filter-prefixes;
            filter: grayscale(1);
            clip-path: url(#foo);
            backface-visibility: visible;
            background: image-set(
              linear-gradient(blue, white) 1x,
              linear-gradient(blue, green) 2x
            );
          `}
        />,
        { wrapper }
      );

      expect(getStyleCss('no-filter-prefixes')).toMatchInlineSnapshot(`
        ".test-8ziglt-no-filter-prefixes {
        filter: grayscale(1);
        clip-path: url(#foo);
        backface-visibility: visible;
        background: image-set(
                      linear-gradient(blue, white) 1x,
                      linear-gradient(blue, green) 2x
                    );
        }"
      `);
    });

    test('misc selectors', () => {
      render(
        <div
          css={css`
            ::placeholder,
            :read-only,
            :read-write {
              color: red;
            }
          `}
        />,
        { wrapper }
      );

      expect(getStyleCss('::-moz-placeholder')).toBeFalsy();
      expect(getStyleCss(':-moz-read-only')).toBeFalsy();
      expect(getStyleCss(':-moz-read-write')).toBeFalsy();
    });
  });

  describe('default Emotion cache', () => {
    it('prefixes extra CSS that the EUI plugin does not', () => {
      render(
        <EuiProvider cache={defaultEmotionCache}>
          <div
            css={css`
              label: test-default-cache;
              display: flex;
              padding-inline-start: 1rem;
              margin-inline-end: 2em;
              animation: something;
              transform: translateY(-1px);
              transition: transform 2s linear;
              position: sticky;
              writing-mode: vertical-rl;
              column-count: 2;
              block-size: max-content;
              filter: blur(5px);
              cursor: grab;

              ::placeholder {
                color: red;
              }
            `}
          />
        </EuiProvider>
      );

      expect(getStyleCss('test-default-cache')).toMatchInlineSnapshot(`
        ".css-tfft1m-test-default-cache {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-padding-start: 1rem;
        padding-inline-start: 1rem;
        -webkit-margin-end: 2em;
        margin-inline-end: 2em;
        -webkit-animation: something;
        animation: something;
        -webkit-transform: translateY(-1px);
        -moz-transform: translateY(-1px);
        -ms-transform: translateY(-1px);
        transform: translateY(-1px);
        -webkit-transition: -webkit-transform 2s linear;
        transition: transform 2s linear;
        position: -webkit-sticky;
        position: sticky;
        -webkit-writing-mode: vertical-rl;
        -ms-writing-mode: tb-rl;
        writing-mode: vertical-rl;
        -webkit-column-count: 2;
        column-count: 2;
        block-size: -webkit-max-content;
        block-size: -moz-max-content;
        block-size: max-content;
        -webkit-filter: blur(5px);
        filter: blur(5px);
        cursor: -webkit-grab;
        cursor: grab;
        }"
      `);
      expect(getStyleCss('::-moz-placeholder')).toBeTruthy();
    });
  });
});
