/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';

import { act, fireEvent } from '@testing-library/react';

import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import {
  render,
  screen,
  waitForEuiPopoverClose,
  waitForEuiPopoverOpen,
} from '../../test/rtl';
import { keys } from '../../services';
import {
  EuiPopover,
  type EuiPopoverProps,
  type EuiPopoverRef,
} from './popover';

const runOnlyPendingTimers = () => act(() => jest.runOnlyPendingTimers());

describe('EuiPopover', () => {
  shouldRenderCustomStyles(
    <EuiPopover
      {...requiredProps}
      button={<button />}
      closePopover={() => {}}
    />
  );
  shouldRenderCustomStyles(
    <EuiPopover
      {...requiredProps}
      button={<button />}
      closePopover={() => {}}
      isOpen
    />,
    {
      childProps: ['panelProps'],
      skip: {
        parentTest: true,
        style: true, // EuiPopoverPanel does not allow custom `style`s
      },
    }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiPopover
        button={<button />}
        closePopover={() => {}}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('children is rendered', () => {
    const { container } = render(
      <EuiPopover
        {...requiredProps}
        button={<button />}
        closePopover={() => {}}
      >
        Children
      </EuiPopover>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('exposes the positioning API through its ref', () => {
    const ref = React.createRef<EuiPopoverRef>();
    const props: EuiPopoverProps = {
      ...requiredProps,
      button: <button />,
      closePopover: () => {},
    };

    render(<EuiPopover {...props} ref={ref} />);

    expect(ref.current?.positionPopoverFluid).toEqual(expect.any(Function));
  });

  it('updates consumer refs when ref props change', () => {
    const firstPopoverRef = jest.fn();
    const nextPopoverRef = jest.fn();
    const firstPanelRef = jest.fn();
    const nextPanelRef = jest.fn();
    const props = {
      ...requiredProps,
      button: <button />,
      closePopover: () => {},
      isOpen: true,
    };
    const { rerender } = render(
      <EuiPopover
        {...props}
        popoverRef={firstPopoverRef}
        panelRef={firstPanelRef}
      />
    );

    expect(firstPopoverRef).toHaveBeenLastCalledWith(expect.any(HTMLElement));
    expect(firstPanelRef).toHaveBeenLastCalledWith(expect.any(HTMLElement));

    rerender(
      <EuiPopover
        {...props}
        popoverRef={nextPopoverRef}
        panelRef={nextPanelRef}
      />
    );

    expect(firstPopoverRef).toHaveBeenLastCalledWith(null);
    expect(firstPanelRef).toHaveBeenLastCalledWith(null);
    expect(nextPopoverRef).toHaveBeenLastCalledWith(expect.any(HTMLElement));
    expect(nextPanelRef).toHaveBeenLastCalledWith(expect.any(HTMLElement));
  });

  it.each([
    ['anchorPosition', { anchorPosition: 'downRight' as const }],
    ['attachToAnchor', { attachToAnchor: true }],
    ['buffer', { buffer: 8 }],
    ['container', { container: document.createElement('div') }],
    ['display', { display: 'block' as const }],
    ['hasArrow', { hasArrow: true }],
    ['offset', { offset: 8 }],
    ['panelClassName', { panelClassName: 'widePanel' }],
    ['panelPaddingSize', { panelPaddingSize: 's' as const }],
    ['panelProps', { panelProps: { className: 'widePanel' } }],
    ['panelStyle', { panelStyle: { width: 200 } }],
    ['repositionToCrossAxis', { repositionToCrossAxis: false }],
    ['zIndex', { zIndex: 10 }],
  ])('repositions when %s changes', (_, changedProps) => {
    const onPositionChange = jest.fn();
    const props = {
      ...requiredProps,
      button: <button />,
      closePopover: () => {},
      isOpen: true,
      onPositionChange,
    };
    const { rerender } = render(<EuiPopover {...props} />);
    const initialCallCount = onPositionChange.mock.calls.length;

    rerender(<EuiPopover {...props} {...changedProps} />);

    expect(onPositionChange.mock.calls.length).toBeGreaterThan(
      initialCallCount
    );
  });

  it('repositions on resize in StrictMode', () => {
    const onPositionChange = jest.fn();
    render(
      <React.StrictMode>
        <EuiPopover
          {...requiredProps}
          button={<button />}
          closePopover={() => {}}
          isOpen
          onPositionChange={onPositionChange}
        />
      </React.StrictMode>
    );
    const initialCallCount = onPositionChange.mock.calls.length;

    act(() => window.dispatchEvent(new Event('resize')));

    expect(onPositionChange.mock.calls.length).toBeGreaterThan(
      initialCallCount
    );
  });

  describe('props', () => {
    describe('display block', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPopover
            {...requiredProps}
            display="block"
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('closePopover', () => {
      beforeAll(() => jest.useFakeTimers());
      afterAll(() => jest.useRealTimers());

      it('is called when ESC key is hit and the popover is open', async () => {
        const closePopoverHandler = jest.fn();

        const { container, rerender } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen
          />
        );

        fireEvent.keyDown(container, {
          key: keys.ESCAPE,
        });

        rerender(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen={false}
          />
        );

        expect(closePopoverHandler).toHaveBeenCalledTimes(1);
      });

      it('is not called when ESC key is hit and the popover is closed', () => {
        const closePopoverHandler = jest.fn();

        const { container } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen={false}
          />
        );

        fireEvent.keyDown(container, {
          key: keys.ESCAPE,
        });

        expect(closePopoverHandler).not.toHaveBeenCalled();
      });
    });

    describe('anchorPosition', () => {
      test('defaults to centerDown', () => {
        const { container } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('leftCenter is rendered', () => {
        const { container } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
            anchorPosition="leftCenter"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('downRight is rendered', () => {
        const { container } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
            anchorPosition="downRight"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isOpen', () => {
      test('defaults to false', () => {
        const { container } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders true', () => {
        const { baseElement } = render(
          <div>
            <EuiPopover
              {...requiredProps}
              button={<button />}
              closePopover={() => {}}
              isOpen
            />
          </div>
        );

        expect(baseElement).toMatchSnapshot();
      });

      test('opens synchronously', () => {
        const props = {
          ...requiredProps,
          id: 'synchronous',
          button: <button />,
          closePopover: () => {},
        };
        const { baseElement, rerender } = render(<EuiPopover {...props} />);

        rerender(<EuiPopover {...props} isOpen />);

        expect(
          baseElement.querySelector('[data-popover-panel]')
        ).toHaveAttribute('data-popover-open', 'true');
      });
    });

    describe('ownFocus', () => {
      test('defaults to true', () => {
        const { baseElement } = render(
          <div>
            <EuiPopover
              {...requiredProps}
              isOpen
              button={<button />}
              closePopover={() => {}}
            />
          </div>
        );

        expect(baseElement).toMatchSnapshot();
      });

      test('renders false', () => {
        const { baseElement } = render(
          <div>
            <EuiPopover
              {...requiredProps}
              ownFocus={false}
              isOpen
              button={<button />}
              closePopover={() => {}}
            />
          </div>
        );

        expect(baseElement).toMatchSnapshot();
      });
    });
    describe('panelClassName', () => {
      test('is rendered', () => {
        const { baseElement } = render(
          <div>
            <EuiPopover
              {...requiredProps}
              button={<button />}
              closePopover={() => {}}
              panelClassName="test"
              isOpen
            />
          </div>
        );

        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('panelPaddingSize', () => {
      test('is rendered', () => {
        const { baseElement } = render(
          <div>
            <EuiPopover
              {...requiredProps}
              button={<button />}
              closePopover={() => {}}
              panelPaddingSize="s"
              isOpen
            />
          </div>
        );

        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('panelProps', () => {
      test('is rendered', () => {
        const { baseElement } = render(
          <div>
            <EuiPopover
              {...requiredProps}
              button={<button />}
              closePopover={() => {}}
              panelProps={requiredProps}
              isOpen
            />
          </div>
        );

        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('focusTrapProps', () => {
      test('is rendered', () => {
        const { baseElement } = render(
          <div>
            <EuiPopover
              {...requiredProps}
              button={<button />}
              closePopover={() => {}}
              focusTrapProps={{
                clickOutsideDisables: false,
                noIsolation: false,
                scrollLock: false,
              }}
              isOpen
            />
          </div>
        );

        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('offset', () => {
      test('with arrow', () => {
        const { baseElement } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
            offset={10}
            isOpen
            hasArrow
          />
        );

        expect(baseElement.querySelector('[data-popover-panel]')).toHaveStyle({
          top: '18px',
        });
      });

      test('without arrow', () => {
        const { baseElement } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
            offset={10}
            hasArrow={false}
            isOpen
          />
        );

        expect(baseElement.querySelector('[data-popover-panel]')).toHaveStyle({
          top: '10px',
        });
      });

      test('with attachToAnchor', () => {
        const { baseElement } = render(
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
            offset={10}
            attachToAnchor={true}
            isOpen
          />
        );

        expect(baseElement.querySelector('[data-popover-panel]')).toHaveStyle({
          top: '10px',
        });
      });
    });

    describe('arrowChildren', () => {
      test('is rendered', () => {
        const { baseElement } = render(
          <div>
            <EuiPopover
              {...requiredProps}
              button={<button />}
              closePopover={() => {}}
              arrowChildren={<span />}
              isOpen
            />
          </div>
        );

        expect(baseElement).toMatchSnapshot();
      });
    });

    test('buffer', () => {
      const { baseElement } = render(
        <div>
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
            buffer={0}
            isOpen
          />
        </div>
      );

      expect(baseElement).toMatchSnapshot();
    });

    test('buffer for all sides', () => {
      const { baseElement } = render(
        <div>
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
            buffer={[20, 40, 60, 80]}
            isOpen
          />
        </div>
      );

      expect(baseElement).toMatchSnapshot();
    });

    test('popoverScreenReaderText', () => {
      const { baseElement } = render(
        <div>
          <EuiPopover
            {...requiredProps}
            button={<button />}
            closePopover={() => {}}
            isOpen
            ownFocus={false}
            popoverScreenReaderText="Press the up/down arrow keys to navigate"
          />
        </div>
      );

      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('listener cleanup', () => {
    let clearTimeoutSpy: jest.SpyInstance;

    beforeAll(() => {
      jest.useFakeTimers();
      clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    });

    afterAll(() => {
      jest.useRealTimers();
      clearTimeoutSpy.mockRestore();
    });

    it('cleans up timeouts on unmount', () => {
      const { container, unmount } = render(
        <EuiPopover
          {...requiredProps}
          button={<button />}
          closePopover={() => {}}
          panelPaddingSize="s"
          isOpen
        />
      );

      fireEvent.keyDown(container, { key: keys.ESCAPE });

      const clearTimeoutCallCount = clearTimeoutSpy.mock.calls.length;
      unmount();
      expect(clearTimeoutSpy.mock.calls.length).toBeGreaterThan(
        clearTimeoutCallCount
      );

      // EUI's jest configuration throws an error if there are any console.error calls, like
      // React's setState on an unmounted component warning
      // to be future proof, verify that's still the case
      expect(() => {
        console.error('This is a test');
      }).toThrow();

      // execute any pending timeouts and validate the cleanup done by EuiPopover
      runOnlyPendingTimers();
    });
  });

  describe('onEscapeKey', () => {
    const closePopover = jest.fn();

    beforeAll(() => jest.useFakeTimers());
    beforeEach(() => {
      jest.clearAllMocks();
      (document.activeElement as HTMLElement)?.blur(); // Reset focus between tests
    });
    afterAll(() => jest.useRealTimers());

    it('closes the popover and refocuses the toggle button', async () => {
      const toggleButtonEl = React.createRef<HTMLButtonElement>();
      const toggleButton = (
        <button ref={toggleButtonEl} data-test-subj="toggleButton" />
      );

      const { container, getByTestSubject, rerender } = render(
        <EuiPopover
          isOpen={true}
          button={toggleButton}
          closePopover={closePopover}
          {...requiredProps}
        />
      );

      await waitForEuiPopoverOpen();

      fireEvent.keyDown(container, {
        key: keys.ESCAPE,
      });

      rerender(
        <EuiPopover
          isOpen={false}
          button={toggleButton}
          closePopover={closePopover}
          {...requiredProps}
        />
      );

      await waitForEuiPopoverClose();
      runOnlyPendingTimers();

      expect(closePopover).toHaveBeenCalled();
      expect(getByTestSubject('toggleButton')).toHaveFocus();
    });

    it('refocuses the first nested toggle button on focus trap deactivation', async () => {
      const toggleButtonEl = React.createRef<HTMLButtonElement>();
      const toggleDiv = (
        <div>
          <button
            ref={toggleButtonEl}
            tabIndex={-1}
            data-test-subj="toggleButton"
          />
          <button tabIndex={-1} />
        </div>
      );

      const { container, getByTestSubject, rerender } = render(
        <EuiPopover
          isOpen={true}
          button={toggleDiv}
          closePopover={closePopover}
          {...requiredProps}
        />
      );

      await waitForEuiPopoverOpen();

      fireEvent.keyDown(container, {
        key: keys.ESCAPE,
      });

      rerender(
        <EuiPopover
          isOpen={false}
          button={toggleDiv}
          closePopover={closePopover}
          {...requiredProps}
        />
      );

      await waitForEuiPopoverClose();

      runOnlyPendingTimers();

      expect(closePopover).toHaveBeenCalled();
      expect(getByTestSubject('toggleButton')).toHaveFocus();
    });

    it('does not refocus if the toggle button is not focusable', async () => {
      const toggleDivEl = React.createRef<HTMLDivElement>();
      const toggleDiv = <div ref={toggleDivEl} data-test-subj="toggleButton" />;

      const { container, getByTestSubject, rerender } = render(
        <EuiPopover
          isOpen={true}
          button={toggleDiv}
          closePopover={closePopover}
          {...requiredProps}
        />
      );

      await waitForEuiPopoverOpen();

      fireEvent.keyDown(container, {
        key: keys.ESCAPE,
      });

      rerender(
        <EuiPopover
          isOpen={false}
          button={toggleDiv}
          closePopover={closePopover}
          {...requiredProps}
        />
      );

      await waitForEuiPopoverClose();
      runOnlyPendingTimers();

      expect(closePopover).toHaveBeenCalled();
      expect(getByTestSubject('toggleButton')).not.toHaveFocus();
    });
  });

  describe('ARIA attributes on toggle button', () => {
    beforeAll(() => jest.useFakeTimers());
    afterAll(() => jest.useRealTimers());

    it('sets aria-expanded="false" and no aria-controls on initial render', async () => {
      const buttonTrigger = <button data-test-subj="buttonTrigger" />;

      const { getByTestSubject } = render(
        <EuiPopover
          {...requiredProps}
          button={buttonTrigger}
          closePopover={() => {}}
        />
      );

      const button = getByTestSubject('buttonTrigger');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).not.toHaveAttribute('aria-controls');
    });

    it('does not set ARIA attributes for non-button triggers', async () => {
      const inputTrigger = <input data-test-subj="inputTrigger" />;

      const { getByTestSubject } = render(
        <EuiPopover
          {...requiredProps}
          button={inputTrigger}
          isOpen={false}
          closePopover={() => {}}
        />
      );

      const input = getByTestSubject('inputTrigger');
      expect(input).not.toHaveAttribute('aria-expanded');
      expect(input).not.toHaveAttribute('aria-controls');
    });

    it('updates ARIA attributes to reflect the open state', async () => {
      const buttonTrigger = <button data-test-subj="buttonTrigger" />;

      const { rerender, getByTestSubject } = render(
        <EuiPopover
          {...requiredProps}
          isOpen={true}
          button={buttonTrigger}
          closePopover={() => {}}
        />
      );

      const button = getByTestSubject('buttonTrigger');

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(button).toHaveAttribute(
        'aria-controls',
        'euiPopover_generated-id_panelId'
      );

      // Close the popover
      rerender(
        <EuiPopover
          {...requiredProps}
          isOpen={false}
          button={buttonTrigger}
          closePopover={() => {}}
        />
      );

      await waitForEuiPopoverClose();

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).not.toHaveAttribute('aria-controls');
    });
  });

  describe('controlled behavior', () => {
    const mockPopoverInteraction = jest.fn();

    const MockPopoverComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <EuiPopover
          {...requiredProps}
          button={
            <button onClick={() => setIsOpen(!isOpen)}>Open popover</button>
          }
          closePopover={() => setIsOpen(false)}
          isOpen={isOpen}
          data-test-subj="popover"
        >
          <span>Popover content</span>
          <button onClick={mockPopoverInteraction}>
            Button inside popover
          </button>
        </EuiPopover>
      );
    };

    beforeEach(() => {
      mockPopoverInteraction.mockClear();
    });

    it('opens the popover', () => {
      render(<MockPopoverComponent />);

      expect(screen.queryByText('Popover content')).not.toBeInTheDocument();

      fireEvent.click(screen.getByText('Open popover'));

      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });

    it('allows interacting with popover children', async () => {
      render(<MockPopoverComponent />);

      fireEvent.click(screen.getByText('Open popover'));
      await waitForEuiPopoverOpen();
      fireEvent.click(screen.getByText('Button inside popover'));

      expect(mockPopoverInteraction).toHaveBeenCalledTimes(1);
    });

    it('closes the popover on escape key press', async () => {
      render(<MockPopoverComponent />);

      fireEvent.click(screen.getByText('Open popover'));
      await waitForEuiPopoverOpen();
      fireEvent.keyDown(screen.getByTestSubject('popover'), {
        key: keys.ESCAPE,
      });
      await waitForEuiPopoverClose();

      expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
    });
  });
});
