import React, {
  Fragment,
} from 'react';

import {
  EuiFormControlLayout,
  EuiSpacer,
  EuiFormLabel,
  EuiButtonEmpty,
  EuiText,
} from '../../../../src/components';

export default () => (
  <Fragment>

    <EuiFormControlLayout
      icon="search"
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      clear={{ onClick: () => {} }}
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      icon="search"
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      icon={{ type: 'arrowDown', side: 'right' }}
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      clear={{ onClick: () => {} }}
      icon="search"
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      icon="search"
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      icon="search"
    >
      <input type="text" className="euiFieldText" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      inlineLabel={<EuiFormLabel htmlFor="textField19">Label</EuiFormLabel>}
    >
      <input type="text" className="euiFieldText euiFieldText--noOuterStyle" id="textField19" placeholder="Placeholder" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      inlineLabel={{
        node: <EuiText size="xs" htmlFor="textField20"><strong>%</strong></EuiText>,
        side: 'right'
      }}
    >
      <input type="number" className="euiFieldNumber" id="textField20" defaultValue="3" step="1" min="0" max="100" />
    </EuiFormControlLayout>

    <EuiSpacer size="m" />

    <EuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      inlineLabel={<EuiButtonEmpty>Button</EuiButtonEmpty>}
    >
      <input type="text" className="euiFieldText euiFieldText--noOuterStyle" id="textField21" defaultValue="Disabled" />
    </EuiFormControlLayout>
  </Fragment>
);
