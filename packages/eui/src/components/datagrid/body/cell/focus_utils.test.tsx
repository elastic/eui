/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test/rtl';

import { FocusTrappedChildren, HandleInteractiveChildren } from './focus_utils';

// Test util
const getCellWithInteractiveChildren = () => {
  const cell = document.createElement('div');
  cell.setAttribute('tabindex', '0');
  cell.appendChild(document.createElement('button'));
  cell.appendChild(document.createElement('button'));
  return cell;
};

const renderCellWithInteractiveChildren = () => {
  const { container } = render(
    <div tabIndex={0}>
      <button>button 1</button>
      <button>button 2</button>
    </div>
  );

  return container.firstElementChild as HTMLDivElement;
};

describe('HandleInteractiveChildren', () => {
  describe('cell with interactive children', () => {
    it('disables tabbing on all interactive children on mount', () => {
      const cell = getCellWithInteractiveChildren();
      cell.querySelectorAll('button').forEach((button) => {
        expect(button.getAttribute('tabindex')).toBeNull();
      });

      render(
        <HandleInteractiveChildren
          cellEl={cell}
          updateCellFocusContext={() => {}}
        />
      );

      cell.querySelectorAll('button').forEach((button) => {
        expect(button.getAttribute('tabindex')).toEqual('-1');
      });
    });

    it('calls `updateCellFocusContext` on child focus', () => {
      const cell = getCellWithInteractiveChildren();

      const updateCellFocusContext = jest.fn();
      render(
        <HandleInteractiveChildren
          cellEl={cell}
          updateCellFocusContext={updateCellFocusContext}
        />
      );

      fireEvent.focus(cell.querySelector('button')!);
      expect(updateCellFocusContext).toHaveBeenCalled();
    });

    it('renders a focus trap if `renderFocusTrap` is true', () => {
      const cell = getCellWithInteractiveChildren();

      const { container } = render(
        <HandleInteractiveChildren
          cellEl={cell}
          updateCellFocusContext={() => {}}
          renderFocusTrap={true}
        />
      );

      expect(
        container.querySelector('[data-focus-lock-disabled]')
      ).toBeInTheDocument();
    });

    it('does not render a focus trap if `renderFocusTrap` is falsy', () => {
      const cell = getCellWithInteractiveChildren();

      const { container } = render(
        <HandleInteractiveChildren
          cellEl={cell}
          updateCellFocusContext={() => {}}
          renderFocusTrap={false}
        />
      );

      expect(
        container.querySelector('[data-focus-lock-disabled]')
      ).not.toBeInTheDocument();
    });
  });

  describe('cell without any interactive children', () => {
    it('never renders a focus trap', () => {
      const cell = document.createElement('div');

      const { container } = render(
        <HandleInteractiveChildren
          cellEl={cell}
          updateCellFocusContext={() => {}}
          renderFocusTrap={true}
        />
      );

      expect(
        container.querySelector('[data-focus-lock-disabled]')
      ).not.toBeInTheDocument();
    });

    it('still calls `updateCellFocusContext` if the cell itself is focused', () => {
      const cell = document.createElement('div');

      const updateCellFocusContext = jest.fn();
      render(
        <HandleInteractiveChildren
          cellEl={cell}
          updateCellFocusContext={updateCellFocusContext}
        />
      );

      fireEvent.focus(cell);
      expect(updateCellFocusContext).toHaveBeenCalled();
    });
  });
});

describe('FocusTrappedChildren', () => {
  it('renders a screen reader hint', () => {
    const cell = getCellWithInteractiveChildren();
    const { container } = render(<FocusTrappedChildren cellEl={cell} />);
    expect(container.childNodes[1]).toMatchInlineSnapshot(`
      <div
        data-focus-lock-disabled="disabled"
      >
        <p
          hidden=""
          id="generated-id_focusTrapHint"
        >
          Press the Enter key to interact with this cell's contents.
        </p>
        <div
          aria-atomic="true"
          aria-live="polite"
          class="emotion-euiScreenReaderOnly"
          role="status"
        />
      </div>
    `);
  });

  describe('on enter', () => {
    it('enables the focus trap, all interactive children, and moves focus to the first focusable child', () => {
      const cell = renderCellWithInteractiveChildren();

      const { container } = render(<FocusTrappedChildren cellEl={cell} />);
      fireEvent.keyUp(cell, { key: 'Enter' });

      expect(
        container.querySelector('[data-focus-lock-disabled]')
      ).toHaveAttribute('data-focus-lock-disabled', 'false');

      expect(cell.querySelector('button')).toHaveAttribute('tabindex', '0');
      expect(cell.querySelector('button')).toHaveFocus();
    });

    it('allows pressing F2 to enter as well', () => {
      const cell = renderCellWithInteractiveChildren();

      render(<FocusTrappedChildren cellEl={cell} />);
      fireEvent.keyUp(cell, { key: 'F2' });

      expect(cell.querySelector('button')).toHaveFocus();
    });
  });

  describe('on exit', () => {
    // Mock requestAnimationFrame to run immediately
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: Function) => cb());

    it('disables the focus trap, all interactive children and moves focus to the cell wrapper', async () => {
      const cell = renderCellWithInteractiveChildren();

      const { container } = render(<FocusTrappedChildren cellEl={cell} />);

      fireEvent.keyUp(cell, { key: 'Enter' });
      fireEvent.keyUp(cell, { key: 'Escape' });

      await waitFor(() => {
        expect(
          container.querySelector('[data-focus-lock-disabled]')
        ).toHaveAttribute('data-focus-lock-disabled', 'disabled');

        expect(cell.querySelector('button')).toHaveAttribute('tabindex', '-1');
        expect(cell).toHaveFocus();
      });
    });

    it('does nothing if the cell is not entered', () => {
      const cell = renderCellWithInteractiveChildren();

      render(<FocusTrappedChildren cellEl={cell} />);
      fireEvent.keyUp(cell, { key: 'Escape' });

      expect(cell).not.toHaveFocus();
    });
  });
});
