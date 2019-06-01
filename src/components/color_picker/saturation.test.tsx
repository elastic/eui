import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSaturation } from './saturation';

const onChange = () => {
  /* empty */
};

describe('EuiHue', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSaturation onChange={onChange} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('accepts a color', () => {
    const component = render(
      <EuiSaturation
        color={{ h: 180, s: 1, v: 0.5 }}
        onChange={onChange}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
