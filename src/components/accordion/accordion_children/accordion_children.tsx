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
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { tabbable, FocusableElement } from 'tabbable';

import { useEuiTheme } from '../../../services';
import { EuiResizeObserver } from '../../observer/resize_observer';

import { EuiAccordionProps } from '../accordion';
import { EuiAccordionChildrenLoading } from './accordion_children_loading';
import {
  euiAccordionChildrenStyles,
  euiAccordionChildWrapperStyles,
} from './accordion_children.styles';

type _EuiAccordionChildrenProps = HTMLAttributes<HTMLDivElement> &
  Pick<
    EuiAccordionProps,
    'children' | 'paddingSize' | 'isLoading' | 'isLoadingMessage'
  > & {
    isOpen: boolean;
  };
export const EuiAccordionChildren: FunctionComponent<
  _EuiAccordionChildrenProps
> = ({
  children,
  paddingSize,
  isLoading,
  isLoadingMessage,
  isOpen,
  ...rest
}) => {
  /**
   * Children
   */
  const classes = classNames('euiAccordion__children', {
    'euiAccordion__children-isLoading': isLoading,
  });

  const euiTheme = useEuiTheme();
  const styles = euiAccordionChildrenStyles(euiTheme);
  const cssStyles = [
    styles.euiAccordion__children,
    isLoading && styles.isLoading,
    paddingSize && paddingSize !== 'none' && styles[paddingSize],
  ];

  /**
   * Wrapper
   */
  const wrapperStyles = euiAccordionChildWrapperStyles(euiTheme);
  const wrapperCssStyles = [
    wrapperStyles.euiAccordion__childWrapper,
    isOpen && wrapperStyles.isOpen,
  ];

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  /**
   * Update the accordion wrapper height whenever the accordion opens, and also
   * whenever the child content updates (which will change the height)
   */
  const [contentHeight, setContentHeight] = useState(0);
  const onResize = useCallback(
    ({ height }: { height: number }) => setContentHeight(Math.round(height)),
    []
  );
  const heightInlineStyle = useMemo(
    () => ({ blockSize: isOpen ? contentHeight : 0 }),
    [isOpen, contentHeight]
  );

  /**
   * Focus the children wrapper on open
   */
  useEffect(() => {
    if (isOpen) wrapperRef.current?.focus();
  }, [isOpen]);

  /**
   * Ensure accordion children are correctly removed from tabindex order
   * when accordions are closed, and correctly restored on open
   */
  const tabbableChildren = useRef<FocusableElement[] | null>(null);

  useEffect(() => {
    // When accordions are closed, tabbable children should not be present in the tab order
    if (!isOpen) {
      // Re-check for children on every close - content can change dynamically
      tabbableChildren.current = tabbable(wrapperRef.current!);

      tabbableChildren.current.forEach((element) => {
        // If the element has an existing `tabIndex` set, make sure we can restore it
        const originalTabIndex = element.getAttribute('tabIndex');
        if (originalTabIndex) {
          element.setAttribute('data-original-tabindex', originalTabIndex);
        }

        element.setAttribute('tabIndex', '-1');
      });
    } else {
      // On open, restore tabbable children
      // If no tabbable children were set, we don't need to re-enable anything
      if (!tabbableChildren.current) return;

      tabbableChildren.current.forEach((element) => {
        const originalTabIndex = element.getAttribute('data-original-tabindex');
        if (originalTabIndex) {
          // If the element originally had an existing `tabIndex` set, restore it
          element.setAttribute('tabIndex', originalTabIndex);
          element.removeAttribute('data-original-tabindex');
        } else {
          // If not, remove the tabIndex property
          element.removeAttribute('tabIndex');
        }
      });
      // Cleanup - unset the list of children
      tabbableChildren.current = null;
    }
  }, [isOpen]);

  return (
    <div
      {...rest}
      className="euiAccordion__childWrapper"
      css={wrapperCssStyles}
      style={heightInlineStyle}
      ref={wrapperRef}
      tabIndex={-1}
      role="region"
    >
      <EuiResizeObserver onResize={onResize}>
        {(resizeRef) => (
          <div ref={resizeRef} className={classes} css={cssStyles}>
            {isLoading && isLoadingMessage ? (
              <EuiAccordionChildrenLoading
                isLoadingMessage={isLoadingMessage}
              />
            ) : (
              children
            )}
          </div>
        )}
      </EuiResizeObserver>
    </div>
  );
};
