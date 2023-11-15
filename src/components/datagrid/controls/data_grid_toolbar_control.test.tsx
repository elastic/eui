/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, screen } from '../../../test/rtl';

import { EuiDataGridToolbarControl } from './data_grid_toolbar_control';

describe('euiDataGridToolbarControl', () => {
  it('renders with a badge', () => {
    const onClickMock = jest.fn();

    const { container } = render(
      <EuiDataGridToolbarControl
        buttonText="Test button text"
        badgeCount={5}
        size="xs"
        iconType="sortable"
        color="text"
        onClick={onClickMock}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders without a badge', () => {
    const onClickMock = jest.fn();

    const { container } = render(
      <EuiDataGridToolbarControl
        buttonText="Test button text"
        badgeCount={undefined}
        size="xs"
        iconType="sortable"
        color="text"
        onClick={onClickMock}
      />
    );

    expect(container).toMatchSnapshot();
    screen.getByRole('button').click();

    expect(onClickMock).toHaveBeenCalled();
  });
});
