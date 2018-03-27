import React from 'react';

import {
  Link,
} from 'react-router';

import {
  GuidePage,
  GuideRule,
  GuideRuleExample,
  GuideRuleTitle,
} from '../../components';

import {
  EuiButton,
  EuiText,
  EuiHorizontalRule,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiLink,
  EuiPanel
} from '../../../../src/components';

export default () => (
  <GuidePage title="Modals">

    <EuiText>
      <p>
        A modal says “pay attention to me and nothing else.”  They work best for focusing users&apos; attention on a short
        amount of content and getting them to make a decision.
      </p>

      <Link to="/layout/modal">
        <EuiButton>
          View component code
        </EuiButton>
      </Link>
    </EuiText>

    <EuiHorizontalRule/>


    <GuideRuleTitle>Anatomy</GuideRuleTitle>

    <EuiSpacer size="xxl" />

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem >
        <EuiPanel>
          <div style={{ textAlign: 'center' }}>
            <EuiImage

              alt="page without primary button"
              url="https://imgur.com/giUYBKh.jpg"
            />
          </div>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem >
        <EuiText>
          <h4><strong>The header sets the context</strong></h4>
          <p>Short and sentence-case, it lets the user know the task that needs to get done.</p>
          <h4><strong>The body supports a single task</strong></h4>
          <p>This task should be critical to continuing the current process.</p>
          <h4><strong>Buttons are right-aligned</strong></h4>
          <p>The primary action is a filled button, and the secondary action is a link button.
          </p>
          <h4><strong>An overlay is always used</strong></h4>
          <p>It lets the user know that the content behind the modal isn&apos;t active.</p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiHorizontalRule/>


    <GuideRuleTitle>Input</GuideRuleTitle>



    <GuideRule
      heading=""
      description="An input modal (EuiModal) is for a simple task that doesn't require a lot of explanatory information or user interaction."
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Do. The header is short and sentence-case, the body supports input for one task, and the buttons use action verbs."
      >

        <div style={{ textAlign: 'center' }}>

          <EuiImage
            alt="proper use of input modal"
            size="l"
            url="https://imgur.com/34HqJB5.jpg"
          />
        </div>




      </GuideRuleExample>






      <GuideRuleExample
        panel={false}
        type="dont"
        text="Don't. If you have a lot of content that scrolls out of view, or if the content warrants multiple steps, use a form instead."
      >

        <div style={{ textAlign: 'center' }}>

          <EuiImage

            alt="page without primary button"
            size="l"
            url="https://imgur.com/jNvh44g.jpg"
          />
        </div>

      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Content should fit in a single screen"
      description="If your modal has numerous options or a long list of items,
      use scrolling only if it&apso;s better than other design solutions, such as keeping the content on the page."
    />

    <GuideRule
      heading="Don't launch a modal from a modal"
      description="Using a modal on top of a modal typically means your workflow is too complex—users shouldn't
        have to remember which modal they are in. Instead, use a component that supports multiple steps, such as a form or steps"
    />


    <EuiSpacer />

    <EuiHorizontalRule/>

    <GuideRuleTitle>Confirmation Modal</GuideRuleTitle>

    <GuideRule
      heading=""
      description="The most common use of a modal in the EUI Framework is to
      ask the user to confirm an action. It starts with a question and gives
      users enough information to make a decision."
    >

      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. A confirmation starts with a question and gives users enough information to make a decision."
      >
        <div style={{ textAlign: 'center' }}>

          <EuiImage
            alt="Correct use of a confirmation modal"
            size="l"
            url="https://imgur.com/CjbqLZ4.jpg"
          />
        </div>

      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        type="dont"
        text="Don't use a confirmation modal for a message.  Use a toast for a success message because it is less disruptive.
            Keep error and warning messages on the page."
      >
        <div style={{ textAlign: 'center' }}>

          <EuiImage

            alt="Don't use a modal for a success message"
            size="l"
            url="https://imgur.com/cZXGOtz.jpg"
          />
        </div>

      </GuideRuleExample>

    </GuideRule>


    <GuideRule
      heading="Button text should always reinforce the header."
      description="
        Some explanation here"
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="
          Do. Match the header and button text.
        "
      >
        <div style={{ textAlign: 'center' }}>

          <EuiImage
            alt="Modal with good header, body, and button text"
            size="l"
            url="https://imgur.com/6x4RDuJ.jpg"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        panel={false}
        text="Don't start with a vague question such as &quot;Are you sure?&quot;
          Instead of Yes and No buttons, use labels that describe the action."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            alt="Don't use Are you sure in the title"
            size="l"
            url="https://imgur.com/QmXWlnJ.jpg."
          />
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Create separate confirmations for single and bulk actions"
      description="
      It avoids the awkwardness of &quot;Delete 1 pipeline(s)&quot; and improves readability."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Asking users to delete a single item should ideally include its name in the title.
        Use single quotes around the name if it helps clarify meaning."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            alt="modal for single confirmation"
            size="l"
            url="https://imgur.com/fis6cP2.jpg"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        panel={false}
        text="Do. For bulk actions, consider including the number of items in the title.
        Don't get fancy with the button label&mdash;&quot;Delete&quot; is faster to parse
        than &quot;Delete 6 pipelines&quot;."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            alt="modal for bulk confirmations"
            size="l"
            url="https://imgur.com/HVzhp3z.jpg"
          />
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Avoid repetition"
      description="You can omit the body if users understand the decision
      from the header and button text alone."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Sometimes a header and body is enough."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            alt="the header and the buttons convey the task"
            url="https://imgur.com/GMEIjXx.jpg"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        panel={false}
        text="Don't. Body text that repeats the title is just extra text to read."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            alt="unneccessary body text"
            size="l"
            url="https://imgur.com/T2R9akR.jpg"
          />
        </div>
      </GuideRuleExample>
    </GuideRule>


    <GuideRuleTitle>Things to avoid</GuideRuleTitle>

    <EuiSpacer size="xxl" />

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Scrolling</h3>
            <p>
              Modal content should fit in a single screen.
              If your modal has numerous options or a long list of items, use scrolling only
              if it&apos;s better than other design solutions,
              such as keeping the content on the page.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>

        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Launching a modal from a modal</h3>
            <p>
              Using a modal on top of a modal typically means your workflow is
              too complex&mdash;users shouldn&apos;t have
              to remember which modal they are in.  Instead, use a component
              that supports multiple steps,
              such as a <EuiLink href="https://elastic.github.io/eui/#/forms/form" >form</EuiLink>{' '}
              or <EuiLink href="https://elastic.github.io/eui/#/navigation/steps" > steps </EuiLink>.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Opening a modal from a toolbar</h3>
            <p> Users don&apos;t expect a toolbar button to open a modal.</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Use modals sparingly</h3>
            <p>
              Modals pull users out of their current context.
              They are well-suited for asking users to confirm an action and for short, focused input.
              Otherwise, it&apos;s better to show the content within the page.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>

        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Keep content clean & simple</h3>
            <p>
              A modal should be a short, direct conversation with the user.
              If you’re trying to stuff a lot of content into your modal, then you should probably consider
              a different solution, such as <EuiLink href="https://elastic.github.io/eui/#/forms/form" >form</EuiLink>.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Open on a user action</h3>
            <p>
              Don&apos;t just pop open a modal. Let a user action,
              such as clicking a button, trigger a modal.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>


  </GuidePage>
);
