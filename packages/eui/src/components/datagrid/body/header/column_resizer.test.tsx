/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test/rtl';

import { EuiDataGridColumnResizer } from './column_resizer';

describe('EuiDataGridColumnResizer', () => {
  const props = {
    columnId: 'someColumn',
    columnWidth: 50,
    setColumnWidth: jest.fn(),
    isLastColumn: false,
  };

  // jsdom derives `pageX` from `clientX`
  const dragTo = (clientX: number) => fireEvent.mouseMove(window, { clientX });
  const endDrag = () => fireEvent.mouseUp(window);

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    it('adds mouse move & up listeners on mouse down', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      const { getByTestSubject } = render(
        <EuiDataGridColumnResizer {...props} />
      );

      fireEvent.mouseDown(getByTestSubject('dataGridColumnResizer'), {
        clientX: 100,
      });

      const anyFn = expect.any(Function);
      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', anyFn);
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', anyFn);
      expect(addEventListenerSpy).toHaveBeenCalledWith('blur', anyFn);
    });

    it('offsets the resizer by the distance moved', () => {
      const { getByTestSubject } = render(
        <EuiDataGridColumnResizer {...props} />
      );
      const resizer = getByTestSubject('dataGridColumnResizer');

      fireEvent.mouseDown(resizer, { clientX: 100 });
      dragTo(130);

      expect(resizer).toHaveStyle({ marginInlineEnd: '-30px' });
    });

    it('does not allow an offset that would go under the minimum column width', () => {
      const { getByTestSubject } = render(
        <EuiDataGridColumnResizer {...props} />
      );
      const resizer = getByTestSubject('dataGridColumnResizer');

      fireEvent.mouseDown(resizer, { clientX: 100 });
      dragTo(0);

      expect(resizer).toHaveStyle({ marginInlineEnd: '10px' });
    });

    it('calls setColumnWidth, resets the offset, and removes listeners on mouse up', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { getByTestSubject } = render(
        <EuiDataGridColumnResizer {...props} />
      );
      const resizer = getByTestSubject('dataGridColumnResizer');

      fireEvent.mouseDown(resizer, { clientX: 100 });
      dragTo(130);
      endDrag();

      expect(props.setColumnWidth).toHaveBeenCalledTimes(1);
      expect(props.setColumnWidth).toHaveBeenCalledWith('someColumn', 80);
      expect(resizer).not.toHaveStyle({ marginInlineEnd: '-30px' });

      const anyFn = expect.any(Function);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', anyFn);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', anyFn);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', anyFn);
    });

    it('uses the latest columnWidth instead of the one captured on mouse down', () => {
      const { getByTestSubject, rerender } = render(
        <EuiDataGridColumnResizer {...props} />
      );
      const resizer = getByTestSubject('dataGridColumnResizer');

      fireEvent.mouseDown(resizer, { clientX: 100 });
      rerender(<EuiDataGridColumnResizer {...props} columnWidth={200} />);
      dragTo(130);
      endDrag();

      expect(props.setColumnWidth).toHaveBeenCalledWith('someColumn', 230);
    });

    it('removes listeners when unmounted mid-drag', () => {
      const { getByTestSubject, unmount } = render(
        <EuiDataGridColumnResizer {...props} />
      );

      fireEvent.mouseDown(getByTestSubject('dataGridColumnResizer'), {
        clientX: 100,
      });
      unmount();
      dragTo(130);
      endDrag();

      expect(props.setColumnWidth).not.toHaveBeenCalled();
    });
  });
});
