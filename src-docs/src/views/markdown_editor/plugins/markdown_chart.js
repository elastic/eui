import React from 'react';
import {
  Chart,
  Settings,
  Axis,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';
import { EUI_CHARTS_THEME_LIGHT } from '../../../../../src/themes/charts/themes';
import {
  euiPaletteColorBlind,
  euiPaletteComplimentary,
  euiPaletteCool,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteGray,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteWarm,
} from '../../../../../src/services/color';

const paletteData = {
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplimentary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
};
const paletteNames = Object.keys(paletteData);

const dg = new DataGenerator();
const data = dg.generateGroupedSeries(20, 5);

const chartDemoPlugin = {
  name: 'chartDemoPlugin',
  button: {
    label: 'Chart',
    iconType: 'visArea',
  },
  formatting: {
    prefix: '!{chart',
    suffix: '}',
    trimFirst: true,
  },
};

function ChartParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  function tokenizeChart(eat, value, silent) {
    if (value.startsWith('!{chart') === false) return false;

    const nextChar = value[7];

    if (nextChar !== ' ' && nextChar !== '}') return false; // this isn't actually a chart

    if (silent) {
      return true;
    }

    // is there a configuration?
    const hasConfiguration = nextChar === ' ';

    let match = '!{chart';
    let configuration = {};

    if (hasConfiguration) {
      match += ' ';
      let configurationString = '';

      let openObjects = 0;

      for (let i = 8; i < value.length; i++) {
        const char = value[i];
        if (char === '{') {
          openObjects++;
          configurationString += char;
        } else if (char === '}') {
          openObjects--;
          if (openObjects === -1) {
            break;
          }
          configurationString += char;
        } else {
          configurationString += char;
        }
      }

      match += configurationString;
      try {
        configuration = JSON.parse(configurationString);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    match += '}';
    return eat(match)({
      type: 'chartDemoPlugin',
      configuration,
    });
  }
  tokenizeChart.notInBlock = true;
  tokenizeChart.notInList = true;
  tokenizeChart.notInLink = true;

  tokenizeChart.locator = function locateChart(value, fromIndex) {
    return value.indexOf('!{chart', fromIndex - 1);
  };

  tokenizers.chart = tokenizeChart;
  methods.push('chart');
}

const chartMarkdownHandler = (h, node) => {
  return h(node.position, 'chartDemoPlugin', node.configuration, []);
};
const chartMarkdownRenderer = ({ height = 200, palette = 5 }) => {
  const customColors = {
    colors: {
      vizColors: paletteData[paletteNames[palette]](5),
    },
  };
  return (
    <Chart size={{ height }}>
      <Settings
        theme={[customColors, EUI_CHARTS_THEME_LIGHT]}
        showLegend={false}
        showLegendDisplayValue={false}
      />
      <BarSeries
        id="status"
        name="Status"
        data={data}
        xAccessor={'x'}
        yAccessors={['y']}
        splitSeriesAccessors={['g']}
        stackAccessors={['g']}
      />
      <Axis id="bottom-axis" position="bottom" showGridLines />
      <Axis id="left-axis" position="left" showGridLines />
    </Chart>
  );
};

export {
  chartDemoPlugin as plugin,
  ChartParser as parser,
  chartMarkdownHandler as handler,
  chartMarkdownRenderer as renderer,
};
