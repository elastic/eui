import React from 'react';

import {
  EuiPageSection,
  EuiEmptyPrompt,
  useEuiTheme,
  COLOR_MODES_STANDARD,
  EuiButton,
  EuiImage,
} from '../../../../src';
import pageNotFoundLight from '../../images/empty-prompt/pageNotFound--light.png';
import pageNotFoundDark from '../../images/empty-prompt/pageNotFound--dark.png';

export const NotFoundView = () => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === COLOR_MODES_STANDARD.dark;
  const iconImg = isDarkTheme ? pageNotFoundDark : pageNotFoundLight;

  return (
    <EuiPageSection grow alignment="center">
      <EuiEmptyPrompt
        color="subdued"
        icon={<EuiImage size="original" src={iconImg} alt="" />}
        title={<h2>Page not found</h2>}
        layout="vertical"
        body={
          <p>
            Sorry, we can&apos;t find the page you&apos;re looking for. It might
            have been removed or renamed, or maybe it never existed.
          </p>
        }
        actions={[
          <EuiButton href="#/" color="primary" fill>
            Go home
          </EuiButton>,
        ]}
      />
    </EuiPageSection>
  );
};
