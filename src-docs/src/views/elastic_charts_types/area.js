import React, { PureComponent } from 'react';
import { withTheme } from '../../components';
import {
  Chart,
  AreaSeries,
  getSpecId,
  Settings,
  CurveType,
  ScaleType,
} from '@elastic/charts';
import { DATA } from './data';
import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiFlexGroup,
  EuiLink,
  EuiButton,
  EuiCard,
  EuiCopy,
} from '../../../../src/components';

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

class _AreaCharts extends PureComponent {
  render() {
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    return (
      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            icon={
              <Chart renderer="canvas" size={[undefined, 140]}>
                <Settings theme={theme} />
                <AreaSeries
                  id={getSpecId('areas')}
                  name={'Simple area'}
                  data={[
                    { x: 0, y: 2 },
                    { x: 1, y: 7 },
                    { x: 2, y: 3 },
                    { x: 3, y: 6 },
                  ]}
                  xAccessor="x"
                  yAccessors={['y']}
                  curve={CurveType.CURVE_CATMULL_ROM}
                  xScaleType={ScaleType.Linear}
                  yScaleType={ScaleType.Linear}
                />
              </Chart>
            }
            title="Simple area"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Area%20Chart&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart renderer="canvas" size={[undefined, 140]}>
      <Settings {...SETTINGS} />
      <AreaSeries
        id={getSpecId('areas')}
        name={'Simple area'}
        data={[{ x: 0, y: 2 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 6 }]}
        xAccessor="x"
        yAccessors={['y']}
        curve={CurveType.CURVE_CATMULL_ROM}
        xScaleType={ScaleType.Linear}
        yScaleType={ScaleType.Linear}
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
                <Settings theme={theme} />
                <AreaSeries
                  id={getSpecId('areas')}
                  name={'Simple area series'}
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
            title="Simple area series"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              null,
              `<Chart renderer="canvas" size={[undefined, 140]}>
      <Settings {...SETTINGS} />
      <AreaSeries
        id={getSpecId('areas')}
        name={'Simple area series'}
        data={${JSON.stringify(DATA)}}
        xAccessor="x"
        yAccessors={['y']}
        splitSeriesAccessors={['g']}
        curve={CurveType.CURVE_CATMULL_ROM}
        xScaleType={ScaleType.Linear}
        yScaleType={ScaleType.Linear}
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
                <Settings theme={theme} />
                <AreaSeries
                  id={getSpecId('areas')}
                  name={'Stacked area series'}
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
            title="Stacked area series"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Area%20Chart&selectedStory=stacked%20with%20separated%20specs&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart renderer="canvas" size={[undefined, 140]}>
      <Settings {...SETTINGS} />
      <AreaSeries
        id={getSpecId('areas')}
        name={'Stacked area series'}
        data={${JSON.stringify(DATA)}}
        xAccessor="x"
        yAccessors={['y']}
        stackAccessors={['x']}
        splitSeriesAccessors={['g']}
        curve={CurveType.CURVE_CATMULL_ROM}
        xScaleType={ScaleType.Linear}
        yScaleType={ScaleType.Linear}
      />
    </Chart>`
            )}
          />
        </EuiFlexItem>
      </EuiFlexGrid>
    );
  }
}

export const AreaCharts = withTheme(_AreaCharts);
