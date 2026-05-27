/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useCallback, useRef, useState } from 'react';
import { RenderWithEuiStylesMemoizer } from '../../../../services';
import { logicalStyle } from '../../../../global_styling';
import { EuiDataGridColumnResizerProps } from '../../data_grid_types';
import { DragOverlay } from './draggable_columns';
import { euiDataGridColumnResizerStyles } from './column_resizer.styles';

const MINIMUM_COLUMN_WIDTH = 40;

export const EuiDataGridColumnResizer = ({
  columnId,
  columnWidth,
  setColumnWidth,
  isLastColumn,
}: EuiDataGridColumnResizerProps) => {
  const [offset, setOffset] = useState(0);

  // Refs keep the latest values accessible from stable event handler callbacks
  // without re-registering window listeners on every render.
  const initialXRef = useRef(0);
  const offsetRef = useRef(0);
  const columnWidthRef = useRef(columnWidth);
  const columnIdRef = useRef(columnId);
  const setColumnWidthRef = useRef(setColumnWidth);

  // Keep prop refs in sync on every render (synchronous, safe outside effects)
  columnWidthRef.current = columnWidth;
  columnIdRef.current = columnId;
  setColumnWidthRef.current = setColumnWidth;

  const onMouseMove = useCallback((e: { pageX: number }) => {
    const newOffset = Math.max(
      e.pageX - initialXRef.current,
      -(columnWidthRef.current - MINIMUM_COLUMN_WIDTH)
    );
    offsetRef.current = newOffset;
    setOffset(newOffset);
  }, []);

  const onMouseUp = useCallback(() => {
    setColumnWidthRef.current(
      columnIdRef.current,
      Math.max(
        MINIMUM_COLUMN_WIDTH,
        columnWidthRef.current + offsetRef.current
      )
    );

    offsetRef.current = 0;
    setOffset(0);

    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('blur', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      initialXRef.current = e.pageX;

      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('blur', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);

      // don't let this action steal focus
      e.preventDefault();
    },
    [onMouseUp, onMouseMove]
  );

  return (
    <RenderWithEuiStylesMemoizer>
      {(stylesMemoizer) => {
        const styles = stylesMemoizer(euiDataGridColumnResizerStyles);
        const cssStyles = [
          styles.euiDataGridColumnResizer,
          isLastColumn && styles.isLastColumn,
          offset && styles.isDragging,
        ];
        return (
          <div
            css={cssStyles}
            className="euiDataGridColumnResizer"
            data-test-subj="dataGridColumnResizer"
            style={
              offset
                ? logicalStyle('margin-right', `${-offset}px`)
                : undefined
            }
            onMouseDown={onMouseDown}
          >
            {/* UX polish: prevent other hover states from activating when
                dragging over other elements + maintain the resize cursor */}
            <DragOverlay isDragging={!!offset} cursor="ew-resize" />
          </div>
        );
      }}
    </RenderWithEuiStylesMemoizer>
  );
};
