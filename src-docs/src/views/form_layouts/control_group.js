import React, { Fragment } from 'react';
import moment from 'moment';

import {
  EuiFormControlGroup,
  EuiFormLabel,
  EuiFieldText,
  EuiButton,
  EuiIcon,
  EuiText,
  EuiDatePicker,
  EuiFieldNumber,
  EuiSpacer,
  EuiHorizontalRule,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiFormControlGroup>
      <EuiFormLabel>Label:</EuiFormLabel>
      <EuiFieldText placeholder="Input" />
    </EuiFormControlGroup>

    <EuiSpacer />

    <EuiFormControlGroup>
      <EuiFieldNumber placeholder="3" />
      <EuiFormLabel>%</EuiFormLabel>
    </EuiFormControlGroup>

    <EuiSpacer />

    <EuiFormControlGroup>
      <EuiFormLabel>Label:</EuiFormLabel>
      <EuiFieldText disabled placeholder="Disabled" />
    </EuiFormControlGroup>

    <EuiSpacer />

    <EuiFormControlGroup>
      <EuiButton iconType="arrowDown" iconSide="right">
        <EuiIcon type="calendar" title="More date options" />
      </EuiButton>
      <EuiHorizontalRule />
      <EuiDatePicker selected={moment()} />
      <EuiText size="s" color="subdued">→</EuiText>
      <EuiDatePicker selected={moment()} />
    </EuiFormControlGroup>
  </Fragment>
);
