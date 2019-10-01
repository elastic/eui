import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiButtonIcon } from '../../button';
import { CommonProps } from '../../common';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';

import { EuiI18n } from '../../i18n';

type EuiHeaderAlertProps = CommonProps & {
  action?: ReactNode;
  date: ReactNode;
  text?: ReactNode;
  title: ReactNode;
};

export const EuiHeaderAlert: FunctionComponent<EuiHeaderAlertProps> = ({
  action,
  className,
  date,
  text,
  title,
  ...rest
}) => {
  const classes = classNames('euiHeaderAlert', className);

  return (
    <EuiI18n token="euiHeaderAlert.dismiss" default="Dismiss">
      {(dismiss: string) => (
        <div className={classes} {...rest}>
          <EuiButtonIcon
            aria-label={dismiss}
            iconType="cross"
            size="s"
            className="euiHeaderAlert__dismiss"
          />

          <div className="euiHeaderAlert__title">{title}</div>

          <div className="euiHeaderAlert__text">{text}</div>

          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <div className="euiHeaderAlert__action euiLink">{action}</div>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <div className="euiHeaderAlert__date">{date}</div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      )}
    </EuiI18n>
  );
};
