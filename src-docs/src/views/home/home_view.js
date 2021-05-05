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
  EuiPanel,
  EuiIcon,
  EuiFlexGrid,
  EuiPageContent,
  EuiPageContentBody,
} from '../../../../src/components';
import { HomeFooterElasticLogo } from './home_footer_elastic_logo';

export const HomeView = () => (
  <EuiPageContent
    hasShadow={false}
    hasBorder={false}
    paddingSize="none"
    color="transparent"
    borderRadius="none">
    <EuiPageContentBody restrictWidth>
      <EuiPanel color="subdued" hasShadow={false} paddingSize="none">
        <EuiFlexGroup
          alignItems="center"
          gutterSize="none"
          className="guideHome__hero">
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
                  <EuiLink href="https://github.com/elastic/eui/blob/master/wiki/consuming.md">
                    <strong>Getting started</strong>
                  </EuiLink>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <Link to="/package/changelog">
                    <strong>What&apos;s new</strong>
                  </Link>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiLink href="https://github.com/elastic/eui/blob/master/CONTRIBUTING.md">
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
      </EuiPanel>
      <EuiSpacer size="xxl" />
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
            icon={<EuiIcon size="l" type="controlsHorizontal" />}
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
        justifyContent="spaceBetween">
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            href="#/navigation/button"
            textAlign="left"
            image={imageButtons}
            title="Buttons"
            description="Buttons for every usage you might need"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            href="#/display/card"
            textAlign="left"
            image={imageCards}
            title="Cards"
            description="Cards like these help you make repeatable content more presentable"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            href="#/elastic-charts/creating-charts"
            textAlign="left"
            image={imageCharts}
            title="Charts"
            description="Learn charting best practices and how to integrate EUI with the Elastic Charts library"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            href="#/layout/flex"
            textAlign="left"
            image={imageFlexgrid}
            title="Flexible layouts"
            description="Create layouts by using flex groups, grids, and items"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            href="#/forms/form-layouts"
            textAlign="left"
            image={imageForms}
            title="Forms"
            description="Input tags, layouts, and validation for your forms"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            href="#/display/icons"
            textAlign="left"
            image={imageIcons}
            title="Icons"
            description="Our SVG icon library gives you full control over size and color"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            href="#/layout/page"
            textAlign="left"
            image={imagePages}
            title="Pages"
            description="Layout your whole application page with this component and its series of child components"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
            href="#/tabular-content/tables"
            textAlign="left"
            image={imageTables}
            title="Tables"
            description="Build tables from individual components or high level wrappers"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="guideHomePage__blockformCard">
          <EuiCard
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
            EUI is licensed under{' '}
            <EuiLink href="https://github.com/elastic/eui/blob/master/LICENSE">
              Apache License 2.0
            </EuiLink>{' '}
            | Crafted with{' '}
            <span
              role="img"
              aria-label="love"
              className="guideHome__footerHeart">
              ❤️
            </span>{' '}
            by{' '}
            <EuiLink href="http://elastic.co/" external={false} target="_blank">
              <HomeFooterElasticLogo />
            </EuiLink>
          </p>
        </EuiText>
      </div>
    </EuiPageContentBody>
  </EuiPageContent>
);
