/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
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
    it('beforeMessage', () => {
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

      // The `beforeMessage` should be shown in the tooltip
      expect(getByText(beforeMessage)).toBeInTheDocument();

      fireEvent.mouseOut(getByRole('button'));
    });

    it('afterMessage', () => {
      const afterMessage = 'successfully copied';
      const { getByRole, getAllByText } = render(
        <EuiCopy textToCopy="some text" afterMessage={afterMessage}>
          {(copy) => (
            <button onClick={copy} onMouseOver={() => {}} onFocus={() => {}}>
              Click to copy input text
            </button>
          )}
        </EuiCopy>
      );

      // Hover first, then click. The tooltip should appear
      // automatically with the `afterMessage` after copy succeeds, without
      // requiring the user to move the pointer out and back in.
      fireEvent.mouseOver(getByRole('button'));
      fireEvent.click(getByRole('button'));

      // The tooltip and the screen-reader-live region both render the
      // `afterMessage`, so we expect at least one match in the document.
      expect(getAllByText(afterMessage).length).toBeGreaterThan(0);

      fireEvent.mouseOut(getByRole('button'));
    });

    it('announces `afterMessage` with an `aria-live` region after copy', () => {
      const afterMessage = 'successfully copied';
      const { container, getByRole } = render(
        <EuiCopy textToCopy="some text" afterMessage={afterMessage}>
          {(copy) => <button onClick={copy}>Click to copy input text</button>}
        </EuiCopy>
      );

      // Before any copy action, the live region should not contain the message.
      const liveRegionsBefore = container.querySelectorAll('[aria-live]');

      liveRegionsBefore.forEach((region) => {
        expect(region.textContent).not.toContain(afterMessage);
      });

      fireEvent.click(getByRole('button'));

      // After copy, the message is rendered inside an aria-live region so
      // screen readers announce it regardless of focus location.
      const liveRegions = container.querySelectorAll('[aria-live]');
      const hasAnnouncement = Array.from(liveRegions).some((region) =>
        region.textContent?.includes(afterMessage)
      );

      expect(hasAnnouncement).toBe(true);
    });

    it('tooltipProps', () => {
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

      // The tooltip portalled, so search the global document
      const tooltip = getByTestSubject('customTooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip?.className).toContain('myTooltipClass');
      fireEvent.mouseOut(getByRole('button'));
    });
  });
});
