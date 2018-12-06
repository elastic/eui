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
  'apmTrace',
  'apps',
  'arrowDown',
  'arrowLeft',
  'arrowRight',
  'arrowUp',
  'asterisk',
  'beaker',
  'bolt',
  'boxesHorizontal',
  'boxesVertical',
  'branch',
  'broom',
  'brush',
  'bullseye',
  'calendar',
  'check',
  'checkInCircleFilled',
  'clock',
  'compute',
  'console',
  'controlsHorizontal',
  'controlsVertical',
  'copy',
  'copyClipboard',
  'cross',
  'crosshairs',
  'database',
  'document',
  'dot',
  'editorAlignCenter',
  'editorAlignLeft',
  'editorAlignRight',
  'editorBold',
  'editorCodeBlock',
  'editorComment',
  'editorHeading',
  'editorItalic',
  'editorLink',
  'editorStrike',
  'editorTable',
  'editorUnderline',
  'editorOrderedList',
  'editorUnorderedList',
  'email',
  'empty',
  'exit',
  'expand',
  'exportAction',
  'eye',
  'eyeClosed',
  'faceHappy',
  'faceNeutral',
  'faceSad',
  'filter',
  'folderClosed',
  'folderOpen',
  'fullScreen',
  'gear',
  'globe',
  'grab',
  'grid',
  'heatmap',
  'help',
  'iInCircle',
  'importAction',
  'indexClose',
  'indexEdit',
  'indexFlush',
  'indexMapping',
  'indexOpen',
  'indexSettings',
  'inspect',
  'invert',
  'inputOutput',
  'kqlField',
  'kqlOperand',
  'kqlValue',
  'kqlFunction',
  'kqlSelector',
  'link',
  'list',
  'listAdd',
  'lock',
  'lockOpen',
  'logstashFilter',
  'logstashIf',
  'logstashInput',
  'logstashOutput',
  'logstashQueue',
  'mapMarker',
  'merge',
  'memory',
  'minusInCircle',
  'node',
  'number',
  'offline',
  'online',
  'pause',
  'pencil',
  'pin',
  'play',
  'plusInCircle',
  'popout',
  'questionInCircle',
  'refresh',
  'save',
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
  'stop',
  'stopFilled',
  'storage',
  'string',
  'temperature',
  'tableOfContents',
  'tag',
  'tear',
  'trash',
  'user',
  'vector',
  'wrench',
  'visArea',
  'visBarHorizontal',
  'visBarVertical',
  'visControls',
  'visGauge',
  'visGoal',
  'visHeatmap',
  'visLine',
  'visMapCoordinate',
  'visMapRegion',
  'visMetric',
  'visPie',
  'visTable',
  'visTagCloud',
  'visText',
  'visTimelion',
  'visVega',
  'visVisualBuilder'
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
