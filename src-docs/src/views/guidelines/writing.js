import React from 'react';

import {
  GuidePage,
} from '../../components';


import {
  EuiText,
  EuiButton,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiToast,
  EuiPanel,
  EuiFieldSearch,
  EuiFieldText,
  EuiButtonEmpty,
  EuiFieldPassword,
  EuiCheckbox,
  EuiLink,
} from '../../../../src/components';

export default () => (
  <GuidePage title="Writing">
    <EuiText>
      <h1>Writing</h1>
      <p>
        You can have the most beautiful UI,
        but without <b>consistent, easy-to-understand text</b>,
        you haven’t built the best user experience.
      </p>

    </EuiText>
    <EuiSpacer />
    <EuiSpacer />

    <EuiText>
      <h2>Principles</h2>
    </EuiText>

    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
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

    <EuiSpacer />

    <EuiSpacer />

    <EuiText>
      <h2>Style</h2>
    </EuiText>

    <EuiSpacer />
    <EuiSpacer />


    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Address users as &quot;you.&quot;</h3>
          <p>It&apos;s friendly and engages the user directly.</p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>You must configure TLS to apply a Platinum License.</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>Configuring TLS will be required to apply a Platinum License.</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Write in active voice</h3>
          <p>Active voice puts the
          focus on who or what is performing the action and makes the sentence easier to understand.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>The Elasticsearch Query DSL builds filters.</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>Filters are built using the Elasticsearch Query DSL.</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Write short, snappy text</h3>

          <p>
           Identify the most important information and say it concisely.
           Don&apos;t repeat what&apos;s already been said or state the obvious.&nbsp;
           Omit common introductory phrases.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <h2>Edit saved objects</h2>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <h2>Edit saved objects</h2>
          <p>From here, you can edit saved objects. To get started, follow these steps.</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />


    <EuiFlexGroup>
      <EuiFlexItem />

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>Configure at least one index pattern.</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>In order to use Kibana, you must configure at least one index pattern.</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />


    <EuiFlexGroup>
      <EuiFlexItem />

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>No active shard records for this cluster.</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>There are currently no active shard records for this cluster.</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Avoid using &quot;I&quot; and &quot;we&quot;</h3>
          <p>The use of &quot;I&quot; and &quot;we&quot; can come across as patronizing.
          Instead of what you recommend or what your app is doing, focus on your users.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>Your index has a date field.</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>I see that you are looking at an index with a date field.</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>


    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem />
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
        For maximum compatibility, share the short URL of the snapshot.
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="danger"
        >
        We recommend sharing shortened snapshot URLs for maximum compatibility.
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="xxl"/>
    <EuiSpacer size="xxl"/>

    <EuiText>
      <h2>Capitalization</h2>
    </EuiText>
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Use sentence case for all text</h3>
          <p>This includes buttons, menus, and titles.
          In sentence case, only the first word and proper names are capped.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <h2>Create index patterns</h2>
          <EuiSpacer />
          <EuiButton size="s" onClick={() => window.alert('Button clicked')} >
                  Set up index pattern
          </EuiButton>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <h2>Create Index Patterns</h2>
          <EuiSpacer />
          <EuiButton size="s" onClick={() => window.alert('Button clicked')} >
                  Set Up Index Pattern
          </EuiButton>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>



    <EuiSpacer size="xxl"/>
    <EuiSpacer size="xxl"/>


    <EuiText>
      <h2>Punctuation</h2>
    </EuiText>
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Use punctuation judiciously</h3>
          <p>Although punctuation can help clarify meaning, it can also clutter the UI.
          Don&apos;t add a colon after a label, an ellipsis at the end of an action, or an (s) at the end of a noun.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
                  Airports
          <EuiFieldText />
                  Separate multiple names with a comma
          <EuiSpacer />
          <EuiFieldSearch defaultValue="Search"/>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
                  Airport(s):
          <EuiFieldText />
                  Separate multiple names with a comma.
          <EuiSpacer />
          <EuiFieldSearch defaultValue="Search..."/>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />


    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Omit the ending period</h3>
          <p>Short phrases and single sentences in tooltips, lists, help text, and subtitles don&apos;t
          typically require a full stop. Always use periods on multiple sentences.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
                  Number
          <EuiFieldText />
                  Number must be between 1 and 5
          <EuiSpacer />
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
                  Number
          <EuiFieldText />
                  Number must be between 1 and 5.
          <EuiSpacer />
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem />

      <EuiFlexItem>
        <EuiToast color="success"  >
        Number
          <EuiFieldText />
          Number must be between 1 and 5.&nbsp;
          <EuiLink href="" target="_blank">
          Learn more.
          </EuiLink>
          <EuiSpacer />
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem />
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Use contractions</h3>
          <p>Use contractions if they make your text flow more naturally, such as
           &quot;didn&apos;t&quot; instead of  &quot;did not&quot; and  &quot;can&apos;t&quot; instead of &quot;cannot.&quot;
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>Didn&apos;t find what you were looking for?</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast color="danger"  >
          <p>Did not find what you were looking for?</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Limit the use of exclamation points</h3>
          <p>Showing excitement is best reserved for greetings and encouraging messages.
          Don&apos;t use more than one exclamation point per page.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>This dashboard is empty.  Let&apos;s fill it up!</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast color="danger"  >
          <p>Couldn&apos;t find any Elasticsearch data!</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="xxl"/>
    <EuiSpacer size="xxl"/>


    <EuiText>
      <h2>Messages</h2>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>
            Summarize the message in the title
          </h3>
          <p>Get straight to the message.
          Don&apos;t start with the words error, warning, and confirm, or jargon such as oops and uh-oh.
            A title-only message is ok.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast title="This dashboard is empty.  Let's fill it up!" color="success">
              To add a visualization, click Add in the menu bar. No visualizations yet?
              Go to the Visualize app to create one.
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          title="Uh-oh!"
          color="danger"
        >
            This dashboard is empty.  To add a visualization, click Add in the menu bar. No visualizations yet?
            Go to the Visualize app to create one.
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer/>
    <EuiSpacer/>

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Provide a clear course of action</h3>
          <p>Tell the user what to do next, if applicable.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast color="success">
          <p>No data sources. Go to the Management app to define an index pattern.</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="danger"
        >
            Oops, no data sources.
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer/>
    <EuiSpacer/>


    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Avoid using &quot;Are you sure&quot;</h3>
          <p>Your text is more direct without it.</p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          title="Delete this report?"
          color="success"
        >
          <EuiSpacer />
          <EuiButtonEmpty
            onClick={() => window.alert('Button clicked')}
          >
    Cancel
          </EuiButtonEmpty>
          <EuiButton
            size="s"
            color="danger"
            onClick={() => window.alert('Button clicked')}
          >
    Delete report
          </EuiButton>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          title="Are you sure you want to delete this report?"
          color="danger"
        >
          <EuiSpacer />
          <EuiButtonEmpty
            onClick={() => window.alert('Button clicked')}
          >
    Cancel
          </EuiButtonEmpty>
          <EuiButton
            size="s"
            color="danger"
            onClick={() => window.alert('Button clicked')}
          >
    Delete report
          </EuiButton>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer/>
    <EuiSpacer/>

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Avoid using &quot;please&quot;</h3>
          <p>
          An exception is for situations where the user must wait or do something inconvenient.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
     Save your work before generating a report.
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="danger"
        >
    Please save your work before generating a report.
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="xxl"/>
    <EuiSpacer size="xxl"/>

    <EuiText>
      <h2>Informational text</h2>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>
             Use 1 to 2 simple, short sentences
          </h3>
          <p>Don&rsquo;t force the user to read long blocks of text. Write for scanning. Link to documentation.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
        Password
          <EuiFieldPassword defaultValue="password" />
        Must be least 8 characters and include upper and lower case letters, numbers, and symbols such as !@#$%&

        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="danger"
        >
        Password
          <EuiFieldPassword defaultValue="password" />
        Passwords must be at least 8 characters long.
        Good passwords contain either a combination of upper and lowercase
        letters or a combination of letters with one digit.
        Strong passwords contain either a combination of letters and more
        than one digit or special characters.
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>


    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>
            Avoid the urge to explain
      everything
          </h3>
          <p> Not every task requires an explanation nor every field requires placeholder
      text.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
      Email
          <EuiFieldText />
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
    Email
          <EuiFieldText />
      Please enter your email address.
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>


    <EuiSpacer size="xxl"/>
    <EuiSpacer size="xxl"/>


    <EuiText>
      <h2>Labels</h2>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Convey the purpose of the component</h3>
          <p>Avoid long labels, but don&apos;t sacrifice clarity.
      If needed, put additional information in help text and tooltips.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
          <EuiCheckbox
            onChange={() => {}}
            id="checkbox1"
            label="Combine values in other bucket"
          />
          <EuiSpacer />
          Bucket label
          <EuiFieldText/>
          <EuiSpacer />
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast
          color="danger"
        >
          <EuiCheckbox
            onChange={() => {}}
            id="checkbox2"
            label="Combine other"
          />
          <EuiSpacer />

          Custom bucket label
          <EuiFieldText/>
          <EuiSpacer />
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>


    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Label buttons with their action</h3>
          <p>Don&apos;t use Yes or OK when you can use a verb phrase instead.</p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          title="Remove this index pattern?"
          fill
          color="success"
        >
          <EuiButtonEmpty
            onClick={() => window.alert('Button clicked')}
          >
        Cancel
          </EuiButtonEmpty>
          <EuiButton
            size="s"
            onClick={() => window.alert('Button clicked')}
          >
          Remove
          </EuiButton>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          title="Remove this index pattern?"
          color="success"
        >
          <EuiButtonEmpty
            onClick={() => window.alert('Button clicked')}
          >
        Cancel
          </EuiButtonEmpty>
          <EuiButton
            size="s"
            fill
            onClick={() => window.alert('Button clicked')}
          >
  OK
          </EuiButton>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="xxl"/>
    <EuiSpacer size="xxl"/>

    <EuiText>
      <h2>When to be clever</h2>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Be careful with humor</h3>
          <p>
           Your text can be fun and witty as long as it fits the experience&mdash;and
           doesn&apos;t get in the user&apos;s way. Clever text can become annoying
           when used for frequently performed tasks.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast color="success">
          <p>Odd, exciting, and scary trends and anomalies in your Elasticsearch data</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
        <EuiSpacer/>
        <EuiSpacer/>

        <EuiToast color="success"  >
          <p>Some cool stuff you can do</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem />
    </EuiFlexGroup>

    <EuiSpacer />
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h3>Don&apos;t be clever with a serious message</h3>
          <p>Losing data and other situations that might frustrate the user are not a time for humor.</p>

        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast color="danger" title="No results matched your search" />
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast color="danger" title="No results found" iconType="faceSad">
          Unfortunately, I could not find any results matching your search.
          I tried really hard.  I looked all over the place and frankly, I just couldn&apos;t find anything good.
          Help me, help you.
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>




    <EuiSpacer size="xxl"/>

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <h2>
           Verifying your text
          </h2>
          <p>Work with a writer on your text.&nbsp;
          A writer can help determine where you need text and what it should say.
          </p>
          <p>Word flow has a natural feel to it.&nbsp;
          Read your text out loud, make changes, and then repeat until the flow of your text feels just right.
          </p>
          <p>Run your text through a spelling and grammar checker.</p>

        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem />
      <EuiFlexItem />
    </EuiFlexGroup>




  </GuidePage>
);
