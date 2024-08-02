/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  PropsWithChildren,
  FunctionComponent,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { tabbable } from 'tabbable';

import { keys } from '../../../../services';
import { EuiFocusTrap } from '../../../focus_trap';
import { EuiScreenReaderOnly } from '../../../accessibility';
import { EuiI18n } from '../../../i18n';

// DOM Node type guard
const isDOMNode = (el: any): el is Node => el instanceof Node;

/**
 * This internal utility component is used by all cells, both header and body/footer cells.
 * It always handles:
 *   1. Removing any interactive children from keyboard tab order on cell mount
 *   2. Listening for focus on any interactive children and updating the cell focus context
 *
 * It should *only* render focus traps for:
 *   1. Header cells that are `actions: false` but still have interactive children
 *   2. Body cells that are `isExpandable: false` but still have interactive children
 */
export const HandleInteractiveChildren: FunctionComponent<
  PropsWithChildren & {
    cellEl?: HTMLElement | null;
    updateCellFocusContext: Function;
    renderFocusTrap?: boolean;
    shouldDisableInteractives?: boolean;
  }
> = ({
  cellEl,
  children,
  updateCellFocusContext,
  renderFocusTrap,
  shouldDisableInteractives = true,
}) => {
  const [hasInteractiveChildren, setHasInteractiveChildren] = useState(
    !shouldDisableInteractives
  );

  useEffect(() => {
    setHasInteractiveChildren(!shouldDisableInteractives);
  }, [shouldDisableInteractives]);

  // On mount, disable all interactive children
  useEffect(() => {
    if (cellEl && shouldDisableInteractives) {
      const interactiveChildren = disableInteractives(cellEl);

      if (renderFocusTrap) {
        setHasInteractiveChildren(interactiveChildren!.length > 0);
      }
    }
  }, [cellEl, renderFocusTrap, shouldDisableInteractives]);

  // Ensure that any interactive children that are clicked update the latest cell focus context
  useEffect(() => {
    if (cellEl) {
      const onFocus = () => updateCellFocusContext();
      cellEl.addEventListener('focus', onFocus, true); // useCapture listens for focus on children
      return () => {
        cellEl.removeEventListener('focus', onFocus, true);
      };
    }
  }, [cellEl, updateCellFocusContext]);

  const _children = useMemo(() => <>{children}</>, [children]);
  if (!cellEl) return _children; // Do nothing if cell has yet to mount or is unmounting
  if (!renderFocusTrap) return _children; // Cells with default actions / expansion popovers do not need to trap
  if (!hasInteractiveChildren) return _children; // No need to focus trap if no children are interactive

  return (
    <FocusTrappedChildren cellEl={cellEl}>{children}</FocusTrappedChildren>
  );
};

/**
 * Cells with interactive children but no cell popover expansion should render a
 * focus trap that can be entered with the Enter key, which cycles keyboard tabs
 * through the cell contents only, and exited with the Escape key
 */
export const FocusTrappedChildren: FunctionComponent<
  PropsWithChildren & { cellEl: HTMLElement }
> = ({ cellEl, children }) => {
  const [isCellEntered, setIsCellEntered] = useState(false);
  // active = if focus is in or on header cell
  const [isActive, setActive] = useState(false);
  const [isExited, setExited] = useState(false);

  useEffect(() => {
    if (isCellEntered) {
      enableAndFocusInteractives(cellEl);
    } else {
      disableInteractives(cellEl);
    }
  }, [isCellEntered, cellEl]);

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case keys.ENTER:
        case keys.F2:
          event.preventDefault();
          setIsCellEntered((isCellEntered) => {
            if (!isCellEntered) {
              // set cell to active for initial ENTER
              if (!isActive) {
                setActive(true);
              }
              return true;
            }

            return isCellEntered;
          });
          break;

        case keys.ESCAPE:
          event.preventDefault();
          setIsCellEntered((isCellEntered) => {
            if (isCellEntered === true) {
              if (!isActive) {
                // return active state to cell
                // e.g. when closing inner content
                setActive(true);
              } else {
                // exit cell content
                setActive(false);
                requestAnimationFrame(() => cellEl.focus()); // move focus to cell
                return false;
              }
            }

            return isCellEntered;
          });
          break;
      }
    };

    const onFocusIn = (e: FocusEvent) => {
      if (
        isDOMNode(e.target) &&
        isDOMNode(e.relatedTarget) &&
        isDOMNode(e.currentTarget)
      ) {
        if (
          isActive &&
          e.currentTarget.contains(e.target) &&
          !e.currentTarget.contains(e.relatedTarget)
        ) {
          setActive(true);
        }
      }
    };

    const onFocusOut = (e: FocusEvent) => {
      if (
        isDOMNode(e.target) &&
        isDOMNode(e.relatedTarget) &&
        isDOMNode(e.currentTarget)
      ) {
        if (isActive && isCellEntered) {
          if (
            e.currentTarget.contains(e.target) &&
            !e.currentTarget.contains(e.relatedTarget)
          ) {
            setActive(false);
          }
        }

        setExited(e.relatedTarget === e.currentTarget);
      }
    };

    cellEl.addEventListener('keyup', onKeyUp);
    cellEl.addEventListener('focusin', onFocusIn);
    cellEl.addEventListener('focusout', onFocusOut);

    return () => {
      cellEl.removeEventListener('keyup', onKeyUp);
      cellEl.removeEventListener('focusin', onFocusIn);
      cellEl.removeEventListener('focusout', onFocusOut);
    };
  }, [cellEl, isActive, isCellEntered]);

  return (
    <EuiFocusTrap disabled={!isCellEntered} clickOutsideDisables={true}>
      {children}

      <EuiScreenReaderOnly>
        <p aria-live="assertive">
          {isExited ? (
            <EuiI18n
              // eslint-disable-next-line local/i18n
              token="euiDataGridCell.focusTrapExitPrompt"
              default="Exited cell content."
            />
          ) : (
            <EuiI18n
              // eslint-disable-next-line local/i18n
              token="euiDataGridCell.focusTrapEnterPrompt"
              default="Press the Enter key to interact with this cell's contents."
            />
          )}
        </p>
      </EuiScreenReaderOnly>
    </EuiFocusTrap>
  );
};

/**
 * Utility fns for managing child interactive tabIndex state
 */

const disableInteractives = (cell: HTMLElement) => {
  const interactives = tabbable(cell);
  interactives.forEach((element) => {
    element.setAttribute('data-euigrid-tab-managed', 'true');
    element.setAttribute('tabIndex', '-1');
  });
  return interactives;
};

const enableAndFocusInteractives = (cell: HTMLElement) => {
  const interactives = cell.querySelectorAll('[data-euigrid-tab-managed]');
  interactives.forEach((element, i) => {
    element.setAttribute('tabIndex', '0');
    if (i === 0) {
      (element as HTMLElement).focus();
    }
  });
  return interactives;
};
