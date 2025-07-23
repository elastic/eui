/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiMemoizedStyles } from '../../services';
import { EuiButtonIcon } from '../button';
import { EuiPopover } from '../popover';
import { EuiContextMenu, EuiContextMenuPanelDescriptor } from '../context_menu';
import { useEuiI18n } from '../i18n';
import { IconType } from '../icon';
import { euiFlyoutMenuBarStyles } from './flyout_menu_bar.styles';

export interface EuiFlyoutMenuBarAction {
  /**
   * Unique identifier for the action
   */
  key: string;
  /**
   * Icon type for the action button
   */
  iconType: IconType;
  /**
   * Aria label for accessibility
   */
  'aria-label': string;
  /**
   * Click handler for the action
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Optional disabled state
   */
  disabled?: boolean;
  /**
   * Optional data-test-subj for testing
   */
  'data-test-subj'?: string;
}

export interface EuiFlyoutMenuBarProps
  extends HTMLAttributes<HTMLDivElement>,
    CommonProps {
  /**
   * Title text to display on the left side of the menu bar
   */
  title?: string;
  /**
   * React node to display on the left side instead of title.
   * Takes precedence over title if both are provided.
   */
  children?: ReactNode;
  /**
   * Array of action buttons to display. Maximum of 3 visible buttons.
   * If more than 3 actions are provided, the first 2 will be shown
   * and the rest will be in an overflow menu.
   */
  actions?: EuiFlyoutMenuBarAction[];
  /**
   * Callback function called when the close button is clicked
   *
   * **Important:** The parent EuiFlyout must have `hideCloseButton={true}`
   * to prevent showing duplicate close buttons.
   *
   * @example
   * ```tsx
   * <EuiFlyout hideCloseButton onClose={handleClose}>
   *   <EuiFlyoutMenuBar
   *     title="My Title"
   *     onClose={handleClose}
   *   />
   * </EuiFlyout>
   * ```
   */
  onClose: (event: Event) => void;
}

export const EuiFlyoutMenuBar: FunctionComponent<EuiFlyoutMenuBarProps> = ({
  title,
  children,
  actions = [],
  onClose,
  className,
  ...rest
}) => {
  const [isOverflowPopoverOpen, setIsOverflowPopoverOpen] = useState(false);

  const classes = classNames('euiFlyoutMenuBar', className);

  const styles = useEuiMemoizedStyles(euiFlyoutMenuBarStyles);
  const cssStyles = [styles.euiFlyoutMenuBar];

  const closeAriaLabel = useEuiI18n(
    'euiFlyoutMenuBar.closeAriaLabel',
    'Close this dialog'
  );

  const overflowAriaLabel = useEuiI18n(
    'euiFlyoutMenuBar.overflowAriaLabel',
    'More actions'
  );

  // Determine which actions to show directly and which to put in overflow
  const maxVisibleActions = 3;

  // If we have more than 3 actions, show only 2 directly and put the rest in overflow
  const directActions =
    actions.length > maxVisibleActions
      ? actions.slice(0, 2)
      : actions.slice(0, maxVisibleActions);
  const shouldShowOverflow = actions.length > maxVisibleActions;

  // Render left content - children take precedence over title
  const leftContent = children ? (
    <div
      className="euiFlyoutMenuBar__content"
      css={styles.euiFlyoutMenuBar__content}
    >
      {children}
    </div>
  ) : title ? (
    <div
      className="euiFlyoutMenuBar__content"
      css={styles.euiFlyoutMenuBar__content}
    >
      <h2
        className="euiFlyoutMenuBar__title"
        css={styles.euiFlyoutMenuBar__title}
      >
        {title}
      </h2>
    </div>
  ) : (
    <div
      className="euiFlyoutMenuBar__content"
      css={styles.euiFlyoutMenuBar__content}
    />
  );

  // Create overflow menu items for context menu
  const overflowMenuItems = shouldShowOverflow
    ? actions.slice(2).map((action) => ({
        name: action['aria-label'],
        icon: action.iconType,
        onClick: () => {
          setIsOverflowPopoverOpen(false);
          // Create a synthetic event for consistency
          const syntheticEvent = new MouseEvent('click', {
            bubbles: true,
          }) as any;
          action.onClick(syntheticEvent);
        },
        disabled: action.disabled,
        'data-test-subj': action['data-test-subj'],
      }))
    : [];

  const overflowPanels: EuiContextMenuPanelDescriptor[] = [
    {
      id: 0,
      items: overflowMenuItems,
    },
  ];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {leftContent}

      <div
        className="euiFlyoutMenuBar__actions"
        css={styles.euiFlyoutMenuBar__actions}
      >
        {/* Render direct action buttons */}
        {directActions.map((action) => (
          <EuiButtonIcon
            key={action.key}
            iconType={action.iconType}
            color="text"
            aria-label={action['aria-label']}
            onClick={action.onClick}
            disabled={action.disabled}
            data-test-subj={action['data-test-subj']}
          />
        ))}

        {/* Render overflow menu if needed */}
        {shouldShowOverflow && (
          <EuiPopover
            button={
              <EuiButtonIcon
                iconType="boxesVertical"
                color="text"
                aria-label={overflowAriaLabel}
                onClick={() => setIsOverflowPopoverOpen(!isOverflowPopoverOpen)}
                data-test-subj="euiFlyoutMenuBarOverflowButton"
              />
            }
            isOpen={isOverflowPopoverOpen}
            closePopover={() => setIsOverflowPopoverOpen(false)}
            panelPaddingSize="none"
            anchorPosition="downRight"
          >
            <EuiContextMenu initialPanelId={0} panels={overflowPanels} />
          </EuiPopover>
        )}

        {/* Always render close button last */}
        <EuiButtonIcon
          iconType="cross"
          color="text"
          aria-label={closeAriaLabel}
          data-test-subj="euiFlyoutMenuBarCloseButton"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            onClose(e.nativeEvent);
          }}
        />
      </div>
    </div>
  );
};
