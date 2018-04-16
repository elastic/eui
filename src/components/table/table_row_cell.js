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
  ...rest
}) => {
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
    modifiedChildren = React.Children.map(children, child => React.cloneElement(child, { className: childClasses }));
  }

  return (
    <td className="euiTableRowCell" colSpan={colSpan}>
      <div className={contentClasses} {...rest}>
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
  colSpan: PropTypes.number
};

EuiTableRowCell.defaultProps = {
  align: LEFT_ALIGNMENT,
  textOnly: true
};
