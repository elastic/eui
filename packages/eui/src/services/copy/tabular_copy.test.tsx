/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { onTabularCopy, CHARS } from './tabular_copy';

describe('onTabularCopy', () => {
  const mockSetData = jest.fn();
  const mockEvent = {
    clipboardData: { setData: mockSetData },
    preventDefault: () => {},
  } as unknown as ClipboardEvent;

  const mockSelectedText = jest.fn(() => '');
  Object.defineProperty(window, 'getSelection', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      toString: mockSelectedText,
    })),
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockSelectedText.mockReturnValue('');
  });

  it('does nothing if no special copy characters are in the clipboard', () => {
    mockSelectedText.mockReturnValue('hello\nworld\t');
    onTabularCopy(mockEvent);
    expect(mockSetData).not.toHaveBeenCalled();
  });

  it('strips all newlines and replaces the newline character with our newlines', () => {
    mockSelectedText.mockReturnValue('hello\nworld\r\nand↵goodbye world');
    onTabularCopy(mockEvent);
    expect(mockSetData).toHaveBeenCalledWith(
      'text/plain',
      'helloworldand\ngoodbye world'
    );
  });

  it('strips all horizontal tabs and replaces the tab character with our tabs', () => {
    mockSelectedText.mockReturnValue('hello\tworld↦goodbye\tworld');
    onTabularCopy(mockEvent);
    expect(mockSetData).toHaveBeenCalledWith(
      'text/plain',
      'helloworld\tgoodbyeworld'
    );
  });

  it('strips out any text between the no-copy characters', () => {
    mockSelectedText.mockReturnValue(
      `${CHARS.NO_COPY_BOUND}some of${CHARS.NO_COPY_BOUND} this text should ${CHARS.NO_COPY_BOUND}not${CHARS.NO_COPY_BOUND} appear`
    );
    onTabularCopy(mockEvent);
    expect(mockSetData).toHaveBeenCalledWith(
      'text/plain',
      ' this text should  appear'
    );
  });

  it('does not clean text outside of specified bounds', () => {
    mockSelectedText.mockReturnValue(`
this
is
not
cleaned
${CHARS.TABULAR_CONTENT_BOUND}↵this\r\nis\ncleaned${CHARS.TABULAR_CONTENT_BOUND}
also\tnot\tcleaned
${CHARS.TABULAR_CONTENT_BOUND}↦also\tcleaned${CHARS.TABULAR_CONTENT_BOUND}
`);
    onTabularCopy(mockEvent);
    expect(mockSetData).toHaveBeenCalledWith(
      'text/plain',
      `
this
is
not
cleaned

thisiscleaned
also	not	cleaned
	alsocleaned
`
    );
  });
});
