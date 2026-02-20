/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiCheckboxDisplay } from './checkbox_display';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('EuiCheckboxDisplay', () => {
  shouldRenderCustomStyles(<EuiCheckboxDisplay {...requiredProps} />);

  it('renders', () => {
    const { container } = render(<EuiCheckboxDisplay {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('checked', () => {
      const { container } = render(
        <EuiCheckboxDisplay {...requiredProps} checked />
      );

      const wrapper = container.querySelector('.euiCheckboxDisplay')!;
      const classes = Array.from(wrapper.classList) as string[];
      expect(classes.some((clx) => clx.includes('selected'))).toBe(true);

      expect(
        container.querySelector('[data-euiicon-type="check"]')
      ).toBeInTheDocument();
    });

    describe('indeterminate', () => {
      it('renders correctly', () => {
        const { container } = render(
          <EuiCheckboxDisplay {...requiredProps} indeterminate />
        );

        const wrapper = container.querySelector('.euiCheckboxDisplay')!;
        const classes = Array.from(wrapper.classList) as string[];
        expect(classes.some((clx) => clx.includes('selected'))).toBe(true);

        expect(
          container.querySelector('[data-euiicon-type="stopFilled"]')
        ).toBeInTheDocument();
      });

      it('renders when checked is set', () => {
        const { container } = render(
          <EuiCheckboxDisplay {...requiredProps} indeterminate checked />
        );

        expect(
          container.querySelector('[data-euiicon-type="stopFilled"]')
        ).toBeInTheDocument();
      });

      test('renders when excluded is set', () => {
        const { container } = render(
          <EuiCheckboxDisplay {...requiredProps} indeterminate excluded />
        );

        expect(
          container.querySelector('[data-euiicon-type="stopFilled"]')
        ).toBeInTheDocument();
      });
    });

    test('excluded', () => {
      const { container } = render(
        <EuiCheckboxDisplay {...requiredProps} excluded />
      );

      const wrapper = container.querySelector('.euiCheckboxDisplay')!;
      const classes = Array.from(wrapper.classList) as string[];
      expect(classes.some((clx) => clx.includes('excluded'))).toBe(true);

      expect(
        container.querySelector('[data-euiicon-type="cross"]')
      ).toBeInTheDocument();
    });

    test('disabled', () => {
      const { container } = render(
        <EuiCheckboxDisplay {...requiredProps} disabled />
      );

      const wrapper = container.querySelector('.euiCheckboxDisplay')!;

      const classes = Array.from(wrapper.classList) as string[];
      expect(classes.some((clx) => clx.includes('disabled'))).toBe(true);
      expect(classes.some((clx) => clx.includes('unselected'))).toBe(true);

      expect(
        container.querySelector('[data-euiicon-type="empty"]')
      ).toBeInTheDocument();
    });

    test('disabled when checked', () => {
      const { container } = render(
        <EuiCheckboxDisplay {...requiredProps} disabled checked />
      );

      const wrapper = container.querySelector('.euiCheckboxDisplay')!;
      const classes = Array.from(wrapper.classList) as string[];
      expect(classes.some((clx) => clx.includes('disabled'))).toBe(true);
      expect(classes.some((clx) => clx.includes('selected'))).toBe(true);

      expect(
        container.querySelector('[data-euiicon-type="check"]')
      ).toBeInTheDocument();
    });
  });
});
