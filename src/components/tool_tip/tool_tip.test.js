import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiToolTip } from './tool_tip';

describe('EuiToolTip', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToolTip children="trigger" title="title" id="id" content="content" {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
