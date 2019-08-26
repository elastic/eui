import React, { FunctionComponent, TdHTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

type Props = CommonProps &
  TdHTMLAttributes<HTMLTableCellElement> & {
    align?: HorizontalAlignment;
  };

export const EuiTableFooterCell: FunctionComponent<Props> = ({
  children,
  align = LEFT_ALIGNMENT,
  colSpan,
  className,
  ...rest
}) => {
  const classes = classNames('euiTableFooterCell', className);
  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });

  return (
    <td className={classes} colSpan={colSpan} {...rest}>
      <div className={contentClasses}>
        <span className="euiTableCellContent__text">{children}</span>
      </div>
    </td>
  );
};
