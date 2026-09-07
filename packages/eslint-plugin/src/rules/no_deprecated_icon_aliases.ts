/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

export const DEPRECATED_ICON_ALIASES = {
  alert: 'warning',
  analyzeEvent: 'cube',
  anomalyChart: 'chartAnomaly',
  anomalySwimLane: 'chartHeatmap',
  annotation: 'flag',
  apps: 'grid',
  apmTrace: 'chartWaterfall',
  arrowDown: 'chevronSingleDown',
  arrowEnd: 'chevronLimitRight',
  arrowLeft: 'chevronSingleLeft',
  arrowRight: 'chevronSingleRight',
  arrowStart: 'chevronLimitLeft',
  arrowUp: 'chevronSingleUp',
  beaker: 'flask',
  boxesHorizontal: 'ellipsis',
  boxesVertical: 'ellipsis',
  changePointDetection: 'chartChangePoint',
  checkInCircleFilled: 'checkCircleFill',
  cheer: 'popper',
  cloudDrizzle: 'cloudRain',
  cloudStormy: 'cloudBolt',
  cloudSunny: 'cloudSun',
  color: 'paintBucket',
  compute: 'processor',
  console: 'commandLine',
  container: 'package',
  continuityAbove: 'upload',
  continuityWithin: 'maximize',
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
  documents: 'document',
  doubleArrowLeft: 'chevronDoubleLeft',
  doubleArrowRight: 'chevronDoubleRight',
  editorAlignCenter: 'textAlignCenter',
  editorAlignLeft: 'textAlignLeft',
  editorAlignRight: 'textAlignRight',
  editorBold: 'textBold',
  editorChecklist: 'listCheck',
  editorCodeBlock: 'code',
  editorComment: 'comment',
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
  esqlVis: 'query',
  errorFilled: 'errorFill',
  exit: 'logOut',
  expand: 'maximize',
  expandMini: 'maximize',
  export: 'upload',
  exportAction: 'upload',
  eyeClosed: 'eyeSlash',
  fieldStatistics: 'tableInfo',
  filterInCircle: 'filter',
  fold: 'minimize',
  folderCheck: 'check',
  folderClose: 'folder',
  folderClosed: 'folder',
  folderOpened: 'folderOpen',
  frameNext: 'chevronSingleRight',
  framePrevious: 'chevronSingleLeft',
  glasses: 'readOnly',
  help: 'question',
  grab: 'dragVertical',
  grabHorizontal: 'dragHorizontal',
  grabOmnidirectional: 'drag',
  heatmap: 'chartHeatmap',
  importAction: 'download',
  index: 'table',
  indexClose: 'tableCross',
  ip: 'tokenIP',
  indexEdit: 'tablePencil',
  indexFlush: 'chartThreshold',
  indexMapping: 'mapping',
  indexOpen: 'tablePlus',
  indexRuntime: 'tablePlay',
  indexSettings: 'tableGear',
  indexTemporary: 'tableTime',
  invert: 'contrast',
  kqlField: 'queryField',
  kqlFunction: 'push',
  kqlOperand: 'queryOperand',
  kqlSelector: 'querySelector',
  kqlValue: 'queryValue',
  kubernetesPod: 'cube',
  launch: 'rocket',
  lettering: 'text',
  lineDashed: 'lineDash',
  lineDotted: 'lineDot',
  list: 'listBullet',
  listAdd: 'plusCircle',
  logPatternAnalysis: 'pattern',
  logRateAnalysis: 'chartBarVertical',
  logstashFilter: 'filter',
  logstashIf: 'if',
  logstashInput: 'download',
  logstashOutput: 'upload',
  logstashQueue: 'queue',
  magnifyWithExclamation: 'magnifyExclamation',
  magnifyWithMinus: 'magnifyMinus',
  magnifyWithPlus: 'magnifyPlus',
  mapMarker: 'waypoint',
  menuDown: 'transitionBottomOut',
  menuUp: 'transitionTopOut',
  minusInCircle: 'minusCircle',
  minusInCircleFilled: 'minusCircle',
  minusInSquare: 'minusSquare',
  namespace: 'kubernetesNamespace',
  newChat: 'plusCircle',
  node: 'vectorTriangle',
  offline: 'wifiSlash',
  online: 'wifi',
  pagesSelect: 'documentsCheck',
  payment: 'money',
  pinFilled: 'pinFill',
  pipeBreaks: 'lineBreak',
  pipeNoBreaks: 'lineBreakSlash',
  playFilled: 'play',
  plusInCircle: 'plusCircle',
  plusInCircleFilled: 'plusCircle',
  plusInSquare: 'plusSquare',
  popout: 'external',
  productRobot: 'productAgent',
  returnKey: 'return',
  search: 'magnify',
  securitySignal: 'radar',
  sessionViewer: 'commandLine',
  singleMetricViewer: 'chartArea',
  spaces: 'grid',
  starEmpty: 'star',
  starEmptySpace: 'star',
  starFillSpace: 'starFill',
  starFilled: 'starFill',
  starFilledSpace: 'starFill',
  starMinusEmpty: 'star',
  starMinusFill: 'starFill',
  starMinusFilled: 'starFill',
  starPlusEmpty: 'star',
  starPlusFill: 'starFill',
  starPlusFilled: 'starFill',
  stopFilled: 'stopFill',
  stats: 'chartLine',
  streamsClassic: 'productStreamsClassic',
  streamsWired: 'productStreamsWired',
  string: 'tokenString',
  submodule: 'merge',
  tableOfContents: 'listBullet',
  tableDensityCompact: 'tableDensityHigh',
  tableDensityExpanded: 'tableDensityLow',
  tableDensityNormal: 'table',
  temperature: 'thermometer',
  timeRefresh: 'refreshTime',
  timelineWithArrow: 'timelinePointer',
  timeslider: 'clockControl',
  tokenDenseVector: 'tokenVectorDense',
  training: 'presentation',
  unfold: 'maximize',
  unlink: 'linkSlash',
  userAvatar: 'user',
  vector: 'vectorSquare',
  visArea: 'chartArea',
  visAreaStacked: 'chartAreaStack',
  visBarHorizontal: 'chartBarHorizontal',
  visBarHorizontalStacked: 'chartBarHorizontalStack',
  visBarVertical: 'chartBarVertical',
  visBarVerticalStacked: 'chartBarVerticalStack',
  visGauge: 'chartGauge',
  visGoal: 'chartGauge',
  visLine: 'chartLine',
  visMapCoordinate: 'waypoint',
  visMapRegion: 'map',
  visMetric: 'chartMetric',
  visPie: 'chartPie',
  visTable: 'table',
  visTagCloud: 'chartTagCloud',
  visText: 'text',
  visTimelion: 'productTimelion',
  visVega: 'code',
  visVisualBuilder: 'productTSVB',
  warningFilled: 'warningFill',
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
  stopFill:
    'Use `EuiColorPickerSwatch` for a color chip or `stop` otherwise.',
  stopSlash:
    'Use `EuiColorPickerSwatch` for no/transparent color or `stop` otherwise.',
} as const;

