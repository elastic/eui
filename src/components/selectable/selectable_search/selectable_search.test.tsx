import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableSearch } from './selectable_search';

describe('EuiSelectableSearch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelectableSearch options={[]} listId="list" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('defaultValue', () => {
      const component = render(
        <EuiSelectableSearch options={[]} listId="list" defaultValue="Mi" />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
