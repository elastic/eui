export const propsInfo = {
  EuiSearchBar: {
    __docgenInfo: {
      props: {
        onChange: {
          description:
            'Called every time the text query in the search box is parsed. When parsing is successful ' +
            'the callback will receive both the query text and the parsed query. When it fails ' +
            'the callback ill receive the query text and an error object (holding the error message)',
          required: true,
          type: {
            name:
              '({ query?: #Query, queryText: string, error?: { message: string } }) => void',
          },
        },
        query: {
          description:
            'Sets the query on the search bar. Should only be used when the query is controlled and ' +
            'managed outside of the search bar itself',
          required: false,
          type: { name: 'string | #Query' },
        },
        defaultQuery: {
          description:
            'The default query to initially set on the search bar when it mounts',
          required: false,
          type: { name: 'string | #Query' },
        },
        box: {
          description: 'Configures the search box',
          required: false,
          type: { name: '#SearchBox' },
        },
        filters: {
          description: 'The configured search filters ',
          required: false,
          type: { name: '#SearchFilters[]' },
        },
      },
    },
  },

  Query: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        parse: {
          description: 'Parses the given string and returns the parsed query',
          type: { name: 'static (query: string) => #Query' },
        },
        execute: {
          description:
            'Executes the given query over an array if objects and returns the an array of objects that match it',
          type: {
            name:
              'static (query: #Query | string, items: Object[], options?: #ExecuteQueryOptions) => Object[]',
          },
        },
        toESQuery: {
          description:
            'Builds and returns an Elasticsearch query object out of the given query',
          type: {
            name:
              'static (query: #Query | string, options?: #ToESQueryOptions) => ESQuery',
          },
        },
      },
    },
  },

  SearchBox: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        placeholder: {
          description: 'Sets the placeholder of the search input',
          required: false,
          defaultValue: { value: 'Search...' },
          type: { name: 'string' },
        },
        incremental: {
          description:
            'When set to `true` the search will be executed as you type',
          required: false,
          defaultValue: { value: 'false' },
          type: { name: 'boolean' },
        },
        schema: {
          description: 'A schema describing the supported fields and flags',
          required: false,
          type: { name: '#Schema' },
        },
      },
    },
  },

  Schema: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        strict: {
          description:
            'Indicates whether the query parsing should be strictly compliant with the schema',
          required: false,
          defaultValue: { value: 'false' },
          type: { name: 'boolean' },
        },
        flags: {
          description: 'A list of supported flags',
          required: false,
          type: { name: 'string[]' },
        },
        fields: {
          description: 'A dictionary of supported fields',
          required: false,
          type: { name: '{ [fieldName]: #SchemaField }' },
        },
      },
    },
  },

  SchemaField: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        type: {
          description: 'The data type of the field',
          required: true,
          type: { name: 'boolean | string | date | number' },
        },
        valueDescription: {
          description: 'A description of the values accepted by this field',
          required: false,
          defaultValue: { value: 'the data type' },
          type: { name: 'string' },
        },
        validate: {
          description:
            'A function to validate a possible value for the field. An error should be thrown when ' +
            'validation fails (with appropriate error message of course)',
          required: false,
          type: { name: '(value) => void' },
        },
      },
    },
  },

  SearchFilters: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description:
        '#IsFilter | #FieldValueSelectionFilter | #FieldValueToggleFilter | #FieldValueToggleGroupFilter',
      props: {},
    },
  },

  IsFilter: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        type: {
          description: 'Defines the type of this filter. Must be set to `is`',
          required: true,
          type: { name: '"is"' },
        },
        field: {
          description: 'The boolean field that should be matched',
          required: true,
          type: { name: 'string' },
        },
        name: {
          description:
            'The name that will be used as a caption of the filter button',
          required: true,
          type: { name: 'string' },
        },
        negatedName: {
          description:
            'The name that will be used as a caption of the filter button when the filter is negated',
          required: false,
          defaultValue: {
            value: '"Not {name}"',
            comment: 'where `{name}` is the configured name',
          },
          type: { name: 'string' },
        },
        available: {
          description:
            'A callback that defines whether this filter is currently available',
          required: false,
          type: { name: '() => boolean' },
        },
      },
    },
  },

  FieldValueSelectionFilter: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        type: {
          description:
            'Defines the type of this filter. Must be set to `field_value_selection`',
          required: true,
          type: { name: '"field_value_selection"' },
        },
        field: {
          description: 'The boolean field that should be matched',
          required: true,
          type: { name: 'string' },
        },
        name: {
          description:
            'The name that will be used as a caption of the filter button',
          required: true,
          type: { name: 'string' },
        },
        options: {
          description:
            'Defines possible field value option. These options will be presented to the user ' +
            'for selection',
          required: true,
          type: { name: '#FieldValueOption[] | () => #FieldValueOption[]' },
        },
        cache: {
          description:
            'When set to a positive number, if `options` is a loading function, the loaded ' +
            'options will be cached for the set timeout (in milliseconds)',
          required: false,
          type: { name: 'number (milliseconds)' },
        },
        multiSelect: {
          description:
            'Indicates whether the user can filter by multiple values or by only a single one. ' +
            'When set to "and" the filter will create queries by `and`ing the selected values. ' +
            'When set to "or" the filter will create quries by `or`ing the selected values',
          required: false,
          defaultValue: { value: 'true ("and")' },
          type: { name: 'boolean | "or" | "and"' },
        },
        loadingMessage: {
          description:
            'The message that will be shown while loading the options',
          required: false,
          defaultValue: { value: 'Loading...' },
          type: { name: 'string' },
        },
        noOptionsMessage: {
          description:
            'The message that will be shown when no options are found',
          required: false,
          defaultValue: { value: 'No options found' },
          type: { name: 'string' },
        },
        searchThreshold: {
          description:
            'The minimum number of options that are required before a search box is shown to the ' +
            'user to filter out options',
          required: false,
          defaultValue: { value: '10' },
          type: { name: 'number' },
        },
        available: {
          description:
            'A callback that defines whether this filter is currently available',
          required: false,
          type: { name: '() => boolean' },
        },
      },
    },
  },

  FieldValueOption: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        value: {
          description:
            'The actual value of the option (will be used as a filter)',
          required: true,
          type: { name: 'string' },
        },
        name: {
          description:
            'The name of the option (for display purposes and also for searching through all options). ' +
            'When not provided, the option `value` will be used as the name',
          required: false,
          type: { name: 'string' },
        },
        view: {
          description: 'Enables to fully customize how an option is presented',
          required: false,
          type: { name: 'PropTypes.node' },
        },
      },
    },
  },

  FieldValueToggleFilter: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        type: {
          description:
            'Defines the type of the filter. Must be set to `field_value_toggle`',
          required: true,
          type: { name: '"field_value_toggle"' },
        },
        field: {
          description: 'The name of the field to filter by',
          required: true,
          type: { name: 'string' },
        },
        value: {
          description: 'The field value to filter by',
          required: true,
          type: { name: 'string' },
        },
        name: {
          description:
            'The name of the filter (will be used as a caption of the filter button)',
          required: true,
          type: { name: 'string' },
        },
        negatedName: {
          description:
            'The name that will be used when the filter is active yet negated (e.g. `-tag:bug`)',
          required: false,
          defaultValue: {
            value: 'Not {name}',
            comment: 'where `{name}` is the configured name',
          },
          type: { name: 'string' },
        },
        available: {
          description:
            'Called to check whether this filter is currently available. If not, it will not be shown',
          required: false,
          type: { name: '() => boolean' },
        },
      },
    },
  },

  FieldValueToggleGroupFilter: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        type: {
          description:
            'Defines the type of the filter. Must be set to `field_value_toggle_group`',
          required: true,
          type: { name: '"field_value_toggle_group"' },
        },
        field: {
          description: 'The name of the field to filter by',
          required: true,
          type: { name: 'string' },
        },
        items: {
          description:
            'A list of field value filters that are part of this group',
          required: true,
          type: { name: '#FieldValueToggleGroupFilterItemType[]' },
        },
        available: {
          description:
            'Called to check whether this filter is currently available. If not, it will not be shown',
          required: false,
          type: { name: '() => boolean' },
        },
      },
    },
  },

  FieldValueToggleGroupFilterItemType: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        value: {
          description: 'Value of the filter item',
          required: true,
          type: { name: 'string | number | boolean' },
        },
        name: {
          description: 'Name rendered on the filter button',
          required: true,
          type: { name: 'string' },
        },
        negatedName: {
          description:
            'Name rendered on the filter button when its value is negated in the query',
          required: false,
          type: { name: 'string' },
        },
      },
    },
  },

  ExecuteQueryOptions: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        defaultFields: {
          description: 'A set of fields to execute the term clauses against',
          required: false,
          defaultValue: { value: 'all direct string fields of the object' },
          type: { name: 'string[]' },
        },
        explain: {
          description:
            'When `true` each item in the returned array will have a `__explain` field explaining ' +
            'the reason for the match',
          required: false,
          defaultValue: { value: 'false' },
          type: { name: 'boolean' },
        },
      },
    },
  },

  ToESQueryOptions: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        extraMustQueries: {
          description:
            'An array of additional queries to add as a `must` clause to the generated query',
          required: false,
          type: { name: 'ESQuery[]' },
        },
        extraMustNotQueries: {
          description:
            'An array of additional queries to add as a `must_not` clause to the generated query',
          required: false,
          type: { name: 'ESQuery[]' },
        },
      },
    },
  },
};
