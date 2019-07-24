import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSpacer, EuiText } from '../../../../src/components';

import InnerText from './inner_text';
const innerTextSource = require('!!raw-loader!./inner_text');
const innerTextHtml = renderToHtml(InnerText);
const useInnerTextSnippet = `const [ref, innerText] = useInnerText();
<span ref={ref} title={innerText}>
  Content
</span>`;
const euiInnerTextSnippet = `<EuiInnerText>
  {(ref, innerText) => (
    <span ref={ref} title={innerText}>
      Content
    </span>
  )}
</EuiInnerText>`;

export const InnerTextExample = {
  title: 'Inner Text',
  intro: (
    <React.Fragment>
      <EuiText>
        <p>
          For instances where accessing the text content of a component that may
          be wrapped or interspersed with other components, two utilities are
          available:
        </p>
        <ul>
          <li>
            <EuiCode>useInnerText</EuiCode> - A custom React hook, usable in
            function components
          </li>
          <li>
            <EuiCode>EuiInnerText</EuiCode> - A higher order{' '}
            <EuiCode>useInnerText</EuiCode> component for use in class
            components
          </li>
        </ul>
        <p>
          Both utilities make available a <EuiCode>ref</EuiCode> reference to
          add to the target DOM element, and the resulting{' '}
          <EuiCode>innerText</EuiCode> value to use as needed.
        </p>
      </EuiText>
      <EuiSpacer />
    </React.Fragment>
  ),
  sections: [
    {
      title: 'Rendered',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: innerTextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: innerTextHtml,
        },
      ],
      demo: <InnerText />,
      snippet: [useInnerTextSnippet, euiInnerTextSnippet],
    },
  ],
};
