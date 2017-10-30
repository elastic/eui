import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiIcon } from '..';

const typeToClassNameMap = {
  inPanel: 'euiSideNav--inPanel',
};

export const TYPES = Object.keys(typeToClassNameMap);

export const EuiSideNav = ({
  children,
  type,
  toggleOpenOnMobile,
  isOpenOnMobile,
  mobileTitle,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiSideNav',
    className,
    typeToClassNameMap[type],
    {
      'euiSideNav-isOpenMobile': isOpenOnMobile,
    },
  );

  return (
    <nav
      className={classes}
      {...rest}
    >
      {/* Hidden from view, except in mobile */}
      <button
        type="button"
        className="euiSideNav__mobileToggle euiLink"
        onClick={toggleOpenOnMobile}
      >
        <span className="euiSideNav__mobileWrap">
          <span className="euiSideNav__mobileTitle">
            {mobileTitle}
          </span>

          <EuiIcon
            className="euiSideNav__mobileIcon"
            type="apps"
            size="m"
            aria-hidden="true"
          />
        </span>
      </button>

      {/* Hidden from view in mobile, but toggled from the button above */}
      <div className="euiSideNav__content">
        {children}
      </div>
    </nav>
  );
};

EuiSideNav.propTypes = {
  toggleOpenOnMobile: PropTypes.func,
  isOpenOnMobile: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  mobileTitle: PropTypes.node,
};
