/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { EuiPortal } from './portal';

describe('EuiPortal', () => {
  it('is rendered', () => {
    const component = mount(
      <div>
        <EuiPortal>Content</EuiPortal>
      </div>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    it('portalRef', () => {
      const portalRef = jest.fn();

      const component = mount(
        <EuiPortal portalRef={portalRef}>Content</EuiPortal>
      );

      expect(portalRef).toHaveBeenCalledTimes(1);
      expect(portalRef.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);

      component.unmount();

      expect(portalRef).toHaveBeenCalledTimes(2);
      expect(portalRef.mock.calls[1][0]).toBeNull();
    });
  });
});
