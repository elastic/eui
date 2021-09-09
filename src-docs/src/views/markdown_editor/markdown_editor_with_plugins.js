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
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButton,
  EuiButtonEmpty,
  EuiForm,
  EuiFormRow,
  EuiColorPalettePicker,
  EuiRange,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import {
  euiPaletteComplimentary,
  euiPaletteCool,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteGray,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteWarm,
} from '../../../../src/services/color';
import { getDefaultEuiMarkdownUiPlugins } from '../../../../src/components/markdown_editor';

const paletteData = {
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
const generateData = (categories) => dg.generateGroupedSeries(10, categories);

const chartDemoPlugin = {
  name: 'chartDemoPlugin',
  button: {
    label: 'Chart',
    iconType: 'visBarVerticalStacked',
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
            <strong>palette: </strong>A number between 1-8 for each palette.
          </li>
          <li>
            <strong>categories: </strong>
            The number of categories per column
          </li>
        </ul>
      </EuiText>
    </div>
  ),
  editor: function ChartEditor({ node, onSave, onCancel }) {
    const [palette, setPalette] = useState((node && node.palette) || '1');
    const [categories, setCategories] = useState(5);

    const onChange = (e) => {
      setCategories(parseInt(e.target.value));
    };

    const palettes = paletteNames.map((paletteName, index) => {
      return {
        value: String(index + 1),
        title: paletteName,
        palette: paletteData[paletteNames[index]](categories),
        type: 'fixed',
      };
    });

    return (
      <>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add chart</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <>
            <EuiForm component="form">
              <EuiFlexGroup gutterSize="m" style={{ width: 600 }}>
                <EuiFlexItem>
                  <EuiFormRow label="Palette">
                    <EuiColorPalettePicker
                      palettes={palettes}
                      onChange={setPalette}
                      value={palette}
                      compressed
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Categories">
                    <EuiRange
                      value={categories}
                      onChange={onChange}
                      min={1}
                      max={10}
                      compressed
                      showValue
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiForm>
            <EuiSpacer />
            <ChartMarkdownRenderer palette={palette} categories={categories} />
          </>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>

          <EuiButton
            onClick={() =>
              onSave(`!{chart${JSON.stringify({ palette, categories })}}`, {
                block: true,
              })
            }
            fill
          >
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

// receives the configuration from the parser and renders
const ChartMarkdownRenderer = ({ palette, categories }) => {
  const customColors = {
    colors: {
      vizColors: paletteData[paletteNames[palette - 1]](categories),
    },
  };
  return (
    <Chart size={{ height: 320 }}>
      <Settings
        theme={[customColors, EUI_CHARTS_THEME_LIGHT]}
        showLegend={false}
        showLegendDisplayValue={false}
      />
      <BarSeries
        id="status"
        name="Status"
        data={generateData(categories)}
        xAccessor={'x'}
        yAccessors={['y']}
        splitSeriesAccessors={['g']}
        stackAccessors={['g']}
      />
      <Axis id="bottom-axis" position="bottom" showGridLines />
      <Axis
        id="left-axis"
        position="left"
        showGridLines
        tickFormat={(d) => Number(d).toFixed(2)}
      />
    </Chart>
  );
};

const exampleParsingList = getDefaultEuiMarkdownParsingPlugins();
exampleParsingList.push(ChartMarkdownParser);

const exampleProcessingList = getDefaultEuiMarkdownProcessingPlugins();
exampleProcessingList[1][1].components.chartDemoPlugin = ChartMarkdownRenderer;

const exampleUiPlugins = getDefaultEuiMarkdownUiPlugins();
exampleUiPlugins.push(chartDemoPlugin);

const initialExample = `## Chart plugin

Notice the toolbar above has a new chart button. Click it to add a chart.

Once you finish it'll add some syntax that looks like the below.

!{chart{"palette":"2","categories":5}}
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
        placeholder="Your markdown here..."
        value={value}
        onChange={setValue}
        height={400}
        uiPlugins={exampleUiPlugins}
        parsingPluginList={exampleParsingList}
        processingPluginList={exampleProcessingList}
        onParse={onParse}
        errors={messages}
      />
      <EuiSpacer size="s" />
      <div className="eui-textRight">
        <EuiButton
          size="s"
          iconType={isAstShowing ? 'eyeClosed' : 'eye'}
          onClick={() => setIsAstShowing(!isAstShowing)}
          fill={isAstShowing}
        >
          {isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
        </EuiButton>
      </div>
      {isAstShowing && <EuiCodeBlock language="json">{ast}</EuiCodeBlock>}

      <EuiMarkdownFormat
        parsingPluginList={exampleParsingList}
        processingPluginList={exampleProcessingList}
      >
        {value}
      </EuiMarkdownFormat>
    </>
  );
};
