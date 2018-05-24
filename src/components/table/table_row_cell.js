import React from 'react';
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
  header,
  hideForMobile,
  isMobileHeader,
  isMobileFullWidth,
  hasActions,
  isExpander,
  ...rest
}) => {
  const cellClasses = classNames('euiTableRowCell', {
    'euiTableRowCell--hideForMobile': hideForMobile,
    'euiTableRowCell--isMobileHeader': isMobileHeader,
    'euiTableRowCell--hasActions': hasActions,
    'euiTableRowCell--isMobileFullWidth': isMobileFullWidth,
    'euiTableRowCell--isExpander': isExpander,
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

  const childClasses = classNames({
    'euiTableCellContent__text': textOnly === true,
    'euiTableCellContent__hoverItem': showOnHover,
  });

  let modifiedChildren = children;

  if(textOnly === true) {
    modifiedChildren = <span className={childClasses}>{children}</span>;
  } else if(React.isValidElement(modifiedChildren)) {
    modifiedChildren = React.Children.map(
      children,
      child => React.cloneElement(
        child,
        { className: classNames(child.props.className, childClasses) }
      )
    );
  }

  return (
    <td className={cellClasses} colSpan={colSpan} data-header={header} {...rest}>
      <div className={contentClasses}>
        {modifiedChildren}
      </div>
    </td>
  );
};

EuiTableRowCell.propTypes = {
  align: PropTypes.oneOf(ALIGNMENT),
  showOnHover: PropTypes.bool,
  truncateText: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
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
};

EuiTableRowCell.defaultProps = {
  align: LEFT_ALIGNMENT,
  textOnly: true
};
