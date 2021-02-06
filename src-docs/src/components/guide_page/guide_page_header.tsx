import React from 'react';

import {
  EuiHeaderLogo,
  EuiHeader,
  EuiHeaderSectionItemButton,
} from '../../../../src/components/header';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiToolTip } from '../../../../src/components/tool_tip';
import logoFigma from '../../images/logo-figma.svg';
// import theme from '@elastic/eui/dist/eui_theme_dark.json';

// @ts-ignore TODO: Convert to TS
import { CodeSandboxLink } from '../../components/codesandbox/link';
// @ts-ignore TODO: Convert to TS
import { GuideThemeSelector } from '../guide_theme_selector';
// @ts-ignore TODO: Convert to TS
import { GuideLocaleSelector } from '../guide_locale_selector';

const pkg = require('../../../../package.json');

export type GuidePageHeaderProps = {
  onToggleLocale: () => {};
  selectedLocale: string;
};

export const GuidePageHeader: React.FunctionComponent<GuidePageHeaderProps> = ({
  onToggleLocale,
  selectedLocale,
}) => {
  function renderLogo() {
    return (
      <EuiHeaderLogo iconType="logoElastic" href="#/" aria-label="EUI home">
        Elastic UI
      </EuiHeaderLogo>
    );
  }

  function renderGithub() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Elastic repo on GitHub"
        // @ts-ignore TODO: FIX
        href="https://github.com/elastic/eui">
        <EuiToolTip content="Github">
          <EuiIcon type="logoGithub" aria-hidden="true" />
        </EuiToolTip>
      </EuiHeaderSectionItemButton>
    );
  }

  function renderFigma() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Elastic UI Library on Figma"
        // @ts-ignore TODO: FIX
        href="https://www.figma.com/community/file/809845546262698150">
        <EuiToolTip
          title="Open Figma Design Library"
          content="The Figma Elastic UI framework (EUI) is a design library in use at Elastic to build internal products that need to share our aesthetics.">
          <EuiIcon type={logoFigma} aria-hidden="true" />
        </EuiToolTip>
      </EuiHeaderSectionItemButton>
    );
  }

  function renderSketch() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Elastic UI Library for Sketch"
        // @ts-ignore TODO: FIX
        href="https://github.com/elastic/eui/releases/download/v8.0.0/eui_sketch_8.0.0.zip">
        <EuiToolTip
          title="(Outdated) Download Sketch zip"
          content="Import these sketch files into a new project as libraries.
            This will provide symbols that match against their EUI component
            counterparts.">
          <EuiIcon type="logoSketch" aria-hidden="true" />
        </EuiToolTip>
      </EuiHeaderSectionItemButton>
    );
  }

  function renderCodeSandbox() {
    return (
      <CodeSandboxLink>
        <EuiHeaderSectionItemButton
          aria-label="Codesandbox"
          // @ts-ignore TODO: FIX
          href="https://github.com/elastic/eui/releases/download/v8.0.0/eui_sketch_8.0.0.zip">
          <EuiToolTip content="Codesandbox">
            <EuiIcon type="logoCodesandbox" aria-hidden="true" />
          </EuiToolTip>
        </EuiHeaderSectionItemButton>
      </CodeSandboxLink>
    );
  }

  function renderInternationalization() {
    return (
      location.host === 'localhost:8030' && ( // eslint-disable-line no-restricted-globals
        <div style={{ marginRight: 12 }}>
          <GuideLocaleSelector
            onToggleLocale={onToggleLocale}
            selectedLocale={selectedLocale}
          />
        </div>
      )
    );
  }

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
          items: [
            renderInternationalization(),
            <GuideThemeSelector />,
            renderGithub(),
            renderSketch(),
            renderFigma(),
            renderCodeSandbox(),
          ],
          borders: 'none',
        },
      ]}
    />
  );
};
