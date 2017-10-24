import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiIcon,
  SIZES,
  TYPES,
} from './icon';

describe('EuiIcon', () => {
  test('is rendered', () => {
    const component = render(
      <EuiIcon type="search" {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('title', () => {
    test('defaults to a humanized version of the type', () => {
      const component = render(
        <EuiIcon type="dashboardApp" />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('is rendered', () => {
      const component = render(
        <EuiIcon type="search" title="a custom title" />
      );

      expect(component)
        .toMatchSnapshot();
    });
  });

  describe('renders size', () => {
    SIZES.forEach(size => {
      test(size, () => {
        const component = render(
          <EuiIcon type="search" size={size} />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });
  });

  describe('renders type', () => {
    TYPES.forEach(type => {
      test(type, () => {
        const component = render(
          <EuiIcon type={type} />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });
  });
});
