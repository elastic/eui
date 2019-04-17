import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiToolTipPopover } from './tool_tip_popover';

describe('EuiToolTipPopover', () => {
  test('is rendered', () => {
    const component = render(
      // tslint:disable-next-line:no-empty
      <EuiToolTipPopover positionToolTip={() => {}} {...requiredProps} />
    );
    expect(component).toMatchSnapshot();
  });
});
