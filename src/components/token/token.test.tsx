import React from 'react';
import { render } from 'enzyme';

import { EuiToken, SHAPES, SIZES } from './token';
import { TokenColor } from './token_map';

const tokenColors: TokenColor[] = [
  'tokenTint01',
  'tokenTint02',
  'tokenTint03',
  'tokenTint04',
  'tokenTint05',
  'tokenTint06',
  'tokenTint07',
  'tokenTint08',
  'tokenTint09',
  'tokenTint10',
];

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
                color: 'tokenTint01',
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
                color: 'tokenTint01',
                shape: 'circle',
              }}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
