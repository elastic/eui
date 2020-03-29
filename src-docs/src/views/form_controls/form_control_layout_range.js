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
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      append={<EuiFormLabel>px</EuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      icon="vector"
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      clear={{ onClick: () => {} }}
      isLoading
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      fullWidth
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      isLoading
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiSpacer size="m" />
    <EuiFormControlLayoutDelimited
      compressed
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiSpacer size="m" />

    <EuiFormControlLayoutDelimited
      prepend={<EuiFormLabel>Add</EuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      delimiter="+"
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiSpacer size="m" />

    <EuiFormControlLayoutDelimited
      prepend={<EuiFormLabel>Merge</EuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      delimiter={<EuiIcon type="merge" />}
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
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
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="euiFieldNumber"
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />
  </Fragment>
);
