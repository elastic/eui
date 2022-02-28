import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { EuiCode, EuiText, EuiSpacer } from '../../../../src/components';
import Guidelines from './guidelines';
import EmptyPrompt from './empty_prompt';
import Layout from './empty_prompt_layout';
import Simple from './empty_prompt_simple';
import Panel from './empty_prompt_panel_options';
import Custom from './custom';
import Loading from './empty_prompt_loading';
import Error from './empty_prompt_error';
import States from './empty_prompt_states';
import PageTemplateTable from './_page_template_table';
import PageTemplate from './empty_prompt_page_template';
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
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              While no one piece of content is required, each{' '}
              <strong>EuiEmptyPrompt</strong> should contain at least a{' '}
              <EuiCode>title</EuiCode> (wrapped in an HTML heading element)
              and/or a <EuiCode>description</EuiCode>. They usually contain one
              or more <EuiCode>actions</EuiCode> that promotes the primary
              call-to-actions. You can also provide a <EuiCode>footer</EuiCode>{' '}
              to direct users towards making informed decisions.
            </p>
          </EuiText>
          <EmptyPrompt />
        </>
      ),
    },
    {
      title: 'Less content, more actions',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              You can remove parts of the prompt to simplify it. You can also
              provide an array of multiple actions. Be sure to list primary
              actions first and secondary actions as empty buttons.
            </p>
          </EuiText>
          <Simple />
        </>
      ),
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
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              Other customization options include changing the
              <EuiCode>titleSize</EuiCode> to any of the{' '}
              <Link to="/display/title">
                <strong>EuiTitle</strong> sizes
              </Link>{' '}
              and <EuiCode>iconColor</EuiCode>. When using an application or
              solution logo as the <EuiCode>iconType</EuiCode>, you can reset to
              the multi-tone colors with{' '}
              <EuiCode language="tsx">{'iconColor="default"'}</EuiCode>
            </p>
          </EuiText>
          <Custom />
        </>
      ),
    },
    {
      title: 'Loading and error prompts',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              Empty prompts can also be used to emulate loading and error
              states, by utilizing the same patterns.
            </p>
            <p>
              For <strong>loading</strong> states, instead of passing a{' '}
              <EuiCode>iconType</EuiCode>, you can provide a custom{' '}
              <EuiCode>icon</EuiCode> and pass in one of our{' '}
              <Link to="/display/loading">loading components</Link>.
            </p>
          </EuiText>
          <Loading />
        </>
      ),
    },
    {
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              For <strong>error</strong> states, you can simply set the{' '}
              <EuiCode>color</EuiCode> to <EuiCode>danger</EuiCode>.
            </p>
          </EuiText>
          <Error />
        </>
      ),
    },
    {
      title: 'Layout',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              You can supply a <EuiCode>layout</EuiCode> of either{' '}
              <EuiCode>{'"horizontal"'}</EuiCode> or{' '}
              <EuiCode>{'"vertical"'}</EuiCode> with the default being{' '}
              <EuiCode>{'vertical'}</EuiCode>. When creating empty states we
              want the content to be short and straight to the point. So most of
              the time, the <EuiCode>vertical</EuiCode> layout is enough. All
              the content will be center aligned and this type of text alignment
              only works with small content.
            </p>
            <p>
              When you have longer body text with multiple calls to action, you
              can use the <EuiCode>horizontal</EuiCode> layout. This layout
              works best when you can provide a larger graphic like an
              illustration as the <EuiCode>icon</EuiCode>. For consistency, we
              recommend providing the illustration using a{' '}
              <Link to="/display/image">
                <strong>EuiImage</strong>
              </Link>{' '}
              with <EuiCode language="tsx">{'size="fullWidth"'}</EuiCode>.
            </p>
          </EuiText>
          <EuiSpacer />
          <Layout />
        </>
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
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              When using a <strong>EuiEmptyPrompt</strong> in a{' '}
              <Link to="/layout/page">EuiPageTemplate</Link>, pay attention to
              the template you’re passing. The template will determine which{' '}
              <EuiCode>color</EuiCode> and <EuiCode>hasBorder</EuiCode> prop you
              should use to ensure consistency across our Elastic products.
            </p>
          </EuiText>

          <PageTemplateTable />

          <EuiSpacer size="xl" />

          <EuiText>
            <p>
              The following example shows the usage of a{' '}
              <strong>EuiEmptyPrompt</strong> in a page template where the
              template is set to <EuiCode>{'"empty"'}</EuiCode>.
            </p>
          </EuiText>

          <PageTemplate />
        </>
      ),
    },
    {
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              You can then tie multiple types of empty states together to create
              a seamless loading to empty or loading to error experience. The
              following example shows how to encorprate these states with{' '}
              <Link to="/layout/page#simple-layout-with-centered-content">
                <strong>EuiPageTemplate</strong>
              </Link>{' '}
              using <EuiCode>{'template="centeredContent"'}</EuiCode>.
            </p>
          </EuiText>
          <States />
        </>
      ),
    },
  ],
};