type DeprecatedIconAlias = keyof typeof DEPRECATED_ICON_ALIASES;
type DeprecatedIconWithGuidance = keyof typeof DEPRECATED_ICONS_WITH_GUIDANCE;

const isDeprecatedIconWithGuidance = (
  value: string
): value is DeprecatedIconWithGuidance =>
  value in DEPRECATED_ICONS_WITH_GUIDANCE;

type StaticStringNode = TSESTree.Literal | TSESTree.TemplateLiteral;

const getComponentName = (
  node: TSESTree.JSXOpeningElement
): string | undefined =>
  node.name.type === 'JSXIdentifier' ? node.name.name : undefined;

const COMPONENT_ICON_ATTRIBUTES: Readonly<Record<string, ReadonlySet<string>>> =
  {
    EuiCommentTimeline: new Set(['timelineAvatar']),
    EuiFormAppend: new Set(['iconLeft', 'iconRight']),
    EuiFormAppendPrepend: new Set(['iconLeft', 'iconRight']),
    EuiFormPrepend: new Set(['iconLeft', 'iconRight']),
    EuiLoadingLogo: new Set(['logo']),
    EuiTimelineItem: new Set(['icon']),
  };

const isIconAttribute = (
  attributeName: string,
  importedComponentName: string
): boolean => {
  const normalizedName = attributeName.toLowerCase();

  return (
    normalizedName.endsWith('icontype') ||
    COMPONENT_ICON_ATTRIBUTES[importedComponentName]?.has(attributeName) ===
      true ||
    (normalizedName === 'type' &&
      (importedComponentName === 'EuiIcon' ||
        importedComponentName === 'EuiIconTip'))
  );
};

