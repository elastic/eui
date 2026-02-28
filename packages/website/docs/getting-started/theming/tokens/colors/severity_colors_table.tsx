import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const SeverityColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      colors={[
        {
          value: euiTheme.colors.severity.unknown,
          token: 'colors.severity.unknown',
          description: <>Unknown or indeterminate severity state.</>,
        },
        {
          value: euiTheme.colors.severity.success,
          token: 'colors.severity.success',
          description: <>Healthy or successful state (e.g. service is running).</>,
        },
        {
          value: euiTheme.colors.severity.neutral,
          token: 'colors.severity.neutral',
          description: <>Neutral or informational state.</>,
        },
        {
          value: euiTheme.colors.severity.warning,
          token: 'colors.severity.warning',
          description: <>Warning state that requires attention (e.g. degraded performance).</>,
        },
        {
          value: euiTheme.colors.severity.risk,
          token: 'colors.severity.risk',
          description: <>Elevated risk state between warning and danger.</>,
        },
        {
          value: euiTheme.colors.severity.danger,
          token: 'colors.severity.danger',
          description: <>Critical or error state (e.g. service is down).</>,
        },
        {
          value: euiTheme.colors.severity.assistance,
          token: 'colors.severity.assistance',
          description: <>Supplementary or contextual state for additional information.</>,
        },
      ]}
    />
  );
};
