import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiHue } from './hue';

const onChange = () => {
  /* empty */
};

describe('EuiHue', () => {
  test('is rendered', () => {
    const component = render(<EuiHue onChange={onChange} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('accepts a hue value', () => {
    const component = render(
      <EuiHue hue={180} onChange={onChange} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('accepts a hex value', () => {
    const component = render(
      <EuiHue hue={180} hex="#00FFFF" onChange={onChange} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
