/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiSideNavItem } from './side_nav_item';

describe('EuiSideNavItem', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiSideNavItem>
        <button {...requiredProps} />
      </EuiSideNavItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("preserves child's classes", () => {
    const { container } = render(
      <EuiSideNavItem>
        <button className="test" />
      </EuiSideNavItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can have truncation turned off', () => {
    const { container } = render(
      <EuiSideNavItem truncate={false}>Children</EuiSideNavItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can be emphasized', () => {
    const { container } = render(
      <EuiSideNavItem emphasize>Children</EuiSideNavItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can be disabled', () => {
    const { container } = render(
      <EuiSideNavItem disabled>Children</EuiSideNavItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('isSelected', () => {
    test('defaults to false', () => {
      const { container } = render(
        <EuiSideNavItem>
          <button />
        </EuiSideNavItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is rendered when specified as true', () => {
      const { container } = render(
        <EuiSideNavItem isSelected>
          <button />
        </EuiSideNavItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('href', () => {
    test('is rendered', () => {
      const { container } = render(
        <EuiSideNavItem href="#">
          <button />
        </EuiSideNavItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is rendered with rel', () => {
      const { container } = render(
        <EuiSideNavItem href="#" rel="noopener">
          <button />
        </EuiSideNavItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
