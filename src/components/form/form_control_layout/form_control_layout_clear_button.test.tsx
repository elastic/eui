import React from 'react';
import { render } from 'enzyme';
import { EuiFormControlLayoutClearButton } from './form_control_layout_clear_button';

describe('EuiFormControlLayoutClearButton', () => {
  test('is rendered', () => {
    const clear = {
      onClick: () => null,
      className: 'customClass',
      'data-test-subj': 'clearButton',
    };
    const component = render(<EuiFormControlLayoutClearButton {...clear} />);

    expect(component).toMatchSnapshot();
  });
});
