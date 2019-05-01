import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiBottomBar, PADDING_SIZES } from './bottom_bar';

// TODO: Temporary hack which we can remove once react-test-renderer supports portals.
// More info at https://github.com/facebook/react/issues/11565.
ReactDOM.createPortal = node => node;

describe('EuiBottomBar', () => {
  test('is rendered', () => {
    const component = render(
      <EuiBottomBar {...requiredProps}>Content</EuiBottomBar>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('paddingSize', () => {
      PADDING_SIZES.forEach(paddingSize => {
        test(`${paddingSize} is rendered`, () => {
          const component = render(<EuiBottomBar paddingSize={paddingSize} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
