import React from 'react';

import { renderToHtml } from '../../services';

import { Link } from 'react-router';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiSpacer,
  EuiCode,
} from '../../../../src/components';

import FlexGroup from './flex_group';
const flexGroupSource = require('!!raw-loader!./flex_group');
const flexGroupHtml = renderToHtml(FlexGroup);

import FlexItems from './flex_items';
const flexItemsSource = require('!!raw-loader!./flex_items');
const flexItemsHtml = renderToHtml(FlexItems);

import FlexGutter from './flex_gutter';
const flexGutterSource = require('!!raw-loader!./flex_gutter');
const flexGutterHtml = renderToHtml(FlexGutter);

import FlexGrow from './flex_grow';
const flexGrowSource = require('!!raw-loader!./flex_grow');
const flexGrowHtml = renderToHtml(FlexGrow);

import FlexJustify from './flex_justify';
const flexJustifySource = require('!!raw-loader!./flex_justify');
const flexJustifyHtml = renderToHtml(FlexJustify);

import FlexGrid from './flex_grid';
const flexGridSource = require('!!raw-loader!./flex_grid');
const flexGridHtml = renderToHtml(FlexGrid);

import FlexGridColumns from './flex_grid_columns';
const flexGridColumnsSource = require('!!raw-loader!./flex_grid_columns');
const flexGridColumnsHtml = renderToHtml(FlexGridColumns);

import FlexNest from './flex_nest';
const flexNestSource = require('!!raw-loader!./flex_nest');
const flexNestHtml = renderToHtml(FlexNest);

import FlexItemPanel from './flex_item_panel';
const flexItemPanelSource = require('!!raw-loader!./flex_item_panel');
const flexItemPanelHtml = renderToHtml(FlexItemPanel);

export default props => (
  <GuidePage title={props.route.name}>
    <EuiCallOut
      title="Coloring and padding exist for examples only"
      color="warning"
    >
      <p>
        Padding and background-color are added to all the <EuiCode>FlexItem</EuiCode> components on this
        documentation page for illustrative purposes only. You will need to add padding through additional
        components or classes if you need it.
      </p>
    </EuiCallOut>

    <EuiSpacer size="l" />

    <GuideSection
      title="FlexGroup is for a single row layout"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexGroupSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexGroupHtml,
      }]}
      text={
        <p>
          <EuiCode>FlexGroup</EuiCode> is useful for setting up layouts for a <strong>single row</strong> of
          content. By default any <EuiCode>FlexItem</EuiCode> within <EuiCode>FlexGroup</EuiCode> will
          stretch and grow to match their siblings.
        </p>
      }
      demo={
        <div className="guideDemo__highlightGrid"><FlexGroup /></div>
      }
    />

    <GuideSection
      title="FlexGroup accepts infinite items"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexItemsSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexItemsHtml,
      }]}
      text={
        <p>
          Same code as above. Notice that <EuiCode>FlexItem</EuiCode> creates equal width items
          no matter the number of siblings. <EuiCode>FlexGroup</EuiCode> never wraps.
        </p>
      }
      demo={
        <div className="guideDemo__highlightGrid"><FlexItems /></div>
      }
    />

    <GuideSection
      title="FlexPanels grow to fill FlexItems"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexItemPanelSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexItemPanelHtml,
      }]}
      text={
        <p>
          The <Link to="/panel">Panel</Link> component will naturally grow to fill the
          <EuiCode>FlexItem</EuiCode> which contains it.
        </p>
      }
      demo={
        <FlexItemPanel />
      }
    />

    <GuideSection
      title="FlexItem can individually turn off stretching"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexGrowSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexGrowHtml,
      }]}
      text={
        <p>
          Sometimes you do not want a <EuiCode>FlexItem</EuiCode> to grow. It
          can be turned off on each item individually.
        </p>
      }
      demo={
        <div className="guideDemo__highlightGrid"><FlexGrow /></div>
      }
    />

    <GuideSection
      title="FlexGroup can justify and align"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexJustifySource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexJustifyHtml,
      }]}
      text={
        <p>
          <EuiCode>FlexGroup</EuiCode>s can also
          use <EuiCode>justifyContent</EuiCode> and <EuiCode>alignItems</EuiCode>props
          that accept normal flex-box paramenters. Below are some common scenarios,
          where you need to separate two items, center justify a single one, or
          center an item vertically. Note the usage
          of <EuiCode>FlexItem</EuiCode>s with <EuiCode>grow=false</EuiCode> so that they do not stretch.
        </p>
      }
      demo={
        <div className="guideDemo__highlightGrid"><FlexJustify /></div>
      }
    />

    <GuideSection
      title="FlexGrids are for repeatable grids"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexGridSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexGridHtml,
      }]}
      text={
        <p>
          <EuiCode>FlexGrid</EuiCode> is a more rigid component that sets multiple, wrapping
          rows of same width items.
        </p>
      }
      demo={
        <div className="guideDemo__highlightGridWrap"><FlexGrid /></div>
      }
    />

    <GuideSection
      title="FlexGrids can have set column widths"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexGridColumnsSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexGridColumnsHtml,
      }]}
      text={
        <p>
          You can set a <EuiCode>columns</EuiCode> prop to specify
          anywhere between 2-4 columns. Any more would likely break on laptop screens.
        </p>
      }
      demo={
        <div className="guideDemo__highlightGridWrap"><FlexGridColumns /></div>
      }
    />

    <GuideSection
      title="FlexGrids and FlexGroups can nest"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexNestSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexNestHtml,
      }]}
      text={
        <p>
          <EuiCode>FlexGroup</EuiCode> and <EuiCode>FlexGrid</EuiCode> can nest
          within themselves indefinitely. For example, here we turn off the growth on a
          <EuiCode>FlexGroup</EuiCode>, then nest a grid inside of it.
        </p>
      }
      demo={
        <div className="guideDemo__highlightGrid"><FlexNest /></div>
      }
    />

    <GuideSection
      title="Gutter sizing can be used on either FlexGroups or FlexGrids"
      source={[{
        type: GuideSectionTypes.JS,
        code: flexGutterSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flexGutterHtml,
      }]}
      text={
        <p>
          The <EuiCode>gutterSize</EuiCode> prop can be applied to either a
          <EuiCode>FlexGroup</EuiCode> or a <EuiCode>FlexGrid</EuiCode> to adjust the
          spacing between <EuiCode>FlexItem</EuiCode>s.
        </p>
      }
      demo={
        <div className="guideDemo__highlightGrid"><FlexGutter /></div>
      }
    />
  </GuidePage>
);
