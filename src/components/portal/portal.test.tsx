/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiPortal } from './portal';
import { render, screen } from '../../test/rtl';

describe('EuiPortal', () => {
  it('renders', () => {
    render(<EuiPortal>Content</EuiPortal>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  describe('behavior', () => {
    it('portalRef', () => {
      let ref: HTMLDivElement | null = null;
      const updateRef = (newRef: HTMLDivElement | null) => {
        ref = newRef;
      };

      const { unmount } = render(
        <EuiPortal portalRef={updateRef}>Content</EuiPortal>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();

      expect(ref).toBeInTheDocument();
      unmount();
      expect(ref).not.toBeInTheDocument();
    });
  });
});
