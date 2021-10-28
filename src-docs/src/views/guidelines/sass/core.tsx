import React from 'react';

// @ts-ignore Importing from Sass file
import zindexs from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../../src/global_styling/variables/_z_index.scss';
// @ts-ignore Importing from Sass file
import { RenderPaletteColor } from './render_palette';
// @ts-ignore Importing from Sass file
import { allowedColors } from '../colors/_utilities';

import {
  EuiFlexItem,
  EuiCode,
  EuiFlexGrid,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiFlexGroup,
} from '../../../../../src';

const euiColors = [...allowedColors, 'euiColorGhost', 'euiColorInk'];
const euiLevels = [
  'euiZToastList',
  'euiZModal',
  'euiZMask',
  'euiZNavigation',
  'euiZContentMenu',
  'euiZHeader',
  'euiZFlyout',
  'euiZContent',
];

function renderLevel(level: string, index: number) {
  return (
    <EuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={level}
      className="guideSass__levelRow"
    >
      <EuiFlexItem grow={false}>
        <div
          className="guideSass__level"
          style={{ opacity: 1 - index * 0.1 }}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ minWidth: 200, paddingLeft: 16 }}>
        <div>
          <EuiCode>${level}</EuiCode>
        </div>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText size="s">{zindexs[level]}</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export const Core = () => {
  return (
    <>
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <div>
            <EuiTitle size="s">
              <h3>Z-index</h3>
            </EuiTitle>

            <EuiSpacer />

            {euiLevels.map(function (level, index) {
              return renderLevel(level, index);
            })}
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Color</h3>
          </EuiTitle>

          <EuiSpacer />

          {euiColors.map((color) => (
            <RenderPaletteColor key={color} color={color} />
          ))}
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
