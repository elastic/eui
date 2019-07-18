import React, { Fragment } from 'react';

import {
  EuiFormControlLayoutDelimited,
  EuiSpacer,
  EuiFormLabel,
  EuiIcon,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiFormControlLayoutDelimited
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      append={<EuiFormLabel>px</EuiFormLabel>}
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      icon="vector"
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
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
    <EuiFormControlLayoutDelimited
      fullWidth
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      isLoading
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      compressed
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />

    <EuiFormControlLayoutDelimited
      prepend={<EuiFormLabel>Add</EuiFormLabel>}
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      delimiter="+"
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />

    <EuiFormControlLayoutDelimited
      prepend={<EuiFormLabel>Merge</EuiFormLabel>}
      startControl={
        <input type="number" placeholder="0" className="euiFieldNumber" />
      }
      delimiter={<EuiIcon type="merge" />}
      endControl={
        <input type="number" placeholder="100" className="euiFieldNumber" />
      }
    />

    <EuiSpacer size="m" />

    <EuiFormControlLayoutDelimited
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
