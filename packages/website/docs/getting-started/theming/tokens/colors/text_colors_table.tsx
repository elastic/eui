import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const TextColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      sampleType="text"
      colors={[
        {
          value: euiTheme.colors.textParagraph,
          token: 'colors.textParagraph',
        },
        {
          value: euiTheme.colors.textHeading,
          token: 'colors.textHeading',
        },
        {
          value: euiTheme.colors.textSubdued,
          token: 'colors.textSubdued',
        },
        {
          value: euiTheme.colors.link,
          token: 'colors.link',
        },
        {
          value: euiTheme.colors.textPrimary,
          token: 'colors.textPrimary',
        },
        {
          value: euiTheme.colors.textAccent,
          token: 'colors.textAccent',
        },
        {
          value: euiTheme.colors.textAccentSecondary,
          token: 'colors.textAccentSecondary',
        },
        {
          value: euiTheme.colors.textNeutral,
          token: 'colors.textNeutral',
        },
        {
          value: euiTheme.colors.textSuccess,
          token: 'colors.textSuccess',
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
