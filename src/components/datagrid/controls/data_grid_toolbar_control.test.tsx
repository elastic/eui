/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';

import { EuiDataGridToolbarControl } from './data_grid_toolbar_control';

describe('euiDataGridToolbarControl', () => {
  shouldRenderCustomStyles(<EuiDataGridToolbarControl />);

  it('passes props to the underlying EuiButtonEmpty', () => {
    const { container } = render(
      <EuiDataGridToolbarControl
        size="xs"
        iconType="sortable"
        color="text"
        {...requiredProps}
      >
        Test button text
      </EuiDataGridToolbarControl>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with a badge', () => {
    const { container } = render(
      <EuiDataGridToolbarControl badgeContent={5}>
        Test button text
      </EuiDataGridToolbarControl>
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(
      container.querySelector('.euiDataGridToolbarControl__badge')
    ).toBeInTheDocument();
  });

  it('renders textProps onto the custom text wrapper', () => {
    const { container } = render(
      <EuiDataGridToolbarControl textProps={requiredProps}>
        Test button text
      </EuiDataGridToolbarControl>
    );

    expect(container.querySelector('.euiDataGridToolbarControl__text'))
      .toMatchInlineSnapshot(`
      <span
        aria-label="aria-label"
        class="euiDataGridToolbarControl__text eui-textTruncate testClass1 testClass2 emotion-euiTestCss"
        data-test-subj="test subject string"
      >
        Test button text
      </span>
    `);
  });
});
