import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const TextColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      sampleType="text"
      colors={[
        {
          value: euiTheme.colors.text,
          token: 'colors.text',
        },
        {
          value: euiTheme.colors.title,
          token: 'colors.title',
        },
        {
          value: euiTheme.colors.subduedText,
          token: 'colors.subduedText',
        },
        {
          value: euiTheme.colors.link,
          token: 'colors.link',
        },
        {
          value: euiTheme.colors.primaryText,
          token: 'colors.primaryText',
        },
        {
          value: euiTheme.colors.accentText,
          token: 'colors.accentText',
        },
        {
          value: euiTheme.colors.successText,
          token: 'colors.successText',
        },
        {
          value: euiTheme.colors.warningText,
          token: 'colors.warningText',
        },
        {
          value: euiTheme.colors.dangerText,
          token: 'colors.dangerText',
        },
      ]}
    />
  )
};
