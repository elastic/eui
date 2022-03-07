/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';

import {
  DataGridFocusContext,
  preventTabbing,
  getParentCellContent,
  useHeaderFocusWorkaround,
} from './focus';

describe('preventTabbing', () => {
  const mockCellWithInteractiveChildren = () => {
    const cell = document.createElement('div');
    cell.setAttribute('data-datagrid-cellcontent', 'true');

    const button = cell.appendChild(document.createElement('button'));
    const link = cell.appendChild(document.createElement('a'));
    link.setAttribute('href', 'courageous');

    return [cell, button, link];
  };

  it('on mutation, sets all interactive children of the parent cell to tabindex -1', () => {
    const [cell, button, link] = mockCellWithInteractiveChildren();
    preventTabbing([{ target: cell }] as any);

    expect(button.getAttribute('tabIndex')).toEqual('-1');
    expect(button.getAttribute('data-datagrid-interactable')).toEqual('true');

    expect(link.getAttribute('tabIndex')).toEqual('-1');
    expect(link.getAttribute('data-datagrid-interactable')).toEqual('true');
  });

  it('stops early if two separate mutation records occur from the same cell', () => {
    const [button, link] = mockCellWithInteractiveChildren();
    preventTabbing([{ target: button }, { target: link }] as any);

    // There isn't a super great way of asserting a continue,
    // so this is mostly just here for line code coverage
  });

  it('does nothing if the mutation event does not have a valid parent cell', () => {
    const notCell = document.createElement('div');
    preventTabbing([{ target: notCell }] as any);

    // There isn't a super great way of asserting this,
    // so this is mostly just here for branch code coverage
  });

  it('ignores header cells that manage their own tabindex state (data-euigrid-tab-managed attr)', () => {
    const [cell, button] = mockCellWithInteractiveChildren();
    button.setAttribute('data-euigrid-tab-managed', 'true');
    button.setAttribute('tabIndex', '0');

    preventTabbing([{ target: cell }] as any);

    expect(button.getAttribute('tabIndex')).toEqual('0');
  });
});

describe('getParentCellContent', () => {
  const doc = document.createDocumentFragment();

  const body = document.createElement('body');
  doc.appendChild(body);

  const cell = document.createElement('div');
  cell.setAttribute('data-datagrid-cellcontent', 'true');
  body.appendChild(cell);

  const span = document.createElement('span');
  span.textContent = 'Here comes the text';
  cell.appendChild(span);

  const text = span.childNodes[0];

  it('locates the cell element when starting with the cell itself', () => {
    expect(getParentCellContent(cell)).toBe(cell);
  });

  it('locates the cell element when starting with an element inside the cell', () => {
    expect(getParentCellContent(span)).toBe(cell);
  });

  it('locates the cell element when starting with a text node inside the cell', () => {
    expect(getParentCellContent(text)).toBe(cell);
  });

  it('does not locate the cell element when starting outside the cell', () => {
    expect(getParentCellContent(body)).toBeNull();
  });
});

describe('useHeaderFocusWorkaround', () => {
  const MockComponent = () => {
    useHeaderFocusWorkaround(false);
    return <div />;
  };

  it('moves focus down from the header to the first data row if the header becomes uninteractive', () => {
    const focusedCell = [2, -1];
    const setFocusedCell = jest.fn();
    mount(
      <DataGridFocusContext.Provider
        value={{ focusedCell, setFocusedCell } as any}
      >
        <MockComponent />
      </DataGridFocusContext.Provider>
    );
    expect(setFocusedCell).toHaveBeenCalledWith([2, 0]);
  });

  it('does nothing if the focus was not on the header when the header became uninteractive', () => {
    const focusedCell = [2, 0];
    const setFocusedCell = jest.fn();
    mount(
      <DataGridFocusContext.Provider
        value={{ focusedCell, setFocusedCell } as any}
      >
        <MockComponent />
      </DataGridFocusContext.Provider>
    );
    expect(setFocusedCell).not.toHaveBeenCalled();
  });
});
