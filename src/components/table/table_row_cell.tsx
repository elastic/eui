import React, {
  Fragment,
  FunctionComponent,
  ReactElement,
  ReactNode,
  TdHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

import { resolveWidthAsStyle } from './utils';

interface EuiTableRowCellSharedPropsShape {
  /**
   * Horizontal alignment of the text in the cell
   */
  align?: HorizontalAlignment;
  /**
   * Don't allow line breaks within cells
   */
  showOnHover?: boolean;
  /**
   * Setting `textOnly` to `false` will break words unnecessarily on FF and
   * IE.  To combat this problem on FF, wrap contents with the css utility
   * `.eui-textBreakWord`.
   */
  textOnly?: boolean;
  /**
   * _Should only be used for action cells_
   */
  truncateText?: boolean;
  width?: string | number;
}

interface EuiTableRowCellMobileOptionsShape {
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
   * Allocates 100% of the width of the container in mobile view
   * (typically cells are contained to 50%)
   */
  fullWidth?: boolean;
}

interface EuiTableRowCellProps {
  /**
   * Indicates if the column is dedicated to icon-only actions (currently
   * affects mobile only)
   */
  hasActions?: boolean;
  /**
   * _DEPRECATED: use `mobileOptions.header`_
   * The column's header title for use in mobile view (will be added as a
   * data-attr)
   */
  header?: string;
  /**
   * _DEPRECATED: use `mobileOptions.show = false`_
   * Indicates if the column should not show for mobile users (typically
   * hidden because a custom mobile header utilizes the column's contents)
   */
  hideForMobile?: boolean;
  /**
   * Indicates if the column is dedicated as the expandable row toggle
   */
  isExpander?: boolean;
  /**
   * _DEPRECATED: use `mobileOptions.fullWidth`_
   * Allocates 100% of the width of the container in mobile view
   * (typically cells are contained to 50%)
   */
  isMobileFullWidth?: boolean;
  /**
   * _DEPRECATED: use `mobileOptions.only = true & mobileOptions.header = * false`_
   * Indicates if the column was created to be the row's heading in mobile
   * view.  It won't display column's header inline and it the column will
   * be hidden at larger screens)
   */
  isMobileHeader?: boolean;
  /**
   * Mobile options for displaying differently at small screens
   */
  mobileOptions?: EuiTableRowCellMobileOptionsShape &
    EuiTableRowCellSharedPropsShape;
}

type Props = CommonProps &
  TdHTMLAttributes<HTMLTableCellElement> &
  EuiTableRowCellSharedPropsShape &
  EuiTableRowCellProps;

export const EuiTableRowCell: FunctionComponent<Props> = ({
  align = LEFT_ALIGNMENT,
  children,
  className,
  truncateText,
  showOnHover,
  textOnly = true,
  hasActions,
  isExpander,
  mobileOptions = {
    show: true,
  },
  // Soon to be deprecated for {...mobileOptions}
  header,
  hideForMobile,
  isMobileHeader,
  isMobileFullWidth,
  style,
  width,
  ...rest
}) => {
  const cellClasses = classNames('euiTableRowCell', {
    'euiTableRowCell--hasActions': hasActions,
    'euiTableRowCell--isExpander': isExpander,
    'euiTableRowCell--hideForDesktop': mobileOptions.only || isMobileHeader,
    'euiTableRowCell--enlargeForMobile':
      mobileOptions.enlarge || isMobileHeader,
    'euiTableRowCell--isMobileFullWidth':
      mobileOptions.fullWidth || isMobileFullWidth || isMobileHeader,
  });

  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
    'euiTableCellContent--showOnHover': showOnHover,
    'euiTableCellContent--truncateText': truncateText,
    // We're doing this rigamarole instead of creating `euiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'euiTableCellContent--overflowingContent': textOnly !== true,
  });

  const mobileContentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight':
      mobileOptions.align === RIGHT_ALIGNMENT || align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter':
      mobileOptions.align === CENTER_ALIGNMENT || align === RIGHT_ALIGNMENT,
    'euiTableCellContent--showOnHover':
      mobileOptions.showOnHover || showOnHover,
    'euiTableCellContent--truncateText':
      mobileOptions.truncateText || truncateText,
    // We're doing this rigamarole instead of creating `euiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'euiTableCellContent--overflowingContent':
      mobileOptions.textOnly !== true || textOnly !== true,
  });

  const childClasses = classNames({
    euiTableCellContent__text: textOnly === true,
    euiTableCellContent__hoverItem: showOnHover,
  });

  const styleObj = resolveWidthAsStyle(style, width);

  function modifyChildren(children: ReactNode) {
    let modifiedChildren = children;

    if (textOnly === true) {
      modifiedChildren = <span className={childClasses}>{children}</span>;
    } else if (React.isValidElement(children)) {
      modifiedChildren = React.Children.map(
        children,
        (child: ReactElement<CommonProps>) =>
          React.cloneElement(child, {
            className: classNames(child.props.className, childClasses),
          })
      );
    }

    return modifiedChildren;
  }

  const childrenNode = modifyChildren(children);

  const hideForMobileClasses = 'euiTableRowCell--hideForMobile';
  const showForMobileClasses = 'euiTableRowCell--hideForDesktop';

  let cellRender;

  if (mobileOptions.show === false || hideForMobile) {
    cellRender = (
      <td
        className={`${cellClasses} ${hideForMobileClasses}`}
        style={styleObj}
        {...rest}>
        <div className={contentClasses}>{childrenNode}</div>
      </td>
    );
  } else {
    cellRender = (
      <td className={cellClasses} style={styleObj} {...rest}>
        {/* Mobile-only header */}
        {(mobileOptions.header || header) && !isMobileHeader && (
          <div
            className={`euiTableRowCell__mobileHeader ${showForMobileClasses}`}>
            {mobileOptions.header || header}
          </div>
        )}

        {/* Content depending on mobile render existing */}
        {mobileOptions.render ? (
          <Fragment>
            <div className={`${mobileContentClasses} ${showForMobileClasses}`}>
              {modifyChildren(mobileOptions.render)}
            </div>
            <div className={`${contentClasses} ${hideForMobileClasses}`}>
              {childrenNode}
            </div>
          </Fragment>
        ) : (
          <div className={contentClasses}>{childrenNode}</div>
        )}
      </td>
    );
  }

  return cellRender;
};
