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
  useContext,
  Children,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiMemoizedStyles, useIsWithinMinBreakpoint } from '../../services';
import { euiFlyoutChildStyles } from './flyout_child.styles';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { EuiFlyoutContext } from './flyout_context';
import { EuiFlyoutBody } from './flyout_body';

export type EuiFlyoutChildProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      /**
       * Called when the child panel's close button is clicked
       */
      onClose: (event: MouseEvent | TouchEvent | KeyboardEvent) => void;
      /**
       * Use to display a banner at the top of the child. It is suggested to use `EuiCallOut` for it.
       */
      banner?: ReactNode;
      /**
       * Hides the default close button. You must provide another close button somewhere within the child flyout.
       * @default false
       */
      hideCloseButton?: boolean;
      /**
       * [Scrollable regions (or their children) should be focusable](https://dequeuniversity.com/rules/axe/4.0/scrollable-region-focusable)
       * to allow keyboard users to scroll the region via arrow keys.
       *
       * By default, EuiFlyoutChild's scroll overflow wrapper sets a `tabIndex` of `0`.
       * If you know your flyout child content already contains focusable children
       * that satisfy keyboard accessibility requirements, you can use this prop
       * to override this default.
       */
      scrollableTabIndex?: number;
      /**
       * Size of the child flyout panel.
       * When the parent flyout is 'm', child is limited to 's'.
       * @default 's'
       */
      size?: 's' | 'm';
    }
>;

export const EuiFlyoutChild: EuiFlyoutChildProps = ({
  children,
  className,
  banner,
  hideCloseButton = false,
  onClose,
  scrollableTabIndex = 0,
  size = 's', // Default to 's'
  ...rest
}) => {
  const flyoutContext = useContext(EuiFlyoutContext);
  const isAboveMediumBreakpoint = useIsWithinMinBreakpoint('m');

  // Validation: EuiFlyoutChild must be used within an EuiFlyout
  // This check runs on every render. If context is not found, throw immediately.
  if (!flyoutContext) {
    throw new Error('EuiFlyoutChild must be used as a child of EuiFlyout.');
  }

  // Validation: EuiFlyoutChild must include an EuiFlyoutBody
  // This check also runs on every render based on children prop.
  let hasFlyoutBody = false;
  Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === EuiFlyoutBody) {
      hasFlyoutBody = true;
    }
  });

  if (!hasFlyoutBody) {
    throw new Error('EuiFlyoutChild must include an EuiFlyoutBody child.');
  }

  // Enforce size limitation based on parent flyout size
  // This check also runs on every render based on props and context.
  if (flyoutContext.size === 'm' && size === 'm') {
    throw new Error(
      'When the parent EuiFlyout size is "m", the EuiFlyoutChild size cannot be "m". Please use size "s" for the EuiFlyoutChild.'
    );
  }
  // effectiveSize is now just the passed `size` prop, as invalid combinations are thrown.
  const effectiveSize = size;

  const classes = classNames('euiFlyoutChild', className);

  const styles = useEuiMemoizedStyles(euiFlyoutChildStyles);
  const overflowCssStyles = [
    styles.overflow.euiFlyoutChild__overflow,
    banner ? styles.overflow.hasBanner : styles.overflow.noBanner,
  ];

  return (
    <div
      className={classes}
      css={[
        styles.euiFlyoutChild,
        isAboveMediumBreakpoint ? styles.sidePosition : styles.stackedPosition,
        // Use effectiveSize which is now the validated 'size' prop
        effectiveSize === 's' ? styles.s : styles.m,
      ]}
      data-test-subj="euiFlyoutChild"
      role="dialog"
      aria-modal="true"
      {...rest}
    >
      {!hideCloseButton && (
        <EuiFlyoutCloseButton
          className="euiFlyoutChild__closeButton"
          css={styles.euiFlyoutChild__closeButton}
          onClose={onClose}
          side="right"
          closeButtonPosition="inside" // Always "inside" for child flyouts
          data-test-subj="euiFlyoutChildCloseButton"
        />
      )}
      <div
        tabIndex={scrollableTabIndex}
        className="euiFlyoutChild__overflow"
        css={overflowCssStyles}
      >
        {banner && (
          <div
            className="euiFlyoutChild__banner"
            css={styles.euiFlyoutChild__banner}
            data-test-subj="euiFlyoutChildBanner"
          >
            {banner}
          </div>
        )}
        <div
          className="euiFlyoutChild__overflowContent"
          css={styles.euiFlyoutChild__overflowContent}
          data-test-subj="euiFlyoutChildContent"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

EuiFlyoutChild.displayName = 'EuiFlyoutChild';
