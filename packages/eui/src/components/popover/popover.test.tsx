/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';

import { act, fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import {
  render,
  waitForEuiPopoverClose,
  waitForEuiPopoverOpen,
} from '../../test/rtl';

import { keys } from '../../services';

import {
  EuiPopover,
  getPopoverPositionFromAnchorPosition,
  getPopoverAlignFromAnchorPosition,
  PopoverAnchorPosition,
} from './popover';

const actAdvanceTimersByTime = (time: number) =>
  act(() => jest.advanceTimersByTime(time));

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: ReactNode }) => children,
}));

let id = 0;
const getId = () => `${id++}`;

const closingTransitionTime = 250; // TODO: DRY out var when converting to CSS-in-JS
const openingTransitionTime = closingTransitionTime;

describe('EuiPopover', () => {
  shouldRenderCustomStyles(
    <EuiPopover button={<button />} closePopover={() => {}} />
  );
  shouldRenderCustomStyles(
    <EuiPopover button={<button />} closePopover={() => {}} isOpen />,
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
        id={getId()}
        button={<button />}
        closePopover={() => {}}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('children is rendered', () => {
    const { container } = render(
      <EuiPopover id={getId()} button={<button />} closePopover={() => {}}>
        Children
      </EuiPopover>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('display block', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPopover
            id={getId()}
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
        const id = getId();

        const { container, rerender } = render(
          <EuiPopover
            id={id}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen
          />
        );

        actAdvanceTimersByTime(closingTransitionTime);

        fireEvent.keyDown(container, {
          key: keys.ESCAPE,
        });

        rerender(
          <EuiPopover
            id={id}
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
            id={getId()}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen={false}
          />
        );

        actAdvanceTimersByTime(closingTransitionTime);

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
            id={getId()}
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('leftCenter is rendered', () => {
        const { container } = render(
          <EuiPopover
            id={getId()}
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
            id={getId()}
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
            id={getId()}
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders true', () => {
        const { container } = render(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              isOpen
            />
          </div>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('ownFocus', () => {
      test('defaults to true', () => {
        const { container } = render(
          <div>
            <EuiPopover
              id={getId()}
              isOpen
              button={<button />}
              closePopover={() => {}}
            />
          </div>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders false', () => {
        const { container } = render(
          <div>
            <EuiPopover
              ownFocus={false}
              id={getId()}
              isOpen
              button={<button />}
              closePopover={() => {}}
            />
          </div>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
    describe('panelClassName', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelClassName="test"
              isOpen
            />
          </div>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('panelPaddingSize', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelPaddingSize="s"
              isOpen
            />
          </div>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('panelProps', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelProps={requiredProps}
              isOpen
            />
          </div>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('focusTrapProps', () => {
      test('is rendered', () => {
        const { container } = render(
          <div>
            <EuiPopover
              id={getId()}
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

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('offset', () => {
      test('with arrow', () => {
        const { baseElement } = render(
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            offset={10}
            isOpen
            hasArrow
          />
        );

        expect(baseElement.querySelector('[data-popover-panel]')).toHaveStyle({
          top: '26px',
        });
      });

      test('without arrow', () => {
        const { baseElement } = render(
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            offset={10}
            hasArrow={false}
            isOpen
          />
        );

        expect(baseElement.querySelector('[data-popover-panel]')).toHaveStyle({
          top: '18px',
        });
      });

      test('with attachToAnchor', () => {
        const { baseElement } = render(
          <EuiPopover
            id={getId()}
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
        const { container } = render(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              arrowChildren={<span />}
              isOpen
            />
          </div>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('buffer', () => {
      const { container } = render(
        <div>
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            buffer={0}
            isOpen
          />
        </div>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('buffer for all sides', () => {
      const { container } = render(
        <div>
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            buffer={[20, 40, 60, 80]}
            isOpen
          />
        </div>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('popoverScreenReaderText', () => {
      const { container } = render(
        <div>
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            isOpen
            ownFocus={false}
            popoverScreenReaderText="Press the up/down arrow keys to navigate"
          />
        </div>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('listener cleanup', () => {
    let rafSpy: jest.SpyInstance;
    let cafSpy: jest.SpyInstance;
    const activeAnimationFrames = new Map<number, number>();
    let nextAnimationFrameId = 0;

    beforeAll(() => {
      jest.useFakeTimers();
      jest.spyOn(window, 'clearTimeout');
      rafSpy = jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((fn) => {
          const animationFrameId = nextAnimationFrameId++;
          activeAnimationFrames.set(animationFrameId, setTimeout(fn));
          return animationFrameId;
        });
      cafSpy = jest
        .spyOn(window, 'cancelAnimationFrame')
        .mockImplementation((id: number) => {
          const timeoutId = activeAnimationFrames.get(id);
          if (timeoutId) {
            clearTimeout(timeoutId);
            activeAnimationFrames.delete(id);
          }
        });
    });

    afterAll(() => {
      jest.useRealTimers();
      rafSpy.mockRestore();
      cafSpy.mockRestore();
    });

    it('cleans up timeouts and rAFs on unmount', () => {
      const { rerender, unmount } = render(
        <EuiPopover
          id={getId()}
          button={<button />}
          closePopover={() => {}}
          panelPaddingSize="s"
          isOpen={false}
        />
      );
      expect(window.clearTimeout).toHaveBeenCalledTimes(0);

      rerender(
        <EuiPopover
          id={getId()}
          isOpen={true}
          button={<button />}
          closePopover={() => {}}
          panelPaddingSize="s"
        />
      );

      expect(window.clearTimeout).toHaveBeenCalledTimes(3);
      expect(rafSpy).toHaveBeenCalledTimes(1);
      expect(activeAnimationFrames.size).toEqual(1);

      unmount();
      expect(window.clearTimeout).toHaveBeenCalledTimes(9);
      expect(cafSpy).toHaveBeenCalledTimes(1);
      expect(activeAnimationFrames.size).toEqual(0);

      // EUI's jest configuration throws an error if there are any console.error calls, like
      // React's setState on an unmounted component warning
      // to be future proof, verify that's still the case
      expect(() => {
        console.error('This is a test');
      }).toThrow();

      // execute any pending timeouts or animation frame callbacks
      // and validate the timeout/rAF clearing done by EuiPopover
      actAdvanceTimersByTime(300);
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

      actAdvanceTimersByTime(openingTransitionTime);
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
      actAdvanceTimersByTime(closingTransitionTime);

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

      actAdvanceTimersByTime(openingTransitionTime);
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

      actAdvanceTimersByTime(closingTransitionTime);

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

      actAdvanceTimersByTime(openingTransitionTime);
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
      actAdvanceTimersByTime(closingTransitionTime);

      expect(closePopover).toHaveBeenCalled();
      expect(getByTestSubject('toggleButton')).not.toHaveFocus();
    });
  });
});

describe('getPopoverPositionFromAnchorPosition', () => {
  it('maps the first anchor position in a camel-cased string to a popover position', () => {
    expect(getPopoverPositionFromAnchorPosition('upLeft')).toBe('top');
    expect(getPopoverPositionFromAnchorPosition('rightDown')).toBe('right');
    expect(getPopoverPositionFromAnchorPosition('downRight')).toBe('bottom');
    expect(getPopoverPositionFromAnchorPosition('leftUp')).toBe('left');
  });

  it('returns undefined when an invalid position is extracted', () => {
    expect(
      getPopoverPositionFromAnchorPosition(
        'nowhereNohow' as PopoverAnchorPosition
      )
    ).toBeUndefined();
  });
});

describe('getPopoverAlignFromAnchorPosition', () => {
  it('maps the second anchor position in a camel-cased string to a popover position', () => {
    expect(getPopoverAlignFromAnchorPosition('upLeft')).toBe('left');
    expect(getPopoverAlignFromAnchorPosition('rightDown')).toBe('bottom');
    expect(getPopoverAlignFromAnchorPosition('downRight')).toBe('right');
    expect(getPopoverAlignFromAnchorPosition('leftUp')).toBe('top');
  });

  it('returns undefined when an invalid position is extracted', () => {
    expect(
      getPopoverAlignFromAnchorPosition('nowhereNohow' as PopoverAnchorPosition)
    ).toBeUndefined();
  });
});
