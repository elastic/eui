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
        },
        {
          value: euiTheme.colors.severity.neutral,
          token: 'colors.severity.neutral',
        },
        {
          value: euiTheme.colors.severity.success,
          token: 'colors.severity.success',
        },
        {
          value: euiTheme.colors.severity.warning,
          token: 'colors.severity.warning',
        },
        {
          value: euiTheme.colors.severity.risk,
          token: 'colors.severity.risk',
        },
        {
          value: euiTheme.colors.severity.danger,
          token: 'colors.severity.danger',
        },
      ]}
    />
  );
};
