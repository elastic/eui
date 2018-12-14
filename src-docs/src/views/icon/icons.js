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
  'crossInACircleFilled',
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
  'editorOrderedList',
  'editorRedo',
  'editorStrike',
  'editorTable',
  'editorUnderline',
  'editorUndo',
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
  'grabHorizontal',
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
  'inputOutput',
  'inspect',
  'invert',
  'kqlField',
  'kqlFunction',
  'kqlOperand',
  'kqlSelector',
  'kqlValue',
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
  'memory',
  'merge',
  'minusInCircle',
  'minusInCircleFilled',
  'node',
  'number',
  'offline',
  'online',
  'pause',
  'pencil',
  'pin',
  'play',
  'plusInCircle',
  'plusInCircleFilled',
  'popout',
  'questionInCircle',
  'refresh',
  'save',
  'scale',
  'search',
  'shard',
  'share',
  'sortable',
  'sortDown',
  'sortLeft',
  'sortRight',
  'sortUp',
  'starEmpty',
  'starEmptySpace',
  'starFilled',
  'starFilledSpace',
  'starMinusEmpty',
  'starMinusFilled',
  'starPlusEmpty',
  'starPlusFilled',
  'stats',
  'stop',
  'stopFilled',
  'storage',
  'string',
  'tableOfContents',
  'tag',
  'tear',
  'temperature',
  'trash',
  'unpin',
  'user',
  'vector',
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
  'visVisualBuilder',
  'wrench',
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
