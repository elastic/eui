/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

type IconImportLoader = () => Promise<unknown>;

export type IconCategory = 'glyph' | 'app' | 'logo' | 'ml' | 'token';

type IconMetadata = {
  category: IconCategory;
  synonyms?: string[];
};

type IconImportLoaderWithMetadata = IconImportLoader & {
  metadata?: IconMetadata;
};

const withMetadata = (
  loader: IconImportLoader,
  metadata: IconMetadata
): IconImportLoaderWithMetadata => Object.assign(loader, { metadata });

export const typeToPathMap = {
  accessibility: withMetadata(() => import('./assets/accessibility'), {
    category: 'glyph',
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
    category: 'glyph',
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
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['align', 'bottom', 'vertical', 'position', 'layout', 'dock'],
  }),
  alignBottomLeft: withMetadata(() => import('./assets/align_bottom_left'), {
    category: 'glyph',
    synonyms: ['align', 'bottom', 'left', 'corner', 'position', 'layout'],
  }),
  alignBottomRight: withMetadata(() => import('./assets/align_bottom_right'), {
    category: 'glyph',
    synonyms: ['align', 'bottom', 'right', 'corner', 'position', 'layout'],
  }),
  alignCenterHorizontal: withMetadata(
    () => import('./assets/align_center_horizontal'),
    {
      category: 'glyph',
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
      category: 'glyph',
      synonyms: ['align', 'center', 'vertical', 'middle', 'position', 'layout'],
    }
  ),
  alignLeft: withMetadata(() => import('./assets/align_left'), {
    category: 'glyph',
    synonyms: ['align', 'left', 'horizontal', 'position', 'layout', 'flush'],
  }),
  alignRight: withMetadata(() => import('./assets/align_right'), {
    category: 'glyph',
    synonyms: ['align', 'right', 'horizontal', 'position', 'layout', 'flush'],
  }),
  alignTop: withMetadata(() => import('./assets/align_top'), {
    category: 'glyph',
    synonyms: ['align', 'top', 'vertical', 'position', 'layout', 'dock'],
  }),
  alignTopLeft: withMetadata(() => import('./assets/align_top_left'), {
    category: 'glyph',
    synonyms: ['align', 'top', 'left', 'corner', 'position', 'layout'],
  }),
  alignTopRight: withMetadata(() => import('./assets/align_top_right'), {
    category: 'glyph',
    synonyms: ['align', 'top', 'right', 'corner', 'position', 'layout'],
  }),
  alert: () => import('./assets/warning'), // NOTE: To be deprecated in favor of `warning`
  analyzeEvent: withMetadata(() => import('./assets/analyze_event'), {
    category: 'glyph',
  }),
  annotation: withMetadata(() => import('./assets/annotation'), {
    category: 'glyph',
  }),
  anomalyChart: () => import('./assets/chart_anomaly'), // NOTE: To be deprecated in favor of chartAnomaly
  chartAnomaly: withMetadata(() => import('./assets/chart_anomaly'), {
    category: 'glyph',
    synonyms: ['anomaly', 'chart', 'outlier', 'detection', 'spike', 'unusual'],
  }),
  anomalySwimLane: withMetadata(() => import('./assets/anomaly_swim_lane'), {
    category: 'glyph',
  }),
  apmApp: withMetadata(() => import('./assets/app_apm'), { category: 'app' }),
  apmTrace: () => import('./assets/chart_waterfall'), // NOTE: To be deprecated in favor of chartWaterfall
  chartWaterfall: withMetadata(() => import('./assets/chart_waterfall'), {
    category: 'glyph',
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
  apps: withMetadata(() => import('./assets/apps'), { category: 'glyph' }),
  arrowDown: () => import('./assets/chevron_single_down'), // NOTE: To be deprecated in favor of chevronSingleDown
  chevronSingleDown: withMetadata(
    () => import('./assets/chevron_single_down'),
    {
      category: 'glyph',
      synonyms: ['chevron', 'down', 'dropdown', 'expand', 'arrow', 'caret'],
    }
  ),
  arrowLeft: () => import('./assets/chevron_single_left'), // NOTE: To be deprecated in favor of chevronSingleLeft
  chevronSingleLeft: withMetadata(
    () => import('./assets/chevron_single_left'),
    {
      category: 'glyph',
      synonyms: ['chevron', 'left', 'back', 'previous', 'arrow', 'caret'],
    }
  ),
  arrowRight: () => import('./assets/chevron_single_right'), // NOTE: To be deprecated in favor of chevronSinglRight
  chevronSingleRight: withMetadata(
    () => import('./assets/chevron_single_right'),
    {
      category: 'glyph',
      synonyms: ['chevron', 'right', 'next', 'forward', 'arrow', 'caret'],
    }
  ),
  arrowUp: () => import('./assets/chevron_single_up'), // NOTE: To be deprecated in favor of chevronSingleUp
  chevronSingleUp: withMetadata(() => import('./assets/chevron_single_up'), {
    category: 'glyph',
    synonyms: ['chevron', 'up', 'collapse', 'arrow', 'caret'],
  }),
  arrowStart: () => import('./assets/chevron_limit_left'), // NOTE: To be deprecated in favor of chevronLimitLeft
  chevronLimitLeft: withMetadata(() => import('./assets/chevron_limit_left'), {
    category: 'glyph',
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
  arrowEnd: () => import('./assets/chevron_limit_right'), // NOTE: To be deprecated in favor of chevronLimitRight
  chevronLimitRight: withMetadata(
    () => import('./assets/chevron_limit_right'),
    {
      category: 'glyph',
      synonyms: ['chevron', 'limit', 'last', 'end', 'final', 'jump', 'skip'],
    }
  ),
  article: withMetadata(() => import('./assets/article'), {
    category: 'glyph',
  }),
  asterisk: withMetadata(() => import('./assets/asterisk'), {
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['email', 'mention', 'address', 'symbol', 'contact', 'handle'],
  }),
  archive: withMetadata(() => import('./assets/archive'), {
    category: 'glyph',
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
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['y axis', 'left', 'vertical axis', 'chart', 'graph', 'ordinate'],
  }),
  axisYRight: withMetadata(() => import('./assets/axis_y_right'), {
    category: 'glyph',
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
    category: 'glyph',
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
  beaker: () => import('./assets/flask'), // NOTE: To be deprecated in favor of `flask`
  bell: withMetadata(() => import('./assets/bell'), {
    category: 'glyph',
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
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['greek', 'test', 'experimental', 'preview', 'version', 'letter'],
  }),
  bolt: withMetadata(() => import('./assets/bolt'), {
    category: 'glyph',
    synonyms: ['lightning', 'fast', 'power', 'electric', 'speed', 'energy'],
  }),
  boxesHorizontal: () => import('./assets/boxes_vertical'), // NOTE: To be deprecated in favor of `boxes_vertical`
  boxesVertical: () => import('./assets/boxes_vertical'),
  branch: withMetadata(() => import('./assets/branch'), {
    category: 'glyph',
    synonyms: ['git', 'version control', 'fork', 'tree', 'split', 'divergence'],
  }),
  briefcase: withMetadata(() => import('./assets/briefcase'), {
    category: 'glyph',
    synonyms: ['work', 'business', 'job', 'portfolio', 'office', 'career'],
  }),
  branchUser: withMetadata(() => import('./assets/branch_user'), {
    category: 'glyph',
  }),
  broom: withMetadata(() => import('./assets/broom'), {
    category: 'glyph',
    synonyms: ['clean', 'sweep', 'clear', 'tidy', 'wipe', 'brush off'],
  }),
  brush: withMetadata(() => import('./assets/brush'), {
    category: 'glyph',
    synonyms: ['paint', 'draw', 'art', 'design', 'stroke', 'brush tool'],
  }),
  bug: withMetadata(() => import('./assets/bug'), {
    category: 'glyph',
    synonyms: ['insect', 'defect', 'issue', 'error', 'debug', 'glitch'],
  }),
  bulb: withMetadata(() => import('./assets/bulb'), {
    category: 'glyph',
    synonyms: ['light', 'idea', 'lamp', 'insight', 'bright', 'hint'],
  }),
  bullseye: withMetadata(() => import('./assets/bullseye'), {
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['date', 'schedule', 'event', 'day', 'month', 'time'],
  }),
  canvasApp: withMetadata(() => import('./assets/app_canvas'), {
    category: 'app',
  }),
  casesApp: withMetadata(() => import('./assets/app_cases'), {
    category: 'app',
  }),
  changePointDetection: () => import('./assets/chart_change_point'), // NOTE: To be deprecated in favor of chartChangePoint
  chartChangePoint: withMetadata(() => import('./assets/chart_change_point'), {
    category: 'glyph',
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
    category: 'glyph',
    synonyms: [
      'area chart',
      'graph',
      'visualization',
      'filled',
      'trend',
      'plot',
    ],
  }),
  chartAreaStack: withMetadata(() => import('./assets/chart_area_stack'), {
    category: 'glyph',
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
      category: 'glyph',
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
      category: 'glyph',
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
    category: 'glyph',
    synonyms: [
      'bar chart',
      'vertical',
      'graph',
      'columns',
      'visualization',
      'plot',
    ],
  }),
  chartBarVerticalStack: withMetadata(
    () => import('./assets/chart_bar_vertical_stack'),
    {
      category: 'glyph',
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
    category: 'glyph',
    synonyms: ['gauge', 'meter', 'dial', 'chart', 'metric', 'speedometer'],
  }),
  chartHeatmap: withMetadata(() => import('./assets/chart_heatmap'), {
    category: 'glyph',
    synonyms: ['heatmap', 'matrix', 'density', 'chart', 'grid', 'correlation'],
  }),
  chartLine: withMetadata(() => import('./assets/chart_line'), {
    category: 'glyph',
    synonyms: [
      'line chart',
      'graph',
      'trend',
      'visualization',
      'plot',
      'time series',
    ],
  }),
  chartPie: withMetadata(() => import('./assets/chart_pie'), {
    category: 'glyph',
    synonyms: [
      'pie chart',
      'donut',
      'proportion',
      'circle',
      'segments',
      'share',
    ],
  }),
  chartTagCloud: withMetadata(() => import('./assets/chart_tag_cloud'), {
    category: 'glyph',
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
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['tick', 'confirm', 'done', 'yes', 'approve', 'mark'],
  }),
  checkCircle: withMetadata(() => import('./assets/check_circle'), {
    category: 'glyph',
    synonyms: ['check', 'circle', 'success', 'confirm', 'complete', 'ok'],
  }),
  checkInCircleFilled: () => import('./assets/check_circle_fill'), // NOTE: To be deprecated in favor of checkCircleFill
  checkCircleFill: withMetadata(() => import('./assets/check_circle_fill'), {
    category: 'glyph',
    synonyms: ['check', 'filled', 'success', 'confirm', 'complete', 'ok'],
  }),
  cheer: () => import('./assets/popper'), // NOTE: To be deprecated in favor of popper
  popper: withMetadata(() => import('./assets/popper'), {
    category: 'glyph',
    synonyms: ['popper', 'tooltip', 'overlay', 'popup', 'floating'],
  }),
  classificationJob: withMetadata(
    () => import('./assets/ml_classification_job'),
    { category: 'ml' }
  ),
  clickLeft: withMetadata(() => import('./assets/click_left'), {
    category: 'glyph',
    synonyms: ['click', 'left', 'mouse', 'pointer', 'button', 'tap'],
  }),
  clickRight: withMetadata(() => import('./assets/click_right'), {
    category: 'glyph',
    synonyms: ['click', 'right', 'mouse', 'context', 'button', 'tap'],
  }),
  clock: withMetadata(() => import('./assets/clock'), {
    category: 'glyph',
    synonyms: ['clock'],
  }),
  clockCounter: withMetadata(() => import('./assets/clock_counter'), {
    category: 'glyph',
    synonyms: ['clock', 'counter', 'countdown', 'timer', 'time', 'elapsed'],
  }),
  clockControl: withMetadata(() => import('./assets/clock_control'), {
    category: 'glyph',
    synonyms: ['clock', 'control', 'time', 'schedule', 'timer', 'settings'],
  }),
  cloud: withMetadata(() => import('./assets/cloud'), {
    category: 'glyph',
    synonyms: ['cloud', 'online', 'hosting', 'saas', 'remote'],
  }),
  cloudDrizzle: withMetadata(() => import('./assets/cloud_drizzle'), {
    category: 'glyph',
  }),
  cloudStormy: withMetadata(() => import('./assets/cloud_stormy'), {
    category: 'glyph',
  }),
  cloudSunny: withMetadata(() => import('./assets/cloud_sunny'), {
    category: 'glyph',
  }),
  cluster: withMetadata(() => import('./assets/cluster'), {
    category: 'glyph',
    synonyms: ['cluster', 'nodes', 'group', 'collection', 'distributed'],
  }),
  code: withMetadata(() => import('./assets/code'), {
    category: 'glyph',
    synonyms: ['code', 'developer', 'programming', 'script', 'source'],
  }),
  codeApp: withMetadata(() => import('./assets/app_code'), { category: 'app' }),
  color: () => import('./assets/paint_bucket'), // NOTE: To be deprecated in favor of paintBucket
  paintBucket: withMetadata(() => import('./assets/paint_bucket'), {
    category: 'glyph',
    synonyms: ['paint', 'fill', 'bucket', 'color', 'flood fill'],
  }),
  commandLine: withMetadata(() => import('./assets/command_line'), {
    category: 'glyph',
    synonyms: ['terminal', 'cli', 'console', 'shell', 'command', 'prompt'],
  }),
  comment: withMetadata(() => import('./assets/comment'), {
    category: 'glyph',
    synonyms: ['comment', 'chat', 'message', 'feedback', 'discussion'],
  }),
  compare: withMetadata(() => import('./assets/compare'), {
    category: 'glyph',
    synonyms: ['compare', 'diff', 'versus', 'side by side'],
  }),
  compute: () => import('./assets/processor'), // NOTE: To be deprecated in favor of processor
  processor: withMetadata(() => import('./assets/processor'), {
    category: 'glyph',
    synonyms: ['processor', 'compute', 'cpu', 'transform', 'ingest'],
  }),
  console: () => import('./assets/command_line'), // NOTE: To be deprecated in favor of commandLine
  consoleApp: withMetadata(() => import('./assets/app_console'), {
    category: 'app',
  }),
  container: withMetadata(() => import('./assets/container'), {
    category: 'glyph',
  }),
  continuityAbove: withMetadata(() => import('./assets/continuity_above'), {
    category: 'glyph',
  }),
  continuityAboveBelow: withMetadata(
    () => import('./assets/continuity_above_below'),
    { category: 'glyph' }
  ),
  continuityBelow: withMetadata(() => import('./assets/continuity_below'), {
    category: 'glyph',
  }),
  continuityWithin: withMetadata(() => import('./assets/continuity_within'), {
    category: 'glyph',
  }),
  contrast: withMetadata(() => import('./assets/contrast'), {
    category: 'glyph',
    synonyms: ['contrast', 'accessibility', 'visibility', 'a11y'],
  }),
  contrastHigh: () => import('./assets/contrast_fill'), // NOTE: To be deprecated in favor of contrastFill
  contrastFill: withMetadata(() => import('./assets/contrast_fill'), {
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['controls', 'sliders', 'settings', 'adjust', 'panel'],
  }),
  controlsHorizontal: () => import('./assets/controls'), // NOTE: To be deprecated in favor of `controls`
  controlsVertical: () => import('./assets/controls'), // NOTE: To be deprecated in favor of `controls`
  copy: withMetadata(() => import('./assets/copy'), {
    category: 'glyph',
    synonyms: ['duplicate', 'clone', 'clipboard', 'replicate', 'paste'],
  }),
  copyClipboard: () => import('./assets/copy'), // NOTE: To be deprecated in favor of `copy`
  crossProjectSearch: withMetadata(
    () => import('./assets/cross_project_search'),
    {
      category: 'glyph',
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
    category: 'glyph',
    synonyms: ['cross', 'close', 'cancel', 'delete'],
  }),
  crossClusterReplicationApp: withMetadata(
    () => import('./assets/app_cross_cluster_replication'),
    { category: 'app' }
  ),
  crossInCircle: () => import('./assets/cross_circle'), // NOTE: To be deprecated in favor of crossCircle
  crossCircle: withMetadata(() => import('./assets/cross_circle'), {
    category: 'glyph',
    synonyms: ['cross circle', 'cross', 'close', 'cancel', 'delete', 'circle'],
  }),
  crosshair: withMetadata(() => import('./assets/crosshair'), {
    category: 'glyph',
    synonyms: ['crosshair'],
  }),
  crosshairs: () => import('./assets/crosshair'), // NOTE: To be deprecated in favor of crosshair
  currency: () => import('./assets/money'), // NOTE: To be deprecated in favor of money
  money: withMetadata(() => import('./assets/money'), {
    category: 'glyph',
    synonyms: ['money', 'payment', 'billing', 'cost', 'finance'],
  }),
  cut: () => import('./assets/scissors'), // NOTE: To be deprecated in favor of scissors
  scissors: withMetadata(() => import('./assets/scissors'), {
    category: 'glyph',
    synonyms: ['scissors'],
  }),
  dashboardApp: withMetadata(() => import('./assets/app_dashboard'), {
    category: 'app',
  }),
  dashedCircle: withMetadata(() => import('./assets/dashed_circle'), {
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['database', 'data', 'storage', 'sql', 'records'],
  }),
  desktop: () => import('./assets/display'), // NOTE: To be deprecated in favor of display
  display: withMetadata(() => import('./assets/display'), {
    category: 'glyph',
    synonyms: ['display'],
  }),
  devToolsApp: withMetadata(() => import('./assets/app_devtools'), {
    category: 'app',
  }),
  diff: () => import('./assets/compare'), // NOTE: To be deprecated in favor of compare
  discoverApp: withMetadata(() => import('./assets/app_discover'), {
    category: 'app',
  }),
  distributeHorizontal: withMetadata(
    () => import('./assets/distribute_horizontal'),
    {
      category: 'glyph',
      synonyms: ['distribute horizontal', 'distribute', 'horizontal'],
    }
  ),
  distributeVertical: withMetadata(
    () => import('./assets/distribute_vertical'),
    {
      category: 'glyph',
      synonyms: ['distribute vertical', 'distribute', 'vertical'],
    }
  ),
  download: withMetadata(() => import('./assets/download'), {
    category: 'glyph',
    synonyms: ['save', 'export', 'retrieve', 'get file', 'arrow down', 'pull'],
  }),
  drag: withMetadata(() => import('./assets/drag'), {
    category: 'glyph',
    synonyms: ['drag', 'move', 'grab', 'reorder', 'handle'],
  }),
  dragHorizontal: withMetadata(() => import('./assets/drag_horizontal'), {
    category: 'glyph',
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
    category: 'glyph',
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
  discuss: () => import('./assets/comment'), // NOTE: To be deprecated in favor of `comment`
  document: withMetadata(() => import('./assets/document'), {
    category: 'glyph',
    synonyms: ['document', 'file', 'page', 'paper', 'doc'],
  }),
  documentEdit: () => import('./assets/document_edit'), // NOTE: To be deprecated in favor of pencil
  documentation: withMetadata(() => import('./assets/documentation'), {
    category: 'glyph',
    synonyms: ['documentation', 'docs', 'help', 'guide', 'manual'],
  }),
  documents: withMetadata(() => import('./assets/documents'), {
    category: 'glyph',
    synonyms: ['documents', 'files', 'pages', 'papers', 'library'],
  }),
  dot: withMetadata(() => import('./assets/dot'), {
    category: 'glyph',
    synonyms: ['dot', 'point', 'bullet', 'period', 'circle'],
  }),
  dotInCircle: withMetadata(() => import('./assets/dot_in_circle'), {
    category: 'glyph',
  }),
  doubleArrowLeft: () => import('./assets/chevron_double_left'), // NOTE: To be deprecated in favor of chevronDoubleLeft
  chevronDoubleLeft: withMetadata(
    () => import('./assets/chevron_double_left'),
    {
      category: 'glyph',
      synonyms: ['chevron', 'double', 'left', 'rewind', 'back', 'previous'],
    }
  ),
  doubleArrowRight: () => import('./assets/chevron_double_right'), // NOTE: To be deprecated in favor of chevronDoubleRight
  chevronDoubleRight: withMetadata(
    () => import('./assets/chevron_double_right'),
    {
      category: 'glyph',
      synonyms: ['chevron', 'double', 'right', 'forward', 'skip', 'next'],
    }
  ),
  ellipsis: withMetadata(() => import('./assets/ellipsis'), {
    category: 'glyph',
    synonyms: ['ellipsis', 'more', 'menu', 'overflow', 'dots'],
  }),
  editorAlignCenter: () => import('./assets/text_align_center'), // NOTE: To be deprecated in favor of textAlignCenter
  textAlignCenter: withMetadata(() => import('./assets/text_align_center'), {
    category: 'glyph',
    synonyms: ['text', 'align', 'center', 'middle', 'typography'],
  }),
  editorAlignLeft: () => import('./assets/text_align_left'), // NOTE: To be deprecated in favor of textAlignLeft
  textAlignLeft: withMetadata(() => import('./assets/text_align_left'), {
    category: 'glyph',
    synonyms: ['text', 'align', 'left', 'typography', 'paragraph'],
  }),
  editorAlignRight: () => import('./assets/text_align_right'), // NOTE: To be deprecated in favor of textAlignRight
  textAlignRight: withMetadata(() => import('./assets/text_align_right'), {
    category: 'glyph',
    synonyms: ['text', 'align', 'right', 'typography', 'paragraph'],
  }),
  editorBold: () => import('./assets/text_bold'), // NOTE: To be deprecated in favor of textBold
  textBold: withMetadata(() => import('./assets/text_bold'), {
    category: 'glyph',
    synonyms: ['text bold', 'text', 'bold', 'typography', 'formatting'],
  }),
  editorChecklist: () => import('./assets/list_check'), // NOTE: To be deprecated in favor of listCheck
  listCheck: withMetadata(() => import('./assets/list_check'), {
    category: 'glyph',
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
  editorCodeBlock: () => import('./assets/code'), // NOTE: To be deprecated in favor of `code`
  editorComment: () => import('./assets/comment'), // NOTE: To be deprecated in favor of `comment`
  editorDistributeHorizontal: () =>
    import('./assets/editor_distribute_horizontal'), // NOTE: To be deprecated in favor of distributeHorizontal
  editorDistributeVertical: () => import('./assets/editor_distribute_vertical'), // NOTE: To be deprecated in favor of distributeVertical
  editorHeading: () => import('./assets/text_heading'), // NOTE: To be deprecated in favor of textHeading
  textHeading: withMetadata(() => import('./assets/text_heading'), {
    category: 'glyph',
    synonyms: ['text', 'heading', 'title', 'h1', 'typography', 'header'],
  }),
  editorItalic: () => import('./assets/text_italic'), // NOTE: To be deprecated in favor of textItalic
  textItalic: withMetadata(() => import('./assets/text_italic'), {
    category: 'glyph',
    synonyms: ['text italic', 'text', 'italic', 'typography', 'formatting'],
  }),
  editorItemAlignBottom: () => import('./assets/editor_item_align_bottom'), // NOTE: To be deprecated in favor of alignBottom
  editorItemAlignCenter: () => import('./assets/editor_item_align_center'), // NOTE: To be deprecated in favor of alignCenterHorizontal
  editorItemAlignLeft: () => import('./assets/editor_item_align_left'), // NOTE: To be deprecated in favor of alignLeft
  editorItemAlignMiddle: () => import('./assets/editor_item_align_middle'), // NOTE: To be deprecated in favor of alignCenterVertical
  editorItemAlignRight: () => import('./assets/editor_item_align_right'), // NOTE: To be deprecated in favor of alignRight
  editorItemAlignTop: () => import('./assets/editor_item_align_top'), // NOTE: To be deprecated in favor of alignTop,
  editorLink: () => import('./assets/link'), // NOTE: To be deprecated in favor of `link`
  editorOrderedList: () => import('./assets/list_number'), // NOTE: To be deprecated in favor of listNumber
  listNumber: withMetadata(() => import('./assets/list_number'), {
    category: 'glyph',
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
  editorPositionBottomLeft: () =>
    import('./assets/editor_position_bottom_left'), // NOTE: To be deprecated in favor of alignBottomLeft
  editorPositionBottomRight: () =>
    import('./assets/editor_position_bottom_right'), // NOTE: To be deprecated in favor of alignBottomRight
  editorPositionTopLeft: () => import('./assets/editor_position_top_left'), // NOTE: To be deprecated in favor of alignTopLeft
  editorPositionTopRight: () => import('./assets/editor_position_top_right'), // NOTE: To be deprecated in favor of alignTopRight
  editorRedo: () => import('./assets/redo'), // NOTE: To be deprecated in favor of redo
  redo: withMetadata(() => import('./assets/redo'), {
    category: 'glyph',
    synonyms: ['redo', 'repeat', 'forward', 'again'],
  }),
  editorStrike: () => import('./assets/text_strike'), // NOTE: To be deprecated in favor of textStrike
  textStrike: withMetadata(() => import('./assets/text_strike'), {
    category: 'glyph',
    synonyms: ['text', 'strikethrough', 'strike', 'delete', 'typography'],
  }),
  editorTable: () => import('./assets/table'), // NOTE: To be deprecated in favor of table
  table: withMetadata(() => import('./assets/table'), {
    category: 'glyph',
    synonyms: ['table'],
  }),
  editorUnderline: () => import('./assets/text_underline'), // NOTE: To be deprecated in favor of textUnderline
  textUnderline: withMetadata(() => import('./assets/text_underline'), {
    category: 'glyph',
    synonyms: [
      'text underline',
      'text',
      'underline',
      'typography',
      'formatting',
    ],
  }),
  editorUndo: () => import('./assets/undo'), // NOTE: To be deprecated in favor of undo
  undo: withMetadata(() => import('./assets/undo'), {
    category: 'glyph',
    synonyms: ['undo', 'revert', 'back', 'previous action'],
  }),
  editorUnorderedList: () => import('./assets/list_bullet'), // NOTE: To be deprecated in favor of listBullet
  listBullet: withMetadata(() => import('./assets/list_bullet'), {
    category: 'glyph',
    synonyms: ['list bullet', 'list', 'bullet', 'items', 'rows'],
  }),
  email: () => import('./assets/mail'), // NOTE: To be deprecated in favor of mail
  mail: withMetadata(() => import('./assets/mail'), {
    category: 'glyph',
    synonyms: ['mail', 'email', 'envelope', 'message', 'inbox'],
  }),
  empty: withMetadata(() => import('./assets/empty'), {
    category: 'glyph',
    synonyms: ['empty', 'blank', 'none', 'placeholder', 'void'],
  }),
  emsApp: withMetadata(() => import('./assets/app_ems'), { category: 'app' }),
  endpoint: withMetadata(() => import('./assets/endpoint'), {
    category: 'glyph',
    synonyms: ['endpoint', 'api', 'url', 'connection', 'target'],
  }),
  eql: () => import('./assets/query'), // NOTE: To be deprecated in favor of query
  query: withMetadata(() => import('./assets/query'), {
    category: 'glyph',
    synonyms: ['query', 'search', 'sql', 'lucene', 'filter'],
  }),
  eraser: withMetadata(() => import('./assets/eraser'), {
    category: 'glyph',
    synonyms: ['eraser', 'clear', 'remove', 'delete', 'rubber'],
  }),
  error: withMetadata(() => import('./assets/error'), {
    category: 'glyph',
    synonyms: ['error', 'failure', 'problem', 'invalid', 'cross'],
  }),
  errorFilled: () => import('./assets/error_fill'), // NOTE: To be deprecated in favor of errorFill
  errorFill: withMetadata(() => import('./assets/error_fill'), {
    category: 'glyph',
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
  esqlVis: withMetadata(() => import('./assets/esql_vis'), {
    category: 'glyph',
  }),
  exit: () => import('./assets/log_out'), // NOTE: To be deprecated in favor of logOut
  logOut: withMetadata(() => import('./assets/log_out'), {
    category: 'glyph',
    synonyms: ['log out', 'log', 'out'],
  }),
  expand: () => import('./assets/maximize'), // NOTE: To be deprecated in favor of maximize
  maximize: withMetadata(() => import('./assets/maximize'), {
    category: 'glyph',
    synonyms: ['maximize'],
  }),
  expandMini: () => import('./assets/maximize'), // NOTE: To be deprecated in favor of maximize
  export: () => import('./assets/upload'),
  exportAction: () => import('./assets/upload'), // NOTE: To be deprecated in favor of upload
  upload: withMetadata(() => import('./assets/upload'), {
    category: 'glyph',
    synonyms: ['upload', 'import', 'send', 'cloud', 'arrow up'],
  }),
  external: withMetadata(() => import('./assets/external'), {
    category: 'glyph',
    synonyms: ['external', 'open new', 'link out', 'outside'],
  }),
  eye: withMetadata(() => import('./assets/eye'), {
    category: 'glyph',
    synonyms: ['eye', 'view', 'visible', 'show', 'preview', 'watch'],
  }),
  eyeClosed: () => import('./assets/eye_slash'), // NOTE: To be deprecated in favor of eyeSlash
  eyeSlash: withMetadata(() => import('./assets/eye_slash'), {
    category: 'glyph',
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
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['face neutral', 'face', 'neutral'],
  }),
  faceSad: withMetadata(() => import('./assets/face_sad'), {
    category: 'glyph',
    synonyms: ['face sad', 'face', 'sad'],
  }),
  fieldStatistics: () => import('./assets/table_info'), // NOTE: To be deprecated in favor of tableInfo
  tableInfo: withMetadata(() => import('./assets/table_info'), {
    category: 'glyph',
    synonyms: ['table', 'info', 'metadata', 'details', 'schema', 'columns'],
  }),
  filebeatApp: withMetadata(() => import('./assets/app_filebeat'), {
    category: 'app',
  }),
  filter: withMetadata(() => import('./assets/filter'), {
    category: 'glyph',
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
    category: 'glyph',
    synonyms: ['filter', 'exclude', 'remove', 'minus', 'refine', 'narrow'],
  }),
  filterIgnore: withMetadata(() => import('./assets/filter_ignore'), {
    category: 'glyph',
    synonyms: ['filter', 'ignore', 'skip', 'exclude', 'omit', 'hide'],
  }),
  filterInclude: withMetadata(() => import('./assets/filter_include'), {
    category: 'glyph',
    synonyms: ['filter', 'include', 'add', 'refine', 'narrow', 'select'],
  }),
  filterInCircle: () => import('./assets/filter_in_circle'), // NOTE: To be deprecated in favor of filter
  flask: withMetadata(() => import('./assets/flask'), {
    category: 'glyph',
    synonyms: ['flask', 'experiment', 'lab', 'science', 'test'],
  }),
  flag: withMetadata(() => import('./assets/flag'), {
    category: 'glyph',
    synonyms: ['flag', 'mark', 'report', 'bookmark', 'priority'],
  }),
  fleetApp: withMetadata(() => import('./assets/app_agent'), {
    category: 'app',
  }),
  fold: withMetadata(() => import('./assets/fold'), { category: 'glyph' }),
  folder: () => import('./assets/folder_close'),
  folderClosed: () => import('./assets/folder_close'),
  folderClose: withMetadata(() => import('./assets/folder_close'), {
    category: 'glyph',
    synonyms: ['folder', 'closed', 'collapse', 'directory', 'archive'],
  }),
  folderCheck: () => import('./assets/folder_check'),
  folderExclamation: withMetadata(() => import('./assets/folder_exclamation'), {
    category: 'glyph',
  }),
  folderOpen: withMetadata(() => import('./assets/folder_open'), {
    category: 'glyph',
    synonyms: ['folder', 'open', 'expand', 'directory', 'browse'],
  }),
  folderOpened: () => import('./assets/folder_open'),
  frameNext: withMetadata(() => import('./assets/frame_next'), {
    category: 'glyph',
  }),
  framePrevious: withMetadata(() => import('./assets/frame_previous'), {
    category: 'glyph',
  }),
  fullScreen: withMetadata(() => import('./assets/full_screen'), {
    category: 'glyph',
    synonyms: ['fullscreen'],
  }),
  fullScreenExit: withMetadata(() => import('./assets/full_screen_exit'), {
    category: 'glyph',
    synonyms: ['fullscreen', 'exit', 'minimize', 'window', 'restore', 'shrink'],
  }),
  function: withMetadata(() => import('./assets/function'), {
    category: 'glyph',
  }),
  gear: withMetadata(() => import('./assets/gear'), {
    category: 'glyph',
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
  glasses: () => import('./assets/read_only'), // NOTE: To be deprecated in favor of `readOnly`
  globe: withMetadata(() => import('./assets/globe'), {
    category: 'glyph',
    synonyms: ['globe', 'world', 'web', 'internet', 'international'],
  }),
  grab: () => import('./assets/drag_vertical'), // NOTE: To be deprecated in favor of dragVertical
  grabHorizontal: () => import('./assets/drag_horizontal'), // NOTE: To be deprecated in favor of dragHorizontal
  grabOmnidirectional: () => import('./assets/grab_omnidirectional'), // NOTE: To be deprecated in favor of drag,
  gradient: withMetadata(() => import('./assets/gradient'), {
    category: 'glyph',
    synonyms: ['gradient', 'blend', 'fade', 'color transition'],
  }),
  graphApp: withMetadata(() => import('./assets/app_graph'), {
    category: 'app',
  }),
  grid: withMetadata(() => import('./assets/grid'), {
    category: 'glyph',
    synonyms: ['grid', 'table', 'layout', 'matrix', 'cells'],
  }),
  grokApp: withMetadata(() => import('./assets/app_grok'), { category: 'app' }),
  heart: withMetadata(() => import('./assets/heart'), {
    category: 'glyph',
    synonyms: ['heart', 'favorite', 'like', 'love', 'bookmark'],
  }),
  heartbeatApp: withMetadata(() => import('./assets/app_heartbeat'), {
    category: 'app',
  }),
  heatmap: () => import('./assets/chart_heatmap'), // NOTE: To be deprecated in favor of chartHeatmap
  help: withMetadata(() => import('./assets/help'), { category: 'glyph' }), // NOTE: Might be deprecated later (not recommended in Kibana)
  home: withMetadata(() => import('./assets/home'), {
    category: 'glyph',
    synonyms: ['home', 'house', 'main', 'start', 'dashboard'],
  }),
  hourglass: withMetadata(() => import('./assets/hourglass'), {
    category: 'glyph',
    synonyms: ['hourglass', 'waiting', 'loading', 'time', 'pending'],
  }),
  if: withMetadata(() => import('./assets/if'), {
    category: 'glyph',
    synonyms: ['if', 'condition', 'logic', 'branch', 'rule'],
  }),
  info: withMetadata(() => import('./assets/info'), {
    category: 'glyph',
    synonyms: ['info', 'information', 'help', 'about', 'details'],
  }),
  image: withMetadata(() => import('./assets/image'), {
    category: 'glyph',
    synonyms: ['image', 'picture', 'photo', 'media', 'graphic'],
  }),
  importAction: () => import('./assets/download'), // NOTE: To be deprecated in favor of download
  index: withMetadata(() => import('./assets/index'), { category: 'glyph' }),
  indexClose: withMetadata(() => import('./assets/index_close'), {
    category: 'glyph',
    synonyms: ['index', 'close', 'elasticsearch', 'dataset', 'remove'],
  }),
  indexEdit: withMetadata(() => import('./assets/index_edit'), {
    category: 'glyph',
    synonyms: [
      'index',
      'edit',
      'elasticsearch',
      'dataset',
      'modify',
      'settings',
    ],
  }),
  indexFlush: () => import('./assets/chart_threshold'), // NOTE: To be deprecated in favor of chartThreshold
  indexManagementApp: withMetadata(
    () => import('./assets/app_index_management'),
    { category: 'app' }
  ),
  indexMapping: () => import('./assets/mapping'), // NOTE: To be deprecated in favor of mapping
  mapping: withMetadata(() => import('./assets/mapping'), {
    category: 'glyph',
    synonyms: ['mapping'],
  }),
  indexOpen: withMetadata(() => import('./assets/index_open'), {
    category: 'glyph',
    synonyms: ['index', 'open', 'elasticsearch', 'dataset', 'browse'],
  }),
  indexPatternApp: withMetadata(() => import('./assets/app_index_pattern'), {
    category: 'app',
  }),
  indexRollupApp: withMetadata(() => import('./assets/app_index_rollup'), {
    category: 'app',
  }),
  indexRuntime: withMetadata(() => import('./assets/index_runtime'), {
    category: 'glyph',
    synonyms: ['index', 'runtime', 'elasticsearch', 'live', 'execution'],
  }),
  indexSettings: withMetadata(() => import('./assets/index_settings'), {
    category: 'glyph',
    synonyms: ['index', 'settings', 'elasticsearch', 'configure', 'options'],
  }),
  indexTemporary: () => import('./assets/table_time'), // NOTE: To be deprecated in favor of tableTime
  tableTime: withMetadata(() => import('./assets/table_time'), {
    category: 'glyph',
    synonyms: ['table', 'time', 'temporal', 'date', 'timeline', 'history'],
  }),
  infinity: withMetadata(() => import('./assets/infinity'), {
    category: 'glyph',
    synonyms: ['infinity', 'unlimited', 'forever', 'loop', 'endless'],
  }),
  inputOutput: withMetadata(() => import('./assets/input_output'), {
    category: 'glyph',
    synonyms: ['input', 'output', 'io', 'data flow', 'pipeline', 'stream'],
  }),
  inspect: withMetadata(() => import('./assets/inspect'), {
    category: 'glyph',
    synonyms: ['inspect', 'investigate', 'examine', 'analyze', 'look'],
  }),
  invert: () => import('./assets/contrast'), // NOTE: To be deprecated in favor of contrast
  ip: withMetadata(() => import('./assets/ip'), { category: 'glyph' }),
  key: withMetadata(() => import('./assets/key'), {
    category: 'glyph',
    synonyms: ['key', 'password', 'credential', 'access', 'security'],
  }),
  keyboard: withMetadata(() => import('./assets/keyboard'), {
    category: 'glyph',
    synonyms: ['keyboard', 'typing', 'input', 'shortcut', 'keys'],
  }),
  kqlField: () => import('./assets/query_field'), // NOTE: To be deprecated in favor of queryField
  queryField: withMetadata(() => import('./assets/query_field'), {
    category: 'glyph',
    synonyms: ['query', 'field', 'filter', 'column', 'attribute', 'selector'],
  }),
  kqlFunction: withMetadata(() => import('./assets/kql_function'), {
    category: 'glyph',
  }),
  kqlOperand: () => import('./assets/query_operand'), // NOTE: To be deprecated in favor of queryOperand
  queryOperand: withMetadata(() => import('./assets/query_operand'), {
    category: 'glyph',
    synonyms: ['query', 'operand', 'operator', 'logic', 'condition', 'rule'],
  }),
  kqlSelector: () => import('./assets/query_selector'), // NOTE: To be deprecated in favor of querySelector
  querySelector: withMetadata(() => import('./assets/query_selector'), {
    category: 'glyph',
    synonyms: ['query', 'selector', 'pick', 'choose', 'field', 'filter'],
  }),
  kqlValue: () => import('./assets/query_value'), // NOTE: To be deprecated in favor of queryValue
  queryValue: withMetadata(() => import('./assets/query_value'), {
    category: 'glyph',
    synonyms: ['query', 'value', 'literal', 'data', 'input', 'filter'],
  }),
  kubernetesNode: withMetadata(() => import('./assets/kubernetes_node'), {
    category: 'glyph',
  }),
  kubernetesPod: withMetadata(() => import('./assets/kubernetes_pod'), {
    category: 'glyph',
    synonyms: [
      'kubernetes',
      'pod',
      'k8s',
      'container',
      'cluster',
      'orchestration',
    ],
  }),
  launch: () => import('./assets/rocket'), // NOTE: To be deprecated in favor of rocket
  rocket: withMetadata(() => import('./assets/rocket'), {
    category: 'glyph',
    synonyms: ['rocket', 'launch', 'deploy', 'fast', 'startup'],
  }),
  layers: withMetadata(() => import('./assets/layers'), {
    category: 'glyph',
    synonyms: ['layers'],
  }),
  lensApp: withMetadata(() => import('./assets/app_lens'), { category: 'app' }),
  lettering: () => import('./assets/text'), // NOTE: To be deprecated in favor of text
  text: withMetadata(() => import('./assets/text'), {
    category: 'glyph',
    synonyms: ['text'],
  }),
  lineBreak: withMetadata(() => import('./assets/line_break'), {
    category: 'glyph',
    synonyms: ['line break', 'newline', 'paragraph', 'text', 'wrap', 'return'],
  }),
  lineBreakSlash: withMetadata(() => import('./assets/line_break_slash'), {
    category: 'glyph',
    synonyms: ['line break', 'slash', 'text', 'separator', 'paragraph'],
  }),
  lineDash: withMetadata(() => import('./assets/line_dash'), {
    category: 'glyph',
    synonyms: ['line dash', 'line', 'dash'],
  }),
  lineDashed: () => import('./assets/line_dash'), // NOTE: To be deprecated in favor of lineDash
  lineDot: withMetadata(() => import('./assets/line_dot'), {
    category: 'glyph',
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
  lineDotted: () => import('./assets/line_dot'), // NOTE: To be deprecated in favor of lineDot
  lineSolid: withMetadata(() => import('./assets/line_solid'), {
    category: 'glyph',
    synonyms: ['line solid', 'line', 'solid'],
  }),
  link: withMetadata(() => import('./assets/link'), {
    category: 'glyph',
    synonyms: ['link', 'url', 'chain', 'connect', 'hyperlink'],
  }),
  linkSlash: withMetadata(() => import('./assets/link_slash'), {
    category: 'glyph',
    synonyms: ['unlink', 'broken link', 'remove link', 'disconnect', 'url'],
  }),
  list: () => import('./assets/list_bullet'), // NOTE: To be deprecated in favor of listBullet,
  listAdd: () => import('./assets/plus_circle'), // NOTE: To be deprecated in favor of `plus_circle`
  lock: withMetadata(() => import('./assets/lock'), {
    category: 'glyph',
    synonyms: ['lock', 'secure', 'private', 'protected', 'password'],
  }),
  lockOpen: withMetadata(() => import('./assets/lock_open'), {
    category: 'glyph',
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
  logPatternAnalysis: () => import('./assets/pattern'), // NOTE: To be deprecated in favor of pattern
  pattern: withMetadata(() => import('./assets/pattern'), {
    category: 'glyph',
    synonyms: ['pattern', 'texture', 'repeat', 'design', 'fill'],
  }),
  logRateAnalysis: withMetadata(() => import('./assets/log_rate_analysis'), {
    category: 'glyph',
  }),
  logoAWS: () => import('./assets/logo_aws'),
  logoAWSMono: () => import('./assets/logo_aws_mono'),
  logoAerospike: () => import('./assets/logo_aerospike'),
  logoApache: () => import('./assets/logo_apache'),
  logoAppSearch: withMetadata(() => import('./assets/logo_app_search'), {
    category: 'logo',
  }),
  logoAzure: () => import('./assets/logo_azure'),
  logoAzureMono: () => import('./assets/logo_azure_mono'),
  logoBeats: withMetadata(() => import('./assets/logo_beats'), {
    category: 'logo',
  }),
  logoBusinessAnalytics: withMetadata(
    () => import('./assets/logo_business_analytics'),
    { category: 'logo' }
  ),
  logoCeph: () => import('./assets/logo_ceph'),
  logoCloud: withMetadata(() => import('./assets/logo_cloud'), {
    category: 'logo',
  }),
  logoCloudEnterprise: withMetadata(() => import('./assets/logo_cloud_ece'), {
    category: 'logo',
  }),
  logoCode: () => import('./assets/logo_code'),
  logoCodesandbox: () => import('./assets/logo_codesandbox'),
  logoCouchbase: () => import('./assets/logo_couchbase'),
  logoDocker: () => import('./assets/logo_docker'),
  logoDropwizard: () => import('./assets/logo_dropwizard'),
  logoElastic: withMetadata(() => import('./assets/logo_elastic'), {
    category: 'logo',
  }),
  logoElasticStack: withMetadata(() => import('./assets/logo_elastic_stack'), {
    category: 'logo',
  }),
  logoElasticsearch: withMetadata(() => import('./assets/logo_elasticsearch'), {
    category: 'logo',
  }),
  logoEnterpriseSearch: withMetadata(
    () => import('./assets/logo_enterprise_search'),
    { category: 'logo' }
  ),
  logoEtcd: () => import('./assets/logo_etcd'),
  logoGCP: () => import('./assets/logo_gcp'),
  logoGCPMono: () => import('./assets/logo_gcp_mono'),
  logoGithub: () => import('./assets/logo_github'),
  logoGmail: () => import('./assets/logo_gmail'),
  logoGolang: () => import('./assets/logo_golang'),
  logoGoogleG: () => import('./assets/logo_google_g'),
  logoHAproxy: () => import('./assets/logo_haproxy'),
  logoIBM: () => import('./assets/logo_ibm'),
  logoIBMMono: () => import('./assets/logo_ibm_mono'),
  logoKafka: () => import('./assets/logo_kafka'),
  logoKibana: withMetadata(() => import('./assets/logo_kibana'), {
    category: 'logo',
  }),
  logoKubernetes: () => import('./assets/logo_kubernetes'),
  logoLogging: withMetadata(() => import('./assets/logo_logging'), {
    category: 'logo',
  }),
  logoLogstash: withMetadata(() => import('./assets/logo_logstash'), {
    category: 'logo',
  }),
  logoMaps: withMetadata(() => import('./assets/logo_maps'), {
    category: 'logo',
  }),
  logoMemcached: () => import('./assets/logo_memcached'),
  logoMetrics: withMetadata(() => import('./assets/logo_metrics'), {
    category: 'logo',
  }),
  logoMongodb: () => import('./assets/logo_mongodb'),
  logoMySQL: () => import('./assets/logo_mysql'),
  logoNginx: () => import('./assets/logo_nginx'),
  logoObservability: withMetadata(() => import('./assets/logo_observability'), {
    category: 'logo',
  }),
  logoOsquery: () => import('./assets/logo_osquery'),
  logoPhp: () => import('./assets/logo_php'),
  logoPostgres: () => import('./assets/logo_postgres'),
  logoPrometheus: () => import('./assets/logo_prometheus'),
  logoRabbitmq: () => import('./assets/logo_rabbitmq'),
  logoRedis: () => import('./assets/logo_redis'),
  logoSecurity: withMetadata(() => import('./assets/logo_security'), {
    category: 'logo',
  }),
  logoSiteSearch: withMetadata(() => import('./assets/logo_site_search'), {
    category: 'logo',
  }),
  logoSketch: () => import('./assets/logo_sketch'),
  logoSlack: () => import('./assets/logo_slack'),
  logoUptime: withMetadata(() => import('./assets/logo_uptime'), {
    category: 'logo',
  }),
  logoVectorDB: withMetadata(() => import('./assets/logo_vector_db'), {
    category: 'logo',
  }),
  logoVulnerabilityManagement: withMetadata(
    () => import('./assets/logo_vulnerability_management'),
    { category: 'logo' }
  ),
  logoWebhook: () => import('./assets/logo_webhook'),
  logoWindows: () => import('./assets/logo_windows'),
  logoWorkplaceSearch: withMetadata(
    () => import('./assets/logo_workplace_search'),
    { category: 'logo' }
  ),
  logsApp: withMetadata(() => import('./assets/app_logs'), { category: 'app' }),
  logstashFilter: withMetadata(() => import('./assets/logstash_filter'), {
    category: 'glyph',
  }),
  logstashIf: () => import('./assets/if'), // NOTE: To be deprecated in favor of if
  logstashInput: withMetadata(() => import('./assets/logstash_input'), {
    category: 'glyph',
  }),
  logstashOutput: withMetadata(() => import('./assets/logstash_output'), {
    category: 'glyph',
  }),
  logstashQueue: () => import('./assets/queue'), // NOTE: To be deprecated in favor of queue
  queue: withMetadata(() => import('./assets/queue'), {
    category: 'glyph',
    synonyms: ['queue', 'line', 'buffer', 'waiting', 'jobs'],
  }),
  machineLearningApp: withMetadata(() => import('./assets/app_ml'), {
    category: 'app',
  }),
  magnet: withMetadata(() => import('./assets/magnet'), { category: 'glyph' }),
  magnify: withMetadata(() => import('./assets/magnify'), {
    category: 'glyph',
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
  magnifyExclamation: withMetadata(
    () => import('./assets/magnify_exclamation'),
    {
      category: 'glyph',
      synonyms: ['search', 'alert', 'warning', 'find', 'magnify', 'important'],
    }
  ),
  magnifyMinus: withMetadata(() => import('./assets/magnify_minus'), {
    category: 'glyph',
    synonyms: ['zoom out', 'search', 'minus', 'shrink', 'magnify'],
  }),
  magnifyPlus: withMetadata(() => import('./assets/magnify_plus'), {
    category: 'glyph',
    synonyms: ['zoom in', 'search', 'plus', 'enlarge', 'magnify'],
  }),
  magnifyWithExclamation: () => import('./assets/magnify_with_exclamation'), // NOTE: To be deprecated in favor of magnifyExclamation
  magnifyWithMinus: () => import('./assets/magnify_with_minus'), // NOTE: To be deprecated in favor of magnifyMinus
  magnifyWithPlus: () => import('./assets/magnify_with_plus'), // NOTE: To be deprecated in favor of magnifyPlus,
  managementApp: withMetadata(() => import('./assets/app_management'), {
    category: 'app',
  }),
  map: withMetadata(() => import('./assets/map'), {
    category: 'glyph',
    synonyms: ['map', 'location', 'geo', 'geography', 'region'],
  }),
  mapMarker: () => import('./assets/waypoint'), // NOTE: To be deprecated in favor of waypoint
  waypoint: withMetadata(() => import('./assets/waypoint'), {
    category: 'glyph',
    synonyms: ['waypoint', 'marker', 'step', 'node', 'path'],
  }),
  megaphone: withMetadata(() => import('./assets/megaphone'), {
    category: 'glyph',
    synonyms: ['megaphone', 'announce', 'broadcast', 'marketing', 'loud'],
  }),
  memory: withMetadata(() => import('./assets/memory'), { category: 'glyph' }),
  menu: withMetadata(() => import('./assets/menu'), {
    category: 'glyph',
    synonyms: ['menu', 'hamburger', 'navigation', 'options', 'bars'],
  }),
  menuDown: withMetadata(() => import('./assets/menu_down'), {
    category: 'glyph',
  }),
  menuLeft: withMetadata(() => import('./assets/menu_left'), {
    category: 'glyph',
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
    category: 'glyph',
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
  menuUp: withMetadata(() => import('./assets/menu_up'), { category: 'glyph' }),
  merge: withMetadata(() => import('./assets/merge'), {
    category: 'glyph',
    synonyms: ['merge', 'combine', 'join', 'unite', 'git'],
  }),
  metricbeatApp: withMetadata(() => import('./assets/app_metricbeat'), {
    category: 'app',
  }),
  metricsApp: withMetadata(() => import('./assets/app_metrics'), {
    category: 'app',
  }),
  minimize: withMetadata(() => import('./assets/minimize'), {
    category: 'glyph',
    synonyms: ['minimize'],
  }),
  minus: withMetadata(() => import('./assets/minus'), {
    category: 'glyph',
    synonyms: ['minus', 'remove', 'subtract', 'decrement'],
  }),
  minusCircle: withMetadata(() => import('./assets/minus_circle'), {
    category: 'glyph',
    synonyms: [
      'minus circle',
      'minus',
      'remove',
      'subtract',
      'decrement',
      'circle',
    ],
  }),
  minusInCircle: () => import('./assets/minus_circle'), // NOTE: To be deprecated in favor of minusCircle
  minusInCircleFilled: () => import('./assets/minus_circle'), // NOTE: To be deprecated in favor of minusCircle
  minusInSquare: () => import('./assets/minus_square'), // NOTE: To be deprecated in favor of minusSquare
  minusSquare: withMetadata(() => import('./assets/minus_square'), {
    category: 'glyph',
    synonyms: ['minus', 'square', 'remove', 'collapse', 'decrement'],
  }),
  mobile: withMetadata(() => import('./assets/mobile'), { category: 'glyph' }),
  monitoringApp: withMetadata(() => import('./assets/app_monitoring'), {
    category: 'app',
  }),
  moon: withMetadata(() => import('./assets/moon'), {
    category: 'glyph',
    synonyms: ['moon', 'dark', 'night', 'theme'],
  }),
  move: withMetadata(() => import('./assets/move'), {
    category: 'glyph',
    synonyms: ['move', 'relocate', 'drag', 'position', 'transfer'],
  }),
  namespace: withMetadata(() => import('./assets/namespace'), {
    category: 'glyph',
  }),
  nested: withMetadata(() => import('./assets/nested'), {
    category: 'glyph',
    synonyms: ['nested', 'hierarchy', 'tree', 'child', 'indent'],
  }),
  newChat: () => import('./assets/plus_circle'), // NOTE: To be deprecated in favor of plusCircle
  node: () => import('./assets/vector_triangle'), // NOTE: To be deprecated in favor of vectorTriangle
  vectorTriangle: withMetadata(() => import('./assets/vector_triangle'), {
    category: 'glyph',
    synonyms: ['vector', 'triangle', 'shape', 'geometry', 'delta'],
  }),
  notebookApp: withMetadata(() => import('./assets/app_notebook'), {
    category: 'app',
  }),
  number: withMetadata(() => import('./assets/number'), {
    category: 'glyph',
    synonyms: ['number', 'digit', 'numeric', 'count', 'hash'],
  }),
  offline: () => import('./assets/wifi_slash'), // NOTE: To be deprecated in favor of wifiSlash
  wifiSlash: withMetadata(() => import('./assets/wifi_slash'), {
    category: 'glyph',
    synonyms: [
      'wifi',
      'off',
      'disconnected',
      'network',
      'wireless',
      'no signal',
    ],
  }),
  online: () => import('./assets/wifi'), // NOTE: To be deprecated in favor of wifi
  wifi: withMetadata(() => import('./assets/wifi'), {
    category: 'glyph',
    synonyms: ['wifi', 'wireless', 'network', 'internet', 'connection'],
  }),
  outlierDetectionJob: withMetadata(
    () => import('./assets/ml_outlier_detection_job'),
    { category: 'ml' }
  ),
  package: withMetadata(() => import('./assets/package'), {
    category: 'glyph',
    synonyms: ['package', 'box', 'bundle', 'npm', 'module'],
  }),
  packetbeatApp: withMetadata(() => import('./assets/app_packetbeat'), {
    category: 'app',
  }),
  pageSelect: withMetadata(() => import('./assets/page_select'), {
    category: 'glyph',
  }),
  pagesSelect: withMetadata(() => import('./assets/pages_select'), {
    category: 'glyph',
    synonyms: ['pages', 'select', 'pagination', 'choose', 'document'],
  }),
  palette: withMetadata(() => import('./assets/palette'), {
    category: 'glyph',
    synonyms: ['palette', 'colors', 'theme', 'design', 'swatch'],
  }),
  paperClip: withMetadata(() => import('./assets/paper_clip'), {
    category: 'glyph',
    synonyms: ['attachment', 'clip', 'file', 'attach', 'paperclip'],
  }),
  partial: withMetadata(() => import('./assets/partial'), {
    category: 'glyph',
    synonyms: ['partial', 'incomplete', 'fragment', 'section'],
  }),
  pause: withMetadata(() => import('./assets/pause'), {
    category: 'glyph',
    synonyms: ['pause', 'hold', 'stop temporary', 'wait'],
  }),
  payment: withMetadata(() => import('./assets/payment'), {
    category: 'glyph',
  }),
  pencil: withMetadata(() => import('./assets/pencil'), {
    category: 'glyph',
    synonyms: ['pencil', 'edit', 'write', 'modify', 'pen'],
  }),
  percent: withMetadata(() => import('./assets/percent'), {
    category: 'glyph',
    synonyms: ['percent', 'percentage', 'ratio', 'rate'],
  }),
  pin: withMetadata(() => import('./assets/pin'), {
    category: 'glyph',
    synonyms: ['pin', 'anchor', 'stick', 'fixed', 'bookmark'],
  }),
  pinFill: withMetadata(() => import('./assets/pin_fill'), {
    category: 'glyph',
    synonyms: ['pin', 'filled', 'stick', 'anchor', 'fixed', 'bookmark'],
  }),
  pinFilled: () => import('./assets/pin_fill'), // NOTE: To be deprecated in favor of pinFill
  pipeBreaks: () => import('./assets/line_break'), // NOTE: To be deprecated in favor of lineBreak
  pipelineApp: withMetadata(() => import('./assets/app_pipeline'), {
    category: 'app',
  }),
  pipeNoBreaks: () => import('./assets/line_break_slash'), // NOTE: To be deprecated in favor of lineBreakSlash
  pivot: withMetadata(() => import('./assets/pivot'), {
    category: 'glyph',
    synonyms: ['pivot', 'table', 'transform', 'rotate', 'analytics'],
  }),
  play: withMetadata(() => import('./assets/play'), {
    category: 'glyph',
    synonyms: ['play', 'start', 'run', 'media', 'video'],
  }),
  playFilled: () => import('./assets/play_filled'), // NOTE: To be deprecated in favor of play
  plugs: withMetadata(() => import('./assets/plugs'), { category: 'glyph' }),
  plus: withMetadata(() => import('./assets/plus'), {
    category: 'glyph',
    synonyms: ['plus', 'add', 'new', 'create', 'increment'],
  }),
  plusCircle: withMetadata(() => import('./assets/plus_circle'), {
    category: 'glyph',
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
  plusInCircle: () => import('./assets/plus_circle'), // NOTE: To be deprecated in favor of plusCircle
  plusInCircleFilled: () => import('./assets/plus_circle'), // NOTE: To be deprecated in favor of plusCircle
  plusInSquare: () => import('./assets/plus_square'), // NOTE: To be deprecated in favor of plusSquare
  plusSquare: withMetadata(() => import('./assets/plus_square'), {
    category: 'glyph',
    synonyms: ['plus', 'square', 'add', 'expand', 'increment'],
  }),
  popout: () => import('./assets/external'), // NOTE: To be deprecated in favor of external
  presentation: withMetadata(() => import('./assets/presentation'), {
    category: 'glyph',
    synonyms: ['presentation', 'slides', 'deck', 'display', 'show'],
  }),
  productRobot: () => import('./assets/product_agent'), // NOTE: To be deprecated in favor of productAgent
  productAgent: withMetadata(() => import('./assets/product_agent'), {
    category: 'glyph',
    synonyms: ['agent', 'product', 'elastic agent', 'fleet', 'monitoring'],
  }),
  productCloudInfra: withMetadata(
    () => import('./assets/product_cloud_infra'),
    {
      category: 'glyph',
      synonyms: ['cloud', 'infrastructure', 'product', 'hosting', 'platform'],
    }
  ),
  productDashboard: withMetadata(() => import('./assets/product_dashboard'), {
    category: 'glyph',
    synonyms: ['dashboard', 'product', 'kibana', 'analytics', 'panel'],
  }),
  productDiscover: withMetadata(() => import('./assets/product_discover'), {
    category: 'glyph',
    synonyms: ['discover', 'product', 'explore', 'data', 'search', 'kibana'],
  }),
  productML: withMetadata(() => import('./assets/product_ml'), {
    category: 'glyph',
    synonyms: ['machine learning', 'ml', 'product', 'model', 'ai'],
  }),
  productStreamsClassic: withMetadata(
    () => import('./assets/product_streams_classic'),
    {
      category: 'glyph',
      synonyms: ['streams', 'classic', 'product', 'data', 'pipeline'],
    }
  ),
  productStreamsWired: withMetadata(
    () => import('./assets/product_streams_wired'),
    {
      category: 'glyph',
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
  push: withMetadata(() => import('./assets/send'), { category: 'glyph' }), // NOTE: To be deprecated in favor of send
  send: withMetadata(() => import('./assets/send'), {
    category: 'glyph',
    synonyms: ['send', 'submit', 'dispatch', 'arrow', 'share'],
  }),
  question: withMetadata(() => import('./assets/question'), {
    category: 'glyph',
    synonyms: ['question', 'help', 'unknown', 'faq', 'ask'],
  }),
  quote: withMetadata(() => import('./assets/quote'), {
    category: 'glyph',
    synonyms: ['quote', 'citation', 'blockquote', 'text'],
  }),
  radar: withMetadata(() => import('./assets/radar'), {
    category: 'glyph',
    synonyms: ['radar', 'scan', 'detect', 'monitor', 'signal'],
  }),
  readOnly: withMetadata(() => import('./assets/read_only'), {
    category: 'glyph',
    synonyms: ['read only', 'locked', 'view', 'permission', 'restrict'],
  }),
  recentlyViewedApp: withMetadata(
    () => import('./assets/app_recently_viewed'),
    { category: 'app' }
  ),
  refresh: withMetadata(() => import('./assets/refresh'), {
    category: 'glyph',
    synonyms: ['refresh', 'reload', 'sync', 'update', 'rotate'],
  }),
  regressionJob: withMetadata(() => import('./assets/ml_regression_job'), {
    category: 'ml',
  }),
  reporter: withMetadata(() => import('./assets/reporter'), {
    category: 'glyph',
    synonyms: ['reporter', 'report', 'export', 'document', 'output'],
  }),
  reportingApp: withMetadata(() => import('./assets/app_reporting'), {
    category: 'app',
  }),
  return: withMetadata(() => import('./assets/return'), {
    category: 'glyph',
    synonyms: ['return', 'enter', 'keyboard', 'submit', 'back', 'revert'],
  }),
  returnKey: () => import('./assets/return'), // NOTE: To be deprecated in favor of return
  save: withMetadata(() => import('./assets/save'), {
    category: 'glyph',
    synonyms: ['save', 'store', 'disk', 'persist', 'keep'],
  }),
  savedObjectsApp: withMetadata(() => import('./assets/app_saved_objects'), {
    category: 'app',
  }),
  scale: withMetadata(() => import('./assets/scale'), { category: 'glyph' }),
  search: () => import('./assets/magnify'), // NOTE: To be deprecated in favor of magnify
  searchProfilerApp: withMetadata(
    () => import('./assets/app_search_profiler'),
    { category: 'app' }
  ),
  section: withMetadata(() => import('./assets/section'), {
    category: 'glyph',
    synonyms: ['section', 'region', 'block', 'area', 'group'],
  }),
  securityAnalyticsApp: withMetadata(
    () => import('./assets/app_security_analytics'),
    { category: 'app' }
  ),
  securityApp: withMetadata(() => import('./assets/app_security'), {
    category: 'app',
  }),
  securitySignal: () => import('./assets/security_signal'), // NOTE: To be deprecated in favor of radar
  securitySignalDetected: withMetadata(
    () => import('./assets/security_signal_detected'),
    { category: 'glyph' }
  ),
  securitySignalResolved: withMetadata(
    () => import('./assets/security_signal_resolved'),
    { category: 'glyph' }
  ),
  server: withMetadata(() => import('./assets/server'), {
    category: 'glyph',
    synonyms: ['server', 'host', 'machine', 'infrastructure', 'backend'],
  }),
  sessionViewer: withMetadata(() => import('./assets/session_viewer'), {
    category: 'glyph',
  }),
  shard: withMetadata(() => import('./assets/shard'), {
    category: 'glyph',
    synonyms: ['shard', 'partition', 'segment', 'elastic', 'index'],
  }),
  share: withMetadata(() => import('./assets/share'), {
    category: 'glyph',
    synonyms: ['share', 'send', 'distribute', 'social', 'export'],
  }),
  significantEvents: withMetadata(() => import('./assets/significant_events'), {
    category: 'glyph',
    synonyms: [
      'events',
      'significant',
      'anomaly',
      'alert',
      'notable',
      'timeline',
    ],
  }),
  singleMetricViewer: withMetadata(
    () => import('./assets/single_metric_viewer'),
    { category: 'glyph' }
  ),
  snowflake: withMetadata(() => import('./assets/snowflake'), {
    category: 'glyph',
    synonyms: ['snowflake', 'unique', 'id', 'data warehouse'],
  }),
  sortAscending: withMetadata(() => import('./assets/sort_ascending'), {
    category: 'glyph',
    synonyms: ['sort', 'ascending', 'up', 'order', 'rank', 'increase'],
  }),
  sortDescending: withMetadata(() => import('./assets/sort_descending'), {
    category: 'glyph',
    synonyms: ['sort', 'descending', 'down', 'order', 'rank', 'decrease'],
  }),
  sortDown: withMetadata(() => import('./assets/sort_down'), {
    category: 'glyph',
    synonyms: ['sort down', 'sort', 'order', 'rank', 'arrange', 'down'],
  }),
  sortLeft: withMetadata(() => import('./assets/sort_left'), {
    category: 'glyph',
    synonyms: ['sort left', 'sort', 'order', 'rank', 'arrange', 'left'],
  }),
  sortRight: withMetadata(() => import('./assets/sort_right'), {
    category: 'glyph',
    synonyms: ['sort right', 'sort', 'order', 'rank', 'arrange', 'right'],
  }),
  sortUp: withMetadata(() => import('./assets/sort_up'), {
    category: 'glyph',
    synonyms: ['sort up', 'sort', 'order', 'rank', 'arrange', 'up'],
  }),
  sortable: withMetadata(() => import('./assets/sortable'), {
    category: 'glyph',
    synonyms: ['sortable', 'sort', 'order'],
  }),
  spaces: withMetadata(() => import('./assets/spaces'), { category: 'glyph' }),
  spacesApp: withMetadata(() => import('./assets/app_spaces'), {
    category: 'app',
  }),
  sparkles: withMetadata(() => import('./assets/sparkles'), {
    category: 'glyph',
    synonyms: ['sparkles', 'ai', 'magic', 'new', 'enhance', 'auto'],
  }),
  sqlApp: withMetadata(() => import('./assets/app_sql'), { category: 'app' }),
  star: withMetadata(() => import('./assets/star'), {
    category: 'glyph',
    synonyms: ['star', 'favorite', 'rating', 'bookmark'],
  }),
  starEmpty: () => import('./assets/star'), // NOTE: To be deprecated in favor of star
  starEmptySpace: withMetadata(() => import('./assets/star_empty_space'), {
    category: 'glyph',
  }),
  starFill: withMetadata(() => import('./assets/star_fill'), {
    category: 'glyph',
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
  starFilled: () => import('./assets/star_fill'), // NOTE: To be deprecated in favor of starFill,
  starFillSpace: withMetadata(() => import('./assets/star_fill_space'), {
    category: 'glyph',
  }),
  starFilledSpace: () => import('./assets/star_fill_space'), // NOTE: To be deprecated in favor of starFillSpace
  starMinusEmpty: withMetadata(() => import('./assets/star_minus_empty'), {
    category: 'glyph',
  }),
  starMinusFill: withMetadata(() => import('./assets/star_minus_fill'), {
    category: 'glyph',
  }),
  starMinusFilled: () => import('./assets/star_minus_fill'), // NOTE: To be deprecated in favor of starMinusFill
  starPlusEmpty: withMetadata(() => import('./assets/star_plus_empty'), {
    category: 'glyph',
  }),
  starPlusFill: withMetadata(() => import('./assets/star_plus_fill'), {
    category: 'glyph',
  }),
  starPlusFilled: () => import('./assets/star_plus_fill'), // NOTE: To be deprecated in favor of starPlusFill
  stats: withMetadata(() => import('./assets/stats'), { category: 'glyph' }),
  stop: withMetadata(() => import('./assets/stop'), {
    category: 'glyph',
    synonyms: ['stop', 'halt', 'end', 'terminate', 'square'],
  }),
  stopFill: withMetadata(() => import('./assets/stop_fill'), {
    category: 'glyph',
  }),
  stopFilled: () => import('./assets/stop_fill'), // NOTE: To be deprecated in favor of stopFill
  stopSlash: withMetadata(() => import('./assets/stop_slash'), {
    category: 'glyph',
  }),
  storage: withMetadata(() => import('./assets/storage'), {
    category: 'glyph',
    synonyms: ['storage', 'disk', 'drive', 'save', 'data store'],
  }),
  streamsClassic: () => import('./assets/product_streams_classic'), // NOTE: To be deprecated in favor of productStreamsClassic
  streamsWired: () => import('./assets/product_streams_wired'), // NOTE: To be deprecated in favor of productStreamsWired
  string: withMetadata(() => import('./assets/string'), { category: 'glyph' }),
  submodule: () => import('./assets/merge'), // NOTE: To be deprecated in favor of `merge`
  sun: withMetadata(() => import('./assets/sun'), {
    category: 'glyph',
    synonyms: ['sun', 'light', 'day', 'theme', 'bright'],
  }),
  swatchInput: () => import('./assets/swatch_input'), // Undocumented on purpose. Has an extra stroke for EuiColorPicker
  symlink: withMetadata(() => import('./assets/symlink'), {
    category: 'glyph',
    synonyms: ['symlink', 'shortcut', 'alias', 'link', 'reference'],
  }),
  tableDensityCompact: () => import('./assets/table_density_high'), // NOTE: To be deprecated in favor of tableDensityHigh
  tableDensityHigh: withMetadata(() => import('./assets/table_density_high'), {
    category: 'glyph',
    synonyms: ['table', 'density', 'compact', 'tight', 'rows', 'spacing'],
  }),
  tableDensityExpanded: () => import('./assets/table_density_low'), // NOTE: To be deprecated in favor of tableDensityLow
  tableDensityLow: withMetadata(() => import('./assets/table_density_low'), {
    category: 'glyph',
    synonyms: ['table', 'density', 'spacious', 'loose', 'rows', 'spacing'],
  }),
  tableDensityNormal: () => import('./assets/table'), // NOTE: To be deprecated in favor of table
  tableOfContents: withMetadata(() => import('./assets/table_of_contents'), {
    category: 'glyph',
  }),
  tag: withMetadata(() => import('./assets/tag'), {
    category: 'glyph',
    synonyms: ['tag', 'label', 'category', 'keyword', 'badge'],
  }),
  tear: withMetadata(() => import('./assets/tear'), { category: 'glyph' }),
  temperature: () => import('./assets/thermometer'), // NOTE: To be deprecated in favor of thermometer
  thermometer: withMetadata(() => import('./assets/thermometer'), {
    category: 'glyph',
    synonyms: ['thermometer', 'temperature', 'heat', 'metric', 'gauge'],
  }),
  thumbDown: withMetadata(() => import('./assets/thumb_down'), {
    category: 'glyph',
    synonyms: ['thumbs down', 'dislike', 'negative', 'vote', 'feedback', 'bad'],
  }),
  thumbUp: withMetadata(() => import('./assets/thumb_up'), {
    category: 'glyph',
    synonyms: ['thumbs up', 'like', 'positive', 'vote', 'feedback', 'good'],
  }),
  timeline: withMetadata(() => import('./assets/timeline'), {
    category: 'glyph',
    synonyms: ['timeline', 'history', 'events', 'chronological', 'sequence'],
  }),
  timelineWithArrow: withMetadata(
    () => import('./assets/timeline_with_arrow'),
    {
      category: 'glyph',
      synonyms: ['timeline', 'arrow', 'history', 'sequence', 'flow', 'events'],
    }
  ),
  timelionApp: withMetadata(() => import('./assets/app_timelion'), {
    category: 'app',
  }),
  timeRefresh: () => import('./assets/refresh_time'), // NOTE: To be deprecated in favor of refreshTime
  refreshTime: withMetadata(() => import('./assets/refresh_time'), {
    category: 'glyph',
    synonyms: ['refresh', 'time', 'reload', 'schedule', 'sync', 'clock'],
  }),
  timeslider: () => import('./assets/clock_control'), // NOTE: To be deprecated in favor of clockControl
  training: () => import('./assets/presentation'), // NOTE: To be deprecated in favor of presentation,
  transitionBottomIn: withMetadata(
    () => import('./assets/transition_bottom_in'),
    {
      category: 'glyph',
      synonyms: ['transition', 'bottom', 'in', 'animate', 'enter', 'motion'],
    }
  ),
  transitionBottomOut: withMetadata(
    () => import('./assets/transition_bottom_out'),
    {
      category: 'glyph',
      synonyms: ['transition', 'bottom', 'out', 'animate', 'exit', 'motion'],
    }
  ),
  transitionLeftIn: withMetadata(() => import('./assets/transition_left_in'), {
    category: 'glyph',
    synonyms: ['transition', 'left', 'in', 'animate', 'enter', 'motion'],
  }),
  transitionLeftOut: withMetadata(
    () => import('./assets/transition_left_out'),
    {
      category: 'glyph',
      synonyms: ['transition', 'left', 'out', 'animate', 'exit', 'motion'],
    }
  ),
  transitionTopIn: withMetadata(() => import('./assets/transition_top_in'), {
    category: 'glyph',
    synonyms: ['transition', 'top', 'in', 'animate', 'enter', 'motion'],
  }),
  transitionTopOut: withMetadata(() => import('./assets/transition_top_out'), {
    category: 'glyph',
    synonyms: ['transition', 'top', 'out', 'animate', 'exit', 'motion'],
  }),
  trash: withMetadata(() => import('./assets/trash'), {
    category: 'glyph',
    synonyms: ['trash', 'delete', 'remove', 'bin', 'garbage', 'discard'],
  }),
  unfold: withMetadata(() => import('./assets/unfold'), { category: 'glyph' }),
  unlink: () => import('./assets/link_slash'), // NOTE: To be deprecated in favor of linkSlash
  upgradeAssistantApp: withMetadata(
    () => import('./assets/app_upgrade_assistant'),
    { category: 'app' }
  ),
  uptimeApp: withMetadata(() => import('./assets/app_uptime'), {
    category: 'app',
  }),
  user: withMetadata(() => import('./assets/user'), {
    category: 'glyph',
    synonyms: ['user', 'person', 'account', 'profile', 'avatar'],
  }),
  userAvatar: () => import('./assets/user'), // NOTE: To be deprecated in favor of `user`
  users: withMetadata(() => import('./assets/users'), {
    category: 'glyph',
    synonyms: ['users', 'people', 'team', 'group', 'accounts'],
  }),
  usersRolesApp: withMetadata(() => import('./assets/app_users_roles'), {
    category: 'app',
  }),
  unarchive: withMetadata(() => import('./assets/unarchive'), {
    category: 'glyph',
    synonyms: ['unarchive', 'restore', 'extract', 'retrieve', 'unpack'],
  }),
  vector: () => import('./assets/vector_square'), // NOTE: To be deprecated in favor of vectorSquare
  vectorSquare: withMetadata(() => import('./assets/vector_square'), {
    category: 'glyph',
    synonyms: ['vector', 'square', 'shape', 'geometry', 'box', 'region'],
  }),
  videoPlayer: withMetadata(() => import('./assets/video_player'), {
    category: 'glyph',
    synonyms: ['video', 'player', 'play', 'media', 'film', 'watch'],
  }),
  visArea: () => import('./assets/chart_area'), // NOTE: To be deprecated in favor of chartArea
  visAreaStacked: () => import('./assets/chart_area_stack'), // NOTE: To be deprecated in favor of chartAreaStack
  visBarHorizontal: () => import('./assets/chart_bar_horizontal'), // NOTE: To be deprecated in favor of chartBarHorizontal
  visBarHorizontalStacked: () => import('./assets/chart_bar_horizontal_stack'), // NOTE: To be deprecated in favor of chartBarHorizontalStack
  visBarVertical: () => import('./assets/chart_bar_vertical'), // NOTE: To be deprecated in favor of chartBarVertical
  visBarVerticalStacked: () => import('./assets/chart_bar_vertical_stack'), // NOTE: To be deprecated in favor of chartBarVerticalStack
  visGauge: () => import('./assets/chart_gauge'), // NOTE: To be deprecated in favor of chartGauge
  visGoal: withMetadata(() => import('./assets/vis_goal'), {
    category: 'glyph',
  }),
  visLine: () => import('./assets/chart_line'), // NOTE: To be deprecated in favor of chartLine
  visMapCoordinate: () => import('./assets/waypoint'), // NOTE: To be deprecated in favor of waypoint
  visMapRegion: () => import('./assets/map'), // NOTE: To be deprecated in favor of map
  visMetric: () => import('./assets/chart_metric'), // NOTE: To be deprecated in favor of chartMetric
  chartMetric: withMetadata(() => import('./assets/chart_metric'), {
    category: 'glyph',
    synonyms: ['metric', 'chart', 'kpi', 'measurement', 'stat', 'indicator'],
  }),
  visPie: () => import('./assets/chart_pie'), // NOTE: To be deprecated in favor of chartPie
  visTable: () => import('./assets/table'), // NOTE: To be deprecated in favor of table
  visTagCloud: () => import('./assets/chart_tag_cloud'), // NOTE: To be deprecated in favor of chartTagCloud
  visText: () => import('./assets/text'), // NOTE: To be deprecated in favor of text,
  visTimelion: withMetadata(() => import('./assets/vis_timelion'), {
    category: 'glyph',
  }),
  visVega: () => import('./assets/code'), // NOTE: To be deprecated in favor of `code`
  visVisualBuilder: withMetadata(() => import('./assets/vis_visual_builder'), {
    category: 'glyph',
  }),
  visualizeApp: withMetadata(() => import('./assets/app_visualize'), {
    category: 'app',
  }),
  vulnerabilityManagementApp: withMetadata(
    () => import('./assets/app_vulnerability_management'),
    { category: 'app' }
  ),
  warning: withMetadata(() => import('./assets/warning'), {
    category: 'glyph',
    synonyms: ['warning', 'alert', 'caution', 'danger', 'issue'],
  }),
  warningFilled: () => import('./assets/warning_fill'), // NOTE: To be deprecated in favor of warningFill
  warningFill: withMetadata(() => import('./assets/warning_fill'), {
    category: 'glyph',
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
  web: withMetadata(() => import('./assets/web'), { category: 'glyph' }),
  wordWrap: withMetadata(() => import('./assets/word_wrap'), {
    category: 'glyph',
  }),
  wordWrapDisabled: withMetadata(() => import('./assets/word_wrap_disabled'), {
    category: 'glyph',
  }),
  workflowsApp: withMetadata(() => import('./assets/app_workflows'), {
    category: 'app',
  }),
  workflow: withMetadata(() => import('./assets/workflow'), {
    category: 'glyph',
    synonyms: ['workflow', 'automation', 'pipeline', 'process', 'flow'],
  }),
  workplaceSearchApp: withMetadata(
    () => import('./assets/app_workplace_search'),
    { category: 'app' }
  ),
  wrench: withMetadata(() => import('./assets/wrench'), {
    category: 'glyph',
    synonyms: ['wrench', 'tool', 'fix', 'settings', 'repair'],
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
  tokenDenseVector: withMetadata(() => import('./assets/token_vector_dense'), {
    category: 'token',
  }), // NOTE: This is an undocumented alias for `tokenVectorDense`, added for legacy compatability
  tokenVectorSparse: withMetadata(
    () => import('./assets/token_vector_sparse'),
    { category: 'token' }
  ),
};

type TypeToPathMapLoader = (typeof typeToPathMap)[keyof typeof typeToPathMap];

type TypeToPathMapMetadata = IconMetadata;

const getTypeToPathMapMetadata = (
  loader: TypeToPathMapLoader
): TypeToPathMapMetadata | undefined =>
  (loader as { metadata?: TypeToPathMapMetadata }).metadata;

const getTypeToPathMapCategoryIconTypes = (category: IconCategory) =>
  Object.entries(typeToPathMap)
    .filter(
      ([, loader]) => getTypeToPathMapMetadata(loader)?.category === category
    )
    .map(([iconType]) => iconType as keyof typeof typeToPathMap);

export const typeToPathMapIconTypes =
  getTypeToPathMapCategoryIconTypes('glyph');

export const typeToPathMapAppIconTypes =
  getTypeToPathMapCategoryIconTypes('app');

export const typeToPathMapLogoIconTypes =
  getTypeToPathMapCategoryIconTypes('logo');

export const typeToPathMapMlIconTypes = getTypeToPathMapCategoryIconTypes('ml');

export const typeToPathMapTokenIconTypes =
  getTypeToPathMapCategoryIconTypes('token');

export type TypeToPathMapSynonyms = Partial<
  Record<keyof typeof typeToPathMap, string[]>
>;

export const typeToPathMapSynonyms: TypeToPathMapSynonyms = Object.fromEntries(
  Object.entries(typeToPathMap).flatMap(([iconType, loader]) => {
    const synonyms = getTypeToPathMapMetadata(loader)?.synonyms;

    return synonyms ? [[iconType, synonyms]] : [];
  })
) as TypeToPathMapSynonyms;
