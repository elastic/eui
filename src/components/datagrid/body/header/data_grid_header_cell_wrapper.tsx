/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import tabbable from 'tabbable';
import { keys } from '../../../../services';
import { DataGridFocusContext } from '../../data_grid_context';
import { EuiDataGridHeaderCellWrapperProps } from '../../data_grid_types';

/**
 * This is a wrapper that handles repeated concerns between control &
 * standard header cells. Most of its shared logic is around focus state/UX,
 * but it also DRY's out certain class/data-test-subj/style attributes
 */
export const EuiDataGridHeaderCellWrapper: FunctionComponent<EuiDataGridHeaderCellWrapperProps> = ({
  id,
  index,
  headerIsInteractive,
  width,
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiDataGridHeaderCell', className);

  const { setFocusedCell, onFocusUpdate } = useContext(DataGridFocusContext);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    onFocusUpdate([index, -1], (isFocused: boolean) => {
      setIsFocused(isFocused);
    });
  }, [index, onFocusUpdate]);

  const headerRef = useRef<HTMLDivElement>(null);
  const [isCellEntered, setIsCellEntered] = useState(false);

  const focusInteractives = useCallback((headerNode: Element) => {
    const tabbables = tabbable(headerNode);
    if (tabbables.length === 1) {
      tabbables[0].focus();
      setIsCellEntered(true);
    }
  }, []);

  const enableInteractives = useCallback((headerNode: Element) => {
    const interactiveElements = headerNode.querySelectorAll(
      '[data-euigrid-tab-managed]'
    );
    for (let i = 0; i < interactiveElements.length; i++) {
      interactiveElements[i].setAttribute('tabIndex', '0');
    }
  }, []);

  const disableInteractives = useCallback((headerNode: Element) => {
    const tababbles = tabbable(headerNode);
    if (tababbles.length > 1) {
      console.warn(
        `EuiDataGridHeaderCell expects at most 1 tabbable element, ${tababbles.length} found instead`
      );
    }
    for (let i = 0; i < tababbles.length; i++) {
      const element = tababbles[i];
      element.setAttribute('data-euigrid-tab-managed', 'true');
      element.setAttribute('tabIndex', '-1');
    }
  }, []);

  useEffect(() => {
    const headerNode = headerRef.current!;

    if (isCellEntered) {
      enableInteractives(headerNode);
      focusInteractives(headerNode);
    } else {
      disableInteractives(headerNode);
    }
  }, [
    disableInteractives,
    enableInteractives,
    focusInteractives,
    isCellEntered,
  ]);

  useEffect(() => {
    const headerNode = headerRef.current!;

    if (isFocused) {
      const interactives = headerNode.querySelectorAll(
        '[data-euigrid-tab-managed]'
      );
      if (interactives.length === 1) {
        setIsCellEntered(true);
      } else {
        headerNode.focus();
      }
    } else {
      setIsCellEntered(false);
    }

    // focusin bubbles while focus does not, and this needs to react to children gaining focus
    function onFocusIn(e: FocusEvent) {
      if (!headerIsInteractive) {
        // header is not interactive, avoid focusing
        requestAnimationFrame(() => headerNode.blur());
        e.preventDefault();
        return false;
      } else {
        // take the focus
        if (isFocused === false) {
          setFocusedCell([index, -1]);
        } else {
          // this cell already had the grid's focus, so re-enable interactives
          enableInteractives(headerNode);
          // shift focus to the interactive element
          focusInteractives(headerNode);
        }
      }
    }

    // focusout bubbles while blur does not, and this needs to react to the children losing focus
    function onFocusOut() {
      // wait for the next element to receive focus, then update interactives' state
      requestAnimationFrame(() => {
        if (!headerNode.contains(document.activeElement)) {
          setIsCellEntered(false);
        }
      });
    }

    function onKeyUp(event: KeyboardEvent) {
      switch (event.key) {
        case keys.ENTER: {
          event.preventDefault();
          setIsCellEntered(true);
          break;
        }
        case keys.ESCAPE: {
          event.preventDefault();
          // move focus to cell
          setIsCellEntered(false);
          headerNode.focus();
          break;
        }
        case keys.F2: {
          event.preventDefault();
          if (document.activeElement === headerRef.current) {
            // move focus into cell's interactives
            setIsCellEntered(true);
          } else {
            // move focus to cell
            setIsCellEntered(false);
            headerNode.focus();
          }
          break;
        }
      }
    }

    headerNode.addEventListener('focusin', onFocusIn);
    headerNode.addEventListener('focusout', onFocusOut);
    headerNode.addEventListener('keyup', onKeyUp);
    return () => {
      headerNode.removeEventListener('focusin', onFocusIn);
      headerNode.removeEventListener('focusout', onFocusOut);
      headerNode.removeEventListener('keyup', onKeyUp);
    };
  }, [
    enableInteractives,
    focusInteractives,
    headerIsInteractive,
    isFocused,
    setIsCellEntered,
    index,
    setFocusedCell,
  ]);

  return (
    <div
      role="columnheader"
      ref={headerRef}
      tabIndex={isFocused && !isCellEntered ? 0 : -1}
      className={classes}
      data-test-subj={`dataGridHeaderCell-${id}`}
      style={width != null ? { width: `${width}px` } : {}}
      {...rest}
    >
      {children}
    </div>
  );
};
