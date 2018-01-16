import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
} from '../../../../src/components';

const iconTypes = [
  'alert',
  'apps',
  'arrowDown',
  'arrowLeft',
  'arrowRight',
  'arrowUp',
  'asterisk',
  'bolt',
  'boxesHorizontal',
  'boxesVertical',
  'broom',
  'brush',
  'bullseye',
  'calendar',
  'check',
  'checkInCircleFilled',
  'clock',
  'console',
  'controlsHorizontal',
  'controlsVertical',
  'copy',
  'copyClipboard',
  'cross',
  'document',
  'dot',
  'empty',
  'exit',
  'expand',
  'faceHappy',
  'faceNeutral',
  'faceSad',
  'fullScreen',
  'gear',
  'grid',
  'help',
  'iInCircle',
  'indexClose',
  'indexEdit',
  'indexFlush',
  'indexMapping',
  'indexOpen',
  'indexSettings',
  'invert',
  'link',
  'list',
  'listAdd',
  'lock',
  'mapMarker',
  'merge',
  'minusInCircle',
  'node',
  'number',
  'pause',
  'pencil',
  'pin',
  'play',
  'plusInCircle',
  'popout',
  'questionInCircle',
  'refresh',
  'scale',
  'search',
  'shard',
  'share',
  'sortDown',
  'sortLeft',
  'sortRight',
  'sortUp',
  'starEmpty',
  'starPlusFilled',
  'stats',
  'string',
  'tableOfContents',
  'tear',
  'trash',
  'user',
  'wrench',
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
