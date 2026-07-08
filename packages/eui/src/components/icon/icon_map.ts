/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

type IconImportLoader = () => Promise<unknown>;

type IconImportLoaderWithSynonyms = IconImportLoader & { synonyms?: string[] };

const withSynonyms = (
  loader: IconImportLoader,
  synonyms: string[]
): IconImportLoaderWithSynonyms => Object.assign(loader, { synonyms });

export const typeToPathMap = {
  accessibility: withSynonyms(
    () => import('./assets/accessibility'),
    [
      'a11y',
      'inclusive',
      'disability',
      'wcag',
      'assistive',
      'screen reader',
      'universal design',
    ]
  ),
  addDataApp: () => import('./assets/app_add_data'),
  addToChat: () => import('./assets/add_to_chat'),
  addToDashboard: withSynonyms(
    () => import('./assets/add_to_dashboard'),
    ['dashboard', 'add', 'pin', 'widget', 'panel', 'insert', 'save view']
  ),
  advancedSettingsApp: () => import('./assets/app_advanced_settings'),
  agentApp: () => import('./assets/app_fleet'),
  aggregate: withSynonyms(
    () => import('./assets/aggregate'),
    ['combine', 'sum', 'group', 'collection', 'merge', 'total', 'rollup']
  ),
  alignBottom: withSynonyms(
    () => import('./assets/align_bottom'),
    ['align', 'bottom', 'vertical', 'position', 'layout', 'dock']
  ),
  alignBottomLeft: withSynonyms(
    () => import('./assets/align_bottom_left'),
    ['align', 'bottom', 'left', 'corner', 'position', 'layout']
  ),
  alignBottomRight: withSynonyms(
    () => import('./assets/align_bottom_right'),
    ['align', 'bottom', 'right', 'corner', 'position', 'layout']
  ),
  alignCenterHorizontal: withSynonyms(
    () => import('./assets/align_center_horizontal'),
    ['align', 'center', 'horizontal', 'middle', 'position', 'layout']
  ),
  alignCenterVertical: withSynonyms(
    () => import('./assets/align_center_vertical'),
    ['align', 'center', 'vertical', 'middle', 'position', 'layout']
  ),
  alignLeft: withSynonyms(
    () => import('./assets/align_left'),
    ['align', 'left', 'horizontal', 'position', 'layout', 'flush']
  ),
  alignRight: withSynonyms(
    () => import('./assets/align_right'),
    ['align', 'right', 'horizontal', 'position', 'layout', 'flush']
  ),
  alignTop: withSynonyms(
    () => import('./assets/align_top'),
    ['align', 'top', 'vertical', 'position', 'layout', 'dock']
  ),
  alignTopLeft: withSynonyms(
    () => import('./assets/align_top_left'),
    ['align', 'top', 'left', 'corner', 'position', 'layout']
  ),
  alignTopRight: withSynonyms(
    () => import('./assets/align_top_right'),
    ['align', 'top', 'right', 'corner', 'position', 'layout']
  ),
  alert: () => import('./assets/warning'), // NOTE: To be deprecated in favor of `warning`
  analyzeEvent: () => import('./assets/analyze_event'),
  annotation: () => import('./assets/annotation'),
  anomalyChart: () => import('./assets/chart_anomaly'), // NOTE: To be deprecated in favor of chartAnomaly
  chartAnomaly: withSynonyms(
    () => import('./assets/chart_anomaly'),
    ['anomaly', 'chart', 'outlier', 'detection', 'spike', 'unusual']
  ),
  anomalySwimLane: () => import('./assets/anomaly_swim_lane'),
  apmApp: () => import('./assets/app_apm'),
  apmTrace: () => import('./assets/chart_waterfall'), // NOTE: To be deprecated in favor of chartWaterfall
  chartWaterfall: withSynonyms(
    () => import('./assets/chart_waterfall'),
    ['waterfall chart', 'cascade', 'steps', 'bridge', 'cumulative', 'breakdown']
  ),
  appSearchApp: () => import('./assets/app_app_search'),
  apps: () => import('./assets/apps'),
  arrowDown: () => import('./assets/chevron_single_down'), // NOTE: To be deprecated in favor of chevronSingleDown
  chevronSingleDown: withSynonyms(
    () => import('./assets/chevron_single_down'),
    ['chevron', 'down', 'dropdown', 'expand', 'arrow', 'caret']
  ),
  arrowLeft: () => import('./assets/chevron_single_left'), // NOTE: To be deprecated in favor of chevronSingleLeft
  chevronSingleLeft: withSynonyms(
    () => import('./assets/chevron_single_left'),
    ['chevron', 'left', 'back', 'previous', 'arrow', 'caret']
  ),
  arrowRight: () => import('./assets/chevron_single_right'), // NOTE: To be deprecated in favor of chevronSinglRight
  chevronSingleRight: withSynonyms(
    () => import('./assets/chevron_single_right'),
    ['chevron', 'right', 'next', 'forward', 'arrow', 'caret']
  ),
  arrowUp: () => import('./assets/chevron_single_up'), // NOTE: To be deprecated in favor of chevronSingleUp
  chevronSingleUp: withSynonyms(
    () => import('./assets/chevron_single_up'),
    ['chevron', 'up', 'collapse', 'arrow', 'caret']
  ),
  arrowStart: () => import('./assets/chevron_limit_left'), // NOTE: To be deprecated in favor of chevronLimitLeft
  chevronLimitLeft: withSynonyms(
    () => import('./assets/chevron_limit_left'),
    ['chevron', 'limit', 'first', 'start', 'beginning', 'jump', 'skip']
  ),
  arrowEnd: () => import('./assets/chevron_limit_right'), // NOTE: To be deprecated in favor of chevronLimitRight
  chevronLimitRight: withSynonyms(
    () => import('./assets/chevron_limit_right'),
    ['chevron', 'limit', 'last', 'end', 'final', 'jump', 'skip']
  ),
  article: () => import('./assets/article'),
  asterisk: withSynonyms(
    () => import('./assets/asterisk'),
    ['star', 'wildcard', 'required', 'multiply', 'reference', 'footnote']
  ),
  at: withSynonyms(
    () => import('./assets/at'),
    ['email', 'mention', 'address', 'symbol', 'contact', 'handle']
  ),
  archive: withSynonyms(
    () => import('./assets/archive'),
    ['storage', 'box', 'store', 'backup', 'file away', 'saved', 'repository']
  ),
  axisX: withSynonyms(
    () => import('./assets/axis_x'),
    ['x axis', 'horizontal axis', 'chart', 'graph', 'dimension', 'abscissa']
  ),
  axisYLeft: withSynonyms(
    () => import('./assets/axis_y_left'),
    ['y axis', 'left', 'vertical axis', 'chart', 'graph', 'ordinate']
  ),
  axisYRight: withSynonyms(
    () => import('./assets/axis_y_right'),
    ['y axis', 'right', 'vertical axis', 'chart', 'graph', 'ordinate']
  ),
  auditbeatApp: () => import('./assets/app_auditbeat'),
  backgroundTask: withSynonyms(
    () => import('./assets/background_task'),
    ['background', 'async', 'job', 'task', 'process', 'worker', 'queue']
  ),
  beaker: () => import('./assets/flask'), // NOTE: To be deprecated in favor of `flask`
  bell: withSynonyms(
    () => import('./assets/bell'),
    [
      'notification',
      'alert',
      'alarm',
      'notify',
      'ring',
      'reminder',
      'announcements',
    ]
  ),
  bellSlash: withSynonyms(
    () => import('./assets/bell_slash'),
    [
      'mute',
      'notification off',
      'silence',
      'bell disabled',
      'alerts off',
      'quiet',
    ]
  ),
  beta: withSynonyms(
    () => import('./assets/beta'),
    ['greek', 'test', 'experimental', 'preview', 'version', 'letter']
  ),
  bolt: withSynonyms(
    () => import('./assets/bolt'),
    ['lightning', 'fast', 'power', 'electric', 'speed', 'energy']
  ),
  boxesHorizontal: () => import('./assets/boxes_vertical'), // NOTE: To be deprecated in favor of `boxes_vertical`
  boxesVertical: () => import('./assets/boxes_vertical'),
  branch: withSynonyms(
    () => import('./assets/branch'),
    ['git', 'version control', 'fork', 'tree', 'split', 'divergence']
  ),
  briefcase: withSynonyms(
    () => import('./assets/briefcase'),
    ['work', 'business', 'job', 'portfolio', 'office', 'career']
  ),
  branchUser: () => import('./assets/branch_user'),
  broom: withSynonyms(
    () => import('./assets/broom'),
    ['clean', 'sweep', 'clear', 'tidy', 'wipe', 'brush off']
  ),
  brush: withSynonyms(
    () => import('./assets/brush'),
    ['paint', 'draw', 'art', 'design', 'stroke', 'brush tool']
  ),
  bug: withSynonyms(
    () => import('./assets/bug'),
    ['insect', 'defect', 'issue', 'error', 'debug', 'glitch']
  ),
  bulb: withSynonyms(
    () => import('./assets/bulb'),
    ['light', 'idea', 'lamp', 'insight', 'bright', 'hint']
  ),
  bullseye: withSynonyms(
    () => import('./assets/bullseye'),
    [
      'findings',
      'target',
      'aim',
      'goal',
      'focus',
      'dartboard',
      'precision',
      'center',
    ]
  ),
  calendar: withSynonyms(
    () => import('./assets/calendar'),
    ['date', 'schedule', 'event', 'day', 'month', 'time']
  ),
  canvasApp: () => import('./assets/app_canvas'),
  casesApp: () => import('./assets/app_cases'),
  changePointDetection: () => import('./assets/chart_change_point'), // NOTE: To be deprecated in favor of chartChangePoint
  chartChangePoint: withSynonyms(
    () => import('./assets/chart_change_point'),
    ['change point', 'chart', 'breakpoint', 'shift', 'detection', 'regime']
  ),
  chartArea: withSynonyms(
    () => import('./assets/chart_area'),
    ['area chart', 'graph', 'visualization', 'filled', 'trend', 'plot']
  ),
  chartAreaStack: withSynonyms(
    () => import('./assets/chart_area_stack'),
    ['stacked area', 'chart', 'graph', 'layers', 'visualization', 'plot']
  ),
  chartBarHorizontal: withSynonyms(
    () => import('./assets/chart_bar_horizontal'),
    ['bar chart', 'horizontal', 'graph', 'bars', 'visualization', 'plot']
  ),
  chartBarHorizontalStack: withSynonyms(
    () => import('./assets/chart_bar_horizontal_stack'),
    ['stacked bar', 'horizontal', 'chart', 'graph', 'grouped', 'plot']
  ),
  chartBarVertical: withSynonyms(
    () => import('./assets/chart_bar_vertical'),
    ['bar chart', 'vertical', 'graph', 'columns', 'visualization', 'plot']
  ),
  chartBarVerticalStack: withSynonyms(
    () => import('./assets/chart_bar_vertical_stack'),
    ['stacked bar', 'vertical', 'chart', 'graph', 'grouped', 'plot']
  ),
  chartGauge: withSynonyms(
    () => import('./assets/chart_gauge'),
    ['gauge', 'meter', 'dial', 'chart', 'metric', 'speedometer']
  ),
  chartHeatmap: withSynonyms(
    () => import('./assets/chart_heatmap'),
    ['heatmap', 'matrix', 'density', 'chart', 'grid', 'correlation']
  ),
  chartLine: withSynonyms(
    () => import('./assets/chart_line'),
    ['line chart', 'graph', 'trend', 'visualization', 'plot', 'time series']
  ),
  chartPie: withSynonyms(
    () => import('./assets/chart_pie'),
    ['pie chart', 'donut', 'proportion', 'circle', 'segments', 'share']
  ),
  chartTagCloud: withSynonyms(
    () => import('./assets/chart_tag_cloud'),
    ['tag cloud', 'word cloud', 'text', 'chart', 'keywords', 'frequency']
  ),
  chartThreshold: withSynonyms(
    () => import('./assets/chart_threshold'),
    ['threshold', 'limit', 'chart', 'boundary', 'alert line', 'cutoff']
  ),
  check: withSynonyms(
    () => import('./assets/check'),
    ['tick', 'confirm', 'done', 'yes', 'approve', 'mark']
  ),
  checkCircle: withSynonyms(
    () => import('./assets/check_circle'),
    ['check', 'circle', 'success', 'confirm', 'complete', 'ok']
  ),
  checkInCircleFilled: () => import('./assets/check_circle_fill'), // NOTE: To be deprecated in favor of checkCircleFill
  checkCircleFill: withSynonyms(
    () => import('./assets/check_circle_fill'),
    ['check', 'filled', 'success', 'confirm', 'complete', 'ok']
  ),
  cheer: () => import('./assets/popper'), // NOTE: To be deprecated in favor of popper
  popper: withSynonyms(
    () => import('./assets/popper'),
    ['popper', 'tooltip', 'overlay', 'popup', 'floating']
  ),
  classificationJob: () => import('./assets/ml_classification_job'),
  clickLeft: withSynonyms(
    () => import('./assets/click_left'),
    ['click', 'left', 'mouse', 'pointer', 'button', 'tap']
  ),
  clickRight: withSynonyms(
    () => import('./assets/click_right'),
    ['click', 'right', 'mouse', 'context', 'button', 'tap']
  ),
  clock: withSynonyms(() => import('./assets/clock'), ['clock']),
  clockCounter: withSynonyms(
    () => import('./assets/clock_counter'),
    ['clock', 'counter', 'countdown', 'timer', 'time', 'elapsed']
  ),
  clockControl: withSynonyms(
    () => import('./assets/clock_control'),
    ['clock', 'control', 'time', 'schedule', 'timer', 'settings']
  ),
  cloud: withSynonyms(
    () => import('./assets/cloud'),
    ['cloud', 'online', 'hosting', 'saas', 'remote']
  ),
  cloudDrizzle: () => import('./assets/cloud_drizzle'),
  cloudStormy: () => import('./assets/cloud_stormy'),
  cloudSunny: () => import('./assets/cloud_sunny'),
  cluster: withSynonyms(
    () => import('./assets/cluster'),
    ['cluster', 'nodes', 'group', 'collection', 'distributed']
  ),
  code: withSynonyms(
    () => import('./assets/code'),
    ['code', 'developer', 'programming', 'script', 'source']
  ),
  codeApp: () => import('./assets/app_code'),
  color: () => import('./assets/paint_bucket'), // NOTE: To be deprecated in favor of paintBucket
  paintBucket: withSynonyms(
    () => import('./assets/paint_bucket'),
    ['paint', 'fill', 'bucket', 'color', 'flood fill']
  ),
  commandLine: withSynonyms(
    () => import('./assets/command_line'),
    ['terminal', 'cli', 'console', 'shell', 'command', 'prompt']
  ),
  comment: withSynonyms(
    () => import('./assets/comment'),
    ['comment', 'chat', 'message', 'feedback', 'discussion']
  ),
  compare: withSynonyms(
    () => import('./assets/compare'),
    ['compare', 'diff', 'versus', 'side by side']
  ),
  compute: () => import('./assets/processor'), // NOTE: To be deprecated in favor of processor
  processor: withSynonyms(
    () => import('./assets/processor'),
    ['processor', 'compute', 'cpu', 'transform', 'ingest']
  ),
  console: () => import('./assets/command_line'), // NOTE: To be deprecated in favor of commandLine
  consoleApp: () => import('./assets/app_console'),
  container: () => import('./assets/container'),
  continuityAbove: () => import('./assets/continuity_above'),
  continuityAboveBelow: () => import('./assets/continuity_above_below'),
  continuityBelow: () => import('./assets/continuity_below'),
  continuityWithin: () => import('./assets/continuity_within'),
  contrast: withSynonyms(
    () => import('./assets/contrast'),
    ['contrast', 'accessibility', 'visibility', 'a11y']
  ),
  contrastHigh: () => import('./assets/contrast_fill'), // NOTE: To be deprecated in favor of contrastFill
  contrastFill: withSynonyms(
    () => import('./assets/contrast_fill'),
    ['contrast', 'filled', 'accessibility', 'visibility', 'a11y', 'display']
  ),
  controls: withSynonyms(
    () => import('./assets/controls'),
    ['controls', 'sliders', 'settings', 'adjust', 'panel']
  ),
  controlsHorizontal: () => import('./assets/controls'), // NOTE: To be deprecated in favor of `controls`
  controlsVertical: () => import('./assets/controls'), // NOTE: To be deprecated in favor of `controls`
  copy: withSynonyms(
    () => import('./assets/copy'),
    ['duplicate', 'clone', 'clipboard', 'replicate', 'paste']
  ),
  copyClipboard: () => import('./assets/copy'), // NOTE: To be deprecated in favor of `copy`
  crossProjectSearch: withSynonyms(
    () => import('./assets/cross_project_search'),
    ['search', 'cross project', 'global', 'find', 'lookup', 'explore']
  ),
  createAdvancedJob: () => import('./assets/ml_create_advanced_job'),
  createGenericJob: () => import('./assets/ml_create_generic_job'),
  createGeoJob: () => import('./assets/ml_create_geo_job'),
  createMultiMetricJob: () => import('./assets/ml_create_multi_metric_job'),
  createPopulationJob: () => import('./assets/ml_create_population_job'),
  createSingleMetricJob: () => import('./assets/ml_create_single_metric_job'),
  cross: withSynonyms(
    () => import('./assets/cross'),
    ['cross', 'close', 'cancel', 'delete']
  ),
  crossClusterReplicationApp: () =>
    import('./assets/app_cross_cluster_replication'),
  crossInCircle: () => import('./assets/cross_circle'), // NOTE: To be deprecated in favor of crossCircle
  crossCircle: withSynonyms(
    () => import('./assets/cross_circle'),
    ['cross circle', 'cross', 'close', 'cancel', 'delete', 'circle']
  ),
  crosshair: withSynonyms(() => import('./assets/crosshair'), ['crosshair']),
  crosshairs: () => import('./assets/crosshair'), // NOTE: To be deprecated in favor of crosshair
  currency: () => import('./assets/money'), // NOTE: To be deprecated in favor of money
  money: withSynonyms(
    () => import('./assets/money'),
    ['money', 'payment', 'billing', 'cost', 'finance']
  ),
  cut: () => import('./assets/scissors'), // NOTE: To be deprecated in favor of scissors
  scissors: withSynonyms(() => import('./assets/scissors'), ['scissors']),
  dashboardApp: () => import('./assets/app_dashboard'),
  dashedCircle: withSynonyms(
    () => import('./assets/dashed_circle'),
    ['dashed', 'circle', 'pending', 'incomplete', 'outline', 'status']
  ),
  dataVisualizer: () => import('./assets/ml_data_visualizer'),
  database: withSynonyms(
    () => import('./assets/database'),
    ['database', 'data', 'storage', 'sql', 'records']
  ),
  desktop: () => import('./assets/display'), // NOTE: To be deprecated in favor of display
  display: withSynonyms(() => import('./assets/display'), ['display']),
  devToolsApp: () => import('./assets/app_devtools'),
  diff: () => import('./assets/compare'), // NOTE: To be deprecated in favor of compare
  discoverApp: () => import('./assets/app_discover'),
  distributeHorizontal: withSynonyms(
    () => import('./assets/distribute_horizontal'),
    ['distribute horizontal', 'distribute', 'horizontal']
  ),
  distributeVertical: withSynonyms(
    () => import('./assets/distribute_vertical'),
    ['distribute vertical', 'distribute', 'vertical']
  ),
  download: withSynonyms(
    () => import('./assets/download'),
    ['save', 'export', 'retrieve', 'get file', 'arrow down', 'pull']
  ),
  drag: withSynonyms(
    () => import('./assets/drag'),
    ['drag', 'move', 'grab', 'reorder', 'handle']
  ),
  dragHorizontal: withSynonyms(
    () => import('./assets/drag_horizontal'),
    [
      'drag horizontal',
      'drag',
      'move',
      'grab',
      'reorder',
      'handle',
      'horizontal',
    ]
  ),
  dragVertical: withSynonyms(
    () => import('./assets/drag_vertical'),
    ['drag vertical', 'drag', 'move', 'grab', 'reorder', 'handle', 'vertical']
  ),
  discuss: () => import('./assets/comment'), // NOTE: To be deprecated in favor of `comment`
  document: withSynonyms(
    () => import('./assets/document'),
    ['document', 'file', 'page', 'paper', 'doc']
  ),
  documentEdit: () => import('./assets/document_edit'), // NOTE: To be deprecated in favor of pencil
  documentation: withSynonyms(
    () => import('./assets/documentation'),
    ['documentation', 'docs', 'help', 'guide', 'manual']
  ),
  documents: withSynonyms(
    () => import('./assets/documents'),
    ['documents', 'files', 'pages', 'papers', 'library']
  ),
  dot: withSynonyms(
    () => import('./assets/dot'),
    ['dot', 'point', 'bullet', 'period', 'circle']
  ),
  dotInCircle: () => import('./assets/dot_in_circle'),
  doubleArrowLeft: () => import('./assets/chevron_double_left'), // NOTE: To be deprecated in favor of chevronDoubleLeft
  chevronDoubleLeft: withSynonyms(
    () => import('./assets/chevron_double_left'),
    ['chevron', 'double', 'left', 'rewind', 'back', 'previous']
  ),
  doubleArrowRight: () => import('./assets/chevron_double_right'), // NOTE: To be deprecated in favor of chevronDoubleRight
  chevronDoubleRight: withSynonyms(
    () => import('./assets/chevron_double_right'),
    ['chevron', 'double', 'right', 'forward', 'skip', 'next']
  ),
  ellipsis: withSynonyms(
    () => import('./assets/ellipsis'),
    ['ellipsis', 'more', 'menu', 'overflow', 'dots']
  ),
  editorAlignCenter: () => import('./assets/text_align_center'), // NOTE: To be deprecated in favor of textAlignCenter
  textAlignCenter: withSynonyms(
    () => import('./assets/text_align_center'),
    ['text', 'align', 'center', 'middle', 'typography']
  ),
  editorAlignLeft: () => import('./assets/text_align_left'), // NOTE: To be deprecated in favor of textAlignLeft
  textAlignLeft: withSynonyms(
    () => import('./assets/text_align_left'),
    ['text', 'align', 'left', 'typography', 'paragraph']
  ),
  editorAlignRight: () => import('./assets/text_align_right'), // NOTE: To be deprecated in favor of textAlignRight
  textAlignRight: withSynonyms(
    () => import('./assets/text_align_right'),
    ['text', 'align', 'right', 'typography', 'paragraph']
  ),
  editorBold: () => import('./assets/text_bold'), // NOTE: To be deprecated in favor of textBold
  textBold: withSynonyms(
    () => import('./assets/text_bold'),
    ['text bold', 'text', 'bold', 'typography', 'formatting']
  ),
  editorChecklist: () => import('./assets/list_check'), // NOTE: To be deprecated in favor of listCheck
  listCheck: withSynonyms(
    () => import('./assets/list_check'),
    [
      'list check',
      'list',
      'bullet',
      'items',
      'rows',
      'check',
      'tick',
      'confirm',
    ]
  ),
  editorCodeBlock: () => import('./assets/code'), // NOTE: To be deprecated in favor of `code`
  editorComment: () => import('./assets/comment'), // NOTE: To be deprecated in favor of `comment`
  editorDistributeHorizontal: () =>
    import('./assets/editor_distribute_horizontal'), // NOTE: To be deprecated in favor of distributeHorizontal
  editorDistributeVertical: () => import('./assets/editor_distribute_vertical'), // NOTE: To be deprecated in favor of distributeVertical
  editorHeading: () => import('./assets/text_heading'), // NOTE: To be deprecated in favor of textHeading
  textHeading: withSynonyms(
    () => import('./assets/text_heading'),
    ['text', 'heading', 'title', 'h1', 'typography', 'header']
  ),
  editorItalic: () => import('./assets/text_italic'), // NOTE: To be deprecated in favor of textItalic
  textItalic: withSynonyms(
    () => import('./assets/text_italic'),
    ['text italic', 'text', 'italic', 'typography', 'formatting']
  ),
  editorItemAlignBottom: () => import('./assets/editor_item_align_bottom'), // NOTE: To be deprecated in favor of alignBottom
  editorItemAlignCenter: () => import('./assets/editor_item_align_center'), // NOTE: To be deprecated in favor of alignCenterHorizontal
  editorItemAlignLeft: () => import('./assets/editor_item_align_left'), // NOTE: To be deprecated in favor of alignLeft
  editorItemAlignMiddle: () => import('./assets/editor_item_align_middle'), // NOTE: To be deprecated in favor of alignCenterVertical
  editorItemAlignRight: () => import('./assets/editor_item_align_right'), // NOTE: To be deprecated in favor of alignRight
  editorItemAlignTop: () => import('./assets/editor_item_align_top'), // NOTE: To be deprecated in favor of alignTop,
  editorLink: () => import('./assets/link'), // NOTE: To be deprecated in favor of `link`
  editorOrderedList: () => import('./assets/list_number'), // NOTE: To be deprecated in favor of listNumber
  listNumber: withSynonyms(
    () => import('./assets/list_number'),
    [
      'list number',
      'list',
      'bullet',
      'items',
      'rows',
      'number',
      'digit',
      'numeric',
    ]
  ),
  editorPositionBottomLeft: () =>
    import('./assets/editor_position_bottom_left'), // NOTE: To be deprecated in favor of alignBottomLeft
  editorPositionBottomRight: () =>
    import('./assets/editor_position_bottom_right'), // NOTE: To be deprecated in favor of alignBottomRight
  editorPositionTopLeft: () => import('./assets/editor_position_top_left'), // NOTE: To be deprecated in favor of alignTopLeft
  editorPositionTopRight: () => import('./assets/editor_position_top_right'), // NOTE: To be deprecated in favor of alignTopRight
  editorRedo: () => import('./assets/redo'), // NOTE: To be deprecated in favor of redo
  redo: withSynonyms(
    () => import('./assets/redo'),
    ['redo', 'repeat', 'forward', 'again']
  ),
  editorStrike: () => import('./assets/text_strike'), // NOTE: To be deprecated in favor of textStrike
  textStrike: withSynonyms(
    () => import('./assets/text_strike'),
    ['text', 'strikethrough', 'strike', 'delete', 'typography']
  ),
  editorTable: () => import('./assets/table'), // NOTE: To be deprecated in favor of table
  table: withSynonyms(() => import('./assets/table'), ['table']),
  editorUnderline: () => import('./assets/text_underline'), // NOTE: To be deprecated in favor of textUnderline
  textUnderline: withSynonyms(
    () => import('./assets/text_underline'),
    ['text underline', 'text', 'underline', 'typography', 'formatting']
  ),
  editorUndo: () => import('./assets/undo'), // NOTE: To be deprecated in favor of undo
  undo: withSynonyms(
    () => import('./assets/undo'),
    ['undo', 'revert', 'back', 'previous action']
  ),
  editorUnorderedList: () => import('./assets/list_bullet'), // NOTE: To be deprecated in favor of listBullet
  listBullet: withSynonyms(
    () => import('./assets/list_bullet'),
    ['list bullet', 'list', 'bullet', 'items', 'rows']
  ),
  email: () => import('./assets/mail'), // NOTE: To be deprecated in favor of mail
  mail: withSynonyms(
    () => import('./assets/mail'),
    ['mail', 'email', 'envelope', 'message', 'inbox']
  ),
  empty: withSynonyms(
    () => import('./assets/empty'),
    ['empty', 'blank', 'none', 'placeholder', 'void']
  ),
  emsApp: () => import('./assets/app_ems'),
  endpoint: withSynonyms(
    () => import('./assets/endpoint'),
    ['endpoint', 'api', 'url', 'connection', 'target']
  ),
  eql: () => import('./assets/query'), // NOTE: To be deprecated in favor of query
  query: withSynonyms(
    () => import('./assets/query'),
    ['query', 'search', 'sql', 'lucene', 'filter']
  ),
  eraser: withSynonyms(
    () => import('./assets/eraser'),
    ['eraser', 'clear', 'remove', 'delete', 'rubber']
  ),
  error: withSynonyms(
    () => import('./assets/error'),
    ['error', 'failure', 'problem', 'invalid', 'cross']
  ),
  errorFilled: () => import('./assets/error_fill'), // NOTE: To be deprecated in favor of errorFill
  errorFill: withSynonyms(
    () => import('./assets/error_fill'),
    [
      'error fill',
      'error',
      'failure',
      'problem',
      'invalid',
      'cross',
      'fill',
      'filled',
    ]
  ),
  esqlVis: () => import('./assets/esql_vis'),
  exit: () => import('./assets/log_out'), // NOTE: To be deprecated in favor of logOut
  logOut: withSynonyms(
    () => import('./assets/log_out'),
    ['log out', 'log', 'out']
  ),
  expand: () => import('./assets/maximize'), // NOTE: To be deprecated in favor of maximize
  maximize: withSynonyms(() => import('./assets/maximize'), ['maximize']),
  expandMini: () => import('./assets/maximize'), // NOTE: To be deprecated in favor of maximize
  export: () => import('./assets/upload'),
  exportAction: () => import('./assets/upload'), // NOTE: To be deprecated in favor of upload
  upload: withSynonyms(
    () => import('./assets/upload'),
    ['upload', 'import', 'send', 'cloud', 'arrow up']
  ),
  external: withSynonyms(
    () => import('./assets/external'),
    ['external', 'open new', 'link out', 'outside']
  ),
  eye: withSynonyms(
    () => import('./assets/eye'),
    ['eye', 'view', 'visible', 'show', 'preview', 'watch']
  ),
  eyeClosed: () => import('./assets/eye_slash'), // NOTE: To be deprecated in favor of eyeSlash
  eyeSlash: withSynonyms(
    () => import('./assets/eye_slash'),
    ['eye slash', 'eye', 'view', 'visible', 'show', 'preview', 'watch', 'slash']
  ),
  faceHappy: withSynonyms(
    () => import('./assets/face_happy'),
    ['smile', 'happy', 'emoji', 'positive', 'grin', 'satisfied', 'mood']
  ),
  faceNeutral: withSynonyms(
    () => import('./assets/face_neutral'),
    ['face neutral', 'face', 'neutral']
  ),
  faceSad: withSynonyms(
    () => import('./assets/face_sad'),
    ['face sad', 'face', 'sad']
  ),
  fieldStatistics: () => import('./assets/table_info'), // NOTE: To be deprecated in favor of tableInfo
  tableInfo: withSynonyms(
    () => import('./assets/table_info'),
    ['table', 'info', 'metadata', 'details', 'schema', 'columns']
  ),
  filebeatApp: () => import('./assets/app_filebeat'),
  filter: withSynonyms(
    () => import('./assets/filter'),
    ['funnel', 'refine', 'narrow', 'sort', 'subset', 'sieve', 'criteria']
  ),
  filterExclude: withSynonyms(
    () => import('./assets/filter_exclude'),
    ['filter', 'exclude', 'remove', 'minus', 'refine', 'narrow']
  ),
  filterIgnore: withSynonyms(
    () => import('./assets/filter_ignore'),
    ['filter', 'ignore', 'skip', 'exclude', 'omit', 'hide']
  ),
  filterInclude: withSynonyms(
    () => import('./assets/filter_include'),
    ['filter', 'include', 'add', 'refine', 'narrow', 'select']
  ),
  filterInCircle: () => import('./assets/filter_in_circle'), // NOTE: To be deprecated in favor of filter
  flask: withSynonyms(
    () => import('./assets/flask'),
    ['flask', 'experiment', 'lab', 'science', 'test']
  ),
  flag: withSynonyms(
    () => import('./assets/flag'),
    ['flag', 'mark', 'report', 'bookmark', 'priority']
  ),
  fleetApp: () => import('./assets/app_agent'),
  fold: () => import('./assets/fold'),
  folder: () => import('./assets/folder_close'),
  folderClosed: () => import('./assets/folder_close'),
  folderClose: withSynonyms(
    () => import('./assets/folder_close'),
    ['folder', 'closed', 'collapse', 'directory', 'archive']
  ),
  folderCheck: () => import('./assets/folder_check'),
  folderExclamation: () => import('./assets/folder_exclamation'),
  folderOpen: withSynonyms(
    () => import('./assets/folder_open'),
    ['folder', 'open', 'expand', 'directory', 'browse']
  ),
  folderOpened: () => import('./assets/folder_open'),
  frameNext: () => import('./assets/frame_next'),
  framePrevious: () => import('./assets/frame_previous'),
  fullScreen: withSynonyms(
    () => import('./assets/full_screen'),
    ['fullscreen']
  ),
  fullScreenExit: withSynonyms(
    () => import('./assets/full_screen_exit'),
    ['fullscreen', 'exit', 'minimize', 'window', 'restore', 'shrink']
  ),
  function: () => import('./assets/function'),
  gear: withSynonyms(
    () => import('./assets/gear'),
    [
      'settings',
      'configure',
      'configuration',
      'preferences',
      'options',
      'cog',
      'setup',
      'admin',
      'wrench',
    ]
  ),
  gisApp: () => import('./assets/app_gis'),
  glasses: () => import('./assets/read_only'), // NOTE: To be deprecated in favor of `readOnly`
  globe: withSynonyms(
    () => import('./assets/globe'),
    ['globe', 'world', 'web', 'internet', 'international']
  ),
  grab: () => import('./assets/drag_vertical'), // NOTE: To be deprecated in favor of dragVertical
  grabHorizontal: () => import('./assets/drag_horizontal'), // NOTE: To be deprecated in favor of dragHorizontal
  grabOmnidirectional: () => import('./assets/grab_omnidirectional'), // NOTE: To be deprecated in favor of drag,
  gradient: withSynonyms(
    () => import('./assets/gradient'),
    ['gradient', 'blend', 'fade', 'color transition']
  ),
  graphApp: () => import('./assets/app_graph'),
  grid: withSynonyms(
    () => import('./assets/grid'),
    ['grid', 'table', 'layout', 'matrix', 'cells']
  ),
  grokApp: () => import('./assets/app_grok'),
  heart: withSynonyms(
    () => import('./assets/heart'),
    ['heart', 'favorite', 'like', 'love', 'bookmark']
  ),
  heartbeatApp: () => import('./assets/app_heartbeat'),
  heatmap: () => import('./assets/chart_heatmap'), // NOTE: To be deprecated in favor of chartHeatmap
  help: () => import('./assets/help'), // NOTE: Might be deprecated later (not recommended in Kibana)
  home: withSynonyms(
    () => import('./assets/home'),
    ['home', 'house', 'main', 'start', 'dashboard']
  ),
  hourglass: withSynonyms(
    () => import('./assets/hourglass'),
    ['hourglass', 'waiting', 'loading', 'time', 'pending']
  ),
  if: withSynonyms(
    () => import('./assets/if'),
    ['if', 'condition', 'logic', 'branch', 'rule']
  ),
  info: withSynonyms(
    () => import('./assets/info'),
    ['info', 'information', 'help', 'about', 'details']
  ),
  image: withSynonyms(
    () => import('./assets/image'),
    ['image', 'picture', 'photo', 'media', 'graphic']
  ),
  importAction: () => import('./assets/download'), // NOTE: To be deprecated in favor of download
  index: () => import('./assets/index'),
  indexClose: withSynonyms(
    () => import('./assets/index_close'),
    ['index', 'close', 'elasticsearch', 'dataset', 'remove']
  ),
  indexEdit: withSynonyms(
    () => import('./assets/index_edit'),
    ['index', 'edit', 'elasticsearch', 'dataset', 'modify', 'settings']
  ),
  indexFlush: () => import('./assets/chart_threshold'), // NOTE: To be deprecated in favor of chartThreshold
  indexManagementApp: () => import('./assets/app_index_management'),
  indexMapping: () => import('./assets/mapping'), // NOTE: To be deprecated in favor of mapping
  mapping: withSynonyms(() => import('./assets/mapping'), ['mapping']),
  indexOpen: withSynonyms(
    () => import('./assets/index_open'),
    ['index', 'open', 'elasticsearch', 'dataset', 'browse']
  ),
  indexPatternApp: () => import('./assets/app_index_pattern'),
  indexRollupApp: () => import('./assets/app_index_rollup'),
  indexRuntime: withSynonyms(
    () => import('./assets/index_runtime'),
    ['index', 'runtime', 'elasticsearch', 'live', 'execution']
  ),
  indexSettings: withSynonyms(
    () => import('./assets/index_settings'),
    ['index', 'settings', 'elasticsearch', 'configure', 'options']
  ),
  indexTemporary: () => import('./assets/table_time'), // NOTE: To be deprecated in favor of tableTime
  tableTime: withSynonyms(
    () => import('./assets/table_time'),
    ['table', 'time', 'temporal', 'date', 'timeline', 'history']
  ),
  infinity: withSynonyms(
    () => import('./assets/infinity'),
    ['infinity', 'unlimited', 'forever', 'loop', 'endless']
  ),
  inputOutput: withSynonyms(
    () => import('./assets/input_output'),
    ['input', 'output', 'io', 'data flow', 'pipeline', 'stream']
  ),
  inspect: withSynonyms(
    () => import('./assets/inspect'),
    ['inspect', 'investigate', 'examine', 'analyze', 'look']
  ),
  invert: () => import('./assets/contrast'), // NOTE: To be deprecated in favor of contrast
  ip: () => import('./assets/ip'),
  key: withSynonyms(
    () => import('./assets/key'),
    ['key', 'password', 'credential', 'access', 'security']
  ),
  keyboard: withSynonyms(
    () => import('./assets/keyboard'),
    ['keyboard', 'typing', 'input', 'shortcut', 'keys']
  ),
  kqlField: () => import('./assets/query_field'), // NOTE: To be deprecated in favor of queryField
  queryField: withSynonyms(
    () => import('./assets/query_field'),
    ['query', 'field', 'filter', 'column', 'attribute', 'selector']
  ),
  kqlFunction: () => import('./assets/kql_function'),
  kqlOperand: () => import('./assets/query_operand'), // NOTE: To be deprecated in favor of queryOperand
  queryOperand: withSynonyms(
    () => import('./assets/query_operand'),
    ['query', 'operand', 'operator', 'logic', 'condition', 'rule']
  ),
  kqlSelector: () => import('./assets/query_selector'), // NOTE: To be deprecated in favor of querySelector
  querySelector: withSynonyms(
    () => import('./assets/query_selector'),
    ['query', 'selector', 'pick', 'choose', 'field', 'filter']
  ),
  kqlValue: () => import('./assets/query_value'), // NOTE: To be deprecated in favor of queryValue
  queryValue: withSynonyms(
    () => import('./assets/query_value'),
    ['query', 'value', 'literal', 'data', 'input', 'filter']
  ),
  kubernetesNode: () => import('./assets/kubernetes_node'),
  kubernetesPod: withSynonyms(
    () => import('./assets/kubernetes_pod'),
    ['kubernetes', 'pod', 'k8s', 'container', 'cluster', 'orchestration']
  ),
  launch: () => import('./assets/rocket'), // NOTE: To be deprecated in favor of rocket
  rocket: withSynonyms(
    () => import('./assets/rocket'),
    ['rocket', 'launch', 'deploy', 'fast', 'startup']
  ),
  layers: withSynonyms(() => import('./assets/layers'), ['layers']),
  lensApp: () => import('./assets/app_lens'),
  lettering: () => import('./assets/text'), // NOTE: To be deprecated in favor of text
  text: withSynonyms(() => import('./assets/text'), ['text']),
  lineBreak: withSynonyms(
    () => import('./assets/line_break'),
    ['line break', 'newline', 'paragraph', 'text', 'wrap', 'return']
  ),
  lineBreakSlash: withSynonyms(
    () => import('./assets/line_break_slash'),
    ['line break', 'slash', 'text', 'separator', 'paragraph']
  ),
  lineDash: withSynonyms(
    () => import('./assets/line_dash'),
    ['line dash', 'line', 'dash']
  ),
  lineDashed: () => import('./assets/line_dash'), // NOTE: To be deprecated in favor of lineDash
  lineDot: withSynonyms(
    () => import('./assets/line_dot'),
    ['line dot', 'line', 'dot', 'point', 'bullet', 'period', 'circle']
  ),
  lineDotted: () => import('./assets/line_dot'), // NOTE: To be deprecated in favor of lineDot
  lineSolid: withSynonyms(
    () => import('./assets/line_solid'),
    ['line solid', 'line', 'solid']
  ),
  link: withSynonyms(
    () => import('./assets/link'),
    ['link', 'url', 'chain', 'connect', 'hyperlink']
  ),
  linkSlash: withSynonyms(
    () => import('./assets/link_slash'),
    ['unlink', 'broken link', 'remove link', 'disconnect', 'url']
  ),
  list: () => import('./assets/list_bullet'), // NOTE: To be deprecated in favor of listBullet,
  listAdd: () => import('./assets/plus_circle'), // NOTE: To be deprecated in favor of `plus_circle`
  lock: withSynonyms(
    () => import('./assets/lock'),
    ['lock', 'secure', 'private', 'protected', 'password']
  ),
  lockOpen: withSynonyms(
    () => import('./assets/lock_open'),
    ['lock open', 'lock', 'secure', 'private', 'protected', 'password', 'open']
  ),
  logPatternAnalysis: () => import('./assets/pattern'), // NOTE: To be deprecated in favor of pattern
  pattern: withSynonyms(
    () => import('./assets/pattern'),
    ['pattern', 'texture', 'repeat', 'design', 'fill']
  ),
  logRateAnalysis: () => import('./assets/log_rate_analysis'),
  logoAWS: () => import('./assets/logo_aws'),
  logoAWSMono: () => import('./assets/logo_aws_mono'),
  logoAerospike: () => import('./assets/logo_aerospike'),
  logoApache: () => import('./assets/logo_apache'),
  logoAppSearch: () => import('./assets/logo_app_search'),
  logoAzure: () => import('./assets/logo_azure'),
  logoAzureMono: () => import('./assets/logo_azure_mono'),
  logoBeats: () => import('./assets/logo_beats'),
  logoBusinessAnalytics: () => import('./assets/logo_business_analytics'),
  logoCeph: () => import('./assets/logo_ceph'),
  logoCloud: () => import('./assets/logo_cloud'),
  logoCloudEnterprise: () => import('./assets/logo_cloud_ece'),
  logoCode: () => import('./assets/logo_code'),
  logoCodesandbox: () => import('./assets/logo_codesandbox'),
  logoCouchbase: () => import('./assets/logo_couchbase'),
  logoDocker: () => import('./assets/logo_docker'),
  logoDropwizard: () => import('./assets/logo_dropwizard'),
  logoElastic: () => import('./assets/logo_elastic'),
  logoElasticStack: () => import('./assets/logo_elastic_stack'),
  logoElasticsearch: () => import('./assets/logo_elasticsearch'),
  logoEnterpriseSearch: () => import('./assets/logo_enterprise_search'),
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
  logoKibana: () => import('./assets/logo_kibana'),
  logoKubernetes: () => import('./assets/logo_kubernetes'),
  logoLogging: () => import('./assets/logo_logging'),
  logoLogstash: () => import('./assets/logo_logstash'),
  logoMaps: () => import('./assets/logo_maps'),
  logoMemcached: () => import('./assets/logo_memcached'),
  logoMetrics: () => import('./assets/logo_metrics'),
  logoMongodb: () => import('./assets/logo_mongodb'),
  logoMySQL: () => import('./assets/logo_mysql'),
  logoNginx: () => import('./assets/logo_nginx'),
  logoObservability: () => import('./assets/logo_observability'),
  logoOsquery: () => import('./assets/logo_osquery'),
  logoPhp: () => import('./assets/logo_php'),
  logoPostgres: () => import('./assets/logo_postgres'),
  logoPrometheus: () => import('./assets/logo_prometheus'),
  logoRabbitmq: () => import('./assets/logo_rabbitmq'),
  logoRedis: () => import('./assets/logo_redis'),
  logoSecurity: () => import('./assets/logo_security'),
  logoSiteSearch: () => import('./assets/logo_site_search'),
  logoSketch: () => import('./assets/logo_sketch'),
  logoSlack: () => import('./assets/logo_slack'),
  logoUptime: () => import('./assets/logo_uptime'),
  logoVectorDB: () => import('./assets/logo_vector_db'),
  logoVulnerabilityManagement: () =>
    import('./assets/logo_vulnerability_management'),
  logoWebhook: () => import('./assets/logo_webhook'),
  logoWindows: () => import('./assets/logo_windows'),
  logoWorkplaceSearch: () => import('./assets/logo_workplace_search'),
  logsApp: () => import('./assets/app_logs'),
  logstashFilter: () => import('./assets/logstash_filter'),
  logstashIf: () => import('./assets/if'), // NOTE: To be deprecated in favor of if
  logstashInput: () => import('./assets/logstash_input'),
  logstashOutput: () => import('./assets/logstash_output'),
  logstashQueue: () => import('./assets/queue'), // NOTE: To be deprecated in favor of queue
  queue: withSynonyms(
    () => import('./assets/queue'),
    ['queue', 'line', 'buffer', 'waiting', 'jobs']
  ),
  machineLearningApp: () => import('./assets/app_ml'),
  magnet: () => import('./assets/magnet'),
  magnify: withSynonyms(
    () => import('./assets/magnify'),
    ['search', 'find', 'zoom', 'lookup', 'query', 'discover', 'glass']
  ),
  magnifyExclamation: withSynonyms(
    () => import('./assets/magnify_exclamation'),
    ['search', 'alert', 'warning', 'find', 'magnify', 'important']
  ),
  magnifyMinus: withSynonyms(
    () => import('./assets/magnify_minus'),
    ['zoom out', 'search', 'minus', 'shrink', 'magnify']
  ),
  magnifyPlus: withSynonyms(
    () => import('./assets/magnify_plus'),
    ['zoom in', 'search', 'plus', 'enlarge', 'magnify']
  ),
  magnifyWithExclamation: () => import('./assets/magnify_with_exclamation'), // NOTE: To be deprecated in favor of magnifyExclamation
  magnifyWithMinus: () => import('./assets/magnify_with_minus'), // NOTE: To be deprecated in favor of magnifyMinus
  magnifyWithPlus: () => import('./assets/magnify_with_plus'), // NOTE: To be deprecated in favor of magnifyPlus,
  managementApp: () => import('./assets/app_management'),
  map: withSynonyms(
    () => import('./assets/map'),
    ['map', 'location', 'geo', 'geography', 'region']
  ),
  mapMarker: () => import('./assets/waypoint'), // NOTE: To be deprecated in favor of waypoint
  waypoint: withSynonyms(
    () => import('./assets/waypoint'),
    ['waypoint', 'marker', 'step', 'node', 'path']
  ),
  megaphone: withSynonyms(
    () => import('./assets/megaphone'),
    ['megaphone', 'announce', 'broadcast', 'marketing', 'loud']
  ),
  memory: () => import('./assets/memory'),
  menu: withSynonyms(
    () => import('./assets/menu'),
    ['menu', 'hamburger', 'navigation', 'options', 'bars']
  ),
  menuDown: () => import('./assets/menu_down'),
  menuLeft: withSynonyms(
    () => import('./assets/menu_left'),
    ['menu left', 'menu', 'hamburger', 'navigation', 'options', 'bars', 'left']
  ),
  menuRight: withSynonyms(
    () => import('./assets/menu_right'),
    [
      'menu right',
      'menu',
      'hamburger',
      'navigation',
      'options',
      'bars',
      'right',
    ]
  ),
  menuUp: () => import('./assets/menu_up'),
  merge: withSynonyms(
    () => import('./assets/merge'),
    ['merge', 'combine', 'join', 'unite', 'git']
  ),
  metricbeatApp: () => import('./assets/app_metricbeat'),
  metricsApp: () => import('./assets/app_metrics'),
  minimize: withSynonyms(() => import('./assets/minimize'), ['minimize']),
  minus: withSynonyms(
    () => import('./assets/minus'),
    ['minus', 'remove', 'subtract', 'decrement']
  ),
  minusCircle: withSynonyms(
    () => import('./assets/minus_circle'),
    ['minus circle', 'minus', 'remove', 'subtract', 'decrement', 'circle']
  ),
  minusInCircle: () => import('./assets/minus_circle'), // NOTE: To be deprecated in favor of minusCircle
  minusInCircleFilled: () => import('./assets/minus_circle'), // NOTE: To be deprecated in favor of minusCircle
  minusInSquare: () => import('./assets/minus_square'), // NOTE: To be deprecated in favor of minusSquare
  minusSquare: withSynonyms(
    () => import('./assets/minus_square'),
    ['minus', 'square', 'remove', 'collapse', 'decrement']
  ),
  mobile: () => import('./assets/mobile'),
  monitoringApp: () => import('./assets/app_monitoring'),
  moon: withSynonyms(
    () => import('./assets/moon'),
    ['moon', 'dark', 'night', 'theme']
  ),
  move: withSynonyms(
    () => import('./assets/move'),
    ['move', 'relocate', 'drag', 'position', 'transfer']
  ),
  namespace: () => import('./assets/namespace'),
  nested: withSynonyms(
    () => import('./assets/nested'),
    ['nested', 'hierarchy', 'tree', 'child', 'indent']
  ),
  newChat: () => import('./assets/plus_circle'), // NOTE: To be deprecated in favor of plusCircle
  node: () => import('./assets/vector_triangle'), // NOTE: To be deprecated in favor of vectorTriangle
  vectorTriangle: withSynonyms(
    () => import('./assets/vector_triangle'),
    ['vector', 'triangle', 'shape', 'geometry', 'delta']
  ),
  notebookApp: () => import('./assets/app_notebook'),
  number: withSynonyms(
    () => import('./assets/number'),
    ['number', 'digit', 'numeric', 'count', 'hash']
  ),
  offline: () => import('./assets/wifi_slash'), // NOTE: To be deprecated in favor of wifiSlash
  wifiSlash: withSynonyms(
    () => import('./assets/wifi_slash'),
    ['wifi', 'off', 'disconnected', 'network', 'wireless', 'no signal']
  ),
  online: () => import('./assets/wifi'), // NOTE: To be deprecated in favor of wifi
  wifi: withSynonyms(
    () => import('./assets/wifi'),
    ['wifi', 'wireless', 'network', 'internet', 'connection']
  ),
  outlierDetectionJob: () => import('./assets/ml_outlier_detection_job'),
  package: withSynonyms(
    () => import('./assets/package'),
    ['package', 'box', 'bundle', 'npm', 'module']
  ),
  packetbeatApp: () => import('./assets/app_packetbeat'),
  pageSelect: () => import('./assets/page_select'),
  pagesSelect: withSynonyms(
    () => import('./assets/pages_select'),
    ['pages', 'select', 'pagination', 'choose', 'document']
  ),
  palette: withSynonyms(
    () => import('./assets/palette'),
    ['palette', 'colors', 'theme', 'design', 'swatch']
  ),
  paperClip: withSynonyms(
    () => import('./assets/paper_clip'),
    ['attachment', 'clip', 'file', 'attach', 'paperclip']
  ),
  partial: withSynonyms(
    () => import('./assets/partial'),
    ['partial', 'incomplete', 'fragment', 'section']
  ),
  pause: withSynonyms(
    () => import('./assets/pause'),
    ['pause', 'hold', 'stop temporary', 'wait']
  ),
  payment: () => import('./assets/payment'),
  pencil: withSynonyms(
    () => import('./assets/pencil'),
    ['pencil', 'edit', 'write', 'modify', 'pen']
  ),
  percent: withSynonyms(
    () => import('./assets/percent'),
    ['percent', 'percentage', 'ratio', 'rate']
  ),
  pin: withSynonyms(
    () => import('./assets/pin'),
    ['pin', 'anchor', 'stick', 'fixed', 'bookmark']
  ),
  pinFill: withSynonyms(
    () => import('./assets/pin_fill'),
    ['pin', 'filled', 'stick', 'anchor', 'fixed', 'bookmark']
  ),
  pinFilled: () => import('./assets/pin_fill'), // NOTE: To be deprecated in favor of pinFill
  pipeBreaks: () => import('./assets/line_break'), // NOTE: To be deprecated in favor of lineBreak
  pipelineApp: () => import('./assets/app_pipeline'),
  pipeNoBreaks: () => import('./assets/line_break_slash'), // NOTE: To be deprecated in favor of lineBreakSlash
  pivot: withSynonyms(
    () => import('./assets/pivot'),
    ['pivot', 'table', 'transform', 'rotate', 'analytics']
  ),
  play: withSynonyms(
    () => import('./assets/play'),
    ['play', 'start', 'run', 'media', 'video']
  ),
  playFilled: () => import('./assets/play_filled'), // NOTE: To be deprecated in favor of play
  plugs: () => import('./assets/plugs'),
  plus: withSynonyms(
    () => import('./assets/plus'),
    ['plus', 'add', 'new', 'create', 'increment']
  ),
  plusCircle: withSynonyms(
    () => import('./assets/plus_circle'),
    ['plus circle', 'plus', 'add', 'new', 'create', 'increment', 'circle']
  ),
  plusInCircle: () => import('./assets/plus_circle'), // NOTE: To be deprecated in favor of plusCircle
  plusInCircleFilled: () => import('./assets/plus_circle'), // NOTE: To be deprecated in favor of plusCircle
  plusInSquare: () => import('./assets/plus_square'), // NOTE: To be deprecated in favor of plusSquare
  plusSquare: withSynonyms(
    () => import('./assets/plus_square'),
    ['plus', 'square', 'add', 'expand', 'increment']
  ),
  popout: () => import('./assets/external'), // NOTE: To be deprecated in favor of external
  presentation: withSynonyms(
    () => import('./assets/presentation'),
    ['presentation', 'slides', 'deck', 'display', 'show']
  ),
  productRobot: () => import('./assets/product_agent'), // NOTE: To be deprecated in favor of productAgent
  productAgent: withSynonyms(
    () => import('./assets/product_agent'),
    ['agent', 'product', 'elastic agent', 'fleet', 'monitoring']
  ),
  productCloudInfra: withSynonyms(
    () => import('./assets/product_cloud_infra'),
    ['cloud', 'infrastructure', 'product', 'hosting', 'platform']
  ),
  productDashboard: withSynonyms(
    () => import('./assets/product_dashboard'),
    ['dashboard', 'product', 'kibana', 'analytics', 'panel']
  ),
  productDiscover: withSynonyms(
    () => import('./assets/product_discover'),
    ['discover', 'product', 'explore', 'data', 'search', 'kibana']
  ),
  productML: withSynonyms(
    () => import('./assets/product_ml'),
    ['machine learning', 'ml', 'product', 'model', 'ai']
  ),
  productStreamsClassic: withSynonyms(
    () => import('./assets/product_streams_classic'),
    ['streams', 'classic', 'product', 'data', 'pipeline']
  ),
  productStreamsWired: withSynonyms(
    () => import('./assets/product_streams_wired'),
    ['streams', 'wired', 'product', 'data', 'pipeline', 'connected']
  ),
  push: () => import('./assets/send'), // NOTE: To be deprecated in favor of send
  send: withSynonyms(
    () => import('./assets/send'),
    ['send', 'submit', 'dispatch', 'arrow', 'share']
  ),
  question: withSynonyms(
    () => import('./assets/question'),
    ['question', 'help', 'unknown', 'faq', 'ask']
  ),
  quote: withSynonyms(
    () => import('./assets/quote'),
    ['quote', 'citation', 'blockquote', 'text']
  ),
  radar: withSynonyms(
    () => import('./assets/radar'),
    ['radar', 'scan', 'detect', 'monitor', 'signal']
  ),
  readOnly: withSynonyms(
    () => import('./assets/read_only'),
    ['read only', 'locked', 'view', 'permission', 'restrict']
  ),
  recentlyViewedApp: () => import('./assets/app_recently_viewed'),
  refresh: withSynonyms(
    () => import('./assets/refresh'),
    ['refresh', 'reload', 'sync', 'update', 'rotate']
  ),
  regressionJob: () => import('./assets/ml_regression_job'),
  reporter: withSynonyms(
    () => import('./assets/reporter'),
    ['reporter', 'report', 'export', 'document', 'output']
  ),
  reportingApp: () => import('./assets/app_reporting'),
  return: withSynonyms(
    () => import('./assets/return'),
    ['return', 'enter', 'keyboard', 'submit', 'back', 'revert']
  ),
  returnKey: () => import('./assets/return'), // NOTE: To be deprecated in favor of return
  save: withSynonyms(
    () => import('./assets/save'),
    ['save', 'store', 'disk', 'persist', 'keep']
  ),
  savedObjectsApp: () => import('./assets/app_saved_objects'),
  scale: () => import('./assets/scale'),
  search: () => import('./assets/magnify'), // NOTE: To be deprecated in favor of magnify
  searchProfilerApp: () => import('./assets/app_search_profiler'),
  section: withSynonyms(
    () => import('./assets/section'),
    ['section', 'region', 'block', 'area', 'group']
  ),
  securityAnalyticsApp: () => import('./assets/app_security_analytics'),
  securityApp: () => import('./assets/app_security'),
  securitySignal: () => import('./assets/security_signal'), // NOTE: To be deprecated in favor of radar
  securitySignalDetected: () => import('./assets/security_signal_detected'),
  securitySignalResolved: () => import('./assets/security_signal_resolved'),
  server: withSynonyms(
    () => import('./assets/server'),
    ['server', 'host', 'machine', 'infrastructure', 'backend']
  ),
  sessionViewer: () => import('./assets/session_viewer'),
  shard: withSynonyms(
    () => import('./assets/shard'),
    ['shard', 'partition', 'segment', 'elastic', 'index']
  ),
  share: withSynonyms(
    () => import('./assets/share'),
    ['share', 'send', 'distribute', 'social', 'export']
  ),
  significantEvents: withSynonyms(
    () => import('./assets/significant_events'),
    ['events', 'significant', 'anomaly', 'alert', 'notable', 'timeline']
  ),
  singleMetricViewer: () => import('./assets/single_metric_viewer'),
  snowflake: withSynonyms(
    () => import('./assets/snowflake'),
    ['snowflake', 'unique', 'id', 'data warehouse']
  ),
  sortAscending: withSynonyms(
    () => import('./assets/sort_ascending'),
    ['sort', 'ascending', 'up', 'order', 'rank', 'increase']
  ),
  sortDescending: withSynonyms(
    () => import('./assets/sort_descending'),
    ['sort', 'descending', 'down', 'order', 'rank', 'decrease']
  ),
  sortDown: withSynonyms(
    () => import('./assets/sort_down'),
    ['sort down', 'sort', 'order', 'rank', 'arrange', 'down']
  ),
  sortLeft: withSynonyms(
    () => import('./assets/sort_left'),
    ['sort left', 'sort', 'order', 'rank', 'arrange', 'left']
  ),
  sortRight: withSynonyms(
    () => import('./assets/sort_right'),
    ['sort right', 'sort', 'order', 'rank', 'arrange', 'right']
  ),
  sortUp: withSynonyms(
    () => import('./assets/sort_up'),
    ['sort up', 'sort', 'order', 'rank', 'arrange', 'up']
  ),
  sortable: withSynonyms(
    () => import('./assets/sortable'),
    ['sortable', 'sort', 'order']
  ),
  spaces: () => import('./assets/spaces'),
  spacesApp: () => import('./assets/app_spaces'),
  sparkles: withSynonyms(
    () => import('./assets/sparkles'),
    ['sparkles', 'ai', 'magic', 'new', 'enhance', 'auto']
  ),
  sqlApp: () => import('./assets/app_sql'),
  star: withSynonyms(
    () => import('./assets/star'),
    ['star', 'favorite', 'rating', 'bookmark']
  ),
  starEmpty: () => import('./assets/star'), // NOTE: To be deprecated in favor of star
  starEmptySpace: () => import('./assets/star_empty_space'),
  starFill: withSynonyms(
    () => import('./assets/star_fill'),
    [
      'star fill',
      'star',
      'favorite',
      'rating',
      'bookmark',
      'fill',
      'filled',
      'solid',
    ]
  ),
  starFilled: () => import('./assets/star_fill'), // NOTE: To be deprecated in favor of starFill,
  starFillSpace: () => import('./assets/star_fill_space'),
  starFilledSpace: () => import('./assets/star_fill_space'), // NOTE: To be deprecated in favor of starFillSpace
  starMinusEmpty: () => import('./assets/star_minus_empty'),
  starMinusFill: () => import('./assets/star_minus_fill'),
  starMinusFilled: () => import('./assets/star_minus_fill'), // NOTE: To be deprecated in favor of starMinusFill
  starPlusEmpty: () => import('./assets/star_plus_empty'),
  starPlusFill: () => import('./assets/star_plus_fill'),
  starPlusFilled: () => import('./assets/star_plus_fill'), // NOTE: To be deprecated in favor of starPlusFill
  stats: () => import('./assets/stats'),
  stop: withSynonyms(
    () => import('./assets/stop'),
    ['stop', 'halt', 'end', 'terminate', 'square']
  ),
  stopFill: () => import('./assets/stop_fill'),
  stopFilled: () => import('./assets/stop_fill'), // NOTE: To be deprecated in favor of stopFill
  stopSlash: () => import('./assets/stop_slash'),
  storage: withSynonyms(
    () => import('./assets/storage'),
    ['storage', 'disk', 'drive', 'save', 'data store']
  ),
  streamsClassic: () => import('./assets/product_streams_classic'), // NOTE: To be deprecated in favor of productStreamsClassic
  streamsWired: () => import('./assets/product_streams_wired'), // NOTE: To be deprecated in favor of productStreamsWired
  string: () => import('./assets/string'),
  submodule: () => import('./assets/merge'), // NOTE: To be deprecated in favor of `merge`
  sun: withSynonyms(
    () => import('./assets/sun'),
    ['sun', 'light', 'day', 'theme', 'bright']
  ),
  swatchInput: () => import('./assets/swatch_input'), // Undocumented on purpose. Has an extra stroke for EuiColorPicker
  symlink: withSynonyms(
    () => import('./assets/symlink'),
    ['symlink', 'shortcut', 'alias', 'link', 'reference']
  ),
  tableDensityCompact: () => import('./assets/table_density_high'), // NOTE: To be deprecated in favor of tableDensityHigh
  tableDensityHigh: withSynonyms(
    () => import('./assets/table_density_high'),
    ['table', 'density', 'compact', 'tight', 'rows', 'spacing']
  ),
  tableDensityExpanded: () => import('./assets/table_density_low'), // NOTE: To be deprecated in favor of tableDensityLow
  tableDensityLow: withSynonyms(
    () => import('./assets/table_density_low'),
    ['table', 'density', 'spacious', 'loose', 'rows', 'spacing']
  ),
  tableDensityNormal: () => import('./assets/table'), // NOTE: To be deprecated in favor of table
  tableOfContents: () => import('./assets/table_of_contents'),
  tag: withSynonyms(
    () => import('./assets/tag'),
    ['tag', 'label', 'category', 'keyword', 'badge']
  ),
  tear: () => import('./assets/tear'),
  temperature: () => import('./assets/thermometer'), // NOTE: To be deprecated in favor of thermometer
  thermometer: withSynonyms(
    () => import('./assets/thermometer'),
    ['thermometer', 'temperature', 'heat', 'metric', 'gauge']
  ),
  thumbDown: withSynonyms(
    () => import('./assets/thumb_down'),
    ['thumbs down', 'dislike', 'negative', 'vote', 'feedback', 'bad']
  ),
  thumbUp: withSynonyms(
    () => import('./assets/thumb_up'),
    ['thumbs up', 'like', 'positive', 'vote', 'feedback', 'good']
  ),
  timeline: withSynonyms(
    () => import('./assets/timeline'),
    ['timeline', 'history', 'events', 'chronological', 'sequence']
  ),
  timelineWithArrow: withSynonyms(
    () => import('./assets/timeline_with_arrow'),
    ['timeline', 'arrow', 'history', 'sequence', 'flow', 'events']
  ),
  timelionApp: () => import('./assets/app_timelion'),
  timeRefresh: () => import('./assets/refresh_time'), // NOTE: To be deprecated in favor of refreshTime
  refreshTime: withSynonyms(
    () => import('./assets/refresh_time'),
    ['refresh', 'time', 'reload', 'schedule', 'sync', 'clock']
  ),
  timeslider: () => import('./assets/clock_control'), // NOTE: To be deprecated in favor of clockControl
  training: () => import('./assets/presentation'), // NOTE: To be deprecated in favor of presentation,
  transitionBottomIn: withSynonyms(
    () => import('./assets/transition_bottom_in'),
    ['transition', 'bottom', 'in', 'animate', 'enter', 'motion']
  ),
  transitionBottomOut: withSynonyms(
    () => import('./assets/transition_bottom_out'),
    ['transition', 'bottom', 'out', 'animate', 'exit', 'motion']
  ),
  transitionLeftIn: withSynonyms(
    () => import('./assets/transition_left_in'),
    ['transition', 'left', 'in', 'animate', 'enter', 'motion']
  ),
  transitionLeftOut: withSynonyms(
    () => import('./assets/transition_left_out'),
    ['transition', 'left', 'out', 'animate', 'exit', 'motion']
  ),
  transitionTopIn: withSynonyms(
    () => import('./assets/transition_top_in'),
    ['transition', 'top', 'in', 'animate', 'enter', 'motion']
  ),
  transitionTopOut: withSynonyms(
    () => import('./assets/transition_top_out'),
    ['transition', 'top', 'out', 'animate', 'exit', 'motion']
  ),
  trash: withSynonyms(
    () => import('./assets/trash'),
    ['trash', 'delete', 'remove', 'bin', 'garbage', 'discard']
  ),
  unfold: () => import('./assets/unfold'),
  unlink: () => import('./assets/link_slash'), // NOTE: To be deprecated in favor of linkSlash
  upgradeAssistantApp: () => import('./assets/app_upgrade_assistant'),
  uptimeApp: () => import('./assets/app_uptime'),
  user: withSynonyms(
    () => import('./assets/user'),
    ['user', 'person', 'account', 'profile', 'avatar']
  ),
  userAvatar: () => import('./assets/user'), // NOTE: To be deprecated in favor of `user`
  users: withSynonyms(
    () => import('./assets/users'),
    ['users', 'people', 'team', 'group', 'accounts']
  ),
  usersRolesApp: () => import('./assets/app_users_roles'),
  unarchive: withSynonyms(
    () => import('./assets/unarchive'),
    ['unarchive', 'restore', 'extract', 'retrieve', 'unpack']
  ),
  vector: () => import('./assets/vector_square'), // NOTE: To be deprecated in favor of vectorSquare
  vectorSquare: withSynonyms(
    () => import('./assets/vector_square'),
    ['vector', 'square', 'shape', 'geometry', 'box', 'region']
  ),
  videoPlayer: withSynonyms(
    () => import('./assets/video_player'),
    ['video', 'player', 'play', 'media', 'film', 'watch']
  ),
  visArea: () => import('./assets/chart_area'), // NOTE: To be deprecated in favor of chartArea
  visAreaStacked: () => import('./assets/chart_area_stack'), // NOTE: To be deprecated in favor of chartAreaStack
  visBarHorizontal: () => import('./assets/chart_bar_horizontal'), // NOTE: To be deprecated in favor of chartBarHorizontal
  visBarHorizontalStacked: () => import('./assets/chart_bar_horizontal_stack'), // NOTE: To be deprecated in favor of chartBarHorizontalStack
  visBarVertical: () => import('./assets/chart_bar_vertical'), // NOTE: To be deprecated in favor of chartBarVertical
  visBarVerticalStacked: () => import('./assets/chart_bar_vertical_stack'), // NOTE: To be deprecated in favor of chartBarVerticalStack
  visGauge: () => import('./assets/chart_gauge'), // NOTE: To be deprecated in favor of chartGauge
  visGoal: () => import('./assets/vis_goal'),
  visLine: () => import('./assets/chart_line'), // NOTE: To be deprecated in favor of chartLine
  visMapCoordinate: () => import('./assets/waypoint'), // NOTE: To be deprecated in favor of waypoint
  visMapRegion: () => import('./assets/map'), // NOTE: To be deprecated in favor of map
  visMetric: () => import('./assets/chart_metric'), // NOTE: To be deprecated in favor of chartMetric
  chartMetric: withSynonyms(
    () => import('./assets/chart_metric'),
    ['metric', 'chart', 'kpi', 'measurement', 'stat', 'indicator']
  ),
  visPie: () => import('./assets/chart_pie'), // NOTE: To be deprecated in favor of chartPie
  visTable: () => import('./assets/table'), // NOTE: To be deprecated in favor of table
  visTagCloud: () => import('./assets/chart_tag_cloud'), // NOTE: To be deprecated in favor of chartTagCloud
  visText: () => import('./assets/text'), // NOTE: To be deprecated in favor of text,
  visTimelion: () => import('./assets/vis_timelion'),
  visVega: () => import('./assets/code'), // NOTE: To be deprecated in favor of `code`
  visVisualBuilder: () => import('./assets/vis_visual_builder'),
  visualizeApp: () => import('./assets/app_visualize'),
  vulnerabilityManagementApp: () =>
    import('./assets/app_vulnerability_management'),
  warning: withSynonyms(
    () => import('./assets/warning'),
    ['warning', 'alert', 'caution', 'danger', 'issue']
  ),
  warningFilled: () => import('./assets/warning_fill'), // NOTE: To be deprecated in favor of warningFill
  warningFill: withSynonyms(
    () => import('./assets/warning_fill'),
    [
      'warning fill',
      'warning',
      'alert',
      'caution',
      'danger',
      'issue',
      'fill',
      'filled',
    ]
  ),
  watchesApp: () => import('./assets/app_watches'),
  web: () => import('./assets/web'),
  wordWrap: () => import('./assets/word_wrap'),
  wordWrapDisabled: () => import('./assets/word_wrap_disabled'),
  workflowsApp: () => import('./assets/app_workflows'),
  workflow: withSynonyms(
    () => import('./assets/workflow'),
    ['workflow', 'automation', 'pipeline', 'process', 'flow']
  ),
  workplaceSearchApp: () => import('./assets/app_workplace_search'),
  wrench: withSynonyms(
    () => import('./assets/wrench'),
    ['wrench', 'tool', 'fix', 'settings', 'repair']
  ),
  // Token Icon Imports
  tokenAlias: () => import('./assets/token_alias'),
  tokenAnnotation: () => import('./assets/token_annotation'),
  tokenArray: () => import('./assets/token_array'),
  tokenBinary: () => import('./assets/token_binary'),
  tokenBoolean: () => import('./assets/token_boolean'),
  tokenClass: () => import('./assets/token_class'),
  tokenCompletionSuggester: () => import('./assets/token_completion_suggester'),
  tokenConstant: () => import('./assets/token_constant'),
  tokenDate: () => import('./assets/token_date'),
  tokenDimension: () => import('./assets/token_dimension'),
  tokenElement: () => import('./assets/token_element'),
  tokenEnum: () => import('./assets/token_enum'),
  tokenEnumMember: () => import('./assets/token_enum_member'),
  tokenEvent: () => import('./assets/token_event'),
  tokenException: () => import('./assets/token_exception'),
  tokenField: () => import('./assets/token_field'),
  tokenFile: () => import('./assets/token_file'),
  tokenFlattened: () => import('./assets/token_flattened'),
  tokenFunction: () => import('./assets/token_function'),
  tokenGeo: () => import('./assets/token_geo'),
  tokenHistogram: () => import('./assets/token_histogram'),
  tokenInterface: () => import('./assets/token_interface'),
  tokenIP: () => import('./assets/token_ip'),
  tokenJoin: () => import('./assets/token_join'),
  tokenKey: () => import('./assets/token_key'),
  tokenKeyword: () => import('./assets/token_keyword'),
  tokenMethod: () => import('./assets/token_method'),
  tokenMetricCounter: () => import('./assets/token_metric_counter'),
  tokenMetricGauge: () => import('./assets/token_metric_gauge'),
  tokenModule: () => import('./assets/token_module'),
  tokenNamespace: () => import('./assets/token_namespace'),
  tokenNested: () => import('./assets/token_nested'),
  tokenNull: () => import('./assets/token_null'),
  tokenNumber: () => import('./assets/token_number'),
  tokenObject: () => import('./assets/token_object'),
  tokenOperator: () => import('./assets/token_operator'),
  tokenPackage: () => import('./assets/token_package'),
  tokenParameter: () => import('./assets/token_parameter'),
  tokenPercolator: () => import('./assets/token_percolator'),
  tokenProperty: () => import('./assets/token_property'),
  tokenRange: () => import('./assets/token_range'),
  tokenRankFeature: () => import('./assets/token_rank_feature'),
  tokenRankFeatures: () => import('./assets/token_rank_features'),
  tokenRepo: () => import('./assets/token_repo'),
  tokenSearchType: () => import('./assets/token_search_type'),
  tokenSemanticText: () => import('./assets/token_semantic_text'),
  tokenShape: () => import('./assets/token_shape'),
  tokenString: () => import('./assets/token_string'),
  tokenStruct: () => import('./assets/token_struct'),
  tokenSymbol: () => import('./assets/token_symbol'),
  tokenTag: () => import('./assets/token_tag'),
  tokenText: () => import('./assets/token_text'),
  tokenTokenCount: () => import('./assets/token_token_count'),
  tokenVariable: () => import('./assets/token_variable'),
  tokenVectorDense: () => import('./assets/token_vector_dense'),
  tokenDenseVector: () => import('./assets/token_vector_dense'), // NOTE: This is an undocumented alias for `tokenVectorDense`, added for legacy compatability
  tokenVectorSparse: () => import('./assets/token_vector_sparse'),
};

export type TypeToPathMapSynonyms = Partial<
  Record<keyof typeof typeToPathMap, string[]>
>;

export const typeToPathMapSynonyms: TypeToPathMapSynonyms = Object.fromEntries(
  Object.entries(typeToPathMap).flatMap(([iconType, loader]) => {
    const synonyms = (loader as { synonyms?: string[] }).synonyms;

    return synonyms ? [[iconType, synonyms]] : [];
  })
) as TypeToPathMapSynonyms;
