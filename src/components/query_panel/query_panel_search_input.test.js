import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiQueryPanelSearchInput } from './query_panel_search_input';

describe('EuiQueryPanelSearchInput', () => {
  test('is rendered', () => {
    const component = render(
      <EuiQueryPanelSearchInput {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
