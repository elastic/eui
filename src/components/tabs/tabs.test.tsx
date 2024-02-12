/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiTab } from './tab';
import { EuiTabs, SIZES } from './tabs';

const children = <EuiTab>Tab</EuiTab>;

describe('EuiTabs', () => {
  shouldRenderCustomStyles(<EuiTabs>{children}</EuiTabs>);

  test('renders', () => {
    const { container } = render(
      <EuiTabs {...requiredProps}>children</EuiTabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} renders and passes down to EuiTab children`, () => {
          const { container } = render(
            <EuiTabs size={size}>{children}</EuiTabs>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('expand', () => {
      it('passes down to EuiTab children', () => {
        const { container } = render(<EuiTabs expand>{children}</EuiTabs>);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('context', () => {
    it('passes down `size` and `expand` to EuiTab children regardless of nesting', () => {
      const { container } = render(
        <EuiTabs expand size="l">
          <div>{children}</div>
        </EuiTabs>
      );

      const tab = container.querySelector('.euiTab');
      const tabContent = container.querySelector('.euiTab__content');

      expect(tab!.className).toContain('-expand');
      expect(tabContent!.className).toContain('-l');
    });
  });
});
