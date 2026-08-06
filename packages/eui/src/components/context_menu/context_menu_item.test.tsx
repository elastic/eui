/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, focusEuiToolTipTrigger } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';

import { EuiContextMenuItem } from './context_menu_item';
import { toolTipManager } from '../tool_tip/tool_tip_manager';

describe('EuiContextMenuItem', () => {
  // The manager is a module-level singleton that suppresses the entry animation
  // for a tooltip opened shortly after another closed. Without a reset, one
  // test's tooltip leaks an inline `animation: none` into the next one.
  beforeEach(() => {
    toolTipManager.reset();
  });

  shouldRenderCustomStyles(<EuiContextMenuItem />);

  shouldRenderCustomStyles(
    <EuiContextMenuItem toolTipContent="test" data-test-subj="trigger" />,
    {
      childProps: ['toolTipProps', 'toolTipProps.anchorProps'],
      skip: { parentTest: true },
      renderCallback: ({ getByTestSubject }) => {
        fireEvent.mouseOver(getByTestSubject('trigger'));
      },
    }
  );

  it('renders', () => {
    const { container } = render(
      <EuiContextMenuItem {...requiredProps} href="url">
        Hello
      </EuiContextMenuItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('icon', () => {
      const { container } = render(
        <EuiContextMenuItem icon={<span className="euiIcon fa-user" />} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled', () => {
      const { container } = render(<EuiContextMenuItem href="url" disabled />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('color', () => {
      const { container } = render(
        <EuiContextMenuItem onClick={() => {}} color="danger">
          Delete
        </EuiContextMenuItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('color is ignored when disabled', () => {
      const { container } = render(
        <EuiContextMenuItem onClick={() => {}} color="danger" disabled>
          Delete
        </EuiContextMenuItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('onClick', () => {
      it('renders a button', () => {
        const { container } = render(
          <EuiContextMenuItem {...requiredProps} onClick={() => {}} />
        );

        expect(container.firstChild?.nodeName).toEqual('BUTTON');
      });

      it('is called when the item is clicked', () => {
        const onClickHandler = jest.fn();

        const { container } = render(
          <EuiContextMenuItem onClick={onClickHandler} />
        );
        expect(onClickHandler).not.toHaveBeenCalled();

        fireEvent.click(container.firstChild!);
        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });

      it('is not called when the item is clicked but set to disabled', () => {
        const onClickHandler = jest.fn();

        const { container } = render(
          <EuiContextMenuItem disabled onClick={onClickHandler} />
        );

        fireEvent.click(container.firstChild!);

        expect(onClickHandler).not.toHaveBeenCalled();
      });
    });

    test('href', () => {
      const { container } = render(
        <EuiContextMenuItem {...requiredProps} href="url" />
      );

      expect(container.firstChild?.nodeName).toEqual('A');
    });

    test('rel', () => {
      const { container } = render(
        <EuiContextMenuItem {...requiredProps} href="url" rel="help" />
      );

      expect(container.querySelector('a')).toHaveAttribute(
        'rel',
        'help noreferrer'
      );
    });

    test('target', () => {
      const { container } = render(
        <EuiContextMenuItem {...requiredProps} href="url" target="_blank" />
      );

      expect(container.querySelector('a')).toHaveAttribute('target', '_blank');
    });

    test('hasPanel renders a right arrow', () => {
      const { container } = render(<EuiContextMenuItem hasPanel />);

      expect(
        container.querySelector('.euiContextMenu__arrow')
      ).toBeInTheDocument();
    });
  });

  describe('tooltip behavior', () => {
    const renderWithToolTip = () =>
      render(
        <EuiContextMenuItem
          toolTipContent="tooltip content"
          toolTipProps={{ title: 'Test', position: 'top' }}
        >
          Hello
        </EuiContextMenuItem>
      );

    it('renders no tooltip until the item is hovered', () => {
      const { queryByRole } = renderWithToolTip();

      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('shows the tooltip title and content on hover', () => {
      const { getByRole } = renderWithToolTip();

      fireEvent.mouseOver(getByRole('button'));

      const tooltip = getByRole('tooltip');
      expect(tooltip).toHaveTextContent('Test');
      expect(tooltip).toHaveTextContent('tooltip content');
    });

    it('describes the item with the tooltip for assistive technology', () => {
      const { getByRole } = renderWithToolTip();

      fireEvent.mouseOver(getByRole('button'));

      expect(getByRole('button')).toHaveAttribute(
        'aria-describedby',
        getByRole('tooltip').id
      );
    });

    it('forces the tooltip to the right, ignoring `toolTipProps.position`', () => {
      const { getByRole } = renderWithToolTip();

      fireEvent.mouseOver(getByRole('button'));

      expect(getByRole('tooltip')).toHaveAttribute('data-position', 'right');
    });

    it('renders as a button so the tooltip is keyboard reachable', () => {
      const { getByRole } = renderWithToolTip();

      expect(getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  describe('hasAriaDisabled', () => {
    it('renders `aria-disabled` when `disabled=true`', () => {
      const { getByTestSubject } = render(
        <EuiContextMenuItem
          hasAriaDisabled
          disabled
          onClick={() => {}}
          data-test-subj="item"
        />
      );

      const item = getByTestSubject('item');

      expect(item).toBeEuiDisabled();
      expect(item).toHaveAttribute('aria-disabled', 'true');
      expect(item).not.toHaveAttribute('disabled');
    });

    it('keeps the `toolTipContent` reachable on focus', () => {
      const { getByRole } = render(
        <EuiContextMenuItem hasAriaDisabled disabled toolTipContent="Nope">
          Hello
        </EuiContextMenuItem>
      );

      const item = getByRole('button');
      item.focus();

      // a natively disabled button is not focusable, which is the whole point
      // of swapping `disabled` for `aria-disabled`
      expect(item).toHaveFocus();

      const cleanup = focusEuiToolTipTrigger(item);

      expect(getByRole('tooltip')).toHaveTextContent('Nope');

      cleanup();
    });

    it('does not call `onClick` while aria-disabled', () => {
      const onClickHandler = jest.fn();

      const { getByTestSubject } = render(
        <EuiContextMenuItem
          hasAriaDisabled
          disabled
          onClick={onClickHandler}
          data-test-subj="item"
        />
      );

      fireEvent.click(getByTestSubject('item'));

      expect(onClickHandler).not.toHaveBeenCalled();
    });
  });
});
