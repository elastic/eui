/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  useContext,
  useState,
} from 'react';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../services';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { CommonProps } from '../common';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiIcon } from '../icon';
import { EuiListGroup, EuiListGroupItem } from '../list_group';
import { EuiPopover } from '../popover';
import { EuiTitle } from '../title';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { euiFlyoutMenuStyles } from './flyout_menu.styles';
import { EuiFlyoutMenuContext } from './flyout_menu_context';
import type { EuiFlyoutCloseEvent } from './types';

type EuiFlyoutMenuBackButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
  'data-test-subj'?: string;
};

type EuiFlyoutHistoryItem = {
  title: string;
  onClick: () => void;
};

export type EuiFlyoutMenuProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    title?: React.ReactNode;
    hideCloseButton?: boolean;
    showBackButton?: boolean;
    backButtonProps?: EuiFlyoutMenuBackButtonProps;
    historyItems?: EuiFlyoutHistoryItem[];
    customActions?: Array<{
      iconType: string;
      onClick: () => void;
      'aria-label': string;
    }>;
  };

const BackButton: React.FC<EuiFlyoutMenuBackButtonProps> = (props) => {
  return (
    <EuiButtonEmpty size="xs" color="text" {...props}>
      <EuiIcon type="editorUndo" /> Back
    </EuiButtonEmpty>
  );
};

const HistoryPopover: React.FC<{
  items: EuiFlyoutHistoryItem[];
}> = ({ items }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handlePopoverButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <EuiPopover
      button={
        <EuiButtonIcon iconType="arrowDown" color="text" aria-label="History" />
      }
      isOpen={isPopoverOpen}
      onClick={handlePopoverButtonClick}
      closePopover={() => setIsPopoverOpen(false)}
      panelPaddingSize="xs"
      anchorPosition="downLeft"
    >
      <EuiListGroup gutterSize="none">
        {items.map((item, index) => (
          <EuiListGroupItem
            key={`history-item-${index}`}
            label={item.title}
            size="s"
            onClick={() => {
              item.onClick();
              setIsPopoverOpen(false);
            }}
          >
            {item.title}
          </EuiListGroupItem>
        ))}
      </EuiListGroup>
    </EuiPopover>
  );
};

export const EuiFlyoutMenu: FunctionComponent<EuiFlyoutMenuProps> = ({
  className,
  title,
  hideCloseButton,
  historyItems = [],
  showBackButton,
  backButtonProps,
  customActions,
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

  const handleClose = (event: EuiFlyoutCloseEvent | undefined) => {
    onClose?.(event);
  };

  const closeButton = (
    <EuiFlyoutCloseButton
      onClose={handleClose}
      side="right"
      closeButtonPosition="inside"
    />
  );

  return (
    <div className={classes} css={styles.euiFlyoutMenu__container} {...rest}>
      <EuiFlexGroup
        alignItems="center"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        {showBackButton && (
          <EuiFlexItem grow={false}>
            <BackButton {...backButtonProps} />
          </EuiFlexItem>
        )}

        {historyItems.length > 0 && (
          <EuiFlexItem grow={false}>
            <HistoryPopover items={historyItems} />
          </EuiFlexItem>
        )}

        {titleNode && <EuiFlexItem grow={false}>{titleNode}</EuiFlexItem>}

        <EuiFlexItem grow={true}></EuiFlexItem>

        {customActions &&
          customActions.map((action, actionIndex) => (
            <EuiFlexItem
              grow={false}
              key={`action-index-flex-item-${actionIndex}`}
              css={styles.euiFlyoutMenu__actions}
            >
              <EuiButtonIcon
                key={`action-index-icon-${actionIndex}`}
                aria-label={action['aria-label']}
                iconType={action.iconType}
                onClick={action.onClick}
                color="text"
                size="s"
              />
            </EuiFlexItem>
          ))}

        {/* spacer to give custom actions room around the close button */}
        {!hideCloseButton && (
          <EuiFlexItem grow={false} css={styles.euiFlyoutMenu__spacer} />
        )}
      </EuiFlexGroup>
      {!hideCloseButton && closeButton}
    </div>
  );
};
