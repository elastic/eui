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
import {
  EuiMarkdownEditorUiPlugin,
  EuiMarkdownParseError,
  EuiMarkdownDropHandler,
} from './markdown_types';

interface EuiMarkdownEditorDropZoneProps {
  uiPlugins: EuiMarkdownEditorUiPlugin[];
  errors: EuiMarkdownParseError[];
  dropHandlers: EuiMarkdownDropHandler[];
  insertText: (text: string) => void;
}

const getUnacceptedItems = (
  items: DataTransferItemList,
  dropHandlers: EuiMarkdownDropHandler[]
) => {
  const unacceptedItems: DataTransferItem[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    let isAccepted = false;
    for (let j = 0; j < dropHandlers.length; j++) {
      if (dropHandlers[j].accepts(item.type)) {
        isAccepted = true;
        break;
      }
    }

    if (!isAccepted) {
      unacceptedItems.push(item);
    }
  }

  return unacceptedItems;
};

export const EuiMarkdownEditorDropZone: FunctionComponent<
  EuiMarkdownEditorDropZoneProps
> = props => {
  const [isDragging, toggleDragging] = React.useState(false);
  const [isUploadingFiles, toggleUploadingFiles] = React.useState(false);
  const [unacceptedItems, setUnacceptedItems] = React.useState<
    DataTransferItem[]
  >([]);

  const { children, uiPlugins, errors, dropHandlers, insertText } = props;

  const classes = classNames('euiMarkdownEditorDropZone', {
    'euiMarkdownEditorDropZone--isDragging': isDragging,
  });

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    // multiple: false,
    onDragOver: e => {
      if (e.dataTransfer) {
        const unacceptedItems = getUnacceptedItems(
          e.dataTransfer.items,
          dropHandlers
        );
        setUnacceptedItems(unacceptedItems);
        if (unacceptedItems.length > 0) {
          e.preventDefault();
        }
        return unacceptedItems.length === 0;
      } else {
        setUnacceptedItems([]);
        return false;
      }
    },
    onDragEnter: e => {
      let result: boolean;

      if (e.dataTransfer) {
        const unacceptedItems = getUnacceptedItems(
          e.dataTransfer.items,
          dropHandlers
        );
        setUnacceptedItems(unacceptedItems);
        result = unacceptedItems.length === 0;
      } else {
        setUnacceptedItems([]);
        result = false;
      }

      toggleDragging(result);
      if (result === false) {
        e.preventDefault();
      }
      return result;
    },
    onDragLeave: () => {
      setUnacceptedItems([]);
      toggleDragging(false);
    },
    onDrop: acceptedFiles => {
      setUnacceptedItems([]);
      const fileHandlers: EuiMarkdownDropHandler[] = [];

      preparation: for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];

        for (let j = 0; j < dropHandlers.length; j++) {
          if (dropHandlers[j].accepts(file.type)) {
            fileHandlers.push(dropHandlers[j]);
            continue preparation;
          }
        }

        // if we get here then a file isn't handled
        return;
      }

      toggleUploadingFiles(true);

      const resolved: Array<string | Promise<string>> = [];
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        const handler = fileHandlers[i];
        resolved.push(handler.getFormattingForItem(file));
      }

      Promise.all(resolved)
        .then(results => {
          results.forEach(result => insertText(result));
        })
        .catch(() => {})
        .then(() => {
          toggleDragging(false);
          toggleUploadingFiles(false);
        });
    },
  });

  return (
    <div {...getRootProps()} className={classes}>
      {children}
      <EuiMarkdownEditorFooter
        uiPlugins={uiPlugins}
        openFiles={open}
        isUploadingFiles={isUploadingFiles}
        unacceptedItems={unacceptedItems}
        errors={errors}
      />
      <input {...getInputProps()} />
    </div>
  );
};
