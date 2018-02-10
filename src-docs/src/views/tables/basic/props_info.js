export const propsInfo = {

  EuiBasicTable: {
    __docgenInfo: {
      props: {
        items: {
          description: 'A list of objects to who in the table - an item per row',
          required: true,
          type: { name: 'object[]' }
        },
        columns: {
          description: 'Defines the table columns',
          required: true,
          type: { name: '(#FieldDataColumn | #ComputedColumn | #ActionsColumn)[]' }
        },
        pagination: {
          description: 'Configures pagination',
          required: false,
          type: { name: '#Pagination' }
        },
        sorting: {
          description: 'Configures sorting',
          required: false,
          type: { name: '#Sorting' }
        },
        selection: {
          description: 'Configures selection',
          required: false,
          type: { name: '#Selection' }
        },
        onChange: {
          description: 'Called whenever pagination or sorting changes (this property is required when either' +
                       'pagination or sorting is configured',
          required: false,
          type: { name: '(criteria: #Criteria) => void' }
        }
      }
    }
  },

  Pagination: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        pageIndex: {
          description: 'The current page (zero-based) index',
          required: true,
          type: { name: 'number' }
        },
        pageSize: {
          description: 'The maximum number if items that can be shown in a single page',
          required: true,
          type: { name: 'number' }
        },
        totalItemCount: {
          description: 'The total number of items the page is "sliced" of',
          required: true,
          type: { name: 'number' }
        },
        pageSizeOptions: {
          description: 'Configures the page size dropdown options',
          required: false,
          defaultValue: { value: '[5, 10, 20]' },
          type: { name: 'number[]' }
        }
      }
    }
  },

  Sorting: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        sort: {
          description: 'Indicates the property/field to sort on',
          required: false,
          type: { name: '{ field: string, direction: "asc" | "desc" }' }
        }
      }
    }
  },

  Selection: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        itemId: {
          description: 'describes how to extract a unique ID from each item',
          required: true,
          type: { name: 'string | (item) => string' }
        },
        onSelectionChanged: {
          description: 'A callback that will be called whenever the item selection changes',
          required: false,
          type: { name: '(selectedItems) => void' }
        },
        selectable: {
          description: 'A callback that is called per item to indicate whether it is selectable',
          required: false,
          type: { name: '(item) => boolean' }
        },
        selectableMessage: {
          description: 'A callback that is called per item to retrieve a message for its selectable state.' +
                       'We display these messages as a tooltip on an unselectable checkbox',
          required: false,
          type: { name: '(selectable, item) => string' }
        }
      }
    }
  },

  Criteria: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        page: {
          description: 'If the shown items represents a page (slice) into a bigger set, this describes this page',
          required: false,
          type: { name: '{ index: number, size: number }' }
        },
        sort: {
          description: 'If the shown items are sorted, this describes the sort criteria',
          required: false,
          type: { name: '{ field: string, direction: "asc" | "desc" }' }
        }
      }
    }
  },

  FieldDataColumn: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description: `Describes a column that displays a value derived of one of the item's fields`,
      props: {
        field: {
          description: 'A field of the item (may be a nested field)',
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
          type: { name: '(value, item) => PropTypes.node' }
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
          description: `A function that computes the value for each item and renders it`,
          required: true,
          type: { name: '(item) => PropTypes.node' }
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
          description: `An array of actions to associate per item`,
          required: true,
          type: { name: '(#DefaultItemAction | #CustomItemAction)[]' }
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

  DefaultItemAction: {
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
          type: { name: '(item) => void' }
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
          type: { name: '(item) => boolean' }
        },
        enabled: {
          description: 'A callback function that determines whether the action is enabled',
          required: false,
          defaultValue: { value: '() => true' },
          type: { name: '(item) => boolean' }
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

  CustomItemAction: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description: `Describes a custom action`,
      props: {
        render: {
          description: 'The function that renders the action. Note that the returned node is ' +
                       'expected to have`onFocus` and `onBlur` functions',
          required: true,
          type: { name: '(item, enabled) => PropTypes.node' }
        },
        available: {
          description: 'A callback that defines whether the action is available',
          required: false,
          type: { name: '(item) => boolean' }
        },
        enabled: {
          description: 'A callback that defines whether the action is enabled',
          required: false,
          type: { name: '(item) => boolean' }
        }
      }
    }
  },
};
