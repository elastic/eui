const { buildRecordForElasticsearch, propValueProcessor } = require('./scan');

describe('buildRecordForElasticsearch', () => {
  it('can build a record to send to Elasticsearch', () => {
    const before = {
      importInfo: {
        imported: 'EuiButton',
        local: 'EuiButton',
        moduleName: '@elastic/eui',
        importType: 'ImportSpecifier',
      },
      props: {
        color: 'danger',
        disabled: '(Identifier)',
        isLoading: '(BinaryExpression)',
        onClick: '(ArrowFunctionExpression)',
      },
      propsSpread: false,
      location: {
        file: '/Users/jasonstoltzfus/workspace/kibana/x-pack/solutions/search/plugins/enterprise_search/public/applications/enterprise_search_content/components/search_index/crawler/no_connector_record.tsx',
        start: { line: 63, column: 11 },
      },
    };

    const after = {
      '@timestamp': '2025-01-29T21:02:05.384Z',
      scanDate: '2025-01-29T21:02:05.384Z',
      component: 'EuiButton',
      codeOwners: ['@elastic/search-kibana'],
      moduleName: '@elastic/eui',
      props: [
        { propName: 'color', propValue: 'danger' },
        { propName: 'disabled', propValue: '(Identifier)' },
        { propName: 'isLoading', propValue: '(BinaryExpression)' },
        { propName: 'onClick', propValue: '(ArrowFunctionExpression)' },
      ],
      props_combined: [
        'color::danger',
        'disabled::(Identifier)',
        'isLoading::(BinaryExpression)',
        'onClick::(ArrowFunctionExpression)',
      ],
      fileName:
        '/kibana/x-pack/solutions/search/plugins/enterprise_search/public/applications/enterprise_search_content/components/search_index/crawler/no_connector_record.tsx',
      sourceLocation:
        'https://github.com/elastic/kibana/blob/main/x-pack/solutions/search/plugins/enterprise_search/public/applications/enterprise_search_content/components/search_index/crawler/no_connector_record.tsx#L63',
      lineNumber: 63,
      lineColumn: 11,
      repository: 'kibana',
    };

    expect(
      buildRecordForElasticsearch(
        before,
        'https://github.com/elastic/kibana/blob/main/',
        'kibana',
        { getOwner: () => ['@elastic/search-kibana'] },
        '2025-01-29T21:02:05.384Z',
        'EuiButton'
      )
    ).toEqual(after);
  });
});
