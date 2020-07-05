import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiMarkdownEditor,
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiDescriptionList,
  EuiHorizontalRule,
  EuiCodeBlock,
  EuiCode,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownEditorWithPlugins from './markdown_editor_with_plugins';
const markdownEditorWithPluginsSource = require('!!raw-loader!./markdown_editor_with_plugins');
const markdownEditorWithPluginsHtml = renderToHtml(MarkdownEditorWithPlugins);

const pluginSnippet = `<EuiMarkdownEditor
  uiPlugin={myPluginUI}
  parsingPlugin={myPluginParsing}
  processingPlugin={myPluginProcessing}
  {..otherProps}
/>`;

const uiPluginSnippet = `const myPluginUI = {
  name: 'myPlugin',
  button: {
    label: 'Chart',
    iconType: 'visArea',
  },
  helpText: (<div />),
  editor: function editor({ node, onSave, onCancel }) { return ('something'); },
}; `;

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
      <EuiHorizontalRule />
      <EuiTitle>
        <h3>Plugin development</h3>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiText>
        <p>
          An <strong>EuiMarkdown plugin</strong> is comprised of three major
          pieces, which are passed searpately into the editor component.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCodeBlock size="s" language="html">
        {pluginSnippet}
      </EuiCodeBlock>
      <EuiSpacer />
      <EuiDescriptionList
        compressed
        listItems={pluginConcepts}
        type="responsiveColumn"
        titleProps={{ style: { width: '20%' } }}
        descriptionProps={{ style: { width: '80%' } }}
      />
      <EuiSpacer />
      <EuiHorizontalRule size="s" />
      <EuiTitle>
        <h3>uiPlugin</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiCodeBlock size="s" language="javascript">
        {uiPluginSnippet}
      </EuiCodeBlock>
      <EuiSpacer />
      <EuiDescriptionList
        compressed
        listItems={uiPluginConcepts}
        type="responsiveColumn"
        titleProps={{ style: { width: '20%' } }}
        descriptionProps={{ style: { width: '80%' } }}
      />
      <EuiSpacer />
      <EuiHorizontalRule size="s" />
      <EuiTitle>
        <h3>parsingPlugin</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiText>
        <Fragment>
          <p>
            <Link to="https://www.npmjs.com/package/remark-parse">
              Remark-parse
            </Link>{' '}
            is used to parse the input text into markdown AST nodes. Its
            documentation for{' '}
            <Link to="https://www.npmjs.com/package/remark-parse#extending-the-parser">
              writing parsers
            </Link>{' '}
            is under the Extending the Parser section, but highlights are
            included below.
          </p>

          <p>
            A parser is comprised of three pieces. There is a wrapping function
            which is provided to remark-parse and injects the parser, the parser
            method itself, and a locator function if the markdown tag is inline.
          </p>

          <p>
            The parsing method is called at locations where its markdown down
            might be found at. The method is responsible for determining if the
            location is a valid tag, process the tag, and mark report the
            result.
          </p>

          <h4>Inline vs block</h4>
          <p>
            Inline tags are allowed at any point in text, and will be rendered
            somewhere within a <EuiCode>{'<p>'}</EuiCode> element. For better
            performance, inline parsers must provide a locate method which
            reports the location where their next tag might be found. They are
            not allowed to span multiple lines of the input.
          </p>

          <p>
            Block tags are rendered inside <EuiCode>{'<span>'}</EuiCode>{' '}
            elements, and do not have a locate method. They can consume as much
            input text as desired, across multiple lines.
          </p>
        </Fragment>
      </EuiText>
      <EuiSpacer />

      <EuiCodeBlock size="s" language="javascript">
        Chandler, a simple parser example here maybe?
      </EuiCodeBlock>
      <EuiSpacer />
      <EuiHorizontalRule size="s" />
      <EuiTitle>
        <h3>processingPlugin</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiText>
        <p>This needs some explanation</p>
      </EuiText>
      <EuiSpacer />
      <EuiCodeBlock size="s" language="javascript">
        Chandler, a simple processingPluginList example
      </EuiCodeBlock>
      <EuiSpacer size="xxl" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownEditorWithPluginsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorWithPluginsHtml,
        },
      ],
      title: 'Putting it all together: a simple chart plugin',
      text: (
        <p>
          The below example takes the concepts from above to construct a simple
          chart embed that is initiated from a new button in the editor toolbar.
        </p>
      ),
      props: {
        EuiMarkdownEditor,
      },
      demo: <MarkdownEditorWithPlugins />,
    },
  ],
};
