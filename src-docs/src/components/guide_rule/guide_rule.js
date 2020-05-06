import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
// import { useTheme } from 'emotion-theming';
import usePropagate from '../../../../src/services/propagate/use_propagate';
import { EuiFlexGroup } from '../../../../src/components';

import { GuideRuleDescription } from './guide_rule_description';
import { componentClassName as guideRuleTitleClass } from './guide_rule_title';

export const GuideRule = ({ children, heading, description, ...rest }) => {
  const [sizes] = usePropagate(['sizes']);
  // const theme = useTheme();
  // console.log(theme[0].euiSizeL);

  let siblingMarginTop = sizes.euiSizeL;
  if (description) {
    siblingMarginTop = sizes.euiSizeXXL * 1.5;
  }
  if (heading) {
    siblingMarginTop = sizes.euiSizeXXL * 2;
  }
  const guideRule = css`
    margin-top: ${sizes.euiSizeXXL}px;

    & + & {
      margin-top: ${siblingMarginTop}px;
    }

    // Not sure this pattern is great
    .${guideRuleTitleClass} + & {
      ${!heading && 'margin-top: 0'};
    }
  `;

  let descriptionNode;

  if (description) {
    descriptionNode = (
      <GuideRuleDescription heading={heading} description={description} />
    );
  }

  return (
    <div css={guideRule} {...rest}>
      {descriptionNode}

      <EuiFlexGroup gutterSize="xl" wrap>
        {children}
      </EuiFlexGroup>
    </div>
  );
};

GuideRule.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};
