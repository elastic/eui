/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState, useCallback } from 'react';

import { useEuiTheme } from '../../../../services';

import { EuiLink, EuiLinkAnchorProps } from '../../../link';
import { EuiPopover, EuiPopoverTitle } from '../../../popover';

import {
  EuiCollapsibleNavSubItem,
  EuiCollapsibleNavItemProps,
} from '../collapsible_nav_item';

import { EuiCollapsedNavButton } from './collapsed_nav_button';
import {
  euiCollapsedNavPopoverStyles,
  euiCollapsedNavPopoverTitleStyles,
} from './collapsed_nav_popover.styles';

export const EuiCollapsedNavPopover: FunctionComponent<
  EuiCollapsibleNavItemProps & {
    items: EuiCollapsibleNavItemProps['items'];
  }
> = ({
  items,
  href, // eslint-disable-line local/href-with-rel
  linkProps,
  title,
  titleElement,
  icon,
  iconProps,
  isSelected,
  // Extracted to avoid spreading to ...rest
  accordionProps,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiCollapsedNavPopoverStyles(euiTheme);

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
      panelProps={{ css: styles.euiCollapsedNavPopover__panel }}
      button={
        <EuiCollapsedNavButton
          title={title}
          icon={icon || 'boxesHorizontal'}
          iconProps={iconProps}
          isSelected={isSelected}
          onClick={togglePopover}
          hideToolTip={isPopoverOpen}
          // Note: do not pass `linkProps` to buttons that toggle popovers
        />
      }
      {...rest}
    >
      <EuiCollapsedNavPopoverTitle
        title={title}
        titleElement={titleElement}
        href={href}
        linkProps={linkProps}
      />
      <div css={styles.euiCollapsedNavPopover__items}>
        {items!.map((item, index) => (
          <EuiCollapsibleNavSubItem key={index} {...item} />
        ))}
      </div>
    </EuiPopover>
  );
};

const EuiCollapsedNavPopoverTitle: FunctionComponent<
  Pick<
    EuiCollapsibleNavItemProps,
    'title' | 'titleElement' | 'href' | 'linkProps'
  >
> = ({
  title,
  titleElement: TitleElement = 'span',
  href, // eslint-disable-line local/href-with-rel
  linkProps,
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiCollapsedNavPopoverTitleStyles(euiTheme);
  const cssStyles = [
    styles.euiCollapsedNavPopover__title,
    href ? styles.link : styles.span,
    href && linkProps?.css,
  ];

  return (
    <EuiPopoverTitle>
      {href ? (
        <EuiLink
          href={href}
          color="text"
          {...(linkProps as EuiLinkAnchorProps)} // ExclusiveUnion shenanigans :|
          css={cssStyles}
        >
          <TitleElement className="eui-textTruncate">{title}</TitleElement>
        </EuiLink>
      ) : (
        <TitleElement css={cssStyles} className="eui-textTruncate">
          {title}
        </TitleElement>
      )}
    </EuiPopoverTitle>
  );
};
