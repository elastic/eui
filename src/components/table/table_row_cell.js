import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT
} from '../../services';

const ALIGNMENT = [
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT
];

export const EuiTableRowCell = ({
  align,
  children,
  className,
  truncateText,
  showOnHover,
  textOnly,
  colSpan,
  mobileOptions,
  // Soon to be deprecated for {...mobileOptions}
  header,
  hideForMobile,
  isMobileHeader,
  isMobileFullWidth,
  hasActions,
  isExpander,
  ...rest
}) => {
  const cellClasses = classNames('euiTableRowCell', {
    'euiTableRowCell--hideForDesktop': isMobileHeader, // For BWC only
    'euiTableRowCell--enlargeForMobile': mobileOptions.enlarge || isMobileHeader,
    'euiTableRowCell--hasActions': mobileOptions.isActions || hasActions,
    'euiTableRowCell--isMobileFullWidth': mobileOptions.fullWidth || isMobileFullWidth || isMobileHeader,
    'euiTableRowCell--isExpander': mobileOptions.isExpander || isExpander,
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
    'euiTableCellContent--alignRight': mobileOptions.align === RIGHT_ALIGNMENT || align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': mobileOptions.align === CENTER_ALIGNMENT || align === RIGHT_ALIGNMENT,
    'euiTableCellContent--showOnHover': mobileOptions.showOnHover || showOnHover,
    'euiTableCellContent--truncateText': mobileOptions.truncateText || truncateText,
    // We're doing this rigamarole instead of creating `euiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'euiTableCellContent--overflowingContent': mobileOptions.textOnly !== true || textOnly !== true,
  });

  const childClasses = classNames({
    'euiTableCellContent__text': textOnly === true,
    'euiTableCellContent__hoverItem': showOnHover,
  });

  function modifyChildren(children) {
    let modifiedChildren = children;

    if (textOnly === true) {
      modifiedChildren = <span className={childClasses}>{children}</span>;
    } else if (React.isValidElement(children)) {
      modifiedChildren = React.Children.map(
        children,
        child => React.cloneElement(
          child,
          { className: classNames(child.props.className, childClasses) }
        )
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
      <td className={`${cellClasses} ${hideForMobileClasses}`} colSpan={colSpan} {...rest}>
        <div className={contentClasses}>
          {childrenNode}
        </div>
      </td>
    );
  } else {
    cellRender = (
      <td className={cellClasses} colSpan={colSpan} {...rest}>
        {/* Mobile-only header */}
        {(mobileOptions.header || header) &&
          <div className={`euiTableRowCell__mobileHeader ${showForMobileClasses}`}>{mobileOptions.header || header}</div>
        }

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
          <div className={contentClasses}>
            {childrenNode}
          </div>
        )}
      </td>
    );
  }

  return cellRender;
};

EuiTableRowCell.propTypes = {
  align: PropTypes.oneOf(ALIGNMENT),
  showOnHover: PropTypes.bool,
  truncateText: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Setting textOnly to false will break words unnecessarily on FF and IE.
   * To combat this problem on FF, wrap contents with the css utility `.eui-textBreakWord`.
   */
  textOnly: PropTypes.bool,
  colSpan: PropTypes.number,
  /**
   * The column's header title for use in mobile view (will be added as a data-attr)
   */
  header: PropTypes.string,
  /**
   * Indicates if the column was created to be the row's heading in mobile view
   * (this column will be hidden at larger screens)
   */
  isMobileHeader: PropTypes.bool,
  /**
   * Indicates if the column should not show for mobile users
   * (typically hidden because a custom mobile header utilizes the column's contents)
   */
  hideForMobile: PropTypes.bool,
  /**
   * Allocates 100% of the width of the container in mobile view
   * (typically cells are contained to 50%)
   */
  isMobileFullWidth: PropTypes.bool,
  /**
   * Indicates if the column is dedicated to icon-only actions (affects mobile only)
   */
  hasActions: PropTypes.bool,
  /**
   * Indicates if the column is dedicated as the expandable row toggle
   */
  isExpander: PropTypes.bool,
  /**
   * Mobile options for displaying differently at small screens
   */
  mobileOptions: PropTypes.shape({
    /**
     * If false, will not render the cell at all for mobile
     */
    show: PropTypes.bool,
    /**
     * Custom render/children if different from non-mobile
     */
    render: PropTypes.node,
    /**
     * The column's header title for use in mobile view (will be added as a data-attr).
     * Or pass `false` to not show a header at all.
     */
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    /**
     * Indicates if the column was created to be the row's heading in mobile view
     * (this column will be hidden at larger screens)
     */
    enlarge: PropTypes.bool,
    /**
     * Allocates 100% of the width of the container in mobile view
     * (typically cells are contained to 50%)
     */
    fullWidth: PropTypes.bool,
    /**
     * Indicates if the column is dedicated to icon-only actions (affects mobile only)
     */
    isActions: PropTypes.bool,
    /**
     * Indicates if the column is dedicated as the expandable row toggle
     */
    isExpander: PropTypes.bool,
  }),
};

EuiTableRowCell.defaultProps = {
  align: LEFT_ALIGNMENT,
  textOnly: true,
  mobileOptions: {
    show: true,
  }
};
