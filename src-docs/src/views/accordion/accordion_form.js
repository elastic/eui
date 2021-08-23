import React from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiTextColor,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiIcon,
  EuiTextArea,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiButtonIcon,
} from '../../../../src/components';

const repeatableForm = (
  <EuiForm component="form">
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFormRow label="Username">
          <EuiFieldText icon="user" placeholder="John" />
        </EuiFormRow>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiFormRow
          label="Password"
          helpText="Must include one number and one symbol"
        >
          <EuiFieldPassword icon="lock" />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="m" />

    <EuiFormRow label="Body">
      <EuiTextArea placeholder="I am a textarea, put some content in me!" />
    </EuiFormRow>
  </EuiForm>
);

const buttonContent = (
  <div>
    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiIcon type="logoWebhook" size="m" />
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiTitle size="xs">
          <h3>Webhook</h3>
        </EuiTitle>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiText size="s">
      <p>
        <EuiTextColor color="subdued">
          Will send a POST request to www.example.com/some/path/
        </EuiTextColor>
      </p>
    </EuiText>
  </div>
);

const extraAction = (
  <EuiButtonIcon
    iconType="cross"
    color="danger"
    className="euiAccordionForm__extraAction"
    aria-label="Delete"
  />
);

export default () => (
  <div>
    <EuiAccordion
      id="accordionForm1"
      className="euiAccordionForm"
      buttonClassName="euiAccordionForm__button"
      buttonContent={buttonContent}
      extraAction={extraAction}
      paddingSize="l"
    >
      {repeatableForm}
    </EuiAccordion>

    <EuiAccordion
      id="accordionForm2"
      className="euiAccordionForm"
      buttonClassName="euiAccordionForm__button"
      buttonContent={buttonContent}
      extraAction={extraAction}
      paddingSize="l"
    >
      {repeatableForm}
    </EuiAccordion>
  </div>
);
