import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiBottomBar, PADDING_SIZES } from './bottom_bar';

describe('EuiBottomBar', () => {
  test('is rendered', () => {
    const component = render(
      <EuiBottomBar {...requiredProps}>
        Content
      </EuiBottomBar>
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('paddingSize', () => {
      PADDING_SIZES.forEach(paddingSize => {
        test(`${paddingSize} is rendered`, () => {
          const component = render(
            <EuiBottomBar paddingSize={paddingSize} />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
  });
});
