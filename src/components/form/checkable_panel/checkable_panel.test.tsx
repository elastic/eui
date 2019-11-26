import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCheckablePanel } from './checkable_panel';

const checkablePanelRequiredProps = {
  label: 'Label',
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckablePanel', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckablePanel {...requiredProps} {...checkablePanelRequiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders a checkbox when specified', () => {
    const component = render(
      <EuiCheckablePanel
        {...requiredProps}
        {...checkablePanelRequiredProps}
        checkableType="checkbox"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
