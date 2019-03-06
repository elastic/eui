import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiDescriptionListTitle } from './description_list_title';

describe('EuiDescriptionListTitle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptionListTitle {...requiredProps}>
        Content
      </EuiDescriptionListTitle>
    );

    expect(component).toMatchSnapshot();
  });
});
