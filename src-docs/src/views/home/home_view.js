import React from 'react';

import { Link } from 'react-router-dom';

import imageIcons from '../../images/icons.svg';
import imageButtons from '../../images/buttons.svg';
import imageTables from '../../images/tables.svg';
import imageForms from '../../images/forms.svg';
import imageFlexgrid from '../../images/flexgrid.svg';
import imageCards from '../../images/cards.svg';
import imagePages from '../../images/page.svg';
import imageText from '../../images/text.svg';
import imageCharts from '../../images/charts.svg';
import logoFigma from '../../images/logo-figma.svg';

import {
  EuiCard,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiToolTip,
  EuiScreenReaderOnly,
} from '../../../../src/components';

const pkg = require('../../../../package.json');

export const HomeView = () => (
  <div className="guideSection__text">
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem>
        <EuiTitle size="l">
          <h1>Elastic UI framework</h1>
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiLink href="https://github.com/elastic/eui">
              <EuiScreenReaderOnly>
                <span>Elastic repo on GitHub</span>
              </EuiScreenReaderOnly>
              <EuiIcon type="logoGithub" aria-hidden="true" />
            </EuiLink>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <p>
              Version:{' '}
              <Link
                aria-label={`Version ${pkg.version}, View changelog`}
                to="/package/changelog">
                <strong>{pkg.version}</strong>
              </Link>
            </p>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <p>Libraries:</p>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiLink href="https://www.figma.com/community/file/809845546262698150">
              <EuiScreenReaderOnly>
                <span>Elastic UI Library on Figma</span>
              </EuiScreenReaderOnly>
              <EuiToolTip
                title="Open Figma Design Library"
                postiion="down"
                content="The Figma Elastic UI framework (EUI) is a design library in use at Elastic to build internal products that need to share our aesthetics.">
                <EuiIcon type={logoFigma} aria-hidden="true" />
              </EuiToolTip>
            </EuiLink>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiToolTip
              title="Download zip"
              postiion="down"
              content="Import these sketch files into a new project as libraries.
                This will provide symbols that match against their EUI component
                counterparts.">
              <EuiLink href="https://github.com/elastic/eui/releases/download/v8.0.0/eui_sketch_8.0.0.zip">
                <EuiScreenReaderOnly>
                  <span>Elastic UI Library for Sketch</span>
                </EuiScreenReaderOnly>
                <EuiIcon type="logoSketch" aria-hidden="true" />
              </EuiLink>
            </EuiToolTip>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiLink href="https://codesandbox.io/s/ll7lnlpm97">
              <strong>Codesandbox</strong>
            </EuiLink>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiIcon type="logoCodesandbox" />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer />
    <EuiText grow={false}>
      <p>
        The Elastic UI framework (EUI) is a design library in use at Elastic to
        build internal products that need to share our aesthetics. It
        distributes UI React components and static assets for use in building
        web layouts. Alongside the React components is a SASS/CSS layer that can
        be used independently on its own. If this is your first time using EUI
        you might want to read up on{' '}
        <EuiLink href="https://github.com/elastic/eui/blob/master/wiki/consuming.md">
          how to consume EUI
        </EuiLink>{' '}
        and{' '}
        <EuiLink href="https://www.elastic.co/guide/en/kibana/current/kibana-plugins.html">
          Kibana plugin development
        </EuiLink>{' '}
        in general.
      </p>
    </EuiText>
    <EuiSpacer />
    <EuiFlexGrid gutterSize="l" columns={3}>
      <EuiFlexItem>
        <EuiCard
          href="#/display/icons"
          textAlign="left"
          image={imageIcons}
          title="Icons"
          description="Our SVG icon library gives you full control over size and color"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/navigation/button"
          textAlign="left"
          image={imageButtons}
          title="Buttons"
          description="Buttons for every usage you might need"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/display/text"
          textAlign="left"
          image={imageText}
          title="Text"
          description="Simple HTML text like paragraphs and lists are wrapped in a single text component for styling"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/layout/page"
          textAlign="left"
          image={imagePages}
          title="Pages"
          description="Layout your whole application page with this component and its series of child components"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/layout/flex"
          textAlign="left"
          image={imageFlexgrid}
          title="Flexible layouts"
          description="Create layouts by using flex groups, grids, and items"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/display/card"
          textAlign="left"
          image={imageCards}
          title="Cards"
          description="Cards like these help you make repeatable content more presentable"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/forms/form-layouts"
          textAlign="left"
          image={imageForms}
          title="Forms"
          description="Input tags, layouts, and validation for your forms"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/tabular-content/tables"
          textAlign="left"
          image={imageTables}
          title="Tables"
          description="Build tables from individual components or high level wrappers"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/elastic-charts/creating-charts"
          textAlign="left"
          image={imageCharts}
          title="Charts"
          description="Learn charting best practices and how to integrate EUI with the Elastic Charts library"
        />
      </EuiFlexItem>
    </EuiFlexGrid>
    <EuiSpacer />
    <EuiText grow={false}>
      <h2>Design goals</h2>
      <dl>
        <dt>EUI is accessible to everyone.</dt>
        <dd>
          Uses high contrast, color-blind safe palettes and tested with most
          assistive technology.
        </dd>
        <dt>EUI is themable.</dt>
        <dd>
          Theming involves changing fewer than a dozen lines of code. This means
          strict variable usage.
        </dd>
        <dt>EUI is flexible and composable.</dt>
        <dd>
          Configurable enough to meet the needs of a wide array of contexts
          while maintaining brand and low-level consistency.
        </dd>
        <dt>EUI is responsive.</dt>
        <dd>Supports multiple window sizes from large desktop to mobile.</dd>
        <dt>EUI is well documented and tested.</dt>
        <dd>Code is friendly to the novice and expert alike.</dd>
        <dt>EUI is playful.</dt>
        <dd>Simple and consistent use of animation brings life.</dd>
      </dl>
    </EuiText>
  </div>
);
