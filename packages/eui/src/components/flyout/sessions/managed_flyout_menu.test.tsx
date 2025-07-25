/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { ManagedFlyoutMenu } from './managed_flyout_menu';
import { EuiFlyoutSessionGroup } from './types';

describe('FlyoutSystemMenu', () => {
  const mockHistoryItems: Array<EuiFlyoutSessionGroup<any>> = [
    {
      isMainOpen: true,
      isChildOpen: false,
      config: { mainSize: 's', mainTitle: 'History Item 1' },
    },
    {
      isMainOpen: true,
      isChildOpen: false,
      config: { mainSize: 'm', mainTitle: 'History Item 2' },
    },
  ];

  it('renders with a title', () => {
    const { getByText } = render(
      <ManagedFlyoutMenu
        title="Test Title"
        historyItems={[]}
        handleGoBack={() => {}}
        handleGoToHistoryItem={() => {}}
      />
    );
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders without a title', () => {
    const { queryByText } = render(
      <ManagedFlyoutMenu
        historyItems={[]}
        handleGoBack={() => {}}
        handleGoToHistoryItem={() => {}}
      />
    );
    expect(queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('renders with back button and history popover when history items are present', () => {
    const { getByText, getByLabelText } = render(
      <ManagedFlyoutMenu
        historyItems={mockHistoryItems}
        handleGoBack={() => {}}
        handleGoToHistoryItem={() => {}}
      />
    );
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByLabelText('History')).toBeInTheDocument();
  });

  it('calls handleGoBack when back button is clicked', () => {
    const handleGoBack = jest.fn();
    const { getByText } = render(
      <ManagedFlyoutMenu
        historyItems={mockHistoryItems}
        handleGoBack={handleGoBack}
        handleGoToHistoryItem={() => {}}
      />
    );
    fireEvent.click(getByText('Back'));
    expect(handleGoBack).toHaveBeenCalledTimes(1);
  });

  it('calls handleGoToHistoryItem when a history item is clicked', () => {
    const handleGoToHistoryItem = jest.fn();
    const { getByLabelText, getByText } = render(
      <ManagedFlyoutMenu
        historyItems={mockHistoryItems}
        handleGoBack={() => {}}
        handleGoToHistoryItem={handleGoToHistoryItem}
      />
    );

    fireEvent.click(getByLabelText('History'));
    fireEvent.click(getByText('History Item 1'));

    expect(handleGoToHistoryItem).toHaveBeenCalledWith(0);
  });
});
