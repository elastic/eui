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
            <p>Use the same terminology to mean the same thing. Make sure spelling, use of
              abbreviations, labels, capitalization, and punctuation are all consistent.
            </p>
          </EuiText>
        </EuiPanel>

      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiPanel paddingSize="l">
          <EuiText>
            <h3>Conversational</h3>
            <p>Write as a professional in the field would talk&mdash;not as
            a professor lecturing students. Use words that the user would use. Add a touch of whimsy when it
            fits the experience.
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
          <p><strong>Address your users as &quot;you.&quot;</strong> You&rsquo;ll connect with them on a personal level.</p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>You must configure TLS to apply a Platinum License</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>Configuring TLS will be required to apply a Platinum License</p>
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
          <p><strong>Use active rather than passive voice.</strong> It&apos;s more clear and less wordy.</p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>The Elasticsearch Query DSL builds filters</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>Filters are built using the Elasticsearch Query DSL</p>
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
          <p><strong>Keep text short and snappy.</strong>&nbsp;
           Don&rsquo;t repeat what&rsquo;s already been said or state the obvious.&nbsp;
           Omit common introductory phrases and other unneccessary words.
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
          <p>From here, you can edit saved objects</p>
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
          <p>Configure at least one index pattern</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>In order to use Kibana, you must configure at least one index pattern</p>
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
          <p>No active shard records for this cluster</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>There are currently no active shard records for this cluster</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem />

      <EuiFlexItem />

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>To get started, follow the steps below</p>
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
          <p><strong>Avoid using &quot;we&quot; or &quot;I.&quot;</strong>&nbsp;
          Instead of what you recommend or what your app is doing, focus on your users.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>Your index has a date field</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
          <p>I see that you are looking at an index with a date field</p>
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>


    <EuiSpacer size="xxl"/>

    <EuiText>
      <h2>Capitalization</h2>
    </EuiText>
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <p><strong>Use sentence case for all text</strong>, including buttons, menus, and titles.</p>
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

    <EuiText>
      <h2>Punctuation</h2>
    </EuiText>
    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <p><strong>Avoid using punctuation marks</strong>, unless they help clarify meaning.&nbsp;
          Don&rsquo;t add a colon after a label, an ellipsis at the end of an action, or an (s) at the end of a noun.
          </p>
          <p><strong>Omit the ending period in single sentences</strong> in tooltips, lists, and body text in forms.</p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
                  Number
          <EuiFieldText />
                  Number must be between 1 and 5
          <EuiSpacer />
          <EuiFieldSearch defaultValue="Search"/>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="danger" >
                  Number:
          <EuiFieldText />
                  Number must be between 1 and 5.
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
          <p><strong>Use contractions</strong> if they make your text easier to comprehend.</p>
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
          <p><strong>Limit exclamation points</strong> to greetings and success messages and never use more than one per page.</p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiToast color="success"  >
          <p>You don&apos;t have any dashboards. Let&apos;s create some!</p>
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem />
    </EuiFlexGroup>

    <EuiSpacer size="xxl"/>


    <EuiText>
      <h2>Messages</h2>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <p>
            <strong>Summarize the message in the title.</strong>&nbsp;
            Don&rsquo;t use the words error, warning, confirm, or jargon such as oops and uh-oh.
          </p>
          <p><strong>In the body text, provide a clear course of action</strong>, if applicable.
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
          color="success"
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
          <p><strong>Use &quot;Are you sure&quot; only rarely.</strong> Your text is more direct without it.</p>
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
          <p><strong>Avoid using &quot;please.&quot;</strong>&nbsp;
          An exception is when you ask the user to do something inconvenient, such as wait.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
     Save your work before generating a report
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="danger"
        >
    Please save your work before generating a report
        </EuiToast>
        <EuiText>
          <p><font color="red">Don&apos;t</font></p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="xxl"/>

    <EuiText>
      <h2>Informational text</h2>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <p>
            <strong> Use one to two simple, short sentences</strong> for introductions and informational text.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
        For maximum compatibility, share the short URL of the snapshot.
        Not all wiki and markup parsers can handle the full-length version.
        </EuiToast>
        <EuiText>
          <p><font color="green">Do</font></p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="danger"
        >
        We recommend sharing shortened snapshot URLs for maximum compatibility.&nbsp;
        Internet Explorer has URL length restrictions, and some wiki and markup parsers&nbsp;
        do not do well with the full-length version of the snapshot URL,&nbsp;
        but the short URL should work great.
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
          <p>
            <strong>Avoid the urge to explain
      everything.
            </strong>  Not every field requires placeholder
      text nor every task requires an explanation.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast
          color="success"
        >
        Password
          <EuiFieldPassword defaultValue="password" />
        Must be least 8 characters and include upper and lower case letters, numbers, and symbols such as !@#$%&.

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

    <EuiText>
      <h2>Labels</h2>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <p><strong>Use just enough words to convey the purpose of the component</strong>, typically three words or less.
      When needed, add a short instruction under the component.
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
            label="Show remaining slices"
          />
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
            label="Show other"
          />
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
          <p><strong>Label buttons with their action.</strong> Don&apos;t use Yes or OK when you can use a verb phrase instead.  </p>
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
          Remove index
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

    <EuiText>
      <h2>When to be clever</h2>
    </EuiText>

    <EuiSpacer />


    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiText>
          <p>
           Your text can be fun and witty as long as it doesn&apos;t get in the way of the user.
          </p>
          <p>
            <strong>Don&apos;t be clever with a serious message</strong>&mdash;especially if the
           user might lose data&mdash;or a frequently performed task.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiToast color="success">
          <p>Odd, exciting, and scary trends and anomalies in your Elasticsearch data</p>
        </EuiToast>
        <EuiSpacer/>
        <EuiSpacer/>

        <EuiToast color="success"  >
          <p>Some cool stuff you can do</p>
        </EuiToast>
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
