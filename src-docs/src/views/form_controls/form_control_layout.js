import React, { Fragment } from 'react';

import {
  EuiFormControlLayout,
  EuiSpacer,
  EuiFormLabel,
  EuiButtonEmpty,
  EuiText,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiFormControlLayout icon="search">
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading>
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout clear={{ onClick: () => {} }}>
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading clear={{ onClick: () => {} }}>
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading icon="search">
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="euiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      prepend={<EuiFormLabel htmlFor="textField19">Label</EuiFormLabel>}>
      <input
        type="text"
        className="euiFieldText euiFieldText--inGroup"
        id="textField19"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      readOnly
      prepend={<EuiFormLabel htmlFor="textField19a">Read only</EuiFormLabel>}>
      <input
        type="text"
        className="euiFieldText euiFieldText--inGroup"
        id="textField19a"
        readOnly
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      append={
        <EuiText size="xs">
          <strong>%</strong>
        </EuiText>
      }>
      <input
        type="number"
        className="euiFieldNumber euiFieldNumber--inGroup"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      prepend={
        <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
          Button
        </EuiButtonEmpty>
      }>
      <input
        type="text"
        className="euiFieldText euiFieldText--inGroup"
        aria-label="Use aria labels when no actual label is in use"
      />
    </EuiFormControlLayout>
  </Fragment>
);
