import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const BrandColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      colors={[
        {
          value: euiTheme.colors.primary,
          token: 'colors.primary',
          description: (
            <>
              Main brand color and used for most{' '}
              <strong>call to actions</strong> like buttons and links.
            </>
          ),
        },
        {
          value: euiTheme.colors.accent,
          token: 'colors.accent',
          description: (
            <>
              Pulls attention to key indicators like{' '}
              <strong>notifications</strong> or number of selections.
            </>
          ),
        },
        {
          value: euiTheme.colors.accentSecondary,
          token: 'colors.accentSecondary',
          description: <>Secondary attention indicator with lower priority.</>,
        },
        {
          value: euiTheme.colors.success,
          token: 'colors.success',
          description: (
            <>
              Used for <strong>positive</strong> messages/graphics and additive
              actions.
            </>
          ),
        },
        {
          value: euiTheme.colors.warning,
          token: 'colors.warning',
          description: (
            <>
              Used for <strong>warnings</strong> and actions that have potential
              to be destructive.
            </>
          ),
        },
        {
          value: euiTheme.colors.danger,
          token: 'colors.danger',
          description: (
            <>
              Used for <strong>negative</strong> messages/graphics like errors
              and destructive elements.
            </>
          ),
        },
      ]}
    />
  );
};
