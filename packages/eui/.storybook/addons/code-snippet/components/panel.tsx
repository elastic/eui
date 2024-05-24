/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { useAddonState, useChannel } from '@storybook/manager-api';
import { AddonPanel, SyntaxHighlighter } from '@storybook/components';
import { styled } from '@storybook/theming';
import { STORY_RENDERED } from '@storybook/core-events';

import { ADDON_ID, EVENTS } from '../constants';

interface PanelProps {
  active?: boolean;
}

export const Panel: FunctionComponent<PanelProps> = ({ active, ...rest }) => {
  const [addonState, setAddonState] = useAddonState(ADDON_ID, {
    code: '',
    isLoaded: false,
  });
  const { code, isLoaded } = addonState;

  useChannel({
    [EVENTS.SNIPPET_RENDERED]: (args) => {
      setAddonState((prevState) => ({ ...prevState, code: args.source ?? '' }));
    },
    [STORY_RENDERED]: () => {
      setAddonState((prevState) => ({ ...prevState, isLoaded: true }));
    },
  });

  const emptyState = <span>No code snippet available</span>;
  const loadingState = <span>Loading...</span>;

  return (
    <AddonPanel active={active ?? false} {...rest}>
      {code ? (
        <SyntaxHighlighter
          language="tsx"
          copyable
          padded
          showLineNumbers={false}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <Container>{isLoaded ? emptyState : loadingState}</Container>
      )}
    </AddonPanel>
  );
};

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  margin: 0,
  padding: theme.layoutMargin,
}));
