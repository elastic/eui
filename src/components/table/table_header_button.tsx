import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiInnerText } from '../inner_text';

import { IconType, EuiIcon } from '../icon';

type Props = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    iconType?: IconType;
  };

export const EuiTableHeaderButton: FunctionComponent<Props> = ({
  children,
  className,
  iconType,
  ...rest
}) => {
  const classes = classNames('euiTableHeaderButton', className);

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiTableHeaderButton__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      <EuiInnerText>
        {(ref, innerText) => (
          <span title={innerText} ref={ref}>
            {children}
          </span>
        )}
      </EuiInnerText>

      {buttonIcon}
    </button>
  );
};
