import React from 'react';

import {
  GuidePage,
  GuideGuideline,
  GuideGuidelineExample,
  GuideGuidelineTitle,
} from '../../components';


import {
  EuiText,
  EuiTitle,
  EuiButton,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiFieldSearch,
  EuiFieldText,
  EuiButtonEmpty,
  EuiFieldPassword,
  EuiCheckbox,
  EuiFormRow,
  EuiIcon,
  EuiFieldNumber,
  EuiLink,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default () => (
  <GuidePage title="Writing">
    <EuiText>
      <h1>Writing</h1>❏
      <p>
        You can have the most beautiful UI,
        but without <b>consistent, easy-to-understand text</b>,
        you haven’t built the best user experience.
      </p>
    </EuiText>

    <GuideGuidelineTitle>Principles</GuideGuidelineTitle>

    <EuiSpacer size="xxl" />

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Clear and concise</h3>
            <p>Get straight to the point&mdash;in a way that your users understand.  Make every word contribute to meaning.</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>

        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Consistent</h3>
            <p>Use the same terminology to mean the same thing. Make sure spelling, capitalization,
              punctuation, labels, and use of abbreviations are all consistent.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Conversational</h3>
            <p>Write as a professional in the field would talk&mdash;not as
            a professor lecturing students. Use words that the user would use.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>

    <GuideGuidelineTitle>Style</GuideGuidelineTitle>

    <GuideGuideline
      heading="Address users as &quot;you.&quot;"
      description="It&apos;s friendly and engages the user directly."
    >

      <GuideGuidelineExample type="do" text="You must configure TLS to apply a Platinum License." />
      <GuideGuidelineExample type="dont" text="Configuring TLS will be required to apply a Platinum License." />
    </GuideGuideline>

    <GuideGuideline
      heading="Write in active voice"
      description="Active voice puts the focus on who or what is performing the action and makes the sentence easier to understand."
    >

      <GuideGuidelineExample type="do" text="The Elasticsearch Query DSL builds filters." />
      <GuideGuidelineExample type="dont" text="Filters are built using the Elasticsearch Query DSL." />
    </GuideGuideline>

    <GuideGuideline
      heading="Write short, snappy text"
      description="Identify the most important information and say it concisely.
        Don&apos;t repeat what&apos;s already been said or state the obvious.&nbsp;
        Omit common introductory phrases."
    >

      <GuideGuidelineExample type="do">
        <EuiText><h2>Edit saved objects</h2></EuiText>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont">
        <EuiText>
          <h2>Edit saved objects</h2>
          <p>From here, you can edit saved objects. To get started, follow these steps.</p>
        </EuiText>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading=""
      description=""
    >
      <GuideGuidelineExample type="do" text="Configure at least one index pattern." />
      <GuideGuidelineExample type="dont" text="In order to use Kibana, you must configure at least one index pattern." />
    </GuideGuideline>

    <GuideGuideline
      heading=""
      description=""
    >
      <GuideGuidelineExample type="do" text="No active shard records for this cluster." />
      <GuideGuidelineExample type="dont" text="There are currently no active shard records for this cluster." />
    </GuideGuideline>

    <GuideGuideline
      heading="Avoid using &quot;I&quot; and &quot;we&quot;"
      description="The use of &quot;I&quot; and &quot;we&quot; can come across as patronizing.
        Instead of what you recommend or what your app is doing, focus on your users."
    >
      <GuideGuidelineExample type="do" text="Your index has a date field." />
      <GuideGuidelineExample type="dont" text="I see that you are looking at an index with a date field." />
    </GuideGuideline>

    <GuideGuideline
      heading=""
      description=""
    >
      <GuideGuidelineExample type="do" text="For maximum compatibility, share the short URL of the snapshot." />
      <GuideGuidelineExample type="dont" text="We recommend sharing shortened snapshot URLs for maximum compatibility." />
    </GuideGuideline>

    <GuideGuidelineTitle>Capitalization</GuideGuidelineTitle>

    <GuideGuideline
      heading="Use sentence case for all text"
      description="This includes buttons, menus, and titles.
        In sentence case, only the first word and proper names are capped."
    >

      <GuideGuidelineExample type="do">
        <EuiTitle>
          <span>Create index patterns</span>
        </EuiTitle>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont">
        <EuiTitle>
          <span>Create Index Patterns</span>
        </EuiTitle>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading=""
      description=""
    >
      <GuideGuidelineExample type="do" text="">
        <EuiButton>Set up index pattern</EuiButton>
      </GuideGuidelineExample>
      <GuideGuidelineExample type="dont" text="">
        <EuiButton>Set Up Index Pattern</EuiButton>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuidelineTitle>Punctuation</GuideGuidelineTitle>

    <GuideGuideline
      heading="Use punctuation judiciously"
      description="Although punctuation can help clarify meaning, it can also clutter the UI.
        Don&apos;t add a colon after a label, an ellipsis at the end of an action, or an (s) at the end of a noun."
    >

      <GuideGuidelineExample type="do">
        <EuiFormRow
          label="Airports"
          helpText="Separate multiple names with a comma"
        >
          <EuiFieldText />
        </EuiFormRow>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont">
        <EuiFormRow
          label="Airport(s):"
          helpText="Separate multiple names with a comma."
        >
          <EuiFieldText />
        </EuiFormRow>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading=""
      description=""
    >
      <GuideGuidelineExample type="do" text="">
        <EuiFieldSearch defaultValue="Search"/>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont">
        <EuiFieldSearch defaultValue="Search..."/>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading="Omit the ending period"
      description="Short phrases and single sentences in tooltips, lists, help text, and subtitles don&apos;t
        typically require a full stop. Always use periods on multiple sentences."
    >
      <GuideGuidelineExample type="do" text="">
        <EuiFormRow
          label="Number"
          helpText="Number must be between 1 and 5"
        >
          <EuiFieldNumber min={1} max={5} step={1} />
        </EuiFormRow>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont" text="">
        <EuiFormRow
          label="Number"
          helpText="Number must be between 1 and 5."
        >
          <EuiFieldNumber min={1} max={5} step={1} />
        </EuiFormRow>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading=""
      description=""
    >
      <GuideGuidelineExample type="do" text="">
        <EuiFormRow
          label="Number"
          helpText={<span>Number must be between 1 and 5. <EuiLink>Learn more.</EuiLink></span>}
        >
          <EuiFieldNumber min={1} max={5} step={1} />
        </EuiFormRow>
      </GuideGuidelineExample>

      <EuiFlexItem />
    </GuideGuideline>


    <GuideGuideline
      heading="Use contractions"
      description="Use contractions if they make your text flow more naturally, such as
        &quot;didn&apos;t&quot; instead of  &quot;did not&quot; and  &quot;can&apos;t&quot; instead of &quot;cannot.&quot;"
    >
      <GuideGuidelineExample type="do" text="Didn&apos;t find what you were looking for?" />
      <GuideGuidelineExample type="dont" text="Did not find what you were looking for?" />
    </GuideGuideline>

    <GuideGuideline
      heading="Limit the use of exclamation points"
      description="Showing excitement is best reserved for greetings and encouraging messages.
        Don&apos;t use more than one exclamation point per page."
    >
      <GuideGuidelineExample type="do" text="This dashboard is empty.  Let&apos;s fill it up!" />
      <GuideGuidelineExample type="dont" text="Couldn&apos;t find any Elasticsearch data!" />
    </GuideGuideline>

    <GuideGuidelineTitle>Messages</GuideGuidelineTitle>

    <GuideGuideline
      heading="Summarize the message in the title"
      description="Get straight to the message.
        Don&apos;t start with the words error, warning, and confirm, or jargon such as oops and uh-oh.
        A title-only message is ok."
    >
      <GuideGuidelineExample type="do" text="">
        <EuiTitle size="s"><span>This dashboard is empty. Let&apos;s fill it up!</span></EuiTitle>
        <EuiSpacer/>
        <EuiText>
          <p>
            To add a visualization, click Add in the menu bar. No visualizations yet?
            Go to the Visualize app to create one.
          </p>
        </EuiText>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont" text="">
        <EuiTitle size="s"><span>Uh-oh!</span></EuiTitle>
        <EuiSpacer/>
        <EuiText>
          <p>
            This dashboard is empty.  To add a visualization, click Add in the menu bar. No visualizations yet?
            Go to the Visualize app to create one.
          </p>
        </EuiText>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading="Provide a clear course of action"
      description="Tell the user what to do next, if applicable."
    >
      <GuideGuidelineExample type="do" text="No data sources. Go to the Management app to define an index pattern." />
      <GuideGuidelineExample type="dont" text="Oops, no data sources." />
    </GuideGuideline>

    <GuideGuideline
      heading="Avoid using &quot;Are you sure&quot;"
      description="Your text is more direct without it."
    >
      <GuideGuidelineExample type="do" text="Delete this report?">
        <EuiSpacer />
        <EuiButtonEmpty color="text" size="s">Cancel</EuiButtonEmpty>
        <EuiButton color="danger" size="s">Delete</EuiButton>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont" text="Are you sure you want to delete this report?">
        <EuiSpacer />
        <EuiButtonEmpty color="text" size="s">Cancel</EuiButtonEmpty>
        <EuiButton color="danger" size="s">Delete Report</EuiButton>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading="Avoid using &quot;please&quot;"
      description="An exception is for situations where the user must wait or do something inconvenient."
    >
      <GuideGuidelineExample type="do" text="Save your work before generating a report." />
      <GuideGuidelineExample type="dont" text="Please save your work before generating a report." />
    </GuideGuideline>

    <GuideGuidelineTitle>Informational text</GuideGuidelineTitle>

    <GuideGuideline
      heading="Use 1 to 2 simple, short sentences"
      description="Don&rsquo;t force the user to read long blocks of text. Write for scanning. Link to documentation."
    >
      <GuideGuidelineExample type="do" text="">
        <EuiFormRow
          label="Password"
          helpText="Must be least 8 characters and include upper and lower case letters, numbers, and symbols such as !@#$%&"
        >
          <EuiFieldPassword />
        </EuiFormRow>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont" text="">
        <EuiFormRow
          label="Password"
          helpText="Passwords must be at least 8 characters long.
            Good passwords contain either a combination of upper and lowercase letters or a combination of letters with one digit.
            Strong passwords contain either a combination of letters and more than one digit or special characters."
        >
          <EuiFieldPassword />
        </EuiFormRow>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading="Avoid the urge to explain everything"
      description="Not every task requires an explanation nor every field requires placeholder text."
    >
      <GuideGuidelineExample type="do" text="">
        <EuiFormRow
          label="Email"
        >
          <EuiFieldText />
        </EuiFormRow>
      </GuideGuidelineExample>

      <GuideGuidelineExample type="dont" text="">
        <EuiFormRow
          label="Email"
          helpText="Please enter your email address."
        >
          <EuiFieldText />
        </EuiFormRow>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuidelineTitle>Labels</GuideGuidelineTitle>

    <GuideGuideline
      heading="Convey the purpose of the component"
      description="Avoid long labels, but don&apos;t sacrifice clarity.
        If needed, put additional information in help text and tooltips."
    >
      <GuideGuidelineExample type="do" text="">
        <EuiFormRow>
          <EuiCheckbox
            onChange={() => {}}
            id={makeId()}
            label="Combine values in other bucket"
          />
        </EuiFormRow>
        <EuiFormRow
          label="Bucket label"
        >
          <EuiFieldText />
        </EuiFormRow>
      </GuideGuidelineExample>
      <GuideGuidelineExample type="dont" text="">
        <EuiFormRow>
          <EuiCheckbox
            onChange={() => {}}
            id={makeId()}
            label="Combine other"
          />
        </EuiFormRow>
        <EuiFormRow
          label="Custom bucket label"
        >
          <EuiFieldText />
        </EuiFormRow>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuideline
      heading="Label buttons with their action"
      description="Don&apos;t use Yes or OK when you can use a verb phrase instead."
    >
      <GuideGuidelineExample type="do" text="Remove this index pattern?">
        <EuiSpacer />
        <EuiButtonEmpty color="text" size="s">Cancel</EuiButtonEmpty>
        <EuiButton color="danger" size="s">Remove</EuiButton>
      </GuideGuidelineExample>
      <GuideGuidelineExample type="dont" text="Remove this index pattern?">
        <EuiSpacer />
        <EuiButtonEmpty color="text" size="s">Cancel</EuiButtonEmpty>
        <EuiButton color="danger" size="s">Ok</EuiButton>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuidelineTitle>When to be clever</GuideGuidelineTitle>

    <GuideGuideline
      heading="Be careful with humor"
      description="Your text can be fun and witty as long as it fits the experience&mdash;and
        doesn&apos;t get in the user&apos;s way. Clever text can become annoying
        when used for frequently performed tasks."
    >
      <GuideGuidelineExample type="do" text="Odd, exciting, and scary trends and anomalies in your Elasticsearch data" />
      <GuideGuidelineExample type="do" text="Some cool stuff you can do" />
    </GuideGuideline>

    <GuideGuideline
      heading="Don&apos;t be clever with a serious message"
      description="Losing data and other situations that might frustrate the user are not a time for humor."
    >
      <GuideGuidelineExample type="do" text="">
        <EuiTitle size="s"><span>No results matched your search</span></EuiTitle>
      </GuideGuidelineExample>
      <GuideGuidelineExample type="dont" text="">
        <EuiTitle size="s"><span><EuiIcon type="faceSad" /> No results found</span></EuiTitle>
        <EuiSpacer />
        <EuiText>
          <p>
            Unfortunately, I could not find any results matching your search.
            I tried really hard.  I looked all over the place and frankly, I just couldn&apos;t find anything good.
            Help me, help you.
          </p>
        </EuiText>
      </GuideGuidelineExample>
    </GuideGuideline>

    <GuideGuidelineTitle>Verifying your text</GuideGuidelineTitle>

    <EuiSpacer size="xxl" />

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Work with a writer on your text</h3>
            <p>A writer can help determine where you need text and what it should say.</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>

        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Word flow has a natural feel to it</h3>
            <p>Read your text out loud, make changes, and then repeat until the flow of your text feels just right.</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Use spell check</h3>
            <p>Run your text through a spelling and grammar checker.</p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>

  </GuidePage>
);
