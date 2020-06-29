import React, { useState } from 'react';
import {
  Chart,
  Settings,
  Axis,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';
import { EUI_CHARTS_THEME_LIGHT } from '../../../../../src/themes/charts/themes';
import {
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButton,
  EuiButtonEmpty,
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiRange,
  EuiCode,
  EuiText,
  EuiSpacer,
} from '../../../../../src/components';
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
  helpText: (
    <div>
      <EuiCode>{'!{chart{options}'}</EuiCode>
      <EuiSpacer size="s" />
      <EuiText size="s" style={{ marginLeft: 16 }}>
        <ul>
          <li>
            <strong>palette:</strong>A number between 1-9 for each palette.
          </li>
          <li>
            <strong>height:</strong>
            The height of the chart
          </li>
        </ul>
      </EuiText>
    </div>
  ),
  editor: function ChartEditor({ node, onSave, onCancel }) {
    const [palette, setPalette] = useState((node && node.palette) || 4);
    const [height, setHeight] = useState((node && node.height) || 300);

    return (
      <>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Chart data</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <>
            <EuiForm>
              <EuiFormRow label="Palette">
                <EuiSelect
                  options={[
                    { value: 4, text: 'red' },
                    { value: 5, text: 'green' },
                  ]}
                  value={palette}
                  onChange={e => setPalette(parseInt(e.target.value, 10))}
                />
              </EuiFormRow>

              <EuiFormRow label="Height">
                <EuiRange
                  value={height}
                  min={100}
                  max={500}
                  step={10}
                  showValue
                  valueAppend="px"
                  onChange={e => setHeight(parseInt(e.target.value, 10))}
                />
              </EuiFormRow>
            </EuiForm>
            <ChartMarkdownRenderer palette={palette} height={height} />
          </>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>

          <EuiButton
            onClick={() =>
              onSave(`!{chart${JSON.stringify({ palette, height })}}`)
            }
            fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </>
    );
  },
};

function ChartParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;

  function tokenizeChart(eat, value, silent) {
    if (value.startsWith('!{chart') === false) return false;

    const nextChar = value[7];

    if (nextChar !== '{' && nextChar !== '}') return false; // this isn't actually a chart

    if (silent) {
      return true;
    }

    // is there a configuration?
    const hasConfiguration = nextChar === '{';

    let match = '!{chart';
    let configuration = {};

    if (hasConfiguration) {
      let configurationString = '';

      let openObjects = 0;

      for (let i = 7; i < value.length; i++) {
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
      } catch (e) {
        const now = eat.now();
        this.file.fail(`Unable to parse chart JSON configuration: ${e}`, {
          line: now.line,
          column: now.column + 7,
        });
      }
    }

    match += '}';
    return eat(match)({
      type: 'chartDemoPlugin',
      ...configuration,
    });
  }

  tokenizers.chart = tokenizeChart;
  methods.splice(methods.indexOf('text'), 0, 'chart');
}

const chartMarkdownHandler = (h, node) => {
  return h(node.position, 'chartDemoPlugin', node, []);
};
const ChartMarkdownRenderer = ({ height = 200, palette = 5 }) => {
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
  ChartMarkdownRenderer as renderer,
};
