import { omit } from '../../../../../src/services/objects';
import { propsInfo as basicPropsInfo } from '../basic/props_info';
import { propsInfo as searchBarPropsInfo } from '../../search_bar/props_info';

const basicTableProps = omit(basicPropsInfo, ['EuiBasicTable', 'Pagination']);
const searchBarProps = omit(searchBarPropsInfo, ['EuiSearchBar']);

export const propsInfo = {
  EuiBasicTableContainer: {
    __docgenInfo: {
      props: {
        items: {
          description:
            'A list of objects representing the full data set that can be displayed by the table',
          required: false,
          type: { name: 'object[]' },
        },
        message: {
          description: `A message to be shown by the table. When set, the message will be displayed
          instead of the configured items`,
          required: false,
          type: { name: 'string' },
        },
        error: {
          description: `An error message to be shown by the table. Takes precedence over the
          configured \`message\` or \`items\``,
          required: false,
          type: { name: 'string' },
        },
        loading: {
          description:
            'When set to `true` the table will be displayed in a "loading" mode',
          required: false,
          type: { name: 'boolean' },
        },
        columns: basicPropsInfo.EuiBasicTable.__docgenInfo.props.columns,
        pagination: {
          description:
            'Enables/disables pagination. Can be an object that configured pagination when enabled',
          required: false,
          type: { name: 'boolean | #Pagination' },
        },
        sorting: {
          description:
            'Enables/disables sorting. Can be an object that configures initial sorting when enabled',
          required: false,
          type: { name: 'boolean | #Sorting' },
        },
        allowNeutralSort: {
          description:
            'Enables/disables unsorting of table columns. Defaults to true.',
          required: false,
          type: { name: 'boolean' },
        },
        search: {
          description: 'Configures a search bar for the table',
          required: false,
          type: { name: 'boolean | #Search' },
        },
        selection: basicPropsInfo.EuiBasicTable.__docgenInfo.props.selection,
        onTableChange: {
          description: `Callback for when table pagination or sorting is changed. This is meant to
          be informational only, and not used to set any state as the in-memory table already
          manages this state.`,
          required: false,
          type: { name: 'function' },
        },
      },
    },
  },

  Pagination: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        initialPageIndex: {
          description: 'Configures the default page to show',
          defaultValue: { value: 0 },
          required: false,
          type: { name: 'number' },
        },
        initialPageSize: {
          description:
            'Configures the default page size to show, must be one of "pageSizeOptions"',
          required: false,
          type: { name: 'number' },
        },
        pageSizeOptions:
          basicPropsInfo.Pagination.__docgenInfo.props.pageSizeOptions,
      },
    },
  },

  Search: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        defaultQuery: {
          description: 'Sets the default query of the search bar',
          required: false,
          type: { name: '#Query' },
        },
        box: {
          description: 'Configures the search box of the search bar ',
          required: false,
          type: { name: '#SearchBox' },
        },
        filters: {
          description: 'Configures the search filters of the search bar ',
          required: false,
          type: { name: '#SearchFilters' },
        },
        onChange: {
          description: `Callback for when the search bar value changes. By default this will prevent in-memory
          searching. Return \`true\` to allow in-memory searching.`,
          required: false,
          type: { name: 'function' },
        },
        executeQueryOptions: {
          description: `Options that are passed directly into the Query.execute call which is
          performed whenever the search bar query changed.`,
          required: false,
          type: { name: '#Query' },
        },
      },
    },
  },

  ...basicTableProps,
  ...searchBarProps,
};
