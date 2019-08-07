import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggest } from './suggest';

const sampleItems = [
  {
    type: { iconType: 'kqlField', color: 'tint4' },
    label: 'Field sample',
    description: 'Description',
  },
  {
    type: { iconType: 'kqlValue', color: 'tint0' },
    label: 'Value sample',
    description: 'Description',
  },
];

describe('EuiSuggest', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuggest {...requiredProps} suggestions={sampleItems} />
    );

    expect(component).toMatchSnapshot();
  });
});
