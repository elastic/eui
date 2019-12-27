import React from 'react';

import {
  GuidePage,
  GuideRule,
  GuideRuleTitle,
  GuideRuleExample,
} from '../../components';

import {
  EuiText,
  EuiCode,
  EuiSpacer,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
} from '../../../../src/components';

// import imgFormRowGeneral from '../../images/form-row--00.png';
import imgFormRowToggle from '../../images/form-row--toggle.gif';
import imgFormRowGood from '../../images/form-row--01.png';
import imgFormRowBad from '../../images/form-row--02.png';
import imgFormRowSpacingGood from '../../images/form-row--03.png';
import imgFormRowSpacingBad from '../../images/form-row--04.png';
import imgFormRowPanelsBad from '../../images/form-row--05.png';
import imgFormRowPanelsGood from '../../images/form-row--06.png';

export default () => (
  <GuidePage title="Form guidelines" componentLinkTo="/forms/form-layouts">
    <EuiText className="guideSection__text" grow={false}>
      <p>
        This page documents patterns for form layout, validation and how best to
        use various components.
      </p>
    </EuiText>
    <GuideRuleTitle>Key Principles</GuideRuleTitle>

    <GuideRule
      heading="Help users achieve success"
      description="Forms are difficult and can quickly become frustrating. Our form components try to be as informative and clear as possible for the user to avoid errors or confusion.">
      <EuiFlexItem>
        <EuiPanel>
          <EuiText className="guideSection__text">
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
          <EuiText className="guideSection__text">
            <h4>Provide help text</h4>
            <p>
              Show validation parameters in the help text below the input (eg.,
              No spaces, lowercase, no special characters, etc.)
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <EuiText className="guideSection__text">
            <h4>Validate on blur</h4>
            <p>
              Validation should occur on blur from an input field. The submit
              button should be active by default, then show errors after click.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </GuideRule>

    <GuideRule
      heading="Provide transparency"
      description="It should be clear to the user what each part of the form is meant to accomplish. ">
      <EuiFlexItem>
        <EuiPanel>
          <EuiText className="guideSection__text">
            <h4>Layout matters</h4>
            <p>
              A poorly formatted form can be confusing and tiring for the user
              to navigate. As one field is completed, it should be clear where
              to go next.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <EuiText className="guideSection__text">
            <h4>Words matter</h4>
            <p>
              Form labels and descriptions are equally as important as layout
              and should be treated with just as much care. The text should be
              concise and easily scannable.
            </p>
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>
    </GuideRule>

    <GuideRuleTitle>
      <EuiCode>EuiDescribedFormRow</EuiCode>
    </GuideRuleTitle>
    <EuiText className="guideSection__text">
      <p>
        An <EuiCode>EuiDescribedFormRow</EuiCode> provides an additional heading
        along with description text for a single input or set of input fields.
      </p>
    </EuiText>
    <GuideRule
      heading="When to use it"
      description="This component is not intended for every type of form, but typically works best in the following scenarios.">
      <EuiFlexItem>
        <EuiText>
          <h4>Forms with lengthy descriptions per input</h4>
          <p>
            If long descriptions are needed, using an{' '}
            <EuiCode>EuiDescribedFormRow</EuiCode>
            divides the form into a column for descriptions and a column for
            form fields. This is so there is plenty of space for descriptions to
            aid new users, but keeps the form fields in a column so frequent
            users can still quickly navigate the form.
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiText>
          <h4>Forms with multiple inputs falling under a single heading</h4>
          <p>
            If multiple sub-steps are needed, grouping them together using an{' '}
            <EuiCode>EuiDescribedFormRow</EuiCode> helps show they are all still
            related.
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiText>
          <h4>Forms with complex nested options</h4>
          <p>
            An <EuiCode>EuiDescribedFormRow</EuiCode> is useful when there are
            parts of the form that can be hidden and shown by the user. The
            toggle to hide and show the row should be beneath the description
            and the following form fields should be in the right column with the
            other form fields.
          </p>
        </EuiText>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiImage alt="eui described form row" url={imgFormRowToggle} />
      </EuiFlexItem>
    </GuideRule>

    <GuideRule
      heading="Maintain a standard layout"
      description="Keep the form divided into two columns, with the descriptions on one side and form fields on the other.">
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. To make grouping clearer and keep the user's eye in one path, it's better to keep inputs in a single column. If multiple fields are needed, they should still remain within the column.">
        <EuiImage alt="proper field alignment" url={imgFormRowGood} />
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't. Avoid nesting this form rows within eachother. It creates an uneven path for the user's eye to travel down the form.">
        <EuiImage alt="incorrect field alignment" url={imgFormRowBad} />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer />

    <GuideRule
      heading="Divide the form into sections"
      description="As a form grows longer than several fields, it's best divide up the form into sections. This helps the user quickly scan the form and provides visual breaks between multiple input fields.">
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. Adding visual indicators can help clearly define the sections of the form.">
        <EuiImage alt="prop use of dividers" url={imgFormRowPanelsGood} />
      </GuideRuleExample>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't. Using panels within panels creates too much visual noise and can make it confusing where sections begin and end.">
        <EuiImage alt="incorrect use of panels" url={imgFormRowPanelsBad} />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer />
    <GuideRule>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. Add more spacing between form groups than fields within the group to better define the grouping.">
        <EuiImage alt="proper use of spacing" url={imgFormRowSpacingGood} />
      </GuideRuleExample>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't. Avoid using the same spacing between groups and the individual fields. It is harder for the user to scan and understand the sections of the form.">
        <EuiImage alt="incorrect use of spacing" url={imgFormRowSpacingBad} />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer size="xl" />
  </GuidePage>
);
