import { ReactNode } from 'react';
import {
  EuiSpacer,
  useEuiTheme,
  EuiBasicTable,
  EuiBasicTableProps,
  EuiCode,
  EuiBasicTableColumn,
  EuiTableRowCellProps,
} from '@elastic/eui';

interface BasicItem {
  id: string;
  token: string;
  type?: any;
  value?: any;
  styleFn?: (...args: any[]) => any;
  /**
   * Requires a Markdown style string
   */
  description?: string;
}

type ThemeValuesTableProps = {
  items: EuiBasicTableProps<BasicItem>['items'];
  render: (item: BasicItem) => ReactNode;
  /**
   * Will apply to all columns. To apply individually use the `__ColumnProps` prop
   */
  valign?: EuiTableRowCellProps['valign'];
  sampleColumnProps?: Partial<EuiBasicTableColumn<BasicItem>>;
  tokenColumnProps?: Partial<EuiBasicTableColumn<BasicItem>>;
  typeColumnProps?: Partial<EuiBasicTableColumn<BasicItem>>;
  valueColumnProps?: Partial<EuiBasicTableColumn<BasicItem>>;
};

export const ThemeValuesTable = ({
  items,
  render,
  valign = 'top',
  sampleColumnProps,
  tokenColumnProps,
  valueColumnProps,
}: ThemeValuesTableProps) => {
  const columns: EuiBasicTableProps<BasicItem>['columns'] = [
    {
      field: 'sample',
      name: 'Sample',
      align: 'center',
      width: '60px',
      valign,
      render: (sample: undefined, item) => render(item),
      mobileOptions: {
        render: (item) => (
          <>
            {render(item)}&nbsp;
            <EuiCode language="tsx">{item.token}</EuiCode>
          </>
        ),
        header: false, // Won't show inline header in mobile view
        width: '100%', // Applies a specific width
        enlarge: true, // Increase text size compared to rest of cells
      },
      ...sampleColumnProps,
    },
    {
      field: 'token',
      name: 'Token',
      width: '50%',
      valign,
      render: (token: ReactNode, item) => (
        <div>
          <EuiCode language="tsx">{token}</EuiCode>
        </div>
      ),
      mobileOptions: {
        // Evaluates just the first item as to whether they all have descriptions, may not be the best approach but works for now
        header: false, // Won't show inline header in mobile view
        width: '100%', // Applies a specific width
      },
      ...tokenColumnProps,
    },
  ];

  if (items[0].value != null) {
    columns.push({
      field: 'value',
      name: 'Value',
      align: 'right',
      valign,
      render: (value: ReactNode) => (
        <small>
          <code>{value}</code>
        </small>
      ),
      ...valueColumnProps,
    });
  }

  return <EuiBasicTable width="100%" items={items} columns={columns} />;
};
