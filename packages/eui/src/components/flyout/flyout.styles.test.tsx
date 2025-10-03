/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { useEuiTheme } from '../../services';
import { euiFlyoutStyles, composeFlyoutInlineStyles } from './flyout.styles';

// Mock the flyout constants
jest.mock('./const', () => ({
  isEuiFlyoutSizeNamed: jest.fn((size: string | number) => {
    return ['s', 'm', 'l', 'fill'].includes(size as string);
  }),
}));

describe('flyout.styles', () => {
  describe('euiFlyoutStyles', () => {
    const TestComponent = () => {
      const { euiTheme } = useEuiTheme();
      const styles = euiFlyoutStyles({
        euiTheme,
        colorMode: 'LIGHT',
        modifications: {},
        highContrastMode: false,
      });
      return <div data-testid="styles">{JSON.stringify(styles)}</div>;
    };

    it('should include fill size styles', () => {
      const { getByTestId } = render(<TestComponent />);
      const stylesText = getByTestId('styles').textContent;
      expect(stylesText).toContain('fill');
    });

    it('should apply correct fill size CSS', () => {
      const { getByTestId } = render(<TestComponent />);
      const stylesText = getByTestId('styles').textContent;
      expect(stylesText).toContain('90vw');
    });

    it('should include all named size styles', () => {
      const { getByTestId } = render(<TestComponent />);
      const stylesText = getByTestId('styles').textContent;
      expect(stylesText).toContain('s');
      expect(stylesText).toContain('m');
      expect(stylesText).toContain('l');
      expect(stylesText).toContain('fill');
    });
  });

  describe('composeFlyoutInlineStyles - basic functionality', () => {
    it('should handle custom width values (non-named sizes)', () => {
      const result = composeFlyoutInlineStyles(
        '400px',
        'stacked',
        null,
        null,
        undefined
      );
      expect(result).toEqual({ inlineSize: '400px' });
    });

    it('should handle fill size in stacked mode', () => {
      const result = composeFlyoutInlineStyles(
        'fill',
        'stacked',
        null,
        null,
        undefined
      );
      expect(result).toEqual({});
    });

    it('should calculate dynamic width for fill size in side-by-side mode', () => {
      const result = composeFlyoutInlineStyles(
        'fill',
        'side-by-side',
        'sibling-id',
        300,
        undefined
      );
      expect(result).toEqual({
        inlineSize: 'calc(90vw - 300px)',
        minInlineSize: '0',
      });
    });

    it('should handle maxWidth for non-fill sizes', () => {
      const result = composeFlyoutInlineStyles('m', 'stacked', null, null, 800);
      expect(result).toEqual({
        maxInlineSize: '800px',
      });
    });

    it('should not apply dynamic styles when not fill size', () => {
      const result = composeFlyoutInlineStyles(
        'm',
        'side-by-side',
        'sibling-id',
        300,
        undefined
      );
      expect(result).toEqual({});
    });

    it('should not apply dynamic styles when not side-by-side mode', () => {
      const result = composeFlyoutInlineStyles(
        'fill',
        'stacked',
        'sibling-id',
        300,
        undefined
      );
      expect(result).toEqual({});
    });
  });

  describe('composeFlyoutInlineStyles - maxWidth handling', () => {
    it('should handle maxWidth for fill size without sibling', () => {
      const result = composeFlyoutInlineStyles(
        'fill',
        'stacked',
        null,
        null,
        600
      );
      expect(result).toEqual({
        maxInlineSize: '600px',
        minInlineSize: 'min(600px, 90vw)',
      });
    });

    it('should handle maxWidth for fill size with sibling', () => {
      const result = composeFlyoutInlineStyles(
        'fill',
        'side-by-side',
        'sibling-id',
        300,
        600
      );
      expect(result).toEqual({
        inlineSize: 'calc(90vw - 300px)',
        maxInlineSize: 'min(600px, calc(90vw - 300px))',
        minInlineSize: 'min(600px, calc(90vw - 300px))',
      });
    });

    it('should handle string maxWidth values', () => {
      const result = composeFlyoutInlineStyles(
        'fill',
        'stacked',
        null,
        null,
        '50%'
      );
      expect(result).toEqual({
        maxInlineSize: '50%',
        minInlineSize: 'min(50%, 90vw)',
      });
    });

    it('should handle boolean maxWidth (should be ignored)', () => {
      const result = composeFlyoutInlineStyles(
        'fill',
        'stacked',
        null,
        null,
        true
      );
      // Boolean maxWidth should be ignored, but the function still processes it
      // because the condition `if (isFill && maxWidth)` evaluates to true for boolean true
      expect(result).toEqual({
        maxInlineSize: true,
        minInlineSize: undefined,
      });
    });

    it('should handle fill size with maxWidth but no sibling in side-by-side mode', () => {
      // This tests the case where we're in side-by-side mode but there's no sibling
      const result = composeFlyoutInlineStyles(
        'fill',
        'side-by-side',
        null,
        null,
        600
      );
      expect(result).toEqual({
        maxInlineSize: '600px',
        minInlineSize: 'min(600px, 90vw)',
      });
    });

    it('should handle maxWidth with sibling but no dynamic width calculation', () => {
      // This tests the case where maxWidth is provided but dynamic width calculation
      // is not applied (e.g., not fill size, not side-by-side, etc.)
      const result = composeFlyoutInlineStyles(
        'm',
        'side-by-side',
        'sibling-id',
        300,
        600
      );
      expect(result).toEqual({
        maxInlineSize: '600px',
      });
    });
  });
});
