import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiCopy,
  EuiCodeBlock,
  EuiSpacer,
} from '../../../../src/components';

export const iconTypes = [
  'accessibility',
  'aggregate',
  'analyzeEvent',
  'annotation',
  'anomalyChart',
  'anomalySwimLane',
  'apmTrace',
  'apps',
  'arrowDown',
  'arrowLeft',
  'arrowRight',
  'arrowUp',
  'arrowStart',
  'arrowEnd',
  'article',
  'asterisk',
  'at',
  'beaker',
  'bell',
  'bellSlash',
  'beta',
  'bolt',
  'boxesHorizontal',
  'boxesVertical',
  'branch',
  'branchUser',
  'broom',
  'brush',
  'bug',
  'bullseye',
  'calendar',
  'changePointDetection',
  'check',
  'checkInCircleFilled',
  'cheer',
  'clickLeft',
  'clickRight',
  'clock',
  'clockCounter',
  'cloudDrizzle',
  'cloudStormy',
  'cloudSunny',
  'cluster',
  'color',
  'compute',
  'console',
  'container',
  'continuityAbove',
  'continuityAboveBelow',
  'continuityBelow',
  'continuityWithin',
  'controlsHorizontal',
  'controlsVertical',
  'copy',
  'copyClipboard',
  'cross',
  'crosshairs',
  'currency',
  'cut',
  'database',
  'desktop',
  'discuss',
  'diff',
  'document',
  'documents',
  'documentEdit',
  'documentation',
  'dot',
  'dotInCircle',
  'doubleArrowLeft',
  'doubleArrowRight',
  'download',
  'email',
  'empty',
  'endpoint',
  'eql',
  'eraser',
  'error',
  'errorFilled',
  'esqlVis',
  'exit',
  'expand',
  'expandMini',
  'exportAction',
  'eye',
  'eyeClosed',
  'faceHappy',
  'faceNeutral',
  'faceSad',
  'fieldStatistics',
  'filter',
  'filterExclude',
  'filterIgnore',
  'filterInclude',
  'filterInCircle',
  'flag',
  'fold',
  'folderCheck',
  'folderClosed',
  'folderExclamation',
  'folderOpen',
  'frameNext',
  'framePrevious',
  'fullScreen',
  'fullScreenExit',
  'function',
  'gear',
  'glasses',
  'globe',
  'grab',
  'grabHorizontal',
  'grabOmnidirectional',
  'gradient',
  'grid',
  'heart',
  'heatmap',
  'help',
  'home',
  'iInCircle',
  'image',
  'importAction',
  'index',
  'indexClose',
  'indexEdit',
  'indexFlush',
  'indexMapping',
  'indexOpen',
  'indexRuntime',
  'indexSettings',
  'indexTemporary',
  'infinity',
  'inputOutput',
  'inspect',
  'invert',
  'ip',
  'key',
  'keyboard',
  'kqlField',
  'kqlFunction',
  'kqlOperand',
  'kqlSelector',
  'kqlValue',
  'kubernetesNode',
  'kubernetesPod',
  'launch',
  'layers',
  'lettering',
  'lineDashed',
  'lineDotted',
  'lineSolid',
  'link',
  'list',
  'listAdd',
  'lock',
  'lockOpen',
  'logPatternAnalysis',
  'logRateAnalysis',
  'logstashFilter',
  'logstashIf',
  'logstashInput',
  'logstashOutput',
  'logstashQueue',
  'magnifyWithExclamation',
  'magnifyWithMinus',
  'magnifyWithPlus',
  'magnet',
  'mapMarker',
  'memory',
  'merge',
  'menu',
  'menuDown',
  'menuLeft',
  'menuRight',
  'menuUp',
  'minimize',
  'minus',
  'minusInCircle',
  'minusInCircleFilled',
  'mobile',
  'moon',
  'move',
  'namespace',
  'nested',
  'newChat',
  'node',
  'number',
  'offline',
  'online',
  'package',
  'pageSelect',
  'pagesSelect',
  'palette',
  'paperClip',
  'partial',
  'pause',
  'payment',
  'pencil',
  'percent',
  'pin',
  'pinFilled',
  'pipeBreaks',
  'pipeNoBreaks',
  'pivot',
  'play',
  'playFilled',
  'plus',
  'plusInCircle',
  'plusInCircleFilled',
  'popout',
  'push',
  'questionInCircle',
  'quote',
  'refresh',
  'reporter',
  'returnKey',
  'save',
  'scale',
  'search',
  'securitySignal',
  'securitySignalDetected',
  'securitySignalResolved',
  'sessionViewer',
  'shard',
  'share',
  'singleMetricViewer',
  'snowflake',
  'sortable',
  'sortAscending',
  'sortDescending',
  'sortDown',
  'sortLeft',
  'sortRight',
  'sortUp',
  'spaces',
  'sparkles',
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
  'stopSlash',
  'storage',
  'string',
  'submodule',
  'sun',
  'symlink',
  'tableOfContents',
  'tableDensityExpanded',
  'tableDensityCompact',
  'tableDensityNormal',
  'tag',
  'tear',
  'temperature',
  'timeline',
  'timelineWithArrow',
  'timeRefresh',
  'timeslider',
  'training',
  'transitionLeftIn',
  'transitionLeftOut',
  'transitionTopIn',
  'transitionTopOut',
  'trash',
  'unfold',
  'unlink',
  'user',
  'userAvatar',
  'users',
  'vector',
  'videoPlayer',
  'visArea',
  'visAreaStacked',
  'visBarHorizontal',
  'visBarHorizontalStacked',
  'visBarVertical',
  'visBarVerticalStacked',
  'visGauge',
  'visGoal',
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
  'warning',
  'warningFilled',
  'wordWrap',
  'wordWrapDisabled',
  'wrench',
];

export default () => (
  <>
    <EuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<EuiIcon type="warning" />'}
    </EuiCodeBlock>
    <EuiSpacer />
    <EuiFlexGrid direction="row" columns={3}>
      {iconTypes.map((iconType) => (
        <EuiFlexItem key={iconType}>
          <EuiCopy
            display="block"
            textToCopy={iconType}
            afterMessage={`${iconType} copied`}
          >
            {(copy) => (
              <EuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                paddingSize="s"
              >
                <EuiIcon className="eui-alignMiddle" type={iconType} /> &emsp;{' '}
                <small>{iconType}</small>
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  </>
);
