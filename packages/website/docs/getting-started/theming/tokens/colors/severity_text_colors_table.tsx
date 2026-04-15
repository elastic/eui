import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const SeverityTextColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      sampleType="text"
      colors={[
        {
          value: euiTheme.colors.textSubdued,
          token: 'colors.textSubdued',
        },
        {
          value: euiTheme.colors.textSuccess,
          token: 'colors.textSuccess',
        },
        {
          value: euiTheme.colors.textNeutral,
          token: 'colors.textNeutral',
        },
        {
          value: euiTheme.colors.textWarning,
          token: 'colors.textWarning',
        },
        {
          value: euiTheme.colors.textRisk,
          token: 'colors.textRisk',
        },
        {
          value: euiTheme.colors.textDanger,
          token: 'colors.textDanger',
        },
      ]}
    />
  );
};
