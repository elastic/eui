/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ComponentType } from 'react';

type IconImportLoader = () => Promise<{ icon: ComponentType }>;

export type IconCategory =
  | 'glyph'
  | 'app'
  | 'elasticLogo'
  | 'thirdPartyLogo'
  | 'ml'
  | 'token';

type IconMetadata = {
  category?: IconCategory;
  synonyms?: string[];
};

type IconImportLoaderWithMetadata = IconImportLoader & {
  metadata?: IconMetadata;
};

const withMetadata = (
  loader: IconImportLoader,
  metadata: IconMetadata = {}
): IconImportLoaderWithMetadata => Object.assign(loader, { metadata });

export const typeToPathMap = {
  accessibility: withMetadata(() => import('./assets/accessibility'), {
    synonyms: [
      'a11y',
      'inclusive',
      'disability',
      'wcag',
      'assistive',
      'screen reader',
      'universal design',
    ],
  }),
  addDataApp: withMetadata(() => import('./assets/app_add_data'), {
    category: 'app',
  }),
  addToChat: () => import('./assets/add_to_chat'),
  addToDashboard: withMetadata(() => import('./assets/add_to_dashboard'), {
    synonyms: [
      'dashboard',
      'add',
      'pin',
      'widget',
      'panel',
      'insert',
      'save view',
    ],
  }),
  advancedSettingsApp: withMetadata(
    () => import('./assets/app_advanced_settings'),
    { category: 'app' }
  ),
  agentApp: withMetadata(() => import('./assets/app_fleet'), {
    category: 'app',
  }),
  aggregate: withMetadata(() => import('./assets/aggregate'), {
    synonyms: [
      'combine',
      'sum',
      'group',
      'collection',
      'merge',
      'total',
      'rollup',
    ],
  }),
  alignBottom: withMetadata(() => import('./assets/align_bottom'), {
    synonyms: ['align', 'bottom', 'vertical', 'position', 'layout', 'dock'],
  }),
  alignBottomLeft: withMetadata(() => import('./assets/align_bottom_left'), {
    synonyms: ['align', 'bottom', 'left', 'corner', 'position', 'layout'],
  }),
  alignBottomRight: withMetadata(() => import('./assets/align_bottom_right'), {
    synonyms: ['align', 'bottom', 'right', 'corner', 'position', 'layout'],
  }),
  alignCenterHorizontal: withMetadata(
    () => import('./assets/align_center_horizontal'),
    {
      synonyms: [
        'align',
        'center',
        'horizontal',
        'middle',
        'position',
        'layout',
      ],
    }
  ),
  alignCenterVertical: withMetadata(
    () => import('./assets/align_center_vertical'),
    {
      synonyms: ['align', 'center', 'vertical', 'middle', 'position', 'layout'],
    }
  ),
  alignLeft: withMetadata(() => import('./assets/align_left'), {
    synonyms: ['align', 'left', 'horizontal', 'position', 'layout', 'flush'],
  }),
  alignRight: withMetadata(() => import('./assets/align_right'), {
    synonyms: ['align', 'right', 'horizontal', 'position', 'layout', 'flush'],
  }),
  alignTop: withMetadata(() => import('./assets/align_top'), {
    synonyms: ['align', 'top', 'vertical', 'position', 'layout', 'dock'],
  }),
  alignTopLeft: withMetadata(() => import('./assets/align_top_left'), {
    synonyms: ['align', 'top', 'left', 'corner', 'position', 'layout'],
  }),
  alignTopRight: withMetadata(() => import('./assets/align_top_right'), {
    synonyms: ['align', 'top', 'right', 'corner', 'position', 'layout'],
  }),
  analyzeEvent: () => import('./assets/analyze_event'), // Deprecated in favor of `cube`
  annotation: () => import('./assets/annotation'), // Deprecated in favor of `flag`
  chartAnomaly: withMetadata(() => import('./assets/chart_anomaly'), {
    synonyms: ['anomaly', 'chart', 'outlier', 'detection', 'spike', 'unusual'],
  }),
  anomalySwimLane: () => import('./assets/anomaly_swim_lane'), // Deprecated in favor of `chartHeatmap`
  apmApp: withMetadata(() => import('./assets/app_apm'), { category: 'app' }),
  chartWaterfall: withMetadata(() => import('./assets/chart_waterfall'), {
    synonyms: [
      'waterfall chart',
      'cascade',
      'steps',
      'bridge',
      'cumulative',
      'breakdown',
    ],
  }),
  appSearchApp: withMetadata(() => import('./assets/app_app_search'), {
    category: 'app',
  }),
  apps: () => import('./assets/apps'), // Deprecated in favor of `grid`
  chevronSingleDown: withMetadata(
    () => import('./assets/chevron_single_down'),
    { synonyms: ['chevron', 'down', 'dropdown', 'expand', 'arrow', 'caret'] }
  ),
  chevronSingleLeft: withMetadata(
    () => import('./assets/chevron_single_left'),
    { synonyms: ['chevron', 'left', 'back', 'previous', 'arrow', 'caret'] }
  ),
  chevronSingleRight: withMetadata(
    () => import('./assets/chevron_single_right'),
    { synonyms: ['chevron', 'right', 'next', 'forward', 'arrow', 'caret'] }
  ),
  chevronSingleUp: withMetadata(() => import('./assets/chevron_single_up'), {
    synonyms: ['chevron', 'up', 'collapse', 'arrow', 'caret'],
  }),
  chevronLimitLeft: withMetadata(() => import('./assets/chevron_limit_left'), {
    synonyms: [
      'chevron',
      'limit',
      'first',
      'start',
      'beginning',
      'jump',
      'skip',
    ],
  }),
  chevronLimitRight: withMetadata(
    () => import('./assets/chevron_limit_right'),
    { synonyms: ['chevron', 'limit', 'last', 'end', 'final', 'jump', 'skip'] }
  ),
  asterisk: withMetadata(() => import('./assets/asterisk'), {
    synonyms: [
      'star',
      'wildcard',
      'required',
      'multiply',
      'reference',
      'footnote',
    ],
  }),
  at: withMetadata(() => import('./assets/at'), {
    synonyms: ['email', 'mention', 'address', 'symbol', 'contact', 'handle'],
  }),
  archive: withMetadata(() => import('./assets/archive'), {
    synonyms: [
      'storage',
      'box',
      'store',
      'backup',
      'file away',
      'saved',
      'repository',
    ],
  }),
  axisX: withMetadata(() => import('./assets/axis_x'), {
    synonyms: [
      'x axis',
      'horizontal axis',
      'chart',
      'graph',
      'dimension',
      'abscissa',
    ],
  }),
  axisYLeft: withMetadata(() => import('./assets/axis_y_left'), {
    synonyms: ['y axis', 'left', 'vertical axis', 'chart', 'graph', 'ordinate'],
  }),
  axisYRight: withMetadata(() => import('./assets/axis_y_right'), {
    synonyms: [
      'y axis',
      'right',
      'vertical axis',
      'chart',
      'graph',
      'ordinate',
    ],
  }),
  auditbeatApp: withMetadata(() => import('./assets/app_auditbeat'), {
    category: 'app',
  }),
  backgroundTask: withMetadata(() => import('./assets/background_task'), {
    synonyms: [
      'background',
      'async',
      'job',
      'task',
      'process',
      'worker',
      'queue',
    ],
  }),
  bell: withMetadata(() => import('./assets/bell'), {
    synonyms: [
      'notification',
      'alert',
      'alarm',
      'notify',
      'ring',
      'reminder',
      'announcements',
    ],
  }),
  bellSlash: withMetadata(() => import('./assets/bell_slash'), {
    synonyms: [
      'mute',
      'notification off',
      'silence',
      'bell disabled',
      'alerts off',
      'quiet',
    ],
  }),
  beta: withMetadata(() => import('./assets/beta'), {
    synonyms: ['greek', 'test', 'experimental', 'preview', 'version', 'letter'],
  }),
  bolt: withMetadata(() => import('./assets/bolt'), {
    synonyms: [
      'lightning',
      'fast',
      'power',
      'electric',
      'speed',
      'energy',
      'thunder',
      'storm',
      'serverless',
    ],
  }),
  boxesVertical: () => import('./assets/boxes_vertical'), // Deprecated in favor of `ellipsis`
  branch: withMetadata(() => import('./assets/branch'), {
    synonyms: ['git', 'version control', 'fork', 'tree', 'split', 'divergence'],
  }),
  briefcase: withMetadata(() => import('./assets/briefcase'), {
    synonyms: ['work', 'business', 'job', 'portfolio', 'office', 'career'],
  }),
  broom: withMetadata(() => import('./assets/broom'), {
    synonyms: ['clean', 'sweep', 'clear', 'tidy', 'wipe', 'brush off'],
  }),
  brush: withMetadata(() => import('./assets/brush'), {
    synonyms: ['paint', 'draw', 'art', 'design', 'stroke', 'brush tool'],
  }),
  bug: withMetadata(() => import('./assets/bug'), {
    synonyms: ['insect', 'defect', 'issue', 'error', 'debug', 'glitch'],
  }),
  bulb: withMetadata(() => import('./assets/bulb'), {
    synonyms: ['light', 'idea', 'lamp', 'insight', 'bright', 'hint'],
  }),
  bullseye: withMetadata(() => import('./assets/bullseye'), {
    synonyms: [
      'findings',
      'target',
      'aim',
      'goal',
      'focus',
      'dartboard',
      'precision',
      'center',
    ],
  }),
  calendar: withMetadata(() => import('./assets/calendar'), {
    synonyms: ['date', 'schedule', 'event', 'day', 'month', 'time'],
  }),
  canvasApp: withMetadata(() => import('./assets/app_canvas'), {
    category: 'app',
  }),
  casesApp: withMetadata(() => import('./assets/app_cases'), {
    category: 'app',
  }),
  chartChangePoint: withMetadata(() => import('./assets/chart_change_point'), {
    synonyms: [
      'change point',
      'chart',
      'breakpoint',
      'shift',
      'detection',
      'regime',
    ],
  }),
  chartArea: withMetadata(() => import('./assets/chart_area'), {
    synonyms: [
      'area chart',
      'graph',
      'visualization',
      'filled',
      'trend',
      'plot',
    ],
  }),
  visArea: () => import('./assets/chart_area'), // Deprecated in favor of `chartArea`
  chartAreaStack: withMetadata(() => import('./assets/chart_area_stack'), {
    synonyms: [
      'stacked area',
      'chart',
      'graph',
      'layers',
      'visualization',
      'plot',
    ],
  }),
  chartBarHorizontal: withMetadata(
    () => import('./assets/chart_bar_horizontal'),
    {
      synonyms: [
        'bar chart',
        'horizontal',
        'graph',
        'bars',
        'visualization',
        'plot',
      ],
    }
  ),
  chartBarHorizontalStack: withMetadata(
    () => import('./assets/chart_bar_horizontal_stack'),
    {
      synonyms: [
        'stacked bar',
        'horizontal',
        'chart',
        'graph',
        'grouped',
        'plot',
      ],
    }
  ),
  chartBarVertical: withMetadata(() => import('./assets/chart_bar_vertical'), {
    synonyms: [
      'bar chart',
      'vertical',
      'graph',
      'columns',
      'visualization',
      'plot',
    ],
  }),
  visBarVertical: () => import('./assets/chart_bar_vertical'), // Deprecated in favor of `chartBarVertical`
  chartBarVerticalStack: withMetadata(
    () => import('./assets/chart_bar_vertical_stack'),
    {
      synonyms: [
        'stacked bar',
        'vertical',
        'chart',
        'graph',
        'grouped',
        'plot',
      ],
    }
  ),
  chartGauge: withMetadata(() => import('./assets/chart_gauge'), {
    synonyms: ['gauge', 'meter', 'dial', 'chart', 'metric', 'speedometer'],
  }),
  visGauge: () => import('./assets/chart_gauge'), // Deprecated in favor of `chartGauge`
  chartHeatmap: withMetadata(() => import('./assets/chart_heatmap'), {
    synonyms: ['heatmap', 'matrix', 'density', 'chart', 'grid', 'correlation'],
  }),
  chartLine: withMetadata(() => import('./assets/chart_line'), {
    synonyms: [
      'line chart',
      'graph',
      'trend',
      'visualization',
      'plot',
      'time series',
    ],
  }),
  visLine: () => import('./assets/chart_line'), // Deprecated in favor of `chartLine`
  chartPie: withMetadata(() => import('./assets/chart_pie'), {
    synonyms: [
      'pie chart',
      'donut',
      'proportion',
      'circle',
      'segments',
      'share',
    ],
  }),
  visPie: () => import('./assets/chart_pie'), // Deprecated in favor of `chartPie`
  chartTagCloud: withMetadata(() => import('./assets/chart_tag_cloud'), {
    synonyms: [
      'tag cloud',
      'word cloud',
      'text',
      'chart',
      'keywords',
      'frequency',
    ],
  }),
  chartThreshold: withMetadata(() => import('./assets/chart_threshold'), {
    synonyms: [
      'threshold',
      'limit',
      'chart',
      'boundary',
      'alert line',
      'cutoff',
    ],
  }),
  check: withMetadata(() => import('./assets/check'), {
    synonyms: ['tick', 'confirm', 'done', 'yes', 'approve', 'mark'],
  }),
  checkCircle: withMetadata(() => import('./assets/check_circle'), {
    synonyms: ['check', 'circle', 'success', 'confirm', 'complete', 'ok'],
  }),
  checkCircleFill: withMetadata(() => import('./assets/check_circle_fill'), {
    synonyms: ['check', 'filled', 'success', 'confirm', 'complete', 'ok'],
  }),
  popper: withMetadata(() => import('./assets/popper'), {
    synonyms: ['popper', 'tooltip', 'overlay', 'popup', 'floating'],
  }),
  classificationJob: withMetadata(
    () => import('./assets/ml_classification_job'),
    { category: 'ml' }
  ),
  clickLeft: withMetadata(() => import('./assets/click_left'), {
    synonyms: ['click', 'left', 'mouse', 'pointer', 'button', 'tap'],
  }),
  clickRight: withMetadata(() => import('./assets/click_right'), {
    synonyms: ['click', 'right', 'mouse', 'context', 'button', 'tap'],
  }),
  clock: withMetadata(() => import('./assets/clock'), { synonyms: ['clock'] }),
  clockCounter: withMetadata(() => import('./assets/clock_counter'), {
    synonyms: ['clock', 'counter', 'countdown', 'timer', 'time', 'elapsed'],
  }),
  clockControl: withMetadata(() => import('./assets/clock_control'), {
    synonyms: ['clock', 'control', 'time', 'schedule', 'timer', 'settings'],
  }),
  cloud: withMetadata(() => import('./assets/cloud'), {
    synonyms: ['cloud', 'online', 'hosting', 'saas', 'remote'],
  }),
  cloudBolt: withMetadata(() => import('./assets/cloud_bolt'), {
    synonyms: [
      'cloud',
      'online',
      'hosting',
      'saas',
      'remote',
      'lightning',
      'thunder',
      'storm',
      'status',
      'fast',
      'power',
      'electric',
      'speed',
      'energy',
    ],
  }),
  cloudDrizzle: () => import('./assets/cloud_rain'), // Deprecated in favor of `cloudRain`
  cloudRain: withMetadata(() => import('./assets/cloud_rain'), {
    synonyms: [
      'cloud',
      'online',
      'hosting',
      'saas',
      'remote',
      'rain',
      'precipitation',
      'storm',
      'status',
    ],
  }),
  cloudStormy: () => import('./assets/cloud_bolt'), // Deprecated in favor of `cloudBolt`
  cloudSun: withMetadata(() => import('./assets/cloud_sun'), {
    synonyms: [
      'cloud',
      'online',
      'hosting',
      'saas',
      'remote',
      'sun',
      'shine',
      'overcast',
      'status',
      'light',
      'day',
      'theme',
      'bright',
    ],
  }),
  cloudSunny: () => import('./assets/cloud_sun'), // Deprecated in favor of `cloudSun`
  cluster: withMetadata(() => import('./assets/cluster'), {
    synonyms: ['cluster', 'nodes', 'group', 'collection', 'distributed'],
  }),
  code: withMetadata(() => import('./assets/code'), {
    synonyms: ['code', 'developer', 'programming', 'script', 'source'],
  }),
  codeApp: withMetadata(() => import('./assets/app_code'), { category: 'app' }),
  paintBucket: withMetadata(() => import('./assets/paint_bucket'), {
    synonyms: ['paint', 'fill', 'bucket', 'color', 'flood fill'],
  }),
  commandLine: withMetadata(() => import('./assets/command_line'), {
    synonyms: ['terminal', 'cli', 'console', 'shell', 'command', 'prompt'],
  }),
  comment: withMetadata(() => import('./assets/comment'), {
    synonyms: ['comment', 'chat', 'message', 'feedback', 'discussion'],
  }),
  editorComment: () => import('./assets/comment'), // Deprecated in favor of `comment`
  compare: withMetadata(() => import('./assets/compare'), {
    synonyms: ['compare', 'diff', 'versus', 'side by side'],
  }),
  processor: withMetadata(() => import('./assets/processor'), {
    synonyms: ['processor', 'compute', 'cpu', 'transform', 'ingest'],
  }),
  compute: () => import('./assets/processor'), // Deprecated in favor of `processor`
  consoleApp: withMetadata(() => import('./assets/app_console'), {
    category: 'app',
  }),
  container: () => import('./assets/container'), // Deprecated in favor of `package`
  continuityAbove: () => import('./assets/continuity_above'), // Deprecated in favor of `upload`
  continuityWithin: () => import('./assets/continuity_within'), // Deprecated in favor of `maximize`
  contrast: withMetadata(() => import('./assets/contrast'), {
    synonyms: ['contrast', 'accessibility', 'visibility', 'a11y'],
  }),
  contrastFill: withMetadata(() => import('./assets/contrast_fill'), {
    synonyms: [
      'contrast',
      'filled',
      'accessibility',
      'visibility',
      'a11y',
      'display',
    ],
  }),
  controls: withMetadata(() => import('./assets/controls'), {
    synonyms: ['controls', 'sliders', 'settings', 'adjust', 'panel'],
  }),
  copy: withMetadata(() => import('./assets/copy'), {
    synonyms: ['duplicate', 'clone', 'clipboard', 'replicate', 'paste'],
  }),
  crossProjectSearch: withMetadata(
    () => import('./assets/cross_project_search'),
    {
      synonyms: [
        'search',
        'cross project',
        'global',
        'find',
        'lookup',
        'explore',
      ],
    }
  ),
  createAdvancedJob: withMetadata(
    () => import('./assets/ml_create_advanced_job'),
    { category: 'ml' }
  ),
  createGenericJob: withMetadata(
    () => import('./assets/ml_create_generic_job'),
    { category: 'ml' }
  ),
  createGeoJob: withMetadata(() => import('./assets/ml_create_geo_job'), {
    category: 'ml',
  }),
  createMultiMetricJob: withMetadata(
    () => import('./assets/ml_create_multi_metric_job'),
    { category: 'ml' }
  ),
  createPopulationJob: withMetadata(
    () => import('./assets/ml_create_population_job'),
    { category: 'ml' }
  ),
  createSingleMetricJob: withMetadata(
    () => import('./assets/ml_create_single_metric_job'),
    { category: 'ml' }
  ),
  cross: withMetadata(() => import('./assets/cross'), {
    synonyms: ['cross', 'close', 'cancel', 'delete'],
  }),
  crossClusterReplicationApp: withMetadata(
    () => import('./assets/app_cross_cluster_replication'),
    { category: 'app' }
  ),
  crossCircle: withMetadata(() => import('./assets/cross_circle'), {
    synonyms: ['cross circle', 'cross', 'close', 'cancel', 'delete', 'circle'],
  }),
  crosshair: withMetadata(() => import('./assets/crosshair'), {
    synonyms: ['crosshair'],
  }),
  cursorDefault: withMetadata(() => import('./assets/cursor_default'), {
    synonyms: ['cursor', 'ui'],
  }),
  money: withMetadata(() => import('./assets/money'), {
    synonyms: ['money', 'payment', 'billing', 'cost', 'finance', 'currency'],
  }),
  scissors: withMetadata(() => import('./assets/scissors'), {
    synonyms: ['scissors'],
  }),
  dashboardApp: withMetadata(() => import('./assets/app_dashboard'), {
    category: 'app',
  }),
  dashedCircle: withMetadata(() => import('./assets/dashed_circle'), {
    synonyms: [
      'dashed',
      'circle',
      'pending',
      'incomplete',
      'outline',
      'status',
    ],
  }),
  dataVisualizer: withMetadata(() => import('./assets/ml_data_visualizer'), {
    category: 'ml',
  }),
  database: withMetadata(() => import('./assets/database'), {
    synonyms: ['database', 'data', 'storage', 'sql', 'records'],
  }),
  display: withMetadata(() => import('./assets/display'), {
    synonyms: ['display', 'desktop'],
  }),
  devToolsApp: withMetadata(() => import('./assets/app_devtools'), {
    category: 'app',
  }),
  discoverApp: withMetadata(() => import('./assets/app_discover'), {
    category: 'app',
  }),
  distributeHorizontal: withMetadata(
    () => import('./assets/distribute_horizontal'),
    { synonyms: ['distribute horizontal', 'distribute', 'horizontal'] }
  ),
  distributeVertical: withMetadata(
    () => import('./assets/distribute_vertical'),
    { synonyms: ['distribute vertical', 'distribute', 'vertical'] }
  ),
  download: withMetadata(() => import('./assets/download'), {
    synonyms: ['save', 'export', 'retrieve', 'get file', 'arrow down', 'pull'],
  }),
  drag: withMetadata(() => import('./assets/drag'), {
    synonyms: ['drag', 'move', 'grab', 'reorder', 'handle'],
  }),
  dragHorizontal: withMetadata(() => import('./assets/drag_horizontal'), {
    synonyms: [
      'drag horizontal',
      'drag',
      'move',
      'grab',
      'reorder',
      'handle',
      'horizontal',
    ],
  }),
  dragVertical: withMetadata(() => import('./assets/drag_vertical'), {
    synonyms: [
      'drag vertical',
      'drag',
      'move',
      'grab',
      'reorder',
      'handle',
      'vertical',
    ],
  }),
  document: withMetadata(() => import('./assets/document'), {
    synonyms: ['document', 'file', 'page', 'paper', 'doc'],
  }),
  documentation: withMetadata(() => import('./assets/documentation'), {
    synonyms: ['documentation', 'docs', 'help', 'guide', 'manual'],
  }),
  documents: withMetadata(() => import('./assets/documents'), {
    synonyms: ['documents', 'files', 'pages', 'papers', 'library'],
  }), // Deprecated in favor of `document`
  dot: withMetadata(() => import('./assets/dot'), {
    synonyms: ['dot', 'point', 'bullet', 'period', 'circle'],
  }),
  chevronDoubleLeft: withMetadata(
    () => import('./assets/chevron_double_left'),
    { synonyms: ['chevron', 'double', 'left', 'rewind', 'back', 'previous'] }
  ),
  chevronDoubleRight: withMetadata(
    () => import('./assets/chevron_double_right'),
    { synonyms: ['chevron', 'double', 'right', 'forward', 'skip', 'next'] }
  ),
  ellipsis: withMetadata(() => import('./assets/ellipsis'), {
    synonyms: ['ellipsis', 'more', 'menu', 'overflow', 'dots'],
  }),
  textAlignCenter: withMetadata(() => import('./assets/text_align_center'), {
    synonyms: ['text', 'align', 'center', 'middle', 'typography'],
  }),
  textAlignLeft: withMetadata(() => import('./assets/text_align_left'), {
    synonyms: ['text', 'align', 'left', 'typography', 'paragraph'],
  }),
  textAlignRight: withMetadata(() => import('./assets/text_align_right'), {
    synonyms: ['text', 'align', 'right', 'typography', 'paragraph'],
  }),
  textBold: withMetadata(() => import('./assets/text_bold'), {
    synonyms: ['text bold', 'text', 'bold', 'typography', 'formatting'],
  }),
  listCheck: withMetadata(() => import('./assets/list_check'), {
    synonyms: [
      'list check',
      'list',
      'bullet',
      'items',
      'rows',
      'check',
      'tick',
      'confirm',
    ],
  }),
  textHeading: withMetadata(() => import('./assets/text_heading'), {
    synonyms: ['text', 'heading', 'title', 'h1', 'typography', 'header'],
  }),
  textItalic: withMetadata(() => import('./assets/text_italic'), {
    synonyms: ['text italic', 'text', 'italic', 'typography', 'formatting'],
  }),
  listNumber: withMetadata(() => import('./assets/list_number'), {
    synonyms: [
      'list number',
      'list',
      'bullet',
      'items',
      'rows',
      'number',
      'digit',
      'numeric',
    ],
  }),
  redo: withMetadata(() => import('./assets/redo'), {
    synonyms: ['redo', 'repeat', 'forward', 'again'],
  }),
  textStrike: withMetadata(() => import('./assets/text_strike'), {
    synonyms: ['text', 'strikethrough', 'strike', 'delete', 'typography'],
  }),
  table: withMetadata(() => import('./assets/table'), { synonyms: ['table'] }),
  visTable: () => import('./assets/table'), // Deprecated in favor of `table`
  textUnderline: withMetadata(() => import('./assets/text_underline'), {
    synonyms: [
      'text underline',
      'text',
      'underline',
      'typography',
      'formatting',
    ],
  }),
  undo: withMetadata(() => import('./assets/undo'), {
    synonyms: ['undo', 'revert', 'back', 'previous action'],
  }),
  listBullet: withMetadata(() => import('./assets/list_bullet'), {
    synonyms: ['list bullet', 'list', 'bullet', 'items', 'rows'],
  }),
  list: () => import('./assets/list_bullet'), // Deprecated in favor of `listBullet`
  mail: withMetadata(() => import('./assets/mail'), {
    synonyms: ['mail', 'email', 'envelope', 'message', 'inbox'],
  }),
  empty: withMetadata(() => import('./assets/empty'), {
    synonyms: ['empty', 'blank', 'none', 'placeholder', 'void'],
  }),
  emsApp: withMetadata(() => import('./assets/app_ems'), { category: 'app' }),
  endpoint: withMetadata(() => import('./assets/endpoint'), {
    synonyms: ['endpoint', 'api', 'url', 'connection', 'target'],
  }),
  query: withMetadata(() => import('./assets/query'), {
    synonyms: ['query', 'search', 'sql', 'lucene', 'filter', 'eql', 'esql'],
  }),
  eraser: withMetadata(() => import('./assets/eraser'), {
    synonyms: ['eraser', 'clear', 'remove', 'delete', 'rubber'],
  }),
  error: withMetadata(() => import('./assets/error'), {
    synonyms: ['error', 'failure', 'problem', 'invalid', 'cross'],
  }),
  errorFill: withMetadata(() => import('./assets/error_fill'), {
    synonyms: [
      'error fill',
      'error',
      'failure',
      'problem',
      'invalid',
      'cross',
      'fill',
      'filled',
    ],
  }),
  esqlVis: () => import('./assets/esql_vis'), // Deprecated in favor of `query`
  logIn: withMetadata(() => import('./assets/log_in'), {
    synonyms: ['entry', 'incoming'],
  }),
  logOut: withMetadata(() => import('./assets/log_out'), {
    synonyms: ['log out', 'log', 'out', 'exit'],
  }),
  maximize: withMetadata(() => import('./assets/maximize'), {
    synonyms: ['maximize', 'expand'],
  }),
  export: () => import('./assets/upload'), // Deprecated in favor of `upload`
  upload: withMetadata(() => import('./assets/upload'), {
    synonyms: ['upload', 'import', 'send', 'cloud', 'arrow up'],
  }),
  external: withMetadata(() => import('./assets/external'), {
    synonyms: ['external', 'open new', 'link out', 'outside'],
  }),
  eye: withMetadata(() => import('./assets/eye'), {
    synonyms: ['eye', 'view', 'visible', 'show', 'preview', 'watch'],
  }),
  eyeSlash: withMetadata(() => import('./assets/eye_slash'), {
    synonyms: [
      'eye slash',
      'eye',
      'view',
      'visible',
      'show',
      'preview',
      'watch',
      'slash',
    ],
  }),
  faceHappy: withMetadata(() => import('./assets/face_happy'), {
    synonyms: [
      'smile',
      'happy',
      'emoji',
      'positive',
      'grin',
      'satisfied',
      'mood',
    ],
  }),
  faceNeutral: withMetadata(() => import('./assets/face_neutral'), {
    synonyms: ['face neutral', 'face', 'neutral'],
  }),
  faceSad: withMetadata(() => import('./assets/face_sad'), {
    synonyms: ['face sad', 'face', 'sad'],
  }),
  tableInfo: withMetadata(() => import('./assets/table_info'), {
    synonyms: ['table', 'info', 'metadata', 'details', 'schema', 'columns'],
  }),
  filebeatApp: withMetadata(() => import('./assets/app_filebeat'), {
    category: 'app',
  }),
  filter: withMetadata(() => import('./assets/filter'), {
    synonyms: [
      'funnel',
      'refine',
      'narrow',
      'sort',
      'subset',
      'sieve',
      'criteria',
    ],
  }),
  filterExclude: withMetadata(() => import('./assets/filter_exclude'), {
    synonyms: ['filter', 'exclude', 'remove', 'minus', 'refine', 'narrow'],
  }),
  filterIgnore: withMetadata(() => import('./assets/filter_ignore'), {
    synonyms: ['filter', 'ignore', 'skip', 'exclude', 'omit', 'hide'],
  }),
  filterInclude: withMetadata(() => import('./assets/filter_include'), {
    synonyms: ['filter', 'include', 'add', 'refine', 'narrow', 'select'],
  }),
  flask: withMetadata(() => import('./assets/flask'), {
    synonyms: ['flask', 'experiment', 'lab', 'science', 'test'],
  }),
  flag: withMetadata(() => import('./assets/flag'), {
    synonyms: ['flag', 'mark', 'report', 'bookmark', 'priority'],
  }),
  fleetApp: withMetadata(() => import('./assets/app_agent'), {
    category: 'app',
  }),
  fold: () => import('./assets/fold'), // Deprecated in favor of `minimize`
  folder: () => import('./assets/folder_close'),
  folderClosed: () => import('./assets/folder_close'),
  folderClose: withMetadata(() => import('./assets/folder_close'), {
    synonyms: ['folder', 'closed', 'collapse', 'directory', 'archive'],
  }),
  folderCheck: () => import('./assets/folder_check'), // Deprecated in favor of `check`
  folderExclamation: () => import('./assets/folder_exclamation'),
  folderOpen: withMetadata(() => import('./assets/folder_open'), {
    synonyms: ['folder', 'open', 'expand', 'directory', 'browse'],
  }),
  folderOpened: () => import('./assets/folder_open'), // Deprecated in favor of `folderOpen`
  frameNext: () => import('./assets/frame_next'), // Deprecated in favor of `chevronSingleRight`
  framePrevious: () => import('./assets/frame_previous'), // Deprecated in favor of `chevronSingleLeft`
  fullScreen: withMetadata(() => import('./assets/full_screen'), {
    synonyms: ['fullscreen'],
  }),
  fullScreenExit: withMetadata(() => import('./assets/full_screen_exit'), {
    synonyms: ['fullscreen', 'exit', 'minimize', 'window', 'restore', 'shrink'],
  }),
  gear: withMetadata(() => import('./assets/gear'), {
    synonyms: [
      'settings',
      'configure',
      'configuration',
      'preferences',
      'options',
      'cog',
      'setup',
      'admin',
      'wrench',
    ],
  }),
  gisApp: withMetadata(() => import('./assets/app_gis'), { category: 'app' }),
  globe: withMetadata(() => import('./assets/globe'), {
    synonyms: ['globe', 'world', 'web', 'internet', 'international'],
  }),
  gradient: withMetadata(() => import('./assets/gradient'), {
    synonyms: ['gradient', 'blend', 'fade', 'color transition'],
  }),
  graphApp: withMetadata(() => import('./assets/app_graph'), {
    category: 'app',
  }),
  grid: withMetadata(() => import('./assets/grid'), {
    synonyms: ['grid', 'table', 'layout', 'matrix', 'cells'],
  }),
  grokApp: withMetadata(() => import('./assets/app_grok'), { category: 'app' }),
  heart: withMetadata(() => import('./assets/heart'), {
    synonyms: ['heart', 'favorite', 'like', 'love', 'bookmark'],
  }),
  heartbeatApp: withMetadata(() => import('./assets/app_heartbeat'), {
    category: 'app',
  }),
  help: () => import('./assets/help'), // Deprecated in favor of `question`
  home: withMetadata(() => import('./assets/home'), {
    synonyms: ['home', 'house', 'main', 'start', 'dashboard'],
  }),
  hourglass: withMetadata(() => import('./assets/hourglass'), {
    synonyms: ['hourglass', 'waiting', 'loading', 'time', 'pending'],
  }),
  if: withMetadata(() => import('./assets/if'), {
    synonyms: ['if', 'condition', 'logic', 'branch', 'rule'],
  }),
  info: withMetadata(() => import('./assets/info'), {
    synonyms: ['info', 'information', 'help', 'about', 'details'],
  }),
  image: withMetadata(() => import('./assets/image'), {
    synonyms: ['image', 'picture', 'photo', 'media', 'graphic'],
  }),
  index: () => import('./assets/index'), // Deprecated in favor of `table`
  indexClose: () => import('./assets/index_close'), // Deprecated in favor of `tableCross`
  tableCross: withMetadata(() => import('./assets/index_close'), {
    synonyms: [
      'table',
      'cross',
      'index',
      'close',
      'elasticsearch',
      'dataset',
      'remove',
    ],
  }),
  indexEdit: () => import('./assets/index_edit'), // Deprecated in favor of `tablePencil`
  tablePencil: withMetadata(() => import('./assets/index_edit'), {
    synonyms: [
      'table',
      'pencil',
      'index',
      'edit',
      'elasticsearch',
      'dataset',
      'modify',
      'settings',
    ],
  }),
  indexManagementApp: withMetadata(
    () => import('./assets/app_index_management'),
    { category: 'app' }
  ),
  mapping: withMetadata(() => import('./assets/mapping'), {
    synonyms: ['mapping'],
  }),
  indexOpen: () => import('./assets/index_open'), // Deprecated in favor of `tablePlus`
  tablePlus: withMetadata(() => import('./assets/index_open'), {
    synonyms: [
      'table',
      'plus',
      'index',
      'open',
      'elasticsearch',
      'dataset',
      'browse',
    ],
  }),
  indexPatternApp: withMetadata(() => import('./assets/app_index_pattern'), {
    category: 'app',
  }),
  indexRollupApp: withMetadata(() => import('./assets/app_index_rollup'), {
    category: 'app',
  }),
  indexRuntime: () => import('./assets/index_runtime'), // Deprecated in favor of `tablePlay`
  tablePlay: withMetadata(() => import('./assets/index_runtime'), {
    synonyms: [
      'table',
      'play',
      'index',
      'runtime',
      'elasticsearch',
      'live',
      'execution',
    ],
  }),
  indexSettings: () => import('./assets/index_settings'), // Deprecated in favor of `tableGear`
  tableGear: withMetadata(() => import('./assets/index_settings'), {
    synonyms: [
      'table',
      'gear',
      'index',
      'settings',
      'elasticsearch',
      'configure',
      'options',
    ],
  }),
  tableTime: withMetadata(() => import('./assets/table_time'), {
    synonyms: ['table', 'time', 'temporal', 'date', 'timeline', 'history'],
  }),
  infinity: withMetadata(() => import('./assets/infinity'), {
    synonyms: ['infinity', 'unlimited', 'forever', 'loop', 'endless'],
  }),
  inputOutput: withMetadata(() => import('./assets/input_output'), {
    synonyms: ['input', 'output', 'io', 'data flow', 'pipeline', 'stream'],
  }),
  inspect: withMetadata(() => import('./assets/inspect'), {
    synonyms: ['inspect', 'investigate', 'examine', 'analyze', 'look'],
  }),
  ip: () => import('./assets/ip'), // Deprecated in favor of `tokenIP`
  key: withMetadata(() => import('./assets/key'), {
    synonyms: ['key', 'password', 'credential', 'access', 'security'],
  }),
  keyboard: withMetadata(() => import('./assets/keyboard'), {
    synonyms: ['keyboard', 'typing', 'input', 'shortcut', 'keys'],
  }),
  queryField: withMetadata(() => import('./assets/query_field'), {
    synonyms: ['query', 'field', 'filter', 'column', 'attribute', 'selector'],
  }),
  kqlFunction: () => import('./assets/push'), // Deprecated in favor of `push`
  queryOperand: withMetadata(() => import('./assets/query_operand'), {
    synonyms: ['query', 'operand', 'operator', 'logic', 'condition', 'rule'],
  }),
  querySelector: withMetadata(() => import('./assets/query_selector'), {
    synonyms: ['query', 'selector', 'pick', 'choose', 'field', 'filter'],
  }),
  queryValue: withMetadata(() => import('./assets/query_value'), {
    synonyms: ['query', 'value', 'literal', 'data', 'input', 'filter'],
  }),
  kubernetesNamespace: withMetadata(
    () => import('./assets/kubernetes_namespace'),
    { synonyms: ['kubernetes', 'k8s', 'namespace', 'ns', 'heptagon'] }
  ),
  kubernetesPod: () => import('./assets/cube'), // Deprecated in favor of `cube`
  cube: withMetadata(() => import('./assets/cube'), {
    synonyms: [
      'cube',
      'kubernetes',
      'pod',
      'k8s',
      'container',
      'cluster',
      'orchestration',
    ],
  }),
  rocket: withMetadata(() => import('./assets/rocket'), {
    synonyms: ['rocket', 'launch', 'deploy', 'fast', 'startup'],
  }),
  layers: withMetadata(() => import('./assets/layers'), {
    synonyms: ['layers'],
  }),
  lensApp: withMetadata(() => import('./assets/app_lens'), { category: 'app' }),
  text: withMetadata(() => import('./assets/text'), { synonyms: ['text'] }),
  lineBreak: withMetadata(() => import('./assets/line_break'), {
    synonyms: ['line break', 'newline', 'paragraph', 'text', 'wrap', 'return'],
  }),
  lineBreakSlash: withMetadata(() => import('./assets/line_break_slash'), {
    synonyms: ['line break', 'slash', 'text', 'separator', 'paragraph'],
  }),
  lineDash: withMetadata(() => import('./assets/line_dash'), {
    synonyms: ['line dash', 'line', 'dash'],
  }),
  lineDot: withMetadata(() => import('./assets/line_dot'), {
    synonyms: [
      'line dot',
      'line',
      'dot',
      'point',
      'bullet',
      'period',
      'circle',
    ],
  }),
  lineSolid: withMetadata(() => import('./assets/line_solid'), {
    synonyms: ['line solid', 'line', 'solid'],
  }),
  link: withMetadata(() => import('./assets/link'), {
    synonyms: ['link', 'url', 'chain', 'connect', 'hyperlink'],
  }),
  linkSlash: withMetadata(() => import('./assets/link_slash'), {
    synonyms: ['unlink', 'broken link', 'remove link', 'disconnect', 'url'],
  }),
  lock: withMetadata(() => import('./assets/lock'), {
    synonyms: ['lock', 'secure', 'private', 'protected', 'password'],
  }),
  lockOpen: withMetadata(() => import('./assets/lock_open'), {
    synonyms: [
      'lock open',
      'lock',
      'secure',
      'private',
      'protected',
      'password',
      'open',
    ],
  }),
  pattern: withMetadata(() => import('./assets/pattern'), {
    synonyms: ['pattern', 'texture', 'repeat', 'design', 'fill'],
  }),
  logRateAnalysis: () => import('./assets/log_rate_analysis'), // Deprecated in favor of `chartBarVertical`
  logoAWS: withMetadata(() => import('./assets/logo_aws'), {
    category: 'thirdPartyLogo',
  }),
  logoAWSMono: withMetadata(() => import('./assets/logo_aws_mono'), {
    category: 'thirdPartyLogo',
  }),
  logoAerospike: withMetadata(() => import('./assets/logo_aerospike'), {
    category: 'thirdPartyLogo',
  }),
  logoApache: withMetadata(() => import('./assets/logo_apache'), {
    category: 'thirdPartyLogo',
  }),
  logoAppSearch: withMetadata(() => import('./assets/logo_app_search'), {
    category: 'elasticLogo',
  }),
  logoAzure: withMetadata(() => import('./assets/logo_azure'), {
    category: 'thirdPartyLogo',
  }),
  logoAzureMono: withMetadata(() => import('./assets/logo_azure_mono'), {
    category: 'thirdPartyLogo',
  }),
  logoBeats: withMetadata(() => import('./assets/logo_beats'), {
    category: 'elasticLogo',
  }),
  logoBusinessAnalytics: withMetadata(
    () => import('./assets/logo_business_analytics'),
    { category: 'elasticLogo' }
  ),
  logoCeph: withMetadata(() => import('./assets/logo_ceph'), {
    category: 'thirdPartyLogo',
  }),
  logoCloud: withMetadata(() => import('./assets/logo_cloud'), {
    category: 'elasticLogo',
  }),
  logoCloudEnterprise: withMetadata(() => import('./assets/logo_cloud_ece'), {
    category: 'elasticLogo',
  }),
  logoCode: withMetadata(() => import('./assets/logo_code'), {
    category: 'thirdPartyLogo',
  }),
  logoCodesandbox: withMetadata(() => import('./assets/logo_codesandbox'), {
    category: 'thirdPartyLogo',
  }),
  logoCouchbase: withMetadata(() => import('./assets/logo_couchbase'), {
    category: 'thirdPartyLogo',
  }),
  logoDocker: withMetadata(() => import('./assets/logo_docker'), {
    category: 'thirdPartyLogo',
  }),
  logoDropwizard: withMetadata(() => import('./assets/logo_dropwizard'), {
    category: 'thirdPartyLogo',
  }),
  logoElastic: withMetadata(() => import('./assets/logo_elastic'), {
    category: 'elasticLogo',
  }),
  logoElasticStack: withMetadata(() => import('./assets/logo_elastic_stack'), {
    category: 'elasticLogo',
  }),
  logoElasticsearch: withMetadata(() => import('./assets/logo_elasticsearch'), {
    category: 'elasticLogo',
  }),
  logoEnterpriseSearch: withMetadata(
    () => import('./assets/logo_enterprise_search'),
    { category: 'elasticLogo' }
  ),
  logoEtcd: withMetadata(() => import('./assets/logo_etcd'), {
    category: 'thirdPartyLogo',
  }),
  logoGCP: withMetadata(() => import('./assets/logo_gcp'), {
    category: 'thirdPartyLogo',
  }),
  logoGCPMono: withMetadata(() => import('./assets/logo_gcp_mono'), {
    category: 'thirdPartyLogo',
  }),
  logoGithub: withMetadata(() => import('./assets/logo_github'), {
    category: 'thirdPartyLogo',
  }),
  logoGmail: withMetadata(() => import('./assets/logo_gmail'), {
    category: 'thirdPartyLogo',
  }),
  logoGolang: withMetadata(() => import('./assets/logo_golang'), {
    category: 'thirdPartyLogo',
  }),
  logoGoogleG: withMetadata(() => import('./assets/logo_google_g'), {
    category: 'thirdPartyLogo',
  }),
  logoHAproxy: withMetadata(() => import('./assets/logo_haproxy'), {
    category: 'thirdPartyLogo',
  }),
  logoIBM: withMetadata(() => import('./assets/logo_ibm'), {
    category: 'thirdPartyLogo',
  }),
  logoIBMMono: withMetadata(() => import('./assets/logo_ibm_mono'), {
    category: 'thirdPartyLogo',
  }),
  logoKafka: withMetadata(() => import('./assets/logo_kafka'), {
    category: 'thirdPartyLogo',
  }),
  logoKibana: withMetadata(() => import('./assets/logo_kibana'), {
    category: 'elasticLogo',
  }),
  logoKubernetes: withMetadata(() => import('./assets/logo_kubernetes'), {
    category: 'thirdPartyLogo',
  }),
  logoLogging: withMetadata(() => import('./assets/logo_logging'), {
    category: 'elasticLogo',
  }),
  logoLogstash: withMetadata(() => import('./assets/logo_logstash'), {
    category: 'elasticLogo',
  }),
  logoMaps: withMetadata(() => import('./assets/logo_maps'), {
    category: 'elasticLogo',
  }),
  logoMemcached: withMetadata(() => import('./assets/logo_memcached'), {
    category: 'thirdPartyLogo',
  }),
  logoMetrics: withMetadata(() => import('./assets/logo_metrics'), {
    category: 'elasticLogo',
  }),
  logoMongodb: withMetadata(() => import('./assets/logo_mongodb'), {
    category: 'thirdPartyLogo',
  }),
  logoMySQL: withMetadata(() => import('./assets/logo_mysql'), {
    category: 'thirdPartyLogo',
  }),
  logoNginx: withMetadata(() => import('./assets/logo_nginx'), {
    category: 'thirdPartyLogo',
  }),
  logoObservability: withMetadata(() => import('./assets/logo_observability'), {
    category: 'elasticLogo',
  }),
  logoOsquery: withMetadata(() => import('./assets/logo_osquery'), {
    category: 'thirdPartyLogo',
  }),
  logoPhp: withMetadata(() => import('./assets/logo_php'), {
    category: 'thirdPartyLogo',
  }),
  logoPostgres: withMetadata(() => import('./assets/logo_postgres'), {
    category: 'thirdPartyLogo',
  }),
  logoPrometheus: withMetadata(() => import('./assets/logo_prometheus'), {
    category: 'thirdPartyLogo',
  }),
  logoRabbitmq: withMetadata(() => import('./assets/logo_rabbitmq'), {
    category: 'thirdPartyLogo',
  }),
  logoRedis: withMetadata(() => import('./assets/logo_redis'), {
    category: 'thirdPartyLogo',
  }),
  logoSecurity: withMetadata(() => import('./assets/logo_security'), {
    category: 'elasticLogo',
  }),
  logoSiteSearch: withMetadata(() => import('./assets/logo_site_search'), {
    category: 'elasticLogo',
  }),
  logoSketch: withMetadata(() => import('./assets/logo_sketch'), {
    category: 'thirdPartyLogo',
  }),
  logoSlack: withMetadata(() => import('./assets/logo_slack'), {
    category: 'thirdPartyLogo',
  }),
  logoUptime: withMetadata(() => import('./assets/logo_uptime'), {
    category: 'elasticLogo',
  }),
  logoVectorDB: withMetadata(() => import('./assets/logo_vector_db'), {
    category: 'elasticLogo',
  }),
  logoVulnerabilityManagement: withMetadata(
    () => import('./assets/logo_vulnerability_management'),
    { category: 'elasticLogo' }
  ),
  logoWebhook: withMetadata(() => import('./assets/logo_webhook'), {
    category: 'thirdPartyLogo',
  }),
  logoWindows: withMetadata(() => import('./assets/logo_windows'), {
    category: 'thirdPartyLogo',
  }),
  logoWorkplaceSearch: withMetadata(
    () => import('./assets/logo_workplace_search'),
    { category: 'elasticLogo' }
  ),
  logsApp: withMetadata(() => import('./assets/app_logs'), { category: 'app' }),
  logstashFilter: () => import('./assets/logstash_filter'), // Deprecated in favor of `filter`
  logstashInput: () => import('./assets/logstash_input'), // Deprecated in favor of `download`
  logstashOutput: () => import('./assets/logstash_output'), // Deprecated in favor of `upload`
  queue: withMetadata(() => import('./assets/queue'), {
    synonyms: ['queue', 'line', 'buffer', 'waiting', 'jobs'],
  }),
  machineLearningApp: withMetadata(() => import('./assets/app_ml'), {
    category: 'app',
  }),
  magnify: withMetadata(() => import('./assets/magnify'), {
    synonyms: [
      'search',
      'find',
      'zoom',
      'lookup',
      'query',
      'discover',
      'glass',
    ],
  }),
  search: () => import('./assets/magnify'), // Deprecated in favor of `magnify`
  magnifyExclamation: withMetadata(
    () => import('./assets/magnify_exclamation'),
    { synonyms: ['search', 'alert', 'warning', 'find', 'magnify', 'important'] }
  ),
  magnifyMinus: withMetadata(() => import('./assets/magnify_minus'), {
    synonyms: ['zoom out', 'search', 'minus', 'shrink', 'magnify'],
  }),
  magnifyPlus: withMetadata(() => import('./assets/magnify_plus'), {
    synonyms: ['zoom in', 'search', 'plus', 'enlarge', 'magnify'],
  }),
  managementApp: withMetadata(() => import('./assets/app_management'), {
    category: 'app',
  }),
  map: withMetadata(() => import('./assets/map'), {
    synonyms: ['map', 'location', 'geo', 'geography', 'region'],
  }),
  mapMarker: () => import('./assets/waypoint'), // Deprecated in favor of `waypoint`
  waypoint: withMetadata(() => import('./assets/waypoint'), {
    synonyms: ['waypoint', 'marker', 'step', 'node', 'path'],
  }),
  megaphone: withMetadata(() => import('./assets/megaphone'), {
    synonyms: ['megaphone', 'announce', 'broadcast', 'marketing', 'loud'],
  }),
  memory: withMetadata(() => import('./assets/memory'), {
    synonyms: ['random access memory', 'ram', 'module'],
  }),
  menu: withMetadata(() => import('./assets/menu'), {
    synonyms: ['menu', 'hamburger', 'navigation', 'options', 'bars'],
  }),
  menuDown: () => import('./assets/transition_bottom_out'), // Deprecated in favor of `transitionBottomOut`
  menuLeft: withMetadata(() => import('./assets/menu_left'), {
    synonyms: [
      'menu left',
      'menu',
      'hamburger',
      'navigation',
      'options',
      'bars',
      'left',
    ],
  }),
  menuRight: withMetadata(() => import('./assets/menu_right'), {
    synonyms: [
      'menu right',
      'menu',
      'hamburger',
      'navigation',
      'options',
      'bars',
      'right',
    ],
  }),
  menuUp: () => import('./assets/transition_top_out'), // Deprecated in favor of `transitionTopOut`
  merge: withMetadata(() => import('./assets/merge'), {
    synonyms: ['merge', 'combine', 'join', 'unite', 'git'],
  }),
  metricbeatApp: withMetadata(() => import('./assets/app_metricbeat'), {
    category: 'app',
  }),
  metricsApp: withMetadata(() => import('./assets/app_metrics'), {
    category: 'app',
  }),
  minimize: withMetadata(() => import('./assets/minimize'), {
    synonyms: ['minimize'],
  }),
  minus: withMetadata(() => import('./assets/minus'), {
    synonyms: ['minus', 'remove', 'subtract', 'decrement'],
  }),
  minusCircle: withMetadata(() => import('./assets/minus_circle'), {
    synonyms: [
      'minus circle',
      'minus',
      'remove',
      'subtract',
      'decrement',
      'circle',
    ],
  }),
  minusSquare: withMetadata(() => import('./assets/minus_square'), {
    synonyms: ['minus', 'square', 'remove', 'collapse', 'decrement'],
  }),
  mobile: () => import('./assets/mobile'), // Deprecated with no replacement
  monitoringApp: withMetadata(() => import('./assets/app_monitoring'), {
    category: 'app',
  }),
  moon: withMetadata(() => import('./assets/moon'), {
    synonyms: ['moon', 'dark', 'night', 'theme'],
  }),
  move: withMetadata(() => import('./assets/move'), {
    synonyms: ['move', 'relocate', 'drag', 'position', 'transfer'],
  }),
  namespace: () => import('./assets/kubernetes_namespace'), // Deprecated in favor of `kubernetesNamespace`
  nested: withMetadata(() => import('./assets/nested'), {
    synonyms: ['nested', 'hierarchy', 'tree', 'child', 'indent'],
  }),
  vectorTriangle: withMetadata(() => import('./assets/vector_triangle'), {
    synonyms: ['vector', 'triangle', 'shape', 'geometry', 'delta'],
  }),
  notebookApp: withMetadata(() => import('./assets/app_notebook'), {
    category: 'app',
  }),
  number: withMetadata(() => import('./assets/number'), {
    synonyms: ['number', 'digit', 'numeric', 'count', 'hash'],
  }),
  wifiSlash: withMetadata(() => import('./assets/wifi_slash'), {
    synonyms: [
      'wifi',
      'off',
      'disconnected',
      'network',
      'wireless',
      'no signal',
    ],
  }),
  wifi: withMetadata(() => import('./assets/wifi'), {
    synonyms: ['wifi', 'wireless', 'network', 'internet', 'connection'],
  }),
  outlierDetectionJob: withMetadata(
    () => import('./assets/ml_outlier_detection_job'),
    { category: 'ml' }
  ),
  package: withMetadata(() => import('./assets/package'), {
    synonyms: ['package', 'box', 'bundle', 'npm', 'module'],
  }),
  packetbeatApp: withMetadata(() => import('./assets/app_packetbeat'), {
    category: 'app',
  }),
  pagesSelect: () => import('./assets/pages_select'), // Deprecated in favor of `documentsCheck`
  documentsCheck: withMetadata(() => import('./assets/pages_select'), {
    synonyms: [
      'documents',
      'check',
      'pages',
      'select',
      'pagination',
      'choose',
      'document',
    ],
  }),
  palette: withMetadata(() => import('./assets/palette'), {
    synonyms: ['palette', 'colors', 'theme', 'design', 'swatch'],
  }),
  paperClip: withMetadata(() => import('./assets/paper_clip'), {
    synonyms: ['attachment', 'clip', 'file', 'attach', 'paperclip'],
  }),
  partial: withMetadata(() => import('./assets/partial'), {
    synonyms: ['partial', 'incomplete', 'fragment', 'section'],
  }),
  pause: withMetadata(() => import('./assets/pause'), {
    synonyms: ['pause', 'hold', 'stop temporary', 'wait'],
  }),
  payment: () => import('./assets/payment'), // Deprecated in favor of `money`
  pencil: withMetadata(() => import('./assets/pencil'), {
    synonyms: ['pencil', 'edit', 'write', 'modify', 'pen'],
  }),
  percent: withMetadata(() => import('./assets/percent'), {
    synonyms: ['percent', 'percentage', 'ratio', 'rate'],
  }),
  pin: withMetadata(() => import('./assets/pin'), {
    synonyms: ['pin', 'anchor', 'stick', 'fixed', 'bookmark'],
  }),
  pinFill: withMetadata(() => import('./assets/pin_fill'), {
    synonyms: ['pin', 'filled', 'stick', 'anchor', 'fixed', 'bookmark'],
  }),
  pinFilled: () => import('./assets/pin_fill'), // Deprecated in favor of `pinFill`
  pipelineApp: withMetadata(() => import('./assets/app_pipeline'), {
    category: 'app',
  }),
  pivot: withMetadata(() => import('./assets/pivot'), {
    synonyms: ['pivot', 'table', 'transform', 'rotate', 'analytics'],
  }),
  play: withMetadata(() => import('./assets/play'), {
    synonyms: ['play', 'start', 'run', 'media', 'video'],
  }),
  plugs: withMetadata(() => import('./assets/plugs'), {
    synonyms: [
      'plug',
      'plugs',
      'connector',
      'connectors',
      'plugin',
      'plug in',
      'plug-in',
      'extension',
      'add on',
      'add-on',
      'connected',
    ],
  }),
  plus: withMetadata(() => import('./assets/plus'), {
    synonyms: ['plus', 'add', 'new', 'create', 'increment'],
  }),
  plusCircle: withMetadata(() => import('./assets/plus_circle'), {
    synonyms: [
      'plus circle',
      'plus',
      'add',
      'new',
      'create',
      'increment',
      'circle',
    ],
  }),
  plusSquare: withMetadata(() => import('./assets/plus_square'), {
    synonyms: ['plus', 'square', 'add', 'expand', 'increment'],
  }),
  presentation: withMetadata(() => import('./assets/presentation'), {
    synonyms: ['presentation', 'slides', 'deck', 'display', 'show'],
  }),
  productAgent: withMetadata(() => import('./assets/product_agent'), {
    synonyms: ['agent', 'product', 'elastic agent', 'fleet', 'monitoring'],
  }),
  productCloudInfra: withMetadata(
    () => import('./assets/product_cloud_infra'),
    { synonyms: ['cloud', 'infrastructure', 'product', 'hosting', 'platform'] }
  ),
  productDashboard: withMetadata(() => import('./assets/product_dashboard'), {
    synonyms: ['dashboard', 'product', 'kibana', 'analytics', 'panel'],
  }),
  productDiscover: withMetadata(() => import('./assets/product_discover'), {
    synonyms: ['discover', 'product', 'explore', 'data', 'search', 'kibana'],
  }),
  productML: withMetadata(() => import('./assets/product_ml'), {
    synonyms: ['machine learning', 'ml', 'product', 'model', 'ai'],
  }),
  productStreamsClassic: withMetadata(
    () => import('./assets/product_streams_classic'),
    { synonyms: ['streams', 'classic', 'product', 'data', 'pipeline'] }
  ),
  productStreamsWired: withMetadata(
    () => import('./assets/product_streams_wired'),
    {
      synonyms: [
        'streams',
        'wired',
        'product',
        'data',
        'pipeline',
        'connected',
      ],
    }
  ),
  productTimelion: withMetadata(() => import('./assets/product_timelion'), {
    synonyms: ['timelion', 'clock', 'timer', 'time', 'lion'],
  }),
  productTSVB: withMetadata(() => import('./assets/product_tsvb'), {
    synonyms: [
      'tsvb',
      'wrench',
      'tool',
      'fix',
      'settings',
      'repair',
      'build',
      'bar chart',
      'vertical',
      'graph',
      'columns',
      'visualization',
      'plot',
      'entity',
      'analytics',
      'time series',
    ],
  }),
  push: withMetadata(() => import('./assets/push'), {
    synonyms: ['push', 'move', 'force', 'right', 'pass'],
  }),
  send: withMetadata(() => import('./assets/send'), {
    synonyms: ['send', 'submit', 'dispatch', 'arrow', 'share'],
  }),
  question: withMetadata(() => import('./assets/question'), {
    synonyms: ['question', 'help', 'unknown', 'faq', 'ask'],
  }),
  quote: withMetadata(() => import('./assets/quote'), {
    synonyms: ['quote', 'citation', 'blockquote', 'text'],
  }),
  radar: withMetadata(() => import('./assets/radar'), {
    synonyms: ['radar', 'scan', 'detect', 'monitor', 'signal'],
  }),
  readOnly: withMetadata(() => import('./assets/read_only'), {
    synonyms: ['read only', 'locked', 'view', 'permission', 'restrict'],
  }),
  recentlyViewedApp: withMetadata(
    () => import('./assets/app_recently_viewed'),
    { category: 'app' }
  ),
  refresh: withMetadata(() => import('./assets/refresh'), {
    synonyms: ['refresh', 'reload', 'sync', 'update', 'rotate'],
  }),
  regressionJob: withMetadata(() => import('./assets/ml_regression_job'), {
    category: 'ml',
  }),
  reporter: withMetadata(() => import('./assets/reporter'), {
    synonyms: ['reporter', 'report', 'export', 'document', 'output'],
  }),
  reportingApp: withMetadata(() => import('./assets/app_reporting'), {
    category: 'app',
  }),
  return: withMetadata(() => import('./assets/return'), {
    synonyms: ['return', 'enter', 'keyboard', 'submit', 'back', 'revert'],
  }),
  routeSplit: withMetadata(() => import('./assets/route_split'), {
    synonyms: ['tree', 'parent'],
  }),
  save: withMetadata(() => import('./assets/save'), {
    synonyms: ['save', 'store', 'disk', 'persist', 'keep'],
  }),
  savedObjectsApp: withMetadata(() => import('./assets/app_saved_objects'), {
    category: 'app',
  }),
  searchProfilerApp: withMetadata(
    () => import('./assets/app_search_profiler'),
    { category: 'app' }
  ),
  section: withMetadata(() => import('./assets/section'), {
    synonyms: ['section', 'region', 'block', 'area', 'group'],
  }),
  securityAnalyticsApp: withMetadata(
    () => import('./assets/app_security_analytics'),
    { category: 'app' }
  ),
  securityApp: withMetadata(() => import('./assets/app_security'), {
    category: 'app',
  }),
  server: withMetadata(() => import('./assets/server'), {
    synonyms: ['server', 'host', 'machine', 'infrastructure', 'backend'],
  }),
  sessionViewer: () => import('./assets/session_viewer'), // Deprecated in favor of `commandLine`
  shard: withMetadata(() => import('./assets/shard'), {
    synonyms: ['shard', 'partition', 'segment', 'elastic', 'index'],
  }),
  share: withMetadata(() => import('./assets/share'), {
    synonyms: ['share', 'send', 'distribute', 'social', 'export'],
  }),
  significantEvents: withMetadata(() => import('./assets/significant_events'), {
    synonyms: [
      'events',
      'significant',
      'anomaly',
      'alert',
      'notable',
      'timeline',
    ],
  }),
  singleMetricViewer: () => import('./assets/single_metric_viewer'), // Deprecated in favor of `chartArea`
  snowflake: withMetadata(() => import('./assets/snowflake'), {
    synonyms: ['snowflake', 'unique', 'id', 'data warehouse'],
  }),
  sortAscending: withMetadata(() => import('./assets/sort_ascending'), {
    synonyms: ['sort', 'ascending', 'up', 'order', 'rank', 'increase'],
  }),
  sortDescending: withMetadata(() => import('./assets/sort_descending'), {
    synonyms: ['sort', 'descending', 'down', 'order', 'rank', 'decrease'],
  }),
  sortDown: withMetadata(() => import('./assets/sort_down'), {
    synonyms: ['sort down', 'sort', 'order', 'rank', 'arrange', 'down'],
  }),
  sortLeft: withMetadata(() => import('./assets/sort_left'), {
    synonyms: ['sort left', 'sort', 'order', 'rank', 'arrange', 'left'],
  }),
  sortRight: withMetadata(() => import('./assets/sort_right'), {
    synonyms: ['sort right', 'sort', 'order', 'rank', 'arrange', 'right'],
  }),
  sortUp: withMetadata(() => import('./assets/sort_up'), {
    synonyms: ['sort up', 'sort', 'order', 'rank', 'arrange', 'up'],
  }),
  sortable: withMetadata(() => import('./assets/sortable'), {
    synonyms: ['sortable', 'sort', 'order'],
  }),
  spaces: () => import('./assets/spaces'), // Deprecated in favor of `grid`
  spacesApp: withMetadata(() => import('./assets/app_spaces'), {
    category: 'app',
  }),
  sparkles: withMetadata(() => import('./assets/sparkles'), {
    synonyms: ['sparkles', 'ai', 'magic', 'new', 'enhance', 'auto'],
  }),
  sqlApp: withMetadata(() => import('./assets/app_sql'), { category: 'app' }),
  star: withMetadata(() => import('./assets/star'), {
    synonyms: ['star', 'favorite', 'rating', 'bookmark'],
  }),
  starEmpty: () => import('./assets/star'), // Deprecated in favor of `star`
  starEmptySpace: () => import('./assets/star_empty_space'), // Deprecated in favor of `star`
  starFill: withMetadata(() => import('./assets/star_fill'), {
    synonyms: [
      'star fill',
      'star',
      'favorite',
      'rating',
      'bookmark',
      'fill',
      'filled',
      'solid',
    ],
  }),
  starFilled: () => import('./assets/star_fill'), // Deprecated in favor of `starFill`
  starFillSpace: () => import('./assets/star_fill_space'), // Deprecated in favor of `starFill`
  starMinusEmpty: () => import('./assets/star_minus_empty'), // Deprecated in favor of `star`
  starMinusFill: () => import('./assets/star_minus_fill'), // Deprecated in favor of `starFill`
  starPlusEmpty: () => import('./assets/star_plus_empty'), // Deprecated in favor of `star`
  starPlusFill: () => import('./assets/star_plus_fill'), // Deprecated in favor of `starFill`
  stats: () => import('./assets/stats'), // Deprecated in favor of `chartLine`
  stop: withMetadata(() => import('./assets/stop'), {
    synonyms: ['stop', 'halt', 'end', 'terminate', 'square'],
  }),
  stopFill: () => import('./assets/stop_fill'),
  stopSlash: () => import('./assets/stop_slash'),
  storage: withMetadata(() => import('./assets/storage'), {
    synonyms: ['storage', 'disk', 'drive', 'save', 'data store'],
  }),
  string: () => import('./assets/string'), // Deprecated in favor of `tokenString`
  sun: withMetadata(() => import('./assets/sun'), {
    synonyms: ['sun', 'light', 'day', 'theme', 'bright'],
  }),
  swatchInput: () => import('./assets/swatch_input'), // Undocumented on purpose. Has an extra stroke for EuiColorPicker
  symlink: withMetadata(() => import('./assets/symlink'), {
    synonyms: ['symlink', 'shortcut', 'alias', 'link', 'reference'],
  }),
  tableDensityHigh: withMetadata(() => import('./assets/table_density_high'), {
    synonyms: ['table', 'density', 'compact', 'tight', 'rows', 'spacing'],
  }),
  tableDensityLow: withMetadata(() => import('./assets/table_density_low'), {
    synonyms: ['table', 'density', 'spacious', 'loose', 'rows', 'spacing'],
  }),
  tableOfContents: () => import('./assets/table_of_contents'), // Deprecated in favor of `listBullet`
  tag: withMetadata(() => import('./assets/tag'), {
    synonyms: ['tag', 'label', 'category', 'keyword', 'badge'],
  }),
  thermometer: withMetadata(() => import('./assets/thermometer'), {
    synonyms: ['thermometer', 'temperature', 'heat', 'metric', 'gauge'],
  }),
  temperature: () => import('./assets/thermometer'), // Deprecated in favor of `thermometer`
  thumbDown: withMetadata(() => import('./assets/thumb_down'), {
    synonyms: ['thumbs down', 'dislike', 'negative', 'vote', 'feedback', 'bad'],
  }),
  thumbUp: withMetadata(() => import('./assets/thumb_up'), {
    synonyms: ['thumbs up', 'like', 'positive', 'vote', 'feedback', 'good'],
  }),
  timeline: withMetadata(() => import('./assets/timeline'), {
    synonyms: ['timeline', 'history', 'events', 'chronological', 'sequence'],
  }),
  timelineWithArrow: () => import('./assets/timeline_with_arrow'), // Deprecated in favor of `timelinePointer`
  timelinePointer: withMetadata(() => import('./assets/timeline_with_arrow'), {
    synonyms: [
      'timeline',
      'pointer',
      'arrow',
      'history',
      'sequence',
      'flow',
      'events',
    ],
  }),
  timelionApp: withMetadata(() => import('./assets/app_timelion'), {
    category: 'app',
  }),
  refreshTime: withMetadata(() => import('./assets/refresh_time'), {
    synonyms: ['refresh', 'time', 'reload', 'schedule', 'sync', 'clock'],
  }),
  transitionBottomIn: withMetadata(
    () => import('./assets/transition_bottom_in'),
    { synonyms: ['transition', 'bottom', 'in', 'animate', 'enter', 'motion'] }
  ),
  transitionBottomOut: withMetadata(
    () => import('./assets/transition_bottom_out'),
    { synonyms: ['transition', 'bottom', 'out', 'animate', 'exit', 'motion'] }
  ),
  transitionLeftIn: withMetadata(() => import('./assets/transition_left_in'), {
    synonyms: ['transition', 'left', 'in', 'animate', 'enter', 'motion'],
  }),
  transitionLeftOut: withMetadata(
    () => import('./assets/transition_left_out'),
    { synonyms: ['transition', 'left', 'out', 'animate', 'exit', 'motion'] }
  ),
  transitionRightIn: withMetadata(
    () => import('./assets/transition_right_in'),
    { synonyms: ['transition', 'right', 'in', 'animate', 'enter', 'motion'] }
  ),
  transitionRightOut: withMetadata(
    () => import('./assets/transition_right_out'),
    { synonyms: ['transition', 'right', 'out', 'animate', 'exit', 'motion'] }
  ),
  transitionTopIn: withMetadata(() => import('./assets/transition_top_in'), {
    synonyms: ['transition', 'top', 'in', 'animate', 'enter', 'motion'],
  }),
  transitionTopOut: withMetadata(() => import('./assets/transition_top_out'), {
    synonyms: ['transition', 'top', 'out', 'animate', 'exit', 'motion'],
  }),
  translate: withMetadata(() => import('./assets/translate'), {
    synonyms: ['language', 'localization'],
  }),
  trash: withMetadata(() => import('./assets/trash'), {
    synonyms: ['trash', 'delete', 'remove', 'bin', 'garbage', 'discard'],
  }),
  unfold: () => import('./assets/unfold'), // Deprecated in favor of `maximize`
  upgradeAssistantApp: withMetadata(
    () => import('./assets/app_upgrade_assistant'),
    { category: 'app' }
  ),
  uptimeApp: withMetadata(() => import('./assets/app_uptime'), {
    category: 'app',
  }),
  user: withMetadata(() => import('./assets/user'), {
    synonyms: ['user', 'person', 'account', 'profile', 'avatar'],
  }),
  users: withMetadata(() => import('./assets/users'), {
    synonyms: ['users', 'people', 'team', 'group', 'accounts'],
  }),
  usersRolesApp: withMetadata(() => import('./assets/app_users_roles'), {
    category: 'app',
  }),
  unarchive: withMetadata(() => import('./assets/unarchive'), {
    synonyms: ['unarchive', 'restore', 'extract', 'retrieve', 'unpack'],
  }),
  vectorSquare: withMetadata(() => import('./assets/vector_square'), {
    synonyms: ['vector', 'square', 'shape', 'geometry', 'box', 'region'],
  }),
  videoPlayer: withMetadata(() => import('./assets/video_player'), {
    synonyms: ['video', 'player', 'play', 'media', 'film', 'watch'],
  }),
  visGoal: () => import('./assets/vis_goal'), // Deprecated in favor of `chartGauge`
  chartMetric: withMetadata(() => import('./assets/chart_metric'), {
    synonyms: ['metric', 'chart', 'kpi', 'measurement', 'stat', 'indicator'],
  }),
  visTimelion: () => import('./assets/product_timelion'), // Deprecated in favor of `productTimelion`
  visVisualBuilder: () => import('./assets/product_tsvb'), // Deprecated in favor of `productTSVB`
  visualizeApp: withMetadata(() => import('./assets/app_visualize'), {
    category: 'app',
  }),
  vulnerabilityManagementApp: withMetadata(
    () => import('./assets/app_vulnerability_management'),
    { category: 'app' }
  ),
  warning: withMetadata(() => import('./assets/warning'), {
    synonyms: ['warning', 'alert', 'caution', 'danger', 'issue'],
  }),
  alert: () => import('./assets/warning'), // Deprecated in favor of `warning`
  warningFill: withMetadata(() => import('./assets/warning_fill'), {
    synonyms: [
      'warning fill',
      'warning',
      'alert',
      'caution',
      'danger',
      'issue',
      'fill',
      'filled',
    ],
  }),
  watchesApp: withMetadata(() => import('./assets/app_watches'), {
    category: 'app',
  }),
  web: () => import('./assets/web'),
  wordWrap: () => import('./assets/word_wrap'), // Deprecated in favor of `lineBreak`
  wordWrapDisabled: () => import('./assets/word_wrap_disabled'), // Deprecated in favor of `lineBreakSlash`
  workflowsApp: withMetadata(() => import('./assets/app_workflows'), {
    category: 'app',
  }),
  workflow: withMetadata(() => import('./assets/workflow'), {
    synonyms: ['workflow', 'automation', 'pipeline', 'process', 'flow'],
  }),
  workplaceSearchApp: withMetadata(
    () => import('./assets/app_workplace_search'),
    { category: 'app' }
  ),
  wrench: withMetadata(() => import('./assets/wrench'), {
    synonyms: ['wrench', 'tool', 'fix', 'settings', 'repair', 'build'],
  }),
  // Token Icon Imports
  tokenAlias: withMetadata(() => import('./assets/token_alias'), {
    category: 'token',
  }),
  tokenAnnotation: withMetadata(() => import('./assets/token_annotation'), {
    category: 'token',
  }),
  tokenArray: withMetadata(() => import('./assets/token_array'), {
    category: 'token',
  }),
  tokenBinary: withMetadata(() => import('./assets/token_binary'), {
    category: 'token',
  }),
  tokenBoolean: withMetadata(() => import('./assets/token_boolean'), {
    category: 'token',
  }),
  tokenClass: withMetadata(() => import('./assets/token_class'), {
    category: 'token',
  }),
  tokenCompletionSuggester: withMetadata(
    () => import('./assets/token_completion_suggester'),
    { category: 'token' }
  ),
  tokenConstant: withMetadata(() => import('./assets/token_constant'), {
    category: 'token',
  }),
  tokenDate: withMetadata(() => import('./assets/token_date'), {
    category: 'token',
  }),
  tokenDimension: withMetadata(() => import('./assets/token_dimension'), {
    category: 'token',
  }),
  tokenElement: withMetadata(() => import('./assets/token_element'), {
    category: 'token',
  }),
  tokenEnum: withMetadata(() => import('./assets/token_enum'), {
    category: 'token',
  }),
  tokenEnumMember: withMetadata(() => import('./assets/token_enum_member'), {
    category: 'token',
  }),
  tokenEvent: withMetadata(() => import('./assets/token_event'), {
    category: 'token',
  }),
  tokenException: withMetadata(() => import('./assets/token_exception'), {
    category: 'token',
  }),
  tokenField: withMetadata(() => import('./assets/token_field'), {
    category: 'token',
  }),
  tokenFile: withMetadata(() => import('./assets/token_file'), {
    category: 'token',
  }),
  tokenFlattened: withMetadata(() => import('./assets/token_flattened'), {
    category: 'token',
  }),
  tokenFunction: withMetadata(() => import('./assets/token_function'), {
    category: 'token',
  }),
  tokenGeo: withMetadata(() => import('./assets/token_geo'), {
    category: 'token',
  }),
  tokenHistogram: withMetadata(() => import('./assets/token_histogram'), {
    category: 'token',
  }),
  tokenInterface: withMetadata(() => import('./assets/token_interface'), {
    category: 'token',
  }),
  tokenIP: withMetadata(() => import('./assets/token_ip'), {
    category: 'token',
  }),
  tokenJoin: withMetadata(() => import('./assets/token_join'), {
    category: 'token',
  }),
  tokenKey: withMetadata(() => import('./assets/token_key'), {
    category: 'token',
  }),
  tokenKeyword: withMetadata(() => import('./assets/token_keyword'), {
    category: 'token',
  }),
  tokenMethod: withMetadata(() => import('./assets/token_method'), {
    category: 'token',
  }),
  tokenMetricCounter: withMetadata(
    () => import('./assets/token_metric_counter'),
    { category: 'token' }
  ),
  tokenMetricGauge: withMetadata(() => import('./assets/token_metric_gauge'), {
    category: 'token',
  }),
  tokenModule: withMetadata(() => import('./assets/token_module'), {
    category: 'token',
  }),
  tokenNamespace: withMetadata(() => import('./assets/token_namespace'), {
    category: 'token',
  }),
  tokenNested: withMetadata(() => import('./assets/token_nested'), {
    category: 'token',
  }),
  tokenNull: withMetadata(() => import('./assets/token_null'), {
    category: 'token',
  }),
  tokenNumber: withMetadata(() => import('./assets/token_number'), {
    category: 'token',
  }),
  tokenObject: withMetadata(() => import('./assets/token_object'), {
    category: 'token',
  }),
  tokenOperator: withMetadata(() => import('./assets/token_operator'), {
    category: 'token',
  }),
  tokenPackage: withMetadata(() => import('./assets/token_package'), {
    category: 'token',
  }),
  tokenParameter: withMetadata(() => import('./assets/token_parameter'), {
    category: 'token',
  }),
  tokenPercolator: withMetadata(() => import('./assets/token_percolator'), {
    category: 'token',
  }),
  tokenProperty: withMetadata(() => import('./assets/token_property'), {
    category: 'token',
  }),
  tokenRange: withMetadata(() => import('./assets/token_range'), {
    category: 'token',
  }),
  tokenRankFeature: withMetadata(() => import('./assets/token_rank_feature'), {
    category: 'token',
  }),
  tokenRankFeatures: withMetadata(
    () => import('./assets/token_rank_features'),
    { category: 'token' }
  ),
  tokenRepo: withMetadata(() => import('./assets/token_repo'), {
    category: 'token',
  }),
  tokenSearchType: withMetadata(() => import('./assets/token_search_type'), {
    category: 'token',
  }),
  tokenSemanticText: withMetadata(
    () => import('./assets/token_semantic_text'),
    { category: 'token' }
  ),
  tokenShape: withMetadata(() => import('./assets/token_shape'), {
    category: 'token',
  }),
  tokenString: withMetadata(() => import('./assets/token_string'), {
    category: 'token',
  }),
  tokenStruct: withMetadata(() => import('./assets/token_struct'), {
    category: 'token',
  }),
  tokenSymbol: withMetadata(() => import('./assets/token_symbol'), {
    category: 'token',
  }),
  tokenTag: withMetadata(() => import('./assets/token_tag'), {
    category: 'token',
  }),
  tokenText: withMetadata(() => import('./assets/token_text'), {
    category: 'token',
  }),
  tokenTokenCount: withMetadata(() => import('./assets/token_token_count'), {
    category: 'token',
  }),
  tokenVariable: withMetadata(() => import('./assets/token_variable'), {
    category: 'token',
  }),
  tokenVectorDense: withMetadata(() => import('./assets/token_vector_dense'), {
    category: 'token',
  }),
  tokenVectorSparse: withMetadata(
    () => import('./assets/token_vector_sparse'),
    { category: 'token' }
  ),
};

