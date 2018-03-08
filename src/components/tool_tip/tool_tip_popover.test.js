import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiToolTipPopover } from './tool_tip_popover';

describe('EuiToolTipPopover', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToolTipPopover positionToolTip={() => {}} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
