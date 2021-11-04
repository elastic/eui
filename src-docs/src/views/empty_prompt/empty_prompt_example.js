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

import PageTemplateTable from './_page_template_table';

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
  iconType="editorStrike"
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
  iconType="alert"
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
      title: 'Custom sizes and colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customSource,
        },
      ],
      text: (
        <p>
          You can control the title size and icon color with the{' '}
          <EuiCode>titleSize</EuiCode> and <EuiCode>iconColor</EuiCode> props
          respectively.
        </p>
      ),
      props: { EuiEmptyPrompt },
      demo: <Custom />,
      snippet: customSnippet,
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
            You can supply a layout of either <EuiCode>horizontal</EuiCode> or{' '}
            <EuiCode>vertical</EuiCode> with the default being{' '}
            <EuiCode>vertical</EuiCode>. When creating empty states we want the
            content to be short and straight to the point. So most of the time,
            the <EuiCode>vertical</EuiCode> layout is enough. All the content
            will be center aligned and this type of text alignment only works
            with small content.
          </p>
          <p>
            When you have longer texts or multiple calls to action, you can use
            the <EuiCode>horizontal</EuiCode> layout. However, this layout only
            works when you can provide an illustration. For consistency, we
            recommend using the illustration with a{' '}
            <Link to="/display/image">
              <strong>EuiImage</strong>
            </Link>{' '}
            with the size set to <EuiCode>{'"fullWidth"'}</EuiCode>.
          </p>
        </>
      ),
      props: { EuiEmptyPrompt },
      demo: <Layout />,
      snippet: layoutSnippet,
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
            For <strong>loading</strong> states, you can simply replace the{' '}
            <EuiCode>iconType</EuiCode> with a custom <EuiCode>icon</EuiCode> by
            passing in one of our{' '}
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
            <EuiCode>iconColor</EuiCode> to <EuiCode>danger</EuiCode> and/or
            pass <EuiCode>danger</EuiCode> to the <EuiCode>color</EuiCode> prop.
          </p>
        </>
      ),
      props: { EuiEmptyPrompt },
      demo: <Error />,
      snippet: errorSnippet,
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
            You can then tie all three states together to create a seamless
            loading to empty or loading to error experience. The following
            example shows how to encorprate these states with{' '}
            <Link to="/layout/page#simple-layout-with-centered-content">
              <strong>EuiPageTemplate</strong>
            </Link>{' '}
            using <EuiCode>{'template="centeredContent"'}</EuiCode>.
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
            <Link to="/layout/page">EuiPageTemplate</Link>, pay attention to the
            template you’re passing. The template will determine which{' '}
            <EuiCode>color</EuiCode> and <EuiCode>hasBorder</EuiCode> prop you
            should use to ensure consistency across our Elastic products.
          </p>
          <PageTemplateTable />

          <EuiSpacer size="xl" />
          <p>
            The following example shows the usage of a{' '}
            <strong>EuiEmptyPrompt</strong> in a page template where the
            template is set to <EuiCode>{'"empty"'}</EuiCode>.
          </p>
        </>
      ),
      props: { EuiEmptyPrompt },
      demo: <PageTemplate />,
    },
  ],
};
