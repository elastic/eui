import { omit } from '../../../../../src/services/objects';
import { propsInfo as basicPropsInfo } from '../basic/props_info';

const basicTableProps = omit(basicPropsInfo, [ 'EuiBasicTable', 'Pagination', 'Sorting' ]);

export const propsInfo = {

  EuiBasicTableContainer: {
    __docgenInfo: {
      props: {
        items: {
          description: 'A list of items to display in the table or a function that can load this items ' +
                       'given the table criteria',
          required: true,
          type: { name: `object[] | (criteria: #Criteria) => #LoaderResponse` }
        },
        columns: basicPropsInfo.EuiBasicTable.__docgenInfo.props.columns,
        pagination: {
          description: 'Enables/disables pagination. Can be an object that configured pagination when enabled',
          required: false,
          type: { name: 'boolean | #Pagination' }
        },
        sorting: {
          description: 'Enables/disables sorting',
          required: false,
          type: { name: 'boolean' }
        },
        selection: basicPropsInfo.EuiBasicTable.__docgenInfo.props.selection,
      }
    }
  },

  LoaderResponse: {
    __docgenInfo: {
      _euiObjectType: 'type',
      description: 'object[] | { items: object[], totalCount: number } | ' +
                   'Promise<{ items: object[], totalCount: number }> | Promise<object[]>',
      props: {}
    }
  },

  Pagination: {
    __docgenInfo: {
      _euiObjectType: 'type',
      props: {
        pageSizeOptions: basicPropsInfo.Pagination.__docgenInfo.props.pageSizeOptions
      }
    }
  },

  ...basicTableProps
};
