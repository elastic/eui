import { EuiCode, useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const DataVisColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      colors={[
        {
          value: euiTheme.colors.vis.euiColorVis0,
          token: 'colors.vis.euiColorVis0',
        },
        {
          value: euiTheme.colors.vis.euiColorVis1,
          token: 'colors.vis.euiColorVis1',
        },
        {
          value: euiTheme.colors.vis.euiColorVis2,
          token: 'colors.vis.euiColorVis2',
        },
        {
          value: euiTheme.colors.vis.euiColorVis3,
          token: 'colors.vis.euiColorVis3',
        },
        {
          value: euiTheme.colors.vis.euiColorVis4,
          token: 'colors.vis.euiColorVis4',
        },
        {
          value: euiTheme.colors.vis.euiColorVis5,
          token: 'colors.vis.euiColorVis5',
        },
        {
          value: euiTheme.colors.vis.euiColorVis6,
          token: 'colors.vis.euiColorVis6',
        },
        {
          value: euiTheme.colors.vis.euiColorVis7,
          token: 'colors.vis.euiColorVis7',
        },
        {
          value: euiTheme.colors.vis.euiColorVis8,
          token: 'colors.vis.euiColorVis8',
        },
        {
          value: euiTheme.colors.vis.euiColorVis9,
          token: 'colors.vis.euiColorVis9',
        },
      ]}
    />
  );
};

export const DataVisTextColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      colors={[
        {
          value: euiTheme.colors.vis.euiColorVisText0,
          token: 'colors.vis.euiColorVisText0',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText1,
          token: 'colors.vis.euiColorVisText1',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText2,
          token: 'colors.vis.euiColorVisText2',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText3,
          token: 'colors.vis.euiColorVisText3',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText4,
          token: 'colors.vis.euiColorVisText4',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText5,
          token: 'colors.vis.euiColorVisText5',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText6,
          token: 'colors.vis.euiColorVisText6',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText7,
          token: 'colors.vis.euiColorVisText7',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText8,
          token: 'colors.vis.euiColorVisText8',
        },
        {
          value: euiTheme.colors.vis.euiColorVisText9,
          token: 'colors.vis.euiColorVisText9',
        },
      ]}
    />
  );
};
