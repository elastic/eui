/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  ReactElement,
  ReactNode,
  TdHTMLAttributes,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
  useIsWithinBreakpoints,
} from '../../services';
import { isObject } from '../../services/predicate';
import { EuiTextBlockTruncate } from '../text_truncate';

import { resolveWidthAsStyle } from './utils';

interface EuiTableRowCellSharedPropsShape {
  /**
   * Horizontal alignment of the text in the cell
   */
  align?: HorizontalAlignment;
  /**
   * _Should only be used for action cells_
   */
  showOnHover?: boolean;
  /**
   * Creates a text wrapper around cell content that helps word break or truncate
   * long text correctly.
   */
  textOnly?: boolean;
  /**
   * Indicates whether this column should truncate overflowing text content.
   * - Set to `true` to enable single-line truncation.
   * - To enable multi-line truncation, use a configuration object with `lines`
   * set to a number of lines to truncate to.
   */
  truncateText?: boolean | { lines: number };
  width?: CSSProperties['width'];
}

export interface EuiTableRowCellMobileOptionsShape
  extends EuiTableRowCellSharedPropsShape {
  /**
   * If false, will not render the cell at all for mobile
   */
  show?: boolean;
  /**
   * Only show for mobile? If true, will not render the column at all for desktop
   */
  only?: boolean;
  /**
   * Custom render/children if different from desktop
   */
  render?: ReactNode;
  /**
   * The column's header for use in mobile view (automatically passed down
   * when using `EuiBasicTable`).
   * Or pass `false` to not show a header at all.
   */
  header?: ReactNode | boolean;
  /**
   * Increase text size compared to rest of cells
   */
  enlarge?: boolean;
  /**
   * Applies the value to the width of the cell in mobile view (typically 50%)
   */
  width?: CSSProperties['width'];
}

export interface EuiTableRowCellProps extends EuiTableRowCellSharedPropsShape {
  /**
   * Vertical alignment of the content in the cell
   */
  valign?: TdHTMLAttributes<HTMLTableCellElement>['valign'];
  /**
   * Indicates whether the cell should be marked as the heading for its row
   */
  setScopeRow?: boolean;
  /**
   * Indicates if the column is dedicated to icon-only actions (currently
   * affects mobile only)
   */
  hasActions?: boolean;
  /**
   * Indicates if the column is dedicated as the expandable row toggle
   */
  isExpander?: boolean;
  /**
   * Mobile options for displaying differently at small screens;
   * See #EuiTableRowCellMobileOptionsShape
   */
  mobileOptions?: EuiTableRowCellMobileOptionsShape;
}

type Props = CommonProps &
  // Omitting valign and re-adding in EuiTableRowCellProps so it shows up in the props table
  Omit<TdHTMLAttributes<HTMLTableCellElement>, 'valign'> &
  EuiTableRowCellProps;

export const EuiTableRowCell: FunctionComponent<Props> = ({
  align = LEFT_ALIGNMENT,
  children,
  className,
  truncateText,
  setScopeRow,
  showOnHover,
  textOnly = true,
  hasActions,
  isExpander,
  style,
  width,
  valign = 'middle',
  mobileOptions = {
    show: true,
  },
  ...rest
}) => {
  const cellClasses = classNames('euiTableRowCell', {
    'euiTableRowCell--hasActions': hasActions,
    'euiTableRowCell--isExpander': isExpander,
    'euiTableRowCell--hideForDesktop': mobileOptions.only,
    'euiTableRowCell--enlargeForMobile': mobileOptions.enlarge,
    [`euiTableRowCell--${valign}`]: valign,
  });

  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
    'euiTableCellContent--showOnHover': showOnHover,
    'euiTableCellContent--truncateText': truncateText === true,
    // We're doing this rigamarole instead of creating `euiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'euiTableCellContent--overflowingContent': textOnly !== true,
  });

  const mobileContentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight':
      mobileOptions.align === RIGHT_ALIGNMENT || align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter':
      mobileOptions.align === CENTER_ALIGNMENT || align === CENTER_ALIGNMENT,
    'euiTableCellContent--showOnHover':
      mobileOptions.showOnHover ?? showOnHover,
    'euiTableCellContent--truncateText':
      mobileOptions.truncateText ?? truncateText,
    // We're doing this rigamarole instead of creating `euiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'euiTableCellContent--overflowingContent':
      mobileOptions.textOnly !== true || textOnly !== true,
  });

  const childClasses = classNames({
    euiTableCellContent__text: textOnly === true,
    euiTableCellContent__hoverItem: showOnHover,
  });

  const widthValue =
    useIsWithinBreakpoints(['xs', 's']) && mobileOptions.width
      ? mobileOptions.width
      : width;

  const styleObj = resolveWidthAsStyle(style, widthValue);

  const modifyChildren = useCallback(
    (children: ReactNode) => {
      let modifiedChildren = children;

      if (textOnly === true) {
        modifiedChildren = <span className={childClasses}>{children}</span>;
      } else if (React.isValidElement(children)) {
        modifiedChildren = React.Children.map(children, (child: ReactElement) =>
          React.cloneElement(child, {
            className: classNames(
              (child.props as CommonProps).className,
              childClasses
            ),
          })
        );
      }
      if (isObject(truncateText) && truncateText.lines) {
        modifiedChildren = (
          <EuiTextBlockTruncate lines={truncateText.lines} cloneElement>
            {modifiedChildren}
          </EuiTextBlockTruncate>
        );
      }

      return modifiedChildren;
    },
    [childClasses, textOnly, truncateText]
  );

  const childrenNode = modifyChildren(children);

  const hideForMobileClasses = 'euiTableRowCell--hideForMobile';
  const showForMobileClasses = 'euiTableRowCell--hideForDesktop';

  const Element = setScopeRow ? 'th' : 'td';
  const sharedProps = {
    scope: setScopeRow ? 'row' : undefined,
    style: styleObj,
    ...rest,
  };
  if (mobileOptions.show === false) {
    return (
      <Element
        className={`${cellClasses} ${hideForMobileClasses}`}
        {...sharedProps}
      >
        <div className={contentClasses}>{childrenNode}</div>
      </Element>
    );
  } else {
    return (
      <Element className={cellClasses} {...sharedProps}>
        {/* Mobile-only header */}
        {mobileOptions.header && (
          <div
            className={`euiTableRowCell__mobileHeader ${showForMobileClasses}`}
          >
            {mobileOptions.header}
          </div>
        )}

        {/* Content depending on mobile render existing */}
        {mobileOptions.render ? (
          <>
            <div className={`${mobileContentClasses} ${showForMobileClasses}`}>
              {modifyChildren(mobileOptions.render)}
            </div>
            <div className={`${contentClasses} ${hideForMobileClasses}`}>
              {childrenNode}
            </div>
          </>
        ) : (
          <div className={contentClasses}>{childrenNode}</div>
        )}
      </Element>
    );
  }
};
