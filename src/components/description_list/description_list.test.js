import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiDescriptionList } from './description_list';

describe('EuiDescriptionList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptionList {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
