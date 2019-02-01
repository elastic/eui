import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiListGroup, EuiListGroupItem } from '../list_group';

export const EuiNavDrawerMenu = ({ children, className, footerLink, ...rest }) => {
  const classes = classNames(
    'euiNavDrawerMenu',
    {
      'euiNavDrawerMenu-hasFooter': footerLink,
    },
    className
  );

  let footerLinkNode;

  if (footerLink) {
    const {
      iconType,
      label,
      onClick,
      ...rest
    } = footerLink;

    footerLinkNode = (
      <EuiListGroup className="euiListGroup-isFooter" flush>
        <EuiListGroupItem
          iconType={iconType}
          onClick={onClick}
          label={label}
          {...rest}
        />
      </EuiListGroup>
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
      {footerLinkNode}
    </div>
  );
};

EuiNavDrawerMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  footerLink: PropTypes.shape(EuiListGroupItem.propTypes),
};