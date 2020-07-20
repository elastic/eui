import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiI18n, EuiContext } from '../../../../src/components';

import I18nBasic from './i18n_basic';
const i18nBasicSource = require('!!raw-loader!./i18n_basic');
const i18nBasicHtml = renderToHtml(I18nBasic);
const basicSnippet = [
  `useEuiI18n('filename.token', 'default value')
`,
  `<EuiI18n token="filename.token" default="default value" />
`,
];

import I18nAttribute from './i18n_attribute';
const i18nAttributeSource = require('!!raw-loader!./i18n_attribute');
const i18nAttributeHtml = renderToHtml(I18nAttribute);
const attributeSnippet = [
  `<p aria-label={useEuiI18n('filename.token', 'default value')}><!-- Text here--></p>
`,
  `<EuiI18n token="filename.token" default="default value">
  {token => <p aria-label={token}><!-- Text here--></p>}
</EuiI18n>
`,
];

import I18nMulti from './i18n_multi';
const I18nMultiSource = require('!!raw-loader!./i18n_multi');
const I18nMultiHtml = renderToHtml(I18nMulti);
const multiValueSnippet = [
  `const [label, text] = useEuiI18n(
  ['filename.label', 'filename.text'],
  ['Default Label', 'Default Text']
);
  
return <p aria-label={label}>{text}</p>;
`,
  `<EuiI18n
  tokens={['filename.label', 'filename.secontext']}
  defaults={['Default Label', 'Default Text']}>
  {([label, text]) => <p aria-label={label}>{text}</p>}
</EuiI18n>
`,
];

import I18nNumber from './i18n_number';
const I18nNumberSource = require('!!raw-loader!./i18n_number');
const I18nNumberHtml = renderToHtml(I18nNumber);
const numberSnippet = [
  `Formatted count of users: <EuiI18nNumber value={5000000} />
`,
];

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
          <strong>useEuiI18n</strong> and <strong>EuiI18n</strong> allows
          localizing string and numeric values for internationalization. There
          are two provided ways to use this: a React hook and a render prop
          component. In their simplest form, these take a{' '}
          <EuiCode>token</EuiCode> and a <EuiCode>default</EuiCode> value.{' '}
          <EuiCode>token</EuiCode> provides a reference to use when mapping to a
          localized value and <EuiCode>default</EuiCode> provides the
          untranslated value when no mapping is available.
        </p>
      ),
      snippet: basicSnippet,
      demo: <I18nBasic />,
    },
    {
      title: 'Using localized values in attributes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nAttributeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: i18nAttributeHtml,
        },
      ],
      text: (
        <p>
          Some times a localized value is needed for a prop instead of rendering
          directly to the DOM. In these cases <strong>useEuiI18n</strong> can be
          called inline, or <strong>EuiI18n</strong> can be used as a render
          prop child which is called with the localized value.
        </p>
      ),
      snippet: attributeSnippet,
      demo: <I18nAttribute />,
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
          can be retrieved from the hook or via a single render prop. In this
          case the <EuiCode>token</EuiCode>/<EuiCode>default</EuiCode> props are
          replaced by the pluralized <EuiCode>tokens</EuiCode>/
          <EuiCode>defaults</EuiCode>. Value injection is not supported when
          processing more than one token.
        </p>
      ),
      snippet: multiValueSnippet,
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
      snippet: numberSnippet,
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
