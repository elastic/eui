import React from 'react';
import { render } from 'enzyme';

import { EuiCardGraphic, GRAPHIC_COLORS } from './card_graphic';

describe('EuiCardGraphic', () => {
  test('is rendered', () => {
    const component = render(<EuiCardGraphic />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('colors', () => {
      GRAPHIC_COLORS.forEach(color => {
        it(`${color} is rendered`, () => {
          const component = render(<EuiCardGraphic color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
