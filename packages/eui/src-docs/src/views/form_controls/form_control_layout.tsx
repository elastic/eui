import React from 'react';

import {
  EuiFormControlLayout,
  EuiFormLabel,
  EuiButtonEmpty,
  EuiText,
  useGeneratedHtmlId,
  useEuiTheme,
  EuiFieldText,
} from '../../../../src';

export default () => {
  const { euiTheme } = useEuiTheme();
  const labelInputId = useGeneratedHtmlId({ prefix: 'labelInput' });
  const readOnlyInputId = useGeneratedHtmlId({ prefix: 'readOnlyInput' });

  return (
    <div
      css={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: euiTheme.size.l,
      }}
    >
      <EuiFormControlLayout icon="search">
        <EuiFieldText
          type="search"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout isLoading>
        <EuiFieldText
          type="text"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout clear={{ onClick: () => {} }}>
        <EuiFieldText
          type="text"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout isInvalid>
        <EuiFieldText
          type="text"
          controlOnly
          isInvalid
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout clear={{ onClick: () => {} }} icon="search">
        <EuiFieldText
          type="search"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout isLoading isDropdown>
        <EuiFieldText
          type="text"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        clear={{ onClick: () => {} }}
        isDropdown
        icon={{ type: 'stopFilled', color: 'success', side: 'left' }}
      >
        <EuiFieldText
          type="text"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        isLoading
        clear={{ onClick: () => {} }}
        icon={{ type: 'bolt', side: 'right' }}
        isDropdown
      >
        <EuiFieldText
          type="text"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>

      <EuiFormControlLayout
        prepend={<EuiFormLabel htmlFor={labelInputId}>Label</EuiFormLabel>}
      >
        <EuiFieldText
          type="text"
          className="euiFieldText--inGroup"
          controlOnly
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
        <EuiFieldText
          type="text"
          className="euiFieldText--inGroup"
          id={readOnlyInputId}
          controlOnly
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
        <EuiFieldText
          type="number"
          className="euiFieldNumber--inGroup"
          controlOnly
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
        <EuiFieldText
          type="text"
          className="euiFieldText--inGroup"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormControlLayout>
    </div>
  );
};
