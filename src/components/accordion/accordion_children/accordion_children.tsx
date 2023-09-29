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
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme, useUpdateEffect } from '../../../services';

import { EuiAccordionProps } from '../accordion';
import { EuiAccordionChildrenLoading } from './accordion_children_loading';
import {
  euiAccordionAnimationVars,
  euiAccordionAnimations,
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
  const classes = classNames('euiAccordion__children', {
    'euiAccordion__children-isLoading': isLoading,
  });

  const euiTheme = useEuiTheme();
  const accordionAnimationDuration =
    euiTheme.euiTheme.animation[euiAccordionAnimationVars.duration]!;

  /**
   * Open/close animation
   */
  const [animationState, setAnimationState] = useState<
    'opening' | 'closing' | 'notAnimating'
  >('notAnimating');
  const isAnimating = animationState !== 'notAnimating';
  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>();

  useUpdateEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)')?.matches) {
      return;
    }

    if (isOpen) {
      setAnimationState('opening');
    } else {
      setAnimationState('closing');
    }

    // When the animation is complete, remove the transitory state
    const animationDuration = parseInt(accordionAnimationDuration, 10);
    timeoutId.current = setTimeout(() => {
      setAnimationState('notAnimating');
    }, animationDuration);

    return () => {
      clearTimeout(timeoutId.current!);
    };
  }, [isOpen, accordionAnimationDuration]);

  // For some reason, this extra state produces less ghosting on close
  const [animationClosed, setAnimationClosed] = useState(!isOpen);
  useUpdateEffect(() => {
    setAnimationClosed(!isOpen && !isAnimating);
  }, [isAnimating, isOpen]);

  /**
   * Styles
   */

  const animations = useMemo(() => {
    return euiAccordionAnimations(euiTheme.euiTheme.animation);
  }, [euiTheme.euiTheme]);

  const styles = euiAccordionChildrenStyles(euiTheme, animations);
  const cssStyles = [
    styles.euiAccordion__children,
    isAnimating && styles[animationState],
    isLoading && styles.isLoading,
    paddingSize && paddingSize !== 'none' && styles[paddingSize],
  ];

  const wrapperStyles = euiAccordionChildWrapperStyles(euiTheme, animations);
  const wrapperCssStyles = [
    wrapperStyles.euiAccordion__childWrapper,
    isAnimating && wrapperStyles[animationState],
    animationClosed ? wrapperStyles.isClosed : wrapperStyles.isOpen,
  ];

  /**
   * Focus the children wrapper when the accordion is opened,
   * but not if the accordion is initially open on mount
   */

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useUpdateEffect(() => {
    if (isOpen) wrapperRef.current?.focus();
  }, [isOpen]);

  return (
    <div
      {...rest}
      className="euiAccordion__childWrapper"
      css={wrapperCssStyles}
      ref={wrapperRef}
      role="region"
      tabIndex={-1}
      // @ts-expect-error - inert property not yet available in React TS defs. TODO: Remove this once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822 is merged
      inert={!isOpen ? '' : undefined} // Can't pass a boolean currently, Jest throws errors
    >
      <div className={classes} css={cssStyles}>
        {isLoading && isLoadingMessage ? (
          <EuiAccordionChildrenLoading isLoadingMessage={isLoadingMessage} />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
