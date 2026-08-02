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
import { EuiToolTip } from '../tool_tip';

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
      const { getByRole, queryByRole } = render(
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

      expect(getByRole('tooltip')).toHaveTextContent(afterMessage);

      fireEvent.blur(getByRole('button'));
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
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

    it('reverts from `afterMessage` back to `beforeMessage` on mouse out', () => {
      const beforeMessage = 'copy this';
      const afterMessage = 'successfully copied';
      const { getByRole, queryByRole } = render(
        <EuiCopy
          textToCopy="some text"
          beforeMessage={beforeMessage}
          afterMessage={afterMessage}
        >
          {(copy) => (
            <button onClick={copy} onMouseOver={() => {}} onFocus={() => {}}>
              Click to copy input text
            </button>
          )}
        </EuiCopy>
      );

      fireEvent.mouseOver(getByRole('button'));
      expect(getByRole('tooltip')).toHaveTextContent(beforeMessage);

      fireEvent.click(getByRole('button'));
      expect(getByRole('tooltip')).toHaveTextContent(afterMessage);

      // Moving the pointer away resets back to the `beforeMessage`
      fireEvent.mouseOut(getByRole('button'));
      expect(queryByRole('tooltip')).not.toBeInTheDocument();

      fireEvent.mouseOver(getByRole('button'));
      expect(getByRole('tooltip')).toHaveTextContent(beforeMessage);
    });

    it('shows the `afterMessage` tooltip again on a repeat copy', () => {
      const afterMessage = 'successfully copied';
      const { getAllByRole, getByRole, queryByRole, getByTestSubject } = render(
        <>
          <EuiCopy textToCopy="some text" afterMessage={afterMessage}>
            {(copy) => (
              <button
                data-test-subj="copyButton"
                onClick={copy}
                onMouseOver={() => {}}
                onFocus={() => {}}
              >
                Click to copy input text
              </button>
            )}
          </EuiCopy>
          <EuiToolTip content="other tooltip">
            <button
              data-test-subj="otherButton"
              onMouseOver={() => {}}
              onFocus={() => {}}
            >
              Other anchor
            </button>
          </EuiToolTip>
        </>
      );

      fireEvent.click(getByTestSubject('copyButton'));
      expect(getByRole('tooltip')).toHaveTextContent(afterMessage);

      // Only one tooltip may be visible at a time, so showing an unrelated
      // tooltip hides the copy tooltip without `EuiCopy` being told about it.
      fireEvent.mouseOver(getByTestSubject('otherButton'));
      expect(getAllByRole('tooltip')).toHaveLength(1);
      expect(getByRole('tooltip')).toHaveTextContent('other tooltip');

      fireEvent.mouseOut(getByTestSubject('otherButton'));
      expect(queryByRole('tooltip')).not.toBeInTheDocument();

      // Copying again must show the tooltip again, even though the copied
      // state itself has not changed since the previous copy.
      fireEvent.click(getByTestSubject('copyButton'));
      expect(getByRole('tooltip')).toHaveTextContent(afterMessage);
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

  describe('unmounting', () => {
    it('does not update state or warn if `copy` is called after unmount', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      let copyFn: (() => void) | undefined;
      const { unmount } = render(
        <EuiCopy textToCopy="some text">
          {(copy) => {
            copyFn = copy;
            return <button onClick={copy}>Click to copy input text</button>;
          }}
        </EuiCopy>
      );

      unmount();

      // Consumers may hold onto the render prop `copy` callback (e.g. in a
      // debounced handler). Calling it post-unmount must be a no-op.
      expect(() => copyFn?.()).not.toThrow();

      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    it('does not leave a visible tooltip behind after unmount', () => {
      const afterMessage = 'successfully copied';
      const { getByRole, unmount } = render(
        <EuiCopy textToCopy="some text" afterMessage={afterMessage}>
          {(copy) => <button onClick={copy}>Click to copy input text</button>}
        </EuiCopy>
      );

      fireEvent.click(getByRole('button'));
      expect(getByRole('tooltip')).toHaveTextContent(afterMessage);

      unmount();

      expect(document.querySelector('[role="tooltip"]')).toBeNull();
    });
  });
});
