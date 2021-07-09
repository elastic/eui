/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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

  test('can have truncation turned off', () => {
    const component = render(
      <EuiSideNavItem truncate={false}>Children</EuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be emphasized', () => {
    const component = render(
      <EuiSideNavItem emphasize>Children</EuiSideNavItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be disabled', () => {
    const component = render(
      <EuiSideNavItem disabled>Children</EuiSideNavItem>
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

  describe('href', () => {
    test('is rendered', () => {
      const component = render(
        <EuiSideNavItem href="#">
          <button />
        </EuiSideNavItem>
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered with rel', () => {
      const component = render(
        <EuiSideNavItem href="#" rel="noopener">
          <button />
        </EuiSideNavItem>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
