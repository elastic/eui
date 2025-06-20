/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  waitForEuiToolTipVisible,
  waitForEuiToolTipHidden,
  render,
} from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiCopy } from './copy';

describe('EuiCopy', () => {
  const originalExecCommand = document.execCommand;

  beforeAll(() => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn(() => true),
      writable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(document, 'execCommand', {
      value: originalExecCommand,
      writable: true,
    });
  });

  it('renders', () => {
    const { container } = render(
      <EuiCopy textToCopy="some text" {...requiredProps}>
        {(copy) => <button onClick={copy}>Click to copy input text</button>}
      </EuiCopy>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    it('beforeMessage', async () => {
      const beforeMessage = 'copy this';
      const { getByRole, getByText } = render(
        <EuiCopy textToCopy="some text" beforeMessage={beforeMessage}>
          {() => (
            <button onMouseOver={() => {}} onFocus={() => {}}>
              Click to copy input text
            </button>
          )}
        </EuiCopy>
      );
      // Simulate mouse over to show the tooltip
      fireEvent.mouseOver(getByRole('button'));
      await waitForEuiToolTipVisible();
      // The beforeMessage should be shown in the tooltip
      expect(getByText(beforeMessage)).toBeInTheDocument();
      fireEvent.mouseOut(getByRole('button'));
      await waitForEuiToolTipHidden();
    });

    it('afterMessage', async () => {
      const afterMessage = 'successfully copied';
      const { getByRole, getByText } = render(
        <EuiCopy textToCopy="some text" afterMessage={afterMessage}>
          {(copy) => (
            <button onClick={copy} onMouseOver={() => {}} onFocus={() => {}}>
              Click to copy input text
            </button>
          )}
        </EuiCopy>
      );

      // Simulate a click to copy the text
      fireEvent.click(getByRole('button'));
      fireEvent.mouseOver(getByRole('button'));
      await waitForEuiToolTipVisible();
      // The afterMessage should be shown after the copy action
      expect(getByText(afterMessage)).toBeInTheDocument();
      fireEvent.mouseOut(getByRole('button'));
      await waitForEuiToolTipHidden();
    });

    it('tooltipProps', async () => {
      const tooltipProps = {
        'data-test-subj': 'customTooltip',
        className: 'myTooltipClass',
      };
      const beforeMessage = 'copy this';
      const { getByRole, getByTestSubject } = render(
        <EuiCopy
          textToCopy="some text"
          beforeMessage={beforeMessage}
          tooltipProps={tooltipProps}
        >
          {() => (
            <button onMouseOver={() => {}} onFocus={() => {}}>
              Click to copy input text
            </button>
          )}
        </EuiCopy>
      );
      // Simulate mouse over to show the tooltip
      fireEvent.mouseOver(getByRole('button'));
      await waitForEuiToolTipVisible();
      // The tooltip portalled, so search the global document
      const tooltip = getByTestSubject('customTooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip?.className).toContain('myTooltipClass');
      fireEvent.mouseOut(getByRole('button'));
      await waitForEuiToolTipHidden();
    });
  });
});
