/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test';

import { EuiHeader } from '../header';

import { EuiCollapsibleNavBeta } from './collapsible_nav_beta';

describe('EuiCollapsibleNavBeta', () => {
  shouldRenderCustomStyles(<EuiCollapsibleNavBeta />);

  it('renders', () => {
    const { baseElement, getByTestSubject } = render(
      <EuiCollapsibleNavBeta {...requiredProps} data-test-subj="nav">
        Nav content
      </EuiCollapsibleNavBeta>
    );
    expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '248px' });
    expect(baseElement).toMatchSnapshot();
  });

  it('renders initialIsCollapsed', () => {
    const { baseElement, getByTestSubject } = render(
      <EuiCollapsibleNavBeta data-test-subj="nav" initialIsCollapsed={true}>
        Nav content
      </EuiCollapsibleNavBeta>
    );
    expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '48px' });
    expect(baseElement).toMatchSnapshot();
  });

  it('toggles collapsed state', () => {
    const { getByTestSubject } = render(
      <EuiCollapsibleNavBeta data-test-subj="nav">
        Nav content
      </EuiCollapsibleNavBeta>
    );
    expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '248px' });
    fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));
    expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '48px' });
  });

  it('automatically accounts for fixed EuiHeaders in its positioning', () => {
    const { getByTestSubject } = render(
      <EuiHeader position="fixed">
        <EuiCollapsibleNavBeta data-test-subj="nav">
          Nav content
        </EuiCollapsibleNavBeta>
      </EuiHeader>
    );
    expect(getByTestSubject('nav')).toHaveStyle({
      'inset-block-start': '48px',
      'block-size': 'calc(100% - 48px)',
    });
  });

  describe('responsive behavior', () => {
    const mockWindowResize = (width: number) => {
      window.innerWidth = width;
      window.dispatchEvent(new Event('resize'));
    };

    it('collapses from a push flyout to an overlay flyout once the screen is smaller than 3x the flyout width', () => {
      mockWindowResize(600);
      const { baseElement } = render(
        <EuiCollapsibleNavBeta>Nav content</EuiCollapsibleNavBeta>
      );
      expect(baseElement).toMatchSnapshot();
    });

    it('makes the overlay flyout full width once the screen is smaller than 1.5x the flyout width', () => {
      mockWindowResize(320);
      const { baseElement, getByTestSubject } = render(
        <EuiCollapsibleNavBeta>Nav content</EuiCollapsibleNavBeta>
      );
      fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));
      expect(baseElement).toMatchSnapshot();

      // onClose testing
      expect(
        baseElement.querySelector('[data-euiicon-type="cross"')
      ).toBeInTheDocument();
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(
        baseElement.querySelector('[data-euiicon-type="menu"')
      ).toBeInTheDocument();
    });

    it('adjusts breakpoints for custom widths', () => {
      mockWindowResize(1600);
      const desktop = render(
        <EuiCollapsibleNavBeta width={500} data-test-subj="pushFlyout">
          Nav content
        </EuiCollapsibleNavBeta>
      );
      expect(desktop.getByTestSubject('pushFlyout')).toBeInTheDocument();
      desktop.unmount();

      mockWindowResize(1200);
      const mobile = render(
        <EuiCollapsibleNavBeta width={500} data-test-subj="overlayFlyout">
          Nav content
        </EuiCollapsibleNavBeta>
      );
      expect(
        mobile.queryByTestSubject('overlayFlyout')
      ).not.toBeInTheDocument();
    });
  });

  // TODO: Visual snapshot for left vs right `side` prop, once we add visual snapshot testing
});
