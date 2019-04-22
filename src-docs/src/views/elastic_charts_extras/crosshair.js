import React from 'react';
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
import '!!style-loader!css-loader!@elastic/charts/dist/style.css';
import { SETTINGS, gridHorizontalSettings, gridVerticalSettings } from './data';

import { EuiFlexGrid, EuiFlexItem, EuiFlexGroup, EuiLink, EuiButton, EuiCard, EuiCopy } from '../../../../src/components';

function cardFooterContent(docsUrl, snippet) {
  if (!docsUrl && !snippet) {
    return;
  }

  return (
    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
      <EuiFlexItem grow={false}>
        {docsUrl && (
          <EuiLink href={docsUrl}>Docs</EuiLink>
        )}
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {snippet && (
          <EuiCopy textToCopy={snippet}>
            {(copy) => (
              <EuiButton onClick={copy}>
                Copy snippet
              </EuiButton>
            )}
          </EuiCopy>
        )}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

const lineCustomSeriesColors = new Map();
const lineDataSeriesColorValues = {
  colorValues: [],
  specId: getSpecId('hidden'),
};
lineCustomSeriesColors.set(lineDataSeriesColorValues, '#D3DAE600');

export default () => (
  <EuiFlexGrid columns={3} className="euiGuide__chartsPageCrosshairSection">
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        icon={
          <Chart renderer="canvas" size={[undefined, 140]}>
            <Settings {...SETTINGS} tooltipType={TooltipType.Crosshairs} />
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
              customSeriesColors={lineCustomSeriesColors}
            />
          </Chart>
        }
        title="Lines"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
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
</Chart>`)}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        icon={
          <Chart renderer="canvas" size={[undefined, 140]}>
            <Settings {...SETTINGS} tooltipType={TooltipType.Crosshairs}/>
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
            <LineSeries
              id={getSpecId('hidden')}
              xScaleType={ScaleType.Linear}
              yScaleType={ScaleType.Linear}
              data={[{ x: 0, y: 2 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 6 }]}
              xAccessor="x"
              yAccessors={['y']}
              customSeriesColors={lineCustomSeriesColors}
            />
          </Chart>
        }
        title="Vertical grid"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
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
</Chart>`)}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        icon={
          <Chart renderer="canvas" size={[undefined, 140]}>
            <Settings {...SETTINGS} tooltipType={TooltipType.Crosshairs}/>
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
              customSeriesColors={lineCustomSeriesColors}
            />
          </Chart>
        }
        title="Both"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Grids&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
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
</Chart>`)}
      />
    </EuiFlexItem>

  </EuiFlexGrid>

);
