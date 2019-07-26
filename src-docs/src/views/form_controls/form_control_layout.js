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
    <EuiFormControlLayout icon="search" compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout clear={{ onClick: () => {} }} compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading clear={{ onClick: () => {} }} compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout isLoading icon="search" compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      icon={{ type: 'arrowDown', side: 'right' }}
      compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      clear={{ onClick: () => {} }}
      icon="search"
      compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}
      compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      icon="search"
      compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      compressed
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      icon="search"
      compressed>
      <input type="text" className="euiFieldText euiFieldText--compressed" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      compressed
      prepend={<EuiFormLabel htmlFor="textField19">Label</EuiFormLabel>}>
      <input
        type="text"
        className="euiFieldText euiFieldText--inGroup"
        id="textField19"
      />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      compressed
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
      compressed
      append={
        <EuiText size="xs">
          <strong>%</strong>
        </EuiText>
      }>
      <input type="number" className="euiFieldNumber euiFieldNumber--inGroup" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      compressed
      isLoading
      clear={{ onClick: () => {} }}
      prepend={
        <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
          Button
        </EuiButtonEmpty>
      }>
      <input type="text" className="euiFieldText euiFieldText--inGroup" />
    </EuiFormControlLayout>
  </Fragment>
);
