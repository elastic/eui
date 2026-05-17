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
          description: <>Subtle primary-tinted background for selected or active containers.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseAccent,
          token: 'colors.backgroundBaseAccent',
          description: <>Subtle accent background for attention-drawing elements.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseAccentSecondary,
          token: 'colors.backgroundBaseAccentSecondary',
          description: <>Subtle secondary accent background.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseNeutral,
          token: 'colors.backgroundBaseNeutral',
          description: <>Subtle neutral background for informational content.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseSuccess,
          token: 'colors.backgroundBaseSuccess',
          description: <>Subtle success background for positive status indicators.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseWarning,
          token: 'colors.backgroundBaseWarning',
          description: <>Subtle warning background for caution indicators.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseRisk,
          token: 'colors.backgroundBaseRisk',
          description: <>Subtle risk background for elevated concern indicators.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseDanger,
          token: 'colors.backgroundBaseDanger',
          description: <>Subtle danger background for error states.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseAssistance,
          token: 'colors.backgroundBaseAssistance',
          description: <>Subtle assistance background for supplementary context.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseSubdued,
          token: 'colors.backgroundBaseSubdued',
          description: <>Default page-level background. Slightly tinted compared to plain.</>,
        },
        {
          value: euiTheme.colors.backgroundBasePlain,
          token: 'colors.backgroundBasePlain',
          description: (
            <>
              Pure background for panels, modals, flyouts, and content containers.
            </>
          ),
        },
        {
          value: euiTheme.colors.backgroundBaseDisabled,
          token: 'colors.backgroundBaseDisabled',
          description: <>Background for disabled elements and controls.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseHighlighted,
          token: 'colors.backgroundBaseHighlighted',
          description: <>Background for highlighted or focused content areas.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseFormsPrepend,
          token: 'colors.backgroundBaseFormsPrepend',
          description: <>Background for form input prepend/append areas.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseFormsControlDisabled,
          token: 'colors.backgroundBaseFormsControlDisabled',
          description: <>Background for disabled form controls.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseInteractiveHover,
          token: 'colors.backgroundBaseInteractiveHover',
          description: <>Hover state background for interactive elements like list items.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseInteractiveHoverAssistance,
          token: 'colors.backgroundBaseInteractiveHoverAssistance',
          description: <>Hover state background for assistance-themed interactive elements.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseInteractiveSelect,
          token: 'colors.backgroundBaseInteractiveSelect',
          description: <>Background for selected interactive elements.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseInteractiveOverlay,
          token: 'colors.backgroundBaseInteractiveOverlay',
          description: <>Semi-transparent overlay background for modals and dialogs.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseSkeletonEdge,
          token: 'colors.backgroundBaseSkeletonEdge',
          description: <>Edge color for skeleton loading animations.</>,
        },
        {
          value: euiTheme.colors.backgroundBaseSkeletonMiddle,
          token: 'colors.backgroundBaseSkeletonMiddle',
          description: <>Middle color for skeleton loading animations.</>,
        },
        {
          value: euiTheme.colors.backgroundLightPrimary,
          token: 'colors.backgroundLightPrimary',
          description: <>Light primary background for callouts and highlighted sections.</>,
        },
        {
          value: euiTheme.colors.backgroundLightAccent,
          token: 'colors.backgroundLightAccent',
          description: <>Light accent background for attention-drawing sections.</>,
        },
        {
          value: euiTheme.colors.backgroundLightAccentSecondary,
          token: 'colors.backgroundLightAccentSecondary',
          description: <>Light secondary accent background.</>,
        },
        {
          value: euiTheme.colors.backgroundLightNeutral,
          token: 'colors.backgroundLightNeutral',
          description: <>Light neutral background for informational sections.</>,
        },
        {
          value: euiTheme.colors.backgroundLightSuccess,
          token: 'colors.backgroundLightSuccess',
          description: <>Light success background for positive callouts.</>,
        },
        {
          value: euiTheme.colors.backgroundLightWarning,
          token: 'colors.backgroundLightWarning',
          description: <>Light warning background for caution callouts.</>,
        },
        {
          value: euiTheme.colors.backgroundLightRisk,
          token: 'colors.backgroundLightRisk',
          description: <>Light risk background for elevated concern callouts.</>,
        },
        {
          value: euiTheme.colors.backgroundLightDanger,
          token: 'colors.backgroundLightDanger',
          description: <>Light danger background for error callouts.</>,
        },
        {
          value: euiTheme.colors.backgroundLightAssistance,
          token: 'colors.backgroundLightAssistance',
          description: <>Light assistance background for supplementary callouts.</>,
        },
        {
          value: euiTheme.colors.backgroundLightText,
          token: 'colors.backgroundLightText',
          description: <>Light neutral text-toned background.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledPrimary,
          token: 'colors.backgroundFilledPrimary',
          description: <>Bold primary background for buttons and strong emphasis.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledAccent,
          token: 'colors.backgroundFilledAccent',
          description: <>Bold accent background for notifications and badges.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledAccentSecondary,
          token: 'colors.backgroundFilledAccentSecondary',
          description: <>Bold secondary accent background.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledNeutral,
          token: 'colors.backgroundFilledNeutral',
          description: <>Bold neutral background for tags and neutral badges.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledSuccess,
          token: 'colors.backgroundFilledSuccess',
          description: <>Bold success background for positive badges and indicators.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledWarning,
          token: 'colors.backgroundFilledWarning',
          description: <>Bold warning background for caution badges and indicators.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledRisk,
          token: 'colors.backgroundFilledRisk',
          description: <>Bold risk background for elevated concern badges.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledDanger,
          token: 'colors.backgroundFilledDanger',
          description: <>Bold danger background for error badges and destructive buttons.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledAssistance,
          token: 'colors.backgroundFilledAssistance',
          description: <>Bold assistance background for supplementary badges.</>,
        },
        {
          value: euiTheme.colors.backgroundFilledText,
          token: 'colors.backgroundFilledText',
          description: <>Bold text-toned background for inverted content areas like tooltips.</>,
        },
      ]}
    />
  );
};
