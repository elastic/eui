/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import { createIconPropVisitors, replaceIconString } from '../utils/icon_props';

// Names no longer in EUI's icon map. `EuiIcon` treats them as image URLs and
// renders a broken image.
export const REMOVED_ICON_ALIASES = {
  anomalyChart: 'chartAnomaly',
  apmTrace: 'chartWaterfall',
  arrowDown: 'chevronSingleDown',
  arrowEnd: 'chevronLimitRight',
  arrowLeft: 'chevronSingleLeft',
  arrowRight: 'chevronSingleRight',
  arrowStart: 'chevronLimitLeft',
  arrowUp: 'chevronSingleUp',
  beaker: 'flask',
  boxesHorizontal: 'ellipsis',
  changePointDetection: 'chartChangePoint',
  checkInCircleFilled: 'checkCircleFill',
  cheer: 'popper',
  color: 'paintBucket',
  console: 'commandLine',
  contrastHigh: 'contrastFill',
  controlsHorizontal: 'controls',
  controlsVertical: 'controls',
  copyClipboard: 'copy',
  crossInCircle: 'crossCircle',
  crosshairs: 'crosshair',
  currency: 'money',
  cut: 'scissors',
  desktop: 'display',
  diff: 'compare',
  discuss: 'comment',
  documentEdit: 'pencil',
  doubleArrowLeft: 'chevronDoubleLeft',
  doubleArrowRight: 'chevronDoubleRight',
  editorAlignCenter: 'textAlignCenter',
  editorAlignLeft: 'textAlignLeft',
  editorAlignRight: 'textAlignRight',
  editorBold: 'textBold',
  editorChecklist: 'listCheck',
  editorCodeBlock: 'code',
  editorDistributeHorizontal: 'distributeHorizontal',
  editorDistributeVertical: 'distributeVertical',
  editorHeading: 'textHeading',
  editorItalic: 'textItalic',
  editorItemAlignBottom: 'alignBottom',
  editorItemAlignCenter: 'alignCenterHorizontal',
  editorItemAlignLeft: 'alignLeft',
  editorItemAlignMiddle: 'alignCenterVertical',
  editorItemAlignRight: 'alignRight',
  editorItemAlignTop: 'alignTop',
  editorLink: 'link',
  editorOrderedList: 'listNumber',
  editorPositionBottomLeft: 'alignBottomLeft',
  editorPositionBottomRight: 'alignBottomRight',
  editorPositionTopLeft: 'alignTopLeft',
  editorPositionTopRight: 'alignTopRight',
  editorRedo: 'redo',
  editorStrike: 'textStrike',
  editorTable: 'table',
  editorUnderline: 'textUnderline',
  editorUndo: 'undo',
  editorUnorderedList: 'listBullet',
  email: 'mail',
  eql: 'query',
  errorFilled: 'errorFill',
  exit: 'logOut',
  expand: 'maximize',
  expandMini: 'maximize',
  exportAction: 'upload',
  eyeClosed: 'eyeSlash',
  fieldStatistics: 'tableInfo',
  filterInCircle: 'filter',
  glasses: 'readOnly',
  grab: 'dragVertical',
  grabHorizontal: 'dragHorizontal',
  grabOmnidirectional: 'drag',
  heatmap: 'chartHeatmap',
  importAction: 'download',
  indexFlush: 'chartThreshold',
  indexMapping: 'mapping',
  indexTemporary: 'tableTime',
  invert: 'contrast',
  kqlField: 'queryField',
  kqlOperand: 'queryOperand',
  kqlSelector: 'querySelector',
  kqlValue: 'queryValue',
  launch: 'rocket',
  lettering: 'text',
  lineDashed: 'lineDash',
  lineDotted: 'lineDot',
  listAdd: 'plusCircle',
  logPatternAnalysis: 'pattern',
  logstashIf: 'if',
  logstashQueue: 'queue',
  magnifyWithExclamation: 'magnifyExclamation',
  magnifyWithMinus: 'magnifyMinus',
  magnifyWithPlus: 'magnifyPlus',
  minusInCircle: 'minusCircle',
  minusInCircleFilled: 'minusCircle',
  minusInSquare: 'minusSquare',
  newChat: 'plusCircle',
  node: 'vectorTriangle',
  offline: 'wifiSlash',
  online: 'wifi',
  pipeBreaks: 'lineBreak',
  pipeNoBreaks: 'lineBreakSlash',
  playFilled: 'play',
  plusInCircle: 'plusCircle',
  plusInCircleFilled: 'plusCircle',
  plusInSquare: 'plusSquare',
  popout: 'external',
  productRobot: 'productAgent',
  returnKey: 'return',
  securitySignal: 'radar',
  starFilledSpace: 'starFill',
  starMinusFilled: 'starFill',
  starPlusFilled: 'starFill',
  stopFilled: 'stopFill',
  streamsClassic: 'productStreamsClassic',
  streamsWired: 'productStreamsWired',
  submodule: 'merge',
  tableDensityCompact: 'tableDensityHigh',
  tableDensityExpanded: 'tableDensityLow',
  tableDensityNormal: 'table',
  timeRefresh: 'refreshTime',
  timeslider: 'clockControl',
  tokenDenseVector: 'tokenVectorDense',
  training: 'presentation',
  unlink: 'linkSlash',
  userAvatar: 'user',
  vector: 'vectorSquare',
  visAreaStacked: 'chartAreaStack',
  visBarHorizontal: 'chartBarHorizontal',
  visBarHorizontalStacked: 'chartBarHorizontalStack',
  visBarVerticalStacked: 'chartBarVerticalStack',
  visMapCoordinate: 'waypoint',
  visMapRegion: 'map',
  visMetric: 'chartMetric',
  visTagCloud: 'chartTagCloud',
  visText: 'text',
  visVega: 'code',
  warningFilled: 'warningFill',
} as const;

type RemovedIconAlias = keyof typeof REMOVED_ICON_ALIASES;

const isRemovedIconAlias = (value: string): value is RemovedIconAlias =>
  value in REMOVED_ICON_ALIASES;

export const NoRemovedIcons = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return createIconPropVisitors((node, iconType) => {
      if (!isRemovedIconAlias(iconType)) {
        return;
      }

      const replacement = REMOVED_ICON_ALIASES[iconType];

      context.report({
        node,
        messageId: 'removedIcon',
        data: { iconType, replacement },
        fix: (fixer) => replaceIconString(fixer, node, replacement),
      });
    });
  },
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow EUI icons that were removed and render broken.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      removedIcon:
        'Icon `{{iconType}}` was removed from EUI and renders as a broken image. Use `{{replacement}}` instead.',
    },
  },
  defaultOptions: [],
});
