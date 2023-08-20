/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiCollapsibleNavContext } from '../context';
import { EuiCollapsibleNavButton } from './collapsible_nav_button';

describe('EuiCollapsibleNavButton', () => {
  shouldRenderCustomStyles(<EuiCollapsibleNavButton {...requiredProps} />);

  it('renders', () => {
    const { container } = render(
      <EuiCollapsibleNavButton {...requiredProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('push flyout', () => {
    describe('left side', () => {
      it('renders a menu left icon when expanded', () => {
        const { container } = render(
          <EuiCollapsibleNavContext.Provider
            value={{ side: 'left', isPush: true, isCollapsed: false }}
          >
            <EuiCollapsibleNavButton />
          </EuiCollapsibleNavContext.Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(
          container.querySelector('[data-euiicon-type="menuLeft"]')
        ).toBeInTheDocument();
      });

      it('renders a menu right icon when collapsed', () => {
        const { container } = render(
          <EuiCollapsibleNavContext.Provider
            value={{ side: 'left', isPush: true, isCollapsed: true }}
          >
            <EuiCollapsibleNavButton />
          </EuiCollapsibleNavContext.Provider>
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
          <EuiCollapsibleNavContext.Provider
            value={{ side: 'right', isPush: true, isCollapsed: false }}
          >
            <EuiCollapsibleNavButton />
          </EuiCollapsibleNavContext.Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(
          container.querySelector('[data-euiicon-type="menuRight"]')
        ).toBeInTheDocument();
      });

      it('renders a menu left icon when collapsed', () => {
        const { container } = render(
          <EuiCollapsibleNavContext.Provider
            value={{ side: 'right', isPush: true, isCollapsed: true }}
          >
            <EuiCollapsibleNavButton />
          </EuiCollapsibleNavContext.Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(
          container.querySelector('[data-euiicon-type="menuLeft"]')
        ).toBeInTheDocument();
      });
    });
  });

  describe('overlay flyout', () => {
    it('renders an X icon when expanded', () => {
      const { container } = render(
        <EuiCollapsibleNavContext.Provider
          value={{ side: 'left', isPush: false, isCollapsed: false }}
        >
          <EuiCollapsibleNavButton />
        </EuiCollapsibleNavContext.Provider>
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(
        container.querySelector('[data-euiicon-type="cross"]')
      ).toBeInTheDocument();
    });

    it('renders a hamburger icon when collapsed', () => {
      const { container } = render(
        <EuiCollapsibleNavContext.Provider
          value={{ side: 'right', isPush: false, isCollapsed: true }}
        >
          <EuiCollapsibleNavButton />
        </EuiCollapsibleNavContext.Provider>
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(
        container.querySelector('[data-euiicon-type="menu"]')
      ).toBeInTheDocument();
    });
  });
});
