import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiEmptyPrompt,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import Guidelines from './guidelines';

import emptyPromptConfig from './playground';

import EmptyPrompt from './empty_prompt';
const emptyPromptSource = require('!!raw-loader!./empty_prompt');
const emptyPromptSnippet = `<EuiEmptyPrompt
  iconType="logoSolution"
  title={<h2>Your title</h2>}
  body={<p>Content</p>}
  actions={actions}
  footer={footer}
/>`;

import Layout from './empty_prompt_layout';
const layoutSource = require('!!raw-loader!./empty_prompt_layout');
const layoutSnippet = `<EuiEmptyPrompt
  layout="horizontal"
  icon={<EuiImage size="fullWidth" src={illustration} alt="" />}
  title={<h2>Your title</h2>}
  body={<p>bodyContent</p>}
  actions={actions}
  footer={footer}
/>`;

import Simple from './simple';
const simpleSource = require('!!raw-loader!./simple');
const simpleSnippet = `<EuiEmptyPrompt
  title={<h2>Your title</h2>}
  actions={[primaryAction, secondaryAction]}
/>`;

import Panel from './empty_prompt_panel_options';

import Custom from './custom';
const customSource = require('!!raw-loader!./custom');
const customSnippet = `<EuiEmptyPrompt
  iconType="solutionApp"
  iconColor="default"
  title={<h2>Your title</h2>}
  titleSize="xs"
  body={<p>Content</p>}
  actions={actions}
/>`;

import Loading from './empty_prompt_loading';
const loadingSource = require('!!raw-loader!./empty_prompt_loading');
const loadingSnippet = `<EuiEmptyPrompt
  icon={<EuiLoadingLogo logo="logoKibana" size="xl" />}
  title={<h2>Loading</h2>}
/>`;

import Error from './empty_prompt_error';
const errorSource = require('!!raw-loader!./empty_prompt_error');
const errorSnippet = `<EuiEmptyPrompt
  color="danger"
  iconType="error"
  title={<h2>There was an error</h2>}
/>`;

import States from './empty_prompt_states';
const statesSource = require('!!raw-loader!./empty_prompt_states');

import PageTemplate from './empty_prompt_page_template';
const pageTemplateSource = require('!!raw-loader!./empty_prompt_page_template');

import MultipleTypes from './empty_prompt_multiple_types';

