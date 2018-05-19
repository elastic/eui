import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTooltip } from './tooltip';

describe('EuiTooltip', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTooltip title="title" id="id" content="content" {...requiredProps}>
        <button>Trigger</button>
      </EuiTooltip>
    );

    expect(component)
      .toMatchSnapshot();
  });
});
