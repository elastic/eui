import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiIcon } from '..';

const typeToClassNameMap = {
  inPanel: 'kuiSideNav--inPanel',
};

export const TYPES = Object.keys(typeToClassNameMap);

export const EuiSideNav = ({
  children,
  type,
  toggleOpenOnMobile,
  isOpenOnMobile,
  mobileTitle,
  className,
  ...rest,
}) => {
  const classes = classNames(
    'kuiSideNav',
    className,
    typeToClassNameMap[type],
    {
      'kuiSideNav-isOpenMobile': isOpenOnMobile,
    },
  );

  return (
    <nav
      className={classes}
      {...rest}
    >
      {/* Hidden from view, except in mobile */}
      <button
        className="kuiSideNav__mobileToggle kuiLink"
        onClick={toggleOpenOnMobile}
      >
        <span className="kuiSideNav__mobileWrap">
          <span className="kuiSideNav__mobileTitle">
            {mobileTitle}
          </span>

          <EuiIcon
            className="kuiSideNav__mobileIcon"
            type="apps"
            size="medium"
            aria-hidden="true"
          />
        </span>
      </button>

      {/* Hidden from view in mobile, but toggled from the button above */}
      <div className="kuiSideNav__content">
        {children}
      </div>
    </nav>
  );
};

EuiSideNav.propTypes = {
  toggleOpenOnMobile: PropTypes.func,
  isOpenOnMobile: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  mobileTitle: PropTypes.string,
};
