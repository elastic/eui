import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiCode } from '../../../../src/components';

import IdGenerator from './htmlIdGenerator';
import { HtmlIdGeneratorPrefix } from './htmlIdGeneratorPrefix';
import { HtmlIdGeneratorSuffix } from './htmlIdGeneratorSuffix';
import { PrefixSufix } from './bothPrefixSuffix';

const htmlIdGeneratorSource = require('!!raw-loader!./htmlIdGenerator');
const htmlIdGeneratorHtml = renderToHtml(IdGenerator);

const htmlIdGeneratorPrefixSource = require('!!raw-loader!./htmlIdGeneratorPrefix');
const htmlIdGeneratorPrefixHtml = renderToHtml(HtmlIdGeneratorPrefix);

const HtmlIdGeneratorSuffixSource = require('!!raw-loader!./htmlIdGeneratorSuffix');
const HtmlIdGeneratorSuffixHtml = renderToHtml(HtmlIdGeneratorSuffix);

const PrefixSufixSource = require('!!raw-loader!./bothPrefixSuffix');
const PrefixSufixHtml = renderToHtml(PrefixSufix);

export const HtmlIdGeneratorExample = {
  title: 'Html Id Generator',
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
          Use <EuiCode>HtmlIdGenerator</EuiCode> to generate unique ID and avoid
          accessibility issues.
        </p>
      ),
      demo: <IdGenerator />,
    },
    {
      title: 'Id Generator with prefix',
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
          Provide a <EuiCode>prefix</EuiCode> to the generator to get an ID that starts with the
          specified prefix.
        </p>
      ),
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
          Provide a <EuiCode>suffix</EuiCode> to the generator to get an ID that starts with the
          specified suffix.
        </p>
      ),
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
          HtmlIdGenerator is caplable of generating ID with specific prefix and
          suffix.
        </p>
      ),
      demo: <PrefixSufix />,
    },
  ],
};
