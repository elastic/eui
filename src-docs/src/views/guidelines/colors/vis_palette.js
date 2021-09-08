import React from 'react';
import { useSassVars } from '../_get_sass_vars';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCopy,
  EuiTitle,
  EuiText,
  EuiPanel,
} from '../../../../../src/components';
import { rgbToHex } from '../../../../../src/services';

export const VisPalette = ({ variant }) => {
  const visColors = useSassVars().euiPaletteColorBlind;
  const visColorKeys = Object.keys(useSassVars().euiPaletteColorBlind);

  function renderPaletteColor(palette, color, index, key) {
    const hex = key ? palette[color][key] : palette[color];
    const name = key && key !== 'graphic' ? `${color}_${key}` : color;

    return (
      <EuiFlexItem key={index} grow={false}>
        <EuiFlexGroup responsive={false} alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiCopy beforeMessage="Click to copy color name" textToCopy={name}>
              {(copy) => (
                <EuiIcon
                  onClick={copy}
                  size="xl"
                  type="stopFilled"
                  color={rgbToHex(hex.rgba)}
                />
              )}
            </EuiCopy>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiTitle size="xxs">
              <h3>{name}</h3>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText size="s" color="subdued">
              <p>
                <code>{rgbToHex(hex.rgba).toUpperCase()}</code>
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    );
  }

  return (
    <EuiPanel paddingSize="l" color="subdued">
      <EuiFlexGroup direction="column" gutterSize="s">
        {visColorKeys.map(function (color, index) {
          return renderPaletteColor(visColors, color, index, variant);
        })}
      </EuiFlexGroup>
    </EuiPanel>
  );
};
