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
