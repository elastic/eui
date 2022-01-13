/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getParentCellContent } from './focus';

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
    expect(getParentCellContent(span!)).toBe(cell);
  });

  it('locates the cell element when starting with a text node inside the cell', () => {
    expect(getParentCellContent(text!)).toBe(cell);
  });

  it('does not locate the cell element when starting outside the cell', () => {
    expect(getParentCellContent(body)).toBeNull();
  });
});
