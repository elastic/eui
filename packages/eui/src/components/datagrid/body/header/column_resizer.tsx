/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useEuiMemoizedStyles, useLatest } from '../../../../services';
import { logicalStyle } from '../../../../global_styling';
import { EuiDataGridColumnResizerProps } from '../../data_grid_types';
import { DragOverlay } from './draggable_columns';
import { euiDataGridColumnResizerStyles } from './column_resizer.styles';

const MINIMUM_COLUMN_WIDTH = 40;

export const EuiDataGridColumnResizer: FunctionComponent<
  EuiDataGridColumnResizerProps
> = ({ columnId, columnWidth, setColumnWidth, isLastColumn }) => {
  const styles = useEuiMemoizedStyles(euiDataGridColumnResizerStyles);

  const [offset, setOffset] = useState(0);
  const initialX = useRef(0);

  // Handlers are bound to `window`, so they must stay stable to be removed
  // and read current values from a ref
  const latest = useLatest({ columnId, columnWidth, setColumnWidth, offset });

  const onMouseMove = useCallback(
    (e: { pageX: number }) => {
      const { columnWidth } = latest.current!;

      setOffset(
        Math.max(
          e.pageX - initialX.current,
          -(columnWidth - MINIMUM_COLUMN_WIDTH)
        )
      );
    },
    [latest]
  );

  const onMouseUp = useCallback(() => {
    const { columnId, columnWidth, setColumnWidth, offset } = latest.current!;

    setColumnWidth(
      columnId,
      Math.max(MINIMUM_COLUMN_WIDTH, columnWidth + offset)
    );
    setOffset(0);

    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('blur', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
  }, [latest, onMouseMove]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      initialX.current = e.pageX;

      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('blur', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);

      // don't let this action steal focus
      e.preventDefault();
    },
    [onMouseUp, onMouseMove]
  );

  // Clean up listeners if unmounted mid-drag
  useEffect(() => {
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('blur', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseUp, onMouseMove]);

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
      style={offset ? logicalStyle('margin-right', `${-offset}px`) : undefined}
      onMouseDown={onMouseDown}
    >
      {/* UX polish: prevent other hover states from activating when
          dragging over other elements + maintain the resize cursor */}
      <DragOverlay isDragging={!!offset} cursor="ew-resize" />
    </div>
  );
};
