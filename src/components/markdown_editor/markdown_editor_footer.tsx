/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useState,
  useMemo,
  Fragment,
  ReactChild,
  forwardRef,
  useContext,
} from 'react';
import { EuiLoadingSpinner } from '../loading';
import { EuiButton, EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiTitle } from '../title';
import {
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
} from '../modal';
import { EuiI18n, useEuiI18n } from '../i18n';
import {
  EuiMarkdownDropHandler,
  EuiMarkdownEditorUiPlugin,
  EuiMarkdownParseError,
} from './markdown_types';
import { EuiPopover, EuiPopoverTitle } from '../popover';
import { EuiText } from '../text';
import { EuiSpacer } from '../spacer';
import { EuiToolTip } from '../tool_tip';
// @ts-ignore a react svg
import MarkdownLogo from './icons/markdown_logo';
import { EuiHorizontalRule } from '../horizontal_rule';

import { EuiLink } from '../link';

import { EuiMarkdownContext } from './markdown_context';

interface EuiMarkdownEditorFooterProps {
  uiPlugins: EuiMarkdownEditorUiPlugin[];
  isUploadingFiles: boolean;
  openFiles: () => void;
  errors: EuiMarkdownParseError[];
  hasUnacceptedItems: boolean;
  dropHandlers: EuiMarkdownDropHandler[];
}

export const EuiMarkdownEditorFooter = forwardRef<
  HTMLDivElement,
  EuiMarkdownEditorFooterProps
