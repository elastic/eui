import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAspectRatio } from './aspect_ratio';

describe('EuiAspectRatio', () => {
  test('is rendered', () => {
    const component = render(
      <EuiAspectRatio height={2} width={1} {...requiredProps}>
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/71PhjEaTZ6L._SY606_.jpg"
          alt="blade runner"
        />
      </EuiAspectRatio>
    );

    expect(component).toMatchSnapshot();
  });
});
