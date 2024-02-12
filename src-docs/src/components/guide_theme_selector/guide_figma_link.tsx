/* eslint-disable no-restricted-globals */
import React from 'react';

import { EuiButtonEmpty } from '../../../../src/components/button';
import { useIsWithinBreakpoints } from '../../../../src/services';

import { ThemeContext } from '../with_theme';
import { EuiHeaderSectionItemButton } from '../../../../src/components/header';
import { EuiToolTip } from '../../../../src/components/tool_tip';
import { EuiIcon } from '../../../../src/components/icon';
import logoFigma from '../../images/logo-figma.svg';

type GuideFigmaLinkProps = {
  context?: any;
};

export const GuideFigmaLink: React.FunctionComponent<
  GuideFigmaLinkProps
> = () => {
  return (
    <ThemeContext.Consumer>
      {(context) => <GuideFigmaLinkComponent context={context} />}
    </ThemeContext.Consumer>
  );
};

// @ts-ignore Context has no type
const GuideFigmaLinkComponent: React.FunctionComponent<
  GuideFigmaLinkProps
> = () => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  const href = 'https://www.figma.com/community/file/964536385682658129';
  const label = 'EUI Figma Design Library';

  return isMobileSize ? (
    <EuiButtonEmpty size="s" flush="both" iconType={logoFigma} href={href}>
      {label}
    </EuiButtonEmpty>
  ) : (
    <EuiToolTip
      title={label}
      content="The Figma Elastic UI framework (EUI) is a design library in use at Elastic to build internal products that need to share our aesthetics."
    >
      <EuiHeaderSectionItemButton
        notificationColor="subdued"
        aria-label={label}
        href={href}
      >
        <EuiIcon type={logoFigma} aria-hidden="true" />
      </EuiHeaderSectionItemButton>
    </EuiToolTip>
  );
};
