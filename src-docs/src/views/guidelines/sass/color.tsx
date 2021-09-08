import React from 'react';
import { Link } from 'react-router-dom';
import {
  EuiFlexItem,
  EuiCode,
  EuiCodeBlock,
  EuiFlexGrid,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiFlexGroup,
} from '../../../../../src';

const tintOrShadeExample = `// tintOrShade(color, tint_percent, shade_percent)
// will tint the color by % in light themes
// and shade the color by % in dark themes
.themedBox {
  background-color: tintOrShade($euiColorPrimary, 90%, 70%);
  border-left: $euiBorderThick;
  border-color: $euiColorPrimary;
  padding: $euiSize;
  color: $euiTextColor;
}`;

const contrastExample = `// Make sure text passes a contrast check
.contrastBox {
  $backgroundColor: tintOrShade($euiColorWarning, 90%, 70%);
  background: $backgroundColor;

  // Given two colors, adjust the first until contrast is 4.5
  color: makeHighContrastColor($euiColorWarning, $backgroundColor);
  padding: $euiSize;
  border-left: $euiBorderThick;
  border-color: $euiColorWarning;

  // Graphics can have a lower minimum contrast level of 3.0
  .square {
    fill: makeGraphicContrastColor($euiColorWarning, $backgroundColor);
  }
}`;

export const Color = () => {
  return (
    <>
      <EuiText>
        <p>
          <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/functions/_colors.scss">
            View the Sass code for color functions
          </EuiLink>
          .
        </p>
      </EuiText>
      <EuiSpacer />

      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Theming patterns</h3>
          </EuiTitle>

          <EuiSpacer />
          <EuiText>
            <p>
              Often you need to go beyond the provided color set. When doing so{' '}
              <strong>always</strong> use color functions to modify the base
              set. Here are some examples.
            </p>
          </EuiText>
          <EuiSpacer />

          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--danger" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>$euiCodeDanger</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--dangerTint" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>tint($euiCodeDanger, 30%)</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--dangerShade" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>shade($euiCodeDanger, 30%)</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer />
          <EuiText>
            <p>
              Remember that EUI provides dark and light mode theming support.
              Sometimes the traditional color functions don&apos;t give enough
              flexibility for both modes.
            </p>
            <p>
              For example, depending upon what theme you use{' '}
              <EuiCode>$euiColorPrimary</EuiCode> will be a different hex value.
            </p>
          </EuiText>
          <EuiSpacer />

          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem
              grow={false}
              style={{ background: '#FFF', padding: 8 }}
            >
              <div className="guideSass__swatch guideSass__swatch--primaryLight" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>$euiColorPrimary</EuiCode>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText size="s">
                <p>is #0079A5 in the light theme</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem
              grow={false}
              style={{ background: '#222', padding: 8 }}
            >
              <div className="guideSass__swatch guideSass__swatch--primaryDark" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>$euiColorPrimary</EuiCode>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText size="s">
                <p>is #4da1c0 in the dark theme</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer />
          <EuiText>
            <p>
              Taking the default primary color above we want to tint the color
              in the light mode, but shade it in the dark mode. This makes the
              background color more subtle in both use cases.
            </p>
          </EuiText>

          <EuiSpacer />

          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none"
          >
            {tintOrShadeExample}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiFlexGrid columns={2}>
            <EuiFlexItem style={{ background: '#FFF', padding: 16 }}>
              <div className="guideSass__themedBox guideSass__themedBox--light">
                Light theme
              </div>
            </EuiFlexItem>
            <EuiFlexItem style={{ background: '#222', padding: 16 }}>
              <div className="guideSass__themedBox guideSass__themedBox--dark">
                Dark theme
              </div>
            </EuiFlexItem>
          </EuiFlexGrid>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Color contrast patterns</h3>
          </EuiTitle>

          <EuiSpacer />

          <EuiText>
            <p>
              EUI provides some nifty color functions for auto-adjusting color
              to pass AA contrast checks. Often this is needed when using the
              base colors on top of each other. Here is an example similar to
              our callouts with a pesky orange.
            </p>
          </EuiText>

          <EuiSpacer />

          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none"
          >
            {contrastExample}
          </EuiCodeBlock>

          <EuiSpacer />

          <div className="guideSass__contrastExample">
            <svg
              className="square"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <rect
                width="12"
                height="12"
                x="2"
                y="2"
                rx="2"
                fillRule="evenodd"
              />
            </svg>{' '}
            This orange text now passes a contrast check!
          </div>

          <EuiSpacer />

          <EuiTitle size="s">
            <h3>More on color contrast</h3>
          </EuiTitle>

          <EuiSpacer />

          <EuiText>
            <p>
              Consult the larger{' '}
              <Link to="/guidelines/colors">color guidelines</Link> page for a
              better explanation about passing color contrast.
            </p>
          </EuiText>

          <EuiSpacer />
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
