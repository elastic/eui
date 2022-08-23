import React, { ReactNode, useState } from 'react';
import {
  EuiSpacer,
  useEuiTheme,
  EuiBasicTable,
  EuiBasicTableProps,
  EuiCode,
  EuiBasicTableColumn,
  EuiTableRowCellProps,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
} from '../../../../../src';
import { getType } from '../_props';

import { getDescriptionSmall } from '../../../services/props/get_description';

interface BasicItem {
  id: string;
  token?: string;
  function?: string;
  hook?: string;
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
  typeColumnProps,
  valueColumnProps,
}: ThemeValuesTableProps) => {
  const { euiTheme } = useEuiTheme();
  const [isFunction, setIsFunction] = useState(true);

  const toggleFunction = () => {
    setIsFunction(!isFunction);
  };

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
  ];

  if (items[0].token != null) {
    columns.push({
      field: 'token',
      name: 'Token',

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
    });
  }

  if (isFunction && items[0].function != null) {
    columns.push({
      field: 'function',
      name: 'Function',

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
    });
  }

  if (!isFunction && items[0].hook != null) {
    columns.push({
      field: 'hook',
      name: 'Hook',

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
    });
  }

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

  const hasFunctionAndHook = items[0].function != null && items[0].hook != null;

  return (
    <>
      {hasFunctionAndHook && (
        <>
          <EuiFlexGroup alignItems="center" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label={
                  <>
                    Show <strong>function</strong> instead of{' '}
                    <strong>hook</strong>
                  </>
                }
                checked={isFunction}
                onChange={toggleFunction}
                compressed
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="s" />
        </>
      )}

      <EuiBasicTable items={items} columns={columns} />
    </>
  );
};
