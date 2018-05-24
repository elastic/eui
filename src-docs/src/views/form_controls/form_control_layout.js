import React, {
  Fragment,
} from 'react';

import {
  EuiFormControlLayout,
  EuiSpacer,
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
  </Fragment>
);
