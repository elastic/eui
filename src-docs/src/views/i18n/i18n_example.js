import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiI18n, EuiContext } from '../../../../src/components';

import I18nBasic from './i18n_basic';
const i18nBasicSource = require('!!raw-loader!./i18n_basic');
const i18nBasicHtml = renderToHtml(I18nBasic);

import I18nRenderProp from './i18n_renderprop';
const i18nRenderPropSource = require('!!raw-loader!./i18n_renderprop');
const i18nRenderPropHtml = renderToHtml(I18nRenderProp);

import I18nMulti from './i18n_multi';
const I18nMultiSource = require('!!raw-loader!./i18n_multi');
const I18nMultiHtml = renderToHtml(I18nMulti);

import I18nNumber from './i18n_number';
const I18nNumberSource = require('!!raw-loader!./i18n_number');
const I18nNumberHtml = renderToHtml(I18nNumber);

import Context from './context';
const contextSource = require('!!raw-loader!./context');
const contextHtml = renderToHtml(Context);

import { I18nShapeProps } from './props';
export const I18nExample = {
  title: 'I18n',
  sections: [
    {
      title: 'Internationalization',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nBasicSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: i18nBasicHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiI18n</strong> allows localizing string and numeric values
          for internationalization. At its simplest, the component takes{' '}
          <EuiCode>token</EuiCode> and <EuiCode>default</EuiCode> props.&nbsp;
          <EuiCode>token</EuiCode> provides a reference to use when looking for
          a localized value to render and <EuiCode>default</EuiCode> provides
          the untranslated value.
        </p>
      ),
      demo: <I18nBasic />,
      props: { EuiI18n },
    },
    {
      title: 'As a render prop',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nRenderPropSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: i18nRenderPropHtml,
        },
      ],
      text: (
        <p>
          Some times a localized value is needed for a prop instead of rendering
          directly to the DOM. In these cases <strong>EuiI18n</strong> can be
          passed a render prop child which is called with the localized value.
        </p>
      ),
      demo: <I18nRenderProp />,
    },
    {
      title: 'Multi-value lookup',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: I18nMultiSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: I18nMultiHtml,
        },
      ],
      text: (
        <p>
          If many localized values are needed in a small area, multiple tokens
          can be retrieved in a single render prop. In this case the{' '}
          <EuiCode>token</EuiCode>/<EuiCode>default</EuiCode> props are replaced
          by the pluralized <EuiCode>tokens</EuiCode>/
          <EuiCode>defaults</EuiCode>.
        </p>
      ),
      demo: <I18nMulti />,
    },
    {
      title: 'Number localization',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: I18nNumberSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: I18nNumberHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiI18nNumber</strong> can be used to format one or more
          numbers. Similarly to <strong>EuiI18n</strong>, it takes{' '}
          <EuiCode>value</EuiCode> or
          <EuiCode>values</EuiCode> and can render directly to the DOM or call a
          render prop.
        </p>
      ),
      demo: <I18nNumber />,
    },
    {
      title: 'Context',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contextHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>EuiContext</EuiCode> allows setting global
          internationalization copy for EUI components. Any components used
          within this context will lookup their display values from this
          mapping.
        </p>
      ),
      components: { EuiContext },
      demo: <Context />,
      props: { EuiContext, EuiI18n, i18n: I18nShapeProps },
    },
  ],
};
