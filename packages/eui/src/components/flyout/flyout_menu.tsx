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
  useMemo,
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
import { LEVEL_MAIN } from './manager/const';
import { useFlyoutManager } from './manager';

type EuiFlyoutMenuBackButtonProps = Pick<
  PropsForAnchor<EuiButtonProps>,
  'aria-label' | 'data-test-subj' | 'onClick'
>;

type EuiFlyoutHistoryItem = {
  title: string;
  onClick: () => void;
};

export type EuiFlyoutMenuProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    hideCloseButton?: boolean;
    hideBackButton?: boolean;
    customActions?: Array<{
      iconType: string;
      onClick: () => void;
      'aria-label': string;
    }>;
    /**
     * An id to use for the title element, when not used as a wrapper
     */
    titleId?: string;
    /**
     * A title for the flyout menu header, when not used as a wrapper
     */
    title?: React.ReactNode;
    /**
     * Allow flyout menu to be routed to as a wrapper around the title content
     */
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

export const EuiFlyoutMenu: FunctionComponent<EuiFlyoutMenuProps> = ({
  titleId,
  className,
  title,
  children,
  hideCloseButton,
  hideBackButton,
  customActions,
  asWrapper = false,
  ...rest
}) => {
  const { level, onClose } = useContext(EuiFlyoutMenuContext);
  const manager = useFlyoutManager();
  const historyItems = manager?.historyItems || [];

  const backButtonProps = useMemo(() => {
    const goBack = manager?.goBack || (() => {});
    return level === LEVEL_MAIN ? { onClick: goBack } : undefined;
  }, [level, manager]);

  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);
  const classes = classNames('euiFlyoutMenu', className);

  let titleNode: React.JSX.Element | null = null;
  if (asWrapper && children) {
    // Wrapper mode: render children as title
    titleNode = (
      <EuiFlexItem grow={false} css={styles.euiFlyoutMenu__wrapper_title}>
        <div>{children}</div>
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

  let backButton: React.JSX.Element | null = null;
  let historyPopover: React.JSX.Element | null = null;
  if (historyItems.length > 0 && level === LEVEL_MAIN && !hideBackButton) {
    backButton = (
      <EuiFlexItem grow={false}>
        <BackButton {...backButtonProps} />
      </EuiFlexItem>
    );
    historyPopover = (
      <EuiFlexItem grow={false}>
        <HistoryPopover items={historyItems} />
      </EuiFlexItem>
    );
  }

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
        {backButton}
        {historyPopover}
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
