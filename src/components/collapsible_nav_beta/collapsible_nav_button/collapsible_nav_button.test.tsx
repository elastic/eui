/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';

import { EuiCollapsibleNavButton } from './collapsible_nav_button';

describe('EuiCollapsibleNavButton', () => {
  describe('desktop', () => {
    describe('left side', () => {
      it('renders a menu left icon when expanded', () => {
        const { container } = render(
          <EuiCollapsibleNavButton side="left" isCollapsed={false} />
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(
          container.querySelector('[data-euiicon-type="menuLeft"]')
        ).toBeInTheDocument();
      });

      it('renders a menu right icon when collapsed', () => {
        const { container } = render(
          <EuiCollapsibleNavButton side="left" isCollapsed={true} />
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(
          container.querySelector('[data-euiicon-type="menuRight"]')
        ).toBeInTheDocument();
      });
    });

    describe('right side', () => {
      it('renders a menu right icon when expanded', () => {
        const { container } = render(
          <EuiCollapsibleNavButton side="right" isCollapsed={false} />
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(
          container.querySelector('[data-euiicon-type="menuRight"]')
        ).toBeInTheDocument();
      });

      it('renders a menu left icon when collapsed', () => {
        const { container } = render(
          <EuiCollapsibleNavButton side="right" isCollapsed={true} />
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(
          container.querySelector('[data-euiicon-type="menuLeft"]')
        ).toBeInTheDocument();
      });
    });
  });
});
