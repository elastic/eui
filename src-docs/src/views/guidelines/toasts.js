import React from 'react';

import {
  GuidePage,
  GuideRule,
  GuideRuleExample,
  GuideRuleTitle,
} from '../../components';

import {
  EuiText,
  EuiButton,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiToast,
  EuiPanel
} from '../../../../src/components';

export default () => (
  <GuidePage title="">

    <EuiText>
      <h1>Toasts</h1>
      <p>
A toast is a short, timely message related to a user action.  It appears on the bottom right and times out after a few seconds.

      </p>
    </EuiText>



    <GuideRuleTitle>Use for brief feedback</GuideRuleTitle>


    <GuideRule
      description="
    A toast is like a push notification&mdash;it provides feedback that something failed, succeeded, or needs attention.
    Toasts are short-lived&mdash;users can't retrieve the messages by refreshing the page."
    >


      <GuideRuleExample
        type="do"
        panel={false}
        text="The default info toast is appropriate for relaying important, but neutral information.
  This example let users know that the process they initiated might take a while.
  Always follow up with a second toast when the process completes."
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="Please wait while your report is created."
        />
        <EuiSpacer />
        <EuiToast
          style={{ maxWidth: 300 }}
          title="Your report is complete."
        />
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        type="do"
        text="A success message indicates that everything worked out, similar to a high-five. Optionally, this message can include
  a checkmark because its the universally recognized icon for success."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiToast
            style={{ maxWidth: 300 }}
            title="Your dashboard was created."
            iconType="check"
            color="success"
          />
        </div>
      </GuideRuleExample>





    </GuideRule>
    <EuiSpacer />


    <GuideRule
      description=""
    >


      <GuideRuleExample
        panel={false}
        type="do"
        text="A warning toast directs users' attention to a potential problem, such as this message
  from a monitoring application."
      >
        <div>
          <EuiToast
            style={{ maxWidth: 300 }}
            title="Node 726 is having trouble."
            color="warning"
          />
        </div>
      </GuideRuleExample>



      <GuideRuleExample
        type="do"
        panel={false}
        text="An error toast reports a problem that prevents the action from completing&mdash;and a solution on how to fix it.
  Error toasts can optionally include the alert icon."
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="Search failed.  Check your Elasticsearch connection."
          color="danger"
          iconType="alert"
        />

      </GuideRuleExample>
    </GuideRule>






    <GuideRuleTitle>Most often, its just a title</GuideRuleTitle>


    <GuideRule
      description="By default, a toast times out after 10 seconds.
  This means, users should be able read the message in 6 to 7 seconds.
  A single line of title text is readable at a glance."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Use a toast to let users know that a form has errors that are outside the users' viewport."
      >
        <div style={{ textAlign: 'center' }}>

          <EuiToast
            style={{ maxWidth: 300 }}
            title="Your form has errors."
            color="danger"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        panel={false}
        text="Don't list the actual errors in the toast.
  The error messages persist in callouts and valdiations on the form itself."
      >

        <div>

          <EuiToast
            style={{ maxWidth: 300 }}
            title="Your form has errors"
            color="danger"
          >
            <p>
        Username is a required field.
            </p>
            <p>
        Password must be at least 6 characters long.
            </p>
            <p>
        Email is a required field.
            </p>
          </EuiToast>
        </div>
      </GuideRuleExample>

    </GuideRule>



    <GuideRuleTitle>At most, one action</GuideRuleTitle>

    <GuideRule
      description="A toast can contain a single action, styled as a small, standard button.
   For more actions, or if the action is important enough to interrupt the user, use a modal."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Use a single action word for the button label."
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="Your upload is complete."
        >
          <EuiButton size="s">
      View
          </EuiButton>

        </EuiToast>
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        panel={false}
        text="Do.  Use &quot;Learn more&quot; when linking to documentation."
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="There was a problem with your dashboard."
        >
          <EuiButton size="s">
    Learn more
          </EuiButton>
        </EuiToast>
      </GuideRuleExample>
    </GuideRule>


    <GuideRuleTitle>Minimal text</GuideRuleTitle>

    <GuideRule
      description="For standard actions, such as create, add, delete, remove, and save, include the
    object type, the object name if available, and the past tense of the action."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Keep the text short. Use single quotation marks around object names if it helps clarify meaning."
      >

        <EuiToast
          style={{ maxWidth: 300 }}
          title="User 'John Smith' was added."
        />
        <EuiSpacer />

        <EuiToast
          style={{ maxWidth: 300 }}
          title="Your index pattern was removed."
        />



      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        panel={false}
        text="Dont use a generic object name or the verbiage &quot;has been.&quot;"
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="Your object has been saved."
        />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      description="Don't include the word &quot;successfully&quot;&mdash;its implied."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Use this format for a success message."
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="Dashboard 'My_dashboard' was saved."
        />



      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        panel={false}
        text="Dont include &quot;successfully.&quot;"
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="Dashboard 'My_dashboard' was successfully saved."
        />
      </GuideRuleExample>
    </GuideRule>



    <GuideRule
      description="For a message about multiple objects, start with the object count."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Include the object count."
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="4 visualizations were deleted."
        />



      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        panel={false}
        text="Don't overwhelm the user with a complete list of objects."
      >
        <EuiToast
          style={{ maxWidth: 300 }}
          title="Visualization 1, Visualization 2, Visualization 3, and Visualization 4 were deleted."
        />
      </GuideRuleExample>
    </GuideRule>


    <GuideRuleTitle>Things to avoid</GuideRuleTitle>

    <EuiSpacer size="xxl" />

    <EuiFlexGroup wrap={true}>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Too much detail</h3>
            <p>If you are trying to cram a lot of detail into your toast,
          then its probably not right design solution.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Too often</h3>
            <p>Toasts are a popular design choice because they need not
          fit in a layout and they don&apos;t disrupt the user.  As such, they
          are also commonly misued.  Don&apos;t use toasts
        for historical actions or show a toast when the user opens a page.
        A toast message should not be a required read before leaving a page.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>

        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Stacking toasts</h3>
            <p>Open one toast at a time so users can take
            in all the details before the next toast arrives.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>


    </EuiFlexGroup>










  </GuidePage>
);
