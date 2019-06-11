import React from 'react';
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

const lineCustomSeriesColors = new Map();
const lineDataSeriesColorValues = {
  colorValues: [],
  specId: getSpecId('hidden'),
};
lineCustomSeriesColors.set(lineDataSeriesColorValues, '#00000000');

export default () => (
  <EuiFlexGrid columns={3}>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        icon={
          <Chart renderer="canvas" size={[undefined, 140]}>
            <Settings {...SETTINGS} />
            <Axis
              id={getAxisId('bottom-axis')}
              position={Position.Bottom}
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
              customSeriesColors={lineCustomSeriesColors}
            />
          </Chart>
        }
        title="Axes ticks"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Axis&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fstories%2Fstories-panel',
          `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings {...SETTINGS} />
  <Axis
    id={getAxisId('bottom-axis')}
    position={Position.Bottom}
  />
  <Axis
    id={getAxisId('left-axis')}
    position={Position.Left}
  />
  <AreaSeries
    data={[{ x: 0, y: 2 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 6 }]}
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
            <Settings {...SETTINGS}/>
            <Axis
              id={getAxisId('bottom-axis')}
              position={Position.Bottom}
              title={'First Quarter 2019'}
            />
            <Axis
              id={getAxisId('left-axis')}
              position={Position.Left}
              title={'Rain in inches'}
              domain={{ max: 14 }}
            />
            <AreaSeries
              id={getSpecId('hidden')}
              xScaleType={ScaleType.Ordinal}
              yScaleType={ScaleType.Linear}
              data={[{ x: 'JAN', y: 2 }, { x: 'FEB', y: 7 }, { x: 'MAR', y: 3 }, { x: 'APR', y: 6 }]}
              xAccessor="x"
              yAccessors={['y']}
              customSeriesColors={lineCustomSeriesColors}
            />
          </Chart>
        }
        title="Axes labels and values"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Axis&selectedStory=customizing%20domain%20limits%20%5Bonly%20one%20bound%20defined%5D&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fstories%2Fstories-panel',
          `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings {...SETTINGS} xDomain={[0, 1, 2, 3]} />
  <Axis
    id={getAxisId('bottom-axis')}
    position={Position.Bottom}
    title={'First Quarter 2019'}
  />
  <Axis
    id={getAxisId('left-axis')}
    position={Position.Left}
    title={'Rain in inches'}
    domain={{ max: 14 }}
  />
  <AreaSeries
    xScaleType={ScaleType.Ordinal}
    yScaleType={ScaleType.Linear}
    data={[{ x: 'JAN', y: 2 }, { x: 'FEB', y: 7 }, { x: 'MAR', y: 3 }, { x: 'APR', y: 6 }]}
  />
</Chart>`)}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        icon={
          <Chart renderer="canvas" size={[undefined, 140]}>
            <Settings {...SETTINGS}/>
            <Axis
              id={getAxisId('bottom-axis')}
              position={Position.Bottom}
              tickFormat={d => `${d}k mb/s`}
            />
            <Axis
              id={getAxisId('left-axis')}
              position={Position.Left}
              tickFormat={d => `${d}1 GB`}
              domain={[0, 1, 2, 3]}
            />
            <AreaSeries
              id={getSpecId('hidden')}
              xScaleType={ScaleType.Linear}
              yScaleType={ScaleType.Linear}
              data={[{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 1 }]}
              xAccessor="x"
              yAccessors={['y']}
              customSeriesColors={lineCustomSeriesColors}
            />
          </Chart>
        }
        title="Axes format"
        description="Example of a card's description. Stick to one or two sentences."
        footer={cardFooterContent('https://elastic.github.io/elastic-charts/?selectedKind=Area%20Chart&selectedStory=stacked%20with%20separated%20specs&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
          `<Chart renderer="canvas" size={[undefined, 140]}>
  <Settings {...SETTINGS} />
  <Axis
    id={getAxisId('bottom-axis')}
    position={Position.Bottom}
    tickFormat={d => \`\${d}k mb/s\`}
  />
  <Axis
    id={getAxisId('left-axis')}
    position={Position.Left}
    tickFormat={d => \`\${d}1 GB\`}
    domain={[0, 1, 2, 3]}
  />
  <AreaSeries
    id={getSpecId('hidden')}
    xScaleType={ScaleType.Linear}
    yScaleType={ScaleType.Linear}
    data={[{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 1 }]}
    xAccessor="x"
    yAccessors={['y']}
    customSeriesColors={lineCustomSeriesColors}
  />
</Chart>`)}
      />
    </EuiFlexItem>

  </EuiFlexGrid>

);