type TypeToPathMapLoader = (typeof typeToPathMap)[keyof typeof typeToPathMap];

type TypeToPathMapMetadata = {
  category: IconCategory;
  synonyms?: string[];
};

const getTypeToPathMapMetadata = (
  loader: TypeToPathMapLoader
): TypeToPathMapMetadata => {
  const metadata = (loader as { metadata?: TypeToPathMapMetadata }).metadata;

  return {
    category: metadata?.category ?? 'glyph',
    synonyms: metadata?.synonyms,
  };
};
// Sorted alphabetically rather than by `typeToPathMap` insertion order, which has
// drifted over time. These lists are only consumed by the docs site, where icons
// are expected to be browsable in alphabetical order.
const getTypeToPathMapCategoryIconTypes = (category: IconCategory) =>
  Object.entries(typeToPathMap)
    .filter(
      ([, loader]) => getTypeToPathMapMetadata(loader).category === category
    )
    .map(([iconType]) => iconType as keyof typeof typeToPathMap)
    .sort((a, b) => a.localeCompare(b));

export const typeToPathMapAppIconTypes =
  getTypeToPathMapCategoryIconTypes('app');

export const typeToPathMapGlyphIconTypes =
  getTypeToPathMapCategoryIconTypes('glyph');

export const typeToPathMapLogoIconTypes =
  getTypeToPathMapCategoryIconTypes('elasticLogo');

