import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const BorderColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      sampleType="swatch"
      colors={[
        {
          value: euiTheme.colors.backgroundBasePrimary,
          token: 'colors.backgroundBasePrimary',
        },
        {
          value: euiTheme.colors.borderBasePrimary,
          token: 'colors.borderBasePrimary',
        },
        {
          value: euiTheme.colors.borderBaseAccent,
          token: 'colors.borderBaseAccent',
        },
        {
          value: euiTheme.colors.borderBaseAccentSecondary,
          token: 'colors.borderBaseAccentSecondary',
        },
        {
          value: euiTheme.colors.borderBaseNeutral,
          token: 'colors.borderBaseNeutral',
        },
        {
          value: euiTheme.colors.borderBaseSuccess,
          token: 'colors.borderBaseSuccess',
        },
        {
          value: euiTheme.colors.borderBaseWarning,
          token: 'colors.borderBaseWarning',
        },
        {
          value: euiTheme.colors.borderBaseRisk,
          token: 'colors.borderBaseRisk',
        },
        {
          value: euiTheme.colors.borderBaseDanger,
          token: 'colors.borderBaseDanger',
        },
        {
          value: euiTheme.colors.borderBasePlain,
          token: 'colors.borderBasePlain',
        },
        {
          value: euiTheme.colors.borderBaseSubdued,
          token: 'colors.borderBaseSubdued',
        },
        {
          value: euiTheme.colors.borderBaseDisabled,
          token: 'colors.borderBaseDisabled',
        },
        {
          value: euiTheme.colors.borderBaseFloating,
          token: 'colors.borderBaseFloating',
        },
        {
          value: euiTheme.colors.borderBaseFormsColorSwatch,
          token: 'colors.borderBaseFormsColorSwatch',
        },
        {
          value: euiTheme.colors.borderBaseFormsControl,
          token: 'colors.borderBaseFormsControl',
        },
        {
          value: euiTheme.colors.borderStrongPrimary,
          token: 'colors.borderStrongPrimary',
        },
        {
          value: euiTheme.colors.borderStrongAccent,
          token: 'colors.borderStrongAccent',
        },
        {
          value: euiTheme.colors.borderStrongAccentSecondary,
          token: 'colors.borderStrongAccentSecondary',
        },
        {
          value: euiTheme.colors.borderStrongNeutral,
          token: 'colors.borderStrongNeutral',
        },
        {
          value: euiTheme.colors.borderStrongSuccess,
          token: 'colors.borderStrongSuccess',
        },
        {
          value: euiTheme.colors.borderStrongWarning,
          token: 'colors.borderStrongWarning',
        },
        {
          value: euiTheme.colors.borderStrongRisk,
          token: 'colors.borderStrongRisk',
        },
        {
          value: euiTheme.colors.borderStrongDanger,
          token: 'colors.borderStrongDanger',
        },
      ]}
    />
  );
};
