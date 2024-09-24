import React from 'react';
import {
  EuiEmptyPrompt,
  EuiImage,
  EuiButton,
  EuiButtonEmpty,
  useEuiTheme,
} from '../../../../../src';
import pageNotFoundLight from '../../../images/empty-prompt/accessDenied--light.png';
import pageNotFoundDark from '../../../images/empty-prompt/accessDenied--dark.png';

export default () => {
  const isDarkTheme = useEuiTheme().colorMode === 'DARK';

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
