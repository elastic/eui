import React, { useState } from 'react';
import { css } from '@emotion/react';

import {
  EuiPortal,
  EuiButton,
  EuiPanel,
  EuiTitle,
  EuiOverlayMask,
  EuiButtonIcon,
  EuiText,
  EuiTextColor,
  EuiEmptyPrompt,
  EuiFocusTrap,
  EuiHorizontalRule,
  EuiLink,
  EuiSpacer,
  EuiButtonEmpty,
  euiFlyoutSlideInRight,
} from '../../../../../src/components';
import {
  keys,
  EuiWindowEvent,
  useGeneratedHtmlId,
  useEuiTheme,
} from '../../../../../src/services';

import {
  euiCanAnimate,
  logicalCSS,
  logicalCSSWithFallback,
  euiYScrollWithShadows,
} from '../../../../../src/global_styling';

export default () => {
  const [isCustomFlyoutVisible, setIsCustomFlyoutVisible] = useState(false);
  const euiThemeContext = useEuiTheme();
  const euiTheme = euiThemeContext.euiTheme;

  const toggleCustomFlyout = () => {
    setIsCustomFlyoutVisible(!isCustomFlyoutVisible);
  };

  const closeCustomFlyout = () => {
    setIsCustomFlyoutVisible(false);
  };

  const customFlyoutTitleId = useGeneratedHtmlId({
    prefix: 'customFlyoutTitle',
  });

  /**
   * ESC key closes CustomFlyout
   */
  const onKeyDown = (event: any) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      closeCustomFlyout();
    }
  };

  let customFlyout;

  if (isCustomFlyoutVisible) {
    customFlyout = (
      <EuiPortal>
        <EuiOverlayMask>
          <EuiFocusTrap onClickOutside={closeCustomFlyout}>
            <EuiPanel
              aria-labelledby={customFlyoutTitleId}
              role="dialog"
              paddingSize="l"
              css={css`
                position: fixed;
                max-inline-size: 480px;
                max-block-size: auto;
                inset-inline-end: ${euiTheme.size.l};
                inset-block-start: ${euiTheme.size.l};
                block-size: calc(100% - (${euiTheme.size.l} * 2));

                ${euiCanAnimate} {
                  animation: ${euiFlyoutSlideInRight}
                    ${euiTheme.animation.normal}
                    ${euiTheme.animation.resistance};
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  block-size: 100%;
                  justify-content: space-between;
                  flex-direction: column;
                `}
              >
                {/* Flyout Header */}
                <div
                  css={css`
                    flex-grow: 0;
                  `}
                >
                  <EuiSpacer size="s" />
                  <EuiTitle size="m">
                    <h2 id={customFlyoutTitleId}>Let&apos;s get started!</h2>
                  </EuiTitle>

                  <EuiButtonIcon
                    iconType="cross"
                    aria-label="Close modal"
                    onClick={closeCustomFlyout}
                    onKeyDown={onKeyDown}
                    color="text"
                    css={css`
                      position: absolute;
                      inset-block-start: ${euiTheme.size.base};
                      inset-inline-end: ${euiTheme.size.base};
                    `}
                  />

                  <EuiHorizontalRule />
                </div>

                {/* Flyout Body */}
                <div
                  css={css`
                    ${logicalCSS('height', '100%')}
                    ${logicalCSSWithFallback('overflow-y', 'hidden')}
                    flex-grow: 1;
                  `}
                >
                  <div
                    css={css`
                      ${logicalCSS('height', '100%')}
                      ${euiYScrollWithShadows(euiThemeContext, {
                        side: 'end',
                      })}
                    `}
                  >
                    <EuiText size="s">
                      <p>
                        Elastic Observability provides a unified view into the
                        health and performance of your entire digital ecosystem.
                        With easy ingest of multiple kinds of data via pre-built
                        collectors for hundreds of data sources.
                      </p>

                      <EuiHorizontalRule />

                      <ol
                        css={css`
                          > li {
                            list-style-type: none;
                          }

                          margin-inline-start: 0 !important;
                        `}
                      >
                        <li>
                          <h3>Step 1</h3>
                          <p>Select an ingestion method</p>

                          <EuiHorizontalRule />
                        </li>
                        <li>
                          <EuiTextColor color="subdued">
                            <h3>Step 2</h3>
                            <p>Select an ingestion method</p>
                          </EuiTextColor>

                          <EuiHorizontalRule />
                        </li>
                        <li>
                          <EuiTextColor color="subdued">
                            <h3>Step 3</h3>
                            <p>Select an ingestion method</p>
                          </EuiTextColor>

                          <EuiHorizontalRule />
                        </li>
                      </ol>
                    </EuiText>
                  </div>
                </div>

                {/* Flyout Footer */}
                <div
                  css={css`
                    flex-grow: 0;
                  `}
                >
                  <EuiText textAlign="center" color="subdued" size="s">
                    <EuiButtonEmpty onClick={closeCustomFlyout} size="s">
                      Exit setup guide
                    </EuiButtonEmpty>

                    <EuiSpacer size="s" />

                    <p>
                      How’s onboarding? We’d love your{' '}
                      <EuiLink href="#">feedback</EuiLink>.
                    </p>
                  </EuiText>
                </div>
              </div>
            </EuiPanel>
          </EuiFocusTrap>
        </EuiOverlayMask>
      </EuiPortal>
    );
  }

  return (
    <div>
      <EuiWindowEvent event="keydown" handler={onKeyDown} />
      <EuiEmptyPrompt
        color="subdued"
        iconType="logoObservability"
        iconColor="default"
        title={<h2>Observe my data</h2>}
        titleSize="xs"
        body={
          <p>
            Choose one of our many integrations to bring your data in, and start
            visualizing it.
          </p>
        }
        actions={<EuiButton onClick={toggleCustomFlyout}>View guide</EuiButton>}
      />
      {customFlyout}
    </div>
  );
};
