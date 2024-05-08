import React from 'react';
import { css } from '@emotion/react';

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
import { useGeneratedHtmlId } from '../../../../src/services';
import { euiCanAnimate } from '../../../../src/global_styling';

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
// Custom trigger button CSS
const buttonCss = css`
  &:hover {
    text-decoration: none;
  }
`;

// Custom CSS to make the extra action only appear on hover or focus
// Useful if there's multiple accordions in a row to reduce visual overwhelm
const extraAction = (
  <EuiButtonIcon
    aria-label="Delete"
    iconType="cross"
    color="danger"
    css={({ euiTheme }) => css`
      opacity: 0;

      &:focus,
      .euiAccordion:hover & {
        opacity: 1;
      }

      ${euiCanAnimate} {
        transition: opacity ${euiTheme.animation.normal}
          ${euiTheme.animation.resistance};
      }
    `}
  />
);

export default () => {
  const formAccordionId__1 = useGeneratedHtmlId({
    prefix: 'formAccordion',
    suffix: 'first',
  });
  const formAccordionId__2 = useGeneratedHtmlId({
    prefix: 'formAccordion',
    suffix: 'second',
  });

  return (
    <>
      <EuiAccordion
        id={formAccordionId__1}
        element="fieldset"
        borders="horizontal"
        buttonProps={{ paddingSize: 'm', css: buttonCss }}
        buttonContent={buttonContent}
        extraAction={extraAction}
        paddingSize="l"
      >
        {repeatableForm}
      </EuiAccordion>

      <EuiAccordion
        id={formAccordionId__2}
        element="fieldset"
        borders="horizontal"
        buttonProps={{ paddingSize: 'm', css: buttonCss }}
        buttonContent={buttonContent}
        extraAction={extraAction}
        paddingSize="l"
      >
        {repeatableForm}
      </EuiAccordion>
    </>
  );
};
