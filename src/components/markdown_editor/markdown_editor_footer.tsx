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
// @ts-ignore a react svg
import MarkdownLogo from './icons/markdown_logo';
import { EuiHorizontalRule } from '../horizontal_rule';
import { EuiToolTip } from '../tool_tip';

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
  const [isShowingHelp, setIsShowingHelp] = useState(false);
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

  if (isUploadingFiles) {
    uploadButton = (
      <EuiButtonIcon
        iconType={EuiLoadingSpinner}
        aria-label={ariaLabels.uploadingFiles}
      />
    );
  } else if (dropHandlers.length > 0 && hasUnacceptedItems) {
    uploadButton = (
      <EuiToolTip content={ariaLabels.supportedFileTypes}>
        <EuiButtonEmpty
          className="euiMarkdownEditorFooter__uploadError"
          autoFocus
          size="xs"
          iconType="paperClip"
          color="danger"
          aria-label={`${ariaLabels.unsupportedFileType}. ${ariaLabels.supportedFileTypes}. ${ariaLabels.uploadingFiles}`}
          onClick={openFiles}
        >
          {ariaLabels.unsupportedFileType}
        </EuiButtonEmpty>
      </EuiToolTip>
    );
  } else if (dropHandlers.length > 0) {
    uploadButton = (
      <EuiButtonIcon
        iconType="paperClip"
        color="text"
        aria-label={ariaLabels.openUploadModal}
        onClick={openFiles}
      />
    );
  }

  let errorsButton;
  if (errors && errors.length) {
    errorsButton = (
      <EuiPopover
        button={
          <EuiButtonEmpty
            iconType="crossInACircleFilled"
            size="s"
            color="danger"
            aria-label={ariaLabels.showSyntaxErrors}
            onClick={onButtonClick}
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

  return (
    <div ref={ref} className="euiMarkdownEditorFooter">
      <div className="euiMarkdownEditorFooter__actions">
        {uploadButton}
        {errorsButton}
      </div>

      <EuiButtonIcon
        className="euiMarkdownEditorFooter__help"
        iconType={MarkdownLogo}
        color="text"
        aria-label={ariaLabels.showMarkdownHelp}
        onClick={() => setIsShowingHelp(!isShowingHelp)}
      />
      {isShowingHelp && (
        <EuiModal onClose={() => setIsShowingHelp(false)}>
          <EuiModalHeader>
            <EuiTitle>
              <h3>
                <EuiI18n
                  token="euiMarkdownEditorFooter.syntaxTitle"
                  default="Syntax help"
                />
              </h3>
            </EuiTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <EuiI18n
                tokens={[
                  'euiMarkdownEditorFooter.descriptionPrefix',
                  'euiMarkdownEditorFooter.descriptionSuffix',
                ]}
                defaults={[
                  'This editor uses',
                  'You can also utilize these additional syntax plugins to add rich content to your text.',
                ]}
              >
                {([descriptionPrefix, descriptionSuffix]: ReactChild[]) => (
                  <p>
                    {descriptionPrefix}{' '}
                    <a href="https://github.github.com/gfm/" target="_blank">
                      Github flavored markdown
                    </a>
                    . {descriptionSuffix}
                  </p>
                )}
              </EuiI18n>
            </EuiText>
            <EuiHorizontalRule />
            {uiPlugins
              .filter(({ helpText }) => !!helpText)
              .map(({ name, helpText }) => (
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
            <EuiButton onClick={() => setIsShowingHelp(false)} fill>
              <EuiI18n
                token="euiMarkdownEditorFooter.closeButton"
                default="Close"
              />
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </div>
  );
});

EuiMarkdownEditorFooter.displayName = 'EuiMarkdownEditorFooter';
