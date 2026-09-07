/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';

import { EuiButtonIcon } from '../../button';
import { EuiListGroup, EuiListGroupItem } from '../../list_group';
import { EuiPopover } from '../../popover';
import { EuiToolTip } from '../../tool_tip';
import type { EuiFlyoutHistoryItem } from './types';

/**
 * Labels are resolved by `EuiFlyoutMenu`, which owns the `euiFlyoutMenu.*`
 * i18n token namespace.
 */
export const HistoryPopover: React.FC<{
  items: EuiFlyoutHistoryItem[];
  historyLabel: string;
  recentlyVisitedLabel: string;
}> = ({ items, historyLabel, recentlyVisitedLabel }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <EuiPopover
      aria-label={historyLabel}
      button={
        <EuiToolTip content={recentlyVisitedLabel} disableScreenReaderOutput>
          <EuiButtonIcon
            iconType="clockCounter"
            color="text"
            aria-label={historyLabel}
            data-test-subj="euiFlyoutMenuHistoryButton"
          />
        </EuiToolTip>
      }
      isOpen={isPopoverOpen}
      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      closePopover={() => setIsPopoverOpen(false)}
      panelPaddingSize="xs"
      anchorPosition="downLeft"
    >
      <EuiListGroup>
        {items.map((item, index) => (
          <EuiListGroupItem
            key={`history-item-${index}`}
            label={item.title}
            iconType={item.iconType}
            onClick={() => {
              item.onClick();
              setIsPopoverOpen(false);
            }}
            data-test-subj={`euiFlyoutMenuHistoryItem-${index}`}
          >
            {item.title}
          </EuiListGroupItem>
        ))}
      </EuiListGroup>
    </EuiPopover>
  );
};
