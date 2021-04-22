import React, { useState } from 'react';

import {
  EuiHeaderLogo,
  EuiHeader,
  EuiHeaderSectionItemButton,
} from '../../../../src/components/header';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiToolTip } from '../../../../src/components/tool_tip';
import { EuiPopover } from '../../../../src/components/popover';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { EuiButtonEmpty } from '../../../../src/components/button';

// @ts-ignore Not TS
import { CodeSandboxLink } from '../../components/codesandbox/link';
import logoEUI from '../../images/logo-eui.svg';
import {
  GuideThemeSelector,
  GuideSketchLink,
  GuideFigmaLink,
} from '../guide_theme_selector';

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
        color={isLocalDev ? 'accent' : 'default'}>
        {isLocalDev ? 'Local' : `v.${pkg.version}`}
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
        <EuiHeaderSectionItemButton
          aria-label={label}
          // @ts-ignore TODO: FIX
          href={href}>
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
        onClick={() => setMobilePopoverIsOpen((isOpen) => !isOpen)}>
        <EuiIcon type="apps" aria-hidden="true" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        id="guidePageChromeThemePopover"
        button={button}
        isOpen={mobilePopoverIsOpen}
        closePopover={() => setMobilePopoverIsOpen(false)}>
        <div className="guideOptionsPopover">
          {renderGithub()}
          <GuideSketchLink />
          <GuideFigmaLink />
          {renderCodeSandbox()}
        </div>
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
        <GuideSketchLink key="sketch" />,
        <GuideFigmaLink key="figma" />,
        renderCodeSandbox(),
      ];

  return (
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
  );
};
