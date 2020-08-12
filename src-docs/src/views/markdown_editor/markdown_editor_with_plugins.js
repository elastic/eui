import React, { useCallback, useState } from 'react';

import {
  Chart,
  Settings,
  Axis,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';

import { EUI_CHARTS_THEME_LIGHT } from '../../../../src/themes/charts/themes';

import {
  getDefaultEuiMarkdownParsingPlugins,
  getDefaultEuiMarkdownProcessingPlugins,
  EuiMarkdownEditor,
  EuiMarkdownFormat,
  EuiSpacer,
  EuiCodeBlock,
  EuiButtonToggle,
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
  EuiText,
} from '../../../../src/components';

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
} from '../../../../src/services/color';

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
      <EuiCodeBlock language="md" fontSize="l" paddingSize="s" isCopyable>
        {'!{chart{options}}'}
      </EuiCodeBlock>
      <EuiSpacer size="s" />
      <EuiText size="xs" style={{ marginLeft: 16 }}>
        <p>Where options can contain:</p>
        <ul>
          <li>
            <strong>palette: </strong>A number between 1-9 for each palette.
          </li>
          <li>
            <strong>height: </strong>
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
                  onChange={e =>
                    setPalette(parseInt(e.currentTarget.value, 10))
                  }
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
                  onChange={e => setHeight(parseInt(e.currentTarget.value, 10))}
                />
              </EuiFormRow>
            </EuiForm>
            <div
              style={{
                width: 600,
                maxWidth: '100%',
                height: 500,
                alignItems: 'center',
                display: 'flex',
              }}>
              <ChartMarkdownRenderer palette={palette} height={height} />
            </div>
          </>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>

          <EuiButton
            onClick={() =>
              onSave(`!{chart${JSON.stringify({ palette, height })}}`, {
                block: true,
              })
            }
            fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </>
    );
  },
};

function ChartMarkdownParser() {
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

const exampleParsingList = getDefaultEuiMarkdownParsingPlugins();
exampleParsingList.push(ChartMarkdownParser);

const exampleProcessingList = getDefaultEuiMarkdownProcessingPlugins();
exampleProcessingList[1][1].components.chartDemoPlugin = ChartMarkdownRenderer;

const initialExample = `## Chart plugin

Notice the toolbar above has a new chart button. Click it to add a chart.

Once you finish it'll add some syntax that looks like the below.

!{chart{"palette":4,"height":300}}
`;

export default () => {
  const [value, setValue] = useState(initialExample);
  const [messages, setMessages] = useState([]);
  const [ast, setAst] = useState(null);
  const [isAstShowing, setIsAstShowing] = useState(false);
  const onParse = useCallback((err, { messages, ast }) => {
    setMessages(err ? [err] : messages);
    setAst(JSON.stringify(ast, null, 2));
  }, []);
  return (
    <>
      <EuiMarkdownEditor
        aria-label="EUI markdown editor with plugins demo"
        value={value}
        onChange={setValue}
        height={400}
        uiPlugins={[chartDemoPlugin]}
        parsingPluginList={exampleParsingList}
        processingPluginList={exampleProcessingList}
        onParse={onParse}
        errors={messages}
      />
      <EuiSpacer size="s" />
      <div className="eui-textRight">
        <EuiButtonToggle
          label={isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
          size="s"
          isEmpty
          iconType={isAstShowing ? 'eyeClosed' : 'eye'}
          onChange={() => setIsAstShowing(!isAstShowing)}
          isSelected={isAstShowing}
        />
      </div>
      {isAstShowing && <EuiCodeBlock language="json">{ast}</EuiCodeBlock>}

      <EuiMarkdownFormat
        parsingPluginList={exampleParsingList}
        processingPluginList={exampleProcessingList}>
        {value}
      </EuiMarkdownFormat>
    </>
  );
};
