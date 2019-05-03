import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiHeaderLogo } from './header_logo';

describe('EuiHeaderLogo', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderLogo {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders href', () => {
    const component = render(<EuiHeaderLogo href="#" />);

    expect(component).toMatchSnapshot();
  });

  test('renders optional props', () => {
    const component = render(
      <EuiHeaderLogo
        iconType="alert"
        iconTitle="Moby Dick"
        style={{ color: 'red' }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
