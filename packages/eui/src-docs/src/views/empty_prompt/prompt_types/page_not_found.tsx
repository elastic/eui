import React from 'react';
import {
  EuiEmptyPrompt,
  EuiImage,
  EuiButton,
  EuiButtonEmpty,
  useEuiTheme,
} from '../../../../../src';

import pageNotFoundDark from '../../../images/empty-prompt/pageNotFound--dark.png';
import pageNotFoundLight from '../../../images/empty-prompt/pageNotFound--light.png';
import pageNotFoundDark2x from '../../../images/empty-prompt/pageNotFound--dark@2x.png';
import pageNotFoundLight2x from '../../../images/empty-prompt/pageNotFound--light@2x.png';

export default () => {
  const isDarkTheme = useEuiTheme().colorMode === 'DARK';

  const pageNotFound = isDarkTheme ? pageNotFoundDark : pageNotFoundLight;
  const pageNotFound2x = isDarkTheme ? pageNotFoundDark2x : pageNotFoundLight2x;

  return (
    <EuiEmptyPrompt
      color="subdued"
      icon={
        <EuiImage
          size="fullWidth"
          srcSet={`${pageNotFound} 1x, ${pageNotFound2x} 2x`}
          src={pageNotFound}
          alt="An outer space illustration. In the background is a large moon and two planets. In the foreground is an astronaut floating in space and the numbers '404'."
        />
      }
      title={<h2>Page not found</h2>}
      layout="vertical"
      body={
        <p>
          We can&apos;t find the page you&apos;re looking for. It might have
          been removed, renamed, or it didn&apos;t exist in the first place.
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
