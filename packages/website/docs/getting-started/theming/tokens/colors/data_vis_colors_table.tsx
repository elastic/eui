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
          description: <>Color-blind safe categorical color 1 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis1,
          token: 'colors.vis.euiColorVis1',
          description: <>Color-blind safe categorical color 2 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis2,
          token: 'colors.vis.euiColorVis2',
          description: <>Color-blind safe categorical color 3 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis3,
          token: 'colors.vis.euiColorVis3',
          description: <>Color-blind safe categorical color 4 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis4,
          token: 'colors.vis.euiColorVis4',
          description: <>Color-blind safe categorical color 5 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis5,
          token: 'colors.vis.euiColorVis5',
          description: <>Color-blind safe categorical color 6 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis6,
          token: 'colors.vis.euiColorVis6',
          description: <>Color-blind safe categorical color 7 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis7,
          token: 'colors.vis.euiColorVis7',
          description: <>Color-blind safe categorical color 8 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis8,
          token: 'colors.vis.euiColorVis8',
          description: <>Color-blind safe categorical color 9 for data series.</>,
        },
        {
          value: euiTheme.colors.vis.euiColorVis9,
          token: 'colors.vis.euiColorVis9',
          description: <>Color-blind safe categorical color 10 for data series.</>,
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
          description: (
            <>
              Text variant of <EuiCode>euiColorVis0</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText1,
          token: 'colors.vis.euiColorVisText1',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis1</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText2,
          token: 'colors.vis.euiColorVisText2',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis2</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText3,
          token: 'colors.vis.euiColorVisText3',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis3</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText4,
          token: 'colors.vis.euiColorVisText4',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis4</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText5,
          token: 'colors.vis.euiColorVisText5',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis5</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText6,
          token: 'colors.vis.euiColorVisText6',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis6</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText7,
          token: 'colors.vis.euiColorVisText7',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis7</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText8,
          token: 'colors.vis.euiColorVisText8',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis8</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
        {
          value: euiTheme.colors.vis.euiColorVisText9,
          token: 'colors.vis.euiColorVisText9',
          description: (
            <>
              Text variant of <EuiCode>euiColorVis9</EuiCode>. Higher contrast
              in light mode.
            </>
          ),
        },
      ]}
    />
  );
};
