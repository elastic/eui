import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiStat } from './stat';

describe('EuiStat', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStat title="title" description="description" {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
