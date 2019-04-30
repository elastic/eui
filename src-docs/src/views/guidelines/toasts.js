import React, { Component } from 'react';

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
  EuiCallOut,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiCodeBlock,
} from '../../../../src/components';

export class ToastGuidelines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {
    let modal;

    if (this.state.isModalVisible) {
      modal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeModal}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                Your visualization has an error
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiCallOut
                title="The maximum bucket size of 200 was exceeded"
                color="danger"
                size="s"
                iconType="alert"
              />
              <EuiSpacer size="s" />
              <EuiCodeBlock>
                {`--- FAKE ERROR ---
An extremely long error trace can exist in a modal so you have time
and space to read it properly. Alternatively just link to a full page.
---
                `}
              </EuiCodeBlock>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButton onClick={this.closeModal} fill>
                Close
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }
    return (
      <GuidePage title="Toast guidelines" componentLinkTo="/display/toast">
        <EuiText grow={false} className="guideSection__text">
          <p>
            This page documents patterns for using toasts, short messages that
            appears on the lower right corner and time out after a few seconds.
            They are a popular design choice because they don&apos;t need to fit
            in a layout and don&apos;t disrupt the user.
          </p>
        </EuiText>

        <GuideRuleTitle>Toast types</GuideRuleTitle>

        <EuiSpacer size="xl" />

        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={false} style={{ minWidth: 120 }}>
            <EuiToast
              style={{ width: 300 }}
              title="Your report is complete"
              color="success"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText className="guideSection__text">
              <h4>Success toasts indicate that everything worked out</h4>
              <p>They are the most-commonly used toasts.</p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer />

        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={false} style={{ minWidth: 120 }}>
            <EuiToast
              style={{ width: 300 }}
              title="Node 726 is having trouble"
              color="warning"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText className="guideSection__text">
              <h4>
                Warning toasts direct user attention to a potential problem
              </h4>
              <p>
                These toasts work well in monitoring apps when something
                significant requires action.
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer />

        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={false} style={{ minWidth: 120 }}>
            <EuiToast
              style={{ width: 300 }}
              title="Search failed.  Check your Elasticsearch connection."
              color="danger"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText className="guideSection__text">
              <h4>Error toasts report a problem</h4>
              <p>
                An error toast might let users know an action didn&apos;t
                complete or that a form has errors.
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer />

        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={false} style={{ minWidth: 120 }}>
            <div>
              <EuiToast
                style={{ width: 300 }}
                title="Please wait while your report is created"
                color="primary"
              />
            </div>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText className="guideSection__text">
              <h4>Info toasts relay neutral information</h4>
              <p>
                The default toast, an info toast might notify users about an
                ongoing action.
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer />

        <GuideRuleTitle>Use a toast for a timely message</GuideRuleTitle>

        <GuideRule
          description="Toasts are appropriate for short feedback related to a user action.
          A toast should contain a message about a current action, not a historical action.">
          <GuideRuleExample
            type="do"
            panel={false}
            frame
            text="Do. Use a toast for a brief message about the current action.">
            <EuiToast
              style={{ maxWidth: 300 }}
              title="Your folder was moved"
              color="success"
            />
          </GuideRuleExample>

          <GuideRuleExample
            panel={false}
            type="dont"
            frame
            text="Don't greet users with a toast when they open a page.">
            <div style={{ textAlign: 'center' }}>
              <EuiToast
                style={{ maxWidth: 300 }}
                title="Haven't seen you in a while"
                color="primary"
              />
            </div>
          </GuideRuleExample>
        </GuideRule>

        <GuideRuleTitle>
          Most often, it&apos;s a single line of text
        </GuideRuleTitle>

        <GuideRule
          description="By default, a toast stays on the screen 10 seconds.
          Users should be able read the message in 6 to 7 seconds.
          The message should get straight to the point and rarely include more than one line.

          ">
          <GuideRuleExample
            panel={false}
            frame
            type="do"
            text="Do. A single line of text is readable at a glance.">
            <div style={{ textAlign: 'center' }}>
              <EuiToast
                style={{ maxWidth: 300 }}
                title="Check your form for errors"
                color="danger"
              />
            </div>
          </GuideRuleExample>

          <GuideRuleExample
            type="dont"
            panel={false}
            frame
            text="Don't cram a lot of detail into a toast.
            These errors should persist in callouts and validations on the form.
            They don't need to be spelled out in the toast.">
            <div>
              <EuiToast
                style={{ maxWidth: 300 }}
                title="Your form has errors"
                color="danger">
                <EuiText className="guideSection__text">
                  <ul>
                    <li>Username is a required field.</li>
                    <li>Password must be at least 6 characters long.</li>
                    <li>Email is a required field.</li>
                  </ul>
                </EuiText>
              </EuiToast>
            </div>
          </GuideRuleExample>
        </GuideRule>

        <GuideRuleTitle>
          Toasts should only contain a single action
        </GuideRuleTitle>

        <GuideRule
          description="A toast can have a single action, styled as a standard button.
          If more actions are needed, or if the action is important enough to
          interrupt the user, use a modal instead.">
          <GuideRuleExample
            panel={false}
            type="do"
            frame
            text="Do. Use only one action per toast and favor a one-word label.
              Align actions to the right, which follows our button guidelines for
              usage within restricted width containers.">
            <EuiToast
              style={{ maxWidth: 300 }}
              color="success"
              title="Your report is complete">
              <div style={{ textAlign: 'right' }}>
                <EuiButton size="s">Download</EuiButton>
              </div>
            </EuiToast>
          </GuideRuleExample>

          <GuideRuleExample
            type="dont"
            panel={false}
            frame
            text="Don't use multiple actions. Don't align buttons in toasts to the left.
              This message is better in a confirmation modal.">
            <EuiToast
              style={{ maxWidth: 300 }}
              title="All messages will be deleted"
              color="danger">
              <EuiFlexGroup justifyContent="flexEnd" gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiButton size="s">Cancel</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton size="s" color="danger">
                    Delete
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiToast>
          </GuideRuleExample>
        </GuideRule>

        <EuiSpacer size="l" />

        <GuideRuleTitle>Icons should emphasize actions</GuideRuleTitle>

        <GuideRule description="An icon on the left of the message can help define the message type.">
          <GuideRuleExample
            panel={false}
            type="do"
            frame
            text="Do. The check icon reinforces that the action succeeded.
                The alert icon helps users understand the message is an error.">
            <div>
              <EuiToast
                style={{ maxWidth: 300 }}
                title="Your dashboard was updated"
                iconType="check"
                color="success"
              />

              <EuiSpacer />

              <EuiToast
                style={{ maxWidth: 300 }}
                title="A dashboard named 'MyDashboard' already exists"
                iconType="alert"
                color="danger"
              />
            </div>
          </GuideRuleExample>

          <GuideRuleExample
            type="dont"
            panel={false}
            frame
            text="Don't use icons that are hard to understand. They distract from the message.">
            <EuiToast
              color="primary"
              style={{ maxWidth: 300 }}
              title="Message sent"
              iconType="help"
            />
          </GuideRuleExample>
        </GuideRule>

        <GuideRuleTitle>Display one toast at a time</GuideRuleTitle>

        <GuideRule
          description="Users should be able to take
          in all the details from one toast before the next one arrives.">
          <GuideRuleExample
            panel={false}
            type="do"
            frame
            text="Do. Display one toast at a time.">
            <EuiToast
              style={{ maxWidth: 300 }}
              color="primary"
              title="3 new messages"
            />
          </GuideRuleExample>

          <GuideRuleExample
            type="dont"
            panel={false}
            frame
            text="Don't stack toasts.">
            <div>
              <EuiToast
                style={{ maxWidth: 300 }}
                color="danger"
                title="There was a problem with your node">
                <div style={{ textAlign: 'right' }}>
                  <EuiButton size="s">Learn more</EuiButton>
                </div>
              </EuiToast>
              <EuiSpacer />

              <EuiToast
                color="primary"
                style={{ maxWidth: 300 }}
                title="3 new messages"
              />
            </div>
          </GuideRuleExample>
        </GuideRule>

        <GuideRuleTitle>Keep messages as short as possible</GuideRuleTitle>

        <GuideRule
          description="For common actions such as create, add, delete, remove, and save,
          include the object type, the object name if available, and the past tense of the action.
          ">
          <GuideRuleExample
            panel={false}
            type="do"
            frame
            text="Do. Include the object name if it's not too long.
            Use single quotation marks around the object name if it helps clarify meaning.">
            <div>
              <EuiToast
                color="success"
                style={{ maxWidth: 300 }}
                title="User 'Casey Smith' was added"
              />
            </div>
          </GuideRuleExample>

          <GuideRuleExample
            type="dont"
            panel={false}
            frame
            text='Don&apos;t use the generic "Your object."'>
            <EuiToast
              color="success"
              style={{ maxWidth: 300 }}
              title="Your object has been saved"
            />
          </GuideRuleExample>
        </GuideRule>

        <GuideRule description="Don't include the word &quot;successfully.&quot; It's implied.">
          <GuideRuleExample
            panel={false}
            frame
            type="do"
            text="Do. Use this format for a success message.">
            <EuiToast
              color="success"
              style={{ maxWidth: 300 }}
              title="Dashboard 'My_dashboard' was saved"
            />
          </GuideRuleExample>

          <GuideRuleExample
            type="dont"
            panel={false}
            frame
            text='Don&apos;t include "successfully."'>
            <EuiToast
              color="success"
              style={{ maxWidth: 300 }}
              title="Dashboard 'My_dashboard' was successfully saved"
            />
          </GuideRuleExample>
        </GuideRule>

        <GuideRule description="For a message about multiple objects, include the object count, but not the names of the objects.">
          <GuideRuleExample
            panel={false}
            type="do"
            frame
            text="Do. Include the object count.">
            <EuiToast
              color="success"
              style={{ maxWidth: 300 }}
              title="4 visualizations were deleted"
            />
          </GuideRuleExample>
          <GuideRuleExample
            panel={false}
            type="dont"
            frame
            text="Don't overwhelm the user by listing the names of all the objects.">
            <EuiToast
              color="success"
              style={{ maxWidth: 300 }}
              title="Visualization 1, Visualization 2, Visualization 3, and Visualization 4 were deleted"
            />
          </GuideRuleExample>
        </GuideRule>

        <GuideRuleTitle>
          Use call-to-action buttons when the content needs more room
        </GuideRuleTitle>

        <GuideRule
          description="Occassionally the content of a toast is too involved to fit into the constrained space of a toast.
          This is common in long error messages. In these cases use the toast to deliver the summary of the
          information and use a button to provide a call-to-action for the full message.">
          <GuideRuleExample
            panel={false}
            type="do"
            frame
            text="Use the toast message to provide a summary and a button to link to the full content">
            <EuiToast
              style={{ maxWidth: 300 }}
              color="danger"
              title="Your visualization has an error">
              <p>The maximum bucket size of 200 was exceeded.</p>
              <div style={{ textAlign: 'right' }}>
                <EuiButton size="s" color="danger" onClick={this.showModal}>
                  See the full error
                </EuiButton>
                {modal}
              </div>
            </EuiToast>
          </GuideRuleExample>

          <GuideRuleExample
            type="dont"
            panel={false}
            frame
            text="Don't cram a lot of content into the small space of a toast.">
            <EuiToast
              style={{ maxWidth: 300 }}
              color="danger"
              title="Your visualization has an error">
              <EuiCallOut
                title="The maximum bucket size of 200 was exceeded"
                color="danger">
                <p>An extremely long error trace.</p>
              </EuiCallOut>
            </EuiToast>
          </GuideRuleExample>
        </GuideRule>
      </GuidePage>
    );
  }
}
