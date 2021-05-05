import React from 'react';
import classNames from 'classnames';

import { GuideRule, GuideRuleExample } from '../../components';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCard,
  EuiCheckbox,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiIcon,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const GuideRuleWriting = ({ children, className, ...rest }) => {
  const classes = classNames(className);

  return (
    <EuiText className={classes} {...rest}>
      <p>{children}</p>
    </EuiText>
  );
};

export default {
  title: 'Writing Guidelines',
  intro: (
    <>
      <EuiText grow={false}>
        <p>
          You can have the most beautiful UI, but without{' '}
          <b>consistent, easy-to-understand text</b>, you haven’t built the best
          user experience.
        </p>
      </EuiText>

      <EuiSpacer size="xl" />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            title="Clear and concise"
            description="Get straight to the point&mdash;in a way that your users
              understand. Make every word contribute to meaning."
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            title="Consistent"
            description="Use the same terminology to mean the same thing. Make sure
          spelling, capitalization, punctuation, labels, and use of
          abbreviations are all consistent."
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            title="Conversational"
            description="Write as a professional in the field would talk&mdash;not as a
          professor lecturing students. Use words that the user would use."
          />
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiSpacer size="xl" />
    </>
  ),
  sections: [
    {
      title: 'Capitalization',
      wrapText: false,
      text: (
        <>
          <GuideRule
            heading="Sentence case for almost all text"
            description="This includes buttons, menus, and titles. In sentence case, only the
    first word and proper names are capped.">
            <GuideRuleExample
              type="do"
              text="Sentence case makes titles easier to read.">
              <EuiTitle size="xs">
                <span>Create index patterns</span>
              </EuiTitle>
            </GuideRuleExample>

            <GuideRuleExample
              type="dont"
              text="Title case can feel more cluttered.">
              <EuiTitle size="xs">
                <span>Create Index Patterns</span>
              </EuiTitle>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule heading="" description="">
            <GuideRuleExample
              type="do"
              text="Sentence case is friendlier in button labels.">
              <EuiButton fill color="text">
                Set up index pattern
              </EuiButton>
            </GuideRuleExample>
            <GuideRuleExample type="dont" text="Title case looks too formal.">
              <EuiButton fill color="text">
                Set Up Index Pattern
              </EuiButton>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Title case for feature titles"
            description="Titles and tabs for specific features should capitalize all words in the name of the feature.">
            <GuideRuleExample
              type="do"
              text="Title case in tabs and titles for names of features.">
              <EuiTabs display="condensed">
                <EuiTab>Inventory</EuiTab>
                <EuiTab isSelected>Metrics Explorer</EuiTab>
              </EuiTabs>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text="Features are proper names, not sentences.">
              <EuiTabs display="condensed">
                <EuiTab>Inventory</EuiTab>
                <EuiTab isSelected>Metrics explorer</EuiTab>
              </EuiTabs>
            </GuideRuleExample>
          </GuideRule>

          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Writing style',
      wrapText: false,
      text: (
        <>
          <GuideRule
            heading="Write in active voice"
            description="Active voice puts the focus on who or what is performing the
      action and makes the sentence easier to understand.">
            <GuideRuleExample
              type="do"
              text="Writing in active voice puts the subject first.">
              <GuideRuleWriting>
                The Elasticsearch Query DSL builds filters.
              </GuideRuleWriting>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text="With passive voice, it's harder to tell who's doing what.">
              <GuideRuleWriting>
                Filters are built using the Elasticsearch Query DSL.
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Keep it short and snappy"
            description="Identify the most important information and say it concisely.
      Don't repeat what's already been said or state the obvious.
      Omit common introductory phrases.">
            <GuideRuleExample type="do" text="Keep it short.">
              <EuiText>
                <h4>Edit saved objects</h4>
              </EuiText>
            </GuideRuleExample>

            <GuideRuleExample
              type="dont"
              text="Repeat what's already been said or state the obvious.">
              <EuiText>
                <h4>Edit saved objects</h4>
                <p>
                  From here, you can edit saved objects. To get started, follow
                  these steps.
                </p>
              </EuiText>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule heading="" description="">
            <GuideRuleExample type="do" text="Get straight to the point.">
              <GuideRuleWriting>
                Configure at least one index pattern.
              </GuideRuleWriting>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text="Use unnecessary introductory phrases.">
              <GuideRuleWriting>
                In order to use Kibana, you must configure at least one index
                pattern.
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule heading="" description="">
            <GuideRuleExample
              type="do"
              text="Ensure all words contribute to meaning.">
              <GuideRuleWriting>
                No active shard records for this cluster.
              </GuideRuleWriting>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text='Start a sentence with "There are" or "There is."'>
              <GuideRuleWriting>
                There are currently no active shard records for this cluster.
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule heading="" description="">
            <GuideRuleExample
              type="do"
              text="Avoid unneeded words in button labels.">
              <EuiButton fill>Create component template</EuiButton>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text='Use "create a new" or include articles in button labels.'>
              <EuiButton fill>Create a new component template</EuiButton>
            </GuideRuleExample>
          </GuideRule>
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Addressing the user',
      wrapText: false,
      text: (
        <>
          <GuideRule
            heading='In most cases, address users as "you"'
            description="It's friendly and engages the user directly.">
            <GuideRuleExample
              type="do"
              text='Converse directly with the user using "you" and "your."'>
              <GuideRuleWriting>
                You must configure TLS to apply a Platinum license.
              </GuideRuleWriting>
            </GuideRuleExample>

            <GuideRuleExample
              type="dont"
              text='Avoid the user. It creates awkward phrasing such as "will be required."'>
              <GuideRuleWriting>
                Configuring TLS will be required to apply a Platinum license.
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading='In some cases, "we" and "our" are appropriate'
            description="The use of &quot;we&quot; is appropriate for situations
      where you're taking an action for the user or making a suggestion.
      It's best reserved for onboarding and empty states.">
            <GuideRuleExample
              type="do"
              text='Use "we" when taking an action on behalf of the user.'>
              <GuideRuleWriting>
                We noticed that you don&apos;t have any data in your cluster.
                Try our sample data and dashboards or jump in with your own
                data.
              </GuideRuleWriting>
            </GuideRuleExample>

            <GuideRuleExample
              type="dont"
              text='Overuse "us." It can become annoying.'>
              <GuideRuleWriting>Let&apos;s create a database</GuideRuleWriting>
              <GuideRuleWriting>
                Let&apos;s create a visualization
              </GuideRuleWriting>
              <GuideRuleWriting>...</GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading='Less common are "I" and "my"'
            description="Use first person when you want to give the user ownership of an action.">
            <GuideRuleExample
              type="do"
              text='Use "my" in buttons and links to give users ownership.'>
              <GuideRuleWriting>Explore on my own</GuideRuleWriting>
            </GuideRuleExample>

            <GuideRuleExample type="do" text='Use "I" in agreement statements.'>
              <GuideRuleWriting>
                I agree to follow the terms of service
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Punctuation',
      wrapText: false,
      text: (
        <>
          <GuideRule
            heading="Don't use unneccessary punctuation"
            description="Although punctuation can help clarify meaning, it can also
      clutter the UI. Don't add a colon after a label, an ellipsis (...)
      at the end of an action, an (s) at the end of a noun, or add parentheses
      ().">
            <GuideRuleExample
              panelDisplay="block"
              type="do"
              text='Use an "s" or "es" to show plural.'>
              <EuiFormRow
                label="Airports"
                helpText="Separate multiple names with a comma">
                <EuiFieldText />
              </EuiFormRow>
            </GuideRuleExample>

            <GuideRuleExample
              panelDisplay="block"
              type="dont"
              text="Use (s), a colon after labels, or parenthetical statements.">
              <EuiFormRow
                label="Airport(s):"
                helpText="Separate multiple names with a comma (other characters are unsupported).">
                <EuiFieldText />
              </EuiFormRow>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule heading="" description="">
            <GuideRuleExample
              panelDisplay="block"
              type="do"
              text="Remove the ellipsis from Search fields.">
              <EuiFieldSearch
                defaultValue="Search"
                aria-label="Search example"
              />
            </GuideRuleExample>

            <GuideRuleExample
              panelDisplay="block"
              type="do"
              text="Use an ellipsis for truncated text or situations that require waiting.">
              <EuiFieldSearch
                defaultValue="Loading..."
                aria-label="Search loading example"
              />
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Know when to use the ending period"
            description="Use periods at the end of help text and complete sentences
      in body text. These are typically supplemental explanations and
      instructions. Avoid periods in titles and headings.">
            <GuideRuleExample
              panelDisplay="block"
              type="do"
              text="Use periods at the end of help text.">
              <EuiFormRow
                label="Number"
                helpText={
                  <span>
                    Accepts 1–5. <EuiLink>Learn more.</EuiLink>
                  </span>
                }>
                <EuiFieldNumber min={1} max={5} step={1} />
              </EuiFormRow>
            </GuideRuleExample>

            <GuideRuleExample
              panelDisplay="block"
              type="dont"
              text="Use a lead-in sentence without an ending period. It looks wrong.">
              <EuiTitle size="s">
                <span>Index management</span>
              </EuiTitle>
              <EuiText>
                Update your Elasticsearch indices individually or in bulk
              </EuiText>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Use contractions"
            description='Use contractions if they make your text flow more naturally,
      such as "didn&apos;t" instead of  "did not" and
      "can&apos;t" instead of "cannot."'>
            <GuideRuleExample
              type="do"
              text="Use contractions if they make the text easier to read.">
              <GuideRuleWriting>
                Didn&apos;t find what you were looking for?
              </GuideRuleWriting>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text="Without the contraction, this text sounds stilted.">
              <GuideRuleWriting>
                Did not find what you were looking for?
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Limit the use of exclamation points"
            description="Showing excitement is best reserved for greetings and
      encouraging messages. Don't use more than one exclamation point per page.">
            <GuideRuleExample
              type="do"
              text="Use exclamations for encouragement, but use sparingly.">
              <GuideRuleWriting>
                This dashboard is empty. Fill it up!
              </GuideRuleWriting>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text="Use exclamation points in error messages.">
              <GuideRuleWriting>
                Couldn&apos;t find any Elasticsearch data!
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Messages',
      wrapText: false,
      text: (
        <>
          <GuideRule
            heading="Summarize the message in the title"
            description="Don't start with the words error, warning, and confirm, or
      jargon such as oops and uh-oh. A title-only message is ok.">
            <GuideRuleExample
              panelDisplay="block"
              type="do"
              text="Provide a title that is meaningful to the user.">
              <EuiTitle size="xs">
                <span>This dashboard is empty</span>
              </EuiTitle>
              <EuiText size="s">
                <p>
                  To add a visualization, click Add in the menu bar. No
                  visualizations yet? Go to Visualize to create one.
                </p>
              </EuiText>
            </GuideRuleExample>

            <GuideRuleExample
              panelDisplay="block"
              type="dont"
              text="Use uh-oh, oops, or other meaningless text in the title.">
              <EuiTitle size="xs">
                <span>Uh-oh!</span>
              </EuiTitle>
              <EuiText size="s">
                <p>
                  This dashboard is empty. To add a visualization, click Add in
                  the menu bar. No visualizations yet? Go to the Visualize app
                  to create one.
                </p>
              </EuiText>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Include critical information first"
            description="Tell the user the most important information first, and less critical information second.">
            <GuideRuleExample
              type="do"
              text="Prioritize the contents of the message.">
              <GuideRuleWriting>
                You need to increase your subscription limit. Please contact
                support.
              </GuideRuleWriting>
            </GuideRuleExample>

            <GuideRuleExample
              type="dont"
              text="Hide important information at the end.">
              <GuideRuleWriting>
                Contact support because you need to increase your subscription
                limit.
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule heading="" description="">
            <GuideRuleExample
              type="do"
              text="State what went wrong, followed by a clear course of action.">
              <GuideRuleWriting>
                No data sources. Go to Management to define an index pattern.
              </GuideRuleWriting>
            </GuideRuleExample>

            <GuideRuleExample
              type="dont"
              text="Leave the user guessing about next steps.">
              <GuideRuleWriting>Oops, no data sources.</GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading='Avoid using "Are you sure"'
            description="Your text is more direct without it.">
            <GuideRuleExample
              type="do"
              text="Keep titles as concise as possible.">
              <EuiPanel style={{ transform: 'scale(.75)' }}>
                <EuiTitle size="m">
                  <span>Delete this report?</span>
                </EuiTitle>
                <EuiSpacer />
                <EuiFlexGroup justifyContent="flexEnd" gutterSize="none">
                  <EuiButtonEmpty color="text" size="s">
                    Cancel
                  </EuiButtonEmpty>
                  <EuiButton color="danger" size="s">
                    Delete
                  </EuiButton>
                </EuiFlexGroup>
              </EuiPanel>
            </GuideRuleExample>

            <GuideRuleExample
              type="dont"
              text="Pad the title with empty words&mdash;it increases reading time.">
              <EuiPanel style={{ transform: 'scale(.75)' }}>
                <EuiTitle size="m">
                  <span>Are you sure you want to delete this report?</span>
                </EuiTitle>
                <EuiSpacer />
                <EuiFlexGroup justifyContent="flexEnd" gutterSize="none">
                  <EuiButtonEmpty color="text" size="s">
                    Cancel
                  </EuiButtonEmpty>
                  <EuiButton color="danger" size="s">
                    Delete report
                  </EuiButton>
                </EuiFlexGroup>
              </EuiPanel>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading='Avoid using "please"'
            description='In most cases, "please" is unnecessary.
      Exceptions are situations where the user must wait or do something inconvenient.
      Or, if the text sounds too abrupt without it.'>
            <GuideRuleExample
              type="do"
              text='Omit "please" in longer instructions.'>
              <GuideRuleWriting>
                Save your work before generating a report.
              </GuideRuleWriting>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text='Use "please" when a pleasantry is not needed.'>
              <GuideRuleWriting>
                Please save your work before generating a report.
              </GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule heading="" description="">
            <GuideRuleExample
              type="do"
              text='Use "please" only when it feels natural and makes short text less abrupt.'>
              <GuideRuleWriting>
                Your session has expired. Please log in again.
              </GuideRuleWriting>
            </GuideRuleExample>
            <GuideRuleExample
              type="do"
              text='Use "please" when asking the user to wait. '>
              <GuideRuleWriting>Please wait.</GuideRuleWriting>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Use 1 to 2 simple, short sentences"
            description="Don&rsquo;t force the user to read long blocks of text. Write for scanning. Link to documentation.">
            <GuideRuleExample
              panelDisplay="block"
              type="do"
              text="Write for scanning.">
              <EuiFormRow
                label="Password"
                helpText="Must be least 8 characters and include upper and lower case letters, numbers, and symbols such as !@#$%.">
                <EuiFieldPassword />
              </EuiFormRow>
            </GuideRuleExample>

            <GuideRuleExample
              panelDisplay="block"
              type="dont"
              text="Write long blocks of text.">
              <EuiFormRow
                label="Password"
                helpText="Passwords must be at least 8 characters long. Good passwords
          contain either a combination of upper and lowercase letters or a
          combination of letters with one digit. Strong passwords contain either
          a combination of letters and more than one digit or special characters.">
                <EuiFieldPassword />
              </EuiFormRow>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Avoid the urge to explain everything"
            description="Not every task requires an explanation nor does every field require placeholder text.">
            <GuideRuleExample
              panelDisplay="block"
              type="do"
              text=" Explain new or difficult concepts.">
              <EuiFormRow
                label="Index template"
                helpText="A template defines the settings, mappings, and aliases to apply when you create an index.">
                <EuiFieldText />
              </EuiFormRow>
            </GuideRuleExample>

            <GuideRuleExample
              panelDisplay="block"
              type="dont"
              text="Provide explanations for common actions.">
              <EuiFormRow
                label="Email"
                helpText="Please enter your email address.">
                <EuiFieldText />
              </EuiFormRow>
            </GuideRuleExample>
          </GuideRule>
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Labels',
      wrapText: false,
      text: (
        <>
          <GuideRule
            heading="Convey the purpose of the component"
            description="Avoid long labels, but don't sacrifice clarity. If needed,
      put additional information in help text and tooltips.">
            <GuideRuleExample
              panelDisplay="block"
              type="do"
              text="Use labels that say what the component does.">
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
            </GuideRuleExample>
            <GuideRuleExample
              panelDisplay="block"
              type="dont"
              text="Use generic labels.">
              <EuiFormRow>
                <EuiCheckbox
                  onChange={() => {}}
                  id={htmlIdGenerator()()}
                  label="Combine other"
                />
              </EuiFormRow>
              <EuiFormRow label="Bucket label">
                <EuiFieldText />
              </EuiFormRow>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule
            heading="Label buttons with their action"
            description="Don't use Yes or OK when you can use a verb phrase instead.">
            <GuideRuleExample
              type="do"
              text="Use a verb + noun for a button label.">
              <EuiPanel style={{ transform: 'scale(.75)' }}>
                <EuiTitle size="m">
                  <span>Remove this index pattern?</span>
                </EuiTitle>
                <EuiSpacer />
                <EuiFlexGroup justifyContent="flexEnd" gutterSize="none">
                  <EuiButtonEmpty color="text" size="s">
                    Cancel
                  </EuiButtonEmpty>
                  <EuiButton color="danger" size="s">
                    Remove index pattern
                  </EuiButton>
                </EuiFlexGroup>
              </EuiPanel>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text="Use vague labels, such as Yes and OK.">
              <EuiPanel style={{ transform: 'scale(.75)' }}>
                <EuiTitle size="m">
                  <span>Remove this index pattern?</span>
                </EuiTitle>
                <EuiSpacer />
                <EuiFlexGroup justifyContent="flexEnd" gutterSize="none">
                  <EuiButtonEmpty color="text" size="s">
                    Cancel
                  </EuiButtonEmpty>
                  <EuiButton color="danger" size="s">
                    Ok
                  </EuiButton>
                </EuiFlexGroup>
              </EuiPanel>
            </GuideRuleExample>
          </GuideRule>
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Be careful with humor',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              Your text can be fun as long as it fits the experience&mdash;and
              doesn&apos;t get in the user&apos;s way. Clever text can become
              annoying when used for frequently performed tasks. Situations
              where the user might lose data or otherwise be frustrated are also
              not appropriate for humor.
            </p>
          </EuiText>
          <GuideRule heading="" description="">
            <GuideRuleExample
              type="do"
              text="Make it fun only if it fits the experience.">
              <GuideRuleWriting>
                Odd, exciting, and scary trends and anomalies in your
                Elasticsearch data
              </GuideRuleWriting>
            </GuideRuleExample>
            <GuideRuleExample
              panelDisplay="block"
              type="dont"
              text="Be clever with a serious message.">
              <EuiTitle size="xs">
                <span>
                  <EuiIcon type="faceSad" /> No results found
                </span>
              </EuiTitle>
              <EuiSpacer />
              <EuiText>
                <p>
                  Unfortunately, I could not find any results matching your
                  search. I tried really hard. I looked all over the place and
                  frankly, I just couldn&apos;t find anything good. Help me,
                  help you.
                </p>
              </EuiText>
            </GuideRuleExample>
          </GuideRule>
          <EuiHorizontalRule />
        </>
      ),
    },
    {
      title: 'Verifying your text',
      wrapText: false,
      text: (
        <>
          <EuiSpacer />
          <EuiFlexGrid gutterSize="xl" columns={3}>
            <EuiFlexItem>
              <EuiCard
                paddingSize="none"
                display="plain"
                titleSize="xs"
                layout="horizontal"
                title="Work with a writer"
                description="A writer can help determine where you need text and what it should
              say."
              />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiCard
                paddingSize="none"
                display="plain"
                titleSize="xs"
                layout="horizontal"
                title="Read your text out loud"
                description="Word flow has a natural feel to it. Read your text out loud, make
              changes, and then repeat until the flow of your text feels
              natural."
              />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiCard
                paddingSize="none"
                display="plain"
                titleSize="xs"
                layout="horizontal"
                title="Use spell check"
                description="Run your text through a spelling and grammar checker."
              />
            </EuiFlexItem>
          </EuiFlexGrid>
        </>
      ),
    },
  ],
};
