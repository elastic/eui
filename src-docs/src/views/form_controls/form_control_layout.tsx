import React from 'react';

import {
  EuiFormControlLayout,
  EuiFormLabel,
  EuiButtonEmpty,
  EuiText,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const labelInputId = useGeneratedHtmlId({ prefix: 'labelInput' });
  const readOnlyInputId = useGeneratedHtmlId({ prefix: 'readOnlyInput' });

  return (
    <div
      css={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: 24,
      }}
    >
      <EuiFormControlLayout icon="search" isInvalid>
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout isLoading>
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout clear={{ onClick: () => {} }}>
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout isLoading clear={{ onClick: () => {} }}>
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout isLoading icon="search">
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        isLoading
        icon={{ type: 'arrowDown', side: 'right' }}
      >
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout clear={{ onClick: () => {} }} icon="search">
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        clear={{ onClick: () => {} }}
        icon={{ type: 'arrowDown', side: 'right' }}
      >
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        isLoading
        clear={{ onClick: () => {} }}
        icon="search"
      >
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        isLoading
        clear={{ onClick: () => {} }}
        icon={{ type: 'arrowDown', side: 'right' }}
      >
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        isLoading
        clear={{ onClick: () => {} }}
        icon="search"
      >
        <input
          type="text"
          className="euiFieldText"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        prepend={<EuiFormLabel htmlFor={labelInputId}>Label</EuiFormLabel>}
      >
        <input
          type="text"
          className="euiFieldText euiFieldText--inGroup"
          id={labelInputId}
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        readOnly
        prepend={
          <EuiFormLabel htmlFor={readOnlyInputId}>Read only</EuiFormLabel>
        }
        append={<EuiButtonEmpty size="xs">Button</EuiButtonEmpty>}
      >
        <input
          type="text"
          className="euiFieldText euiFieldText--inGroup"
          id={readOnlyInputId}
          readOnly
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        append={
          <EuiText size="xs">
            <strong>%</strong>
          </EuiText>
        }
      >
        <input
          type="number"
          className="euiFieldNumber euiFieldNumber--inGroup"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        isLoading
        clear={{ onClick: () => {} }}
        prepend={
          <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
            Button
          </EuiButtonEmpty>
        }
      >
        <input
          type="text"
          className="euiFieldText euiFieldText--inGroup"
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>
    </div>
  );
};