export const typeToPathMapMlIconTypes = getTypeToPathMapCategoryIconTypes('ml');

export const typeToPathMapTokenIconTypes =
  getTypeToPathMapCategoryIconTypes('token');

export const typeToPathMapDocsAppIconTypes = typeToPathMapAppIconTypes;

// TODO: Remove this compatibility filter with https://github.com/elastic/eui/issues/9832.
const deprecatedIconsExcludedFromDocs = new Set([
  'alert',
  'apps',
  'boxesVertical',
  'cloudDrizzle',
  'cloudStormy',
  'cloudSunny',
  'compute',
  'documents',
  'editorComment',
  'export',
  'folderCheck',
  'frameNext',
  'folderOpened',
  'analyzeEvent',
  'annotation',
  'anomalySwimLane',
  'container',
  'continuityAbove',
  'continuityWithin',
  'esqlVis',
  'fold',
  'framePrevious',
  'help',
  'index',
  'indexClose',
  'indexEdit',
  'indexOpen',
  'indexRuntime',
  'indexSettings',
  'ip',
  'kqlFunction',
  'kubernetesPod',
  'list',
  'logstashFilter',
  'logstashInput',
  'logstashOutput',
  'logRateAnalysis',
  'mapMarker',
  'menuDown',
  'menuUp',
  'mobile',
  'namespace',
  'pagesSelect',
  'payment',
  'pinFilled',
  'search',
  'sessionViewer',
  'singleMetricViewer',
  'spaces',
  'starEmpty',
  'starEmptySpace',
  'starFilled',
  'starFillSpace',
  'starMinusEmpty',
  'starMinusFill',
  'starPlusEmpty',
  'starPlusFill',
  'string',
  'stats',
  'tableOfContents',
  'temperature',
  'timelineWithArrow',
  'visArea',
  'unfold',
  'visBarVertical',
  'visGauge',
  'visGoal',
  'visLine',
  'visPie',
  'visTable',
  'visTimelion',
  'visVisualBuilder',
  'wordWrap',
  'wordWrapDisabled',
]);

export const typeToPathMapDocsGlyphIconTypes =
  typeToPathMapGlyphIconTypes.filter(
    (iconType) => !deprecatedIconsExcludedFromDocs.has(iconType)
  );

export const typeToPathMapDocsLogoIconTypes = typeToPathMapLogoIconTypes;

export const typeToPathMapDocsMlIconTypes = typeToPathMapMlIconTypes;

export const typeToPathMapDocsTokenIconTypes = typeToPathMapTokenIconTypes;

export type TypeToPathMapSynonyms = Partial<
  Record<keyof typeof typeToPathMap, string[]>
>;

export const typeToPathMapSynonyms: TypeToPathMapSynonyms = Object.fromEntries(
  Object.entries(typeToPathMap).flatMap(([iconType, loader]) => {
    const synonyms = getTypeToPathMapMetadata(loader).synonyms;

    return synonyms ? [[iconType, synonyms]] : [];
  })
) as TypeToPathMapSynonyms;
