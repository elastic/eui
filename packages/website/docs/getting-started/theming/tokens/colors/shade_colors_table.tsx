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
              Used as the background color of primary{' '}
              <strong>page content and panels</strong> including modals and
              flyouts.
              <br />
              @deprecated - use specific semantic color tokens instead.
            </>
          ),
        },
        {
          value: euiTheme.colors.lightestShade,
          token: 'colors.lightestShade',
          description: (
            <>
              Used to lightly shade areas that contain{' '}
              <strong>secondary content</strong> or contain panel-like
              components.
              <br />
              @deprecated - use specific semantic color tokens instead.
            </>
          ),
        },
        {
          value: euiTheme.colors.lightShade,
          token: 'colors.lightShade',
          description: (
            <>
              Used for most <strong>borders</strong> and dividers (horizontal
              rules).
              <br />
              @deprecated - use specific semantic color tokens instead.
            </>
          ),
        },
        {
          value: euiTheme.colors.mediumShade,
          token: 'colors.mediumShade',
          description: (
            <>
              The middle gray for all themes; this is the base for{' '}
              <code>colors.subdued</code>
              <br />
              @deprecated - use specific semantic color tokens instead.
            </>
          ),
        },
        {
          value: euiTheme.colors.darkShade,
          token: 'colors.darkShade',
          description: <>Slightly subtle graphic color</>,
        },
        {
          value: euiTheme.colors.darkestShade,
          token: 'colors.darkestShade',
          description: (
            <>
              Used as the <strong>text</strong> color and the background color
              for <strong>inverted components</strong> like tooltips and the
              control bar.
              <br />
              @deprecated - use specific semantic color tokens instead.
            </>
          ),
        },
        {
          value: euiTheme.colors.fullShade,
          token: 'colors.fullShade',
          description: (
            <>
              The opposite of <code>emptyShade</code>
              <br />
              @deprecated - use specific semantic color tokens instead.
            </>
          ),
        },
      ]}
    />
  );
};
