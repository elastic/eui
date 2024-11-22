/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState, useCallback } from 'react';

import { useEuiMemoizedStyles } from '../../../../services';

import {
  type EuiPopoverProps,
  EuiPopover,
  EuiPopoverTitle,
} from '../../../popover';

import {
  EuiCollapsibleNavSubItem,
  EuiCollapsibleNavItemProps,
} from '../collapsible_nav_item';

import { EuiCollapsedNavButton } from './collapsed_nav_button';
import { euiCollapsedNavPopoverStyles } from './collapsed_nav_popover.styles';

export const EuiCollapsedNavPopover: FunctionComponent<
  Omit<
    EuiCollapsibleNavItemProps,
    'isCollapsible' | 'accordionProps' | 'href' | 'linkProps'
  > &
    Partial<EuiPopoverProps>
> = ({
  items,
  title,
  titleElement: TitleElement = 'span',
  icon,
  iconProps,
  isSelected,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiCollapsedNavPopoverStyles);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopover = useCallback(
    () => setIsPopoverOpen((isOpen) => !isOpen),
    []
  );
  const closePopover = useCallback(() => setIsPopoverOpen(false), []);

  return (
    <EuiPopover
      closePopover={closePopover}
      isOpen={isPopoverOpen}
      display="block"
      anchorPosition="rightUp"
      panelPaddingSize="none"
      repositionOnScroll={true}
      button={
        <EuiCollapsedNavButton
          title={title}
          icon={icon || 'boxesHorizontal'}
          iconProps={iconProps}
          isSelected={isSelected}
          onClick={togglePopover}
          hideToolTip={isPopoverOpen}
        />
      }
      {...rest}
      panelProps={{
        ...rest.panelProps,
        css: [styles.euiCollapsedNavPopover__panel, rest.panelProps?.css],
      }}
    >
      <EuiPopoverTitle>
        <TitleElement
          css={styles.euiCollapsedNavPopover__title}
          className="eui-textTruncate"
        >
          {title}
        </TitleElement>
      </EuiPopoverTitle>
      <div css={styles.euiCollapsedNavPopover__items}>
        {items!.map((item, index) => (
          <EuiCollapsibleNavSubItem key={index} {...item} />
        ))}
      </div>
    </EuiPopover>
  );
};
