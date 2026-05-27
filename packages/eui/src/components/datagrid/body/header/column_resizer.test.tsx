/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { render } from '../../../../test/rtl';

import { EuiDataGridColumnResizer } from './column_resizer';

// pageX is a read-only computed property on MouseEvent; helper to dispatch a
// mouse event with a specific pageX value on any target.
const dispatchMouseEventWithPageX = (
  target: Element | Window,
  type: string,
  pageX: number
) => {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'pageX', { value: pageX });
  target.dispatchEvent(event);
};

describe('EuiDataGridHeaderResizer', () => {
  const props = {
    columnId: 'someColumn',
    columnWidth: 50,
    setColumnWidth: jest.fn(),
    isLastColumn: false,
  };

  it('renders', () => {
    const { container } = render(<EuiDataGridColumnResizer {...props} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiDataGridColumnResizer emotion-euiDataGridColumnResizer"
        data-test-subj="dataGridColumnResizer"
      />
    `);
  });

  describe('mouse events', () => {
    describe('on mouse down', () => {
      it('adds mouse move & up listeners', () => {
        const { getByTestSubject } = render(
          <EuiDataGridColumnResizer {...props} />
        );
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

        act(() => {
          dispatchMouseEventWithPageX(
            getByTestSubject('dataGridColumnResizer'),
            'mousedown',
            100
          );
        });

        const anyFn = expect.any(Function);
        expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', anyFn);
        expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', anyFn);
        expect(addEventListenerSpy).toHaveBeenCalledWith('blur', anyFn);
      });
    });

    describe('on mouse move', () => {
      it('does not allow an offset that would go under the minimum column width', () => {
        const { getByTestSubject } = render(
          <EuiDataGridColumnResizer {...props} />
        );

        act(() => {
          dispatchMouseEventWithPageX(
            getByTestSubject('dataGridColumnResizer'),
            'mousedown',
            100
          );
        });
        act(() => {
          dispatchMouseEventWithPageX(window, 'mousemove', 0);
        });

        // offset clamped to -(columnWidth - MINIMUM_COLUMN_WIDTH) = -(50 - 40) = -10
        expect(getByTestSubject('dataGridColumnResizer')).toHaveStyle(
          'margin-inline-end: 10px'
        );
      });

      it('sets offset to the difference of the moved pageX', () => {
        const { getByTestSubject } = render(
          <EuiDataGridColumnResizer {...props} />
        );

        act(() => {
          dispatchMouseEventWithPageX(
            getByTestSubject('dataGridColumnResizer'),
            'mousedown',
            100
          );
        });
        act(() => {
          dispatchMouseEventWithPageX(window, 'mousemove', 200);
        });

        expect(getByTestSubject('dataGridColumnResizer')).toHaveStyle(
          'margin-inline-end: -100px'
        );
      });
    });

    describe('on mouse up', () => {
      it('calls setColumnWidth, resets offset, and removes event listeners', () => {
        const { getByTestSubject } = render(
          <EuiDataGridColumnResizer {...props} />
        );
        const removeEventListenerSpy = jest.spyOn(
          window,
          'removeEventListener'
        );

        act(() => {
          dispatchMouseEventWithPageX(
            getByTestSubject('dataGridColumnResizer'),
            'mousedown',
            100
          );
        });
        act(() => {
          dispatchMouseEventWithPageX(window, 'mousemove', 200);
        });
        act(() => {
          fireEvent.mouseUp(window);
        });

        expect(props.setColumnWidth).toHaveBeenCalledWith('someColumn', 150);
        // offset reset — no margin style applied
        expect(
          getByTestSubject('dataGridColumnResizer').style.marginInlineEnd
        ).toBe('');

        const anyFn = expect.any(Function);
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', anyFn);
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', anyFn);
        expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', anyFn);
      });
    });
  });
});
