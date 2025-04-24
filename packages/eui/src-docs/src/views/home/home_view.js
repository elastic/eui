import React from 'react';
import { Link } from 'react-router-dom';
import imageIcons from '../../images/icons.svg';
import imageButtons from '../../images/buttons.svg';
import imageTables from '../../images/tables.svg';
import imageForms from '../../images/forms.svg';
import imageFlexgrid from '../../images/flexgrid.svg';
import imageCards from '../../images/cards.svg';
import imagePages from '../../images/page.svg';
import imageText from '../../images/text.svg';
import imageCharts from '../../images/charts.svg';
import HomeIllustration from './home_illustration';
import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiIcon,
  EuiFlexGrid,
  EuiPageSection,
} from '../../../../src';
import { HomeFooterElasticLogo } from './home_footer_elastic_logo';

export const HomeView = () => (
  <>
    <EuiPageSection color="subdued" restrictWidth>
      <EuiFlexGroup
        alignItems="center"
        gutterSize="none"
        className="guideHome__hero"
      >
        <EuiFlexItem>
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
            <EuiFlexGroup gutterSize="xl" wrap responsive={false}>
              <EuiFlexItem grow={false}>
                <Link to="/guidelines/getting-started">
                  <strong>Getting started</strong>
                </Link>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <Link to="/package/changelog">
                  <strong>What&apos;s new</strong>
                </Link>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiLink href="https://github.com/elastic/eui/blob/main/CONTRIBUTING.md">
                  <strong>Contributing</strong>
                </EuiLink>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <HomeIllustration />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageSection>
    <EuiSpacer size="xxl" />
    <EuiPageSection restrictWidth>
      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="l" type="accessibility" />}
            layout="horizontal"
            display="plain"
            titleSize="xs"
            title="Accessible to everyone"
            description="Uses high contrast, color-blind safe palettes and tested with most
        assistive technology."
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="l" type="controls" />}
            layout="horizontal"
            display="plain"
            titleSize="xs"
            title="Flexible and composable"
            description="Configurable enough to meet the needs of a wide array of contexts while maintaining brand and low-level consistency."
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="l" type="documentEdit" />}
            layout="horizontal"
            display="plain"
            titleSize="xs"
            title="Well documented and tested"
            description="Code is friendly to the novice and expert alike."
          />
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiSpacer size="xxl" />
      <EuiFlexGroup
        gutterSize="l"
        wrap
        responsive={false}
        justifyContent="spaceBetween"
      >
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/navigation/button"
            textAlign="left"
            image={imageButtons}
            title="Buttons"
            description="Buttons for every usage you might need"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/display/card"
            textAlign="left"
            image={imageCards}
            title="Cards"
            description="Cards like these help you make repeatable content more presentable"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/elastic-charts/creating-charts"
            textAlign="left"
            image={imageCharts}
            title="Charts"
            description="Learn charting best practices and how to integrate EUI with the Elastic Charts library"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/layout/flex"
            textAlign="left"
            image={imageFlexgrid}
            title="Flexible layouts"
            description="Create layouts by using flex groups, grids, and items"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/forms/form-layouts"
            textAlign="left"
            image={imageForms}
            title="Forms"
            description="Input tags, layouts, and validation for your forms"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/display/icons"
            textAlign="left"
            image={imageIcons}
            title="Icons"
            description="Our SVG icon library gives you full control over size and color"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/templates/page-template"
            textAlign="left"
            image={imagePages}
            title="Pages"
            description="Layout your whole application page with this component and its series of child components"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/tabular-content/tables"
            textAlign="left"
            image={imageTables}
            title="Tables"
            description="Build tables from individual components or high level wrappers"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            hasBorder
            href="#/display/text"
            textAlign="left"
            image={imageText}
            title="Text"
            description="Simple HTML text like paragraphs and lists are wrapped in a single text component for styling"
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="xl" />
      <div>
        <EuiText size="xs" textAlign="center" color="subdued">
          <p>
            EUI is dual-licensed under{' '}
            <EuiLink href="https://github.com/elastic/eui/blob/main/licenses/ELASTIC-LICENSE-2.0.md">
              Elastic License 2.0
            </EuiLink>{' '}
            and{' '}
            <EuiLink href="https://github.com/elastic/eui/blob/main/licenses/SSPL-LICENSE.md">
              Server Side Public License, v 1
            </EuiLink>{' '}
            | Crafted with{' '}
            <span
              role="img"
              aria-label="love"
              className="guideHome__footerHeart"
            >
              ❤️
            </span>{' '}
            by{' '}
            <EuiLink href="http://elastic.co/" external={false} target="_blank">
              <HomeFooterElasticLogo />
            </EuiLink>
          </p>
        </EuiText>
      </div>
    </EuiPageSection>
  </>
);
