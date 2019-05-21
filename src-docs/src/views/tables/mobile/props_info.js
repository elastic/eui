export const propsInfo = {
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
      },
    },
  },
};
