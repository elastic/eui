import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiBetaBadge,
} from '../../../../src/components';

import { getRouterLinkProps } from '../../services';

export const GuidePage = ({
  children,
  title,
  intro,
  componentLinkTo,
  isBeta,
}) => {
  const betaBadge = isBeta ? (
    <EuiBetaBadge
      label="Beta"
      tooltipContent="This component is still under development and may contain breaking changes in the nearby future."
    />
  ) : (
    undefined
  );

  return (
    <Fragment>
      <div className="guideSection__text">
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiTitle size="l">
              <h1>
                {title} {betaBadge}
              </h1>
            </EuiTitle>
          </EuiFlexItem>
          {componentLinkTo && (
            <EuiFlexItem grow={false}>
              <EuiButton href={getRouterLinkProps(componentLinkTo).href}>
                View component code
              </EuiButton>
            </EuiFlexItem>
          )}
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
  isBeta: PropTypes.bool,
};
