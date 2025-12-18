/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const typeToPathMap = {
  accessibility: 'accessibility',
  addDataApp: 'app_add_data',
  advancedSettingsApp: 'app_advanced_settings',
  agentApp: 'app_fleet',
  aggregate: 'aggregate',
  alignBottom: 'align_bottom',
  alignBottomLeft: 'align_bottom_left',
  alignBottomRight: 'align_bottom_right',
  alignCenterHorizontal: 'align_center_horizontal',
  alignCenterVertical: 'align_center_vertical',
  alignLeft: 'align_left',
  alignRight: 'align_right',
  alignTop: 'align_top',
  alignTopLeft: 'align_top_left',
  alignTopRight: 'align_top_right',
  alert: 'warning', // NOTE: To be deprecated in favor of `warning`
  analyzeEvent: 'analyzeEvent',
  annotation: 'annotation',
  anomalyChart: 'chart_anomaly', // NOTE: To be deprecated in favor of chartAnomaly
  chartAnomaly: 'chart_anomaly',
  anomalySwimLane: 'anomaly_swim_lane',
  apmApp: 'app_apm',
  apmTrace: 'chart_waterfall', // NOTE: To be deprecated in favor of chartWaterfall
  chartWaterfall: 'chart_waterfall',
  arrowUpRight: 'arrow_up_right',
  arrowVertical: 'arrow_vertical',
  appSearchApp: 'app_app_search',
  apps: 'apps',
  arrowDown: 'chevron_single_down', // NOTE: To be deprecated in favor of chevronSingleDown
  chevronSingleDown: 'chevron_single_down',
  arrowLeft: 'chevron_single_left', // NOTE: To be deprecated in favor of chevronSingleLeft
  chevronSingleLeft: 'chevron_single_left',
  arrowRight: 'chevron_single_right', // NOTE: To be deprecated in favor of chevronSinglRight
  chevronSingleRight: 'chevron_single_right',
  arrowUp: 'chevron_single_up', // NOTE: To be deprecated in favor of chevronSingleUp
  chevronSingleUp: 'chevron_single_up',
  arrowStart: 'chevron_limit_left', // NOTE: To be deprecated in favor of chevronLimitLeft
  chevronLimitLeft: 'chevron_limit_left',
  arrowEnd: 'chevron_limit_right', // NOTE: To be deprecated in favor of chevronLimitRight
  chevronLimitRight: 'chevron_limit_right',
  article: 'article',
  asterisk: 'asterisk',
  at: 'at',
  auditbeatApp: 'app_auditbeat',
  backgroundTask: 'background_task',
  beaker: 'flask', // NOTE: To be deprecated in favor of `flask`
  bell: 'bell',
  bellSlash: 'bellSlash',
  beta: 'beta',
  bolt: 'bolt',
  boxesHorizontal: 'boxes_vertical', // NOTE: To be deprecated in favor of `boxes_vertical`
  boxesVertical: 'boxes_vertical',
  branch: 'branch',
  branchUser: 'branchUser',
  broom: 'broom',
  brush: 'brush',
  bug: 'bug',
  bullseye: 'bullseye',
  calendar: 'calendar',
  canvasApp: 'app_canvas',
  casesApp: 'app_cases',
  changePointDetection: 'chart_change_point', // NOTE: To be deprecated in favor of chartChangePoint
  chartChangePoint: 'chart_change_point',
  chartArea: 'chart_area',
  chartAreaStack: 'chart_area_stack',
  chartBarHorizontal: 'chart_bar_horizontal',
  chartBarHorizontalStack: 'chart_bar_horizontal_stack',
  chartBarVertical: 'chart_bar_vertical',
  chartBarVerticalStack: 'chart_bar_vertical_stack',
  chartGauge: 'chart_gauge',
  chartHeatmap: 'chart_heatmap',
  chartLine: 'chart_line',
  chartPie: 'chart_pie',
  chartTagCloud: 'chart_tag_cloud',
  chartThreshold: 'chart_threshold',
  check: 'check',
  checkCircle: 'checkCircle',
  checkInCircleFilled: 'checkCircleFill', // NOTE: To be deprecated in favor of checkCircleFill
  checkCircleFill: 'checkCircleFill',
  cheer: 'popper', // NOTE: To be deprecated in favor of popper
  popper: 'popper',
  classificationJob: 'ml_classification_job',
  clickLeft: 'clickLeft',
  clickRight: 'clickRight',
  clock: 'clock',
  clockCounter: 'clockCounter',
  clockControl: 'clock_control',
  cloudDrizzle: 'cloudDrizzle',
  cloudStormy: 'cloudStormy',
  cloudSunny: 'cloudSunny',
  cluster: 'cluster',
  code: 'code',
  codeApp: 'app_code',
  color: 'paint_bucket', // NOTE: To be deprecated in favor of paintBucket
  paintBucket: 'paint_bucket',
  commandLine: 'command_line',
  comment: 'comment',
  compare: 'compare',
  compute: 'processor', // NOTE: To be deprecated in favor of processor
  processor: 'processor',
  console: 'command_line', // NOTE: To be deprecated in favor of commandLine
  consoleApp: 'app_console',
  container: 'container',
  continuityAbove: 'continuityAbove',
  continuityAboveBelow: 'continuityAboveBelow',
  continuityBelow: 'continuityBelow',
  continuityWithin: 'continuityWithin',
  contrast: 'contrast',
  contrastHigh: 'contrast_fill', // NOTE: To be deprecated in favor of contrastFill
  contrastFill: 'contrast_fill',
  controls: 'controls',
  controlsHorizontal: 'controls', // NOTE: To be deprecated in favor of `controls`
  controlsVertical: 'controls', // NOTE: To be deprecated in favor of `controls`
  copy: 'copy',
  copyClipboard: 'copy', // NOTE: To be deprecated in favor of `copy`
  createAdvancedJob: 'ml_create_advanced_job',
  createGenericJob: 'ml_create_generic_job',
  createGeoJob: 'ml_create_geo_job',
  createMultiMetricJob: 'ml_create_multi_metric_job',
  createPopulationJob: 'ml_create_population_job',
  createSingleMetricJob: 'ml_create_single_metric_job',
  cross: 'cross',
  crossClusterReplicationApp: 'app_cross_cluster_replication',
  crossInCircle: 'cross_circle', // NOTE: To be deprecated in favor of crossCircle
  crossCircle: 'cross_circle',
  crosshair: 'crosshair',
  crosshairs: 'crosshair', // NOTE: To be deprecated in favor of crosshair
  currency: 'money', // NOTE: To be deprecated in favor of money
  money: 'money',
  cut: 'scissors', // NOTE: To be deprecated in favor of scissors
  scissors: 'scissors',
  dashboardApp: 'app_dashboard',
  dataVisualizer: 'ml_data_visualizer',
  database: 'database',
  desktop: 'display', // NOTE: To be deprecated in favor of display
  display: 'display',
  devToolsApp: 'app_devtools',
  diff: 'compare', // NOTE: To be deprecated in favor of compare
  discoverApp: 'app_discover',
  distributeHorizontal: 'distribute_horizontal',
  distributeVertical: 'distribute_vertical',
  download: 'download',
  drag: 'drag',
  dragHorizontal: 'drag_horizontal',
  dragVertical: 'drag_vertical',
  discuss: 'comment', // NOTE: To be deprecated in favor of `comment`
  document: 'document',
  documentEdit: 'pencil', // NOTE: To be deprecated in favor of `pencil`
  documentation: 'documentation',
  documents: 'documents',
  dot: 'dot',
  dotInCircle: 'dotInCircle',
  doubleArrowLeft: 'chevron_double_left', // NOTE: To be deprecated in favor of chevronDoubleLeft
  chevronDoubleLeft: 'chevron_double_left',
  doubleArrowRight: 'chevron_double_right', // NOTE: To be deprecated in favor of chevronDoubleRight
  chevronDoubleRight: 'chevron_double_right',
  ellipsis: 'ellipsis',
  editorAlignCenter: 'text_align_center', // NOTE: To be deprecated in favor of textAlignCenter
  textAlignCenter: 'text_align_center',
  editorAlignLeft: 'text_align_left', // NOTE: To be deprecated in favor of textAlignLeft
  textAlignLeft: 'text_align_left',
  editorAlignRight: 'text_align_right', // NOTE: To be deprecated in favor of textAlignRight
  textAlignRight: 'text_align_right',
  editorBold: 'text_bold', // NOTE: To be deprecated in favor of textBold
  textBold: 'text_bold',
  editorChecklist: 'list_check', // NOTE: To be deprecated in favor of listCheck
  listCheck: 'list_check',
  editorCodeBlock: 'code', // NOTE: To be deprecated in favor of `code`
  editorComment: 'comment', // NOTE: To be deprecated in favor of `comment`
  editorDistributeHorizontal: 'distribute_horizontal', // NOTE: To be deprecated in favor of distributeHorizontal
  editorDistributeVertical: 'distribute_vertical', // NOTE: To be deprecated in favor of distributeVertical
  editorHeading: 'text_heading', // NOTE: To be deprecated in favor of textHeading
  textHeading: 'text_heading',
  editorItalic: 'text_italic', // NOTE: To be deprecated in favor of textItalic
  textItalic: 'text_italic',
  editorItemAlignBottom: 'align_bottom', // NOTE: To be deprecated in favor of alignBottom
  editorItemAlignCenter: 'align_center_horizontal', // NOTE: To be deprecated in favor of alignCenterHorizontal
  editorItemAlignLeft: 'align_left', // NOTE: To be deprecated in favor of alignLeft
  editorItemAlignMiddle: 'align_center_vertical', // NOTE: To be deprecated in favor of alignCenterVertical
  editorItemAlignRight: 'align_right', // NOTE: To be deprecated in favor of alignRight
  editorItemAlignTop: 'align_top', // NOTE: To be deprecated in favor of alignTop,
  editorLink: 'link', // NOTE: To be deprecated in favor of `link`
  editorOrderedList: 'list_number', // NOTE: To be deprecated in favor of listNumber
  listNumber: 'list_number',
  editorPositionBottomLeft: 'align_bottom_left', // NOTE: To be deprecated in favor of alignBottomLeft
  editorPositionBottomRight: 'align_bottom_right', // NOTE: To be deprecated in favor of alignBottomRight
  editorPositionTopLeft: 'align_top_left', // NOTE: To be deprecated in favor of alignTopLeft
  editorPositionTopRight: 'align_top_right', // NOTE: To be deprecated in favor of alignTopRight
  editorRedo: 'redo', // NOTE: To be deprecated in favor of redo
  redo: 'redo',
  editorStrike: 'text_strike', // NOTE: To be deprecated in favor of textStrike
  textStrike: 'text_strike',
  editorTable: 'table', // NOTE: To be deprecated in favor of table
  table: 'table',
  editorUnderline: 'text_underline', // NOTE: To be deprecated in favor of textUnderline
  textUnderline: 'text_underline',
  editorUndo: 'undo', // NOTE: To be deprecated in favor of undo
  undo: 'undo',
  editorUnorderedList: 'list_bullet', // NOTE: To be deprecated in favor of listBullet
  listBullet: 'list_bullet',
  email: 'mail', // NOTE: To be deprecated in favor of mail
  mail: 'mail',
  empty: 'empty',
  emsApp: 'app_ems',
  endpoint: 'endpoint',
  eql: 'query', // NOTE: To be deprecated in favor of query
  query: 'query',
  eraser: 'eraser',
  error: 'error',
  errorFilled: 'errorFill', // NOTE: To be deprecated in favor of errorFill
  errorFill: 'errorFill',
  esqlVis: 'esqlVis',
  exit: 'log_out', // NOTE: To be deprecated in favor of logOut
  logOut: 'log_out',
  expand: 'maximize', // NOTE: To be deprecated in favor of maximize
  maximize: 'maximize',
  expandMini: 'maximize', // NOTE: To be deprecated in favor of maximize
  export: 'export',
  exportAction: 'upload', // NOTE: To be deprecated in favor of upload
  upload: 'upload',
  external: 'external',
  eye: 'eye',
  eyeClosed: 'eye_slash', // NOTE: To be deprecated in favor of eyeSlash
  eyeSlash: 'eye_slash',
  faceHappy: 'face_happy',
  faceNeutral: 'face_neutral',
  faceSad: 'face_sad',
  fieldStatistics: 'table_info', // NOTE: To be deprecated in favor of tableInfo
  tableInfo: 'table_info',
  filebeatApp: 'app_filebeat',
  filter: 'filter',
  filterExclude: 'filterExclude',
  filterIgnore: 'filterIgnore',
  filterInclude: 'filterInclude',
  filterInCircle: 'filter', // NOTE: To be deprecated in favor of `filter`
  flask: 'flask',
  flag: 'flag',
  fleetApp: 'app_agent',
  fold: 'fold',
  folder: 'folder',
  folderCheck: 'folder_check',
  folderClosed: 'folder_closed',
  folderExclamation: 'folder_exclamation',
  folderOpen: 'folder', // NOTE: To be deprecated in favor of folder,
  frameNext: 'frameNext',
  framePrevious: 'framePrevious',
  fullScreen: 'full_screen',
  fullScreenExit: 'fullScreenExit',
  function: 'function',
  gear: 'gear',
  gisApp: 'app_gis',
  glasses: 'readOnly', // NOTE: To be deprecated in favor of `readOnly`
  globe: 'globe',
  grab: 'drag_vertical', // NOTE: To be deprecated in favor of dragVertical
  grabHorizontal: 'drag_horizontal', // NOTE: To be deprecated in favor of dragHorizontal
  grabOmnidirectional: 'drag', // NOTE: To be deprecated in favor of drag,
  gradient: 'gradient',
  graphApp: 'app_graph',
  grid: 'grid',
  grokApp: 'app_grok',
  heart: 'heart',
  heartbeatApp: 'app_heartbeat',
  heatmap: 'chart_heatmap', // NOTE: To be deprecated in favor of chartHeatmap
  help: 'help', // NOTE: Might be deprecated later (not recommended in Kibana)
  home: 'home',
  if: 'if',
  info: 'info',
  image: 'image',
  importAction: 'download', // NOTE: To be deprecated in favor of download
  index: 'index',
  indexClose: 'index_close',
  indexEdit: 'index_edit',
  indexFlush: 'chart_threshold', // NOTE: To be deprecated in favor of chartThreshold
  indexManagementApp: 'app_index_management',
  indexMapping: 'mapping', // NOTE: To be deprecated in favor of mapping
  mapping: 'mapping',
  indexOpen: 'index_open',
  indexPatternApp: 'app_index_pattern',
  indexRollupApp: 'app_index_rollup',
  indexRuntime: 'index_runtime',
  indexSettings: 'index_settings',
  indexTemporary: 'table_time', // NOTE: To be deprecated in favor of tableTime
  tableTime: 'table_time',
  infinity: 'infinity',
  inputOutput: 'inputOutput',
  inspect: 'inspect',
  invert: 'invert',
  ip: 'ip',
  key: 'key',
  keyboard: 'keyboard',
  kqlField: 'query_field', // NOTE: To be deprecated in favor of queryField
  queryField: 'query_field',
  kqlFunction: 'kql_function',
  kqlOperand: 'query_operand', // NOTE: To be deprecated in favor of queryOperand
  queryOperand: 'query_operand',
  kqlSelector: 'query_selector', // NOTE: To be deprecated in favor of querySelector
  querySelector: 'query_selector',
  kqlValue: 'query_value', // NOTE: To be deprecated in favor of queryValue
  queryValue: 'query_value',
  kubernetesNode: 'kubernetesNode',
  kubernetesPod: 'kubernetesPod',
  launch: 'rocket', // NOTE: To be deprecated in favor of rocket
  rocket: 'rocket',
  layers: 'layers',
  lensApp: 'app_lens',
  lettering: 'text', // NOTE: To be deprecated in favor of text
  text: 'text',
  lineBreak: 'line_break',
  lineBreakSlash: 'line_break_slash',
  lineDash: 'line_dash',
  lineDashed: 'line_dash', // NOTE: To be deprecated in favor of lineDash
  lineDot: 'line_dot',
  lineDotted: 'line_dot', // NOTE: To be deprecated in favor of lineDot
  lineSolid: 'lineSolid',
  link: 'link',
  linkSlash: 'link_slash',
  list: 'list_bullet', // NOTE: To be deprecated in favor of listBullet,
  listAdd: 'plus_circle', // NOTE: To be deprecated in favor of `plus_circle`
  lock: 'lock',
  lockOpen: 'lockOpen',
  logPatternAnalysis: 'pattern', // NOTE: To be deprecated in favor of pattern
  pattern: 'pattern',
  logRateAnalysis: 'log_rate_analysis',
  logoAWS: 'logo_aws',
  logoAWSMono: 'logo_aws_mono',
  logoAerospike: 'logo_aerospike',
  logoApache: 'logo_apache',
  logoAppSearch: 'logo_app_search',
  logoAzure: 'logo_azure',
  logoAzureMono: 'logo_azure_mono',
  logoBeats: 'logo_beats',
  logoBusinessAnalytics: 'logo_business_analytics',
  logoCeph: 'logo_ceph',
  logoCloud: 'logo_cloud',
  logoCloudEnterprise: 'logo_cloud_ece',
  logoCode: 'logo_code',
  logoCodesandbox: 'logo_codesandbox',
  logoCouchbase: 'logo_couchbase',
  logoDocker: 'logo_docker',
  logoDropwizard: 'logo_dropwizard',
  logoElastic: 'logo_elastic',
  logoElasticStack: 'logo_elastic_stack',
  logoElasticsearch: 'logo_elasticsearch',
  logoEnterpriseSearch: 'logo_enterprise_search',
  logoEtcd: 'logo_etcd',
  logoGCP: 'logo_gcp',
  logoGCPMono: 'logo_gcp_mono',
  logoGithub: 'logo_github',
  logoGmail: 'logo_gmail',
  logoGolang: 'logo_golang',
  logoGoogleG: 'logo_google_g',
  logoHAproxy: 'logo_haproxy',
  logoIBM: 'logo_ibm',
  logoIBMMono: 'logo_ibm_mono',
  logoKafka: 'logo_kafka',
  logoKibana: 'logo_kibana',
  logoKubernetes: 'logo_kubernetes',
  logoLogging: 'logo_logging',
  logoLogstash: 'logo_logstash',
  logoMaps: 'logo_maps',
  logoMemcached: 'logo_memcached',
  logoMetrics: 'logo_metrics',
  logoMongodb: 'logo_mongodb',
  logoMySQL: 'logo_mysql',
  logoNginx: 'logo_nginx',
  logoObservability: 'logo_observability',
  logoOsquery: 'logo_osquery',
  logoPhp: 'logo_php',
  logoPostgres: 'logo_postgres',
  logoPrometheus: 'logo_prometheus',
  logoRabbitmq: 'logo_rabbitmq',
  logoRedis: 'logo_redis',
  logoSecurity: 'logo_security',
  logoSiteSearch: 'logo_site_search',
  logoSketch: 'logo_sketch',
  logoSlack: 'logo_slack',
  logoUptime: 'logo_uptime',
  logoVulnerabilityManagement: 'logo_vulnerability_management',
  logoWebhook: 'logo_webhook',
  logoWindows: 'logo_windows',
  logoWorkplaceSearch: 'logo_workplace_search',
  logsApp: 'app_logs',
  logstashFilter: 'logstash_filter',
  logstashIf: 'if', // NOTE: To be deprecated in favor of if
  logstashInput: 'logstash_input',
  logstashOutput: 'logstash_output',
  logstashQueue: 'queue', // NOTE: To be deprecated in favor of queue
  queue: 'queue',
  machineLearningApp: 'app_ml',
  magnet: 'magnet',
  magnify: 'magnify',
  magnifyExclamation: 'magnify_exclamation',
  magnifyMinus: 'magnify_minus',
  magnifyPlus: 'magnify_plus',
  magnifyWithExclamation: 'magnify_exclamation', // NOTE: To be deprecated in favor of magnifyExclamation
  magnifyWithMinus: 'magnify_minus', // NOTE: To be deprecated in favor of magnifyMinus
  magnifyWithPlus: 'magnify_plus', // NOTE: To be deprecated in favor of magnifyPlus,
  managementApp: 'app_management',
  map: 'map',
  mapMarker: 'waypoint', // NOTE: To be deprecated in favor of waypoint
  waypoint: 'waypoint',
  memory: 'memory',
  menu: 'menu',
  menuDown: 'menuDown',
  menuLeft: 'menuLeft',
  menuRight: 'menuRight',
  menuUp: 'menuUp',
  merge: 'merge',
  metricbeatApp: 'app_metricbeat',
  metricsApp: 'app_metrics',
  minimize: 'minimize',
  minus: 'minus',
  minusCircle: 'minus_circle',
  minusInCircle: 'minus_circle', // NOTE: To be deprecated in favor of minusCircle
  minusInCircleFilled: 'minus_in_circle', // NOTE: To be deprecated in favor of minusCircle
  minusInSquare: 'minus_in_square',
  mobile: 'mobile',
  monitoringApp: 'app_monitoring',
  moon: 'moon',
  move: 'move',
  namespace: 'namespace',
  nested: 'nested',
  newChat: 'plus_circle', // NOTE: To be deprecated in favor of plusCircle
  node: 'node',
  notebookApp: 'app_notebook',
  number: 'number',
  offline: 'wifi_slash', // NOTE: To be deprecated in favor of wifiSlash
  wifiSlash: 'wifi_slash',
  online: 'wifi', // NOTE: To be deprecated in favor of wifi
  wifi: 'wifi',
  outlierDetectionJob: 'ml_outlier_detection_job',
  package: 'package',
  packetbeatApp: 'app_packetbeat',
  pageSelect: 'pageSelect',
  pagesSelect: 'pagesSelect',
  palette: 'palette',
  paperClip: 'paper_clip',
  partial: 'partial',
  pause: 'pause',
  payment: 'payment',
  pencil: 'pencil',
  percent: 'percent',
  pin: 'pin',
  pinFilled: 'pin_filled',
  pipeBreaks: 'line_break', // NOTE: To be deprecated in favor of lineBreak
  pipelineApp: 'app_pipeline',
  pipeNoBreaks: 'line_break_slash', // NOTE: To be deprecated in favor of lineBreakSlash
  pivot: 'arrow_up_right', // NOTE: To be deprecated in favor of arrowUpRight
  play: 'play',
  playFilled: 'play', // NOTE: To be deprecated in favor of `play`
  plugs: 'plugs',
  plus: 'plus',
  plusCircle: 'plus_circle',
  plusInCircle: 'plus_circle', // NOTE: To be deprecated in favor of plusCircle
  plusInCircleFilled: 'plus_circle', // NOTE: To be deprecated in favor of plusCircle
  plusInSquare: 'plus_in_square',
  popout: 'external', // NOTE: To be deprecated in favor of external
  presentation: 'presentation',
  productRobot: 'product_robot',
  productStreamsClassic: 'product_streams_classic',
  productStreamsWired: 'product_streams_wired',
  push: 'send', // NOTE: To be deprecated in favor of send
  send: 'send',
  question: 'question',
  quote: 'quote',
  radar: 'radar',
  readOnly: 'readOnly',
  recentlyViewedApp: 'app_recently_viewed',
  refresh: 'refresh',
  regressionJob: 'ml_regression_job',
  reporter: 'reporter',
  reportingApp: 'app_reporting',
  return: 'return',
  returnKey: 'return', // NOTE: To be deprecated in favor of return
  save: 'save',
  savedObjectsApp: 'app_saved_objects',
  scale: 'scale',
  search: 'magnify', // NOTE: To be deprecated in favor of magnify
  searchProfilerApp: 'app_search_profiler',
  section: 'section',
  securityAnalyticsApp: 'app_security_analytics',
  securityApp: 'app_security',
  securitySignal: 'radar', // NOTE: To be deprecated in favor of radar
  securitySignalDetected: 'securitySignalDetected',
  securitySignalResolved: 'securitySignalResolved',
  sessionViewer: 'sessionViewer',
  shard: 'shard',
  share: 'share',
  singleMetricViewer: 'single_metric_viewer',
  snowflake: 'snowflake',
  sortAscending: 'sortAscending',
  sortDescending: 'sortDescending',
  sortDown: 'sort_down',
  sortLeft: 'sortLeft',
  sortRight: 'sortRight',
  sortUp: 'sort_up',
  sortable: 'arrow_vertical', // NOTE: To be deprecated in favor of arrowVertical,
  spaces: 'spaces',
  spacesApp: 'app_spaces',
  sparkles: 'sparkles',
  sqlApp: 'app_sql',
  star: 'star',
  starEmpty: 'star', // NOTE: To be deprecated in favor of star
  starEmptySpace: 'star_empty_space',
  starFill: 'star_fill',
  starFilled: 'star_fill', // NOTE: To be deprecated in favor of starFill,
  starFilledSpace: 'star_filled_space',
  starMinusEmpty: 'star_minus_empty',
  starMinusFilled: 'star_minus_filled',
  starPlusEmpty: 'starPlusEmpty',
  starPlusFilled: 'starPlusFilled',
  stats: 'stats',
  stop: 'stop',
  stopFilled: 'stop_filled',
  stopSlash: 'stop_slash',
  storage: 'storage',
  streamsClassic: 'product_streams_classic', // NOTE: To be deprecated in favor of productStreamsClassic
  streamsWired: 'product_streams_wired', // NOTE: To be deprecated in favor of productStreamsWired
  string: 'string',
  submodule: 'merge', // NOTE: To be deprecated in favor of `merge`
  sun: 'sun',
  swatchInput: 'swatch_input', // Undocumented on purpose. Has an extra stroke for EuiColorPicker
  symlink: 'symlink',
  tableDensityCompact: 'table_density_high', // NOTE: To be deprecated in favor of tableDensityHigh
  tableDensityHigh: 'table_density_high',
  tableDensityExpanded: 'table_density_low', // NOTE: To be deprecated in favor of tableDensityLow
  tableDensityLow: 'table_density_low',
  tableDensityNormal: 'table', // NOTE: To be deprecated in favor of table
  tableOfContents: 'tableOfContents',
  tag: 'tag',
  tear: 'tear',
  temperature: 'thermometer', // NOTE: To be deprecated in favor of thermometer
  thermometer: 'thermometer',
  thumbDown: 'thumbDown',
  thumbUp: 'thumbUp',
  timeline: 'timeline',
  timelineWithArrow: 'timelineWithArrow',
  timelionApp: 'app_timelion',
  timeRefresh: 'refreshTime', // NOTE: To be deprecated in favor of refreshTime
  refreshTime: 'refreshTime',
  timeslider: 'clock_control', // NOTE: To be deprecated in favor of clockControl
  training: 'presentation', // NOTE: To be deprecated in favor of presentation,
  transitionLeftIn: 'transitionLeftIn',
  transitionLeftOut: 'transitionLeftOut',
  transitionTopIn: 'transitionTopIn',
  transitionTopOut: 'transitionTopOut',
  trash: 'trash',
  unfold: 'unfold',
  unlink: 'link_slash', // NOTE: To be deprecated in favor of linkSlash
  upgradeAssistantApp: 'app_upgrade_assistant',
  uptimeApp: 'app_uptime',
  user: 'user',
  userAvatar: 'user', // NOTE: To be deprecated in favor of `user`
  users: 'users',
  usersRolesApp: 'app_users_roles',
  vector: 'vector_square', // NOTE: To be deprecated in favor of vectorSquare
  vectorSquare: 'vector_square',
  videoPlayer: 'videoPlayer',
  visArea: 'chart_area', // NOTE: To be deprecated in favor of chartArea
  visAreaStacked: 'chart_area_stack', // NOTE: To be deprecated in favor of chartAreaStack
  visBarHorizontal: 'chart_bar_horizontal', // NOTE: To be deprecated in favor of chartBarHorizontal
  visBarHorizontalStacked: 'chart_bar_horizontal_stack', // NOTE: To be deprecated in favor of chartBarHorizontalStack
  visBarVertical: 'chart_bar_vertical', // NOTE: To be deprecated in favor of chartBarVertical
  visBarVerticalStacked: 'chart_bar_vertical_stack', // NOTE: To be deprecated in favor of chartBarVerticalStack
  visGauge: 'chart_gauge', // NOTE: To be deprecated in favor of chartGauge
  visGoal: 'vis_goal',
  visLine: 'chart_line', // NOTE: To be deprecated in favor of chartLine
  visMapCoordinate: 'waypoint', // NOTE: To be deprecated in favor of waypoint
  visMapRegion: 'map', // NOTE: To be deprecated in favor of map
  visMetric: 'vis_metric',
  visPie: 'chart_pie', // NOTE: To be deprecated in favor of chartPie
  visTable: 'table', // NOTE: To be deprecated in favor of table
  visTagCloud: 'chart_tag_cloud', // NOTE: To be deprecated in favor of chartTagCloud
  visText: 'text', // NOTE: To be deprecated in favor of text,
  visTimelion: 'vis_timelion',
  visVega: 'code', // NOTE: To be deprecated in favor of `code`
  visVisualBuilder: 'vis_visual_builder',
  visualizeApp: 'app_visualize',
  vulnerabilityManagementApp: 'app_vulnerability_management',
  warning: 'warning',
  warningFilled: 'warningFill', // NOTE: To be deprecated in favor of warningFill
  warningFill: 'warningFill',
  watchesApp: 'app_watches',
  web: 'web',
  wordWrap: 'wordWrap',
  wordWrapDisabled: 'wordWrapDisabled',
  workflowsApp: 'app_workflows',
  workplaceSearchApp: 'app_workplace_search',
  wrench: 'wrench',
  // Token Icon Imports
  tokenAlias: 'tokenAlias',
  tokenAnnotation: 'tokenAnnotation',
  tokenArray: 'tokenArray',
  tokenBinary: 'tokenBinary',
  tokenBoolean: 'tokenBoolean',
  tokenClass: 'tokenClass',
  tokenCompletionSuggester: 'tokenCompletionSuggester',
  tokenConstant: 'tokenConstant',
  tokenDate: 'tokenDate',
  tokenDimension: 'tokenDimension',
  tokenElement: 'tokenElement',
  tokenEnum: 'tokenEnum',
  tokenEnumMember: 'tokenEnumMember',
  tokenEvent: 'tokenEvent',
  tokenException: 'tokenException',
  tokenField: 'tokenField',
  tokenFile: 'tokenFile',
  tokenFlattened: 'tokenFlattened',
  tokenFunction: 'tokenFunction',
  tokenGeo: 'tokenGeo',
  tokenHistogram: 'tokenHistogram',
  tokenInterface: 'tokenInterface',
  tokenIP: 'tokenIP',
  tokenJoin: 'tokenJoin',
  tokenKey: 'tokenKey',
  tokenKeyword: 'tokenKeyword',
  tokenMethod: 'tokenMethod',
  tokenMetricCounter: 'tokenMetricCounter',
  tokenMetricGauge: 'tokenMetricGauge',
  tokenModule: 'tokenModule',
  tokenNamespace: 'tokenNamespace',
  tokenNested: 'tokenNested',
  tokenNull: 'tokenNull',
  tokenNumber: 'tokenNumber',
  tokenObject: 'tokenObject',
  tokenOperator: 'tokenOperator',
  tokenPackage: 'tokenPackage',
  tokenParameter: 'tokenParameter',
  tokenPercolator: 'tokenPercolator',
  tokenProperty: 'tokenProperty',
  tokenRange: 'tokenRange',
  tokenRankFeature: 'tokenRankFeature',
  tokenRankFeatures: 'tokenRankFeatures',
  tokenRepo: 'tokenRepo',
  tokenSearchType: 'tokenSearchType',
  tokenSemanticText: 'tokenSemanticText',
  tokenShape: 'tokenShape',
  tokenString: 'tokenString',
  tokenStruct: 'tokenStruct',
  tokenSymbol: 'tokenSymbol',
  tokenTag: 'tokenTag',
  tokenText: 'tokenText',
  tokenTokenCount: 'tokenTokenCount',
  tokenVariable: 'tokenVariable',
  tokenVectorDense: 'tokenVectorDense',
  tokenDenseVector: 'tokenVectorDense', // NOTE: This is an undocumented alias for `tokenVectorDense`, added for legacy compatability
  tokenVectorSparse: 'tokenVectorSparse',
};
