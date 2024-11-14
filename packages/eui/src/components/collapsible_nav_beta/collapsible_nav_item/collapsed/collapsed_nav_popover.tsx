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
  EuiCollapsibleNavSubItemProps,
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

  const closePopoverAndClearFocus = useCallback(() => {
    closePopover();

    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        // We don't want the tooltip to appear after closing the popover
        document.activeElement.blur();
      }
    }, 10);
  }, [closePopover]);

  const withOnClick = (
    item: EuiCollapsibleNavSubItemProps
  ): EuiCollapsibleNavSubItemProps => {
    if (item.renderItem) {
      return item;
    }

    const { renderItem, href, linkProps, ...rest } = item;

    const updatedItem: EuiCollapsibleNavSubItemProps = {
      ...rest,
    };

    if (href || linkProps) {
      updatedItem.href = href;
      updatedItem.linkProps = linkProps;
    } else {
      updatedItem.items = rest.items ? rest.items?.map(withOnClick) : undefined;
    }

    if (!updatedItem.items) {
      // Only override the onClick if there are no sub-items (leaf node)
      updatedItem.onClick = (e: React.MouseEvent<HTMLElement>) => {
        if (rest.onClick) {
          rest.onClick(e);
        }
        closePopoverAndClearFocus();
      };
    }

    return updatedItem;
  };

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
          <EuiCollapsibleNavSubItem
            key={index}
            closePopover={closePopoverAndClearFocus}
            {...withOnClick(item)}
          />
        ))}
      </div>
    </EuiPopover>
  );
};
