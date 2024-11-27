/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test';

import { EuiCollapsibleNavLink } from './collapsible_nav_item/collapsible_nav_link';
import { EuiCollapsibleNavSubItem } from './collapsible_nav_item';
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

  it('calls `onCollapseToggle` with the new collapsed state', () => {
    const onCollapseToggle = jest.fn();
    const { getByTestSubject } = render(
      <EuiCollapsibleNavBeta
        initialIsCollapsed={true}
        onCollapseToggle={onCollapseToggle}
      >
        Nav content
      </EuiCollapsibleNavBeta>
    );
    fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));
    expect(onCollapseToggle).toHaveBeenLastCalledWith(false);
    fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));
    expect(onCollapseToggle).toHaveBeenLastCalledWith(true);
  });

  it('lets the consumer control the collapsed state', () => {
    const onCollapseToggle = jest.fn();

    const Controlled = () => {
      const [isCollapsed, setIsCollapsed] = React.useState(false);
      onCollapseToggle.mockImplementation((isCollapsed: boolean) => {
        setIsCollapsed(isCollapsed);
      });

      return (
        <>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            data-test-subj="controlledToggle"
          >
            Control nav
          </button>
          <EuiCollapsibleNavBeta
            isCollapsed={isCollapsed}
            onCollapseToggle={onCollapseToggle}
            data-test-subj="nav"
          >
            Nav content
          </EuiCollapsibleNavBeta>
        </>
      );
    };
    const { getByTestSubject } = render(<Controlled />);

    expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '248px' }); // initially expanded

    fireEvent.click(getByTestSubject('controlledToggle')); // controlled toggle
    expect(onCollapseToggle).toHaveBeenCalledTimes(0); // should not have triggered callback
    expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '48px' }); // collapsed state

    fireEvent.click(getByTestSubject('euiCollapsibleNavButton')); // uncontrolled toggle
    expect(onCollapseToggle).toHaveBeenCalledTimes(1);
    expect(onCollapseToggle).toHaveBeenCalledWith(false);
    expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '248px' }); // expanded state
  });

  describe('responsive behavior', () => {
    const mockWindowResize = (width: number) => {
      window.innerWidth = width;
      window.dispatchEvent(new Event('resize'));
    };

    it('collapses from a push flyout to an overlay flyout once the screen is smaller than 3x the flyout width', () => {
      mockWindowResize(600);
      const { queryByTestSubject, getByTestSubject } = render(
        <EuiCollapsibleNavBeta data-test-subj="nav">
          Nav content
        </EuiCollapsibleNavBeta>
      );
      expect(queryByTestSubject('nav')).not.toBeInTheDocument();
      fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));

      expect(getByTestSubject('nav').className).toContain('overlay');
      expect(getByTestSubject('nav').className).not.toContain('push');
    });

    it('stores push collapsed/expand and overlay flyout open/closed states separately', () => {
      mockWindowResize(1200);
      const { queryByTestSubject, getByTestSubject } = render(
        <EuiCollapsibleNavBeta data-test-subj="nav">
          Nav content
        </EuiCollapsibleNavBeta>
      );
      expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '248px' });

      // Should be closed on mobile
      act(() => mockWindowResize(600));
      waitFor(() => expect(queryByTestSubject('nav')).not.toBeInTheDocument());

      // Should still be expanded on desktop
      act(() => mockWindowResize(1200));
      expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '248px' });
    });

    it('makes the overlay flyout full width once the screen is smaller than 1.5x the flyout width', () => {
      mockWindowResize(320);
      const { baseElement, getByTestSubject } = render(
        <EuiCollapsibleNavBeta data-test-subj="nav">
          Nav content
        </EuiCollapsibleNavBeta>
      );
      fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));

      expect(getByTestSubject('nav').className).toContain('isOverlayFullWidth');

      // onClose testing
      expect(
        baseElement.querySelector('[data-euiicon-type="cross"')
      ).toBeInTheDocument();
      fireEvent.keyDown(window, { key: 'Escape' });
      waitFor(() =>
        expect(
          baseElement.querySelector('[data-euiicon-type="menu"')
        ).toBeInTheDocument()
      );
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

    it('closes the overlay flyout automatically when links are clicked', () => {
      mockWindowResize(600);
      const { queryByTestSubject, getByTestSubject } = render(
        <EuiCollapsibleNavBeta data-test-subj="nav">
          <EuiCollapsibleNavLink data-test-subj="link" href="#">
            Link
          </EuiCollapsibleNavLink>
        </EuiCollapsibleNavBeta>
      );
      fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));
      expect(queryByTestSubject('nav')).toBeInTheDocument();

      fireEvent.click(getByTestSubject('link'));
      expect(queryByTestSubject('nav')).not.toBeInTheDocument();
    });

    it('allows preventing the overfly flyout close', () => {
      mockWindowResize(600);
      const { getByTestSubject } = render(
        <EuiCollapsibleNavBeta data-test-subj="nav">
          <EuiCollapsibleNavLink
            data-test-subj="button"
            onClick={(e: React.MouseEvent) => e.preventDefault()}
          >
            Button
          </EuiCollapsibleNavLink>
        </EuiCollapsibleNavBeta>
      );
      fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));
      fireEvent.click(getByTestSubject('button'));
      expect(getByTestSubject('nav')).toBeInTheDocument();
    });

    it('allows custom rendered subitems to close the flyout', () => {
      mockWindowResize(600);
      const { queryByTestSubject, getByTestSubject } = render(
        <EuiCollapsibleNavBeta data-test-subj="nav">
          <EuiCollapsibleNavSubItem
            renderItem={({ closePortals }) => (
              <button onClick={closePortals} data-test-subj="custom">
                Custom
              </button>
            )}
          />
        </EuiCollapsibleNavBeta>
      );
      fireEvent.click(getByTestSubject('euiCollapsibleNavButton'));
      expect(queryByTestSubject('nav')).toBeInTheDocument();

      fireEvent.click(getByTestSubject('custom'));
      expect(queryByTestSubject('nav')).not.toBeInTheDocument();
    });
  });

  // TODO: Visual snapshot for left vs right `side` prop, once we add visual snapshot testing
});
