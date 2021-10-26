import React from 'react';
import { useJsonVars } from '../../theme/_json/_get_json_vars.js';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCopy,
  EuiTitle,
  EuiText,
  EuiPanel,
} from '../../../../../src/components';

export const VisPalette = ({ variant }) => {
  const vars = useJsonVars();
  const visColors = vars.euiPaletteColorBlind;
  const visColorKeys = Object.keys(visColors);

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
                  color={hex}
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
                <code>{hex.toUpperCase()}</code>
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
