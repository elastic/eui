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

function makeId() {
  return Math.random().toString(36).substr(2, 5);
}

const repeatableForm = (
  <EuiForm>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFormRow label="Username"  id={makeId()}>
          <EuiFieldText icon="user" placeholder="John" />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFormRow label="Password" id={makeId()} helpText="Must include one number and one symbol">
          <EuiFieldPassword icon="lock" />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiFormRow label="Body" id={makeId()}>
      <EuiTextArea placeholder="I am a textarea, put some content in me!" />
    </EuiFormRow>
  </EuiForm>
);

const buttonContent = (
  <div>
    <EuiFlexGroup gutterSize="small">
      <EuiFlexItem grow={false}>
        <EuiIcon type="logoWebhook" size="medium" />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiTitle size="small" className="kuiAccordionForm__title">
          <h6>Webhook</h6>
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
  <EuiButtonIcon iconType="cross" type="danger" className="kuiAccordionForm__extraAction" />
);

export default () => (
  <div>
    <EuiTitle size="small">
      <h3>I am a complicated, highly styled, repeatable form!</h3>
    </EuiTitle>
    <EuiSpacer size="l" />
    <EuiAccordion
      className="kuiAccordionForm"
      buttonClassName="kuiAccordionForm__button"
      buttonContent={buttonContent}
      extraAction={extraAction}
    >
      <div className="kuiAccordionForm__children">
        {repeatableForm}
      </div>
    </EuiAccordion>
    <EuiAccordion
      className="kuiAccordionForm"
      buttonClassName="kuiAccordionForm__button"
      buttonContent={buttonContent}
      extraAction={extraAction}
    >
      <div className="kuiAccordionForm__children">
        {repeatableForm}
      </div>
    </EuiAccordion>
  </div>
);
