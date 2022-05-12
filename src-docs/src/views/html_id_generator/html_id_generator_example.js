import React from 'react';

import { GuideSectionTypes } from '../../components';
import { EuiCode } from '../../../../src/components';

import IdGenerator from './html_id_generator';
import HtmlIdGeneratorPrefix from './html_id_generator_prefix';
import HtmlIdGeneratorSuffix from './html_id_generator_suffix';
import HtmlIdGeneratorPrefixSuffix from './html_id_generator_prefix_suffix';
import HtmlIdGeneratorReuse from './html_id_generator_reuse';
import UseGeneratedHtmlId from './use_generated_html_id';
import { UseGeneratedHtmlIdProps } from './use_generated_html_id_props';

const htmlIdGeneratorSource = require('!!raw-loader!./html_id_generator');
const htmlIdGeneratorSnippet = ' htmlIdGenerator()()';

const htmlIdGeneratorPrefixSource = require('!!raw-loader!./html_id_generator_prefix');
const htmlIdGeneratorPrefixSnippet = " htmlIdGenerator('prefix')()";

const htmlIdGeneratorSuffixSource = require('!!raw-loader!./html_id_generator_suffix');
const htmlIdGeneratorSuffixSnippet = " htmlIdGenerator()('suffix')";

const htmlIdGeneratorPrefixSuffixSource = require('!!raw-loader!./html_id_generator_prefix_suffix');
const htmlIdGeneratorPrefixSuffixSnippet =
  " htmlIdGenerator('prefix')('suffix')";

const htmlIdGeneratorReuseSource = require('!!raw-loader!./html_id_generator_reuse');
const htmlIdGeneratorReuseSnippet = `  const generateId = htmlIdGenerator('prefix');
  generateId();
  generateId('suffix');`;

const useGeneratedHtmlIdSource = require('!!raw-loader!./use_generated_html_id');
const useGeneratedHtmlIdSnippet =
  'useGeneratedHtmlId({ prefix, suffix, conditionalId })';

export const HtmlIdGeneratorExample = {
  title: 'HTML ID generator',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: htmlIdGeneratorSource,
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
          code: htmlIdGeneratorSuffixSource,
        },
      ],
      text: (
        <p>
          Provide a <EuiCode>suffix</EuiCode> to the generator to get an ID that
          starts with the specified suffix.
        </p>
      ),
      snippet: htmlIdGeneratorSuffixSnippet,
      demo: <HtmlIdGeneratorSuffix />,
    },
    {
      title: 'ID generator with both prefix and suffix',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: htmlIdGeneratorPrefixSuffixSource,
        },
      ],
      text: (
        <p>
          The <EuiCode>htmlIdGenerator</EuiCode> is capable of generating an ID
          with both a specified prefix <strong>and</strong> suffix.
        </p>
      ),
      snippet: htmlIdGeneratorPrefixSuffixSnippet,
      demo: <HtmlIdGeneratorPrefixSuffix />,
    },
    {
      title: 'Reusing the generator for multiple IDs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: htmlIdGeneratorReuseSource,
        },
      ],
      text: (
        <>
          <p>
            As you may have noticed, <EuiCode>htmlIdGenerator</EuiCode> is a
            curried function. This means you can reuse the original{' '}
            <EuiCode>htmlIdGenerator()</EuiCode> call to generate multiple IDs.
            Additionally, if you pass in suffixes to your second call, the
            generated ID(s) will share the same unique ID.
          </p>
        </>
      ),
      snippet: htmlIdGeneratorReuseSnippet,
      demo: <HtmlIdGeneratorReuse />,
    },
    {
      title: 'Memoized hook for component use',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: useGeneratedHtmlIdSource,
        },
      ],
      text: (
        <>
          <p>
            <EuiCode>useGeneratedHtmlId</EuiCode> is a custom React hook that
            automatically memoizes a randomly generated ID, preventing the ID
            from regenerating on every component rerender. The ID will only
            change if the component fully unmounts/mounts, or if you dynamically
            pass in new hook arguments.
          </p>
          <p>
            Please note that unlike <EuiCode>htmlIdGenerator</EuiCode>,{' '}
            <EuiCode>useGeneratedHtmlId</EuiCode> is a single function and does
            not support generating multiple IDs that share the same unique ID.
            It is instead best used for simple one-off IDs, rather than groups
            of them.
          </p>
        </>
      ),
      snippet: useGeneratedHtmlIdSnippet,
      demo: <UseGeneratedHtmlId />,
      props: { useGeneratedHtmlId: UseGeneratedHtmlIdProps },
    },
  ],
};
