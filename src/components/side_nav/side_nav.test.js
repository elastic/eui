import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSideNav } from './side_nav';

describe('EuiSideNav', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSideNav {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('isOpenOnMobile', () => {
    test('defaults to false', () => {
      const component = render(
        <EuiSideNav />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('is rendered when specified as true', () => {
      const component = render(
        <EuiSideNav isOpenOnMobile />
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
