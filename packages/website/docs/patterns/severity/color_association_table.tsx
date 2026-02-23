import React from 'react';
import {
  EuiBasicTable,
  EuiColorPickerSwatch,
  EuiFlexGroup,
  EuiText,
  useEuiTheme,
} from '@elastic/eui';

interface Tint {
  color: string;
  name: string;
}

interface Level {
  id: number;
  name: string;
  tint: Tint;
}

export const SeverityColorAssociationTable = () => {
  const { euiTheme } = useEuiTheme();

  const levels: Level[] = [
    {
      id: 0,
      name: 'Unknown',
      tint: {
        color: euiTheme.colors.backgroundFilledText,
        name: 'Blue grey',
      },
    },
    {
      id: 1,
      name: 'Good / Success',
      tint: {
        color: euiTheme.colors.backgroundFilledSuccess,
        name: 'Green',
      },
    },
    {
      id: 2,
      name: 'Regular / Neutral',
      tint: {
        color: euiTheme.colors.backgroundFilledNeutral,
        name: 'Sky blue',
      },
    },
    {
      id: 3,
      name: 'Warning',
      tint: {
        color: euiTheme.colors.backgroundFilledWarning,
        name: 'Yellow',
      },
    },
    {
      id: 4,
      name: 'Risk',
      tint: {
        color: euiTheme.colors.backgroundFilledRisk,
        name: 'Orange',
      },
    },
    {
      id: 5,
      name: 'Danger',
      tint: {
        color: euiTheme.colors.backgroundFilledDanger,
        name: 'Red',
      },
    },
    {
      id: 6,
      name: 'Assistance',
      tint: {
        color: euiTheme.colors.backgroundFilledAssistance,
        name: 'Purple',
      },
    },
  ];

  return (
    <EuiBasicTable<Level>
      items={levels}
      columns={[
        {
          field: 'id',
          name: 'Level',
          width: '10%',
        },
        {
          field: 'name',
          name: 'Level name',
        },
        {
          field: 'tint',
          name: 'Tint',
          render: ({ color, name }: Tint) => {
            return (
              <EuiFlexGroup>
                <EuiColorPickerSwatch showToolTip={false} color={color} />
                <EuiText size="s">{name}</EuiText>
              </EuiFlexGroup>
            );
          },
          width: '20%',
        },
      ]}
    />
  );
};
