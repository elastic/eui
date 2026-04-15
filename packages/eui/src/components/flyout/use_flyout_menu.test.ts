/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../test/rtl/render_hook';
import { useEuiFlyoutMenu, UseEuiFlyoutMenu } from './use_flyout_menu';
import { MENU_DISPLAY_ALWAYS, MENU_DISPLAY_AUTO } from './const';

const defaultProps: UseEuiFlyoutMenu = {
  flyoutMenuDisplayMode: MENU_DISPLAY_ALWAYS,
  flyoutMenuProps: { title: 'Test Menu Title' },
};

describe('useEuiFlyoutMenu', () => {
  const render = (initialProps: Partial<UseEuiFlyoutMenu> = {}) =>
    renderHook((props: UseEuiFlyoutMenu) => useEuiFlyoutMenu(props), {
      initialProps: {
        ...defaultProps,
        ...initialProps,
      },
    });

  describe('flyoutMenuId', () => {
    it('uses provided menu titleId when available', () => {
      const { result } = render({
        flyoutMenuProps: { titleId: 'custom-title-id' },
      });
      expect(result.current.flyoutMenuId).toBe('custom-title-id');
    });

    it('generates an ID when titleId is not provided', () => {
      const { result } = render({
        flyoutMenuProps: { titleId: undefined },
      });
      expect(result.current.flyoutMenuId).toMatch(/^generated-id/);
    });
  });

  describe('shouldRenderMenu with display modes', () => {
    describe('always mode', () => {
      it('returns true even when menu has no content', () => {
        const { result } = render({
          flyoutMenuDisplayMode: MENU_DISPLAY_ALWAYS,
          flyoutMenuProps: {},
        });
        expect(result.current.shouldRenderMenu).toBe(true);
      });
    });

    describe('auto mode', () => {
      it('returns true when menu has back button', () => {
        const { result } = render({
          flyoutMenuDisplayMode: MENU_DISPLAY_AUTO,
          flyoutMenuProps: { showBackButton: true },
        });
        expect(result.current.shouldRenderMenu).toBe(true);
      });

      it('returns true when menu has history items', () => {
        const { result } = render({
          flyoutMenuDisplayMode: MENU_DISPLAY_AUTO,
          flyoutMenuProps: {
            historyItems: [{ title: 'Previous', onClick: () => {} }],
          },
        });
        expect(result.current.shouldRenderMenu).toBe(true);
      });

      it('returns true when menu has custom actions', () => {
        const { result } = render({
          flyoutMenuDisplayMode: MENU_DISPLAY_AUTO,
          flyoutMenuProps: {
            customActions: [
              { iconType: 'gear', onClick: () => {}, 'aria-label': 'Settings' },
            ],
          },
        });
        expect(result.current.shouldRenderMenu).toBe(true);
      });

      it('returns true when menu has visible title', () => {
        const { result } = render({
          flyoutMenuDisplayMode: MENU_DISPLAY_AUTO,
          flyoutMenuProps: { title: 'Visible Title', hideTitle: false },
        });
        expect(result.current.shouldRenderMenu).toBe(true);
      });

      it('returns false when menu has no content', () => {
        const { result } = render({
          flyoutMenuDisplayMode: MENU_DISPLAY_AUTO,
          flyoutMenuProps: {},
        });
        expect(result.current.shouldRenderMenu).toBe(false);
      });

      it('returns false when menu only has a hidden title', () => {
        const { result } = render({
          flyoutMenuDisplayMode: MENU_DISPLAY_AUTO,
          flyoutMenuProps: { title: 'Title to hide', hideTitle: true },
        });
        expect(result.current.shouldRenderMenu).toBe(false);
      });

      it('returns false when menu has title and hideTitle is not explicitly set', () => {
        const { result } = render({
          flyoutMenuDisplayMode: MENU_DISPLAY_AUTO,
          flyoutMenuProps: { title: 'Title to hide' },
        });
        expect(result.current.shouldRenderMenu).toBe(false);
      });
    });
  });

  describe('ariaLabelledBy', () => {
    it('includes flyoutMenuId when menu is rendered', () => {
      const { result } = render({
        flyoutMenuProps: { titleId: 'menu-title' },
      });
      expect(result.current.ariaLabelledBy).toBe('menu-title');
    });

    it('combines flyoutMenuId with existing ariaLabelledBy', () => {
      const { result } = render({
        flyoutMenuProps: { titleId: 'menu-title' },
        ariaLabelledBy: 'existing-label',
      });
      expect(result.current.ariaLabelledBy).toBe('menu-title existing-label');
    });

    it('excludes flyoutMenuId when auto mode hides the menu', () => {
      const { result } = render({
        flyoutMenuDisplayMode: MENU_DISPLAY_AUTO,
        flyoutMenuProps: { titleId: 'menu-title' },
        ariaLabelledBy: 'existing-label',
      });
      expect(result.current.ariaLabelledBy).toBe('existing-label');
    });
  });
});
