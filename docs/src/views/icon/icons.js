import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
} from '../../../../src/components';

const iconTypes = [
  'apps',
  'arrowDown',
  'arrowLeft',
  'arrowRight',
  'arrowUp',
  'bolt',
  'boxesHorizontal',
  'boxesVertical',
  'brush',
  'bullseye',
  'check',
  'clock',
  'console',
  'controlsHorizontal',
  'controlsVertical',
  'copy',
  'cross',
  'document',
  'dot',
  'empty',
  'faceHappy',
  'faceSad',
  'fullScreen',
  'gear',
  'grid',
  'help',
  'invert',
  'link',
  'list',
  'listAdd',
  'lock',
  'mapMarker',
  'minusInCircle',
  'node',
  'pencil',
  'pin',
  'plusInCircle',
  'search',
  'shard',
  'share',
  'sortDown',
  'sortUp',
  'starEmpty',
  'tear',
  'trash',
  'user',
];

export default () => (
  <EuiFlexGrid columns={4}>
    {
      iconTypes.map(iconType => (
        <EuiFlexItem
          className="guideDemo__icon"
          key={iconType}
          style={{ width: '200px' }}
        >
          <EuiPanel>
            <EuiIcon
              type={iconType}
            />
            <EuiText size="s">
              <p>{iconType}</p>
            </EuiText>
          </EuiPanel>
        </EuiFlexItem>
      ))
    }
  </EuiFlexGrid>
);
