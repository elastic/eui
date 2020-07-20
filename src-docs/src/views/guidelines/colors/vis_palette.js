import React from 'react';
import { getSassVars } from '../_get_sass_vars';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCopy,
  EuiTitle,
  EuiText,
} from '../../../../../src/components';
import { rgbToHex } from '../../../../../src/services';

export const VisPalette = ({ variant }) => {
  const visColors = getSassVars('light').euiPaletteColorBlind;
  const visColorKeys = Object.keys(getSassVars('light').euiPaletteColorBlind);

  function renderPaletteColor(palette, color, index, key) {
    const hex = key ? palette[color][key] : palette[color];
    const name = key && key !== 'graphic' ? `${color}_${key}` : color;

    return (
      <EuiFlexItem key={index} grow={false}>
        <EuiFlexGroup responsive={false} alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiCopy beforeMessage="Click to copy color name" textToCopy={name}>
              {copy => (
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
    <EuiFlexGroup
      className="guideSection__shadedBox"
      direction="column"
      gutterSize="s">
      {visColorKeys.map(function(color, index) {
        return renderPaletteColor(visColors, color, index, variant);
      })}
    </EuiFlexGroup>
  );
};
