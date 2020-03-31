import React from 'react';

import {
  EuiCard,
  EuiSpacer,
  EuiText,
  EuiI18n,
} from '../../../../src/components';

export default () => {
  return (
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
        defaults={['Card Title', 'Card Description']}>
        {([title, description]) => (
          <EuiCard
            className="eui-displayInlineBlock"
            title={title}
            description={description}
          />
        )}
      </EuiI18n>
    </div>
  );
};
