import React, { PureComponent } from 'react';
import { withTheme } from '../../components';
import {
  Axis,
  Chart,
  AreaSeries,
  getSpecId,
  Settings,
  getAxisId,
  Position,
  ScaleType,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import { EuiFlexGrid, EuiFlexItem, EuiCard } from '../../../../src/components';

import {
  DATA,
  lineCustomSeriesColors,
  chartsDocsCardFooterContent,
} from './data';

class _Grid extends PureComponent {
  render() {
    const isDarkTheme = this.props.theme.includes('dark');
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    return (
      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            icon={
              <Chart renderer="canvas" size={[undefined, 140]}>
                <Settings
                  theme={
                    isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
                  }
                />
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
                <AreaSeries
                  id={getSpecId('hidden')}
                  xScaleType={ScaleType.Linear}
                  yScaleType={ScaleType.Linear}
                  data={DATA}
                  xAccessor="x"
                  yAccessors={['y']}
                  customSeriesColors={lineCustomSeriesColors}
                />
              </Chart>
            }
            title="Horizontal grid"
            description="Example of a card's description. Stick to one or two sentences."
            footer={chartsDocsCardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings
    theme={
      isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
    }
  />
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
  <AreaSeries
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
                <Settings
                  theme={
                    isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
                  }
                />
                <Axis
                  id={getAxisId('bottom-axis')}
                  position={Position.Bottom}
                  showGridLines
                  gridLineStyle={gridVerticalSettings}
                />
                <Axis id={getAxisId('left-axis')} position={Position.Left} />
                <AreaSeries
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
            footer={chartsDocsCardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings
    theme={
      isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
    }
  />
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
  <AreaSeries
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
                <Settings
                  theme={
                    isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
                  }
                />
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
                <AreaSeries
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
            footer={chartsDocsCardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings
    theme={
      isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
    }
  />
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
  <AreaSeries
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

export const Grid = withTheme(_Grid);