>((props, ref) => {
  const {
    uiPlugins,
    isUploadingFiles,
    openFiles,
    errors,
    hasUnacceptedItems,
    dropHandlers,
  } = props;
  const [isShowingHelpModal, setIsShowingHelpModal] = useState(false);
  const [isShowingHelpPopover, setIsShowingHelpPopover] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  let uploadButton;

  const supportedFileTypes = useMemo(
    () =>
      dropHandlers
        .map(({ supportedFiles }) => supportedFiles.join(', '))
        .sort()
        .join(', '),
    [dropHandlers]
  );

  const ariaLabels = {
    uploadingFiles: useEuiI18n(
      'euiMarkdownEditorFooter.uploadingFiles',
      'Click to upload files'
    ),
    openUploadModal: useEuiI18n(
      'euiMarkdownEditorFooter.openUploadModal',
      'Open upload files modal'
    ),
    unsupportedFileType: useEuiI18n(
      'euiMarkdownEditorFooter.unsupportedFileType',
      'File type not supported'
    ),
    supportedFileTypes: useEuiI18n(
      'euiMarkdownEditorFooter.supportedFileTypes',
      'Supported files: {supportedFileTypes}',
      { supportedFileTypes }
    ),
    showSyntaxErrors: useEuiI18n(
      'euiMarkdownEditorFooter.showSyntaxErrors',
      'Show errors'
    ),
    showMarkdownHelp: useEuiI18n(
      'euiMarkdownEditorFooter.showMarkdownHelp',
      'Show markdown help'
    ),
  };

  const syntaxTitle = useEuiI18n(
    'euiMarkdownEditorFooter.syntaxTitle',
    'Syntax help'
  );

  const { readOnly } = useContext(EuiMarkdownContext);

  if (isUploadingFiles) {
    uploadButton = (
      <EuiButtonIcon
        size="s"
        iconType={EuiLoadingSpinner}
        aria-label={ariaLabels.uploadingFiles}
        isDisabled={readOnly}
      />
    );
  } else if (dropHandlers.length > 0 && hasUnacceptedItems) {
    uploadButton = (
      <EuiToolTip content={ariaLabels.supportedFileTypes}>
        <EuiButtonEmpty
          className="euiMarkdownEditorFooter__uploadError"
          autoFocus
          size="s"
          iconType="paperClip"
          color="danger"
          aria-label={`${ariaLabels.unsupportedFileType}. ${ariaLabels.supportedFileTypes}. ${ariaLabels.uploadingFiles}`}
          onClick={openFiles}
          isDisabled={readOnly}
        >
          {ariaLabels.unsupportedFileType}
        </EuiButtonEmpty>
      </EuiToolTip>
    );
  } else if (dropHandlers.length > 0) {
    uploadButton = (
      <EuiButtonIcon
        size="s"
        iconType="paperClip"
        color="text"
        aria-label={ariaLabels.openUploadModal}
        onClick={openFiles}
        isDisabled={readOnly}
      />
    );
  }

  let errorsButton;
  if (errors && errors.length) {
    errorsButton = (
      <EuiPopover
        button={
          <EuiButtonEmpty
            iconType="error"
            size="s"
            color="danger"
            aria-label={ariaLabels.showSyntaxErrors}
            onClick={onButtonClick}
            isDisabled={readOnly}
          >
            {errors.length}
          </EuiButtonEmpty>
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="s"
        anchorPosition="upCenter"
      >
        <div className="euiMarkdownEditorFooter__popover">
          <EuiPopoverTitle>
            <EuiI18n
              token="euiMarkdownEditorFooter.errorsTitle"
              default="Errors"
            />
          </EuiPopoverTitle>
          {errors.map((message, idx) => (
            <EuiText size="s" key={idx}>
              {message.toString()}
            </EuiText>
          ))}
        </div>
      </EuiPopover>
    );
  }

  const uiPluginsWithHelpText = uiPlugins.filter(({ helpText }) => !!helpText);

  const hasUiPluginsWithHelpText = uiPluginsWithHelpText.length > 0;

  const mdSyntaxHref = 'https://guides.github.com/features/mastering-markdown/';

  const mdSyntaxLink = (
    <EuiLink href={mdSyntaxHref} target="_blank">
      <EuiI18n
        token="euiMarkdownEditorFooter.mdSyntaxLink"
        default="GitHub flavored markdown"
      />
    </EuiLink>
  );

  let helpSyntaxButton;

  if (hasUiPluginsWithHelpText) {
    helpSyntaxButton = (
      <>
        <EuiToolTip content={syntaxTitle}>
          <EuiButtonIcon
            size="s"
            className="euiMarkdownEditorFooter__helpButton"
            iconType={MarkdownLogo}
            color="text"
            aria-label={ariaLabels.showMarkdownHelp}
            onClick={() => setIsShowingHelpModal(!isShowingHelpModal)}
            isDisabled={readOnly}
          />
        </EuiToolTip>

        {isShowingHelpModal && (
          <EuiModal onClose={() => setIsShowingHelpModal(false)}>
            <EuiModalHeader>
              <EuiTitle>
                <h1>{syntaxTitle}</h1>
              </EuiTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <EuiI18n
                  tokens={[
                    'euiMarkdownEditorFooter.syntaxModalDescriptionPrefix',
                    'euiMarkdownEditorFooter.syntaxModalDescriptionSuffix',
                  ]}
                  defaults={[
                    'This editor uses',
                    'You can also utilize these additional syntax plugins to add rich content to your text.',
                  ]}
                >
                  {([
                    syntaxModalDescriptionPrefix,
                    syntaxModalDescriptionSuffix,
                  ]: ReactChild[]) => (
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
                  token="euiMarkdownEditorFooter.closeButton"
                  default="Close"
                />
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        )}
      </>
    );
  } else {
    helpSyntaxButton = (
      <EuiPopover
        button={
          <EuiButtonIcon
            title={syntaxTitle}
            size="s"
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
      >
        <EuiI18n
          tokens={['euiMarkdownEditorFooter.syntaxPopoverDescription']}
          defaults={['This editor uses']}
        >
          {([syntaxPopoverDescription]: ReactChild[]) => (
            <p>
              {syntaxPopoverDescription} {mdSyntaxLink}.
            </p>
          )}
        </EuiI18n>
      </EuiPopover>
    );
  }

  return (
    <div ref={ref} className="euiMarkdownEditorFooter">
      <div className="euiMarkdownEditorFooter__actions">
        {uploadButton}
        {errorsButton}
      </div>
      {helpSyntaxButton}
    </div>
  );
});

EuiMarkdownEditorFooter.displayName = 'EuiMarkdownEditorFooter';
