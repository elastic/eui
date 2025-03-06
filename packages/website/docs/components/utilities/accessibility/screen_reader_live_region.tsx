import React from 'react';
import { useState, useCallback } from 'react';

import {
  EuiButton,
  EuiCode,
  EuiScreenReaderLive,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

export default () => {
  const [screenReaderText, setScreenReaderText] = useState(
    'You have no notifications.'
  );

  const startAnnouncements = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    setScreenReaderText(
      `You have ${randomNumber} new notification${randomNumber > 1 ? 's' : ''}.`
    );
  }, []);

  return (
    <>
      <EuiButton onClick={startAnnouncements}>
        Create screen reader announcement
      </EuiButton>
      <EuiSpacer />
      <EuiText>
        <p>
          <em>Content announced by screen reader: </em>
          <EuiCode>{screenReaderText}</EuiCode>
        </p>
        <EuiScreenReaderLive>
          <p>{screenReaderText}</p>
        </EuiScreenReaderLive>
      </EuiText>
    </>
  );
};
