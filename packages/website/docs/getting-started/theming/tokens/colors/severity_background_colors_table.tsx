import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const SeverityBackgroundColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      sampleType="swatch"
      colors={[
        {
          value: euiTheme.colors.backgroundBaseSubdued,
          token: 'colors.backgroundBaseSubdued',
        },
        {
          value: euiTheme.colors.backgroundBaseSuccess,
          token: 'colors.backgroundBaseSuccess',
        },
        {
          value: euiTheme.colors.backgroundBaseNeutral,
          token: 'colors.backgroundBaseNeutral',
        },
        {
          value: euiTheme.colors.backgroundBaseWarning,
          token: 'colors.backgroundBaseWarning',
        },
        {
          value: euiTheme.colors.backgroundBaseRisk,
          token: 'colors.backgroundBaseRisk',
        },
        {
          value: euiTheme.colors.backgroundBaseDanger,
          token: 'colors.backgroundBaseDanger',
        },
        {
          value: euiTheme.colors.backgroundLightText,
          token: 'colors.backgroundLightText',
        },
        {
          value: euiTheme.colors.backgroundLightSuccess,
          token: 'colors.backgroundLightSuccess',
        },
        {
          value: euiTheme.colors.backgroundLightNeutral,
          token: 'colors.backgroundLightNeutral',
        },
        {
          value: euiTheme.colors.backgroundLightWarning,
          token: 'colors.backgroundLightWarning',
        },
        {
          value: euiTheme.colors.backgroundLightRisk,
          token: 'colors.backgroundLightRisk',
        },
        {
          value: euiTheme.colors.backgroundLightDanger,
          token: 'colors.backgroundLightDanger',
        },
        {
          value: euiTheme.colors.backgroundFilledText,
          token: 'colors.backgroundFilledText',
        },
        {
          value: euiTheme.colors.backgroundFilledSuccess,
          token: 'colors.backgroundFilledSuccess',
        },
        {
          value: euiTheme.colors.backgroundFilledNeutral,
          token: 'colors.backgroundFilledNeutral',
        },
        {
          value: euiTheme.colors.backgroundFilledWarning,
          token: 'colors.backgroundFilledWarning',
        },
        {
          value: euiTheme.colors.backgroundFilledRisk,
          token: 'colors.backgroundFilledRisk',
        },
        {
          value: euiTheme.colors.backgroundFilledDanger,
          token: 'colors.backgroundFilledDanger',
        },
      ]}
    />
  );
};
