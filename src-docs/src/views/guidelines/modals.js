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
  <GuidePage title="Modal guidelines">

    <Link to="/layout/modal">
      <EuiButton className="guideRule__goToButton">
        View component code
      </EuiButton>
    </Link>

    <EuiText className="guideSection__text">
      <p>
        A modal says “pay attention to me and nothing else.”  A modal
        works best for focusing users&apos; attention on a short
        amount of content and getting them to make a decision.
      </p>

      <Link to="/layout/modal">
        <EuiButton>
          View component code
        </EuiButton>
      </Link>
    </EuiText>

    <EuiHorizontalRule/>


    <GuideRuleTitle>Modal in context</GuideRuleTitle>
    <EuiSpacer />

    <EuiSpacer size="xxl" />

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiImage
          alt="page without primary button"
          size="xl"
          url="https://imgur.com/i16qBLN.jpg"
        />
      </EuiFlexItem>

      <EuiFlexItem >
        <EuiText className="guideSection__text">
          <h4><strong>The header sets the context</strong></h4>
          <p>Short and sentence-case, the header should indicate what the modal is about.</p>
          <h4><strong>The body is for a single task</strong></h4>
          <p>This task should not require a lot of explanation or user interaction.</p>
          <h4><strong>Buttons are right-aligned</strong></h4>
          <p>The primary action is a filled button, and the secondary action is a link button.
            Labels should use strong action verbs.
          </p>
          <h4><strong>An overlay is recommended</strong></h4>
          <p>It lets users know that the content behind the modal isn&apos;t active.</p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="xl"/>


    <EuiHorizontalRule/>


    <GuideRuleTitle>Use a modal to collect user input</GuideRuleTitle>



    <GuideRule
      heading=""
      description="A modal can gather input necessary for continuing the current workflow.
      This type of modal works best for a short, focused task.
      Use input modals sparingly&mdash;they interrput the user's workflow.
      "
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Do. A save action is a good use case for a modal. The
        meaning is clear and the content is simple."
      >

        <div style={{ textAlign: 'center' }}>

          <EuiImage
            alt="Proper use of an input modal"
            size="l"
            url="https://imgur.com/34HqJB5.jpg"
          />
        </div>

      </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="dont"
        text="Don't. Modals aren't the best design solution for multiple steps or complex user input.
        A form is more appropriate."
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
      heading="Open a modal on a user action"
      description="Let a user action, such as a button click,
      open a modal. Don&apos;t open a modal from a toolbar action&mdash;users don&apos;t expect it.
      "
      />

    <GuideRule
      heading="Avoid scrolling content"
      description="Modal content should fit in a single view. If your modal has
      a lot of detail or a long list of items, consider a different solution, such as a
      form or a table.
      "
      />

      <GuideRule
        heading="Don't stack modals"
        description="Opening a modal on top of a modal might mean your workflow is too complex.
        Instead, use a component that supports multiple steps, such as a form or steps."
        />


    <EuiSpacer />

    <EuiHorizontalRule/>

    <GuideRuleTitle>Use a modal to ask users to confirm an action</GuideRuleTitle>

    <GuideRule
      heading=""
      description="The most common use of modal in the EUI Framework is
      to cofirm a user action.
      This modal should start with a question, give
      users enough information to make a decision,
      and restate the action in the button label."
    >

    <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Do. Use a modal for confirmation when the user might lose data. For the body
        text, use one to two short sentences that explain the consequences."
      >
        <div style={{ textAlign: 'center' }}>

          <EuiImage
            alt="Correct use of a confirmation modal"
            size="l"
            url="https://imgur.com/xY52qqq.jpg"
          />
        </div>

      </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="dont"
        text="Don't.  Confirmations aren't good for messages.
        Toasts are best for success messages because they are less disruptive.
            Error and warning messages often appear directly on the page."
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
      heading="State the action in both the header and button text"
      description="If the modal header is &quot;Refresh this field?&quot; then the button text should be &quot;Refresh.&quot;"
    >
      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="
          Do. Use the same action verbs in the header and button text.
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
        frame
        panel={false}
        text="Don't use a vague header such as &quot;Are you sure?&quot; or
        the button labels &quot;Yes&quot; and &quot;No.&quot;
          "
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
      frame
        panel={false}
        type="do"
        text="Do. Asking users to delete a single item should include the item name in the title,
        if possible.
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
        frame
        panel={false}
        text="Do. For bulk actions, include the number of items in the title."
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
      heading="Sometimes a header and buttons are enough"
      description="You can omit the body if users understand the decision
      from the header and button text alone."
    >
      <GuideRuleExample
      frame
        panel={false}
        type="do"
        text="Do. Here the header and body are enough.
        The modal asks the user whether to remove an index pattern&mdash;
        data won&apos;t be lost."
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
        frame
        panel={false}
        text="Don't write body text that simply repeats the title.
        It doesn't add value."
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

  </GuidePage>
);
