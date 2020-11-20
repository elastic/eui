/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  useState,
  useMemo,
  Fragment,
  ReactChild,
  forwardRef,
} from 'react';
import { EuiLoadingSpinner } from '../loading';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiTitle } from '../title';
import { EuiModal, EuiModalBody, EuiModalHeader } from '../modal';
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
          onClick={openFiles}>
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
            onClick={onButtonClick}>
            {errors.length}
          </EuiButtonEmpty>
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="s"
        anchorPosition="upCenter">
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
        <EuiOverlayMask onClick={() => setIsShowingHelp(false)}>
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
              <Fragment>
                <EuiText>
                  <EuiI18n
                    tokens={[
                      'euiMarkdownEditorFooter.descriptionPrefix',
                      'euiMarkdownEditorFooter.descriptionSuffix',
                    ]}
                    defaults={[
                      'This editor uses',
                      'You can also utilize these additional syntax plugins to add rich content to your text.',
                    ]}>
                    {([descriptionPrefix, descriptionSuffix]: ReactChild[]) => (
                      <p>
                        {descriptionPrefix}{' '}
                        <a
                          href="https://github.github.com/gfm/"
                          target="_blank">
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
              </Fragment>
            </EuiModalBody>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </div>
  );
});

EuiMarkdownEditorFooter.displayName = 'EuiMarkdownEditorFooter';
