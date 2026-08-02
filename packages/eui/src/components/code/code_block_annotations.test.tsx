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
  it('anchors the popover beside the code block instead of over it', async () => {
    const { baseElement, getByTestSubject } = render(
      <EuiCodeBlockAnnotation lineNumber={10}>
        <span>Popover content</span>
      </EuiCodeBlockAnnotation>
    );

    fireEvent.click(getByTestSubject('euiCodeBlockAnnotationIcon'));
    await waitForEuiPopoverOpen();

    const panel = baseElement.querySelector('[data-popover-panel]')!;

    // `anchorPosition="leftCenter"` resolves to the `left` (x) axis, so the
    // panel is offset horizontally from the icon and not vertically below it.
    expect(panel.className).toMatch(/-left$/);
    expect(panel).toHaveStyle({ top: '0px', left: '-12px' });
  });

  // See code_block_annotations.spec.tsx for more in-depth E2E testing
});
