import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
// import { useTheme } from 'emotion-theming';
import usePropagate from '../../../../src/services/propagate/use_propagate';
import { EuiText } from '../../../../src/components';

export const GuideRuleDescription = ({
  children,
  heading,
  description,
  ...rest
}) => {
  // const theme = useTheme();
  const [sizes] = usePropagate(['sizes']);

  const guideRule_Description = css`
    margin-bottom: ${sizes.euiSizeXL}px;
  `;

  let headingNode;

  if (heading) {
    headingNode = <h3>{heading}</h3>;
  }

  return (
    <div css={guideRule_Description} {...rest}>
      <EuiText grow={false}>
        {headingNode}
        <p>{description}</p>
      </EuiText>

      {children}
    </div>
  );
};

GuideRuleDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string.isRequired,
};
