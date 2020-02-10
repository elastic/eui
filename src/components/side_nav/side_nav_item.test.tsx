import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSideNavItem } from './side_nav_item';

describe('EuiSideNavItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSideNavItem>
        <button {...requiredProps} />
      </EuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  test("preserves child's classes", () => {
    const component = render(
      <EuiSideNavItem>
        <button className="test" />
      </EuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  describe('isSelected', () => {
    test('defaults to false', () => {
      const component = render(
        <EuiSideNavItem>
          <button />
        </EuiSideNavItem>
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered when specified as true', () => {
      const component = render(
        <EuiSideNavItem isSelected>
          <button />
        </EuiSideNavItem>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
