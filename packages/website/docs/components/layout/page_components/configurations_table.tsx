import { css } from '@emotion/react';

import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiCode,
  EuiIcon,
} from '@elastic/eui';

type ConfigurationsTableItem = {
  euiPageSidebar: boolean;
  euiPageHeader: 'none' | boolean;
  euiPageBody: string;
  euiPageSection: string;
  euiEmptyPrompt: string;
};

export const ConfigurationsTable = () => {
  const columns: EuiBasicTableColumn<ConfigurationsTableItem>[] = [
    {
      field: 'euiPageSidebar',
      name: 'EuiPageSidebar',
      render: (value: boolean) => (
        <EuiIcon
          type={value ? 'checkInCircleFilled' : 'error'}
          color={value ? 'green' : 'danger'}
          title={value ? 'true' : 'false'}
        />
      ),
    },
    {
      field: 'euiPageHeader',
      name: 'EuiPageHeader',
      render: (value: 'none' | boolean) => (
        <EuiIcon
          type={
            value === true
              ? 'checkInCircleFilled'
              : value === 'none'
              ? 'minusInCircle'
              : 'error'
          }
          color={
            value === true ? 'green' : value === 'none' ? 'subdued' : 'danger'
          }
          title={value === true ? 'true' : value === 'none' ? 'none' : 'false'}
        />
      ),
    },
    {
      field: 'euiPageBody',
      name: 'EuiPageBody',
      render: (value: string) => (
        <EuiCode
          css={css`
            white-space: nowrap;
          `}
        >
          {value}
        </EuiCode>
      ),
    },
    {
      field: 'euiPageSection',
      name: 'EuiPageSection',
      render: (value: string) => <EuiCode>{value}</EuiCode>,
    },
    {
      field: 'euiEmptyPrompt',
      name: 'EuiEmptyPrompt settings',
      render: (value: string) => <EuiCode>{value}</EuiCode>,
    },
  ];

  const items: ConfigurationsTableItem[] = [
    {
      euiPageSidebar: true,
      euiPageHeader: 'none',
      euiPageBody: `color="plain"`,
      euiPageSection: `color="plain" bottomBorder`,
      euiEmptyPrompt: `color="subdued"`,
    },
    {
      euiPageSidebar: false,
      euiPageHeader: true,
      euiPageBody: `color="transparent"`,
      euiPageSection: `color="plain" bottomBorder="extended"`,
      euiEmptyPrompt: `color="subdued"`,
    },
    {
      euiPageSidebar: false,
      euiPageHeader: false,
      euiPageBody: `color="transparent"`,
      euiPageSection: `color="plain" bottomBorder="extended"`,
      euiEmptyPrompt: `color="plain"`,
    },
  ];

  return <EuiBasicTable items={items} columns={columns} tableLayout="auto" />;
};
