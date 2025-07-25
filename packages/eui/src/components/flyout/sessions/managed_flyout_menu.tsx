/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';

import { EuiButtonEmpty, EuiButtonIcon } from '../../button';
import { EuiIcon } from '../../icon';
import { EuiListGroup } from '../../list_group';
import { EuiListGroupItem } from '../../list_group/list_group_item';
import { EuiPopover } from '../../popover';
import { EuiFlyoutMenu, EuiFlyoutMenuProps } from '../flyout_menu';
import { EuiFlyoutSessionGroup } from './types';

/**
 * Top flyout menu bar
 * This automatically appears for "managed flyouts" (those that were opened with `openManagedFlyout`),
 * @internal
 */
export const ManagedFlyoutMenu = (
  props: Pick<EuiFlyoutMenuProps, 'title'> & {
    handleGoBack: () => void;
    handleGoToHistoryItem: (index: number) => void;
    historyItems: Array<EuiFlyoutSessionGroup<unknown>>;
  }
) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { title, historyItems, handleGoBack, handleGoToHistoryItem } = props;

  let backButton: React.ReactNode | undefined;
  let historyPopover: React.ReactNode | undefined;

  if (!!historyItems.length) {
    const handlePopoverButtonClick = () => {
      setIsPopoverOpen(!isPopoverOpen);
    };

    backButton = (
      <EuiButtonEmpty size="xs" onClick={handleGoBack} color="text">
        <EuiIcon type="editorUndo" /> Back
      </EuiButtonEmpty>
    );

    historyPopover = (
      <EuiPopover
        button={
          <EuiButtonIcon
            iconType="arrowDown"
            color="text"
            onClick={handlePopoverButtonClick}
            aria-label="History"
          />
        }
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        panelPaddingSize="xs"
        anchorPosition="downLeft"
      >
        <EuiListGroup gutterSize="none">
          {historyItems.map((item, index) => (
            <EuiListGroupItem
              key={index}
              label={item.config.mainTitle}
              size="s"
              onClick={() => {
                handleGoToHistoryItem(index);
                setIsPopoverOpen(false);
              }}
            >
              {item.config.mainTitle}
            </EuiListGroupItem>
          ))}
        </EuiListGroup>
      </EuiPopover>
    );
  }

  return (
    <EuiFlyoutMenu
      backButton={backButton}
      popover={historyPopover}
      title={title}
    />
  );
};
