import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiGlobalToastList } from './global_toast_list';

describe('EuiGlobalToastList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiGlobalToastList {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <EuiGlobalToastList>
        <div>hi</div>
      </EuiGlobalToastList>
    );

    expect(component)
      .toMatchSnapshot();
  });
});
