import React from 'react';

import imageIcons from '../../images/icons.svg';
import imageButtons from '../../images/buttons.svg';
import imageTables from '../../images/tables.svg';
import imageForms from '../../images/forms.svg';
import imageFlexgrid from '../../images/flexgrid.svg';
import imageCards from '../../images/cards.svg';
import imagePages from '../../images/page.svg';
import imageText from '../../images/text.svg';
import imageCharts from '../../images/charts.svg';
import homeIllustration from '../../images/home_illustration.svg';

import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiPanel,
  EuiImage,
} from '../../../../src/components';

export const HomeView = () => (
  <div>
    <EuiPanel color="subdued" paddingSize="none">
      <EuiFlexGroup alignItems="center" gutterSize="none">
        <EuiFlexItem style={{ padding: 24 }}>
          <EuiTitle size="l">
            <h1>Elastic UI</h1>
          </EuiTitle>
          <EuiSpacer />
          <EuiSpacer />
          <EuiTitle size="s">
            <h2>The framework powering the Elastic Stack</h2>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText grow={false}>
            <p>
              The Elastic UI framework (EUI) is a design library in use at
              Elastic to build internal products that need to share our
              aesthetics. It distributes UI React components and static assets
              for use in building web layouts.
            </p>
            <p>
              <EuiLink href="https://github.com/elastic/eui/blob/master/wiki/consuming.md">
                <strong>Getting started</strong>
              </EuiLink>
              &emsp;&emsp;
              <EuiLink href="https://www.elastic.co/guide/en/kibana/current/kibana-plugins.html">
                <strong>Kibana plugin development</strong>
              </EuiLink>
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem className="eui-textRight">
          <EuiImage alt="" url={homeIllustration} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
    <EuiSpacer />
    <EuiSpacer />
    <EuiFlexGroup
      gutterSize="l"
      wrap
      responsize={false}
      justifyContent="spaceBetween">
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/display/icons"
          textAlign="left"
          image={imageIcons}
          title="Icons"
          description="Our SVG icon library gives you full control over size and color"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/navigation/button"
          textAlign="left"
          image={imageButtons}
          title="Buttons"
          description="Buttons for every usage you might need"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/display/text"
          textAlign="left"
          image={imageText}
          title="Text"
          description="Simple HTML text like paragraphs and lists are wrapped in a single text component for styling"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/layout/page"
          textAlign="left"
          image={imagePages}
          title="Pages"
          description="Layout your whole application page with this component and its series of child components"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/layout/flex"
          textAlign="left"
          image={imageFlexgrid}
          title="Flexible layouts"
          description="Create layouts by using flex groups, grids, and items"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/display/card"
          textAlign="left"
          image={imageCards}
          title="Cards"
          description="Cards like these help you make repeatable content more presentable"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/forms/form-layouts"
          textAlign="left"
          image={imageForms}
          title="Forms"
          description="Input tags, layouts, and validation for your forms"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/tabular-content/tables"
          textAlign="left"
          image={imageTables}
          title="Tables"
          description="Build tables from individual components or high level wrappers"
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          style={{ minWidth: 250, maxWidth: 316 }}
          href="#/elastic-charts/creating-charts"
          textAlign="left"
          image={imageCharts}
          title="Charts"
          description="Learn charting best practices and how to integrate EUI with the Elastic Charts library"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer />
    <EuiText grow={false}>
      <h2>Design goals</h2>
      <dl>
        <dt>EUI is accessible to everyone.</dt>
        <dd>
          Uses high contrast, color-blind safe palettes and tested with most
          assistive technology.
        </dd>
        <dt>EUI is themable.</dt>
        <dd>
          Theming involves changing fewer than a dozen lines of code. This means
          strict variable usage.
        </dd>
        <dt>EUI is flexible and composable.</dt>
        <dd>
          Configurable enough to meet the needs of a wide array of contexts
          while maintaining brand and low-level consistency.
        </dd>
        <dt>EUI is responsive.</dt>
        <dd>Supports multiple window sizes from large desktop to mobile.</dd>
        <dt>EUI is well documented and tested.</dt>
        <dd>Code is friendly to the novice and expert alike.</dd>
        <dt>EUI is playful.</dt>
        <dd>Simple and consistent use of animation brings life.</dd>
      </dl>
    </EuiText>
  </div>
);
