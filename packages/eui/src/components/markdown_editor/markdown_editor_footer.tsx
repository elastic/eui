/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useMemo, forwardRef, useContext } from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { EuiLoadingSpinner } from '../loading';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiI18n, useEuiI18n } from '../i18n';
import { EuiPopover, EuiPopoverTitle } from '../popover';
import { EuiText } from '../text';
import { EuiToolTip } from '../tool_tip';
import {
  EuiMarkdownDropHandler,
  EuiMarkdownEditorUiPlugin,
  EuiMarkdownParseError,
} from './markdown_types';
import { EuiMarkdownContext } from './markdown_context';
import { euiMarkdownEditorFooterStyles } from './markdown_editor_footer.styles';
import { EuiMarkdownEditorHelpButton } from './markdown_editor_help_button';

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

  const styles = useEuiMemoizedStyles(euiMarkdownEditorFooterStyles);
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
  };

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
          css={styles.euiMarkdownEditorFooter__uploadError}
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
        <div
          css={styles.euiMarkdownEditorFooter__popover}
          className="euiMarkdownEditorFooter__popover"
        >
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
    <div
      ref={ref}
      css={styles.euiMarkdownEditorFooter}
      className="euiMarkdownEditorFooter"
      data-test-subj="euiMarkdownEditorFooter"
    >
      <div
        css={styles.euiMarkdownEditorFooter__actions}
        className="euiMarkdownEditorFooter__actions"
      >
        {uploadButton}
        {errorsButton}
      </div>
      <EuiMarkdownEditorHelpButton uiPlugins={uiPlugins} />
    </div>
  );
});

EuiMarkdownEditorFooter.displayName = 'EuiMarkdownEditorFooter';
