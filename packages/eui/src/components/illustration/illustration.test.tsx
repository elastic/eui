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
import { EuiThemeProvider } from '../../services';

import { EuiIllustration, EuiIllustrationSource } from './illustration';

const illustration: EuiIllustrationSource = {
  id: 'fixture',
  title: 'Fixture illustration',
  light: '<svg viewBox="0 0 10 10"><rect data-mode="light" /></svg>',
  dark: '<svg viewBox="0 0 10 10"><circle data-mode="dark" /></svg>',
};

describe('EuiIllustration', () => {
  shouldRenderCustomStyles(<EuiIllustration type={illustration} />);

  test('is rendered', () => {
    const { container } = render(
      <EuiIllustration type={illustration} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('inlines the SVG markup', () => {
    const { container } = render(<EuiIllustration type={illustration} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  describe('color mode', () => {
    it('renders the light SVG in light mode', () => {
      const { container } = render(<EuiIllustration type={illustration} />);

      expect(
        container.querySelector('[data-mode="light"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-mode="dark"]')
      ).not.toBeInTheDocument();
    });

    it('renders the dark SVG in dark mode', () => {
      const { container } = render(
        <EuiThemeProvider colorMode="dark">
          <EuiIllustration type={illustration} />
        </EuiThemeProvider>
      );

      expect(container.querySelector('[data-mode="dark"]')).toBeInTheDocument();
      expect(
        container.querySelector('[data-mode="light"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('defaults the accessible label to the illustration title', () => {
      const { container } = render(<EuiIllustration type={illustration} />);

      expect(container.firstChild).toHaveAttribute('role', 'img');
      expect(container.firstChild).toHaveAttribute(
        'aria-label',
        'Fixture illustration'
      );
    });

    it('accepts a custom alt label', () => {
      const { container } = render(
        <EuiIllustration type={illustration} alt="Custom label" />
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-label',
        'Custom label'
      );
    });

    it('is marked decorative when alt is empty', () => {
      const { container } = render(
        <EuiIllustration type={illustration} alt="" />
      );

      expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
      expect(container.firstChild).not.toHaveAttribute('role');
    });
  });
});
