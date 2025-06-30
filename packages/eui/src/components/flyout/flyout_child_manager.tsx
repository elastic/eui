/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ComponentProps,
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useEuiTheme } from '../../services';
import { EuiFlyoutContext, EuiFlyoutContextValue } from './flyout_context';
import { EuiFlyoutChild } from './flyout_child';

interface EuiFlyoutChildProviderProps {
  parentSize: 's' | 'm';
  parentFlyoutRef: React.RefObject<HTMLDivElement>;
  childElement: React.ReactElement<ComponentProps<typeof EuiFlyoutChild>>;
  childrenToRender: ReactNode;
  reportIsChildOpen: (isOpen: boolean) => void;
  reportChildLayoutMode: (mode: 'side-by-side' | 'stacked') => void;
}

/**
 * An intermediate component between EuiFlyout and EuiFlyoutChild.
 * It is responsible for managing the state of the child flyout, and passing it to EuiFlyoutContext.
 * It removes the responsibility of managing child flyout state from EuiFlyout, which is especially important there might not be a child flyout.
 */
export const EuiFlyoutChildProvider: FunctionComponent<
  EuiFlyoutChildProviderProps
> = ({
  parentSize,
  parentFlyoutRef,
  childElement,
  childrenToRender,
  reportIsChildOpen,
  reportChildLayoutMode,
}) => {
  const { euiTheme } = useEuiTheme();

  const [isChildFlyoutOpen, setIsChildFlyoutOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : Infinity
  );
  const [childLayoutMode, setChildLayoutMode] = useState<
    'side-by-side' | 'stacked'
  >('side-by-side');

  // update windowWidth on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate stacking breakpoint value for child flyout.
  // Stacking breakpoint value is a sum of parent breakpoint value and child breakpoint value.
  const stackingBreakpointValue = useMemo(() => {
    const parentSizeName = parentSize;
    const childSizeName = childElement.props.size || 's';

    let parentNumericValue = 0;
    if (parentSizeName === 's') parentNumericValue = euiTheme.breakpoint.s;
    else if (parentSizeName === 'm') parentNumericValue = euiTheme.breakpoint.m;
    // Parent 'l' size is not allowed when child is present, so no need to check here

    let childNumericValue = 0;
    if (childSizeName === 's') childNumericValue = euiTheme.breakpoint.s;
    else if (childSizeName === 'm') childNumericValue = euiTheme.breakpoint.m;

    return parentNumericValue + childNumericValue;
  }, [parentSize, childElement.props.size, euiTheme.breakpoint]);

  // update childLayoutMode based on windowWidth and the calculated stackingBreakpoint
  useEffect(() => {
    if (windowWidth >= stackingBreakpointValue) {
      setChildLayoutMode('side-by-side');
    } else {
      setChildLayoutMode('stacked');
    }
  }, [windowWidth, stackingBreakpointValue]);

  // report isChildFlyoutOpen changes to the parent EuiFlyout
  useEffect(() => {
    reportIsChildOpen(isChildFlyoutOpen);
  }, [isChildFlyoutOpen, reportIsChildOpen]);

  // report childLayoutMode changes to the parent EuiFlyout
  useEffect(() => {
    reportChildLayoutMode(childLayoutMode);
  }, [childLayoutMode, reportChildLayoutMode]);

  const contextValue = useMemo<EuiFlyoutContextValue>(
    () => ({
      parentSize,
      parentFlyoutRef,
      isChildFlyoutOpen,
      setIsChildFlyoutOpen,
      childLayoutMode,
    }),
    [
      parentSize,
      parentFlyoutRef,
      isChildFlyoutOpen,
      setIsChildFlyoutOpen,
      childLayoutMode,
    ]
  );

  return (
    <EuiFlyoutContext.Provider value={contextValue}>
      {childrenToRender}
    </EuiFlyoutContext.Provider>
  );
};
