import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiI18n,
  EuiContext,
  EuiLink,
  EuiCallOut,
} from '../../../../src/components';

import I18nBasic from './i18n_basic';
const i18nBasicSource = require('!!raw-loader!./i18n_basic');
const basicSnippet = [
  `useEuiI18n('filename.token', 'default value')
`,
  `<EuiI18n token="filename.token" default="default value" />
`,
];

import I18nInterpolation from './i18n_interpolation';
const i18nInterpolationSource = require('!!raw-loader!./i18n_interpolation');
const interpolationSnippet = [
  `useEuiI18n('filename.greeting', 'Hello, {planet}', { planet: 'world' })
`,
  `<EuiI18n
  token="filename.greeting"
  default="Hello, {planet}"
  values={{
    planet: 'world'
  }}
/>
`,
];

import I18nAttribute from './i18n_attribute';
const i18nAttributeSource = require('!!raw-loader!./i18n_attribute');
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
const numberSnippet = [
  `Formatted count of users: <EuiI18nNumber value={5000000} />
`,
];

import Context from './context';
const contextSource = require('!!raw-loader!./context');

import { I18nShapeProps } from './props';
export const I18nExample = {
  title: 'I18n',
  sections: [
    {
      text: (
        <>
          <p>
            Translations for EUI components can be provided globally in an
            application via <strong>EuiContext</strong>,{' '}
            <EuiLink href="#/utilities/i18n%23context">
              documented below
            </EuiLink>
            . A list of all <EuiCode>tokens</EuiCode> —also usually called ids—
            can be found in the{' '}
            <EuiLink href="/#/package/i18n-tokens">I18n tokens</EuiLink> page.
          </p>
          <p>
            While developing an EUI component, any text that is included by
            default must be translatable. <strong>EuiI18n</strong> is the proper
            way to do this. Examples of such text are the{' '}
            <EuiCode>aria-label</EuiCode> in the clear button of{' '}
            <EuiLink href="/#/forms/combo-box">
              <strong>EuiComboBox</strong>
            </EuiLink>
            , or the visible text in{' '}
            <EuiLink href="/#/navigation/pagination%23compressed-and-responsive">
              <strong>EuiPagination</strong>
            </EuiLink>{' '}
            compressed e.g. "1 of 24".
          </p>
          <EuiCallOut
            iconType="alert"
            color="warning"
            title="These utilities are mostly internal"
          >
            <p>
              The purpose of these utilities is to allow internationalizing EUI
              components. This is not a full-fledged solution for
              internationalizing your app.
            </p>
          </EuiCallOut>
        </>
      ),
    },
    {
      title: 'Internationalization',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nBasicSource,
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
      title: 'Interpolation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nInterpolationSource,
        },
      ],
      text: (
        <p>
          <strong>useEuiI18n</strong> and <strong>EuiI18n</strong> support
          variable interpolation. In a translation like{' '}
          <EuiCode>{'Signed in as {name} ({email})'}</EuiCode>, two values can
          be interpolated (<EuiCode>name</EuiCode> and <EuiCode>email</EuiCode>
          ). These values can be specified by passing a{' '}
          <EuiCode>values</EuiCode> prop to <strong>EuiI18n</strong>, or by
          passing an object of values as the third argument to{' '}
          <strong>useEuiI18n</strong>. Interpolation values can be passed as a
          string, number, or a React Component.
        </p>
      ),
      snippet: interpolationSnippet,
      demo: <I18nInterpolation />,
    },
    {
      title: 'Using localized values in attributes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: i18nAttributeSource,
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