const getStaticStringNode = (
  node: TSESTree.JSXAttribute
): StaticStringNode | undefined => {
  if (node.value?.type === 'Literal' && typeof node.value.value === 'string') {
    return node.value;
  }

  if (node.value?.type !== 'JSXExpressionContainer') {
    return;
  }

  const { expression } = node.value;

  if (expression.type === 'Literal' && typeof expression.value === 'string') {
    return expression;
  }

  if (
    expression.type === 'TemplateLiteral' &&
    expression.expressions.length === 0
  ) {
    return expression;
  }
};

const getStaticStringValue = (node: StaticStringNode): string | undefined => {
  if (node.type === 'Literal') {
    return typeof node.value === 'string' ? node.value : undefined;
  }

  return node.quasis[0]?.value.cooked ?? undefined;
};

const isDeprecatedIconAlias = (value: string): value is DeprecatedIconAlias =>
  value in DEPRECATED_ICON_ALIASES;

export const NoDeprecatedIconAliases = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const euiComponentImports = new Map<string, string>();

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        if (
          typeof node.source.value !== 'string' ||
          (node.source.value !== '@elastic/eui' &&
            !node.source.value.startsWith('@elastic/eui/'))
        ) {
          return;
        }

        for (const specifier of node.specifiers) {
          if (specifier.type !== 'ImportSpecifier') {
            continue;
          }

          const importedName =
            specifier.imported.type === 'Identifier'
              ? specifier.imported.name
              : specifier.imported.value;

          if (importedName.startsWith('Eui')) {
            euiComponentImports.set(specifier.local.name, importedName);
          }
        }
      },
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (node.name.type !== 'JSXIdentifier') {
          return;
        }

        const openingElement = node.parent;
        const localComponentName =
          openingElement.type === 'JSXOpeningElement'
            ? getComponentName(openingElement)
            : undefined;
        const importedComponentName = localComponentName
          ? euiComponentImports.get(localComponentName)
          : undefined;

        if (
          !importedComponentName ||
          !isIconAttribute(node.name.name, importedComponentName)
        ) {
          return;
        }

        const staticStringNode = getStaticStringNode(node);
        if (!staticStringNode) {
          return;
        }

        const iconType = getStaticStringValue(staticStringNode);
        if (!iconType) {
          return;
        }

        if (!isDeprecatedIconAlias(iconType)) {
          if (isDeprecatedIconWithGuidance(iconType)) {
            context.report({
              node: staticStringNode,
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
              node: staticStringNode,
              messageId: 'deprecatedIcon',
              data: { iconType },
            });
          }
          return;
        }

        const replacement = DEPRECATED_ICON_ALIASES[iconType];

        context.report({
          node: staticStringNode,
          messageId: 'deprecatedIconAlias',
          data: { alias: iconType, replacement },
          fix(fixer) {
            const sourceText = context.sourceCode.getText(staticStringNode);
            const quote = sourceText[0];

            return fixer.replaceText(
              staticStringNode,
              `${quote}${replacement}${quote}`
            );
          },
        });
      },
    };
  },
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow deprecated EUI icons in JSX icon props.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      deprecatedIcon:
        'Icon `{{iconType}}` is deprecated and has no direct replacement.',
      deprecatedIconAlias:
        'Icon alias `{{alias}}` is deprecated. Use `{{replacement}}` instead.',
      deprecatedIconGuidance:
        'Icon `{{iconType}}` is deprecated. {{guidance}}',
    },
  },
  defaultOptions: [],
});
