import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const SpecialColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      colors={[
        {
          value: euiTheme.colors.body,
          token: 'colors.body',
          description: (
            <>
              The background color for the <strong>whole window (body)</strong>{' '}
              and is a computed value of <strong>colors.lightestShade</strong>.
              Provides denominator (background) value for{' '}
              <strong>contrast calculations</strong>
              <br />
              @deprecated - use <code>backgroundBasePlain</code> or{' '}
              <code>backgroundBaseSubdued</code>
              instead
            </>
          ),
        },
        {
          value: euiTheme.colors.highlight,
          token: 'colors.highlight',
          description: (
            <>
              Used to <strong>highlight text</strong> when matching against
              search strings.
            </>
          ),
        },
        {
          value: euiTheme.colors.disabled,
          token: 'colors.disabled',
          description: (
            <>
              Computed against <code>colors.darkestShade</code>.
              <br />
              @deprecated - use specific semantic tokens instead (e.g.
              <code>backgroundBaseDisabled</code>,{' '}
              <code>borderBaseDisabled</code> etc)
            </>
          ),
        },
        {
          value: euiTheme.colors.disabledText,
          token: 'colors.disabledText',
          description: (
            <>
              Computed against <code>colors.disabled</code>
              <br />
              @deprecated - use <code>textDisabled</code> instead
            </>
          ),
        },
        {
          value: euiTheme.colors.shadow,
          token: 'colors.shadow',
          description: (
            <>
              The base color for shadows that gets <code>transparentized</code>{' '}
              at a base value on the <code>colorMode</code> and then layered.
            </>
          ),
        },
        {
          value: euiTheme.colors.ghost,
          token: 'colors.ghost',
          description: (
            <>
              @deprecated - use <code>plainLight</code> instead
            </>
          ),
        },
        {
          value: euiTheme.colors.ink,
          token: 'colors.ink',
          description: (
            <>
              @deprecated - use <code>plainDark</code> instead
            </>
          ),
        },
      ]}
    />
  );
};
