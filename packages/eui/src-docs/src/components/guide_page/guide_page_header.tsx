import React, { useMemo } from 'react';
import { css } from '@emotion/react';

import {
  EuiBadge,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiToolTip,
  EuiPanel,
  EuiText,
  EuiLink,
} from '../../../../src/components';
import { useIsWithinBreakpoints } from '../../../../src/services';

// @ts-ignore Not TS
import { CodeSandboxLink } from '../../components/codesandbox/link';
import logoEUI from '../../images/logo-eui.svg';
import { GuideThemeSelector, GuideFigmaLink } from '../guide_theme_selector';

import { VersionSwitcher } from './version_switcher';

const GITHUB_URL = 'https://github.com/elastic/eui';

export const GuidePageHeader = () => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  const logo = useMemo(() => {
    return (
      <EuiHeaderLogo iconType={logoEUI} href="#/" aria-label="EUI home">
        Elastic UI
      </EuiHeaderLogo>
    );
  }, []);

  const environmentBadge = useMemo(() => {
    const isLocal = window.location.host.includes('803');
    const isPRStaging = window.location.pathname.startsWith('/pr_');

    if (isLocal) {
      return <EuiBadge color="accent">Local</EuiBadge>;
    }
    if (isPRStaging) {
      const prId = window.location.pathname.split('/')[1].split('pr_')[1];
      return (
        <EuiBadge
          color="hollow"
          iconType="popout"
          iconSide="right"
          href={`${GITHUB_URL}/pull/${prId}`}
          target="_blank"
        >
          Staging
        </EuiBadge>
      );
    }
    return <VersionSwitcher />;
  }, []);

  const github = useMemo(() => {
    const label = 'EUI GitHub repo';
    return isMobileSize ? (
      <EuiHeaderLink color="primary" iconType="logoGithub" href={GITHUB_URL}>
        {label}
      </EuiHeaderLink>
    ) : (
      <EuiToolTip content="Github">
        <EuiHeaderSectionItemButton aria-label={label} href={GITHUB_URL}>
          <EuiIcon type="logoGithub" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      </EuiToolTip>
    );
  }, [isMobileSize]);

  const codesandbox = useMemo(() => {
    const label = 'Codesandbox';
    return isMobileSize ? (
      <CodeSandboxLink type="tsx">
        <EuiHeaderLink color="primary" iconType="logoCodesandbox">
          {label}
        </EuiHeaderLink>
      </CodeSandboxLink>
    ) : (
      <EuiToolTip content="Codesandbox" key="codesandbox">
        <CodeSandboxLink type="tsx">
          <EuiHeaderSectionItemButton aria-label="Codesandbox">
            <EuiIcon type="logoCodesandbox" aria-hidden="true" />
          </EuiHeaderSectionItemButton>
        </CodeSandboxLink>
      </EuiToolTip>
    );
  }, [isMobileSize]);

  const mobileMenu = useMemo(() => {
    return (
      <EuiHeaderLinks
        popoverButtonProps={{ 'aria-label': 'Open EUI options menu' }}
        popoverBreakpoints="all"
      >
        {github}
        <GuideFigmaLink />
        {codesandbox}
      </EuiHeaderLinks>
    );
  }, [codesandbox, github]);

  const rightSideItems = isMobileSize
    ? [<GuideThemeSelector />, mobileMenu]
    : [
        <GuideThemeSelector />,
        github,
        <GuideFigmaLink key="figma" />,
        codesandbox,
      ];

  const goodbyeBanner = (
    <EuiHeader
      position="fixed"
      css={css`
        padding-inline: 0px;
        white-space: nowrap;
        overflow-inline: auto;
      `}
    >
      <EuiPanel
        borderRadius="none"
        color="warning"
        paddingSize="s"
        css={css`
          display: inline-flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <EuiText component="p" size="m">
          We have a new website!{' '}
          <EuiLink href="https://eui.elastic.co/next" external>
            Please help us test it and tell us what you think
          </EuiLink>
        </EuiText>
      </EuiPanel>
    </EuiHeader>
  );

  return (
    <header aria-label="EUI Docs app bar">
      {goodbyeBanner}
      <EuiHeader
        position="fixed"
        theme="dark"
        sections={[
          { items: [logo, environmentBadge] },
          { items: rightSideItems },
        ]}
      />
    </header>
  );
};
