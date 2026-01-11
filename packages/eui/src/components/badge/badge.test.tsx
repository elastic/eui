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
import { render, renderHook } from '../../test/rtl';
import { useEuiTheme } from '../../services';

import { EuiBadge, COLORS, ICON_SIDES, BadgeColor } from './badge';
import { mathWithUnits, UseEuiTheme } from '@elastic/eui-theme-common';
import { RenderResult } from '@testing-library/react';

interface Colors {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
}

type ColorsMap = Record<BadgeColor, Colors>;

describe('EuiBadge', () => {
  shouldRenderCustomStyles(
    <EuiBadge
      iconType="cross"
      iconOnClick={() => {}}
      iconOnClickAriaLabel="Close"
    />,
    { childProps: ['closeButtonProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiBadge {...requiredProps}>Content</EuiBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is disabled', () => {
    const { container } = render(
      <EuiBadge isDisabled {...requiredProps}>
        Content
      </EuiBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with onClick provided', () => {
    const { container } = render(
      <EuiBadge
        {...requiredProps}
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button"
      >
        Content
      </EuiBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with href provided', () => {
    const { container } = render(
      <EuiBadge {...requiredProps} href="/#/">
        Content
      </EuiBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with iconOnClick provided', () => {
    const { container } = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button"
      >
        Content
      </EuiBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and onClick provided', () => {
    const { container } = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button"
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button"
      >
        Content
      </EuiBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and href provided', () => {
    const { container } = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/"
      >
        Content
      </EuiBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with href and rel provided', () => {
    const { container } = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/"
        rel="noopener"
      >
        Content
      </EuiBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiBadge iconType="user">Content</EuiBadge>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        it(`${color} is rendered`, () => {
          const { container } = render(
            <EuiBadge color={color}>Content</EuiBadge>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      it('accepts rgba', () => {
        const { container } = render(
          <EuiBadge color="rgba(255,255,255,1)">Content</EuiBadge>
        );

        expect(container.firstChild).toMatchSnapshot();
        // NOTE: jsdom currently does not support CSS variables (@see https://github.com/testing-library/jest-dom/issues/322)
        // We're relying on visual regression tests here instead
      });

      it('accepts hex', () => {
        const { container } = render(<EuiBadge color="#333">Content</EuiBadge>);

        expect(container.firstChild).toMatchSnapshot();
        // NOTE: jsdom currently does not support CSS variables (@see https://github.com/testing-library/jest-dom/issues/322)
        // We're relying on visual regression tests here instead
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach((iconSide) => {
        it(`${iconSide} is rendered`, () => {
          const { container } = render(
            <EuiBadge iconType="user" iconSide={iconSide}>
              Content
            </EuiBadge>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('style', () => {
      const style = { border: '4px solid tomato' };

      it('is rendered', () => {
        const { container } = render(
          <EuiBadge style={style}>Content</EuiBadge>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      COLORS.forEach((color) => {
        it(`is rendered with ${color}`, () => {
          const { container } = render(
            <EuiBadge style={style} color={color}>
              Content
            </EuiBadge>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      it('is rendered with hollow', () => {
        const { container } = render(
          <EuiBadge style={style} color="hollow">
            Content
          </EuiBadge>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('styles', () => {
    let theme: UseEuiTheme;

    beforeAll(() => {
      theme = renderHook(useEuiTheme).result.current;
    });

    it('applies correct sizing styles to the main element', () => {
      const { container } = render(<EuiBadge>Badge</EuiBadge>);

      expect(container.firstChild).toHaveStyleRule('padding-block', '0');
      expect(container.firstChild).toHaveStyleRule(
        'padding-inline',
        mathWithUnits(
          [theme.euiTheme.size.s, theme.euiTheme.border.width.thin],
          (size, borderWidth) => size - borderWidth
        )
      );
    });

    it('applies custom sizing styles to the main element when rendering an icon-only variant', () => {
      const { container } = render(<EuiBadge iconType="gear" />);

      expect(container.firstChild).toHaveStyleRule('padding-block', '0');
      expect(container.firstChild).toHaveStyleRule(
        'padding-inline',
        mathWithUnits(
          [theme.euiTheme.size.xs, theme.euiTheme.border.width.thin],
          (size, borderWidth) => size - borderWidth
        )
      );
    });
  });

  describe('fill', () => {
    // These are purposefully hardcoded to ensure no color values get updates
    // accidentally.
    const baseColorsMap: ColorsMap = {
      default: {
        backgroundColor: '#E3E8F2',
        textColor: '#07101F',
      },
      hollow: {
        backgroundColor: '#FFFFFF',
        textColor: '#07101F',
        borderColor: '#CAD3E2',
      },
      primary: { backgroundColor: '#D9E8FF', textColor: '#07101F' },
      accent: { backgroundColor: '#FDDDE9', textColor: '#07101F' },
      neutral: { backgroundColor: '#CFEEF7', textColor: '#07101F' },
      success: { backgroundColor: '#C9F3E3', textColor: '#07101F' },
      warning: { backgroundColor: '#FDE9B5', textColor: '#07101F' },
      risk: { backgroundColor: '#FFDEBF', textColor: '#07101F' },
      danger: { backgroundColor: '#FDDDD8', textColor: '#07101F' },
    };

    const fillColorsMap: ColorsMap = {
      default: {
        backgroundColor: '#E3E8F2',
        textColor: '#07101F',
      },
      hollow: {
        backgroundColor: '#FFFFFF',
        textColor: '#07101F',
        borderColor: '#CAD3E2',
      },
      primary: { backgroundColor: '#0B64DD', textColor: '#FFFFFF' },
      accent: { backgroundColor: '#BC1E70', textColor: '#FFFFFF' },
      neutral: { backgroundColor: '#1C8CB5', textColor: '#FFFFFF' },
      success: { backgroundColor: '#008A5E', textColor: '#FFFFFF' },
      warning: { backgroundColor: '#FACB3D', textColor: '#6A4906' },
      risk: { backgroundColor: '#ED6723', textColor: '#FFFFFF' },
      danger: { backgroundColor: '#C61E25', textColor: '#FFFFFF' },
    };

    const assertColor = (
      color: BadgeColor,
      result: RenderResult,
      colorsMap: ColorsMap,
      fill?: boolean
    ) => {
      result.rerender(
        <EuiBadge color={color} fill={fill}>
          Badge
        </EuiBadge>
      );

      const colors = colorsMap[color];

      expect(result.container.firstChild).toHaveStyleRule(
        '--euiBadgeBackgroundColor',
        colors.backgroundColor
      );

      expect(result.container.firstChild).toHaveStyleRule(
        '--euiBadgeTextColor',
        colors.textColor
      );

      if (Object.hasOwn(colors, 'borderColor')) {
        expect(result.container.firstChild).toHaveStyleRule(
          'border-color',
          colors.borderColor
        );
      } else {
        expect(result.container.firstChild).not.toHaveStyleRule('border-color');
      }
    };

    describe('non fill colors', () => {
      let result: RenderResult;

      beforeEach(() => {
        result = render(<EuiBadge>Badge</EuiBadge>);
      });

      COLORS.forEach((color) => {
        it(`applies correct values for color "${color}"`, () => {
          assertColor(color, result, baseColorsMap, false);
        });
      });
    });

    describe('fill colors', () => {
      let result: RenderResult;

      beforeEach(() => {
        result = render(<EuiBadge fill>Badge</EuiBadge>);
      });

      COLORS.forEach((color) => {
        it(`applies correct values for color "${color}"`, () => {
          assertColor(color, result, fillColorsMap, true);
        });
      });
    });

    it('defaults to fill = false', () => {
      const result = render(<EuiBadge fill>Badge</EuiBadge>);

      COLORS.forEach((color) => {
        assertColor(color, result, baseColorsMap);
      });
    });
  });
});
