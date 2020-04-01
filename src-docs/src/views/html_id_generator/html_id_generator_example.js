import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiCode } from '../../../../src/components';

import IdGenerator from './html_id_generator';
import { HtmlIdGeneratorPrefix } from './html_id_generator_prefix';
import { HtmlIdGeneratorSuffix } from './html_id_generator_suffix';
import { PrefixSufix } from './bothPrefixSuffix';

const htmlIdGeneratorSource = require('!!raw-loader!./html_id_generator');
const htmlIdGeneratorHtml = renderToHtml(IdGenerator);
const htmlIdGeneratorSnippet = ' htmlIdGenerator()()';

const htmlIdGeneratorPrefixSource = require('!!raw-loader!./html_id_generator_prefix');
const htmlIdGeneratorPrefixHtml = renderToHtml(HtmlIdGeneratorPrefix);
const htmlIdGeneratorPrefixSnippet = " htmlIdGenerator('prefix')()";

const HtmlIdGeneratorSuffixSource = require('!!raw-loader!./html_id_generator_suffix');
const HtmlIdGeneratorSuffixHtml = renderToHtml(HtmlIdGeneratorSuffix);
const suffixSnippet = " htmlIdGenerator()('suffix')";

const PrefixSufixSource = require('!!raw-loader!./bothPrefixSuffix');
const PrefixSufixHtml = renderToHtml(PrefixSufix);
const prefixSuffixSnippet = " htmlIdGenerator('prefix')('suffix')";

export const HtmlIdGeneratorExample = {
  title: 'HTML ID Generator',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: htmlIdGeneratorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: htmlIdGeneratorHtml,
        },
      ],
      text: (
        <p>
          Use <EuiCode>htmlIdGenerator()()</EuiCode> to generate unique IDs for
          elements with an optional <EuiCode>prefix</EuiCode> and/or{' '}
          <EuiCode>suffix</EuiCode>. The first call to{' '}
          <EuiCode>htmlIdGenerator</EuiCode> accepts the prefix as an optional
          argument and returns a second function which accepts an optional
          suffix and returns the generated ID.
        </p>
      ),
      snippet: htmlIdGeneratorSnippet,
      demo: <IdGenerator />,
    },
    {
      title: 'ID generator with prefix',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: htmlIdGeneratorPrefixSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: htmlIdGeneratorPrefixHtml,
        },
      ],
      text: (
        <p>
          Provide a <EuiCode>prefix</EuiCode> to the generator to get an ID that
          starts with the specified prefix.
        </p>
      ),
      snippet: htmlIdGeneratorPrefixSnippet,
      demo: <HtmlIdGeneratorPrefix />,
    },
    {
      title: 'ID generator with suffix',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: HtmlIdGeneratorSuffixSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: HtmlIdGeneratorSuffixHtml,
        },
      ],
      text: (
        <p>
          Provide a <EuiCode>suffix</EuiCode> to the generator to get an ID that
          starts with the specified suffix.
        </p>
      ),
      snippet: suffixSnippet,
      demo: <HtmlIdGeneratorSuffix />,
    },
    {
      title: 'ID generator with both prefix and suffix',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PrefixSufixSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: PrefixSufixHtml,
        },
      ],
      text: (
        <p>
          The <EuiCode>htmlIdGenerator</EuiCode> is capable of generating an ID
          with both a specified prefix <strong>and</strong> suffix.
        </p>
      ),
      snippet: prefixSuffixSnippet,
      demo: <PrefixSufix />,
    },
  ],
};
