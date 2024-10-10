/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from '@testing-library/react';
import { render } from '../../../../test/rtl';

import { EuiDataGridColumnResizer } from './column_resizer';

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
    const mouseEvent = {
      preventDefault: () => {},
    } as React.MouseEvent<HTMLDivElement>;

    // Using a ref to reach into class methods/state directly -
    // mocking mouse events in jsdom is too much of a headache
    let classRef: EuiDataGridColumnResizer;
    const setRef = (ref: EuiDataGridColumnResizer) => {
      classRef = ref;
    };

    describe('on mouse down', () => {
      it('adds mouse move & up listeners', () => {
        render(<EuiDataGridColumnResizer {...props} ref={setRef} />);
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

        act(() => classRef.onMouseDown({ ...mouseEvent, pageX: 100 }));
        expect(classRef.state.initialX).toEqual(100);

        const anyFn = expect.any(Function);
        expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', anyFn);
        expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', anyFn);
        expect(addEventListenerSpy).toHaveBeenCalledWith('blur', anyFn);
      });
    });

    describe('on mouse move', () => {
      it('does not allow an offset that would go under the mininum column width', () => {
        const { getByTestSubject } = render(
          <EuiDataGridColumnResizer {...props} ref={setRef} />
        );

        act(() => classRef.onMouseDown({ ...mouseEvent, pageX: 100 }));
        act(() => classRef.onMouseMove({ pageX: 0 }));

        expect(classRef.state.offset).toEqual(-10);
        expect(getByTestSubject('dataGridColumnResizer')).toHaveStyle(
          'margin-inline-end: 10px'
        );
      });

      it('sets offset state to the difference of the moved pageX', () => {
        const { getByTestSubject } = render(
          <EuiDataGridColumnResizer {...props} ref={setRef} />
        );

        act(() => classRef.onMouseDown({ ...mouseEvent, pageX: 100 }));
        act(() => classRef.onMouseMove({ pageX: 200 }));

        expect(classRef.state.offset).toEqual(100);
        expect(getByTestSubject('dataGridColumnResizer')).toHaveStyle(
          'margin-inline-end: -100px'
        );
      });
    });

    describe('on mouse up', () => {
      it('calls setColumnWidth, reset offset, and removes event listeners', () => {
        render(<EuiDataGridColumnResizer {...props} ref={setRef} />);
        const removeEventListenerSpy = jest.spyOn(
          window,
          'removeEventListener'
        );

        act(() => classRef.onMouseDown({ ...mouseEvent, pageX: 100 }));
        act(() => classRef.onMouseMove({ pageX: 200 }));
        act(() => classRef.onMouseUp());

        expect(props.setColumnWidth).toHaveBeenCalledWith('someColumn', 150);
        expect(classRef.state.offset).toEqual(0);

        const anyFn = expect.any(Function);
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', anyFn);
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', anyFn);
        expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', anyFn);
      });
    });
  });
});
