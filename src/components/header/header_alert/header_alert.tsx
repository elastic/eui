import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../../common';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';

import { EuiI18n } from '../../i18n';

export type EuiHeaderAlertProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    action?: ReactNode;
    date: ReactNode;
    text?: ReactNode;
    title: ReactNode;
    badge?: ReactNode;
  };

export const EuiHeaderAlert: FunctionComponent<EuiHeaderAlertProps> = ({
  action,
  className,
  date,
  text,
  title,
  badge,
  ...rest
}) => {
  const classes = classNames('euiHeaderAlert', className);

  let badgeContent;
  if (badge) {
    badgeContent = badge;
  }

  return (
    <EuiI18n token="euiHeaderAlert.dismiss" default="Dismiss">
      {(dismiss: string) => (
        <div className={classes} {...rest}>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem>
              <div className="euiHeaderAlert__date">{date}</div>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>{badgeContent}</EuiFlexItem>
          </EuiFlexGroup>

          <div className="euiHeaderAlert__title">{title}</div>
          <div className="euiHeaderAlert__text">{text}</div>
          <div className="euiHeaderAlert__action euiLink">{action}</div>
        </div>
      )}
    </EuiI18n>
  );
};
