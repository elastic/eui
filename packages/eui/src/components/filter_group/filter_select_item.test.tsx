/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  render,
  waitForEuiToolTipVisible,
  waitForEuiToolTipHidden,
} from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiFilterSelectItem } from './filter_select_item';

describe('EuiFilterSelectItem', () => {
  shouldRenderCustomStyles(<EuiFilterSelectItem />);

  it('renders', () => {
    const { container } = render(<EuiFilterSelectItem {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('tooltip behavior', () => {
    const tooltipProps = {
      toolTipContent: 'Filter item tooltip',
      toolTipProps: { 'data-test-subj': 'filterItemToolTip' },
    };

    // `toggleToolTip` is called in `componentDidUpdate`; on initial mount `tooltipRef.current`
    // is null because `EuiToolTip` hasn't committed its ref yet, so a re-render is required
    // to trigger `showToolTip`/`hideToolTip`.
    it('shows tooltip when `isFocused` becomes true', async () => {
      const { rerender, getByTestSubject } = render(
        <EuiFilterSelectItem {...tooltipProps} isFocused={false}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      rerender(
        <EuiFilterSelectItem {...tooltipProps} isFocused={true}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      await waitForEuiToolTipVisible();
      expect(getByTestSubject('filterItemToolTip')).toBeInTheDocument();
    });

    it('hides tooltip when `isFocused` becomes false', async () => {
      const { rerender, queryByRole } = render(
        <EuiFilterSelectItem {...tooltipProps} isFocused={false}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      rerender(
        <EuiFilterSelectItem {...tooltipProps} isFocused={true}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      await waitForEuiToolTipVisible();
      expect(queryByRole('tooltip')).toBeInTheDocument();

      rerender(
        <EuiFilterSelectItem {...tooltipProps} isFocused={false}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      await waitForEuiToolTipHidden();
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
