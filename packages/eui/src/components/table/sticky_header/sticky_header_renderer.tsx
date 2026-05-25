/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useEuiMemoizedStyles } from '../../../services';
import { EuiTableHeaderCell } from '../table_header_cell';
import { EuiTableHeaderCellCheckbox } from '../table_header_cell_checkbox';
import { useEuiTableStickyHeaderContext, EuiTableStickyHeaderContextProvider } from './context';
import { euiTableStickyHeaderStyles } from './sticky_header.styles';

interface EuiTableStickyHeaderRendererProps {
  /**
   * Reference to the original table element for width synchronization
   */
  tableRef?: React.RefObject<HTMLTableElement>;
  /**
   * Table layout style to match the original table
   */
  tableLayout?: 'fixed' | 'auto';
  /**
   * Whether the table has a background
   */
  hasBackground?: boolean;
  /**
   * Compressed styling
   */
  compressed?: boolean;
}

/**
 * Renders a sticky duplicate of the table header using registered header cells.
 * This component is internal and should only be used within EuiTable.
 *
 * @internal
 */
export const EuiTableStickyHeaderRenderer: FunctionComponent<
  EuiTableStickyHeaderRendererProps
> = ({ tableRef, tableLayout = 'fixed', hasBackground = true, compressed = false }) => {
  const styles = useEuiMemoizedStyles(euiTableStickyHeaderStyles);
  const context = useEuiTableStickyHeaderContext();
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const [headerPosition, setHeaderPosition] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const { registry, stickyHeaderOffset = 0 } = context || {};
  const headerCells = registry?.headerCells || [];
  const shouldRender = !!context && headerCells.length > 0;

  // Synchronize position and column widths from original header to sticky header
  useEffect(() => {
    if (!shouldRender || !tableRef?.current) return;

    const syncDimensions = () => {
      const originalHeader = tableRef.current?.querySelector('thead');
      if (!originalHeader) return;

      // Get header position and width
      const headerRect = originalHeader.getBoundingClientRect();
      setHeaderPosition({
        left: headerRect.left,
        width: headerRect.width,
      });

      // Get column widths
      const originalCells = originalHeader.querySelectorAll('th, td');
      const widths: number[] = [];
      originalCells.forEach((cell) => {
        widths.push((cell as HTMLElement).offsetWidth);
      });
      setColumnWidths(widths);
    };

    // Sync dimensions initially and on resize/scroll
    syncDimensions();
    
    const resizeObserver = new ResizeObserver(syncDimensions);
    if (tableRef.current) {
      resizeObserver.observe(tableRef.current);
    }

    // Also update on scroll to handle horizontal scrolling
    window.addEventListener('scroll', syncDimensions, true);
    window.addEventListener('resize', syncDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', syncDimensions, true);
      window.removeEventListener('resize', syncDimensions);
    };
  }, [shouldRender, tableRef, headerCells.length]);

  // Use Intersection Observer to detect when original header scrolls out of view
  useEffect(() => {
    if (!shouldRender || !tableRef?.current) return;

    const originalHeader = tableRef.current.querySelector('thead');
    if (!originalHeader) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        const intersectionRatio = entry.intersectionRatio;
        
        // Original header is scrolled out of view
        const headerIsHidden = !isIntersecting || intersectionRatio < 0.5;
        
        setIsStuck(headerIsHidden);
        
        // Toggle visibility on original header
        if (headerIsHidden) {
          originalHeader.setAttribute('data-original-hidden', 'true');
        } else {
          originalHeader.removeAttribute('data-original-hidden');
        }
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: `-${stickyHeaderOffset}px 0px 0px 0px`,
      }
    );

    observer.observe(originalHeader);

    return () => {
      observer.disconnect();
      originalHeader.removeAttribute('data-original-hidden');
    };
  }, [shouldRender, tableRef, stickyHeaderOffset]);

  // If no context or no registered cells, don't render anything
  if (!shouldRender) {
    return null;
  }

  // Render the sticky header cells
  const renderHeaderCells = () => {
    return headerCells.map((registration, index) => {
      const { id, props, children } = registration;
      const cellWidth = columnWidths[index];
      const cellStyle = cellWidth ? { ...props.style, width: `${cellWidth}px` } : props.style;

      // Determine if this is a checkbox cell or regular header cell
      const isCheckboxCell = props.className?.includes('euiTableHeaderCellCheckbox');

      if (isCheckboxCell) {
        return (
          <EuiTableHeaderCellCheckbox
            key={id}
            {...(props as any)}
            style={cellStyle}
          >
            {children}
          </EuiTableHeaderCellCheckbox>
        );
      }

      return (
        <EuiTableHeaderCell
          key={id}
          {...props}
          style={cellStyle}
        >
          {children}
        </EuiTableHeaderCell>
      );
    });
  };

  return (
    <div
      ref={stickyHeaderRef}
      css={[styles.euiTableStickyHeader, styles.euiTableStickyHeaderWrapper]}
      data-is-stuck={isStuck}
      style={{
        top: `${stickyHeaderOffset}px`,
        left: `${headerPosition.left}px`,
        width: `${headerPosition.width}px`,
      }}
    >
      <EuiTableStickyHeaderContextProvider _isInStickyRenderer={true}>
        <table
          css={styles.euiTableStickyHeaderTable}
          style={{ tableLayout }}
          aria-hidden="true"
        >
          <thead>
            <tr>{renderHeaderCells()}</tr>
          </thead>
        </table>
      </EuiTableStickyHeaderContextProvider>
    </div>
  );
};
