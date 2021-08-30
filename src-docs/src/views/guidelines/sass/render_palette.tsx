import React from 'react';
import {
  EuiFlexItem,
  EuiFlexGroup,
  rgbToHex,
  EuiCode,
} from '../../../../../src';

// @ts-ignore Importing from JS file
import { useSassVars } from '../_get_sass_vars';

export const RenderPaletteColor = ({ color }: { color: string }) => {
  const palette = useSassVars();
  let optionalDefault;
  if (color === 'euiTextColor') {
    optionalDefault = (
      <EuiFlexItem grow={false}>
        <strong>default</strong>
      </EuiFlexItem>
    );
  }
  return (
    <EuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      className="guideSass__swatchItem"
    >
      <EuiFlexItem grow={false}>
        <div
          className="guideSass__swatch"
          style={{ background: rgbToHex(palette[color].rgba).toUpperCase() }}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiCode>${color}</EuiCode>
      </EuiFlexItem>
      {optionalDefault}
    </EuiFlexGroup>
  );
};
