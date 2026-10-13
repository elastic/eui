/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { Global } from '@emotion/react';

import { useEuiTheme } from '../../../services';

export const FlyoutContainerGlobalStyles = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <Global
      styles={`
        html {
          background-color: ${euiTheme.colors.body};
        }

        body,
        #storybook-root,
        #story-wrapper {
          block-size: 100%;
        }

        #story-wrapper {
          padding: ${euiTheme.size.base};
          background-color: ${euiTheme.colors.backgroundBasePlain};
          border-radius: ${euiTheme.border.radius.frame};
        }
      `}
    />
  );
};

export const FlyoutBorderRadiusStyle = () => {
  const { euiTheme } = useEuiTheme();
  return (
    <Global
      styles={`:root { --euiFlyoutBorderRadius: ${euiTheme.border.radius.frame}; }`}
    />
  );
};
