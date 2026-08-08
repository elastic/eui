/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { fireEvent } from '@testing-library/react';
import { render, waitForEuiPopoverOpen } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test';

import { EuiCodeBlockAnnotation } from './code_block_annotations';

describe('EuiCodeBlockAnnotation', () => {
  shouldRenderCustomStyles(<EuiCodeBlockAnnotation lineNumber={10} />);

  it('renders', async () => {
    const { baseElement, getByTestSubject } = render(
      <EuiCodeBlockAnnotation lineNumber={10} {...requiredProps}>
        <span data-test-subj="popoverContent">Popover content</span>
      </EuiCodeBlockAnnotation>
    );

    fireEvent.click(getByTestSubject('euiCodeBlockAnnotationIcon'));
    await waitForEuiPopoverOpen();
    expect(getByTestSubject('popoverContent')).toBeTruthy();

    expect(baseElement).toMatchSnapshot();
  });

  // https://github.com/elastic/eui/issues/9023
  it('anchors the popover beside the code on open, preferring the horizontal axis', async () => {
    const { baseElement, getByTestSubject } = render(
      <EuiCodeBlockAnnotation lineNumber={10}>
        <span>Popover content</span>
      </EuiCodeBlockAnnotation>
    );

    fireEvent.click(getByTestSubject('euiCodeBlockAnnotationIcon'));
    await waitForEuiPopoverOpen();

    const panel = baseElement.querySelector('[data-popover-panel]')!;

    // The component always opens with `anchorPosition="leftCenter"` — the
    // fallback to `"downLeft"` only happens once `onPositionChange` reports
    // that EuiPopover resolved to a vertical side (no horizontal room), which
    // requires real element dimensions. jsdom's layout engine returns 0 for
    // every element's getBoundingClientRect, so that fallback path — and the
    // #9023 regression it exists to prevent, a popover covering the code
    // line below the annotation — can't be exercised here. Deliberately not
    // adding a second unit test for the fallback branch itself: any assertion
    // written against jsdom's zero-sized layout would pass whether or not the
    // branch is correct, which is worse than no test.
    // See code_block_annotations.spec.tsx for the real-browser E2E coverage
    // that measures actual overlap and exercises the fallback for real.
    expect(panel.className).toMatch(/-left$/);
    expect(panel).toHaveStyle({ top: '0px', left: '-12px' });
  });

  // See code_block_annotations.spec.tsx for more in-depth E2E testing
});
