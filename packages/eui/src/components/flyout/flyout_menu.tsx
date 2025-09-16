/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, useContext } from 'react';
import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../services';
import { CommonProps } from '../common';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiTitle } from '../title';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { euiFlyoutMenuStyles } from './flyout_menu.styles';
import { EuiFlyoutMenuContext } from './flyout_menu_context';

export type EuiFlyoutMenuProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    backButton?: React.ReactNode;
    popover?: React.ReactNode;
    title?: React.ReactNode;
    hideCloseButton?: boolean;
  };

export const EuiFlyoutMenu: FunctionComponent<EuiFlyoutMenuProps> = ({
  children,
  className,
  backButton,
  popover,
  title,
  hideCloseButton,
  ...rest
}) => {
  const { onClose } = useContext(EuiFlyoutMenuContext);

  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);
  const classes = classNames('euiFlyoutMenu', className);
  const titleId = useGeneratedHtmlId();

  let titleNode;
  if (title) {
    titleNode = (
      <EuiTitle size="xxs" id={titleId}>
        <h3>{title}</h3>
      </EuiTitle>
    );
  }

  const handleClose = (
    event: MouseEvent | TouchEvent | KeyboardEvent | undefined
  ) => {
    onClose?.(event);
  };

  let closeButton;
  if (!hideCloseButton) {
    closeButton = (
      <EuiFlyoutCloseButton
        onClose={handleClose}
        side="right"
        closeButtonPosition="inside"
      />
    );
  }

  return (
    <div className={classes} css={styles.euiFlyoutMenu__container} {...rest}>
      <EuiFlexGroup
        alignItems="center"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        {backButton && <EuiFlexItem grow={false}>{backButton}</EuiFlexItem>}
        {popover && <EuiFlexItem grow={false}>{popover}</EuiFlexItem>}
        {titleNode && <EuiFlexItem grow={false}>{titleNode}</EuiFlexItem>}
        <EuiFlexItem grow={true}></EuiFlexItem>
        {children && <EuiFlexItem grow={false}>{children}</EuiFlexItem>}
        <EuiFlexItem grow={false} css={styles.euiFlyoutMenu__spacer} />
      </EuiFlexGroup>
      {closeButton}
    </div>
  );
};
