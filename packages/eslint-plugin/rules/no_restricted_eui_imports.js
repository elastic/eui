const DEFAULT_RESTRICTED_IMPORT_PATTERNS = [
  {
    pattern: '@elastic/eui/dist/eui_theme_*.json',
    message:
      'For client-side, please use `useEuiTheme` instead. Direct JSON token imports will be removed as per the EUI Deprecation schedule: https://github.com/elastic/eui/issues/1469.',
  },
];

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow deprecated EUI imports.',
      category: 'Possible Errors',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          patterns: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                pattern: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['pattern'],
              additionalProperties: false,
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const userPatterns = options.patterns || [];

    // Combine the default patterns with the user-defined patterns
    const allPatterns = [
      ...DEFAULT_RESTRICTED_IMPORT_PATTERNS,
      ...userPatterns,
    ];

    return {
      ImportDeclaration(node) {
        allPatterns.forEach(({ pattern, message }) => {
          const regex = new RegExp(pattern.replace('*', '.*'));
          if (regex.test(node.source.value)) {
            context.report({
              node,
              message:
                message || `Importing "${node.source.value}" is restricted.`,
            });
          }
        });
      },
    };
  },
};
