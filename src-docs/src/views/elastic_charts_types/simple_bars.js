import React, { PureComponent } from 'react';
import { withTheme } from '../../components';
import { Chart, BarSeries, getSpecId, Settings } from '@elastic/charts';
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

class _BarCharts extends PureComponent {
  render() {
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;

    return (
      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            icon={
              <Chart size={[undefined, 140]}>
                <Settings theme={theme} />
                <BarSeries
                  id={getSpecId('bars')}
                  name={'Simple bar'}
                  data={[
                    { x: 0, y: 2 },
                    { x: 1, y: 7 },
                    { x: 2, y: 3 },
                    { x: 3, y: 6 },
                  ]}
                  xAccessor="x"
                  yAccessors={['y']}
                />
              </Chart>
            }
            title="Simple bar"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Bar%20Chart&selectedStory=basic&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs',
              `<Chart size={[undefined, 140]}>
      <Settings {...SETTINGS} />
      <BarSeries
        id={getSpecId('bars')}
        name={'Simple bar'}
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
              <Chart size={[undefined, 140]}>
                <Settings theme={theme} />
                <BarSeries
                  id={getSpecId('bars')}
                  name={'Simple bar series'}
                  data={DATA}
                  xAccessor="x"
                  yAccessors={['y']}
                  splitSeriesAccessors={['g']}
                />
              </Chart>
            }
            title="Simple bar series"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Bar%20Chart&selectedStory=clustered%20with%20axis%20and%20legend&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fstories%2Fstories-panel',
              `<Chart size={[undefined, 140]}>
      <Settings {...SETTINGS} />
      <BarSeries
        id={getSpecId('bars')}
        name={'Simple bar series'}
        data={${JSON.stringify(DATA)}}
        xAccessor="x"
        yAccessors={['y']}
        splitSeriesAccessors={['g']}
      />
    </Chart>`
            )}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            icon={
              <Chart size={[undefined, 140]}>
                <Settings theme={theme} />
                <BarSeries
                  id={getSpecId('bars')}
                  name={'Stacked bar series'}
                  data={DATA}
                  xAccessor="x"
                  yAccessors={['y']}
                  stackAccessors={['x']}
                  splitSeriesAccessors={['g']}
                />
              </Chart>
            }
            title="Stacked bar series"
            description="Example of a card's description. Stick to one or two sentences."
            footer={cardFooterContent(
              'https://elastic.github.io/elastic-charts/?selectedKind=Bar%20Chart&selectedStory=stacked%20with%20axis%20and%20legend&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fstories%2Fstories-panel',
              `<Chart size={[undefined, 140]}>
      <Settings {...SETTINGS} />
      <BarSeries
        id={getSpecId('bars')}
        name={'Stacked bar series'}
        data={${JSON.stringify(DATA)}}
        xAccessor="x"
        yAccessors={['y']}
        stackAccessors={['x']}
        splitSeriesAccessors={['g']}
      />
    </Chart>`
            )}
          />
        </EuiFlexItem>
      </EuiFlexGrid>
    );
  }
}

export const BarCharts = withTheme(_BarCharts);
