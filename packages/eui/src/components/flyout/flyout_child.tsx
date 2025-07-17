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
  useRef,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { keys, useEuiMemoizedStyles, useGeneratedHtmlId } from '../../services';
import { euiFlyoutChildStyles } from './flyout_child.styles';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { EuiFlyoutContext } from './flyout_context';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFocusTrap } from '../focus_trap';

/**
 * Props used to render and configure the child flyout panel
 */
export interface EuiFlyoutChildProps
  extends HTMLAttributes<HTMLDivElement>,
    CommonProps {
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
  /*
   * The background of the child flyout can be optionally shaded. Use `shaded` to add the shading.
   */
  backgroundStyle?: 'shaded' | 'default';
  /**
   * Children are implicitly part of FunctionComponent, but good to have if props type is standalone.
   */
  children?: ReactNode;
}

/**
 * The child flyout is a panel that appears to the left of the parent flyout.
 * It is only visible when the parent flyout is open.
 */
export const EuiFlyoutChild: FunctionComponent<EuiFlyoutChildProps> = ({
  children,
  backgroundStyle = 'default',
  className,
  banner,
  hideCloseButton = false,
  onClose,
  scrollableTabIndex = 0,
  size = 's',
  ...rest
}) => {
  const flyoutContext = useContext(EuiFlyoutContext);

  if (!flyoutContext) {
    throw new Error('EuiFlyoutChild must be used as a child of EuiFlyout.');
  }

  const { isChildFlyoutOpen, setIsChildFlyoutOpen, parentSize } = flyoutContext;

  useEffect(() => {
    setIsChildFlyoutOpen?.(true);
    return () => {
      setIsChildFlyoutOpen?.(false);
    };
  }, [setIsChildFlyoutOpen]);

  if (React.Children.count(children) === 0) {
    console.warn('EuiFlyoutChild was rendered with no children!');
  }

  if (parentSize === 'm' && size === 'm') {
    throw new Error(
      'When the parent EuiFlyout size is "m", the EuiFlyoutChild size cannot be "m". Please use size "s" for the EuiFlyoutChild.'
    );
  }

  const handleClose = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
    setIsChildFlyoutOpen?.(false);
    onClose(event);
  };

  let flyoutTitleText: string | undefined;
  let hasDescribedByBody = false;
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

  const titleIdGenerated = useGeneratedHtmlId({
    prefix: 'euiFlyoutChildTitle',
  });
  const bodyIdGenerated = useGeneratedHtmlId({ prefix: 'euiFlyoutChildBody' });
  const ariaLabelledBy = flyoutTitleText ? titleIdGenerated : undefined;
  const ariaDescribedBy = hasDescribedByBody ? bodyIdGenerated : undefined;
  // Use existing aria-label if provided, otherwise fallback if no labelledby can be derived
  const ariaLabel =
    rest['aria-label'] ||
    (!ariaLabelledBy && !flyoutTitleText ? 'Flyout panel' : undefined);

  const processedChildren = useMemo(() => {
    return Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (
          (child.type === EuiFlyoutBody ||
            (child.type as any)?.displayName === 'EuiFlyoutBody') &&
          hasDescribedByBody
        ) {
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

  const flyoutWrapperRef = useRef<HTMLDivElement>(null);

  const classes = classNames('euiFlyoutChild', className);

  const styles = useEuiMemoizedStyles(euiFlyoutChildStyles);

  const { childLayoutMode, parentFlyoutRef } = flyoutContext;

  const flyoutChildCss = [
    styles.euiFlyoutChild,
    backgroundStyle === 'shaded'
      ? styles.backgroundShaded
      : styles.backgroundDefault,
    size === 's' ? styles.s : styles.m,
    childLayoutMode === 'side-by-side'
      ? styles.sidePosition
      : styles.stackedPosition,
  ];

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isChildFlyoutOpen && event.key === keys.ESCAPE) {
        event.preventDefault();
        setIsChildFlyoutOpen?.(false);
        onClose(event.nativeEvent);
      }
    },
    [isChildFlyoutOpen, onClose, setIsChildFlyoutOpen]
  );

  return (
    <EuiFocusTrap
      returnFocus={() => {
        if (parentFlyoutRef?.current) {
          parentFlyoutRef.current.focus();
          return false; // We've handled focus
        }
        return true;
      }}
      shards={[]}
      disabled={false}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={flyoutWrapperRef}
        className={classes}
        css={flyoutChildCss}
        data-test-subj="euiFlyoutChild"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        onKeyDown={onKeyDown} // used as generic container event handler
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
            onClose={handleClose}
            side="right"
            closeButtonPosition="inside"
            data-test-subj="euiFlyoutChildCloseButton"
          />
        )}
        <div
          tabIndex={scrollableTabIndex}
          className="euiFlyoutChild__overflow"
          css={styles.overflow.overflow}
        >
          {banner && (
            <div
              className="euiFlyoutChild__banner"
              css={styles.banner}
              data-test-subj="euiFlyoutChildBanner"
            >
              {banner}
            </div>
          )}
          <div
            className="euiFlyoutChild__overflowContent"
            css={styles.overflow.wrapper}
          >
            {processedChildren}
          </div>
        </div>
      </div>
    </EuiFocusTrap>
  );
};

EuiFlyoutChild.displayName = 'EuiFlyoutChild';
