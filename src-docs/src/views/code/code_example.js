import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Code from './code';
const codeSource = require('!!raw-loader!./code');
const codeHtml = renderToHtml(Code);

import CodeBlock from './code_block';
const codeBlockSource = require('!!raw-loader!./code_block');
const codeBlockHtml = renderToHtml(CodeBlock);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Code"
      source={[{
        type: GuideSectionTypes.JS,
        code: codeSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: codeHtml,
      }]}
      text={
        <p>
          Description needed: how to use the <EuiCode>Code</EuiCode> component.
        </p>
      }
      demo={
        <Code />
      }
    />

    <GuideSection
      title="CodeBlock"
      source={[{
        type: GuideSectionTypes.JS,
        code: codeBlockSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: codeBlockHtml,
      }]}
      text={
        <div>
          <p>
            <EuiCode>EuiCodeBlock</EuiCode> can be used to create multi-line code blocks.
            You can pass them a couple props for styling:
          </p>
          <ul>
            <li><EuiCode>language</EuiCode> sets the syntax highlighting for a specific language.</li>
            <li><EuiCode>color</EuiCode> accepts dark (default) or light.</li>
            <li><EuiCode>paddingSize</EuiCode> accepts "s" / "m" / "l" (default).</li>
            <li><EuiCode>fontSize</EuiCode> accepts "s" (default) / "m" / "l".</li>
            <li><EuiCode>overflowHeight</EuiCode> accepts a number. By default it is not set.</li>
          </ul>
        </div>
      }
      demo={
        <CodeBlock />
      }
    />
  </GuidePage>
);
