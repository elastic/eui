import React from 'react';

import {
  GuidePage,
  GuideRule,
  GuideRuleExample,
  GuideRuleTitle,
} from '../../components';

import {
  EuiButton,
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiButtonEmpty,
  EuiFormRow,
  EuiFieldText,
  EuiTextArea,
} from '../../../../src/components';

export default () => (
  <GuidePage title="Modal guidelines" componentLinkTo="/layout/modal">
    <EuiText grow={false} className="guideSection__text">
      <p>
        A modal says “pay attention to me and nothing else.” A modal works best
        for focusing users&apos; attention on a short amount of content and
        getting them to make a decision.
      </p>
    </EuiText>

    <GuideRuleTitle>Modal in context</GuideRuleTitle>
    <EuiSpacer />

    <EuiSpacer size="xxl" />

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ minWidth: 300 }}>
        <div>
          <EuiPanel hasShadow paddingSize="none">
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                A modal title should be one line
              </EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <p>
                  The modal body will automatically scroll if the content gets
                  too tall. Try to keep this from happening by keeping your
                  content short and to the point.
                </p>
              </EuiText>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty>Secondary action</EuiButtonEmpty>

              <EuiButton fill>Primary action</EuiButton>
            </EuiModalFooter>
          </EuiPanel>
        </div>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiText className="guideSection__text">
          <h4>The header sets the context</h4>
          <p>
            Short and sentence-case, the header should indicate what the modal
            is about.
          </p>
          <h4>The body is for a single task</h4>
          <p>
            This task should not require a lot of explanation or user
            interaction.
          </p>
          <h4>Buttons are right-aligned</h4>
          <p>
            The primary action is a filled button, and the secondary action is a
            link button. Labels should use strong action verbs.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="xl" />

    <GuideRuleTitle>Use a modal to silo a single action</GuideRuleTitle>

    <GuideRule
      heading=""
      description="A modal can gather input necessary for continuing the current workflow.
      This type of modal works best for a short, focused task.
      Use input modals sparingly&mdash;they interrupt the user's workflow.
      ">
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. A save action is a good use case for a modal. The
        meaning is clear and the content is simple.">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Save dashboard</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiFormRow label="Name">
              <EuiFieldText />
            </EuiFormRow>
            <EuiFormRow label="Description">
              <EuiTextArea />
            </EuiFormRow>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty>Cancel</EuiButtonEmpty>

            <EuiButton fill>Save</EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        type="dont"
        text="Don't. Modals aren't the best design solution for multiple steps or complex user input.
        An in-page form is more appropriate.">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Add a team member</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiTitle size="s">
              <h3>Step 1 of 3: the basics</h3>
            </EuiTitle>
            <EuiSpacer />
            <EuiFormRow label="Name">
              <EuiFieldText />
            </EuiFormRow>
            <EuiFormRow label="Email">
              <EuiFieldText />
            </EuiFormRow>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty>Cancel</EuiButtonEmpty>

            <EuiButton fill>Continue to step 2</EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Open a modal on a user action"
      description="Let a user action, such as a button click,
      open a modal. Don't open a modal from a toolbar action&mdash;users don't expect it.
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

    <GuideRuleTitle>
      Use a modal to ask users to confirm an action
    </GuideRuleTitle>

    <GuideRule
      heading=""
      description="The most common use of modals in the EUI Framework is
      to confirm a user action.
      This modal should start with a question, give
      users enough information to make a decision,
      and restate the action in the button label.">
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Use a modal for confirmation when the user might lose data. For the body
        text, use one to two short sentences that explain the consequences.">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Save changes before leaving?
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>If you don&apos;t save, your changes will be lost.</p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty>Leave anyway</EuiButtonEmpty>

            <EuiButton fill>Save changes</EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        type="dont"
        text="Don't.  Confirmations aren't good for messages.
          Toasts are best for success messages because they are less disruptive.
          Error and warning messages often appear directly on the page.">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Great!</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>Your dashboard has been successfully created.</p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton fill>Close</EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="State the action in both the header and button text"
      description='If the modal header is "Refresh this field?" then the button text should be "Refresh."'>
      <GuideRuleExample
        panel={false}
        type="do"
        text="
          Do. Use the same action verbs in the header and button text.
        ">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Refresh field list?</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>This action resets the popularity counter of each field.</p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty>Cancel</EuiButtonEmpty>

            <EuiButton fill>Refresh</EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        panel={false}
        text='Don&apos;t use a vague header such as "Are you sure?" or
        the button labels "Yes" and "No."
          '>
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Are you sure you want to refresh this field list?
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>This action resets the popularity counter of each field.</p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty>No</EuiButtonEmpty>

            <EuiButton fill>Yes</EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Create separate confirmations for single and bulk actions"
      description='
      It avoids the awkwardness of "Delete 1 pipeline(s)" and improves readability.'>
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Asking users to delete a single item should include the item name in the title,
        if possible.
        Use single quotes around the name if it helps clarify meaning.">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Delete pipeline &apos;MyPipeline&apos;?
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>You can&apos;t recover deleted data.</p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty>Cancel</EuiButtonEmpty>

            <EuiButton color="danger" fill>
              Delete
            </EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        panel={false}
        text="Do. For bulk actions, include the number of items in the title.">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Delete 6 pipelines?</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>You can&apos;t recover deleted data.</p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty>Cancel</EuiButtonEmpty>

            <EuiButton color="danger" fill>
              Delete
            </EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Sometimes a header and buttons are enough"
      description="You can omit the body if users understand the decision
      from the header and button text alone.">
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Here the header and body are enough.
        The modal asks the user whether to remove an index pattern&mdash;
        data won't be lost.">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Remove index pattern?</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalFooter>
            <EuiButtonEmpty>Cancel</EuiButtonEmpty>

            <EuiButton fill color="danger">
              Remove
            </EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        panel={false}
        text="Don't write body text that simply repeats the title.
        It doesn't add value.">
        <EuiPanel hasShadow paddingSize="none">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Remove index pattern?</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>This action removes your index pattern.</p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty>Cancel</EuiButtonEmpty>

            <EuiButton color="danger" fill>
              Remove
            </EuiButton>
          </EuiModalFooter>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>
  </GuidePage>
);
