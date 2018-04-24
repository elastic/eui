import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiComboBox } from './combo_box';

describe('EuiComboBox', () => {
  test('is rendered', () => {
    const component = shallow(
      <EuiComboBox {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
