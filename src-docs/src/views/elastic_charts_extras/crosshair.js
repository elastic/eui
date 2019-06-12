import React, { PureComponent } from 'react';
import { withTheme } from '../../components';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiFlexGroup,
  EuiLink,
  EuiButton,
  EuiCard,
  EuiCopy,
} from '../../../../src/components';
import {
  EUI_LIGHT_THEME,
  EUI_DARK_THEME,
} from '../../../../src/themes/charts/themes';

import {
  Axis,
  Chart,
  BarSeries,
  getSpecId,
  Settings,
  getAxisId,
  Position,
  ScaleType,
  TooltipType,
  LineSeries,
} from '@elastic/charts';

function cardFooterContent(docsUrl, snippet) {
  if (!docsUrl && !snippet) {
    return;
  }

  return (
    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
      <EuiFlexItem grow={false}>
        {docsUrl && <EuiLink href={docsUrl}>Docs</EuiLink>}
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {snippet && (
          <EuiCopy textToCopy={snippet}>
            {copy => <EuiButton onClick={copy}>Copy snippet</EuiButton>}
          </EuiCopy>
        )}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

class _Crosshair extends PureComponent {
  render() {
    const lineCustomSeriesColors = new Map();
    const lineDataSeriesColorValues = {
      colorValues: [],
      specId: getSpecId('hidden'),
    };
    lineCustomSeriesColors.set(lineDataSeriesColorValues, '#00000000');

    const isDarkTheme = this.props.theme.includes('dark');
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;

    return (
      <EuiFlexGrid columns={3} className="euiGuide__chartsPageCrosshairSection">
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            icon={
              <Chart renderer="canvas" size={[undefined, 140]}>
                <Settings theme={theme} tooltipType={TooltipType.Crosshairs} />
                <Axis
                  id={getAxisId('bottom-axis')}
                  position={Position.Bottom}
                />
                <Axis
                  id={getAxisId('left-axis')}
                  position={Position.Left}
                  showGridLines
                  gridLineStyle={gridHorizontalSettings}
                />
                <BarSeries
                  id={getSpecId('hidden')}
                  xScaleType={ScaleType.Linear}
                  yScaleType={ScaleType.Linear}
                  data={[
                    { x: 0, y: 2 },
                    { x: 1, y: 7 },
                    { x: 2, y: 3 },
                    { x: 3, y: 6 },
                  ]}
                  xAccessor="x"
                  yAccessors={['y']}
                  customSeriesColors={lineCustomSeriesColors}
                />
              </Chart>
            }
            title="Lines"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart renderer="canvas" size={[undefined, 140]}>
    <Settings {...SETTINGS} />
    <Axis
      id={getAxisId('bottom-axis')}
      position={Position.Bottom}
    />
    <Axis
      id={getAxisId('left-axis')}
      position={Position.Left}
      showGridLines
      gridLineStyle={gridHorizontalSettings}
    />
    <BarSeries
      id={getSpecId('hidden')}
      xScaleType={ScaleType.Linear}
      yScaleType={ScaleType.Linear}
      data={[{ x: 0, y: 2 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 6 }]}
      xAccessor="x"
      yAccessors={['y']}
    />
  </Chart>`
            )}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            icon={
              <Chart renderer="canvas" size={[undefined, 140]}>
                <Settings theme={theme} tooltipType={TooltipType.Crosshairs} />
                <Axis
                  id={getAxisId('bottom-axis')}
                  position={Position.Bottom}
                  showGridLines
                  gridLineStyle={gridVerticalSettings}
                />
                <Axis id={getAxisId('left-axis')} position={Position.Left} />
                <LineSeries
                  id={getSpecId('hidden')}
                  xScaleType={ScaleType.Linear}
                  yScaleType={ScaleType.Linear}
                  data={[
                    { x: 0, y: 2 },
                    { x: 1, y: 7 },
                    { x: 2, y: 3 },
                    { x: 3, y: 6 },
                  ]}
                  xAccessor="x"
                  yAccessors={['y']}
                  customSeriesColors={lineCustomSeriesColors}
                />
              </Chart>
            }
            title="Vertical grid"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart renderer="canvas" size={[undefined, 140]}>
    <Settings {...SETTINGS} />
    <Axis
      id={getAxisId('bottom-axis')}
      position={Position.Bottom}
      showGridLines
      gridLineStyle={gridVerticalSettings}
    />
    <Axis
      id={getAxisId('left-axis')}
      position={Position.Left}
    />
    <BarSeries
      id={getSpecId('hidden')}
      xScaleType={ScaleType.Linear}
      yScaleType={ScaleType.Linear}
      data={[{ x: 0, y: 2 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 6 }]}
      xAccessor="x"
      yAccessors={['y']}
    />
  </Chart>`
            )}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            icon={
              <Chart renderer="canvas" size={[undefined, 140]}>
                <Settings theme={theme} tooltipType={TooltipType.Crosshairs} />
                <Axis
                  id={getAxisId('bottom-axis')}
                  position={Position.Bottom}
                  showGridLines
                  gridLineStyle={gridVerticalSettings}
                />
                <Axis
                  id={getAxisId('left-axis')}
                  position={Position.Left}
                  showGridLines
                  gridLineStyle={gridHorizontalSettings}
                />
                <BarSeries
                  id={getSpecId('hidden')}
                  xScaleType={ScaleType.Linear}
                  yScaleType={ScaleType.Linear}
                  data={[
                    { x: 0, y: 2 },
                    { x: 1, y: 7 },
                    { x: 2, y: 3 },
                    { x: 3, y: 6 },
                  ]}
                  xAccessor="x"
                  yAccessors={['y']}
                  customSeriesColors={lineCustomSeriesColors}
                />
              </Chart>
            }
            title="Both"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart renderer="canvas" size={[undefined, 140]}>
    <Settings {...SETTINGS} />
    <Axis
      id={getAxisId('bottom-axis')}
      position={Position.Bottom}
      showGridLines
      gridLineStyle={gridVerticalSettings}
    />
    <Axis
      id={getAxisId('left-axis')}
      position={Position.Left}
      showGridLines
      gridLineStyle={gridHorizontalSettings}
    />
    <BarSeries
      id={getSpecId('hidden')}
      xScaleType={ScaleType.Linear}
      yScaleType={ScaleType.Linear}
      data={[{ x: 0, y: 2 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 6 }]}
      xAccessor="x"
      yAccessors={['y']}
    />
  </Chart>`
            )}
          />
        </EuiFlexItem>
      </EuiFlexGrid>
    );
  }
}

export const Crosshair = withTheme(_Crosshair);
