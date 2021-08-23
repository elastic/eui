import React from 'react';

import { GuideRule, GuideRuleTitle, GuideRuleExample } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiTitle,
} from '../../../../src/components';

import imgFormRowToggle from '../../images/form-row--toggle.gif';
import imgFormRowGood from '../../images/form-row--01.svg';
import imgFormRowBad from '../../images/form-row--02.svg';
import imgFormRowSpacingGood from '../../images/form-row--03.svg';
import imgFormRowSpacingBad from '../../images/form-row--04.svg';
import imgFormRowPanelsBad from '../../images/form-row--05.svg';
import imgFormRowPanelsGood from '../../images/form-row--06.svg';

export default () => (
  <>
    <EuiText grow={false}>
      <p>
        This page documents patterns for form layout, validation and how best to
        use various components.
      </p>
    </EuiText>
    <EuiSpacer size="xl" />

    <EuiTitle>
      <h1>Key Principles</h1>
    </EuiTitle>

    <GuideRule
      heading="Help users achieve success"
      description="Our form components try to be as informative and clear as possible for the user to avoid errors or confusion."
    >
      <EuiFlexItem>
        <EuiPanel>
          <EuiText>
            <h4>Use labels and descriptions</h4>
            <p>
              Use a label (and description if needed) for each form field. All
              form fields should be considered required unless stated alongside
              the label.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <EuiText>
            <h4>Provide help text</h4>
            <p>
              Show validation parameters in the help text below the input. For
              example: Spaces and special characters are not allowed.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <EuiText>
            <h4>Validate on blur</h4>
            <p>
              Validation should occur on blur from an input field. The submit
              button should be active by default, then show errors after click.
              Error messages should be specific to the situation.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </GuideRule>

    <GuideRule
      heading="Provide transparency"
      description="It should be clear to users what they can accomplish in each part of the form. "
    >
      <EuiFlexItem>
        <EuiPanel>
          <EuiText>
            <h4>Layout matters</h4>
            <p>
              A well-formatted layout makes it clear to users how to navigate
              the form. As one field is completed, it should be clear where to
              go next.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <EuiText>
            <h4>Words matter</h4>
            <p>
              Form labels and descriptions are equally important as layout and
              should be treated with just as much care. The text should be
              specific, concise, and easy to scan.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </GuideRule>

    <GuideRuleTitle>Described form rows</GuideRuleTitle>
    <EuiText>
      <p>
        An <strong>EuiDescribedFormRow</strong> provides an additional heading
        along with description text for a single input or set of input fields.
      </p>
    </EuiText>
    <EuiSpacer />

    <EuiPanel
      color="subdued"
      paddingSize="l"
      hasShadow={false}
      style={{ justifyContent: 'center', display: 'flex' }}
    >
      <EuiPanel style={{ maxWidth: 520 }} paddingSize="s">
        <EuiImage alt="eui described form row" url={imgFormRowToggle} />
      </EuiPanel>
    </EuiPanel>

    <GuideRule
      heading="When to use it"
      description="This component is not intended for every type of form, but typically works best in the following scenarios."
    >
      <EuiFlexItem>
        <EuiText grow={false}>
          <dl>
            <dt>Forms with lengthy descriptions per input</dt>
            <dd>
              If a longer description is needed, use an{' '}
              <strong>EuiDescribedFormRow</strong> to divide the form into a
              column for descriptions and a column for form fields. This is so
              there is space for descriptions to aid new users, but keeps the
              form fields in a column, so frequent users can still quickly
              navigate the form. Try to limit the description to three sentences
              or less.
            </dd>

            <dt>Forms with multiple inputs falling under a single heading</dt>
            <dd>
              If multiple sub-steps are needed, grouping them together using an{' '}
              <strong>EuiDescribedFormRow</strong> helps show they are all still
              related.
            </dd>

            <dt>Forms with complex nested options</dt>
            <dd>
              An <strong>EuiDescribedFormRow</strong> is useful when there are
              parts of the form that can be hidden and shown by the user. The
              toggle to hide and show the row should be beneath the description
              and the following form fields should be in the right column with
              the other form fields.
            </dd>
          </dl>
        </EuiText>
      </EuiFlexItem>
    </GuideRule>

    <GuideRule
      heading="Maintain a standard layout"
      description="Keep the form divided into two columns, with the descriptions on one side and form fields on the other."
    >
      <GuideRuleExample
        type="do"
        text="To make groupings clearer and keep the user's eye in one path, it's better to keep inputs in a single column. If multiple fields are needed, they should still remain within the column."
      >
        <EuiImage alt="proper field alignment" url={imgFormRowGood} />
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Avoid nesting form rows. It creates an uneven path for the user's eye to travel down the form."
      >
        <EuiImage alt="incorrect field alignment" url={imgFormRowBad} />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer />

    <GuideRule
      heading="Divide the form into sections"
      description="As a form grows longer, it's best to divide the form into sections. This helps the user quickly scan the form and provides visual breaks between multiple input fields."
    >
      <GuideRuleExample
        type="do"
        text="Adding visual indicators can help clearly define the sections of the form."
      >
        <EuiImage alt="prop use of dividers" url={imgFormRowPanelsGood} />
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Using panels within panels creates too much visual noise and can make it confusing where sections begin and end."
      >
        <EuiImage alt="incorrect use of panels" url={imgFormRowPanelsBad} />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer />
    <GuideRule>
      <GuideRuleExample
        type="do"
        text="Add more spacing between form groups than fields within the group to better define the grouping."
      >
        <EuiImage alt="proper use of spacing" url={imgFormRowSpacingGood} />
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Avoid using the same spacing between groups and individual fields. It is harder for the user to scan and understand the sections of the form."
      >
        <EuiImage alt="incorrect use of spacing" url={imgFormRowSpacingBad} />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer size="xl" />
  </>
);
