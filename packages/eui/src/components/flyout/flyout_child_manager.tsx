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

interface EuiFlyoutChildManagerProps {
  parentDesignatedSize: 's' | 'm';
  parentFlyoutRef: React.RefObject<HTMLDivElement>;
  childElement: React.ReactElement<ComponentProps<typeof EuiFlyoutChild>>;
  childrenToRender: ReactNode; // The original children passed to EuiFlyout
  reportIsChildOpen: (isOpen: boolean) => void;
  reportChildLayoutMode: (mode: 'alongside' | 'stacked') => void;
}

export const EuiFlyoutChildManager: FunctionComponent<
  EuiFlyoutChildManagerProps
> = ({
  parentDesignatedSize,
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
    'alongside' | 'stacked'
  >('alongside');

  // update windowWidth on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array, runs once on mount

  // Calculate stacking breakpoint value for child flyout
  const stackingBreakpointValue = useMemo(() => {
    const parentSizeName = parentDesignatedSize;
    const childSizeName = childElement.props.size || 's';

    let parentNumericValue = 0;
    if (parentSizeName === 's') parentNumericValue = euiTheme.breakpoint.s;
    else if (parentSizeName === 'm') parentNumericValue = euiTheme.breakpoint.m;
    // Parent 'l' size is not allowed when child is present, so no need to check here

    let childNumericValue = 0;
    if (childSizeName === 's') childNumericValue = euiTheme.breakpoint.s;
    else if (childSizeName === 'm') childNumericValue = euiTheme.breakpoint.m;

    return parentNumericValue + childNumericValue;
  }, [parentDesignatedSize, childElement.props.size, euiTheme.breakpoint]);

  // update childLayoutMode based on windowWidth and stackingBreakpoint
  useEffect(() => {
    if (windowWidth >= stackingBreakpointValue) {
      setChildLayoutMode('alongside');
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
      size: parentDesignatedSize,
      parentFlyoutRef,
      isChildFlyoutOpen,
      setIsChildFlyoutOpen,
      childLayoutMode,
    }),
    [
      parentDesignatedSize,
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
