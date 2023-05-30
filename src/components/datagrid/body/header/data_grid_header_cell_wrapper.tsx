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
} from 'react';
import { tabbable } from 'tabbable';
import { keys } from '../../../../services';
import { DataGridFocusContext } from '../../utils/focus';
import { EuiDataGridHeaderCellWrapperProps } from '../../data_grid_types';

/**
 * This is a wrapper that handles repeated concerns between control &
 * standard header cells. Most of its shared logic is around focus state/UX,
 * but it also DRY's out certain class/data-test-subj/style attributes
 */
export const EuiDataGridHeaderCellWrapper: FunctionComponent<
  EuiDataGridHeaderCellWrapperProps
> = ({
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

  useEffect(() => {
    const headerNode = headerRef.current!;

    if (isCellEntered) {
      enableAndFocusInteractives(headerNode);
    } else {
      disableInteractives(headerNode);
    }
  }, [isCellEntered]);

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
    const onFocusIn = (e: FocusEvent) => {
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
          // this cell already had the grid's focus, so re-enable and focus interactives
          setIsCellEntered(true);
        }
      }
    };

    // focusout bubbles while blur does not, and this needs to react to the children losing focus
    const onFocusOut = () => {
      // wait for the next element to receive focus, then update interactives' state
      requestAnimationFrame(() => {
        if (!headerNode.contains(document.activeElement)) {
          setIsCellEntered(false);
        }
      });
    };

    const onKeyUp = (event: KeyboardEvent) => {
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
      }
    };

    headerNode.addEventListener('focusin', onFocusIn);
    headerNode.addEventListener('focusout', onFocusOut);
    headerNode.addEventListener('keyup', onKeyUp);
    return () => {
      headerNode.removeEventListener('focusin', onFocusIn);
      headerNode.removeEventListener('focusout', onFocusOut);
      headerNode.removeEventListener('keyup', onKeyUp);
    };
  }, [headerIsInteractive, isFocused, index, setFocusedCell]);

  return (
    <div
      role="columnheader"
      ref={headerRef}
      tabIndex={isFocused && !isCellEntered ? 0 : -1}
      className={classes}
      data-test-subj={`dataGridHeaderCell-${id}`}
      data-gridcell-column-id={id}
      data-gridcell-column-index={index}
      data-gridcell-row-index="-1"
      data-gridcell-visible-row-index="-1"
      style={width != null ? { width: `${width}px` } : {}}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * Utility fns for managing child interactive tabIndex state
 */

const disableInteractives = (headerNode: Element) => {
  const tabbables = tabbable(headerNode);
  if (tabbables.length > 1) {
    console.warn(
      `EuiDataGridHeaderCell expects at most 1 tabbable element, ${tabbables.length} found instead`
    );
  }
  tabbables.forEach((element) => {
    element.setAttribute('data-euigrid-tab-managed', 'true');
    element.setAttribute('tabIndex', '-1');
  });
};

const enableAndFocusInteractives = (headerNode: Element) => {
  const interactiveElements = headerNode.querySelectorAll(
    '[data-euigrid-tab-managed]'
  );
  interactiveElements.forEach((element, i) => {
    element.setAttribute('tabIndex', '0');
    if (i === 0) {
      (element as HTMLElement).focus();
    }
  });
};
