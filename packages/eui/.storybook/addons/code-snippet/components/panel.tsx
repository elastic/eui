/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, FunctionComponent } from 'react';
import {
  useAddonState,
  useChannel,
  useStorybookApi,
} from '@storybook/manager-api';
import { AddonPanel, SyntaxHighlighter } from '@storybook/components';
import { styled } from '@storybook/theming';
import { STORY_RENDERED } from '@storybook/core-events';

import { ADDON_ID, ADDON_PARAMETER_KEY, EVENTS } from '../constants';
import { addHiddenStyle, clearHiddenStyle } from '../utils/addon_visibility';

const addonTabStyles = (selector: string) => `
    ${selector} {
      display: none;
    }
  `;

interface PanelProps {
  active?: boolean;
}

export const Panel: FunctionComponent<PanelProps> = ({ active, ...rest }) => {
  const [addonState, setAddonState] = useAddonState(ADDON_ID, {
    code: '',
    isLoaded: false,
    isSkipped: true,
  });
  const { code, isLoaded, isSkipped } = addonState;
  const storybookApi = useStorybookApi();

  useEffect(() => {
    const addonTabId = `#tabbutton-${ADDON_ID.split('/').join('-')}-panel`;

    /**
     * we manually hide the addon tab element initially and show it only if it's not skipped.
     * This uses style element injection over classes as we don't have access to the actual elements.
     * We would need to wait for the elements to be rendered by Storybook to get them which is less
     * consitent as controlling the styles.
     * reference: https://storybook.js.org/docs/addons/writing-addons#style-the-addon
     */
    if (isSkipped) {
      addHiddenStyle(ADDON_ID, addonTabStyles(addonTabId));
    } else {
      clearHiddenStyle(ADDON_ID);
    }
  }, [isSkipped]);

  const emit = useChannel({
    [EVENTS.SNIPPET_RENDERED]: (args) => {
      setAddonState((prevState) => ({ ...prevState, code: args.source ?? '' }));
    },
    [STORY_RENDERED]: (id: string) => {
      const parameters = storybookApi.getParameters(id);
      const isStorySkipped = parameters?.[ADDON_PARAMETER_KEY]?.skip ?? false;

      setAddonState((prevState) => ({
        ...prevState,
        isLoaded: true,
        isSkipped: isStorySkipped,
      }));
    },
  });

  useEffect(() => {
    if (isSkipped || !isLoaded || !active) return;

    // emit OPENED event
    emit(EVENTS.SNIPPET_PANEL_OPENED);

    return () => {
      // emit CLOSED event
      emit(EVENTS.SNIPPET_PANEL_CLOSED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSkipped, isLoaded, active]);

  if (isSkipped) return null;

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
