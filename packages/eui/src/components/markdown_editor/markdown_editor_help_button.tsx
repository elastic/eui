/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, Fragment, useContext, ReactNode } from 'react';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../services';
import { EuiButton, EuiButtonIcon } from '../button';
import { EuiTitle } from '../title';
import {
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
} from '../modal';
import { EuiI18n, useEuiI18n } from '../i18n';
import { EuiPopover } from '../popover';
import { EuiText } from '../text';
import { EuiSpacer } from '../spacer';
import { EuiToolTip } from '../tool_tip';
import { EuiHorizontalRule } from '../horizontal_rule';
import { EuiLink } from '../link';
import { EuiMarkdownEditorUiPlugin } from './markdown_types';
import { EuiMarkdownContext } from './markdown_context';
// @ts-ignore a react svg
import MarkdownLogo from './icons/markdown_logo';
import { euiMarkdownEditorHelpButtonStyles } from './markdown_editor_help_button.styles';

interface EuiMarkdownEditorHelpButtonProps {
  uiPlugins: EuiMarkdownEditorUiPlugin[];
}

const mdSyntaxHref = 'https://guides.github.com/features/mastering-markdown/';

const mdSyntaxLink = (
  <EuiLink href={mdSyntaxHref} target="_blank">
    <EuiI18n
      token="euiMarkdownEditorHelpButton.mdSyntaxLink"
      default="GitHub flavored markdown"
    />
  </EuiLink>
);

export const EuiMarkdownEditorHelpButton = ({
  uiPlugins,
}: EuiMarkdownEditorHelpButtonProps) => {
  const [isShowingHelpModal, setIsShowingHelpModal] = useState(false);
  const [isShowingHelpPopover, setIsShowingHelpPopover] = useState(false);
  const { readOnly } = useContext(EuiMarkdownContext);
  const styles = useEuiMemoizedStyles(euiMarkdownEditorHelpButtonStyles);

  const syntaxTitle = useEuiI18n(
    'euiMarkdownEditorHelpButton.syntaxTitle',
    'Syntax help'
  );
  const ariaLabels = {
    showMarkdownHelp: useEuiI18n(
      'euiMarkdownEditorHelpButton.showMarkdownHelp',
      'Show markdown help'
    ),
  };
  const helpModalTitleId = useGeneratedHtmlId();

  const uiPluginsWithHelpText = uiPlugins.filter(({ helpText }) => !!helpText);
  const hasUiPluginsWithHelpText = uiPluginsWithHelpText.length > 0;

  if (hasUiPluginsWithHelpText) {
    return (
      <>
        <EuiToolTip content={syntaxTitle}>
          <EuiButtonIcon
            size="s"
            css={styles.euiMarkdownEditorFooter__helpButton}
            className="euiMarkdownEditorFooter__helpButton"
            iconType={MarkdownLogo}
            color="text"
            aria-label={ariaLabels.showMarkdownHelp}
            onClick={() => setIsShowingHelpModal(!isShowingHelpModal)}
            isDisabled={readOnly}
          />
        </EuiToolTip>

        {isShowingHelpModal && (
          <EuiModal
            onClose={() => setIsShowingHelpModal(false)}
            aria-labelledby={helpModalTitleId}
          >
            <EuiModalHeader>
              <EuiTitle>
                <h1 id={helpModalTitleId}>{syntaxTitle}</h1>
              </EuiTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <EuiI18n
                  tokens={[
                    'euiMarkdownEditorHelpButton.syntaxModalDescriptionPrefix',
                    'euiMarkdownEditorHelpButton.syntaxModalDescriptionSuffix',
                  ]}
                  defaults={[
                    'This editor uses',
                    'You can also utilize these additional syntax plugins to add rich content to your text.',
                  ]}
                >
                  {([
                    syntaxModalDescriptionPrefix,
                    syntaxModalDescriptionSuffix,
                  ]: ReactNode[]) => (
                    <p>
                      {syntaxModalDescriptionPrefix} {mdSyntaxLink}.{' '}
                      {syntaxModalDescriptionSuffix}
                    </p>
                  )}
                </EuiI18n>
              </EuiText>
              <EuiHorizontalRule />
              {uiPluginsWithHelpText.map(({ name, helpText }) => (
                <Fragment key={name}>
                  <EuiTitle size="xxs">
                    <p>
                      <strong>{name}</strong>
                    </p>
                  </EuiTitle>
                  <EuiSpacer size="s" />
                  {helpText}
                  <EuiSpacer size="l" />
                </Fragment>
              ))}
              <EuiHorizontalRule />
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButton onClick={() => setIsShowingHelpModal(false)} fill>
                <EuiI18n
                  token="euiMarkdownEditorHelpButton.closeButton"
                  default="Close"
                />
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        )}
      </>
    );
  } else {
    return (
      <EuiPopover
        button={
          <EuiButtonIcon
            title={syntaxTitle}
            size="s"
            css={styles.euiMarkdownEditorFooter__helpButton}
            className="euiMarkdownEditorFooter__helpButton"
            iconType={MarkdownLogo}
            color="text"
            aria-label={ariaLabels.showMarkdownHelp}
            onClick={() => setIsShowingHelpPopover(!isShowingHelpPopover)}
          />
        }
        isOpen={isShowingHelpPopover}
        closePopover={() => setIsShowingHelpPopover(false)}
        panelPaddingSize="s"
        anchorPosition="upCenter"
        aria-labelledby={helpModalTitleId}
      >
        <EuiI18n
          tokens={['euiMarkdownEditorHelpButton.syntaxPopoverDescription']}
          defaults={['This editor uses']}
        >
          {([syntaxPopoverDescription]: ReactNode[]) => (
            <p>
              {syntaxPopoverDescription} {mdSyntaxLink}.
            </p>
          )}
        </EuiI18n>
      </EuiPopover>
    );
  }
};

EuiMarkdownEditorHelpButton.displayName = 'EuiMarkdownEditorHelpButton';
