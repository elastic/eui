import React, { FunctionComponent, TdHTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

import { resolveWidthAsStyle } from './utils';

type Props = CommonProps &
  TdHTMLAttributes<HTMLTableCellElement> & {
    align?: HorizontalAlignment;
    width?: string | number;
  };

export const EuiTableFooterCell: FunctionComponent<Props> = ({
  children,
  align = LEFT_ALIGNMENT,
  className,
  width,
  style,
  ...rest
}) => {
  const classes = classNames('euiTableFooterCell', className);
  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });
  const styleObj = resolveWidthAsStyle(style, width);

  return (
    <td className={classes} style={styleObj} {...rest}>
      <div className={contentClasses}>
        <span className="euiTableCellContent__text">{children}</span>
      </div>
    </td>
  );
};
