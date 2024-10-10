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
import { FocusableElement, tabbable } from 'tabbable';
import classNames from 'classnames';

import { keys, useGeneratedHtmlId } from '../../../../services';
import { isDOMNode } from '../../../../utils';
import { EuiFocusTrap } from '../../../focus_trap';
import { EuiI18n } from '../../../i18n';

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
    onInteractiveChildrenFound?: (
      interactiveChildren: FocusableElement[]
    ) => void;
  }
> = ({
  cellEl,
  children,
  updateCellFocusContext,
  renderFocusTrap,
  onInteractiveChildrenFound,
}) => {
  const [hasInteractiveChildren, setHasInteractiveChildren] = useState(false);

  // On mount, disable all interactive children
  useEffect(() => {
    if (cellEl) {
      const interactives = disableInteractives(cellEl);
      onInteractiveChildrenFound?.(interactives);
      setHasInteractiveChildren(interactives.length > 0);
    }
  }, [cellEl, onInteractiveChildrenFound]);

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
  const [isExited, setExited] = useState(false);

  const ariaDescribedById = useGeneratedHtmlId({
    suffix: 'focusTrapHint',
  });

  // direct DOM manipulation as workaround to attach required hints
  useEffect(() => {
    const currentAriaDescribedbyId = cellEl.getAttribute('aria-describedby');
    // A11y: splitting ids to be able to append the first hint (sorting)
    // while other hints should follow the keyboard navigation hints
    const [sortingId, ...rest] = currentAriaDescribedbyId?.split(' ') ?? [];
    const remainingIds = rest.join(' ');

    cellEl.setAttribute(
      'aria-describedby',
      classNames(sortingId, ariaDescribedById, !isCellEntered && remainingIds)
    );

    return () => {
      if (currentAriaDescribedbyId) {
        cellEl.setAttribute('aria-describedby', currentAriaDescribedbyId);
      } else {
        cellEl.removeAttribute('aria-describedby');
      }
    };
  }, [cellEl, ariaDescribedById, isCellEntered]);

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
          setIsCellEntered(true);
          break;

        case keys.ESCAPE:
          event.preventDefault();
          setIsCellEntered((isCellEntered) => {
            if (isCellEntered === true) {
              setExited(true);
              requestAnimationFrame(() => cellEl.focus()); // move focus to cell
              return false;
            } else if (
              // when opened content is closed, we don't want Escape to return to the cell
              // immediately but instead return focus to a trigger as expected
              isCellEntered === false &&
              isDOMNode(event.target) &&
              isDOMNode(event.currentTarget) &&
              event.currentTarget !== event.target &&
              event.currentTarget.contains(event.target)
            ) {
              return true;
            }

            return isCellEntered;
          });
          break;
      }
    };

    // ensures the SR text is reset when navigating to a different cell
    const onBlur = () => setExited(false);

    cellEl.addEventListener('keyup', onKeyUp);
    cellEl.addEventListener('blur', onBlur);

    return () => {
      cellEl.removeEventListener('keyup', onKeyUp);
      cellEl.removeEventListener('blur', onBlur);
    };
  }, [cellEl]);

  return (
    <EuiFocusTrap
      disabled={!isCellEntered}
      clickOutsideDisables={true}
      onDeactivation={() => setIsCellEntered(false)}
    >
      {children}

      {/**
       * Hints use `hidden` to prevent them from being read by screen readers as regular content.
       * They are still read in JAWS and NVDA via the linking with aria-describedby.
       * VoiceOver does generally not read the column on re-focus after exiting a cell,
       * which mean the exited hint is not read.
       * VoiceOver does react to aria-live (without aria-hidden) but that would causes
       * duplicate output in JAWS/NVDA (reading content & live announcement).
       * Optimizing for Windows screen readers as they have a larger usages.
       */}
      <p id={ariaDescribedById} hidden>
        {isExited && (
          <EuiI18n
            // eslint-disable-next-line local/i18n
            token="euiDataGridCell.focusTrapExitPrompt"
            default="Exited cell content."
          />
        )}
        {!isCellEntered && (
          <EuiI18n
            // eslint-disable-next-line local/i18n
            token="euiDataGridCell.focusTrapEnterPrompt"
            default="Press the Enter key to interact with this cell's contents."
          />
        )}
      </p>
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
    // focus the first element only if we're on the cell and not inside of it
    if (i === 0 && !cell.contains(document.activeElement)) {
      (element as HTMLElement).focus();
    }
  });
  return interactives;
};
