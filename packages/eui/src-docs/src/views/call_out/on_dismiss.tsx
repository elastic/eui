import React, { useState } from 'react';

import {
  EuiFlexGroup,
  EuiSwitch,
  EuiSpacer,
  EuiButtonEmpty,
  EuiCallOut,
} from '../../../../src';

export default () => {
  const [showCallOut, setShowCallOut] = useState(
    !localStorage.getItem('EuiCallOutOnDismissDemo')
  );
  const onDismiss = () => {
    setShowCallOut(false);
    localStorage.setItem('EuiCallOutOnDismissDemo', 'hidden');
  };
  const resetDemo = () => {
    setShowCallOut(true);
    localStorage.setItem('EuiCallOutOnDismissDemo', '');
  };

  // UI toggles
  const [showTitle, setShowTitle] = useState(true);
  const [showChildren, setShowChildren] = useState(true);
  const [smallSize, setSmallSize] = useState(false);

  return (
    <div css={{ maxInlineSize: 500 }}>
      <EuiFlexGroup>
        <EuiSwitch
          label="Show title"
          checked={showTitle}
          onChange={(e) => setShowTitle(e.target.checked)}
          compressed
        />
        <EuiSwitch
          label="Show children"
          checked={showChildren}
          onChange={(e) => setShowChildren(e.target.checked)}
          compressed
        />
        <EuiSwitch
          label="Small size"
          checked={smallSize}
          onChange={(e) => setSmallSize(e.target.checked)}
          compressed
        />
      </EuiFlexGroup>
      <EuiSpacer />
      {showCallOut ? (
        <EuiCallOut
          onDismiss={onDismiss}
          iconType="iInCircle"
          title={
            showTitle
              ? 'You can dismiss this callout by clicking the Close button in the top right corner'
              : ''
          }
          size={smallSize ? 's' : 'm'}
        >
          {showChildren && (
            <>
              <p>
                Here’s more some stuff users need to know. But maybe users don't
                need to know it on every page refresh, so you could remember
                whether or not to display this callout in local storage.
              </p>
              {!showTitle && (
                <p>
                  This second paragraph is here to demonstrate that only the
                  first one needs to account for the dismiss button in width.
                </p>
              )}
            </>
          )}
        </EuiCallOut>
      ) : (
        <EuiButtonEmpty onClick={resetDemo}>
          The callout has been dismissed. Click to reset the demo
        </EuiButtonEmpty>
      )}
    </div>
  );
};
