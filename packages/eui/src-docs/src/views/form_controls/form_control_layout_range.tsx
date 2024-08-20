import React from 'react';

import {
  EuiFormControlLayoutDelimited,
  EuiFormLabel,
  EuiFieldNumber,
  EuiIcon,
} from '../../../../src/components';

export default () => (
  <div
    css={{
      display: 'inline-flex',
      flexWrap: 'wrap',
      gap: 24,
    }}
  >
    <EuiFormControlLayoutDelimited
      fullWidth
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      append={<EuiFormLabel>px</EuiFormLabel>}
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      icon="vector"
      startControl={
        <EuiFieldNumber
          placeholder="0"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      clear={{ onClick: () => {} }}
      isLoading
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      isLoading
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      compressed
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      prepend={<EuiFormLabel>Add</EuiFormLabel>}
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      delimiter="+"
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      prepend={<EuiFormLabel>Merge</EuiFormLabel>}
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      delimiter={<EuiIcon type="merge" />}
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      readOnly
      prepend={<EuiFormLabel>Read only</EuiFormLabel>}
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      isDisabled
      prepend={<EuiFormLabel>Disabled</EuiFormLabel>}
      startControl={
        <EuiFieldNumber
          controlOnly
          placeholder="0"
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          controlOnly
          placeholder="100"
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <EuiFormControlLayoutDelimited
      isInvalid
      prepend={<EuiFormLabel>Invalid</EuiFormLabel>}
      startControl={
        <EuiFieldNumber
          isInvalid
          controlOnly
          placeholder="0"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <EuiFieldNumber
          isInvalid
          controlOnly
          placeholder="100"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />
  </div>
);
