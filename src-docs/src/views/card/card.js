import React from 'react';

import {
  EuiButton,
  EuiCard,
  EuiIcon,
} from '../../../../src/components';

const exampleCard = {
  image: <EuiIcon size="xl" type="logoBeats" />,
  title: 'This is a card',
  content: <p>Example of a card content stuff.</p>,
  footer: <EuiButton>Go for it</EuiButton>,
};

export default () => (
  <EuiCard
    image={exampleCard.image}
    title={exampleCard.title}
    footer={exampleCard.footer}
  >
    {exampleCard.content}
  </EuiCard>
);
