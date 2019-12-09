import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCheckableCard } from './checkable_card';

const checkablePanelRequiredProps = {
  label: 'Label',
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckableCard', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckableCard {...requiredProps} {...checkablePanelRequiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders a checkbox when specified', () => {
    const component = render(
      <EuiCheckableCard
        {...requiredProps}
        {...checkablePanelRequiredProps}
        checkableType="checkbox"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
