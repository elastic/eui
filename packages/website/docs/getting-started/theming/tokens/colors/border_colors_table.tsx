import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const BorderColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      sampleType="swatch"
      colors={[
        {
          value: euiTheme.colors.borderBasePrimary,
          token: 'colors.borderBasePrimary',
          description: <>Subtle primary border for selected or active containers.</>,
        },
        {
          value: euiTheme.colors.borderBaseAccent,
          token: 'colors.borderBaseAccent',
          description: <>Subtle accent border for attention-drawing elements.</>,
        },
        {
          value: euiTheme.colors.borderBaseAccentSecondary,
          token: 'colors.borderBaseAccentSecondary',
          description: <>Subtle secondary accent border.</>,
        },
        {
          value: euiTheme.colors.borderBaseNeutral,
          token: 'colors.borderBaseNeutral',
          description: <>Subtle neutral border for informational elements.</>,
        },
        {
          value: euiTheme.colors.borderBaseSuccess,
          token: 'colors.borderBaseSuccess',
          description: <>Subtle success border for positive indicators.</>,
        },
        {
          value: euiTheme.colors.borderBaseWarning,
          token: 'colors.borderBaseWarning',
          description: <>Subtle warning border for caution indicators.</>,
        },
        {
          value: euiTheme.colors.borderBaseRisk,
          token: 'colors.borderBaseRisk',
          description: <>Subtle risk border for elevated concern.</>,
        },
        {
          value: euiTheme.colors.borderBaseDanger,
          token: 'colors.borderBaseDanger',
          description: <>Subtle danger border for error states.</>,
        },
        {
          value: euiTheme.colors.borderBaseAssistance,
          token: 'colors.borderBaseAssistance',
          description: <>Subtle assistance border for supplementary context.</>,
        },
        {
          value: euiTheme.colors.borderBasePlain,
          token: 'colors.borderBasePlain',
          description: (
            <>
              Standard visible border for forms and containers needing clear
              delineation.
            </>
          ),
        },
        {
          value: euiTheme.colors.borderBaseSubdued,
          token: 'colors.borderBaseSubdued',
          description: (
            <>
              Default border color. Used as <code>border.color</code> for most
              UI elements.
            </>
          ),
        },
        {
          value: euiTheme.colors.borderBaseProminent,
          token: 'colors.borderBaseProminent',
          description: <>Stronger border for elements needing extra emphasis.</>,
        },
        {
          value: euiTheme.colors.borderBaseDisabled,
          token: 'colors.borderBaseDisabled',
          description: <>Border for disabled elements and controls.</>,
        },
        {
          value: euiTheme.colors.borderBaseFloating,
          token: 'colors.borderBaseFloating',
          description: <>Border for floating elements like popovers and tooltips.</>,
        },
        {
          value: euiTheme.colors.borderBaseFormsColorSwatch,
          token: 'colors.borderBaseFormsColorSwatch',
          description: <>Border for color swatch form elements.</>,
        },
        {
          value: euiTheme.colors.borderInteractiveFormsHoverPlain,
          token: 'colors.borderInteractiveFormsHoverPlain',
          description: <>Hover border for standard form controls.</>,
        },
        {
          value: euiTheme.colors.borderInteractiveFormsHoverProminent,
          token: 'colors.borderInteractiveFormsHoverProminent',
          description: <>Hover border for prominent form controls.</>,
        },
        {
          value: euiTheme.colors.borderInteractiveFormsHoverDanger,
          token: 'colors.borderInteractiveFormsHoverDanger',
          description: <>Hover border for form controls in error state.</>,
        },
        {
          value: euiTheme.colors.borderStrongPrimary,
          token: 'colors.borderStrongPrimary',
          description: <>Bold primary border for maximum emphasis.</>,
        },
        {
          value: euiTheme.colors.borderStrongAccent,
          token: 'colors.borderStrongAccent',
          description: <>Bold accent border for maximum emphasis.</>,
        },
        {
          value: euiTheme.colors.borderStrongAccentSecondary,
          token: 'colors.borderStrongAccentSecondary',
          description: <>Bold secondary accent border.</>,
        },
        {
          value: euiTheme.colors.borderStrongNeutral,
          token: 'colors.borderStrongNeutral',
          description: <>Bold neutral border for strong informational emphasis.</>,
        },
        {
          value: euiTheme.colors.borderStrongSuccess,
          token: 'colors.borderStrongSuccess',
          description: <>Bold success border for strong positive emphasis.</>,
        },
        {
          value: euiTheme.colors.borderStrongWarning,
          token: 'colors.borderStrongWarning',
          description: <>Bold warning border for strong caution emphasis.</>,
        },
        {
          value: euiTheme.colors.borderStrongRisk,
          token: 'colors.borderStrongRisk',
          description: <>Bold risk border for strong concern emphasis.</>,
        },
        {
          value: euiTheme.colors.borderStrongDanger,
          token: 'colors.borderStrongDanger',
          description: <>Bold danger border for strong error emphasis.</>,
        },
        {
          value: euiTheme.colors.borderStrongAssistance,
          token: 'colors.borderStrongAssistance',
          description: <>Bold assistance border for strong supplementary emphasis.</>,
        },
      ]}
    />
  );
};
