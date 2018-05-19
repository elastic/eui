import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTooltipPopover } from './tooltip_popover';

describe('EuiTooltipPopover', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTooltipPopover positionToolTip={() => {}} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
