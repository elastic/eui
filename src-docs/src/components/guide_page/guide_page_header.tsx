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

const pkg = require('../../../../package.json');

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

  const version = useMemo(() => {
    const isLocalDev = window.location.host.includes('803');

    return (
      <EuiBadge
        href="#/package/changelog"
        aria-label={`Version ${pkg.version}, View changelog`}
        color={isLocalDev ? 'accent' : 'default'}
      >
        {isLocalDev ? 'Local' : `v${pkg.version}`}
      </EuiBadge>
    );
  }, []);

  const github = useMemo(() => {
    const href = 'https://github.com/elastic/eui';
    const label = 'EUI GitHub repo';
    return isMobileSize ? (
      <EuiButtonEmpty size="s" flush="both" iconType="logoGithub" href={href}>
        {label}
      </EuiButtonEmpty>
    ) : (
      <EuiToolTip content="Github">
        <EuiHeaderSectionItemButton aria-label={label} href={href}>
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
          { items: [logo, version] },
          { items: rightSideItems },
        ]}
      />
    </header>
  );
};
