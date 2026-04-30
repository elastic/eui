/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createRef, StrictMode, useRef } from 'react';
import { act, fireEvent } from '@testing-library/react';
import {
  render,
  waitForEuiToolTipVisible,
  waitForEuiToolTipHidden,
  focusEuiToolTipTrigger,
} from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiToolTip } from './tool_tip';
import type { EuiToolTipRef } from './tool_tip';

describe('EuiToolTip', () => {
  shouldRenderCustomStyles(
    <EuiToolTip content="test">
      <button data-test-subj="trigger" />
    </EuiToolTip>,
    {
      childProps: ['anchorProps'],
      renderCallback: async ({ getByTestSubject }) => {
        fireEvent.mouseOver(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();
      },
    }
  );

  it('is rendered', () => {
    const { baseElement } = render(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button>Trigger</button>
      </EuiToolTip>
    );

    expect(baseElement).toMatchSnapshot();
  });

  describe('visibility', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('shows on mouseover and hides on mouseout', async () => {
      const { getByTestSubject, queryByRole } = render(
        <EuiToolTip content="Tooltip content">
          <button data-test-subj="trigger">Trigger</button>
        </EuiToolTip>
      );

      expect(queryByRole('tooltip')).not.toBeInTheDocument();

      fireEvent.mouseOver(getByTestSubject('trigger'));
      await waitForEuiToolTipVisible();
      expect(queryByRole('tooltip')).toBeInTheDocument();

      fireEvent.mouseOut(getByTestSubject('trigger'));
      await waitForEuiToolTipHidden();
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('shows on initial autoFocus in StrictMode', async () => {
      const originalMatches = Element.prototype.matches;
      const spy = jest
        .spyOn(Element.prototype, 'matches')
        .mockImplementation(function (this: Element, selector: string) {
          return selector === ':focus-visible'
            ? true
            : originalMatches.call(this, selector);
        });

      try {
        const { getByTestSubject, queryByRole } = render(
          <StrictMode>
            <EuiToolTip content="Tooltip content">
              <button data-test-subj="trigger" autoFocus>
                Trigger
              </button>
            </EuiToolTip>
          </StrictMode>
        );

        await waitForEuiToolTipVisible();
        expect(queryByRole('tooltip')).toBeInTheDocument();

        fireEvent.blur(getByTestSubject('trigger'));
        await waitForEuiToolTipHidden();
        expect(queryByRole('tooltip')).not.toBeInTheDocument();
      } finally {
        spy.mockRestore();
      }
    });

    it('shows on keyboard focus and hides on blur', async () => {
      const { getByTestSubject, queryByRole } = render(
        <EuiToolTip content="Tooltip content">
          <button data-test-subj="trigger">Trigger</button>
        </EuiToolTip>
      );

      expect(queryByRole('tooltip')).not.toBeInTheDocument();

      const trigger = getByTestSubject('trigger');
      const cleanup = focusEuiToolTipTrigger(trigger);
      await waitForEuiToolTipVisible();
      expect(queryByRole('tooltip')).toBeInTheDocument();

      fireEvent.blur(trigger);
      await waitForEuiToolTipHidden();
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
      cleanup();
    });

    it('does not show on mouse-click focus', () => {
      const { getByTestSubject, queryByRole } = render(
        <EuiToolTip content="Tooltip content">
          <button data-test-subj="trigger">Trigger</button>
        </EuiToolTip>
      );

      // Intentionally using plain `fireEvent.focus` (no `:focus-visible`) to simulate mouse-click focus
      // eslint-disable-next-line @elastic/eui/prefer-tooltip-trigger-focus-test-utility
      fireEvent.focus(getByTestSubject('trigger'));
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('persists tooltip on mouseout when trigger was keyboard-focused', async () => {
      const { getByTestSubject, queryByRole } = render(
        <EuiToolTip content="Tooltip content">
          <button data-test-subj="trigger">Trigger</button>
        </EuiToolTip>
      );

      const trigger = getByTestSubject('trigger');
      const cleanup = focusEuiToolTipTrigger(trigger);
      await waitForEuiToolTipVisible();

      fireEvent.mouseOut(getByTestSubject('trigger'));
      // Tooltip stays visible because `hasFocus=true` (keyboard focus)
      expect(queryByRole('tooltip')).toBeInTheDocument();
      cleanup();
    });

    it('hides tooltip on mouseout when trigger was mouse-click focused', async () => {
      const { getByTestSubject, queryByRole } = render(
        <EuiToolTip content="Tooltip content">
          <button data-test-subj="trigger">Trigger</button>
        </EuiToolTip>
      );

      // Show on hover first, then click-focus (no `:focus-visible`)
      fireEvent.mouseOver(getByTestSubject('trigger'));
      await waitForEuiToolTipVisible();
      // Intentionally using plain `fireEvent.focus` (no `:focus-visible`) to simulate mouse-click focus
      // eslint-disable-next-line @elastic/eui/prefer-tooltip-trigger-focus-test-utility
      fireEvent.focus(getByTestSubject('trigger'));

      fireEvent.mouseOut(getByTestSubject('trigger'));
      // Tooltip hides because `hasFocus` was not set (click focus, not keyboard)
      await waitForEuiToolTipHidden();
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('does not render when neither content nor title are provided', () => {
      jest.useFakeTimers();
      const { queryByRole, getByTestSubject } = render(
        <EuiToolTip>
          <button data-test-subj="trigger">Trigger</button>
        </EuiToolTip>
      );

      fireEvent.mouseOver(getByTestSubject('trigger'));
      // Flush tooltip delay and state queue
      act(() => jest.runAllTimers());

      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders with title only and no content', async () => {
      const { getByTestSubject, getByRole } = render(
        <EuiToolTip title="Tooltip title">
          <button data-test-subj="trigger">Trigger</button>
        </EuiToolTip>
      );

      fireEvent.mouseOver(getByTestSubject('trigger'));
      await waitForEuiToolTipVisible();

      expect(getByRole('tooltip')).toHaveTextContent('Tooltip title');
    });
  });

  describe('props', () => {
    it('applies anchorClassName and anchorProps to the anchor wrapper', () => {
      const { container } = render(
        <EuiToolTip
          content="content"
          anchorClassName="customAnchorClass"
          anchorProps={{ 'data-test-subj': 'anchor' }}
        >
          <button>Trigger</button>
        </EuiToolTip>
      );

      const anchor = container.querySelector('.euiToolTipAnchor');
      expect(anchor).toHaveClass('customAnchorClass');
      expect(anchor).toHaveAttribute('data-test-subj', 'anchor');
    });

    it('display="block" applies a different CSS class than display="inlineBlock"', () => {
      const { container: blockContainer } = render(
        <EuiToolTip content="content" display="block">
          <button>Trigger</button>
        </EuiToolTip>
      );
      const { container: inlineBlockContainer } = render(
        <EuiToolTip content="content" display="inlineBlock">
          <button>Trigger</button>
        </EuiToolTip>
      );

      const blockAnchor = blockContainer.querySelector('.euiToolTipAnchor')!;
      const inlineBlockAnchor =
        inlineBlockContainer.querySelector('.euiToolTipAnchor')!;
      expect(blockAnchor.className).not.toEqual(inlineBlockAnchor.className);
    });

    it('calls the onMouseOut prop callback on mouseout', async () => {
      const onMouseOut = jest.fn();
      const { getByTestSubject } = render(
        <EuiToolTip content="content" onMouseOut={onMouseOut}>
          <button data-test-subj="trigger" />
        </EuiToolTip>
      );

      fireEvent.mouseOver(getByTestSubject('trigger'));
      await waitForEuiToolTipVisible();

      fireEvent.mouseOut(getByTestSubject('trigger'));
      expect(onMouseOut).toHaveBeenCalledTimes(1);
    });
  });

  describe('aria-describedby', () => {
    it('by default, sets an `aria-describedby` on the anchor when the tooltip is visible', async () => {
      const { getByTestSubject } = render(
        <EuiToolTip content="Tooltip content" id="toolTipId">
          <button data-test-subj="anchor" />
        </EuiToolTip>
      );
      fireEvent.mouseOver(getByTestSubject('anchor'));
      await waitForEuiToolTipVisible();

      expect(getByTestSubject('anchor')).toHaveAttribute(
        'aria-describedby',
        'toolTipId'
      );
    });

    it('removes `aria-describedby` when the tooltip is hidden', async () => {
      const { getByTestSubject } = render(
        <EuiToolTip content="Tooltip content" id="toolTipId">
          <button data-test-subj="anchor" />
        </EuiToolTip>
      );

      fireEvent.mouseOver(getByTestSubject('anchor'));
      await waitForEuiToolTipVisible();
      expect(getByTestSubject('anchor')).toHaveAttribute(
        'aria-describedby',
        'toolTipId'
      );

      fireEvent.mouseOut(getByTestSubject('anchor'));
      await waitForEuiToolTipHidden();
      expect(getByTestSubject('anchor')).not.toHaveAttribute(
        'aria-describedby'
      );
    });

    it('does not add `aria-describedby` when `disableScreenReaderOutput` is `true`', async () => {
      const { getByTestSubject } = render(
        <EuiToolTip
          content="Tooltip content"
          id="toolTipId"
          disableScreenReaderOutput={true}
        >
          <button data-test-subj="anchor" />
        </EuiToolTip>
      );
      fireEvent.mouseOver(getByTestSubject('anchor'));
      await waitForEuiToolTipVisible();

      expect(getByTestSubject('anchor')).not.toHaveAttribute(
        'aria-describedby'
      );
    });

    it('merges with custom consumer `aria-describedby`s', async () => {
      const { getByTestSubject } = render(
        <EuiToolTip content="Tooltip content" id="toolTipId">
          <button data-test-subj="anchor" aria-describedby="customId" />
        </EuiToolTip>
      );
      fireEvent.mouseOver(getByTestSubject('anchor'));
      await waitForEuiToolTipVisible();

      expect(getByTestSubject('anchor')).toHaveAttribute(
        'aria-describedby',
        'toolTipId customId'
      );
    });

    it('adds custom consumer `aria-describedby` when `disableScreenReaderOutput` is `true`', async () => {
      const { getByTestSubject } = render(
        <EuiToolTip
          content="Tooltip content"
          id="toolTipId"
          disableScreenReaderOutput={true}
        >
          <button data-test-subj="anchor" aria-describedby="customId" />
        </EuiToolTip>
      );
      fireEvent.mouseOver(getByTestSubject('anchor'));
      await waitForEuiToolTipVisible();

      expect(getByTestSubject('anchor')).toHaveAttribute(
        'aria-describedby',
        'customId'
      );
    });
  });

  describe('disableScreenReaderOutput', () => {
    it('when false (default), Escape stops event propagation while tooltip is visible', async () => {
      const parentKeyDown = jest.fn();
      const { getByTestSubject } = render(
        <div onKeyDown={parentKeyDown}>
          <EuiToolTip content="content">
            <button data-test-subj="trigger" />
          </EuiToolTip>
        </div>
      );

      const trigger = getByTestSubject('trigger');
      const cleanup = focusEuiToolTipTrigger(trigger);
      await waitForEuiToolTipVisible();

      fireEvent.keyDown(getByTestSubject('trigger'), { key: 'Escape' });
      await waitForEuiToolTipHidden();

      expect(parentKeyDown).not.toHaveBeenCalled();
      cleanup();
    });

    it('when true, Escape does not stop event propagation', async () => {
      const parentKeyDown = jest.fn();
      const { getByTestSubject } = render(
        <div onKeyDown={parentKeyDown}>
          <EuiToolTip content="content" disableScreenReaderOutput={true}>
            <button data-test-subj="trigger" />
          </EuiToolTip>
        </div>
      );

      const trigger = getByTestSubject('trigger');
      const cleanup = focusEuiToolTipTrigger(trigger);
      await waitForEuiToolTipVisible();

      fireEvent.keyDown(getByTestSubject('trigger'), { key: 'Escape' });
      await waitForEuiToolTipHidden();

      expect(parentKeyDown).toHaveBeenCalledTimes(1);
      cleanup();
    });

    it('when true, tooltip still renders visually', async () => {
      const { getByTestSubject, getByRole } = render(
        <EuiToolTip content="Tooltip content" disableScreenReaderOutput={true}>
          <button data-test-subj="trigger" />
        </EuiToolTip>
      );

      fireEvent.mouseOver(getByTestSubject('trigger'));
      await waitForEuiToolTipVisible();

      expect(getByRole('tooltip')).toBeInTheDocument();
    });
  });

  describe('ref', () => {
    describe('showToolTip / hideToolTip', () => {
      // Although we don't publicly recommend it, consumers may need to reach into EuiToolTip
      // to manually control visibility state via `show/hideToolTip`, exposed via `useImperativeHandle`.

      test('showToolTip', async () => {
        const ConsumerToolTip = () => {
          const toolTipRef = useRef<EuiToolTipRef>(null);

          const showToolTip = () => {
            toolTipRef.current?.showToolTip();
          };

          // NOTE: KEEP IN MIND THAT THIS IS BAD ACCESSIBILITY PRACTICE AND ONLY HERE FOR TESTING
          // Because focus is on separate item from the tooltip, aria-describedby does not trigger
          // and the tooltip contents are not read out to screen readers
          return (
            <>
              <EuiToolTip content="Tooltip text" ref={toolTipRef}>
                <span>Not focusable</span>
              </EuiToolTip>
              <button data-test-subj="trigger" onClick={showToolTip}>
                Controls tooltip
              </button>
            </>
          );
        };
        const { getByTestSubject, getByRole, queryByRole } = render(
          <ConsumerToolTip />
        );

        expect(queryByRole('tooltip')).not.toBeInTheDocument();

        fireEvent.click(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();

        expect(getByRole('tooltip')).toBeInTheDocument();
      });

      test('hideToolTip', async () => {
        // Consumers appear to mostly want this after modal/flyout/focus trap close, when
        // focus is returned to toggling buttons with a tooltip, & said tooltip blocks UI
        // @see https://github.com/elastic/eui/issues/5883#issuecomment-1120908605 for example
        const ConsumerToolTip = () => {
          const toolTipRef = useRef<EuiToolTipRef>(null);

          const hideToolTip = () => {
            toolTipRef.current?.hideToolTip();
          };

          return (
            <>
              <EuiToolTip content="Tooltip text" ref={toolTipRef}>
                <button data-test-subj="trigger" onClick={hideToolTip}>
                  Closes tooltip on click
                </button>
              </EuiToolTip>
            </>
          );
        };
        const { getByTestSubject, queryByRole } = render(<ConsumerToolTip />);

        fireEvent.mouseOver(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();
        expect(queryByRole('tooltip')).toBeInTheDocument();

        fireEvent.click(getByTestSubject('trigger'));
        await waitForEuiToolTipHidden();

        expect(queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    describe('id', () => {
      it('exposes the id prop value', () => {
        const ref = createRef<EuiToolTipRef>();
        render(
          <EuiToolTip content="content" id="custom-id" ref={ref}>
            <button>Trigger</button>
          </EuiToolTip>
        );
        expect(ref.current?.id).toBe('custom-id');
      });

      it('exposes a generated id when no id prop is provided', () => {
        const ref = createRef<EuiToolTipRef>();
        render(
          <EuiToolTip content="content" ref={ref}>
            <button>Trigger</button>
          </EuiToolTip>
        );
        expect(ref.current?.id).toBeTruthy();
      });
    });
  });
});
