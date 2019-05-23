import React from 'react';
import { render } from 'enzyme';
import { EuiFormControlLayoutCustomIcon } from './form_control_layout_custom_icon';

describe('EuiFormControlLayoutCustomIcon', () => {
  test('is rendered as button', () => {
    const props = {
      onClick: () => null,
      className: 'customClass',
      'data-test-subj': 'customIcon',
      type: 'alert',
      iconRef: 'icon',
    };
    const component = render(<EuiFormControlLayoutCustomIcon {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('is rendered as span', () => {
    const props = {
      className: 'customClass',
      'data-test-subj': 'customIcon',
      type: 'alert',
      iconRef: 'icon',
    };
    const component = render(<EuiFormControlLayoutCustomIcon {...props} />);

    expect(component).toMatchSnapshot();
  });
});
