import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiBasicTable,
  EuiCode,
  EuiText,
  EuiThemeFontWeights,
} from '@elastic/eui';

const columns = [
  {
    field: 'value',
    name: 'Sample',
    align: 'center',
    width: '60px',
    render: (value: string) => (
      <span
        css={css`
          font-weight: ${value};
        `}
      >
        Aa
      </span>
    ),
  },
  {
    field: 'token',
    name: 'Token',
    render: (token: string) => <EuiCode>{token}</EuiCode>,
  },
  {
    field: 'value',
    name: 'Value',
    render: (value: string) => <EuiCode>{value}</EuiCode>,
  },
];

export const FontWeightTable = () => {
  const { euiTheme } = useEuiTheme();
  const items = EuiThemeFontWeights.map((weight) => {
    return {
      id: weight,
      token: `font.weight.${weight}`,
      value: euiTheme.font.weight[weight],
    };
  });

  return <EuiBasicTable items={items} columns={columns} />;
};
