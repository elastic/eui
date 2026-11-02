/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import { createIconPropVisitors, replaceIconString } from '../utils/icon_props';

export const DEPRECATED_ICON_ALIASES = {
  alert: 'warning',
  analyzeEvent: 'cube',
  anomalySwimLane: 'chartHeatmap',
  annotation: 'flag',
  apps: 'grid',
  boxesVertical: 'ellipsis',
  cloudDrizzle: 'cloudRain',
  cloudStormy: 'cloudBolt',
  cloudSunny: 'cloudSun',
  compute: 'processor',
  container: 'package',
  continuityAbove: 'upload',
  continuityWithin: 'maximize',
  documents: 'document',
  editorComment: 'comment',
  esqlVis: 'query',
  export: 'upload',
  fold: 'minimize',
  folderCheck: 'check',
  folderClose: 'folder',
  folderClosed: 'folder',
  folderOpened: 'folderOpen',
  frameNext: 'chevronSingleRight',
  framePrevious: 'chevronSingleLeft',
  help: 'question',
  index: 'table',
  indexClose: 'tableCross',
  ip: 'tokenIP',
  indexEdit: 'tablePencil',
  indexOpen: 'tablePlus',
  indexRuntime: 'tablePlay',
  indexSettings: 'tableGear',
  kqlFunction: 'push',
  kubernetesPod: 'cube',
  list: 'listBullet',
  logRateAnalysis: 'chartBarVertical',
  logstashFilter: 'filter',
  logstashInput: 'download',
  logstashOutput: 'upload',
  mapMarker: 'waypoint',
  menuDown: 'transitionBottomOut',
  menuUp: 'transitionTopOut',
  namespace: 'kubernetesNamespace',
  pagesSelect: 'documentsCheck',
  payment: 'money',
  pinFilled: 'pinFill',
  search: 'magnify',
  sessionViewer: 'commandLine',
  singleMetricViewer: 'chartArea',
  spaces: 'grid',
  starEmpty: 'star',
  starEmptySpace: 'star',
  starFillSpace: 'starFill',
  starFilled: 'starFill',
  starMinusEmpty: 'star',
  starMinusFill: 'starFill',
  starPlusEmpty: 'star',
  starPlusFill: 'starFill',
  stats: 'chartLine',
  string: 'tokenString',
  tableOfContents: 'listBullet',
  temperature: 'thermometer',
  timelineWithArrow: 'timelinePointer',
  unfold: 'maximize',
  visArea: 'chartArea',
  visBarVertical: 'chartBarVertical',
  visGauge: 'chartGauge',
  visGoal: 'chartGauge',
  visLine: 'chartLine',
  visPie: 'chartPie',
  visTable: 'table',
  visTimelion: 'productTimelion',
  visVisualBuilder: 'productTSVB',
  wordWrap: 'lineBreak',
  wordWrapDisabled: 'lineBreakSlash',
} as const;

export const DEPRECATED_ICONS_WITHOUT_REPLACEMENT: ReadonlySet<string> =
  new Set([
    'article',
    'dotInCircle',
    'kubernetesNode',
    'mobile',
    'scale',
    'securitySignalDetected',
  ]);

export const DEPRECATED_ICONS_WITH_GUIDANCE = {
  folderExclamation:
    'Use `linkSlash` for unlink actions or `hourglass` for Kibana Cases status.',
  stopFill: 'Use `EuiColorPickerSwatch` for a color chip or `stop` otherwise.',
  stopSlash:
    'Use `EuiColorPickerSwatch` for no/transparent color or `stop` otherwise.',
} as const;

type DeprecatedIconAlias = keyof typeof DEPRECATED_ICON_ALIASES;
type DeprecatedIconWithGuidance = keyof typeof DEPRECATED_ICONS_WITH_GUIDANCE;

const isDeprecatedIconWithGuidance = (
  value: string
): value is DeprecatedIconWithGuidance =>
  value in DEPRECATED_ICONS_WITH_GUIDANCE;

const isDeprecatedIconAlias = (value: string): value is DeprecatedIconAlias =>
  value in DEPRECATED_ICON_ALIASES;

export const NoDeprecatedIconAliases = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return createIconPropVisitors((node, iconType) => {
      if (!isDeprecatedIconAlias(iconType)) {
        if (isDeprecatedIconWithGuidance(iconType)) {
          context.report({
            node,
            messageId: 'deprecatedIconGuidance',
            data: {
              iconType,
              guidance: DEPRECATED_ICONS_WITH_GUIDANCE[iconType],
            },
          });
          return;
        }

        if (DEPRECATED_ICONS_WITHOUT_REPLACEMENT.has(iconType)) {
          context.report({
            node,
            messageId: 'deprecatedIcon',
            data: { iconType },
          });
        }
        return;
      }

      const replacement = DEPRECATED_ICON_ALIASES[iconType];

      context.report({
        node,
        messageId: 'deprecatedIconAlias',
        data: { alias: iconType, replacement },
        fix: (fixer) => replaceIconString(fixer, node, replacement),
      });
    });
  },
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow deprecated EUI icons in icon props.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      deprecatedIcon:
        'Icon `{{iconType}}` is deprecated and has no direct replacement.',
      deprecatedIconAlias:
        'Icon alias `{{alias}}` is deprecated. Use `{{replacement}}` instead.',
      deprecatedIconGuidance: 'Icon `{{iconType}}` is deprecated. {{guidance}}',
    },
  },
  defaultOptions: [],
});
