import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import {
  EuiSpacer,
  useEuiTheme,
  EuiBasicTable,
  EuiBasicTableProps,
  EuiCode,
  EuiBasicTableColumn,
  EuiTableRowCellProps,
} from '../../../../../src';
import { getType } from '../_props';

import { getDescriptionSmall } from './_theme_values_descriptions';

interface BasicItem {
  id: string;
  token: string;
  type?: any;
  value?: any;
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
  typeColumnProps,
  valueColumnProps,
}: ThemeValuesTableProps) => {
  const { euiTheme } = useEuiTheme();

  const renderDescription = (item: BasicItem) => {
    const description = getDescriptionSmall(item.type || item);

    if (description) {
      return (
        <>
          <EuiSpacer size="s" />
          {description}
        </>
      );
    }
  };

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
          {renderDescription(item)}
        </div>
      ),
      mobileOptions: {
        // Evaluates just the first item as to whether they all have descriptions, may not be the best approach but works for now
        show: Boolean(renderDescription(items[0])),
        render: (item) => renderDescription(item),
        header: false, // Won't show inline header in mobile view
        width: '100%', // Applies a specific width
      },
      ...tokenColumnProps,
    },
  ];

  if (items[0].type) {
    columns.push({
      field: 'type',
      name: 'Type',
      valign,
      render: (type: ReactNode) => (
        <small>
          <code>{getType(type, euiTheme)}</code>
        </small>
      ),
      ...typeColumnProps,
    });
  }

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

  return (
    <EuiBasicTable
      css={css`
        margin-bottom: ${euiTheme.size.xxxl};
      `}
      items={items}
      columns={columns}
    />
  );
};
