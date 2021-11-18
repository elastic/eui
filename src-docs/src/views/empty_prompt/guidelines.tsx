import React from 'react';
// @ts-ignore Importing from JS
import { GuideRule, GuideRuleExample, GuideRuleTitle } from '../../components';

import {
  EuiTitle,
  EuiText,
  EuiSpacer,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiAspectRatio,
  EuiImage,
} from '../../../../src/components';

import vertical from '../../images/empty-prompt_vertical.svg';
import horizontal from '../../images/empty-prompt_horizontal.svg';

export default () => (
  <>
    {/* content section */}
    <EuiTitle>
      <h2>Anatomy</h2>
    </EuiTitle>
    <EuiSpacer size="xl" />

    <EuiText>
      <p>
        A useful empty state will let the user know what’s happening, why it’s
        happening, and what to do about it. If done right, it can can contribute
        to a more compelling user experience and add more value to the business.
      </p>
      <p>To make the empty state clear, follow this pattern:</p>
    </EuiText>

    <EuiSpacer size="l" />

    <EuiAspectRatio width={2} height={1}>
      <iframe
        title="Anatomy of an empty state"
        width="1200"
        height="550"
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FRzfYLj2xmH9K7gQtbSKygn%2FElastic-UI%3Fnode-id%3D22764%253A276515"
      />
    </EuiAspectRatio>

    <EuiSpacer size="xl" />

    <EuiText>
      <ol>
        <li>
          <strong>Icon/illustration (optional):</strong> A meaningful icon or
          illustration that represents the solution or context.
        </li>
        <li>
          <strong>Title:</strong> The title will answer the question. What’s
          happening? Is it an error? Is there data?
        </li>
        <li>
          <strong>Description:</strong> Why is it happening? Try to provide more
          information regarding why the space is empty and guide the user
          through next actions.
        </li>
        <li>
          <strong>Action(s):</strong> What will solve the issue? It’s always
          important to lead users to take action or to guide them about the next
          steps.
        </li>
        <li>
          <strong>Footer (optional):</strong> Use the footer to provide more
          helpful guidance. Use this section to reference documentation or to
          link to an area where users can learn more about the issue they are
          facing.
        </li>
      </ol>
    </EuiText>
    {/* End of Content section */}
    {/* Types of empty states and goals section */}
    <GuideRuleTitle>Types of empty states and goals</GuideRuleTitle>
    <EuiSpacer size="xl" />

    <EuiText>
      <p>
        But how do you know when you should create an empty state? These are the
        scenarios we recommend the usage of an empty state:
      </p>
    </EuiText>
    <EuiSpacer size="xl" />

    <EuiTable>
      <EuiTableHeader>
        <EuiTableHeaderCell width="200px">Type</EuiTableHeaderCell>
        <EuiTableHeaderCell>Description</EuiTableHeaderCell>
        <EuiTableHeaderCell>Goal</EuiTableHeaderCell>
      </EuiTableHeader>

      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>First use</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>
            No content on screen because it is the first time users are
            interacting with that screen.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand there’s no data because it is the first time they
            interact with the app. They can clearly understand how to add data.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>No data</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>
            No data is available, or the data doesn’t match the filter.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why there is no data displayed and what actions
            they can perform to make it available.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>No permission</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>
            No permission to access the content.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why they don’t have permission to access the
            content and what actions they need to perform to get access.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>No results</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>No results matched the search.</EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why the search didn’t match any results and what
            they can do to have better results.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>Error</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>An error happened.</EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why they’re facing an error and what they can do to
            solve the error.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>Completed tasks</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>
            All actions/tasks are completed, and there is nothing to display.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand that there are no more actions to complete.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>License upgrade</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>No license to use a feature.</EuiTableRowCell>

          <EuiTableRowCell>
            Users understand that they don’t have the required license to access
            a feature and what actions they need to perform to upgrade the
            license.
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    </EuiTable>

    <EuiSpacer size="xl" />
    {/* End of Types of empty states and goals section */}

    {/* Design section */}
    <EuiTitle>
      <h2>Design</h2>
    </EuiTitle>

    <GuideRule
      heading="Vertical vs. Horizontal"
      description={
        <>
          <p>
            Most of the time, you just need a vertical layout. The vertical
            layout is perfect when the content is small. A title and the
            description are no longer than 2 paragraphs. You can use this layout
            with just an icon, an illustration or no icons at all.
          </p>
          <p>
            Use the horizontal layout when you have large contents. When a
            description has at least two paragraphs, multiple call to actions
            and possibly a footer. For this type of layout an illustration is
            required.
          </p>
        </>
      }
    >
      <GuideRuleExample
        text="Use the vertical layout when the content is small."
        minHeight="280px"
      >
        <EuiImage alt="Vertical layout" url={vertical} height="252" />
      </GuideRuleExample>
      <GuideRuleExample
        text="Use the horizontal layout when you have large contents and you can provide an illustration."
        minHeight="280px"
      >
        <EuiImage alt="Horizontal layout" url={horizontal} height="252" />
      </GuideRuleExample>
    </GuideRule>
    {/* End of Design section */}
  </>
);
