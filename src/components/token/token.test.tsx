import React from 'react';
import { render } from 'enzyme';

import { EuiToken, COLORS, SHAPES, SIZES, FILLS } from './token';
import { TokenColor } from './token_map';

const tokenColors: TokenColor[] = COLORS;

describe('EuiToken', () => {
  test('is rendered', () => {
    const component = render(<EuiToken iconType="dot" size="s" />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('shape', () => {
      SHAPES.forEach(shape => {
        test(`${shape} is rendered`, () => {
          const component = render(
            <EuiToken
              iconType="dot"
              size="s"
              displayOptions={{
                shape: shape,
                color: 'euiColorVis1',
              }}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      tokenColors.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiToken
              iconType="dot"
              size="s"
              displayOptions={{
                color: color,
                shape: 'square',
              }}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach(tokenSize => {
        test(`${tokenSize} is rendered`, () => {
          const component = render(
            <EuiToken
              iconType="dot"
              size={tokenSize}
              displayOptions={{
                color: 'euiColorVis1',
                shape: 'circle',
              }}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('fill', () => {
      FILLS.forEach(fill => {
        test(`${fill} is rendered`, () => {
          const component = render(
            <EuiToken
              iconType="dot"
              displayOptions={{
                fill: fill,
              }}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
