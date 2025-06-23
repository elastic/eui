import { EuiCode, EuiSpacer, EuiText, useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const DataVisBackgroundColor = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiCode>
      {euiTheme.themeName === 'EUI_THEME_AMSTERDAM'
        ? 'colors.emptyShade'
        : 'colors.backgroundBasePlain'}
    </EuiCode>
  );
};

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

export const DataVisColorsBehindTextColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  if (euiTheme.themeName === 'EUI_THEME_AMSTERDAM')
    return (
      <>
        <EuiSpacer />
        <EuiText>
          <p>
            When using the palette as a background for text (i.e. badges), use
            the <EuiCode>BehindText</EuiCode> variant. It is a brightened
            version of the base palette to create better contrast with text.
          </p>
        </EuiText>
        <EuiSpacer />
        <ColorsTable
          colors={[
            {
              value: euiTheme.colors.vis.euiColorVisBehindText0,
              token: 'colors.vis.euiColorVisBehindText0',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText1,
              token: 'colors.vis.euiColorVisBehindText1',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText2,
              token: 'colors.vis.euiColorVisBehindText2',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText3,
              token: 'colors.vis.euiColorVisBehindText3',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText4,
              token: 'colors.vis.euiColorVisBehindText4',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText5,
              token: 'colors.vis.euiColorVisBehindText5',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText6,
              token: 'colors.vis.euiColorVisBehindText6',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText7,
              token: 'colors.vis.euiColorVisBehindText7',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText8,
              token: 'colors.vis.euiColorVisBehindText8',
            },
            {
              value: euiTheme.colors.vis.euiColorVisBehindText9,
              token: 'colors.vis.euiColorVisBehindText9',
            },
          ]}
        />
      </>
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
