/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { EuiThemeProvider } from '../../services';

import { EuiPortal } from './portal';

describe('EuiPortal', () => {
  it('renders', () => {
    const { baseElement } = render(<EuiPortal>Content</EuiPortal>);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders portals with a different theme provider from the global theme with the correct base color', () => {
    const { baseElement } = render(
      <EuiThemeProvider colorMode="inverse">
        <EuiPortal>Content</EuiPortal>
      </EuiThemeProvider>
    );

    expect(baseElement).toMatchSnapshot();
  });

  describe('behavior', () => {
    it('portalRef', () => {
      const portalRef = jest.fn();

      const { unmount } = render(
        <EuiPortal portalRef={portalRef}>Content</EuiPortal>
      );

      expect(portalRef).toHaveBeenCalledTimes(1);
      expect(portalRef.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);

      unmount();

      expect(portalRef).toHaveBeenCalledTimes(2);
      expect(portalRef.mock.calls[1][0]).toBeNull();
    });
  });

  describe('container prop', () => {
    it('mounts the portal node into the specified container element', () => {
      const containerEl = document.createElement('div');
      containerEl.id = 'custom-container';
      document.body.appendChild(containerEl);

      render(
        <EuiPortal container={containerEl}>
          <span>Container content</span>
        </EuiPortal>
      );

      // The portal node should be a child of the container
      const portalNode = containerEl.querySelector('[data-euiportal="true"]');
      expect(portalNode).not.toBeNull();
      expect(portalNode!.textContent).toBe('Container content');

      // Clean up
      document.body.removeChild(containerEl);
    });

    it('does not mount to document.body when container is provided', () => {
      const containerEl = document.createElement('div');
      document.body.appendChild(containerEl);

      render(
        <EuiPortal container={containerEl}>
          <span>Inside container</span>
        </EuiPortal>
      );

      // Count portal nodes directly under document.body vs. under container
      const bodyPortals = document.body.querySelectorAll(
        ':scope > [data-euiportal="true"]'
      );
      const containerPortals = containerEl.querySelectorAll(
        '[data-euiportal="true"]'
      );

      expect(containerPortals.length).toBe(1);
      // The container portal should not also appear as a direct child of body
      const isDirectChildOfBody = Array.from(bodyPortals).some(
        (node) => node === containerPortals[0]
      );
      expect(isDirectChildOfBody).toBe(false);

      // Clean up
      document.body.removeChild(containerEl);
    });

    it('removes the portal node from the container on unmount', () => {
      const containerEl = document.createElement('div');
      document.body.appendChild(containerEl);

      const { unmount } = render(
        <EuiPortal container={containerEl}>Content</EuiPortal>
      );

      expect(
        containerEl.querySelector('[data-euiportal="true"]')
      ).not.toBeNull();

      unmount();

      expect(containerEl.querySelector('[data-euiportal="true"]')).toBeNull();

      // Clean up
      document.body.removeChild(containerEl);
    });

    it('container takes precedence over insert', () => {
      const containerEl = document.createElement('div');
      containerEl.id = 'container';
      document.body.appendChild(containerEl);

      const siblingEl = document.createElement('div');
      siblingEl.id = 'sibling';
      document.body.appendChild(siblingEl);

      render(
        <EuiPortal
          container={containerEl}
          insert={{ sibling: siblingEl, position: 'after' }}
        >
          Content
        </EuiPortal>
      );

      // Should be in the container, not adjacent to the sibling
      expect(
        containerEl.querySelector('[data-euiportal="true"]')
      ).not.toBeNull();
      expect(
        siblingEl.nextElementSibling?.getAttribute('data-euiportal')
      ).not.toBe('true');

      // Clean up
      document.body.removeChild(containerEl);
      document.body.removeChild(siblingEl);
    });
  });
});
