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
import PanelColorPicker from './_panel_color_picker';

import vertical from '../../images/empty-prompt_vertical.svg';
import horizontal from '../../images/empty-prompt_horizontal.svg';
import iconDont from '../../images/empty-prompt_icon-dont.svg';
import multipleDo from '../../images/empty-prompt_multiple-do.svg';
import multipleDont from '../../images/empty-prompt_multiple-dont.svg';

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
        <EuiTableHeaderCell>Type</EuiTableHeaderCell>
        <EuiTableHeaderCell>Description</EuiTableHeaderCell>
        <EuiTableHeaderCell>Goal</EuiTableHeaderCell>
        <EuiTableHeaderCell>Action</EuiTableHeaderCell>
      </EuiTableHeader>

      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>No data</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>
            No data is available, or the data doesn’t match the filter. First
            time use.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why there is no data displayed and what actions
            they can perform to make it available.
          </EuiTableRowCell>

          <EuiTableRowCell>Add data</EuiTableRowCell>
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

          <EuiTableRowCell>Request permission</EuiTableRowCell>
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

          <EuiTableRowCell>
            Refresh / try again / reformat data or action specific to error
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

          <EuiTableRowCell>
            Reset filter or push to adjust them / Redirect to filters or search
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell mobileOptions={{ width: '100%' }}>
            <strong>Error page</strong>
          </EuiTableRowCell>

          <EuiTableRowCell>
            The error pages come from client and server errors — the 4xx and 5xx
            status code classes.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand there is a client or server error and what is the
            status code.
          </EuiTableRowCell>

          <EuiTableRowCell>Go home / go back</EuiTableRowCell>
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

          <EuiTableRowCell>Start trial / upgrade license</EuiTableRowCell>
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
            description are no longer than two paragraphs. You can use this
            layout with just an icon, an illustration or no icons at all.
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

    <GuideRule
      heading="Panel colors"
      description={
        <>
          <p>
            Most of the time you just need the plain color with or without a
            border considering what is the page layout you’re currently on.
          </p>
          <p>
            In a few scenarios you can consider some color alternatives. Use the
            following helper tool to find what is the best panel color to use
            based on your use case.
          </p>
        </>
      }
    />

    <EuiSpacer size="xl" />

    <PanelColorPicker />

    <GuideRule
      heading="Icons and illustrations"
      description={
        <>
          <p>
            Icons and illustrations must first and foremost communicate meaning.
            They are also an opportunity to delight users and show our Elastic
            brand.
          </p>
          <p>
            When using an illustration bear in mind that they stand out a lot.
            Use one illustration per page. Having multiple illustrations might
            make the page too crowded.
          </p>
        </>
      }
    >
      <GuideRuleExample
        type="do"
        text="An illustration works better in a horizontal layout."
        minHeight="280px"
      >
        <EuiImage alt="Horizontal layout" url={horizontal} height="252" />
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Avoid using icons and illustrations that don't mean anything and are not related with the content."
        minHeight="280px"
      >
        <EuiImage alt="No meaningful icon" url={iconDont} height="252" />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Multiple empty states "
      description={
        <>
          <p>
            <p>
              When having multiple empty states throughout a page, avoid having
              multiple primary actions and multiple icons/illustrations.
            </p>
          </p>
          <p>
            Use secondary actions and no icons/illustrations. This way the
            visual noise will be reduced and Consider using an illustration or a
            primary action if you want to make one of the empty states stand
            out.
          </p>
        </>
      }
    >
      <GuideRuleExample
        type="do"
        text="Only use an illustration or a primary action in case you want to make one of the empty states stand out."
        minHeight="280px"
      >
        <EuiImage alt="Vertical layout" url={multipleDo} height="252" />
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Avoid multiple primary actions and multiple icons/illustrations as they create too much visual noise."
        minHeight="280px"
      >
        <EuiImage
          alt="Multiple empty states with primary actions and icons/illustrations"
          url={multipleDont}
          height="252"
        />
      </GuideRuleExample>
    </GuideRule>
    {/* End of Design section */}
  </>
);
