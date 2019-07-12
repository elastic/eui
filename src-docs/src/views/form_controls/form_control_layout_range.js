import React, { Fragment } from 'react';

import {
  EuiFormControlLayoutRange,
  EuiSpacer,
  EuiFormLabel,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiFormControlLayoutRange
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutRange
      append={<EuiFormLabel>px</EuiFormLabel>}
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutRange
      icon="vector"
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutRange
      clear={{ onClick: () => {} }}
      isLoading
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutRange
      fullWidth
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutRange
      isLoading
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutRange
      compressed
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />

    <EuiFormControlLayoutRange
      prepend={<EuiFormLabel>Label</EuiFormLabel>}
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />

    <EuiFormControlLayoutRange
      readOnly
      prepend={<EuiFormLabel>Read only</EuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          readOnly
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          readOnly
        />
      }
    />
  </Fragment>
);
