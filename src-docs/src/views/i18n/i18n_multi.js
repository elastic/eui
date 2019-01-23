import React from 'react';

import {
  EuiCard,
  EuiCode,
  EuiI18n,
} from '../../../../src/components';

export default () => {
  return (
    <div>
      <p>
        Both title and description for the card are looked up in one call to <EuiCode>EuiI18n</EuiCode>
      </p>
      <EuiI18n
        tokens={['i18n.multiexampletitle', 'i18n.multiexampledescription']}
        defaults={['Card Title', 'Card Description']}
      >
        {([title, description]) => (
          <EuiCard title={title} description={description}/>
        )}
      </EuiI18n>
    </div>
  );
};
