import React from 'react';
import { GuideRule, GuideRuleTitle, GuideRuleExample } from '../../components/';

import {
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiTitle,
} from '../../../../src/components';

import imgLayoutHorizontal from '../../images/emptyPrompt__layout--horizontal.svg';
import imgLayoutVertical from '../../images/emptyPrompt__layout--vertical.svg';
import imgContent from '../../images/emptyPrompt__content.svg';

export default () => (
  <>
    <EuiText grow={false}>
      <p>
        A useful empty state will let the user know what’s happening, why it’s
        happening, and what to do about it. If done right, it can can contribute
        to a more compelling user experience and add more value to the business.
      </p>
    </EuiText>

    {/* content section */}

    <GuideRuleTitle>Anatomy</GuideRuleTitle>

    <EuiSpacer size="xl" />

    <EuiText>
      <p>
        The most important part to create an empty state is the content. It is
        the content that will lead the users to understand how there is not
        content and how to start using the app right away or making it easier
        for them to learn about what an app has to offer.
      </p>
      <p>To make the empty state clear, follow this pattern:</p>
    </EuiText>
    <EuiSpacer size="xl" />

    <EuiFlexGroup>
      <EuiFlexItem>
        <div style={{ textAlign: 'center' }}>
          <EuiImage alt="button placement in an input modal" url={imgContent} />
        </div>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText>
          <ol>
            <li>
              <strong>Illustration (optional):</strong> A meaningful
              illustration that represents the context.
            </li>
            <li>
              <strong>Title:</strong> The title will answer the question. What’s
              happening? Is it an error? Is there data?
            </li>
            <li>
              <strong>Description:</strong> Why is it happening? You can try to
              provide more information regarding why the space is empty and
              guide the user through the next actions.
            </li>
            <li>
              <strong>Action:</strong> What to do to solve the issue? It’s
              always important to lead users to take action or to guide them
              about the next steps. In an empty state, you don’t want more than
              two actions.
            </li>
            <li>
              <strong>Footer (optional):</strong> Use the footer to provide more
              helpful guidance. Use this section to reference documentation or
              to link to an area where users can learn more about the issue they
              are facing.
            </li>
          </ol>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    {/* End of Content section */}

    {/* Usage section */}
    <GuideRuleTitle>Types of empty states and goals</GuideRuleTitle>

    <EuiSpacer size="xl" />

    <EuiTable>
      <EuiTableHeader>
        <EuiTableHeaderCell>Type</EuiTableHeaderCell>
        <EuiTableHeaderCell>Description</EuiTableHeaderCell>
        <EuiTableHeaderCell>Goal</EuiTableHeaderCell>
      </EuiTableHeader>

      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>First use</EuiTableRowCell>

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
          <EuiTableRowCell isMobileFullWidth>No data</EuiTableRowCell>

          <EuiTableRowCell>
            No data is available, or the data doesn’t match the filter.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why there is no data displayed and what actions
            they can perform to make it available.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>No permission</EuiTableRowCell>

          <EuiTableRowCell>
            No permission to access the content.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why they don’t have permission to access the
            content and what actions they need to perform to get access.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>No results</EuiTableRowCell>

          <EuiTableRowCell>No results matched the search.</EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why the search didn’t match any results and what
            they can do to have better results.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>Error</EuiTableRowCell>

          <EuiTableRowCell>An error happened.</EuiTableRowCell>

          <EuiTableRowCell>
            Users understand why they’re facing an error and what they can do to
            solve the error.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>Completed tasks</EuiTableRowCell>

          <EuiTableRowCell>
            All actions/tasks are completed, and there is nothing to display.
          </EuiTableRowCell>

          <EuiTableRowCell>
            Users understand that there are no more actions to complete.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>License upgrade</EuiTableRowCell>

          <EuiTableRowCell>No license to use a feature.</EuiTableRowCell>

          <EuiTableRowCell>
            Users understand that they don’t have the required license to access
            a feature and what actions they need to perform to upgrade the
            license.
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    </EuiTable>
    {/* End of usage section */}

    {/* Design section */}
    <GuideRuleTitle>Design</GuideRuleTitle>
    <EuiText>
      <p>
        The content you have will dictate what is the layout you should use.
      </p>
    </EuiText>

    <GuideRule
      heading="Vertical vs. Horizontal"
      description="Most of the time, you just need a vertical layout. The vertical layout is perfect to use with just an icon or no icons at all. Use the horizontal layout only when you have an illustration."
    >
      <GuideRuleExample
        type="do"
        text="Use the horizontal layout when you have an illustration."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            alt="Horizontal layout with an illustration"
            url={imgLayoutVertical}
            height="252"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Never use an icon for a horizontal layout."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            alt="Icon in a horizontal layout"
            url={imgLayoutHorizontal}
            height="252"
          />
        </div>
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer size="xl" />

    <EuiTitle size="s">
      <h3>Panel</h3>
    </EuiTitle>

    <EuiSpacer />

    <EuiText>
      <p>
        The content you have will dictate what is the layout you should use.
      </p>
      <p>Use the panel colors for errors</p>
    </EuiText>

    <EuiSpacer size="xl" />

    <EuiTitle size="s">
      <h3>Illustrations</h3>
    </EuiTitle>

    <EuiSpacer />

    <EuiText>
      <p>
        An illustration is an opportunity to delight the user and show our
        Elastic brand. Use one illustration per page. Having multiple
        illustrations might make the page too crowded.
      </p>
    </EuiText>

    <EuiSpacer size="xl" />

    <EuiTitle size="s">
      <h3>Multiple empty states</h3>
    </EuiTitle>

    <EuiSpacer />

    <EuiText>
      <p>
        When having multiple empty states throughout a page avoid having
        multiple primary actions and multiple illustrations.
      </p>
    </EuiText>
    {/* End of Design section */}
  </>
);
