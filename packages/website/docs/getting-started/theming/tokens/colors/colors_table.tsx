import { ReactNode } from 'react';
import {
  EuiBasicTable,
  EuiCode,
  EuiColorPickerSwatch,
  EuiFlexGroup,
  EuiText,
} from '@elastic/eui';
import { css } from '@emotion/react';

interface Color {
  value: string;
  token: string;
  description?: ReactNode;
}

export interface ColorsTableProps {
  colors: Color[];
  sampleType?: 'swatch' | 'text';
}

export const ColorsTable = ({
  colors,
  sampleType = 'swatch',
}: ColorsTableProps) => (
  <EuiBasicTable
    items={colors.map((color) => ({
      id: color.value,
      ...color,
    }))}
    columns={[
      {
        field: 'value',
        name: 'Sample',
        align: 'center',
        width: '60px',
        render: (value: string) => {
          if (sampleType === 'swatch') {
            return <EuiColorPickerSwatch color={value} />;
          }
          return (
            <EuiText color={value}>
              <strong>Aa</strong>
            </EuiText>
          );
        },
        mobileOptions: {
          render: (item: Color) => (
            <EuiFlexGroup gutterSize="s" alignItems="center">
              {sampleType === 'swatch' ? (
                <EuiColorPickerSwatch color={item.value} />
              ) : (
                <EuiText color={item.value}>
                  <strong>Aa</strong>
                </EuiText>
              )}
              <EuiCode>{item.token}</EuiCode>
            </EuiFlexGroup>
          ),
          header: false,
          width: '100%',
          enlarge: true,
        },
      },
      {
        field: 'token',
        name: 'Token',
        render: (token: string, item: Color) => (
          <EuiFlexGroup
            direction="column"
            gutterSize="xs"
            alignItems="flexStart"
          >
            <EuiCode>{token}</EuiCode>
            <EuiText size="s">{item.description}</EuiText>
          </EuiFlexGroup>
        ),
        mobileOptions: {
          render: (item: Color) => <EuiText>{item.description}</EuiText>,
          header: false,
          width: '100%',
        },
      },
      {
        field: 'value',
        name: 'Value',
        align: 'right',
        width: '100px',
      },
    ]}
  />
);
