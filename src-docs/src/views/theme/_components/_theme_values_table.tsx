import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import {
  EuiSpacer,
  useEuiTheme,
  EuiBasicTable,
  EuiBasicTableProps,
  EuiCode,
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
  sampleColumnTitle?: string;
  sampleColumnWidth?: string;
  valueColumnTitle?: string;
  valueColumnWidth?: string;
};

export const ThemeValuesTable = ({
  items,
  render,
  sampleColumnTitle = 'Sample',
  sampleColumnWidth = '60px',
  valueColumnTitle = 'Value',
  valueColumnWidth,
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
      name: sampleColumnTitle,
      align: 'center',
      valign: 'top',
      width: sampleColumnWidth,
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
    },
    {
      field: 'token',
      name: 'Token',
      valign: 'top',
      render: (token: ReactNode, item) => (
        <div>
          <EuiCode language="tsx">{token}</EuiCode>
          {renderDescription(item)}
        </div>
      ),
      width: '50%',
      mobileOptions: {
        // Evaluates just the first item as to whether they all have descriptions, may not be the best approach but works for now
        show: Boolean(renderDescription(items[0])),
        render: (item) => renderDescription(item),
        header: false, // Won't show inline header in mobile view
        width: '100%', // Applies a specific width
      },
    },
  ];

  if (items[0].type) {
    columns.push({
      field: 'type',
      name: 'Type',
      valign: 'top',
      render: (type: ReactNode) => (
        <small>
          <code>{getType(type, euiTheme)}</code>
        </small>
      ),
    });
  }

  if (items[0].value != null) {
    columns.push({
      field: 'value',
      name: valueColumnTitle,
      align: 'right',
      valign: 'top',
      width: valueColumnWidth,
      render: (value: ReactNode) => (
        <small>
          <code>{value}</code>
        </small>
      ),
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
