import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const ShadeColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      colors={[
        {
          value: euiTheme.colors.emptyShade,
          token: 'colors.emptyShade',
          description: (
            <>
              @deprecated — Use <code>backgroundBasePlain</code> for panels,
              modals, and content containers.
            </>
          ),
        },
        {
          value: euiTheme.colors.lightestShade,
          token: 'colors.lightestShade',
          description: (
            <>
              @deprecated — Use <code>backgroundBaseSubdued</code> for secondary
              content areas or <code>backgroundBaseDisabled</code> for disabled
              states.
            </>
          ),
        },
        {
          value: euiTheme.colors.lightShade,
          token: 'colors.lightShade',
          description: (
            <>
              @deprecated — Use <code>borderBaseSubdued</code> for borders or{' '}
              <code>borderBasePlain</code> for dividers.
            </>
          ),
        },
        {
          value: euiTheme.colors.mediumShade,
          token: 'colors.mediumShade',
          description: (
            <>
              @deprecated — Use <code>textSubdued</code> for subdued text or the
              appropriate semantic token for your use case.
            </>
          ),
        },
        {
          value: euiTheme.colors.darkShade,
          token: 'colors.darkShade',
          description: (
            <>
              @deprecated — Use <code>textParagraph</code> for body text or the
              appropriate semantic token.
            </>
          ),
        },
        {
          value: euiTheme.colors.darkestShade,
          token: 'colors.darkestShade',
          description: (
            <>
              @deprecated — Use <code>textHeading</code> for text, or{' '}
              <code>backgroundFilledText</code> for inverted backgrounds like
              tooltips.
            </>
          ),
        },
        {
          value: euiTheme.colors.fullShade,
          token: 'colors.fullShade',
          description: (
            <>
              @deprecated — Use <code>textInk</code> for maximum contrast text
              on light backgrounds, or <code>shadow</code> for shadow effects.
            </>
          ),
        },
      ]}
    />
  );
};
