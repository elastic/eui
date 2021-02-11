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
import logoFigma from '../../images/logo-figma.svg';
// import theme from '@elastic/eui/dist/eui_theme_dark.json';

// @ts-ignore TODO: Convert to TS
import { CodeSandboxLink } from '../../components/codesandbox/link';
// @ts-ignore TODO: Convert to TS
import { GuideThemeSelector } from '../guide_theme_selector';

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
      <EuiHeaderLogo iconType="logoElastic" href="#/" aria-label="EUI home">
        Elastic UI
      </EuiHeaderLogo>
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

  function renderFigma() {
    const href = 'https://www.figma.com/community/file/809845546262698150';
    const label = 'EUI Figma Design Library';
    return isMobileSize ? (
      <EuiButtonEmpty size="s" flush="both" iconType={logoFigma} href={href}>
        {label}
      </EuiButtonEmpty>
    ) : (
      <EuiToolTip
        title="Open Figma Design Library"
        content="The Figma Elastic UI framework (EUI) is a design library in use at Elastic to build internal products that need to share our aesthetics.">
        <EuiHeaderSectionItemButton
          aria-label={label}
          // @ts-ignore TODO: FIX
          href={href}>
          <EuiIcon type={logoFigma} aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      </EuiToolTip>
    );
  }

  function renderSketch() {
    const href =
      'https://github.com/elastic/eui/releases/download/v8.0.0/eui_sketch_8.0.0.zip';
    const label = 'EUI Sketch Library (download)';
    return isMobileSize ? (
      <EuiButtonEmpty size="s" flush="both" iconType="logoSketch" href={href}>
        {label}
      </EuiButtonEmpty>
    ) : (
      <EuiToolTip
        title="(Outdated) Download Sketch zip"
        content="Import these sketch files into a new project as libraries.
          This will provide symbols that match against their EUI component
          counterparts.">
        <EuiHeaderSectionItemButton
          aria-label={label}
          // @ts-ignore TODO: FIX
          href={href}>
          <EuiIcon type="logoSketch" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      </EuiToolTip>
    );
  }

  function renderCodeSandbox() {
    const label = 'Codesandbox';
    return isMobileSize ? (
      <CodeSandboxLink>
        <EuiButtonEmpty size="s" flush="both" iconType="logoCodesandbox">
          {label}
        </EuiButtonEmpty>
      </CodeSandboxLink>
    ) : (
      <EuiToolTip content="Codesandbox">
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
          {renderSketch()}
          {renderFigma()}
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
        renderSketch(),
        renderFigma(),
        renderCodeSandbox(),
      ];

  return (
    <EuiHeader
      position="fixed"
      theme="dark"
      sections={[
        {
          items: [
            renderLogo(),
            <EuiBadge
              href="#/package/changelog"
              aria-label={`Version ${pkg.version}, View changelog`}
              color="default">
              v.{pkg.version}
            </EuiBadge>,
          ],
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
