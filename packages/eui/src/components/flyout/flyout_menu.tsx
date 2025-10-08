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
import { useHasActiveSession } from './manager';
import { useFlyoutManager } from './manager/hooks';
import { LEVEL_MAIN } from './manager/const';

type EuiFlyoutMenuBackButtonProps = Pick<
  PropsForAnchor<EuiButtonProps>,
  'aria-label' | 'data-test-subj' | 'onClick'
>;

type EuiFlyoutHistoryItem = {
  title: string;
  onClick: () => void;
};

/**
 * Hook that provides flyout menu props based on the current managed flyout context.
 * Returns undefined if not in a managed flyout context.
 */
const useFlyoutMenuProps = () => {
  const hasActiveSession = useHasActiveSession();
  const manager = useFlyoutManager();

  if (!hasActiveSession || !manager) {
    return undefined;
  }

  const { state, goBack, historyItems: managerHistoryItems } = manager;
  const currentSession = state.sessions[state.sessions.length - 1];

  if (!currentSession) {
    return undefined;
  }

  // Get the current flyout's level and title from the manager state
  const currentFlyout = state.flyouts.find(
    (f: any) =>
      f.flyoutId === currentSession.mainFlyoutId ||
      f.flyoutId === currentSession.childFlyoutId
  );

  if (!currentFlyout) {
    return undefined;
  }

  const level = currentFlyout.level;
  const title = currentSession.title;

  // Calculate menu props based on level
  const historyItems = level === LEVEL_MAIN ? managerHistoryItems : undefined;
  const backButtonProps =
    level === LEVEL_MAIN ? { onClick: goBack } : undefined;
  const showBackButton = historyItems ? historyItems.length > 0 : false;

  return {
    historyItems,
    backButtonProps,
    showBackButton,
    title,
  };
};

export type EuiFlyoutMenuProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /* An id to use for the title element */
    titleId?: string;
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
    /* When true, renders children as title content instead of using title prop */
    asWrapper?: boolean;
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

// Internal unified component with branched logic
const EuiFlyoutMenuInternal: FunctionComponent<{
  titleId?: string;
  className?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  hideCloseButton?: boolean;
  historyItems?: EuiFlyoutHistoryItem[];
  showBackButton?: boolean;
  backButtonProps?: EuiFlyoutMenuBackButtonProps;
  customActions?: Array<{
    iconType: string;
    onClick: () => void;
    'aria-label': string;
  }>;
  asWrapper?: boolean;
  [key: string]: any;
}> = ({
  titleId,
  className,
  title: titleProp,
  children,
  hideCloseButton,
  historyItems: historyItemsProp = [],
  showBackButton: showBackButtonProp,
  backButtonProps: backButtonPropsProp,
  customActions,
  asWrapper = false,
  ...rest
}) => {
  const { onClose } = useContext(EuiFlyoutMenuContext);

  // Get menu props from context (if in managed flyout)
  const contextMenuProps = useFlyoutMenuProps();

  // Use context values as defaults, allow props to override
  const title = titleProp ?? contextMenuProps?.title;
  const historyItems =
    historyItemsProp.length > 0
      ? historyItemsProp
      : contextMenuProps?.historyItems ?? [];
  const backButtonProps =
    backButtonPropsProp ?? contextMenuProps?.backButtonProps;
  const showBackButton =
    showBackButtonProp ?? contextMenuProps?.showBackButton ?? false;

  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);
  const classes = classNames(
    asWrapper ? 'euiFlyoutMenuWrapper' : 'euiFlyoutMenu',
    className
  );

  // Determine title content based on mode
  let titleNode;
  if (asWrapper && children) {
    // Wrapper mode: render children as title
    titleNode = (
      <EuiFlexItem grow={false} css={styles.euiFlyoutMenu__wrapper_title}>
        <>{children}</>
      </EuiFlexItem>
    );
  } else if (title) {
    // Menu mode: render title in EuiTitle
    titleNode = (
      <EuiFlexItem grow={false}>
        <EuiTitle size="xxs" id={titleId}>
          <h3>{title}</h3>
        </EuiTitle>
      </EuiFlexItem>
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
        {showBackButton && backButtonProps && (
          <EuiFlexItem grow={false}>
            <BackButton {...backButtonProps} />
          </EuiFlexItem>
        )}

        {historyItems.length > 0 && (
          <EuiFlexItem grow={false}>
            <HistoryPopover items={historyItems} />
          </EuiFlexItem>
        )}

        {titleNode}

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

export const EuiFlyoutMenu: FunctionComponent<EuiFlyoutMenuProps> = (props) => {
  return <EuiFlyoutMenuInternal {...props} />;
};
