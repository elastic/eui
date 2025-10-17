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
  useEffect,
  useRef,
  useState,
} from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { EuiButtonEmpty, EuiButtonIcon, EuiButtonProps } from '../button';
import { CommonProps, PropsForAnchor } from '../common';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { useInnerText } from '../inner_text/inner_text';
import { EuiListGroup, EuiListGroupItem } from '../list_group';
import { EuiPopover } from '../popover';
import { EuiTitle } from '../title';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { euiFlyoutMenuStyles } from './flyout_menu.styles';
import { EuiFlyoutMenuContext } from './flyout_menu_context';
import type { EuiFlyoutCloseEvent } from './types';
import { EuiI18n, useEuiI18n } from '../i18n';
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

export const EuiFlyoutMenu: FunctionComponent<EuiFlyoutMenuProps> = ({
  titleId,
  className,
  title,
  children,
  hideCloseButton,
  historyItems = [],
  showBackButton = false,
  backButtonProps,
  customActions,
  asWrapper = false,
  ...rest
}) => {
  const { onClose } = useContext(EuiFlyoutMenuContext);
  const manager = useFlyoutManager();

  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);
  const classes = classNames(
    asWrapper ? 'euiFlyoutMenuWrapper' : 'euiFlyoutMenu',
    className
  );

  // Extract title text from children when in wrapper mode
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [setInnerTextRef, innerText] = useInnerText();

  // Set up inner text observation on the wrapper element
  useEffect(() => {
    if (asWrapper && wrapperRef.current) {
      setInnerTextRef(wrapperRef.current);
    }
  }, [asWrapper, setInnerTextRef]);

  // Update the manager title when inner text changes in wrapper mode
  // Only update for main flyouts - child flyout titles are for display only
  const prevTitleRef = useRef<string | null | undefined>(null);
  useEffect(() => {
    if (
      asWrapper &&
      innerText &&
      innerText !== prevTitleRef.current &&
      manager
    ) {
      const currentSession =
        manager.state.sessions[manager.state.sessions.length - 1];
      if (currentSession) {
        // Determine if this is a main flyout by checking the current flyout's level
        const currentFlyout = manager.state.flyouts.find(
          (f) => f.flyoutId === currentSession.mainFlyoutId
        );
        // Only update title for main flyouts (title updates affect navigation history)
        if (currentFlyout?.level === LEVEL_MAIN) {
          manager.updateFlyoutTitle(currentSession.mainFlyoutId, innerText);
        }
      }
    }

    // Always update the ref to prevent repeated attempts
    if (innerText !== prevTitleRef.current) {
      prevTitleRef.current = innerText;
    }
  }, [asWrapper, innerText, manager]);

  // Determine title content based on mode
  let titleNode;
  if (asWrapper && children) {
    // Wrapper mode: render children as title
    titleNode = (
      <EuiFlexItem grow={false} css={styles.euiFlyoutMenu__wrapper_title}>
        <div ref={wrapperRef}>{children}</div>
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
