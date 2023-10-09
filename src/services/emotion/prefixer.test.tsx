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
    // TODO
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
        <EuiProvider>
          <div
            css={css`
              label: test-default-cache;
              display: flex;
              animation: something;
              transform: translateY(-1px);
              transition: transform 2s linear;
              position: sticky;
              writing-mode: vertical-rl;
              column-count: 2;
              cursor: grab;

              ::placeholder {
                color: red;
              }
            `}
          />
        </EuiProvider>
      );

      expect(getStyleCss('test-default-cache')).toMatchInlineSnapshot(`
        ".css-1ayq16r-test-default-cache {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
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
        cursor: -webkit-grab;
        cursor: grab;
        }"
      `);
      expect(getStyleCss('::-moz-placeholder')).toBeTruthy();
    });
  });
});
