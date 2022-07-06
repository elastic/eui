import React, { ReactNode } from 'react';
import { css } from '@emotion/react';

import {
  EuiPanel,
  EuiButtonIcon,
  EuiCommentList,
  EuiComment,
  useEuiTheme,
  EuiAvatar,
  useEuiFontSize,
  logicalCSS,
  EuiSpacer,
  EuiAccordion,
  EuiCodeBlock,
  useEuiBackgroundColor,
} from '../../../../src';

export default ({ snippet }: any) => {
  const { euiTheme } = useEuiTheme();

  const CircleIndicator = ({ name, ...rest }: any) => (
    <span {...rest}>
      <span
        css={css`
          display: inline-block;
          width: ${euiTheme.size.base};
          height: ${euiTheme.size.base};
          background: ${euiTheme.colors.primary};
          color: ${euiTheme.colors.emptyShade};
          ${useEuiFontSize('xs')};
          text-align: center;
          border-radius: 50%;
        `}
      >
        {name}
      </span>
    </span>
  );

  const HighlightedArea = ({ children }: { children: ReactNode }) => (
    <span
      css={css`
        background: ${useEuiBackgroundColor('primary')};
        padding: ${euiTheme.size.xs};
        border-radius: ${euiTheme.border.radius.small};
      `}
    >
      {children}
    </span>
  );

  return (
    <EuiPanel
      color="transparent"
      paddingSize="none"
      style={{ maxWidth: '540px' }}
    >
      <EuiCommentList>
        <EuiComment username="Avatar">
          <div
            css={css`
              border-radius: ${euiTheme.border.radius.small};
              border: ${euiTheme.border.thin};
              ${useEuiFontSize('s')};
            `}
          >
            <div
              css={css`
                border-radius: ${euiTheme.border.radius.small}
                  ${euiTheme.border.radius.small} 0 0;
                padding: ${euiTheme.size.s};
                background: ${euiTheme.colors.lightestShade};
                border-bottom: ${euiTheme.border.thin};
                display: flex;
              `}
            >
              <div
                css={css`
                  flex: 1;
                  display: flex;
                  gap: ${euiTheme.size.xs};
                  align-items: center;
                `}
              >
                <span
                  css={css`
                    ${logicalCSS('margin-right', euiTheme.size.s)}
                  `}
                >
                  <EuiAvatar
                    name="event icon"
                    size="s"
                    color={euiTheme.colors.primaryText}
                    initials="B"
                  />
                </span>

                <HighlightedArea>
                  <CircleIndicator name="C" /> username
                </HighlightedArea>

                <HighlightedArea>
                  <CircleIndicator name="D" /> event
                </HighlightedArea>

                <HighlightedArea>
                  <CircleIndicator name="E" /> timestamp
                </HighlightedArea>
              </div>

              <HighlightedArea>
                <CircleIndicator name="F" />
                <EuiButtonIcon
                  aria-hidden="true"
                  iconType="boxesVertical"
                  color="text"
                />
              </HighlightedArea>
            </div>
            <div
              css={css`
                position: relative;
                padding: ${euiTheme.size.s};
                display: flex;
                align-items: center;
              `}
            >
              <HighlightedArea>
                <CircleIndicator name="G" /> children
              </HighlightedArea>
            </div>
          </div>
        </EuiComment>
      </EuiCommentList>

      <EuiSpacer size="xs" />
      <EuiAccordion
        id="propsSnippet"
        buttonContent={<small>Code snippet</small>}
        css={css`
          ${logicalCSS('margin-left', euiTheme.size.xxxl)}
        `}
      >
        <EuiSpacer size="xs" />
        <EuiCodeBlock language="ts" isCopyable paddingSize="s">
          {snippet}
        </EuiCodeBlock>
      </EuiAccordion>
    </EuiPanel>
  );
};
