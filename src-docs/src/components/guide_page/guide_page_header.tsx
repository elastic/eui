import React, { useState, useMemo } from 'react';

import {
  EuiBadge,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPopover,
  EuiToolTip,
} from '../../../../src/components';
import { useIsWithinBreakpoints } from '../../../../src/services';

// @ts-ignore Not TS
import { CodeSandboxLink } from '../../components/codesandbox/link';
import logoEUI from '../../images/logo-eui.svg';
import { GuideThemeSelector, GuideFigmaLink } from '../guide_theme_selector';

import { VersionSwitcher } from './version_switcher';

const GITHUB_URL = 'https://github.com/elastic/eui';

export type GuidePageHeaderProps = {
  onToggleLocale: () => {};
  selectedLocale: string;
};

export const GuidePageHeader: React.FunctionComponent<GuidePageHeaderProps> = ({
  onToggleLocale,
  selectedLocale,
}) => {
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
      <EuiButtonEmpty
        size="s"
        flush="both"
        iconType="logoGithub"
        href={GITHUB_URL}
      >
        {label}
      </EuiButtonEmpty>
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
        <EuiButtonEmpty size="s" flush="both" iconType="logoCodesandbox">
          {label}
        </EuiButtonEmpty>
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

  const [mobilePopoverIsOpen, setMobilePopoverIsOpen] = useState(false);

  const mobileMenu = useMemo(() => {
    const button = (
      <EuiHeaderSectionItemButton
        aria-label="Open EUI options menu"
        onClick={() => setMobilePopoverIsOpen((isOpen) => !isOpen)}
      >
        <EuiIcon type="apps" aria-hidden="true" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        button={button}
        isOpen={mobilePopoverIsOpen}
        closePopover={() => setMobilePopoverIsOpen(false)}
      >
        <EuiFlexGroup
          direction="column"
          alignItems="flexStart"
          gutterSize="none"
          responsive={false}
        >
          <EuiFlexItem>{github}</EuiFlexItem>
          <EuiFlexItem>
            <GuideFigmaLink />
          </EuiFlexItem>
          <EuiFlexItem>{codesandbox}</EuiFlexItem>
        </EuiFlexGroup>
      </EuiPopover>
    );
  }, [mobilePopoverIsOpen, codesandbox, github]);

  const rightSideItems = isMobileSize
    ? [
        <GuideThemeSelector
          onToggleLocale={onToggleLocale}
          selectedLocale={selectedLocale}
        />,
        mobileMenu,
      ]
    : [
        <GuideThemeSelector
          onToggleLocale={onToggleLocale}
          selectedLocale={selectedLocale}
        />,
        github,
        <GuideFigmaLink key="figma" />,
        codesandbox,
      ];

  return (
    <header aria-label="EUI Docs app bar">
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
