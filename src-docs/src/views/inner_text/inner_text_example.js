import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiText } from '../../../../src/components';

import InnerText from './inner_text';
const innerTextSource = require('!!raw-loader!./inner_text');
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
  title: 'Inner text',
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
            <EuiCode>{'<EuiInnerText />'}</EuiCode> - A higher order{' '}
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
      ],
      demo: <InnerText />,
      snippet: [useInnerTextSnippet, euiInnerTextSnippet],
    },
  ],
};