export const EmptyPromptExample = {
  title: 'Empty prompt',
  guidelines: <Guidelines />,
  intro: (
    <EuiText>
      <p>
        The <strong>EuiEmptyPrompt</strong> is the building block to create an
        empty state. You can use it as a placeholder for any type of empty
        content. They are especially helpful for replacing entire pages or parts
        of a product that contain no content.
      </p>
      <p>
        Be sure to read the full{' '}
        <Link to="/guidelines/empty-prompt">empty prompt usage guidelines</Link>
        .
      </p>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: emptyPromptSource,
        },
      ],
      text: (
        <>
          <p>
            While no one piece of content is required, each{' '}
            <strong>EuiEmptyPrompt</strong> should contain at least a{' '}
            <EuiCode>title</EuiCode> (wrapped in an HTML heading element) and/or
            a <EuiCode>description</EuiCode>. They usually contain one or more{' '}
            <EuiCode>actions</EuiCode> that promotes the primary
            call-to-actions. You can also provide a <EuiCode>footer</EuiCode> to
            direct users towards making informed decisions.
          </p>
        </>
      ),
      demo: <EmptyPrompt />,
      props: { EuiEmptyPrompt },
      snippet: emptyPromptSnippet,
      playground: emptyPromptConfig,
    },
    {
      title: 'Less content, more actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: simpleSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can remove parts of the prompt to simplify it. You can also
            provide an array of multiple actions. Be sure to list primary
            actions first and secondary actions as empty buttons.
          </p>
        </Fragment>
      ),
      props: { EuiEmptyPrompt },
      demo: <Simple />,
      snippet: simpleSnippet,
    },
    {
      title: 'Panel options',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              The <strong>EuiEmptyPrompt</strong> is wrapped by{' '}
              <Link to="/layout/panel">
                <strong>EuiPanel</strong>
              </Link>
              . By default, the panel is set to <EuiCode>transparent</EuiCode>{' '}
              but you can customize other panel options like{' '}
              <EuiCode>color</EuiCode>, <EuiCode>hasBorder</EuiCode> and{' '}
              <EuiCode>paddingSize</EuiCode>. Changing the{' '}
              <EuiCode>color</EuiCode> prop will also attempt to adjust the{' '}
              <EuiCode>iconColor</EuiCode> and <EuiCode>footer</EuiCode> color.
            </p>

            <p>
              Read the{' '}
              <Link to="/guidelines/empty-prompt">usage guidelines</Link> to
              better understand when to use certain panel props.
            </p>
          </EuiText>
          <EuiSpacer />
          <Panel />
        </>
      ),
    },
    {
      title: 'Title sizes and icon colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customSource,
        },
      ],
      text: (
        <p>
          Other customization options include changing the
          <EuiCode>titleSize</EuiCode> to any of the{' '}
          <Link to="/display/title">
            <strong>EuiTitle</strong> sizes
          </Link>{' '}
          and <EuiCode>iconColor</EuiCode>. When using an application or
          solution logo as the <EuiCode>iconType</EuiCode>, you can reset to the
          multi-tone colors with{' '}
          <EuiCode language="tsx">{'iconColor="default"'}</EuiCode>
        </p>
      ),
      props: { EuiEmptyPrompt },
      demo: <Custom />,
      snippet: customSnippet,
    },
    {
      title: 'Loading and error prompts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingSource,
        },
      ],
      text: (
        <>
          <p>
            Empty prompts can also be used to emulate loading and error states,
            by utilizing the same patterns.
          </p>
          <p>
            For <strong>loading</strong> states, instead of passing a{' '}
            <EuiCode>iconType</EuiCode>, you can provide a custom{' '}
            <EuiCode>icon</EuiCode> and pass in one of our{' '}
            <Link to="/display/loading">loading components</Link>.
          </p>
        </>
      ),
      props: { EuiEmptyPrompt },
      demo: <Loading />,
      snippet: loadingSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: errorSource,
        },
      ],
      text: (
        <>
          <p>
            For <strong>error</strong> states, you can simply set the{' '}
            <EuiCode>color</EuiCode> to <EuiCode>danger</EuiCode>.
          </p>
        </>
      ),
      props: { EuiEmptyPrompt },
      demo: <Error />,
      snippet: errorSnippet,
    },
    {
      title: 'Layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: layoutSource,
        },
      ],
      text: (
        <>
          <p>
            You can supply a <EuiCode>layout</EuiCode> of either{' '}
            <EuiCode>{'"horizontal"'}</EuiCode> or{' '}
            <EuiCode>{'"vertical"'}</EuiCode> with the default being{' '}
            <EuiCode>{'vertical'}</EuiCode>. When creating empty states we want
            the content to be short and straight to the point. So most of the
            time, the <EuiCode>vertical</EuiCode> layout is enough. All the
            content will be center aligned and this type of text alignment only
            works with small content.
          </p>
          <p>
            When you have longer body text with multiple calls to action, you
            can use the <EuiCode>horizontal</EuiCode> layout. This layout works
            best when you can provide a larger graphic like an illustration as
            the <EuiCode>icon</EuiCode>. For consistency, we recommend providing
            the illustration using a{' '}
            <Link to="/display/image">
              <strong>EuiImage</strong>
            </Link>{' '}
            with <EuiCode language="tsx">{'size="fullWidth"'}</EuiCode>.
          </p>
        </>
      ),
      props: { EuiEmptyPrompt },
      demo: <Layout />,
      demoPanelProps: {
        color: 'subdued',
        paddingSize: 'l',
      },
      snippet: layoutSnippet,
    },
    {
      title: 'More types of empty states',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              <strong>EuiEmptyPrompt</strong> can be used for more than just{' '}
              <strong>empty</strong> pages. The following example showcases
              different types of empty states that you can create with the{' '}
              <strong>EuiEmptyPrompt</strong>. For a full list see the{' '}
              <Link to="/guidelines/empty-prompt">usage guidelines</Link>.
            </p>
          </EuiText>
          <EuiSpacer />
          <MultipleTypes />
        </>
      ),
    },
    {
      title: 'Using in a page template',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageTemplateSource,
        },
      ],
      text: (
        <>
          <p>
            When using a <strong>EuiEmptyPrompt</strong> in a{' '}
            <Link to="/templates/page-template">
              <strong>EuiPageTemplate</strong>
            </Link>
            , we recommend using the namespaced component so the template can
            determine which how to display the empty prompt based on the rest of
            the template configuration.
          </p>
          <p>
            The following example shows the usage of the{' '}
            <Link to="/templates/page-template#empty-pages-or-content">
              <strong>EuiPageTemplate.EmptyPrompt</strong>
            </Link>{' '}
            namespaced component.
          </p>
        </>
      ),
      props: { EuiEmptyPrompt },
      demo: <PageTemplate />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statesSource,
        },
      ],
      text: (
        <>
          <p>
            You can then tie multiple types of empty states together to create a
            seamless loading to empty or loading to error experience. The
            following example shows how to encorprate these states with{' '}
            <Link to="/templates/page-template#empty-pages-or-content">
              <strong>EuiPageTemplate.EmptyPrompt</strong>
            </Link>
            .
          </p>
        </>
      ),
      props: { EuiEmptyPrompt },
      demo: (
        <div className="guideDemo__highlightLayout">
          <States />
        </div>
      ),
    },
  ],
};
