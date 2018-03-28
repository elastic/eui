import React from 'react';

import imageIcons from '../../images/icons.jpg';
import imageButtons from '../../images/buttons.svg';
import imageTables from '../../images/tables.svg';
import imageForms from '../../images/forms.svg';
import imageFlexgrid from '../../images/flexgrid.svg';
import imageCards from '../../images/cards.svg';

import {
  Link,
} from 'react-router';

import {
  EuiCard,
  EuiCode,
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
              <EuiLink href="https://github.com/elastic/eui">
                <strong>{ pkg.version }</strong>
              </EuiLink>
            </p>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiIcon type="logoGithub" />
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
                counterparts."
            >
              <EuiLink href="https://github.com/elastic/eui/releases/download/v0.0.25/eui_sketch_0.0.25.zip">
                <strong>Sketch libraries</strong>
              </EuiLink>
            </EuiToolTip>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiIcon type="logoSketch" />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>

    </EuiFlexGroup>
    <EuiSpacer />
    <EuiText>
      <p>
        The Elastic UI framework (EUI) is a design library in use at Elastic to
        build internal products that need to share our aesthetics.
        It distributes UI React components and static assets for use
        in building web layouts. Alongside the React components is a SASS/CSS
        layer that can be used independently on its own.
        If this is your first time using EUI you might want to read up on{' '}
        <EuiLink href="https://github.com/elastic/eui/blob/master/wiki/consuming.md">how to consume EUI</EuiLink>{' '}
        and <EuiLink href="https://www.elastic.co/guide/en/kibana/current/kibana-plugins.html">Kibana plugin development</EuiLink>{' '}
        in general.
      </p>
    </EuiText>
    <EuiSpacer />
    <EuiFlexGrid gutterSize="l" columns={3}>
      <EuiFlexItem>
        <Link to="/display/icons">
          <EuiCard
            textAlign="left"
            image={imageIcons}
            isClickable
            title="Icons"
            description="Our SVG icon library gives you full control over size and color"
          />
        </Link>
      </EuiFlexItem>
      <EuiFlexItem>
        <Link to="/navigation/button">
          <EuiCard
            textAlign="left"
            image={imageButtons}
            title="Buttons"
            isClickable
            description="Buttons for every usage you might need."
          />
        </Link>
      </EuiFlexItem>
      <EuiFlexItem>
        <Link to="/layout/flex">
          <EuiCard
            textAlign="left"
            image={imageFlexgrid}
            title="Flexible layouts"
            description="Create layouts by using flex groups, grids and items"
            isClickable
          />
        </Link>
      </EuiFlexItem>
      <EuiFlexItem>
        <Link to="/display/tables">
          <EuiCard
            textAlign="left"
            image={imageTables}
            title="Tables"
            isClickable
            description="Build tables from individual components or high level wrappers"
          />
        </Link>
      </EuiFlexItem>
      <EuiFlexItem>
        <Link to="/display/card">
          <EuiCard
            textAlign="left"
            image={imageCards}
            title="Cards"
            description="Cards like these help you make repeatable content more presentable"
            isClickable
          />
        </Link>
      </EuiFlexItem>
      <EuiFlexItem>
        <Link to="/forms/form-layouts">
          <EuiCard
            textAlign="left"
            image={imageForms}
            title="Forms"
            isClickable
            description="Input tags, layouts and validation for your forms"
          />
        </Link>
      </EuiFlexItem>
    </EuiFlexGrid>
    <EuiSpacer />
    <EuiText>
      <h2>Design goals</h2>
      <p>EUI has the following primary goals..</p>
      <ul>
        <li><EuiCode>EUI is accessible to everyone</EuiCode>. Use high contrast,
          color-blind safe palettes and proper aria labels.
        </li>
        <li><EuiCode>EUI is themable</EuiCode>. Theming should involve changing
          less than a dozen lines of code. This means strict variable usage.
        </li>
        <li><EuiCode>EUI is responsive</EuiCode>. Currently we target
          mobile, laptop, desktop and wide desktop breakpoints.
        </li>
        <li><EuiCode>EUI is playful</EuiCode>. Consistent use of animation can
          bring life to our design.
        </li>
        <li><EuiCode>EUI is documented and has tests</EuiCode>. Make sure
          the code is friendly to the novice and expert alike.
        </li>
      </ul>
    </EuiText>
  </div>
);
