import React from 'react';

import {
  EuiText,
  EuiCode,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiFlexItem,
  EuiSpacer,
  EuiHorizontalRule,
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
    <EuiText>
      <h1>Elastic UI Framework</h1>
      <p>Version: <strong>{ pkg.version }</strong></p>
      <p>
        Elastic UI teams use the UI Framework to build Kibana&rsquo;s user interface. Please see
        the <a href="https://www.elastic.co/guide/en/kibana/current/index.html">general Kibana docs</a> for information on how to use Kibana, and
        the <a href="https://www.elastic.co/guide/en/kibana/current/kibana-plugins.html">plugin-specific section</a> for
        help developing Kibana plugins. You can find the source for the <a href="https://github.com/elastic/eui">Elastic UI Framework on GitHub</a>.
      </p>

      <h2>Goals</h2>
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
