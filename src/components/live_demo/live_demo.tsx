import React, { FunctionComponent, HTMLAttributes } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import { CommonProps } from '../common';

export type EuiLiveDemoProps = CommonProps &
  HTMLAttributes<HTMLUListElement> & {
    /**
     * For multiple components
     */
    noInlin?: boolean;
    code?: string;
    scope?: object;
  };

export const EuiLiveDemo: FunctionComponent<EuiLiveDemoProps> = ({
  className,
  noInlin,
  code,
  scope,
}) => {
  return (
    <LiveProvider
      className={className}
      code={code}
      scope={scope}
      noInline={noInlin}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};
