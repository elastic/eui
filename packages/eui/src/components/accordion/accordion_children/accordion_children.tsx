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
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';

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
    | 'role'
    | 'children'
    | 'paddingSize'
    | 'initialIsOpen'
    | 'isLoading'
    | 'isLoadingMessage'
  > & {
    isOpen: boolean;
  };
export const EuiAccordionChildren: FunctionComponent<
  _EuiAccordionChildrenProps
> = ({
  role,
  children,
  paddingSize,
  isLoading,
  isLoadingMessage,
  isOpen,
  initialIsOpen,
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
  const [hasTransition, setHasTransition] = useState(false);
  const wrapperStyles = euiAccordionChildWrapperStyles(euiTheme);
  const wrapperCssStyles = [
    wrapperStyles.euiAccordion__childWrapper,
    isOpen ? wrapperStyles.isOpen : wrapperStyles.isClosed,
    initialIsOpen && !hasTransition && isOpen && wrapperStyles.noTransition,
  ];

  /* Controls enabling opening/closing transitions on first interaction
  when initialIsOpen=true; this only runs once */
  useEffect(() => {
    if (initialIsOpen && !isOpen && !hasTransition) {
      setHasTransition(true);
    }
  }, [isOpen, initialIsOpen, hasTransition]);

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

  return (
    <div
      {...rest}
      className="euiAccordion__childWrapper"
      css={wrapperCssStyles}
      style={heightInlineStyle}
      role={role}
      // @ts-expect-error - inert property not yet available in React TS defs. TODO: Remove this once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822 is merged
      inert={!isOpen ? '' : undefined} // Can't pass a boolean currently, Jest throws errors
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
