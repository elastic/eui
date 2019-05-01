export const cellPropsInfo = {
  EuiTableRowCell: {
    __docgenInfo: {
      props: {
        sharedProps: {
          description:
            'These props can be passed at the top level or within #mobileOptions',
          type: { name: '#sharedProps' },
        },
        colSpan: {
          description: 'Number of columns to span',
          required: false,
          type: { name: 'number' },
        },
        hasActions: {
          description:
            'Indicates if the column is dedicated to icon-only actions (currently affects mobile only)',
          required: false,
          type: { name: 'bool' },
        },
        isExpander: {
          description:
            'Indicates if the column is dedicated as the expandable row toggle',
          required: false,
          type: { name: 'bool' },
        },
        mobileOptions: {
          description:
            'Object of mobile specific options for displaying differently at small screens',
          required: false,
          type: { name: '#mobileOptions' },
        },
        header: {
          description: 'DEPRECATED: use `mobileOptions.header`',
          required: false,
          type: { name: 'bool' },
        },
        isMobileHeader: {
          description:
            'DEPRECATED: use `mobileOptions.only = true & mobileOptions.header = false`',
          required: false,
          type: { name: 'bool' },
        },
        hideForMobile: {
          description: 'DEPRECATED: use `mobileOptions.show = false`',
          required: false,
          type: { name: 'bool' },
        },
        isMobileFullWidth: {
          description: 'DEPRECATED: use `mobileOptions.fullWidth`',
          required: false,
          type: { name: 'bool' },
        },
      },
    },
  },

  sharedProps: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        align: {
          description: 'Horizontal alignment of the text in the cell',
          required: false,
          type: { name: 'left | right | center' },
          defaultValue: { value: 'left' },
        },
        truncateText: {
          description: "Don't allow line breaks within cells",
          required: false,
          type: { name: 'bool' },
        },
        textOnly: {
          description:
            'Setting `textOnly` to `false` will break words unnecessarily on FF and IE. ' +
            'To combat this problem on FF, wrap contents with the css utility `.eui-textBreakWord`.',
          required: false,
          type: { name: 'bool' },
        },
        showOnHover: {
          description: '_Should only be used for action cells_',
          required: false,
          type: { name: 'bool' },
        },
      },
    },
  },

  mobileOptions: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        show: {
          description: 'If false, will not render the cell at all for mobile',
          required: false,
          type: { name: 'bool' },
          defaultValue: { value: 'true' },
        },
        only: {
          description:
            'Only show for mobile? If true, will not render the column at all for desktop',
          required: false,
          type: { name: 'bool' },
        },
        render: {
          description: 'Custom render/children if different from desktop',
          required: false,
          type: { name: 'node' },
        },
        header: {
          description:
            "The column's header for use in mobile view (automatically passed down when using `EuiBasicTable`). " +
            'Or pass `false` to not show a header at all.',
          required: false,
          type: { name: 'node | bool' },
        },
        enlarge: {
          description: 'Increase text size compared to rest of cells',
          required: false,
          type: { name: 'bool' },
        },
        fullWidth: {
          description:
            'Allocates 100% of the width of the container in mobile view (typically cells are contained to 50%)',
          required: false,
          type: { name: 'bool' },
        },
        sharedProps: {
          description:
            'These props will only work if a mobile specific `render` function is also passed',
          type: { name: '#sharedProps' },
        },
      },
    },
  },
};
