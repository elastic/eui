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

type EuiLiveDemoProps = CommonProps &
  HTMLAttributes<HTMLUListElement> & {
    noInline?: boolean;
    code?: string;
    scope?: object;
  };

export const EuiLiveDemo: FunctionComponent<EuiLiveDemoProps> = ({
  className,
  noInline,
  code,
  scope,
}) => {
  return (
    <LiveProvider
      className={className}
      code={code}
      scope={scope}
      noInline={noInline}>
      <EuiFlexGroup className="euiLiveDemoFlexGroup" gutterSize="none">
        <EuiFlexItem className="euiLiveDemoFlexItem">
          <LiveEditor />
        </EuiFlexItem>
        <EuiFlexItem className="euiLiveDemoFlexItem">
          <div className="euiLiveDemoPreviewWrapper">
            <LivePreview className="euiLiveDemoPreview" />
          </div>
        </EuiFlexItem>
        <EuiSpacer />
        <LiveError />
      </EuiFlexGroup>
    </LiveProvider>
  );
};
