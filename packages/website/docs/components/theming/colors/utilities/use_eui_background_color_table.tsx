import React, { useState } from 'react';
import {
  EuiPanel,
  EuiDescribedFormGroup,
  EuiSpacer,
  EuiButtonGroup,
  useEuiTheme,
  euiBackgroundColor,
} from '@elastic/eui';
import { ColorsTable } from '../colors_table';

const colors = [
  'transparent',
  'plain',
  'subdued',
  'accent',
  'primary',
  'success',
  'warning',
  'danger',
] as const;

export const UseEuiBackgroundColorTable = () => {
  const theme = useEuiTheme();
  const [activeBackground, setActiveBackground] = useState<
    'transparent' | 'opaque'
  >('opaque');

  return (
    <>
      <EuiPanel color="accent">
        <EuiDescribedFormGroup
          fullWidth
          title={<h3>Different colors for different contexts</h3>}
          description={
            <p>
              While the hook accepts rendering the value as opaque or
              transparent, we highly suggest reserving transparent for use only
              during interactive states like hover and focus.
            </p>
          }
        >
          <EuiSpacer />
          <EuiButtonGroup
            buttonSize="m"
            legend="Value measurement to show in table"
            options={[
              {
                id: 'opaque',
                label: 'opaque',
              },
              {
                id: 'transparent',
                label: 'transparent',
              },
            ]}
            idSelected={activeBackground}
            onChange={(id) => setActiveBackground(id)}
            color="accent"
            isFullWidth
          />
        </EuiDescribedFormGroup>
      </EuiPanel>
      <ColorsTable
        colors={colors.map((color) => ({
          value: euiBackgroundColor(theme, color, { method: activeBackground }),
          token: `useEuiBackgroundColor('${color}'${
            activeBackground === 'transparent' ? `, 'transparent'` : ''
          })`,
        }))}
      />
    </>
  );
};
