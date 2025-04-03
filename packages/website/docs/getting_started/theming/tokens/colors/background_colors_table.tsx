import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const BackgroundColorsTable = () => {
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
          value: euiTheme.colors.backgroundBaseAccent,
          token: 'colors.backgroundBaseAccent',
        },
        {
          value: euiTheme.colors.backgroundBaseAccentSecondary,
          token: 'colors.backgroundBaseAccentSecondary',
        },
        {
          value: euiTheme.colors.backgroundBaseSuccess,
          token: 'colors.backgroundBaseSuccess',
        },
        {
          value: euiTheme.colors.backgroundBaseWarning,
          token: 'colors.backgroundBaseWarning',
        },
        {
          value: euiTheme.colors.backgroundBaseDanger,
          token: 'colors.backgroundBaseDanger',
        },
        {
          value: euiTheme.colors.backgroundBaseSubdued,
          token: 'colors.backgroundBaseSubdued',
        },
        {
          value: euiTheme.colors.backgroundBasePlain,
          token: 'colors.backgroundBasePlain',
        },
        {
          value: euiTheme.colors.backgroundBaseDisabled,
          token: 'colors.backgroundBaseDisabled',
        },
        {
          value: euiTheme.colors.backgroundBaseHighlighted,
          token: 'colors.backgroundBaseHighlighted',
        },
        {
          value: euiTheme.colors.backgroundBaseFormsPrepend,
          token: 'colors.backgroundBaseFormsPrepend',
        },
        {
          value: euiTheme.colors.backgroundBaseFormsControlDisabled,
          token: 'colors.backgroundBaseFormsControlDisabled',
        },
        {
          value: euiTheme.colors.backgroundBaseInteractiveHover,
          token: 'colors.backgroundBaseInteractiveHover',
        },
        {
          value: euiTheme.colors.backgroundBaseInteractiveSelect,
          token: 'colors.backgroundBaseInteractiveSelect',
        },
        {
          value: euiTheme.colors.backgroundBaseInteractiveOverlay,
          token: 'colors.backgroundBaseInteractiveOverlay',
        },
        {
          value: euiTheme.colors.backgroundBaseSkeletonEdge,
          token: 'colors.backgroundBaseSkeletonEdge',
        },
        {
          value: euiTheme.colors.backgroundBaseSkeletonMiddle,
          token: 'colors.backgroundBaseSkeletonEdge',
        },
        {
          value: euiTheme.colors.backgroundLightPrimary,
          token: 'colors.backgroundLightPrimary',
        },
        {
          value: euiTheme.colors.backgroundLightAccent,
          token: 'colors.backgroundLightAccent',
        },
        {
          value: euiTheme.colors.backgroundLightAccentSecondary,
          token: 'colors.backgroundLightAccentSecondary',
        },
        {
          value: euiTheme.colors.backgroundLightSuccess,
          token: 'colors.backgroundLightSuccess',
        },
        {
          value: euiTheme.colors.backgroundLightWarning,
          token: 'colors.backgroundLightWarning',
        },
        {
          value: euiTheme.colors.backgroundLightDanger,
          token: 'colors.backgroundLightDanger',
        },
        {
          value: euiTheme.colors.backgroundLightText,
          token: 'colors.backgroundLightText',
        },
        {
          value: euiTheme.colors.backgroundFilledPrimary,
          token: 'colors.backgroundFilledPrimary',
        },
        {
          value: euiTheme.colors.backgroundFilledAccent,
          token: 'colors.backgroundFilledAccent',
        },
        {
          value: euiTheme.colors.backgroundFilledAccentSecondary,
          token: 'colors.backgroundFilledAccentSecondary',
        },
        {
          value: euiTheme.colors.backgroundFilledSuccess,
          token: 'colors.backgroundFilledSuccess',
        },
        {
          value: euiTheme.colors.backgroundFilledWarning,
          token: 'colors.backgroundFilledWarning',
        },
        {
          value: euiTheme.colors.backgroundFilledDanger,
          token: 'colors.backgroundFilledDanger',
        },
        {
          value: euiTheme.colors.backgroundFilledText,
          token: 'colors.backgroundFilledText',
        },
      ]}
    />
  );
};
