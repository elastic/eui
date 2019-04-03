import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  Link,
} from 'react-router';

import {
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '../../../../src/components';

export const GuidePage = ({ children, title, intro, componentLinkTo }) => {
  return (
    <Fragment>
      <div className="guideSection__text">
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiTitle size="l">
              <h1>{title}</h1>
            </EuiTitle>
          </EuiFlexItem>
          { componentLinkTo &&
            <EuiFlexItem grow={false}>
              <Link to={componentLinkTo}>
                <EuiButton>
                  View component code
                </EuiButton>
              </Link>
            </EuiFlexItem>
          }
        </EuiFlexGroup>
        <EuiSpacer />
        {intro}
      </div>

      {children}

      {/* Give some space between the bottom of long content and the bottom of the screen */}
      <EuiSpacer size="xl" />
    </Fragment>
  );
};

GuidePage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  intro: PropTypes.node,
  componentLinkTo: PropTypes.string,
};
