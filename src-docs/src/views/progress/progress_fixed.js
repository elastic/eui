import React, { useState, useEffect } from 'react';

import {
  EuiProgress,
  EuiSpacer,
  EuiButton,
  EuiText,
  EuiPanel,
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiPortal,
} from '../../../../src/components';

export default () => {
  const [value, setValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  let timer;
  const progress = (value) => {
    if (value > 100) {
      setValue(100);
    } else {
      setValue(value);
      const diff = Math.round(Math.random() * 10);
      timer = setTimeout(() => progress(value + diff), 250);
    }
  };

  const toggleProgress = () => {
    const currentState = showProgress;

    if (!currentState) {
      timer = setTimeout(() => progress(0), 250);
    } else {
      clearTimeout(timer);
      setValue(0);
    }
    setShowProgress(!showProgress);
    setShowHeader(false);
  };

  const toggleHeader = () => {
    setShowProgress(false);
    setShowHeader(!showHeader);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  let progress2 = null;

  if (showProgress) {
    progress2 = (
      <div>
        <EuiCallOut title="Look up!" color="warning" iconType="sortUp">
          <p>The progress bar is fixed to the top of your browser.</p>
        </EuiCallOut>
        <EuiProgress value={value} max={100} size="s" position="fixed" />
      </div>
    );
  }

  if (showHeader) {
    progress2 = (
      <div>
        <EuiCallOut title="Look up!" color="warning" iconType="sortUp">
          <p>
            The progress bar is fixed to the top of your browser and positioned
            above an <strong>EuiHeader</strong>.
          </p>
        </EuiCallOut>
        <EuiHeader
          style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}
        >
          <EuiHeaderSection grow={false}>
            <EuiHeaderSectionItem border="right">
              <EuiHeaderLogo
                iconType="logoKibana"
                href="#"
                aria-label="Go to home page"
              />
            </EuiHeaderSectionItem>
          </EuiHeaderSection>
        </EuiHeader>
        <div style={{ position: 'absolute', zIndex: '5' }}>
          <EuiPortal>
            <EuiProgress size="xs" color="accent" position="fixed" />
          </EuiPortal>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EuiPanel style={{ width: 300, position: 'relative' }}>
        <EuiProgress size="xs" color="accent" position="absolute" />
        <EuiText>
          <h2>Absolutely!</h2>
          <p>
            The progress bar is absolutely positioned in this panel. You could
            see how this might be useful in our Toast component.
          </p>
        </EuiText>
      </EuiPanel>

      <EuiSpacer size="l" />

      <EuiFlexGroup gutterSize="s" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton size="s" onClick={toggleProgress}>
            Toggle a fixed bar
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton size="s" onClick={toggleHeader}>
            Toggle a fixed bar with header
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      {progress2}
    </div>
  );
};
