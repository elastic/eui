import React from 'react';
import {
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiThemeProvider,
  EuiPanel,
} from '../../../../../src';

export default () => {
  return (
    <>
      <EuiThemeProvider colorMode="light">
        <EuiPanel>
          <EuiText color="default">
            <p>
              <EuiIcon type="faceHappy" /> The colors of this panel will always
              be in <strong>light</strong> mode
            </p>
          </EuiText>
        </EuiPanel>
      </EuiThemeProvider>
      <EuiSpacer />
      <EuiThemeProvider colorMode="dark">
        <EuiPanel>
          <EuiText color="default">
            <p>
              <EuiIcon type="faceHappy" /> The colors of this panel will always
              be in <strong>dark</strong> mode
            </p>
          </EuiText>
        </EuiPanel>
      </EuiThemeProvider>
      <EuiSpacer />
      <EuiThemeProvider colorMode="inverse">
        <EuiPanel>
          <EuiText color="default">
            <p>
              <EuiIcon type="faceHappy" /> The colors of this panel are the
              opposite (<strong>inverse</strong>) of the current color mode
            </p>
          </EuiText>
        </EuiPanel>
      </EuiThemeProvider>
    </>
  );
};
