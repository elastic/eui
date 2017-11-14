import React from 'react';

import {
  EuiAvatar,
  EuiHorizontalRule,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiAvatar size="s" name="Rafael"/>
    <EuiAvatar size="m" name="Donatello" />
    <EuiAvatar size="l" name="Leornardo" />
    <EuiAvatar size="xl" name="Michaelangelo" />

    <EuiHorizontalRule margin="l" />

    <EuiAvatar size="s" name="Cat" imageUrl="https://lorempixel.com/64/64/cats/" />
    <EuiAvatar size="m" name="Cat" imageUrl="https://lorempixel.com/64/64/cats/" />
    <EuiAvatar size="l"  name="Cat" imageUrl="https://lorempixel.com/64/64/cats/" />
    <EuiAvatar size="xl" name="Cat" imageUrl="https://lorempixel.com/64/64/cats/" />
  </div>
);
