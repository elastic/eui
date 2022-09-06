import React, { useState } from 'react';

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

  function renderLogo() {
    return (
      <EuiHeaderLogo iconType={logoEUI} href="#/" aria-label="EUI home">
        Elastic UI
      </EuiHeaderLogo>
    );
  }

  function renderVersion() {
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
  }

  function renderGithub() {
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
  }

  function renderCodeSandbox() {
    const label = 'Codesandbox';
    return isMobileSize ? (
      <CodeSandboxLink key="codesandbox">
        <EuiButtonEmpty size="s" flush="both" iconType="logoCodesandbox">
          {label}
        </EuiButtonEmpty>
      </CodeSandboxLink>
    ) : (
      <EuiToolTip content="Codesandbox" key="codesandbox">
        <CodeSandboxLink>
          <EuiHeaderSectionItemButton aria-label="Codesandbox">
            <EuiIcon type="logoCodesandbox" aria-hidden="true" />
          </EuiHeaderSectionItemButton>
        </CodeSandboxLink>
      </EuiToolTip>
    );
  }

  const [mobilePopoverIsOpen, setMobilePopoverIsOpen] = useState(false);

  function renderMobileMenu() {
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
          <EuiFlexItem>{renderGithub()}</EuiFlexItem>
          <EuiFlexItem>
            <GuideFigmaLink />
          </EuiFlexItem>
          <EuiFlexItem>{renderCodeSandbox()}</EuiFlexItem>
        </EuiFlexGroup>
      </EuiPopover>
    );
  }

  const rightSideItems = isMobileSize
    ? [
        <GuideThemeSelector
          onToggleLocale={onToggleLocale}
          selectedLocale={selectedLocale}
        />,
        renderMobileMenu(),
      ]
    : [
        <GuideThemeSelector
          onToggleLocale={onToggleLocale}
          selectedLocale={selectedLocale}
        />,
        renderGithub(),
        <GuideFigmaLink key="figma" />,
        renderCodeSandbox(),
      ];

  return (
    <header aria-label="EUI Docs app bar">
      <EuiHeader
        position="fixed"
        theme="dark"
        sections={[
          {
            items: [renderLogo(), renderVersion()],
            borders: 'none',
          },
          {
            items: rightSideItems,
            borders: 'none',
          },
        ]}
      />
    </header>
  );
};
