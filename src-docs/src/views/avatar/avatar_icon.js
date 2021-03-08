import React, { useContext } from 'react';
import { ThemeContext } from '../../components';

import { EuiAvatar, EuiSpacer, EuiTitle } from '../../../../src/components';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');

  return (
    <div>
      <EuiTitle size="xs">
        <h2>Avatar colors and sizes</h2>
      </EuiTitle>
      <EuiSpacer />
      <EuiAvatar size="s" name="Small size" iconType="managementApp" />
      &emsp;
      <EuiAvatar size="m" name="Medium size" iconType="managementApp" />
      &emsp;
      <EuiAvatar size="l" name="Large" iconType="managementApp" />
      &emsp;
      <EuiAvatar
        size="xl"
        color="plain"
        name="Plain color"
        iconType="managementApp"
      />
      <EuiSpacer />
      <EuiTitle size="xs">
        <h2>Icon colors and sizes</h2>
      </EuiTitle>
      <EuiSpacer />
      <EuiAvatar name="Avatar color" iconType="managementApp" color="#BD10E0" />
      &emsp;
      <EuiAvatar
        name="Custom iconColor"
        iconType="managementApp"
        color={isDarkTheme ? '#103148' : '#E6F1FA'}
        iconColor="primary"
      />
      &emsp;
      <EuiAvatar
        name="Null iconColor"
        iconType="managementApp"
        color={isDarkTheme ? '#343741' : '#D3DAE6'}
        iconColor={null}
      />
      &emsp;
      <EuiAvatar name="Large iconSize" iconType="managementApp" iconSize="l" />
      &emsp;
    </div>
  );
};
