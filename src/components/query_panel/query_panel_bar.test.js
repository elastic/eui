import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiQueryPanelBar } from './query_panel_bar';

describe('EuiQueryPanelBar', () => {
  test('is rendered', () => {
    const component = render(
      <EuiQueryPanelBar {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
