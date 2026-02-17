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
});
