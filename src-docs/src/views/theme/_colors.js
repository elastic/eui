import React from 'react';
import { useEuiTheme } from '../../../../src/services';

import {
  brand_colors,
  brand_text_colors,
  shade_colors,
  special_colors,
  text_colors,
} from '../../../../src/global_styling/variables/_colors';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCopy,
  EuiCode,
  EuiIcon,
} from '../../../../src/components';

function renderPaletteColor(name, color, icon = 'stopFilled') {
  icon = name.includes('Text') ? 'editorHeading' : icon;
  return (
    <EuiFlexItem key={name} grow={false}>
      <EuiFlexGroup responsive={false} alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiCopy
            beforeMessage="Click to copy full theme variable"
            textToCopy={`euiTheme.colors.${name}`}>
            {(copy) => (
              <button onClick={copy}>
                <EuiIcon size="xl" type={icon} color={color} />
              </button>
            )}
          </EuiCopy>
        </EuiFlexItem>
        <EuiFlexItem grow={true}>
          <EuiText size="s">
            <EuiCode transparentBackground>{name}</EuiCode>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size="s" color="subdued">
            <p>
              <code>{color.toUpperCase()}</code>
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
}

const brandKeys = Object.keys(brand_colors);
const brandTextKeys = Object.keys(brand_text_colors);
const shadeKeys = Object.keys(shade_colors);
const specialKeys = Object.keys(special_colors);
const textKeys = Object.keys(text_colors);

export default () => {
  const { euiTheme } = useEuiTheme();

  const colors = euiTheme.colors;

  return (
    <div>
      <EuiTitle>
        <h2>Colors</h2>
      </EuiTitle>
      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>Brand</h3>
            <p>
              Elastic has two main brand colors the other three are used for
              statefulness like indicating between successful and dangerous
              actions.
            </p>
            <p>
              Each color also has a corresponding text variant that has been
              calculated for proper (4.5) contrast against the body color and
              should be used specifically when coloring text.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              {brandKeys.map((color, index) => (
                <React.Fragment key={color}>
                  {renderPaletteColor(color, colors[color])}
                  {renderPaletteColor(
                    brandTextKeys[index],
                    colors[brandTextKeys[index]]
                  )}
                </React.Fragment>
              ))}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>Shades</h3>
            <p>Grayscale</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              {shadeKeys.map(function (color) {
                return renderPaletteColor(color, colors[color]);
              })}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>Text</h3>
            <p>
              Specific text colors calculated off either the brand or shade
              colors.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              {textKeys.map(function (color) {
                return renderPaletteColor(
                  color,
                  colors[color],
                  'editorHeading'
                );
              })}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>Special</h3>
            <p>These are used a lot for special cases.</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              {specialKeys.map(function (color) {
                return renderPaletteColor(color, colors[color]);
              })}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>Constants</h3>
            <p>These are constant no matter the theme or color mode.</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              {renderPaletteColor('ghost', colors.ghost)}
              {renderPaletteColor('ink', colors.ink)}
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
