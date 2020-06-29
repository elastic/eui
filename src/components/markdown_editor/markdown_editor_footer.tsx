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

import React, { FunctionComponent, useState } from 'react';
import { EuiLoadingSpinner } from '../loading';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiModal, EuiModalBody } from '../modal';
import { EuiMarkdownEditorUiPlugin } from './markdown_types';
import { EuiPopover, EuiPopoverTitle } from '../popover';
import { EuiText } from '../text';
// @ts-ignore a react svg
import MarkdownLogo from './markdown_logo';

interface EuiMarkdownEditorFooterProps {
  uiPlugins: EuiMarkdownEditorUiPlugin[];
  isUploadingFiles: boolean;
  openFiles: () => void;
  errors?: any;
}

export const EuiMarkdownEditorFooter: FunctionComponent<
  EuiMarkdownEditorFooterProps
> = props => {
  const { uiPlugins, isUploadingFiles, openFiles, errors } = props;
  const [isShowingHelp, setIsShowingHelp] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () => setIsPopoverOpen(isPopoverOpen => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  let uploadButton;

  console.log('in footer', errors);

  if (isUploadingFiles) {
    uploadButton = (
      <EuiButtonIcon
        iconType={EuiLoadingSpinner}
        aria-label="Uploading files"
      />
    );
  } else {
    uploadButton = (
      <EuiButtonIcon
        iconType="paperClip"
        color="text"
        aria-label="Open upload files modal"
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
            aria-label="Show errors"
            onClick={onButtonClick}>
            {errors.length}
          </EuiButtonEmpty>
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        anchorPosition="upCenter">
        <div className="euiMarkdownEditor__footerPopover">
          <EuiPopoverTitle>Errors</EuiPopoverTitle>
          {errors.map((message: any, idx: any) => (
            <EuiText key={idx}>{message.toString()}</EuiText>
          ))}
        </div>
      </EuiPopover>
    );
  }

  return (
    <footer className="euiMarkdownEditor__footer">
      <div className="euiMarkdownEditor__footerActions">
        {uploadButton}
        {errorsButton}
      </div>

      <EuiButtonIcon
        className="euiMarkdownEditor__footerHelp"
        iconType={MarkdownLogo}
        color="text"
        aria-label="Show markdown help"
        onClick={() => setIsShowingHelp(!isShowingHelp)}
      />
      {isShowingHelp && (
        <EuiOverlayMask onClick={() => setIsShowingHelp(false)}>
          <EuiModal onClose={() => setIsShowingHelp(false)}>
            <EuiModalBody>
              {uiPlugins
                .filter(({ helpText }) => !!helpText)
                .map(({ name, helpText }) => (
                  <div key={name}>{helpText}</div>
                ))}
            </EuiModalBody>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </footer>
  );
};
