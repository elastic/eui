import React from 'react';
import {hashHistory} from 'react-router';

import {
  Link,
} from 'react-router';

import {
  EuiText,
  EuiCode,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiFlexItem,
  EuiSpacer,
  EuiHorizontalRule,
  EuiCard,
  EuiIcon,
  EuiButton,
  EuiTitle,
  EuiLink,
} from '../../../../src/components';

const pkg = require('../../../../package.json');

const colors = [
  {
    color: 'euiColorPrimary',
    hex: '#0079a5',
  },
  {
    color: 'euiColorSecondary',
    hex: '#00A69B',
  },
  {
    color: 'euiColorAccent',
    hex: '#DD0A73',
  },
  {
    color: 'euiColorDanger',
    hex: '#A30000',
  },
  {
    color: 'euiColorWarning',
    hex: '#E5830E',
  },
];

const grays = [
  {
    color: 'euiColorEmptyShade',
    hex: '#FFF',
    textColor: '#222'
  },
  {
    color: 'euiColorLightestShade',
    hex: '#F5F5F5',
    textColor: '#222'
  },
  {
    color: 'euiColorLightShade',
    hex: '#D9D9D9',
    textColor: '#222'
  },
  {
    color: 'euiColorMediumShade',
    hex: '#999999',
    textColor: '#FFF'
  },
  {
    color: 'euiColorDarkShade',
    hex: '#666666',
    textColor: '#FFF'
  },
  {
    color: 'euiColorDarkestShade',
    hex: '#3F3F3F',
    textColor: '#FFF'
  },
  {
    color: 'euiColorFullShade',
    hex: '#000000',
    textColor: '#FFF'
  },
];

const sizes = [
  {
    name: 'Extra small',
    size: 4,
  },
  {
    name: 'Small',
    size: 8,
  },
  {
    name: 'Medium',
    size: 12,
  },
  {
    name: 'default',
    size: 16,
  },
  {
    name: 'Large',
    size: 24,
  },
  {
    name: 'Extra large',
    size: 32,
  },
  {
    name: 'Extra extra large',
    size: 40,
  },
];

const fontSizes = [
  {
    name: 'Extra small',
    size: 12,
  },
  {
    name: 'Small',
    size: 14,
  },
  {
    name: 'Default',
    size: 16,
  },
  {
    name: 'Large',
    size: 24,
  },
  {
    name: 'Extra extra large',
    size: 32,
  },
];

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
            <EuiLink href="https://github.com/elastic/eui/releases/download/v0.0.25/eui_sketch_0.0.25.zip">
              <strong>Sketch libraries</strong>
            </EuiLink>
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
        The Elastic UI Framework (EUI) is a design library in use at Elastic to
        build internal products that need to share our branding and look and
        feel. It distributes UI React components and static assets for use
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
            image="https://i.imgur.com/uPtnXbv.png"
            isClickable
            icon={
              <EuiFlexGroup style={{ marginLeft: 0 }}>
                <EuiFlexItem>
                  <EuiIcon size="xxl" type="check" color="ghost" />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiIcon size="xxl" type="cross" color="ghost" />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiIcon size="xxl" type="alert" color="ghost" />
                </EuiFlexItem>
              </EuiFlexGroup>
            }
            title="Icons"
            description="Our SVG icon library gives you full control over size and color"
          />
        </Link>
      </EuiFlexItem>
      <EuiFlexItem>
        <Link to="/navigation/button">
          <EuiCard
            textAlign="left"
            image="https://i.imgur.com/hPl2fQn.png"
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
            image="https://i.imgur.com/M8N4Ms9.png"
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
            image="https://i.imgur.com/UfigGiQ.png"
            title="Tables"
            isClickable
            description="Example of a card's description. Stick to one or two sentences."
          />
        </Link>
      </EuiFlexItem>
      <EuiFlexItem>
        <Link to="/display/card">
          <EuiCard
            textAlign="left"
            image="https://i.imgur.com/PDVnOED.png"
            title="Cards"
            description="Cards like these help you make repeatable content more presentable"
            isClickable
          />
        </Link>
      </EuiFlexItem>
      <EuiFlexItem>
        <Link to="/forms/form">
          <EuiCard
            textAlign="left"
            image="https://i.imgur.com/aSuom2R.png"
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

    <EuiHorizontalRule />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h2>Colors</h2>
          <p>
            The UI Framework uses a very limited palette. Every color is
            calculated using Sass color from one of the below.
          </p>
          <h3>Theming</h3>
          <p>
            Theming is achieved by overwriting these twelve colors with
            a different set. This is why it is very important <EuiCode>never to use hex colors</EuiCode> in
            EUI outside of the global variable files.
          </p>
          <h3>Accessibility</h3>
          <p>
            We aim to be at least AA compliant in our design. That means that only some of the colors
            to the right should be used for text.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGrid columns={2} gutterSize="s">
          {colors.map((item, index) => {
            return (
              <EuiFlexItem className="guideDemo__color" style={{ background: item.hex }} key={index}>
                <p>${item.color}</p>
                <p className="guideDemo__colorHex">{item.hex}</p>
              </EuiFlexItem>
            );
          })}

          {grays.map((item, index) => {
            return (
              <EuiFlexItem className="guideDemo__color" style={{ background: item.hex, color: item.textColor }} key={index}>
                <p>${item.color}</p>
                <p className="guideDemo__colorHex">{item.hex}</p>
              </EuiFlexItem>
            );
          })}
        </EuiFlexGrid>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiHorizontalRule />

    <EuiText>
      <h2>Spacing and sizing</h2>
      <p>
        <EuiCode>EUI</EuiCode> is a minimalist design and as such needs to be very precise
        with the spacing and padding between and around items. <EuiCode>16px</EuiCode> is our
        magic number. It is our default font-size and our default spacing size.
        Larger numbers can be used, but must always be
        a <EuiCode>multiple of 16px</EuiCode> beyond these sizes below.
      </p>

      <p>Sizing when passed as values to props should always be <EuiCode>xs / s / m / l / xl ...etc</EuiCode></p>

    </EuiText>

    <EuiSpacer size="l" />

    <EuiFlexGroup gutterSize="s" className="guideDemo__sizeGrid">
      <EuiFlexItem>
        <EuiText><h3>Element sizes / paddings / margins</h3></EuiText>
        {sizes.map((item, index) => {
          return (
            <div key={index}>
              <EuiSpacer size="m" />
              <EuiFlexGroup key={index} alignItems="center">
                <EuiFlexItem grow={false} style={{ width: 40, textAlign: 'right' }}>
                  <div className="guideDemo__size" style={{ height: item.size, width: item.size }} />
                </EuiFlexItem>
                <EuiFlexItem>
                  <p className="guideDemo__sizeText">
                    {item.size}px - {item.name}
                  </p>
                </EuiFlexItem>
              </EuiFlexGroup>
            </div>
          );
        })}
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText><h3>Font sizes</h3></EuiText>
        {fontSizes.map((item, index) => {
          return (
            <div style={{ fontSize: item.size, marginTop: 24 }} key={index}>
              {item.name} is {item.size}: Something about a lazy fox?
            </div>
          );
        })}
      </EuiFlexItem>
    </EuiFlexGroup>



  </div>
);
