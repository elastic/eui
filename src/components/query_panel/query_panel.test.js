import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiQueryPanel } from './query_panel';

describe('EuiQueryPanel', () => {
  test('is rendered', () => {
    const component = render(
      <EuiQueryPanel {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
