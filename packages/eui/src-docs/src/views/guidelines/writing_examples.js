import React from 'react';
import { Link } from 'react-router-dom';
import { GuideRule, GuideRuleExample, GuideSection } from '../../components';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCallOut,
  EuiCheckbox,
  EuiEmptyPrompt,
  EuiFieldText,
  EuiFormRow,
  EuiIcon,
  EuiLink,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiToolTip,
  EuiToast,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

// This array is used inside routes.js to create the sidenav sub-sections
export const writingExamplesSections = [
  {
    id: 'buttons',
    title: 'Buttons',
  },
  {
    id: 'callouts',
    title: 'Callouts',
  },
  { id: 'empty-prompts', title: 'Empty prompts' },
  { id: 'labels', title: 'Labels' },
  { id: 'links', title: 'Links' },
  { id: 'modals', title: 'Modals' },
  { id: 'text-fields', title: 'Text fields' },
  { id: 'toasts', title: 'Toasts' },
  { id: 'tooltips', title: 'Tooltips' },
];

export const WritingExamples = () => {
  const modalStyles = { maxWidth: 480, transform: 'scale(.8)' };

  return (
    <GuideSection>
      <EuiText grow={false}>
        <h2 id="buttons">Buttons</h2>

        <p>
          Label <Link to="/navigation/button">buttons</Link> with their action.
          Don&apos;t use Yes, OK, or Confirm when you can use a verb phrase
          instead.
        </p>
      </EuiText>

      <GuideRule>
        <GuideRuleExample
          text="Use a verb + noun for a button label."
          minHeight={280}
        >
          <EuiPanel paddingSize="none" style={modalStyles}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Search session complete</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <p>Save your session and return to it later.</p>
              </EuiText>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty>Manage sessions</EuiButtonEmpty>
              <EuiButton fill>Save session</EuiButton>
            </EuiModalFooter>
          </EuiPanel>
        </GuideRuleExample>
        <GuideRuleExample
          text="Use the same verb + noun as in the title."
          minHeight={280}
        >
          <EuiPanel paddingSize="none" style={modalStyles}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Delete this index?</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalFooter>
              <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
              <EuiButton color="danger" fill>
                Delete index
              </EuiButton>
            </EuiModalFooter>
          </EuiPanel>
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          Be sure to read the{' '}
          <Link to="/navigation/button/guidelines">full button guidelines</Link>
          .
        </p>
      </EuiText>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <h2 id="callouts">Callouts</h2>

        <p>
          Use <Link to="/display/callout">callouts</Link> to relay
          informational, success, warning, or error messages related to the
          content on the page.
        </p>
      </EuiText>
      <GuideRule>
        <GuideRuleExample
          text="Ensure the description provides information in addition to the title."
          minHeight={120}
        >
          <EuiCallOut
            title="Index privileges missing"
            iconType="error"
            color="danger"
          >
            <p>
              You must have the &apos;create_index&apos; privilege to write data
              to this index.
            </p>
          </EuiCallOut>
        </GuideRuleExample>
        <GuideRuleExample
          text="If a single sentence, end with a period."
          minHeight={120}
        >
          <EuiCallOut
            title="Your index can match two sources."
            iconType="search"
          />
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <h2 id="empty-prompts">Empty prompts</h2>

        <p>
          The best empty state lets users know what is happening, why it is
          happening, and what to do about it. Here are four types of frequently
          used <Link to="/display/empty-prompt">empty prompts</Link>.
        </p>
      </EuiText>

      <GuideRule>
        <GuideRuleExample
          text="Prompt first-time users to take action."
          minHeight={300}
        >
          <EuiEmptyPrompt
            style={modalStyles}
            iconType="addDataApp"
            title={<h2>Register your first repository</h2>}
            body={<p>Create a place where your snapshots will live.</p>}
            actions={
              <EuiButton color="primary" fill>
                Register a repository
              </EuiButton>
            }
          />
        </GuideRuleExample>
        <GuideRuleExample
          text="If there is nothing to show, give instructions on what to do."
          minHeight={300}
        >
          <EuiEmptyPrompt
            style={modalStyles}
            iconType="searchProfilerApp"
            title={<h2>No queries to profile</h2>}
            body={
              <p>
                Enter a query, click the Profile button, and see the results
                here.
              </p>
            }
          />
          <EuiSpacer />
        </GuideRuleExample>
      </GuideRule>
      <GuideRule>
        <GuideRuleExample text="Introduce a feature." minHeight={300}>
          <EuiEmptyPrompt
            style={modalStyles}
            iconType="discoverApp"
            title={<h2>Introducing our table view</h2>}
            body={
              <p>
                Explore your data inside Discover with our improved sorting and
                filtering tools.
              </p>
            }
            actions={
              <EuiButton color="primary" fill>
                Go to Discover
              </EuiButton>
            }
          />
        </GuideRuleExample>
        <GuideRuleExample
          text="If using an empty prompt for an error, explain next steps."
          minHeight={300}
        >
          <EuiEmptyPrompt
            style={modalStyles}
            iconType="lock"
            title={<h2>We couldn&apos;t log you in</h2>}
            body={
              <p>
                Check your credentials and try again. If you still can&apos;t
                log in, contact your system administrator.
              </p>
            }
          />
          <EuiSpacer />
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          Be sure to read the{' '}
          <Link to="/display/empty-prompt/guidelines">
            full empty prompt guidelines
          </Link>
          .
        </p>
      </EuiText>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <h2 id="labels">Labels</h2>

        <p>
          Avoid long <Link to="/forms/form-layouts/#form-labels">labels</Link>,
          but don&apos;t sacrifice clarity. If needed, put additional
          information in help text and tooltips.
        </p>
      </EuiText>

      <GuideRule>
        <GuideRuleExample
          text="Use labels that say what the input does."
          minHeight={160}
        >
          <div style={{ width: 400 }}>
            <EuiFormRow>
              <EuiCheckbox
                onChange={() => {}}
                id={htmlIdGenerator()()}
                label="Combine values in other bucket"
              />
            </EuiFormRow>
            <EuiFormRow label="Bucket label">
              <EuiFieldText />
            </EuiFormRow>
          </div>
        </GuideRuleExample>
        <GuideRuleExample text="Use specific labels." minHeight={160}>
          <div style={{ width: 400 }}>
            <EuiFormRow>
              <EuiCheckbox
                onChange={() => {}}
                id={htmlIdGenerator()()}
                label="Limit incoming traffic"
              />
            </EuiFormRow>
            <EuiFormRow
              label="Source"
              helpText={
                <span>
                  Enter CIDR or IP address, for example 192.168.132.6/22.
                </span>
              }
            >
              <EuiFieldText />
            </EuiFormRow>
          </div>
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <h2 id="links">Links</h2>

        <p>
          Use <Link to="/navigation/link">links</Link> to point to detailed
          information.
        </p>
      </EuiText>

      <GuideRule>
        <GuideRuleExample
          text="Place a 'Learn more' link after text that briefly introduces a topic or feature."
          minHeight={280}
        >
          <EuiCallOut size="m" title="Building a dashboard?" iconType="gear">
            <p>
              Create content directly from our Dashboard app using our new
              integrated workflow.{' '}
              <EuiLink href="http://www.elastic.co" external>
                Learn more.
              </EuiLink>
            </p>
          </EuiCallOut>
        </GuideRuleExample>
        <GuideRuleExample
          text="Use inline links to point to a specific page that is stable."
          minHeight={280}
        >
          <EuiEmptyPrompt
            style={modalStyles}
            title={<h2>Extend your trial</h2>}
            body={
              <p>
                To use advanced security and our other awesome&nbsp;
                <EuiLink>subscription features</EuiLink>, request an extension
                now.
              </p>
            }
            actions={
              <EuiButton color="primary" fill>
                Extend trial
              </EuiButton>
            }
          />
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <h2 id="modals">Modals</h2>

        <p>
          <Link to="/layout/modal">Modals</Link> are typically used for
          confirmation when the user might lose data.
        </p>
      </EuiText>

      <GuideRule>
        <GuideRuleExample
          text="For the body text, use one to two short sentences that explain the consequences."
          minHeight={300}
        >
          <EuiPanel paddingSize="none" style={modalStyles}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                New dashboard already in progress
              </EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <p>You can continue editing or start with a blank dashboard.</p>
              </EuiText>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty>Continue editing</EuiButtonEmpty>

              <EuiButton fill>Start over</EuiButton>
            </EuiModalFooter>
          </EuiPanel>
        </GuideRuleExample>

        <GuideRuleExample
          text="Some cases require three buttons."
          minHeight={300}
        >
          <EuiPanel paddingSize="none" style={modalStyles}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                You have unsaved changes
              </EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <p>
                  When you exit editing mode, you can save or discard your
                  changes. You can&apos;t recover discarded changes.
                </p>
              </EuiText>
            </EuiModalBody>

            <EuiModalFooter style={{ flexWrap: 'wrap' }}>
              <EuiButtonEmpty>Continue editing</EuiButtonEmpty>
              <EuiButtonEmpty>Discard changes</EuiButtonEmpty>
              <EuiButton fill>Save changes </EuiButton>
            </EuiModalFooter>
          </EuiPanel>
        </GuideRuleExample>
      </GuideRule>

      <GuideRule>
        <GuideRuleExample
          text="Use the same action verbs in the header and button text."
          minHeight={250}
        >
          <EuiPanel paddingSize="none" style={modalStyles}>
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
          text="Omit the body if users understand the decision from the header and button text alone."
          minHeight={250}
        >
          <EuiPanel paddingSize="none" style={modalStyles}>
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
      </GuideRule>

      <GuideRule description="Create separate confirmations for single and bulk actions.">
        <GuideRuleExample
          text="Asking users to delete a single item should include the item name in the title, if possible.
   Use single quotes around the name if it helps clarify meaning."
          minHeight={250}
        >
          <EuiPanel paddingSize="none" style={modalStyles}>
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
          text="For bulk actions, include the number of items in the title."
          minHeight={250}
        >
          <EuiPanel paddingSize="none" style={modalStyles}>
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

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <h2 id="text-fields">Text fields</h2>
        <p>
          Place hints and instruction outside a{' '}
          <Link to="/forms/form-controls/#text-field">text field</Link> so it is
          always visible to the user.
        </p>
      </EuiText>

      <GuideRule>
        <GuideRuleExample text="Help users make the right decision by clarifying what goes inside a field.">
          <div style={{ width: 400 }}>
            <EuiFormRow
              label="Set a custom interval"
              helpText={
                <span>Use shorthand notation, such as 30s, 10m, or 1h.</span>
              }
            >
              <EuiFieldText />
            </EuiFormRow>
          </div>
        </GuideRuleExample>

        <GuideRuleExample text="Use complete sentences and ending punctuation.">
          <div style={{ width: 400 }}>
            <EuiFormRow
              label="Name"
              helpText={<span>Your name will be on public display.</span>}
            >
              <EuiFieldText name="text" />
            </EuiFormRow>
          </div>
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        description={
          <>
            Use clear language for{' '}
            <Link to="/forms/form-validation">validation</Link> messages.
          </>
        }
      >
        <GuideRuleExample text="Prefer this format for a required field.">
          {' '}
          <div style={{ width: 400 }}>
            <EuiFormRow label="Name" isInvalid={true} error="Name is required.">
              <EuiFieldText name="text" isInvalid={true} />
            </EuiFormRow>
          </div>
        </GuideRuleExample>

        <GuideRuleExample text="Tell users what happened and how to fix it.">
          <div style={{ width: 400 }}>
            <EuiFormRow
              label="Address"
              error="Choose a different address as this one already exists."
              isInvalid={true}
            >
              <EuiFieldText
                value="1234 Elastic Ave"
                onChange={() => {}}
                isInvalid={true}
              />
            </EuiFormRow>
          </div>
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <h2 id="toasts">Toasts</h2>

        <p>
          A common use of <Link to="/display/toast">toasts</Link> is as a
          success message.
        </p>
      </EuiText>

      <GuideRule>
        <GuideRuleExample
          minHeight={120}
          text="For common actions such as create, add, delete, remove, and save,
                    include the object type, the object name if available, and the past tense of the action.
                    Don't include &quot;successfully&quot;. It's implied."
        >
          <EuiToast
            color="success"
            style={{ maxWidth: 300 }}
            title="User 'Casey Smith' was added"
          />
        </GuideRuleExample>
        <GuideRuleExample
          minHeight={120}
          text="For a message about multiple objects, include the object count, but not the names of the objects."
        >
          <EuiToast
            color="success"
            style={{ maxWidth: 300 }}
            title="4 visualizations were deleted"
          />
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          Be sure to read the{' '}
          <Link to="/display/toast/guidelines">full toast guidelines</Link>.
        </p>
      </EuiText>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <h2 id="tooltips">Tooltips</h2>

        <p>
          Provide additional information, such as what the user can do.
          Don&apos;t use <Link to="/display/tooltip">tooltips</Link> for
          essential information, which belongs directly in the UI.
        </p>
      </EuiText>

      <GuideRule>
        <GuideRuleExample
          panelDisplay="block"
          text="Use sentence case and ending period.  Sentence fragments are ok."
        >
          <EuiToolTip
            content="Check if objects were previously copied or imported into the space."
            position="right"
          >
            <EuiCheckbox
              id="explainedCheckbox"
              onChange={() => {}}
              label={
                <>
                  Check for existing objects{' '}
                  <EuiIcon className="eui-alignTop" type="questionInCircle" />
                </>
              }
            />
          </EuiToolTip>
        </GuideRuleExample>
        <GuideRuleExample
          panelDisplay="block"
          text="Multilines are ok, but use 2 lines max."
        >
          <EuiText size="s">
            <p>
              <EuiToolTip
                content="Available fields have data in the first 500 documents that match your filters. Full text and geographic fields cannot be visualized and are not shown."
                position="right"
              >
                <span>
                  Available fields{' '}
                  <EuiIcon className="eui-alignTop" type="questionInCircle" />
                </span>
              </EuiToolTip>
            </p>
          </EuiText>
        </GuideRuleExample>
      </GuideRule>
    </GuideSection>
  );
};
