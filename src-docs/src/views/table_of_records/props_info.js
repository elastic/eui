export const propsInfo = {

  EuiTableOfRecords: {
    __docgenInfo: {
      props: {
        config: {
          description: 'Configures the features and behaviour of the table',
          required: true,
          type: { name: '#Config' }
        },
        model: {
          description: 'Defines the data model of this table',
          required: true,
          type: { name: '#Model' }
        }
      }
    }
  },

  Model: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        data: {
          description: 'Holds the data for the table',
          required: true,
          type: { name: '#ModelData' }
        },
        criteria: {
          description: 'Defines the criteria to which the data adheres',
          required: false,
          type: { name: '#ModelCriteria' }
        }
      }
    }
  },


  ModelData: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        records: {
          description: 'An array of the records to be displayed',
          required: true,
          type: { name: 'object[]' }
        },
        totalRecordCount: {
          description: 'The total number of records that match the criteria',
          required: false,
          type: { name: 'number' }
        }
      }
    }
  },

  ModelCriteria: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        search: {
          description: 'If the data records match a search criteria, this describes this search',
          required: false,
          type: { name: '#ModelCriteriaSearch' }
        },
        page: {
          description: 'If the data records represents a page into a bigger set, this describes this page',
          required: false,
          type: { name: '#ModelCriteriaPage' }
        },
        sort: {
          description: 'If the data records are sorted, this describes the sort criteria',
          required: false,
          type: { name: '#ModelCriteriaSort' }
        }
      }
    }
  },

  ModelCriteriaSearch: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        query: {
          description: 'The search query',
          required: true,
          type: { name: 'string | Query' }
        }
      }
    }
  },

  ModelCriteriaPage: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        size: {
          description: 'The maximum number of records per page',
          required: true,
          type: { name: 'number' }
        },
        index: {
          description: 'The page (zero-based) index',
          required: false,
          type: { name: 'number' }
        }
      }
    }
  },

  ModelCriteriaSort: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        field: {
          description: 'The field the data is sorted on',
          required: true,
          type: { name: 'string' }
        },
        direction: {
          description: 'The direction of the sort',
          required: false,
          type: { name: '"asc" | "desc"' }
        }
      }
    }
  },

  Config: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        columns: {
          description: 'Defines the table columns',
          required: true,
          type: { name: '(#FieldDataColumn | #ComputedColumn | #ActionsColumn)[]' }
        },
        onDataCriteriaChange: {
          description: 'A callback to handle changes in the data criteria',
          required: false,
          type: { name: '(criteria: #ModelCriteria) => void' }
        },
        search: {
          description: 'Configuring search',
          required: false,
          type: { name: '#ConfigSearch' }
        },
        selection: {
          description: 'Configuring selection',
          required: false,
          type: { name: '#ConfigSelection' }
        },
        pagination: {
          description: 'Configuring pagination',
          required: false,
          type: { name: '#ConfigPagination' }
        }
      }
    }
  },

  ConfigSearch: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        box: {
          description: 'Configuring the search box',
          required: false,
          type: { name: '#ConfigSearchBox' }
        },
        filters: {
          description: 'Configuring the search filters',
          required: false,
          type: { name: '( #FieldValueSelectionFilter | #IsFilter )[]' }
        }
      }
    }
  },

  ConfigSearchBox: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        placeholder: {
          description: 'Defines the placeholder text when no query is specified',
          required: false,
          defaultValue: { value: 'Search...' },
          type: { name: 'string' }
        },
        incremental: {
          description: 'Indicates whether the search should execute as the user types the query. When set to `false`' +
                       'the search will only be executed when the user presses `Enter`',
          required: false,
          defaultValue: { value: 'false' },
          type: { name: 'boolean' }
        }
      }
    }
  },

  FieldValueSelectionFilter: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        type: {
          description: 'Defines the type of the filter (must be set to `field_value_selection`)',
          required: true,
          type: { name: '"field_value_selection"' }
        },
        name: {
          description: 'The name of the filter (will be used as a caption of the filter button)',
          required: true,
          type: { name: 'string' }
        },
        field: {
          description: 'Defines the field to filter by',
          required: true,
          type: { name: 'string' }
        },
        options: {
          description: 'Defines possible field value option. These options will be presented to the user ' +
                       'for selection',
          required: true,
          type: { name: '#FieldValueOption[] | () => #FieldValueOption[]' }
        },
        multiSelect: {
          description: 'Indicates whether the user can filter by multiple values or by only a single one',
          required: false,
          defaultValue: { value: 'true' },
          type: { name: 'boolean' }
        },
        loadingMessage: {
          description: 'The message that will be shown while loading the options',
          required: false,
          defaultValue: { value: 'Loading...' },
          type: { name: 'string' }
        },
        noOptionsMessage: {
          description: 'The message that will be shown when no options are found',
          required: false,
          defaultValue: { value: 'No options found' },
          type: { name: 'string' }
        },
        searchThreshold: {
          description: 'The minimum number of options that are required before a search box is shown to the ' +
                       'user to filter out options',
          required: false,
          defaultValue: { value: '10' },
          type: { name: 'number' }
        },
        available: {
          description: 'Called to check whether this filter is currently available. If not, it will not be shown',
          required: false,
          type: { name: '() => boolean' }
        }
      }
    }
  },

  FieldValueOption: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        value: {
          description: 'The actual value of the option (will be used as a filter)',
          required: true,
          type: { name: 'string' }
        },
        name: {
          description: 'The name of the option (for display purposes and also for searching through all options). ' +
                       'When not provided, the option `value` will be used as the name',
          required: false,
          type: { name: 'string' }
        },
        view: {
          description: 'Enables to fully customize how an option is presented',
          required: false,
          type: { name: 'PropTypes.node' }
        }
      }
    }
  },

  IsFilter: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        type: {
          description: 'Defines the type of the filter (must be set to `is`)',
          required: true,
          type: { name: '"is"' }
        },
        name: {
          description: 'The name of the filter (will be used as a caption of the filter button)',
          required: true,
          type: { name: 'string' }
        },
        field: {
          description: 'Defines the field to filter by - must be of a boolean type',
          required: true,
          type: { name: 'string' }
        },
        available: {
          description: 'Called to check whether this filter is currently available. If not, it will not be shown',
          required: false,
          type: { name: '() => boolean' }
        }
      }
    }
  },

  ConfigSelection: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        onSelectionChanged: {
          description: 'A callback that will be called whenever the record selection changes',
          required: false,
          type: { name: '(selectedRecords) => void' }
        },
        selectable: {
          description: 'A callback that is called per record to indicate whether it is selectable',
          required: false,
          type: { name: '(record, model) => void' }
        }
      }
    }
  },

  ConfigPagination: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        pageSizeOptions: {
          description: 'Configures the page size dropdown options',
          required: false,
          defaultValue: { value: '[5, 10, 20]' },
          type: { name: 'number[]' }
        }
      }
    }
  },

  FieldDataColumn: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description: `Describes a column that displays a value derived of one of the Record's fields`,
      props: {
        field: {
          description: 'A field of the record (may be a nested field)',
          required: true,
          type: { name: 'string' }
        },
        name: {
          description: 'The display name of the column',
          required: true,
          type: { name: 'string' }
        },
        description: {
          description: 'A description of the column (will be presented as a title over the column header',
          required: false,
          type: { name: 'string' }
        },
        dataType: {
          description: 'Describes the data types of the displayed value (serves as a rendering hint for the table)',
          required: false,
          defaultValue: { value: '"auto"' },
          type: { name: '"auto" | string" | "number" | "date" | "boolean"' }
        },
        width: {
          description: 'A CSS width property. Hints for the required width of the column',
          required: false,
          type: { name: 'string (e.g. "30%", "100px", etc..)' }
        },
        sortable: {
          description: 'Defines whether the user can sort on this column',
          required: false,
          defaultValue: { value: 'false' },
          type: { name: 'boolean' }
        },
        align: {
          description: 'Defines the horizontal alignment of the column',
          required: false,
          defaultValue: { value: '"right"', comment: 'May change when "dataType" is defined' },
          type: { name: '"left" | "right"' }
        },
        truncateText: {
          description: `Indicates whether this column should truncate its content when it doesn't fit`,
          required: false,
          defaultValue: { value: 'false' },
          type: { name: 'boolean' }
        },
        render: {
          description: `Describe a custom renderer function for the content`,
          required: false,
          type: { name: '(value, record) => PropTypes.node' }
        }
      }
    }
  },

  ComputedColumn: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description: `Describes a column for computed values`,
      props: {
        render: {
          description: `A function that computes the value for each record and renders it`,
          required: true,
          type: { name: '(record, model) => PropTypes.node' }
        },
        name: {
          description: 'The display name of the column',
          required: false,
          type: { name: 'string' }
        },
        description: {
          description: 'A description of the column (will be presented as a title over the column header',
          required: false,
          type: { name: 'string' }
        },
        width: {
          description: 'A CSS width property. Hints for the required width of the column',
          required: false,
          type: { name: 'string (e.g. "30%", "100px", etc..)' }
        },
        truncateText: {
          description: `Indicates whether this column should truncate its content when it doesn't fit`,
          required: false,
          defaultValue: { value: 'false' },
          type: { name: 'boolean' }
        }
      }
    }
  },

  ActionsColumn: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description: `Describes a column that holds action controls (e.g. Buttons)`,
      props: {
        actions: {
          description: `An array of actions to associate per record`,
          required: true,
          type: { name: '(#DefaultRecordAction | #CustomRecordAction)[]' }
        },
        name: {
          description: 'The display name of the column',
          required: false,
          type: { name: 'string' }
        },
        description: {
          description: 'A description of the column (will be presented as a title over the column header',
          required: false,
          type: { name: 'string' }
        },
        width: {
          description: 'A CSS width property. Hints for the required width of the column',
          required: false,
          type: { name: 'string (e.g. "30%", "100px", etc..)' }
        }
      }
    }
  },

  DefaultRecordAction: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description: `Describes an action that is displayed as a button`,
      props: {
        name: {
          description: 'The display name of the action (will be the button caption',
          required: true,
          type: { name: 'string' }
        },
        description: {
          description: 'Describes the action (will be the button title)',
          required: true,
          type: { name: 'string' }
        },
        onClick: {
          description: 'A handler function to execute the action',
          required: true,
          type: { name: '(record, model) => void' }
        },
        type: {
          description: 'The type of action',
          required: false,
          defaultValue: { value: '"button"' },
          type: { name: '"button" | "icon"' }
        },
        available: {
          description: 'A callback function that determines whether the action is available',
          required: false,
          defaultValue: { value: '() => true' },
          type: { name: '(record, model) => boolean' }
        },
        enabled: {
          description: 'A callback function that determines whether the action is enabled',
          required: false,
          defaultValue: { value: '() => true' },
          type: { name: '(record, model) => boolean' }
        },
        icon: {
          description: 'Associates an icon with the button',
          required: false,
          type: { name: 'string (must be one of the supported icon types)' }
        },
        color: {
          description: 'Defines the color of the button',
          required: false,
          type: { name: 'string (must be one of the supported button colors)' }
        }
      }
    }
  },

  CustomRecordAction: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description: `Describes a custom action`,
      props: {
        render: {
          description: 'The function that renders the action. Note that the returned node is ' +
                       'expected to have`onFocus` and `onBlur` functions',
          required: true,
          type: { name: '(record, model, enabled) => PropTypes.node' }
        },
        available: {
          description: 'A callback that defines whether the action is available',
          required: false,
          type: { name: '(record, model) => boolean' }
        },
        enabled: {
          description: 'A callback that defines whether the action is enabled',
          required: false,
          type: { name: '(record, model) => boolean' }
        }
      }
    }
  },
};
