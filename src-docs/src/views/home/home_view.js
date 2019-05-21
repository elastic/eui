import React from 'react';

import { Link } from 'react-router';

import imageIcons from '../../images/icons.jpg';
import imageButtons from '../../images/buttons.svg';
import imageTables from '../../images/tables.svg';
import imageForms from '../../images/forms.svg';
import imageFlexgrid from '../../images/flexgrid.svg';
import imageCards from '../../images/cards.svg';

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
            <p>
              Version:{' '}
              <Link to="/package/changelog">
                <strong>v{pkg.version}</strong>
              </Link>
            </p>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiLink href="https://github.com/elastic/eui">
              <EuiIcon type="logoGithub" />
            </EuiLink>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiToolTip
              title="Download zip"
              postiion="down"
              content="Import these sketch files into a new project as libraries.
                This will provide symbols that match against their EUI component
                counterparts.">
              <EuiLink href="https://github.com/elastic/eui/releases/download/v8.0.0/eui_sketch_8.0.0.zip">
                <strong>Sketch libraries</strong>
              </EuiLink>
            </EuiToolTip>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiIcon type="logoSketch" />
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
          isClickable
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
          isClickable
          description="Buttons for every usage you might need"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/layout/flex"
          textAlign="left"
          image={imageFlexgrid}
          title="Flexible layouts"
          description="Create layouts by using flex groups, grids, and items"
          isClickable
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/display/tables"
          textAlign="left"
          image={imageTables}
          title="Tables"
          isClickable
          description="Build tables from individual components or high level wrappers"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/display/card"
          textAlign="left"
          image={imageCards}
          title="Cards"
          description="Cards like these help you make repeatable content more presentable"
          isClickable
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          href="#/forms/form-layouts"
          textAlign="left"
          image={imageForms}
          title="Forms"
          isClickable
          description="Input tags, layouts, and validation for your forms"
        />
      </EuiFlexItem>
    </EuiFlexGrid>
    <EuiSpacer />
    <EuiText grow={false}>
      <h2>Design goals</h2>
      <p>EUI has the following primary goals...</p>
      <dl>
        <dt>EUI is accessible to everyone.</dt>
        <dd>
          Use high contrast, color-blind safe palettes and proper aria labels.
        </dd>
        <dt>EUI is themable.</dt>
        <dd>
          Theming should involve changing fewer than a dozen lines of code. This
          means strict variable usage.
        </dd>
        <dt>EUI is responsive.</dt>
        <dd>
          Currently we target mobile, laptop, desktop, and wide desktop
          breakpoints.
        </dd>
        <dt>EUI is playful.</dt>
        <dd>Consistent use of animation can bring life to our design.</dd>
        <dt>EUI is documented and has tests.</dt>
        <dd>Make sure the code is friendly to the novice and expert alike.</dd>
      </dl>
    </EuiText>
  </div>
);
