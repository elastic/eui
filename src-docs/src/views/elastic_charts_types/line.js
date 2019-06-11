import React from 'react';
import {
  Chart,
  LineSeries,
  getSpecId,
  Settings,
  CurveType,
  ScaleType,
} from '@elastic/charts';
import { DATA } from './data';
import { SETTINGS } from '../../../../src/themes/charts/themes';

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

export default () => (
  <EuiFlexGrid columns={3}>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        icon={
          <Chart renderer="canvas" size={[undefined, 140]}>
            <Settings {...SETTINGS} />
            <LineSeries
              id={getSpecId('lines')}
              name={'Simple line'}
              data={[{ x: 0, y: 2 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 6 }]}
              xAccessor="x"
              yAccessors={['y']}
              curve={CurveType.CURVE_CATMULL_ROM}
              xScaleType={ScaleType.Linear}
              yScaleType={ScaleType.Linear}
            />
          </Chart>
        }
        title="Simple line"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Line%20Chart&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fstories%2Fstories-panel',
          `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings {...SETTINGS} />
  <LineSeries
    id={getSpecId('lines')}
    name={'Simple line'}
    data={[{ x: 0, y: 2 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 6 }]}
    xAccessor="x"
    yAccessors={['y']}
    curve={CurveType.CURVE_CATMULL_ROM}
    xScaleType={ScaleType.Linear}
    yScaleType={ScaleType.Linear}
  />
</Chart>`)}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        icon={
          <Chart renderer="canvas" size={[undefined, 140]}>
            <Settings {...SETTINGS} />
            <LineSeries
              id={getSpecId('lines')}
              name={'Simple line series'}
              data={DATA}
              xAccessor="x"
              yAccessors={['y']}
              splitSeriesAccessors={['g']}
              curve={CurveType.CURVE_CATMULL_ROM}
              xScaleType={ScaleType.Linear}
              yScaleType={ScaleType.Linear}
            />
          </Chart>
        }
        title="Simple line series"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Line%20Chart&selectedStory=multiple%20w%20axis%20and%20legend&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
          `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings {...SETTINGS} />
  <LineSeries
    id={getSpecId('lines')}
    name={'Simple line series'}
    data={${JSON.stringify(DATA)}}
    xAccessor="x"
    yAccessors={['y']}
    splitSeriesAccessors={['g']}
    curve={CurveType.CURVE_CATMULL_ROM}
    xScaleType={ScaleType.Linear}
    yScaleType={ScaleType.Linear}
  />
</Chart>`)}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        icon={
          <Chart renderer="canvas" size={[undefined, 140]}>
            <Settings {...SETTINGS} />
            <LineSeries
              id={getSpecId('lines')}
              name={'Stacked line series'}
              data={DATA}
              xAccessor="x"
              yAccessors={['y']}
              stackAccessors={['x']}
              splitSeriesAccessors={['g']}
              curve={CurveType.CURVE_CATMULL_ROM}
              xScaleType={ScaleType.Linear}
              yScaleType={ScaleType.Linear}
            />
          </Chart>
        }
        title="Stacked line series"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Line%20Chart&selectedStory=stacked%20w%20axis%20and%20legend&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
          `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings {...SETTINGS} />
  <LineSeries
    id={getSpecId('lines')}
    name={'Stacked line series'}
    data={${JSON.stringify(DATA)}}
    xAccessor="x"
    yAccessors={['y']}
    stackAccessors={['x']}
    splitSeriesAccessors={['g']}
    curve={CurveType.CURVE_CATMULL_ROM}
    xScaleType={ScaleType.Linear}
    yScaleType={ScaleType.Linear}
  />
</Chart>`)}
      />
    </EuiFlexItem>

  </EuiFlexGrid>

);
