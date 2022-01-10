import React from 'react';
// @ts-ignore Importing from JS
import { GuideRule, GuideRuleExample, GuideRuleTitle } from '../../components';

import {
  EuiTitle,
  EuiText,
  EuiSpacer,
  EuiAspectRatio,
  EuiImage,
} from '../../../../src/components';
import TypesOfEmptyStates from './_types_of_empty_states';

import vertical from '../../images/empty-prompt/vertical.svg';
import horizontal from '../../images/empty-prompt/horizontal.svg';
import iconDont from '../../images/empty-prompt/icon-dont.svg';
import multipleDo from '../../images/empty-prompt/multiple-do.svg';
import multipleDont from '../../images/empty-prompt/multiple-dont.svg';
import inlineLink from '../../images/empty-prompt/inline-link.svg';

export default () => (
  <>
    {/* content section */}
    <EuiTitle>
      <h2>Anatomy</h2>
    </EuiTitle>
    <EuiSpacer size="xl" />

    <EuiText grow={false}>
      <p>
        A useful empty state will let the user know what&apos;s happening, why
        it&apos;s happening, and what to do about it. It can contribute to a
        more compelling user experience and add more value to the business if
        done right.
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

    <EuiText grow={false}>
      <ol>
        <li>
          <strong>Icon or illustration (optional):</strong> A meaningful icon or
          illustration representing the solution or context.
        </li>
        <li>
          <strong>Title:</strong> The title will answer the question.
          What&apos;s happening? Is it an error? Is there data?
        </li>
        <li>
          <strong>Description:</strong> Why is it happening? Explain why the
          space is empty and guide the user through the required actions.
        </li>
        <li>
          <strong>Call to action:</strong> What will solve the issue? It&apos;s
          always important to lead users to take action or guide them about the
          next steps.
        </li>
        <li>
          <strong>Footer (optional):</strong>Use this section to reference
          documentation or link to an area where users can learn more about the
          issue they are facing.
        </li>
      </ol>
    </EuiText>
    {/* End of Content section */}

    {/*  Types of empty states; goals and recommendations section */}
    <GuideRuleTitle>
      Types of empty states; goals and recommendations
    </GuideRuleTitle>
    <EuiSpacer size="xl" />

    <EuiText grow={false}>
      <p>
        The following scenarios detail the most common empty states use cases
        and provide recommendations for use with{' '}
        <strong>EuiPageTemplate</strong>.
      </p>
    </EuiText>
    <EuiSpacer size="xl" />

    <TypesOfEmptyStates />

    <EuiSpacer size="xl" />
    {/* End of Types of empty states; goals and recommendations section */}

    {/* Design section */}
    <EuiTitle>
      <h2>Design</h2>
    </EuiTitle>

    <GuideRule
      heading="Vertical vs. Horizontal"
      description={
        <>
          <p>
            This layout is perfect when the content is small—a title and two
            paragraphs at most. You can use this layout with just an icon, an
            illustration, or no icons at all.
          </p>
          <p>
            Use the horizontal layout when you have a long description, multiple
            calls to action, and possibly a footer. For this type of layout, an
            illustration is required.
          </p>
        </>
      }
    >
      <GuideRuleExample
        text="Use the vertical layout when the content is small."
        minHeight={280}
      >
        <EuiImage alt="Vertical layout" url={vertical} height="252" />
      </GuideRuleExample>
      <GuideRuleExample
        text="Use the horizontal layout when you have a long description, and you can provide an illustration."
        minHeight={280}
      >
        <EuiImage alt="Horizontal layout" url={horizontal} height="252" />
      </GuideRuleExample>
    </GuideRule>

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
            When using an illustration, bear in mind that they stand out a lot.
            Use one illustration per page. Having multiple illustrations might
            make the page too crowded.
          </p>
        </>
      }
    >
      <GuideRuleExample
        type="do"
        text="An illustration works better in a horizontal layout."
        minHeight={280}
      >
        <EuiImage alt="Horizontal layout" url={horizontal} height="252" />
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Avoid using icons and illustrations that don't mean anything and are not related to the content."
        minHeight={280}
      >
        <EuiImage alt="No meaningful icon" url={iconDont} height="252" />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Learn more links"
      description={
        <>
          <p>
            Use &quot;Learn more&quot; links in your empty prompt to link to
            documentation where users can get more detailed help.
          </p>
          <p>
            Include the link after the description when the empty prompt
            doesn&apos;t contain a call to action. If there is a call to action,
            include the link in the footer.
          </p>
        </>
      }
    >
      <GuideRuleExample
        text="Add the learn more link after the description when the empty prompt doesn't contain a call to action."
        minHeight={280}
      >
        <EuiImage alt="Inline link" url={inlineLink} height="252" />
      </GuideRuleExample>
      <GuideRuleExample
        text="Add the learn more link in the footer when the empty prompt contains a call to action."
        minHeight={280}
      >
        <EuiImage alt="Footer link" url={horizontal} height="252" />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Multiple empty states "
      description={
        <>
          <p>
            When a page has multiple empty states, avoid using multiple primary
            actions and multiple icons or illustrations.
          </p>
          <p>
            Use secondary actions and no icons or illustrations. This way, the
            visual noise will be reduced. Consider using an illustration or a
            primary action if you want to make one of the empty states stand
            out.
          </p>
        </>
      }
    >
      <GuideRuleExample
        type="do"
        text="Use secondary actions and no icons or illustrations when displaying multiple empty states."
        minHeight={280}
      >
        <EuiImage alt="Vertical layout" url={multipleDo} height="252" />
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Avoid mixing different types of empty states. Try to be consistent."
        minHeight={280}
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
