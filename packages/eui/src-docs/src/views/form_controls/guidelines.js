import React, { useState } from 'react';
import { GuideRule, GuideRuleExample } from '../../components';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiTitle,
  EuiFieldText,
  EuiFieldSearch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isClearable] = useState(true);
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <EuiTitle>
        <h2>Labels</h2>
      </EuiTitle>

      <GuideRule
        description={
          <p>
            Avoid long labels, but don&lsquo;t sacrifice clarity. If needed, put
            additional information in help text and tooltips.
          </p>
        }
      >
        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Say what the field is in the label. Use help text for additional information."
        >
          <EuiFormRow
            label="Version"
            helpText="Use the `major.minor` format. You can use wildcards `*` to span over multiple versions."
          >
            <EuiFieldText placeholder="2.*" />
          </EuiFormRow>
        </GuideRuleExample>

        <GuideRuleExample
          panelDisplay="block"
          type="dont"
          text="Put everything in the label. It's hard to scan."
          minHeight={130}
        >
          <EuiFormRow label="Numeric version (e.g. `2.*`)">
            <EuiFieldText />
          </EuiFormRow>
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer />

      <EuiTitle>
        <h2>Hint text</h2>
      </EuiTitle>

      <GuideRule
        description={
          <p>
            Place hints and instructions outside a text field so it is always
            visible to the user. Keep the hint text short, maximum two sentences
            long. Use hint text to:
            <EuiSpacer />
            <ul>
              <li>
                Explain <strong>why you are asking a certain question</strong>:
                &quot;We will only email you if there is a problem with your
                order.&quot;
              </li>
              <li>
                Provide <strong>clarifying details</strong> on what to type:
                &quot;Enter the full 32-character ID.&quot;
              </li>
              <li>
                Tell the user <strong>where to find the information</strong>{' '}
                you&apos;re asking for: &quot;Find the Elasticsearch cluster ID
                on the main administration page of your deployment.&quot;
              </li>
            </ul>
          </p>
        }
      >
        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Help users make the right decision by clarifying what goes inside a field."
        >
          <EuiFormRow
            label="Timeout"
            helpText="Use shorthand notation, such as 30s, 10m, or 1h."
          >
            <EuiFieldText />
          </EuiFormRow>
        </GuideRuleExample>

        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Use complete sentences and ending punctuation."
        >
          <EuiFormRow
            label="Name"
            helpText="This is the name that will be visible to other users."
          >
            <EuiFieldText />
          </EuiFormRow>
        </GuideRuleExample>
      </GuideRule>

      <EuiSpacer />

      <EuiTitle>
        <h2>Placeholder text</h2>
      </EuiTitle>

      <GuideRule
        heading="In fields"
        description={
          <p>
            Use the placeholder property to describe the expected value of the
            input or to provide a useful example.
          </p>
        }
      >
        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Provide a simple example that highlights the expected syntax or value."
        >
          <EuiFormRow
            label="Phone number"
            helpText="Include the international call prefix."
          >
            <EuiFieldText placeholder="+33600000000" />
          </EuiFormRow>
        </GuideRuleExample>
        <GuideRuleExample
          panelDisplay="block"
          type="dont"
          text="Start with `for example`, or `e.g.`."
        >
          <EuiFormRow label="Endpoint" helpText="Include the port number.">
            <EuiFieldText placeholder="e.g. https://example.com:9500" />
          </EuiFormRow>
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        description={
          <p>
            Add placeholder text in addition to field labels and help text, not
            as a replacement. Omit it if it doesn&apos;t add value for users.
            And keep it short.
          </p>
        }
      >
        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Place info essential to completing the form outside the field so that it is always visible."
        >
          <EuiFormRow label="Source" helpText="Enter a valid IP address.">
            <EuiFieldText placeholder="192.168.132.6" />
          </EuiFormRow>
        </GuideRuleExample>
        <GuideRuleExample
          panelDisplay="block"
          type="dont"
          text="Use text that adds no value, such as “Type here”."
        >
          <EuiFormRow
            label="Source"
            helpText="Enter CIDR or IP address. For example, `192.168.132.6/22`."
          >
            <EuiFieldText placeholder="Type here" />
          </EuiFormRow>
        </GuideRuleExample>
      </GuideRule>
      <GuideRule>
        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="When space is limited and the UI is very simple, you can use field labels as placeholder text. This must stay an exception."
          minHeight={94}
        >
          <EuiFlexGroup style={{ maxWidth: 600 }}>
            <EuiFlexItem>
              <EuiFormRow>
                <EuiFieldText placeholder="Key" />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow>
                <EuiFieldText placeholder="Value" />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFormRow>
                <EuiButton>Add</EuiButton>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </GuideRuleExample>

        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="If space allows it, prefer following the rule described earlier with labels outside of the fields."
        >
          <EuiFlexGroup style={{ maxWidth: 600 }}>
            <EuiFlexItem>
              <EuiFormRow label="Key">
                <EuiFieldText />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Value">
                <EuiFieldText />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton>Add</EuiButton>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        heading="In search bars"
        description={
          <p>In a search bar, be specific about what users can enter.</p>
        }
      >
        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Give users a hint at things they might want to search for. State the action the user performs (find, search) instead of the field functionality (jump to)."
        >
          <EuiFieldSearch
            placeholder="Find apps and content. Ex: Discover"
            value={value}
            isClearable={isClearable}
            onChange={onChange}
          />
        </GuideRuleExample>
        <GuideRuleExample
          panelDisplay="block"
          type="dont"
          text="Use an ellipsis."
        >
          <EuiFieldSearch
            placeholder="Search..."
            value={value}
            isClearable={isClearable}
            onChange={onChange}
          />
        </GuideRuleExample>
      </GuideRule>
    </>
  );
};
