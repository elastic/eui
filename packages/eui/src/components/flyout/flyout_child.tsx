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
  useEffect,
  useMemo,
  useRef, // Added for focus trap and ARIA logic
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme, useGeneratedHtmlId } from '../../services';
import { euiFlyoutChildStyles } from './flyout_child.styles';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { EuiFlyoutContext } from './flyout_context';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFocusTrap } from '../focus_trap';

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
  size = 's',
  ...rest
}) => {
  const themeContext = useEuiTheme();
  const flyoutContext = useContext(EuiFlyoutContext);

  if (!flyoutContext) {
    throw new Error('EuiFlyoutChild must be used as a child of EuiFlyout.');
  }

  const {
    setIsChildFlyoutOpen,
    childLayoutMode = 'alongside', // Default to 'alongside' if not provided
    parentFlyoutRef,
    size: parentSize,
  } = flyoutContext;

  useEffect(() => {
    setIsChildFlyoutOpen?.(true);
    return () => {
      setIsChildFlyoutOpen?.(false);
    };
  }, [setIsChildFlyoutOpen]);

  let hasFlyoutBodyChild = false;
  Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === EuiFlyoutBody) {
      hasFlyoutBodyChild = true;
    }
  });

  if (!hasFlyoutBodyChild) {
    throw new Error('EuiFlyoutChild must include an EuiFlyoutBody child.');
  }

  if (parentSize === 'm' && size === 'm') {
    throw new Error(
      'When the parent EuiFlyout size is "m", the EuiFlyoutChild size cannot be "m". Please use size "s" for the EuiFlyoutChild.'
    );
  }
  const effectiveSize = size;

  const currentSideBySideVwWidth = effectiveSize === 's' ? '25vw' : '50vw';

  const styles = useMemo(() => {
    return euiFlyoutChildStyles(themeContext, currentSideBySideVwWidth);
  }, [themeContext, currentSideBySideVwWidth]);

  const overflowCssStyles = [
    styles.overflow.euiFlyoutChild__overflow,
    banner ? styles.overflow.hasBanner : styles.overflow.noBanner,
  ];

  const classes = classNames('euiFlyoutChild', className);

  const handleClose = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
    setIsChildFlyoutOpen?.(false); // Notify parent before calling onClose
    onClose(event);
  };

  const handleCloseButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    // We pass the React.MouseEvent to handleClose. It should be compatible
    // enough with the native MouseEvent for the props.onClose callback.
    // If stricter type checking is needed for onClose, this might need adjustment.
    handleClose(event as unknown as MouseEvent); // Cast to base MouseEvent
  };

  const titleIdGenerated = useGeneratedHtmlId({
    prefix: 'euiFlyoutChildTitle',
  });
  const bodyIdGenerated = useGeneratedHtmlId({ prefix: 'euiFlyoutChildBody' });

  let flyoutTitleText: string | undefined;
  let hasDescribedByBody = false;
  const flyoutWrapperRef = useRef<HTMLDivElement>(null);

  Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if ((child.type as any)?.displayName === 'EuiFlyoutHeader') {
        // Attempt to extract string content from header for ARIA
        const headerChildren = child.props.children;
        if (typeof headerChildren === 'string') {
          flyoutTitleText = headerChildren;
        } else if (
          React.isValidElement(headerChildren) &&
          // Check if props exist and children is a string
          typeof (headerChildren.props as { children?: ReactNode }).children ===
            'string'
        ) {
          flyoutTitleText = (headerChildren.props as { children: string })
            .children;
        } else if (Array.isArray(headerChildren)) {
          // Find the first string child if headerChildren is an array
          flyoutTitleText = headerChildren.find(
            (cNode) => typeof cNode === 'string'
          ) as string | undefined;
        }
      }
      if (child.type === EuiFlyoutBody) {
        hasDescribedByBody = true;
      }
    }
  });

  const ariaLabelledBy = flyoutTitleText ? titleIdGenerated : undefined;
  const ariaDescribedBy = hasDescribedByBody ? bodyIdGenerated : undefined;
  // Use existing aria-label if provided, otherwise fallback if no labelledby can be derived
  const ariaLabel =
    rest['aria-label'] ||
    (!ariaLabelledBy && !flyoutTitleText ? 'Flyout panel' : undefined);

  const processedChildren = useMemo(() => {
    return Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === EuiFlyoutBody && hasDescribedByBody) {
          return React.cloneElement(child as React.ReactElement<any>, {
            id: bodyIdGenerated,
          });
        }
        // If EuiFlyoutHeader is found and we derived flyoutTitleText, set its ID
        if (
          (child.type as any)?.displayName === 'EuiFlyoutHeader' &&
          flyoutTitleText &&
          ariaLabelledBy
        ) {
          return React.cloneElement(child as React.ReactElement<any>, {
            id: titleIdGenerated,
          });
        }
      }
      return child;
    });
  }, [
    children,
    bodyIdGenerated,
    titleIdGenerated,
    hasDescribedByBody,
    flyoutTitleText,
    ariaLabelledBy,
  ]);

  return (
    <EuiFocusTrap
      returnFocus={() => {
        if (parentFlyoutRef?.current) {
          parentFlyoutRef.current.focus();
          return false; // We've handled focus
        }
        return true;
      }}
      shards={[]} // Child flyout specific shards, if any
      disabled={false} // Child trap is active when child is open
    >
      <div
        ref={flyoutWrapperRef}
        className={classes}
        css={[
          styles.euiFlyoutChild,
          childLayoutMode === 'alongside'
            ? styles.sidePosition
            : styles.stackedPosition,
          childLayoutMode === 'alongside' && styles.sizeVariant,
        ]}
        data-test-subj="euiFlyoutChild"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1} // Focus is managed by EuiFocusTrap
        {...rest}
      >
        {/* Fallback title for screen readers if a title was derived but not used for aria-labelledby
            (e.g. if the EuiFlyoutHeader itself wasn't given the ID via processedChildren)
            This ensures a title is announced if one was found.
         */}
        {flyoutTitleText && !ariaLabelledBy && (
          <h2 id={titleIdGenerated} className="euiScreenReaderOnly">
            {flyoutTitleText}
          </h2>
        )}
        {!hideCloseButton && (
          <EuiFlyoutCloseButton
            className="euiFlyoutChild__closeButton"
            css={styles.euiFlyoutChild__closeButton}
            onClick={handleCloseButtonClick} // Use wrapped, more specific handler
            onClose={handleClose}
            side="right"
            closeButtonPosition="inside"
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
          <div className="euiFlyoutChild__overflowContent">
            {processedChildren}
          </div>
        </div>
      </div>
    </EuiFocusTrap>
  );
};

EuiFlyoutChild.displayName = 'EuiFlyoutChild';
