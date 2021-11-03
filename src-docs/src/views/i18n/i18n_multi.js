import React from 'react';

import {
  EuiCard,
  EuiSpacer,
  EuiText,
  EuiI18n,
  EuiTitle,
  useEuiI18n,
} from '../../../../src/components';

export default () => {
  const [title, description] = useEuiI18n(
    ['euiI18nMulti.title', 'euiI18nMulti.description'],
    ['Card Title', 'Card Description']
  );
  return (
    <>
      <EuiTitle size="xs">
        <h3>useEuiI18n with multiple tokens</h3>
      </EuiTitle>
      <div>
        <EuiText>
          <p>
            Both title and description for the card are looked up in one call to{' '}
            <strong>useEuiI18n</strong>
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiCard
          className="eui-displayInlineBlock"
          title={title}
          description={description}
        />
      </div>

      <EuiSpacer size="l" />

      <EuiTitle size="xs">
        <h3>EuiI18n render prop with multiple tokens</h3>
      </EuiTitle>
      <div>
        <EuiText>
          <p>
            Both title and description for the card are looked up in one call to{' '}
            <strong>EuiI18n</strong>
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiI18n
          tokens={['euiI18nMulti.title', 'euiI18nMulti.description']}
          defaults={['Card Title', 'Card Description']}
        >
          {([title, description]) => (
            <EuiCard
              className="eui-displayInlineBlock"
              title={title}
              description={description}
            />
          )}
        </EuiI18n>
      </div>
    </>
  );
};
