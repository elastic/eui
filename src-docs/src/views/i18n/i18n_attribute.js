import {
  EuiCode,
  EuiFieldText,
  EuiI18n,
  EuiFormRow,
  EuiTitle,
  useEuiI18n,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  return (
    <>
      <EuiTitle size="xs">
        <h3>useEuiI18n used in an attribute</h3>
      </EuiTitle>

      <EuiSpacer />

      <EuiFormRow
        label={
          <>
            This text field&apos;s placeholder reads from{' '}
            <EuiCode>euiI18nAttribute.placeholderName</EuiCode>
          </>
        }
      >
        <EuiFieldText
          placeholder={useEuiI18n(
            'euiI18nAttribute.placeholderName',
            'John Doe'
          )}
        />
      </EuiFormRow>

      <EuiSpacer size="xl" />

      <EuiTitle size="xs">
        <h3>EuiI18n used as a render prop</h3>
      </EuiTitle>

      <EuiSpacer />

      <EuiI18n token="euiI18nAttribute.placeholderName" default="John Doe">
        {(placeholderName) => (
          <EuiFormRow
            label={
              <>
                This text field&apos;s placeholder reads from{' '}
                <EuiCode>euiI18nAttribute.placeholderName</EuiCode>
              </>
            }
          >
            <EuiFieldText placeholder={placeholderName} />
          </EuiFormRow>
        )}
      </EuiI18n>
    </>
  );
};
