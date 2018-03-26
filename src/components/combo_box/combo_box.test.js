import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiComboBox } from './combo_box';

describe('EuiComboBox', () => {
  test('is rendered', () => {
    const component = render(
      <EuiComboBox
        {...requiredProps}
        searchValue=""
        onChange={() => {}}
        onSearchChange={() => {}}
        onCreateOption={() => {}}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
