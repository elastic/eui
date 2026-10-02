/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { copyFocusedDataGridCell } from './copy_focused_cell';

describe('copyFocusedDataGridCell', () => {
  const mockSetData = jest.fn();
  const mockPreventDefault = jest.fn();
  const event = {
    clipboardData: { setData: mockSetData },
    preventDefault: mockPreventDefault,
    defaultPrevented: false,
  } as unknown as ClipboardEvent;

  const mockSelectedText = jest.fn(() => '');
  Object.defineProperty(window, 'getSelection', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      toString: mockSelectedText,
    })),
  });

  const createCell = ({
    text = 'cell value',
    className = 'euiDataGridRowCell',
    extraContent,
  }: {
    text?: string;
    className?: string;
    extraContent?: HTMLElement;
  } = {}) => {
    const cell = document.createElement('div');
    cell.className = className;
    const content = document.createElement('div');
    content.setAttribute('data-datagrid-cellcontent', 'true');
    content.textContent = text;
    cell.appendChild(content);
    if (extraContent) cell.appendChild(extraContent);
    document.body.appendChild(cell);
    return cell;
  };

  const setActiveElement = (element: Element | null) => {
    Object.defineProperty(document, 'activeElement', {
      configurable: true,
      get: () => element,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSelectedText.mockReturnValue('');
    document.body.innerHTML = '';
  });

  afterEach(() => {
    setActiveElement(document.body);
  });

  it('copies the focused cell content when nothing is selected', () => {
    const cell = createCell();
    setActiveElement(cell);

    copyFocusedDataGridCell(event);

    expect(mockSetData).toHaveBeenCalledWith('text/plain', 'cell value');
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  it('does not copy when the user has selected text', () => {
    const cell = createCell();
    setActiveElement(cell);
    mockSelectedText.mockReturnValue('partial');

    copyFocusedDataGridCell(event);

    expect(mockSetData).not.toHaveBeenCalled();
    expect(mockPreventDefault).not.toHaveBeenCalled();
  });

  it('does not copy control column cells', () => {
    const cell = createCell({
      className: 'euiDataGridRowCell euiDataGridRowCell--controlColumn',
      text: 'select',
    });
    setActiveElement(cell);

    copyFocusedDataGridCell(event);

    expect(mockSetData).not.toHaveBeenCalled();
    expect(mockPreventDefault).not.toHaveBeenCalled();
  });

  it('does not copy when focus is inside an interactive child', () => {
    const button = document.createElement('button');
    button.textContent = 'action';
    createCell({ extraContent: button });
    setActiveElement(button);

    copyFocusedDataGridCell(event);

    expect(mockSetData).not.toHaveBeenCalled();
    expect(mockPreventDefault).not.toHaveBeenCalled();
  });

  it('does not copy empty cells', () => {
    const cell = createCell({ text: '' });
    setActiveElement(cell);

    copyFocusedDataGridCell(event);

    expect(mockSetData).not.toHaveBeenCalled();
    expect(mockPreventDefault).not.toHaveBeenCalled();
  });

  it('preserves leading and trailing spaces', () => {
    const cell = createCell({ text: '  padded  ' });
    setActiveElement(cell);

    copyFocusedDataGridCell(event);

    expect(mockSetData).toHaveBeenCalledWith('text/plain', '  padded  ');
  });

  it('does not fall back to textContent when innerText is empty', () => {
    const cell = createCell({ text: '' });
    const content = cell.querySelector('[data-datagrid-cellcontent]')!;
    Object.defineProperty(content, 'innerText', { get: () => '' });
    Object.defineProperty(content, 'textContent', { get: () => 'hidden' });
    setActiveElement(cell);

    copyFocusedDataGridCell(event);

    expect(mockSetData).not.toHaveBeenCalled();
    expect(mockPreventDefault).not.toHaveBeenCalled();
  });

  it('does not copy when the event was already prevented', () => {
    const cell = createCell();
    setActiveElement(cell);

    copyFocusedDataGridCell({
      ...event,
      defaultPrevented: true,
    } as ClipboardEvent);

    expect(mockSetData).not.toHaveBeenCalled();
    expect(mockPreventDefault).not.toHaveBeenCalled();
  });

  it('ignores sibling action and screen reader text', () => {
    const sr = document.createElement('p');
    sr.textContent = 'Name, column 1, row 1';
    const cell = createCell({ extraContent: sr });
    setActiveElement(cell);

    copyFocusedDataGridCell(event);

    expect(mockSetData).toHaveBeenCalledWith('text/plain', 'cell value');
  });
});
