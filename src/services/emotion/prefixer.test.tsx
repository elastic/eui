/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { css } from '@emotion/react';
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
    return Array.from(
      document.querySelectorAll('style[data-emotion]')
    ).find((el) => el?.textContent?.includes(label)) as HTMLStyleElement;
  };

  describe('does prefix', () => {
    // TODO
  });

  describe('does not prefix', () => {
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
              ::placeholder {
                color: red;
              }
            `}
          />
        </EuiProvider>
      );

      expect(getStyleCss('::-moz-placeholder')).toBeTruthy();
    });
  });
});
