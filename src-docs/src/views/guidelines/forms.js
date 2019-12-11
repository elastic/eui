import React from 'react';

import {
  GuidePage,
  GuideRule,
  GuideRuleTitle,
  GuideRuleExample,
} from '../../components';

import {
  EuiText,
  EuiButton,
  EuiButtonIcon,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiToolTip,
  EuiIcon,
  EuiImage,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
} from '../../../../src/components';

import imgFormRowGood from '../../images/form-row--good.png';
import imgFormRowLabels from '../../images/form-row--labels.png';
import imgFormRowDescriptionGood from '../../images/form-row--description-good.png';
import imgFormRowDescriptionBad from '../../images/form-row--description-bad.png';
import imgFormRowPanelsGood from '../../images/form-row--panels-good.png';
import imgFormRowPanelsBad from '../../images/form-row--panels-bad.png';
import imgFormRowSpacingGood from '../../images/form-row--spacing-good.png';
import imgFormRowSpacingBad from '../../images/form-row--spacing-bad.png';

export default () => (
  <GuidePage title="Form guidelines" componentLinkTo="/forms/form-layouts">
    <EuiText className="guideSection__text" grow={false}>
      <p>
        This page documents patterns for form design, including input types,
        layout and validation.
      </p>
    </EuiText>

    <GuideRuleTitle>Form validation recommendations</GuideRuleTitle>

    <EuiFlexGroup alignItems="center">
      <EuiFlexItem>
        <EuiText className="guideSection__text">
          <h4>Things to show :</h4>
          <ul>
            <li>
              All fields are considered required unless labeled as ‘Optional’.
              Avoid labeling as ‘Required’
            </li>
            <li>
              Use a label (and description if needed) to describe the form
              field. Help text should provide guidance how to <em>avoid</em>{' '}
              validation errors (eg. No spaces, lower case, avoid
              characters...).
            </li>
            <li>
              Show validation parameters in the help text below the input (eg.,
              No spaces, lowercase, no special characters, etc.)
            </li>
            <li>
              If there are errors, show a callout at the top of the form listing
              each field that has an error, or noting that the form has errors.
              Indicate error fields with a red label and red outline around the
              input.
            </li>
          </ul>

          <h4>When should validation occur:</h4>
          <ul>
            <li>Validation should occur on blur from an input field</li>
            <li>
              Submit button should be active by default, but then show errors if
              clicked and form is not valid
            </li>
          </ul>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <GuideRuleTitle>Form layout</GuideRuleTitle>

    <GuideRule
      heading="EuiDescribedFormRow best practices"
      description="EuiDescribedFormRows should have a single input or single column of inputs not a row of inputs.">
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. To make grouping clearer and keep the user's eye in one path, it's better to keep inputs in a single column">
        <EuiImage alt="single column form fields" url={imgFormRowGood} />
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. If extra description is not necessary for an individual field, it is possible to remove the label above the input to avoid duplicate labels">
        <EuiImage alt="single column form fields" url={imgFormRowLabels} />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't. Adding additional described form rows within rows makes it more difficult to scan the page and understand the grouping.">
        <EuiImage
          alt="single column form fields"
          url={imgFormRowDescriptionBad}
        />
      </GuideRuleExample>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. If extra description is needed for an individual field, but still falls within a for group, add the description between the input label and input.">
        <EuiImage
          alt="single column form fields"
          url={imgFormRowDescriptionGood}
        />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Layout"
      description="Proper spacing and dividing of sections insures that the user understands the form grouping and can easily scan the entire layout.">
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. Add additional spacing between form groups than fields within the group to better define the grouping.">
        <EuiImage alt="single column form fields" url={imgFormRowSpacingGood} />
      </GuideRuleExample>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't. If the same size spacing is used between groups and the individual fields, it is harder for the user to scan and understand the sections of the form.">
        <EuiImage alt="single column form fields" url={imgFormRowSpacingBad} />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. Adding visual indicators can help clearly define the sections of the form.">
        <EuiImage alt="single column form fields" url={imgFormRowPanelsGood} />
      </GuideRuleExample>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't. Using panels within panels creates too much visual noise and can make it confusing where sections begin and end.">
        <EuiImage alt="single column form fields" url={imgFormRowPanelsBad} />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer size="xl" />
  </GuidePage>
);
