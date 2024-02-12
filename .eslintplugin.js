exports.rules = {
  i18n: require('./scripts/eslint-plugin/i18n'),
  'href-with-rel': require('./scripts/eslint-plugin/rel'),
  'require-license-header': require('./scripts/eslint-plugin/require_license_header'),
  'forward-ref': require('./scripts/eslint-plugin/forward_ref_display_name'),
  'css-logical-properties': require('./scripts/eslint-plugin/css_logical_properties'),
  'require-cypress-references': require('./scripts/eslint-plugin/require_cypress_references'),
};
