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
  useContext,
  useState,
} from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { EuiButtonEmpty, EuiButtonIcon, EuiButtonProps } from '../button';
import { CommonProps, PropsForAnchor } from '../common';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiListGroup, EuiListGroupItem } from '../list_group';
import { EuiPopover } from '../popover';
import { EuiTitle } from '../title';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { euiFlyoutMenuStyles } from './flyout_menu.styles';
import { EuiFlyoutMenuContext } from './flyout_menu_context';
import type { EuiFlyoutCloseEvent } from './types';
import { EuiI18n, useEuiI18n } from '../i18n';

type EuiFlyoutMenuBackButtonProps = Pick<
  PropsForAnchor<EuiButtonProps>,
  'aria-label' | 'data-test-subj' | 'onClick'
>;

/**
 * History item for the flyout menu history popover
 */
export interface EuiFlyoutHistoryItem {
  /**
   * Title for the history item
   */
  title: string;
  /**
   * onClick handler for the history item
   */
  onClick: () => void;
}

/**
 * Custom action item for the flyout menu component
 */
export interface EuiFlyoutMenuCustomAction {
  /**
   * Icon type for the action button
   */
  iconType: string;
  /**
   * onClick handler for the action button
   */
  onClick: () => void;
  /**
   * Aria label for the action button
   */
  'aria-label': string;
}

/**
 * Props for EuiFlyoutMenu
 */
export type EuiFlyoutMenuProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An id to use for the title element. Useful for setting aria-labelledby on the flyout.
     * Example:
     * ```jsx
     * <EuiFlyout
     *   aria-labelledby="myMenuTitleId"
     *   flyoutMenuProps={{ title: 'Menu title', titleId: 'myMenuTitleId' }
     * >
     *  ...
     * </EuiFlyout>
     * ```
     */
    titleId?: string;
    /**
     * Title for the menu component. In a managed flyout context, the title is used to indicate the flyout session for history navigation.
     */
    title?: React.ReactNode;
    /**
     * Hides the title in the `EuiFlyoutMenu`. This is useful when the title is already shown in an `EuiFlyoutHeader`.
     * @default true for main flyout in a managed flyout session; false otherwise
     */
    hideTitle?: boolean;
    /**
     * Hides the close button in the menu component
     * @default false
     */
    hideCloseButton?: boolean;
    /**
     * Shows a back button in the menu component
     * @default false
     */
    showBackButton?: boolean;
    /**
     * Props to pass to the back button, such as `onClick` handler
     */
    backButtonProps?: EuiFlyoutMenuBackButtonProps;
    /**
     * List of history items for the history popover
     */
    historyItems?: EuiFlyoutHistoryItem[];
    /**
     * List of custom action items for the menu component
     */
    customActions?: EuiFlyoutMenuCustomAction[];
  };

const BackButton: React.FC<EuiFlyoutMenuBackButtonProps> = (props) => {
  return (
    <EuiButtonEmpty size="xs" color="text" iconType="editorUndo" {...props}>
      <EuiI18n token="euiFlyoutMenu.back" default="Back" />
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
        <EuiButtonIcon
          iconType="arrowDown"
          color="text"
          aria-label={useEuiI18n('euiFlyoutMenu.history', 'History')}
        />
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

/**
 * The component for the top menu bar inside a flyout. Since this is a private
 * component, rendering is controlled using the `flyoutMenuProps` prop on
 * `EuiFlyout`. In managed session flyouts, the Flyout Manager controls a back
 * button and history popover for navigating to different flyout sessions
 * within the managed context.
 *
 * @private
 */
export const EuiFlyoutMenu: FunctionComponent<EuiFlyoutMenuProps> = ({
  className,
  title,
  titleId,
  hideTitle,
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

  let titleNode;
  if (title) {
    titleNode = (
      <EuiTitle size="xxs" id={titleId}>
        <h3 css={hideTitle && styles.euiFlyoutMenu__hiddenTitle}>{title}</h3>
      </EuiTitle>
    );
  }

  const handleClose = (event: EuiFlyoutCloseEvent) => {
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
