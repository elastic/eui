import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiMarkdownFormat,
  EuiText,
  EuiSpacer,
  EuiDescriptionList,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownFormat from './markdown_format';
const markdownFormatSource = require('!!raw-loader!./markdown_format');
const markdownFormatHtml = renderToHtml(MarkdownFormat);

const pluginConcepts = [
  {
    title: 'uiPlugin',
    description: (
      <span>
        Provides the <strong>UI</strong> for the button in the toolbar as well
        as any modals or extra UI that provides content to the editor.
      </span>
    ),
  },
  {
    title: 'parsingPlugin',
    description: (
      <span>
        Provides the logic to identify the new syntax and parse it into an{' '}
        <strong>AST node</strong>.
      </span>
    ),
  },
  {
    title: 'processingPlugin',
    description: (
      <span>
        Provides the logic to process the new <strong>AST node</strong> into a{' '}
        <strong>React node</strong>.
      </span>
    ),
  },
];

const uiPluginConcepts = [
  {
    title: 'name',
    description: (
      <span>
        The name of your plugin. Use the <strong>button.label</strong> listed
        below if you need a more friendly display name. The button can be
        ommitted if you wish the user to only utilize syntax to author the
        content.
      </span>
    ),
  },
  {
    title: 'button',
    description: (
      <span>
        Takes a <strong>label</strong> and an <strong>icon type</strong>. This
        forms the button that appear in the toolbar. Clicking the button will
        trigger either the <strong>editor</strong> or <strong>formatter</strong>
        .
      </span>
    ),
  },
  {
    title: 'editor',
    description: (
      <span>
        Provides UI controls (like an interactive modal) for how to build the
        inital content. <strong>Must exist if formatting does not</strong>.
      </span>
    ),
  },
  {
    title: 'formatter',
    description: (
      <span>
        If no <strong>editor</strong> is provided, a React component can be
        providing to handle formatting.
      </span>
    ),
  },
  {
    title: 'helpText',
    description: (
      <span>
        Contains a React node. Should contain some information and an example
        for how to utlize the syntax. Appears when the markdown icon is clicked
        on the bottom of the editor.
      </span>
    ),
  },
];

export const MarkdownPluginExample = {
  title: 'Markdown plugins',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          Both{' '}
          <strong>
            <Link to="/editors-syntax/markdown-editor/">EuiMarkdownEditor</Link>
          </strong>{' '}
          and{' '}
          <strong>
            <Link to="/editors-syntax/markdown-format/">EuiMarkdownFormat</Link>
          </strong>{' '}
          utilize the same underlying plugin architecture to transform string
          based syntax into React components. At a high level{' '}
          <Link to="">Unified JS</Link> is used in comination with{' '}
          <Link to="">Remark</Link> to provide EUI&apos;s markdown components,
          which are separated into a <strong>parsing</strong> and{' '}
          <strong>processing</strong> layer. These two concepts are kept
          distinct in EUI components to provide concrete locations for your
          plugins to be injected, be it editing or rendering. Finally you
          provide <strong>UI</strong> to the component to handle interactions
          with the editor.
        </p>
        <p>
          In addition to running the full pipeline,{' '}
          <strong>EuiMarkdownEditor</strong> uses just the parsing configuration
          to determine the input&apos;s validity, provide messages back to the
          application, and allow the toolbar buttons to interact with existing
          markdown tags.
        </p>
      </EuiText>
      <EuiSpacer size="xxl" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownFormatHtml,
        },
      ],
      title: 'Plugin development',
      text: (
        <Fragment>
          <p>
            An <strong>EuiMarkdown plugin</strong> is comprised of three major
            pieces, which are passed searpately into the editor component.
          </p>
          <EuiDescriptionList
            compressed
            listItems={pluginConcepts}
            type="responsiveColumn"
            titleProps={{ style: { width: '20%' } }}
            descriptionProps={{ style: { width: '80%' } }}
          />
          <h3>uiPlugin</h3>
          <EuiDescriptionList
            compressed
            listItems={uiPluginConcepts}
            type="responsiveColumn"
            titleProps={{ style: { width: '20%' } }}
            descriptionProps={{ style: { width: '80%' } }}
          />
        </Fragment>
      ),
      props: {
        EuiMarkdownFormat,
      },
      demo: <MarkdownFormat />,
    },
  ],
};
