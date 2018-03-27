import React from 'react';
import { render } from 'enzyme';

import { EuiGlobalToastListItem } from './global_toast_list_item';

describe('EuiGlobalToastListItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiGlobalToastListItem>
        <div>Hi</div>
      </EuiGlobalToastListItem>
    );

    expect(component).toMatchSnapshot();
  });
});
