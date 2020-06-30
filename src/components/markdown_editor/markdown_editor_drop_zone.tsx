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

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { EuiMarkdownEditorFooter } from './markdown_editor_footer';
import { EuiMarkdownEditorUiPlugin } from './markdown_types';

interface EuiMarkdownEditorDropZoneProps {
  uiPlugins: EuiMarkdownEditorUiPlugin[];
  errors: any;
}

export const EuiMarkdownEditorDropZone: FunctionComponent<
  EuiMarkdownEditorDropZoneProps
> = props => {
  const [isDragging, toggleDragging] = React.useState(false);
  const [isUploadingFiles, toggleUploadingFiles] = React.useState(false);

  const { children, uiPlugins, errors } = props;

  const classes = classNames('euiMarkdownEditor__dropZone', {
    'euiMarkdownEditor__dropZone--isDragging': isDragging,
  });

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    // multiple: false,
    onDragEnter: () => {
      toggleDragging(true);
    },
    onDragLeave: () => {
      toggleDragging(false);
    },
    onDrop: () => {
      toggleUploadingFiles(true);

      // faking the file upload
      setTimeout(() => {
        toggleDragging(false);
        toggleUploadingFiles(false);
      }, 3000);
    },
  });

  return (
    <div {...getRootProps()} className={classes}>
      {children}
      <EuiMarkdownEditorFooter
        uiPlugins={uiPlugins}
        openFiles={open}
        isUploadingFiles={isUploadingFiles}
        errors={errors}
      />
      <input {...getInputProps()} />
    </div>
  );
};
