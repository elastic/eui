import React, { FunctionComponent, HTMLAttributes } from 'react';
import {
  LiveProvider,
  LiveError,
  LivePreview,
  // withLive,
} from 'react-live';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
// import { EuiCodeEditor } from '../code_editor';
import { LiveEditor } from './live_demo_editor';
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
      <EuiFlexGroup>
        <EuiFlexItem>
          <LiveEditor />
        </EuiFlexItem>
        <EuiFlexItem>
          <LivePreview />
          <EuiSpacer />
          <LiveError />
        </EuiFlexItem>
      </EuiFlexGroup>
    </LiveProvider>
  );
};

