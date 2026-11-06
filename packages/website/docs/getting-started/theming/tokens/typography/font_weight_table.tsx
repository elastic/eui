import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiBasicTable,
  EuiCode,
  EuiPanel,
  EuiText,
  EuiThemeFontWeights,
} from '@elastic/eui';

import { CopyableToken } from '../../copyable_token';

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
    render: (token: string) => <CopyableToken token={token} />,
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

  return (
    <EuiPanel>
      <EuiBasicTable items={items} columns={columns} />
    </EuiPanel>
  );
};
