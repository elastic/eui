import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggestItem } from './suggest_item';

const TYPE = {
  iconType: 'search',
  color: 'tint1',
};

describe('EuiSuggestItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuggestItem {...requiredProps} label="Test label" type={TYPE} />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('props', () => {
  const sampleItem = {
    type: { iconType: 'kqlValue', color: 'tint2' },
    label: 'Charles de Gaulle International Airport',
    description: 'This is the description',
  };

  describe('labelDisplay as expand', () => {
    test('is rendered', () => {
      const component = render(
        <EuiSuggestItem
          type={sampleItem.type}
          description={sampleItem.description}
          label={sampleItem.description}
          labelDisplay="expand"
        />
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('item with no description has expanded label', () => {
    test('is rendered', () => {
      const component = render(
        <EuiSuggestItem label={sampleItem.description} type={sampleItem.type} />
      );
      expect(component).toMatchSnapshot();
    });
  });
});
