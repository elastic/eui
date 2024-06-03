import React, { useContext } from 'react';
import {
  EuiEmptyPrompt,
  EuiImage,
  EuiButton,
  EuiButtonEmpty,
} from '../../../../../src/components';
import { ThemeContext } from '../../../components/with_theme';
import pageNotFoundLight from '../../../images/empty-prompt/accessDenied--light.png';
import pageNotFoundDark from '../../../images/empty-prompt/accessDenied--dark.png';

export default () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const iconImg: string = isDarkTheme ? pageNotFoundDark : pageNotFoundLight;

  return (
    <EuiEmptyPrompt
      color="subdued"
      icon={<EuiImage size="fullWidth" src={iconImg} alt="" />}
      title={<h2>Access denied</h2>}
      layout="vertical"
      body={
        <p>
          Sorry to rain on your parade, but you don&apos;t have permissions to
          access this page.
        </p>
      }
      actions={[
        <EuiButton color="primary" fill>
          Home
        </EuiButton>,
        <EuiButtonEmpty iconType="arrowLeft" flush="both">
          Go back
        </EuiButtonEmpty>,
      ]}
    />
  );
};
