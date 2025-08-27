/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiResizableContainer } from './resizable_container';
import { keys } from '../../services';

describe('EuiResizableContainer', () => {
  shouldRenderCustomStyles(
    <EuiResizableContainer {...requiredProps}>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
          <EuiResizableButton />
          <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can be vertical', () => {
    const { container } = render(
      <EuiResizableContainer {...requiredProps} direction="vertical">
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can be controlled externally', () => {
    const panel1 = 50;
    const panel2 = 50;
    const { container } = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel size={panel1}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel size={panel2}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can have scrollable panels', () => {
    const { container } = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50} scrollable>
              Testing
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50} scrollable>
              123
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can have more than two panels', () => {
    const { container } = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={33}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={33}>123</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={33}>And again</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can adjust panel props', () => {
    const { container } = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50} paddingSize="none">
              Testing
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50} color="plain">
              123
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can have toggleable panels', () => {
    const { container } = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel mode="collapsible" initialSize={20}>
              Sidebar
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel mode="main" initialSize={80}>
              Sidebar content
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('toggleable panels can be configurable', () => {
    const { container } = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode={[
                'collapsible',
                {
                  'data-test-subj': 'panel-toggle',
                  className: 'panel-toggle',
                  position: 'top',
                },
              ]}
              initialSize={20}
            >
              Sidebar
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel mode="main" initialSize={80}>
              Sidebar content
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('on resize callbacks', () => {
    const renderWithCallbacks = ({
      direction,
    }: {
      direction?: 'vertical' | 'horizontal';
    } = {}) => {
      const onResizeStart = jest.fn();
      const onResizeEnd = jest.fn();
      const { container, getByTestSubject } = render(
        <EuiResizableContainer
          {...requiredProps}
          onResizeStart={onResizeStart}
          onResizeEnd={onResizeEnd}
          direction={direction}
          data-test-subj="euiResizableContainer"
        >
          {(EuiResizablePanel, EuiResizableButton) => (
            <>
              <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
              <EuiResizableButton data-test-subj="euiResizableButton" />
              <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
            </>
          )}
        </EuiResizableContainer>
      );
      const button = getByTestSubject('euiResizableButton');
      return { container, button, onResizeStart, onResizeEnd };
    };

    test('onResizeStart and onResizeEnd are called for pointer events', () => {
      const { button, onResizeStart, onResizeEnd } = renderWithCallbacks();
      fireEvent.mouseDown(button, {
        pageX: 0,
        pageY: 0,
        clientX: 0,
        clientY: 0,
      });
      expect(onResizeStart).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenLastCalledWith('pointer');
      fireEvent.mouseUp(document.body);
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      fireEvent.mouseDown(button, {
        pageX: 0,
        pageY: 0,
        clientX: 0,
        clientY: 0,
      });
      expect(onResizeStart).toHaveBeenCalledTimes(2);
      expect(onResizeStart).toHaveBeenLastCalledWith('pointer');
      fireEvent.mouseUp(document.body);
      expect(onResizeEnd).toHaveBeenCalledTimes(2);
      fireEvent.touchStart(button, {
        targetTouches: [
          {
            clientX: 0,
            clientY: 0,
          },
        ],
      });
      expect(onResizeStart).toHaveBeenCalledTimes(3);
      expect(onResizeStart).toHaveBeenLastCalledWith('pointer');
      fireEvent.touchEnd(document.body);
      expect(onResizeEnd).toHaveBeenCalledTimes(3);
    });

    test('onResizeStart and onResizeEnd are called for left/right keyboard events', () => {
      const { button, onResizeStart, onResizeEnd } = renderWithCallbacks();
      fireEvent.keyDown(button, { key: keys.ARROW_RIGHT });
      expect(onResizeStart).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.keyUp(button, { key: keys.ARROW_RIGHT });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(button, { key: keys.ARROW_LEFT });
      expect(onResizeStart).toHaveBeenCalledTimes(2);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.keyUp(button, { key: keys.ARROW_LEFT });
      expect(onResizeEnd).toHaveBeenCalledTimes(2);
    });

    test('onResizeStart and onResizeEnd are called for up/down keyboard events', () => {
      const { button, onResizeStart, onResizeEnd } = renderWithCallbacks({
        direction: 'vertical',
      });
      fireEvent.keyDown(button, { key: keys.ARROW_UP });
      expect(onResizeStart).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.keyUp(button, { key: keys.ARROW_UP });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(button, { key: keys.ARROW_DOWN });
      expect(onResizeStart).toHaveBeenCalledTimes(2);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.keyUp(button, { key: keys.ARROW_DOWN });
      expect(onResizeEnd).toHaveBeenCalledTimes(2);
    });

    test('onResizeStart and onResizeEnd are called only for the correct keyboard events', () => {
      const { button, onResizeStart, onResizeEnd } = renderWithCallbacks();
      fireEvent.keyDown(button, { key: keys.ARROW_DOWN });
      expect(onResizeStart).toHaveBeenCalledTimes(0);
      fireEvent.keyDown(button, { key: keys.ARROW_RIGHT });
      expect(onResizeStart).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.keyUp(button, { key: keys.ARROW_DOWN });
      expect(onResizeEnd).toHaveBeenCalledTimes(0);
      fireEvent.keyUp(button, { key: keys.ARROW_RIGHT });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
    });

    test('onResizeStart and onResizeEnd are called correctly when switching resize direction with the keyboard', () => {
      const { button, onResizeStart, onResizeEnd } = renderWithCallbacks();
      fireEvent.keyDown(button, { key: keys.ARROW_RIGHT });
      expect(onResizeStart).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.keyDown(button, { key: keys.ARROW_LEFT });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenCalledTimes(2);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.keyUp(button, { key: keys.ARROW_RIGHT });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      fireEvent.keyUp(button, { key: keys.ARROW_LEFT });
      expect(onResizeEnd).toHaveBeenCalledTimes(2);
    });

    test('onResizeEnd is called before starting a new resize if a keyboard resize is triggered while a pointer resize is in progress', () => {
      const { button, onResizeStart, onResizeEnd } = renderWithCallbacks();
      fireEvent.mouseDown(button, {
        pageX: 0,
        pageY: 0,
        clientX: 0,
        clientY: 0,
      });
      expect(onResizeStart).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenLastCalledWith('pointer');
      fireEvent.keyDown(button, { key: keys.ARROW_RIGHT });
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenCalledTimes(2);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.mouseUp(document.body);
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      fireEvent.keyUp(button, { key: keys.ARROW_RIGHT });
      expect(onResizeEnd).toHaveBeenCalledTimes(2);
    });

    test('onResizeEnd is called for keyboard resizes when the button is blurred', () => {
      const { button, onResizeStart, onResizeEnd } = renderWithCallbacks();
      fireEvent.keyDown(button, { key: keys.ARROW_RIGHT });
      expect(onResizeStart).toHaveBeenCalledTimes(1);
      expect(onResizeStart).toHaveBeenLastCalledWith('key');
      fireEvent.blur(button);
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
    });

    test('unmemoized consumer onResizeStart/End callbacks do not cause stale closures', () => {
      const ConsumerUsage = () => {
        const [rerender, setRerender] = useState(0);
        // Unmemoized consumer callbacks
        const onResizeStart = () => {
          setRerender(rerender + 1);
        };
        const onResizeEnd = () => {
          setRerender(rerender + 1);
        };

        return (
          <EuiResizableContainer
            {...requiredProps}
            onResizeStart={onResizeStart}
            onResizeEnd={onResizeEnd}
          >
            {(EuiResizablePanel, EuiResizableButton) => (
              <>
                <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
                <EuiResizableButton data-test-subj="euiResizableButton" />
                <EuiResizablePanel initialSize={50} data-test-subj="rerenders">
                  {rerender}
                </EuiResizablePanel>
              </>
            )}
          </EuiResizableContainer>
        );
      };
      const { getByTestSubject } = render(<ConsumerUsage />);
      expect(getByTestSubject('rerenders')).toHaveTextContent('0');

      fireEvent.mouseDown(getByTestSubject('euiResizableButton'));
      expect(getByTestSubject('rerenders')).toHaveTextContent('1');

      fireEvent.mouseUp(getByTestSubject('euiResizableButton'));
      expect(getByTestSubject('rerenders')).toHaveTextContent('2');
      // Without `useLatest`, the rerender count doesn't correctly update due to `onResizeEnd`
      // not being memoized and causing a stale `resizeEnd` closure to be called on event end
    });
  });
});
