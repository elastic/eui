/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useEffect } from 'react';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { EuiMarkdownEditorFooter } from './markdown_editor_footer';
import {
  EuiMarkdownEditorUiPlugin,
  EuiMarkdownParseError,
  EuiMarkdownDropHandler,
  EuiMarkdownStringTagConfig,
  EuiMarkdownDragAndDropResult,
} from './markdown_types';
import { useResizeObserver } from '../observer/resize_observer';

interface EuiMarkdownEditorDropZoneProps {
  uiPlugins: EuiMarkdownEditorUiPlugin[];
  errors: EuiMarkdownParseError[];
  dropHandlers: EuiMarkdownDropHandler[];
  insertText: (text: string, config: EuiMarkdownStringTagConfig) => void;
  hasUnacceptedItems: boolean;
  setHasUnacceptedItems: (hasUnacceptedItems: boolean) => void;
  setEditorFooterHeight: (height: number) => void;
  isEditing: boolean;
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

export const EuiMarkdownEditorDropZone: FunctionComponent<EuiMarkdownEditorDropZoneProps> = (
  props
) => {
  const [isDragging, toggleDragging] = React.useState(false);
  const [isUploadingFiles, toggleUploadingFiles] = React.useState(false);
  const [isDraggingError, toggleDraggingError] = React.useState(false);

  const {
    children,
    uiPlugins,
    errors,
    dropHandlers,
    insertText,
    hasUnacceptedItems,
    setHasUnacceptedItems,
    setEditorFooterHeight,
    isEditing,
  } = props;

  const classes = classNames('euiMarkdownEditorDropZone', {
    'euiMarkdownEditorDropZone--isDragging': isDragging,
    'euiMarkdownEditorDropZone--hasError': hasUnacceptedItems,
    'euiMarkdownEditorDropZone--isDraggingError': isDraggingError,
  });

  const [
    editorFooterRef,
    setEditorFooterRef,
  ] = React.useState<HTMLDivElement | null>(null);

  const { height: editorFooterHeight } = useResizeObserver(
    editorFooterRef,
    'height'
  );

  useEffect(() => {
    if (editorFooterHeight !== 0) {
      setEditorFooterHeight(editorFooterHeight);
    }
  }, [setEditorFooterHeight, isEditing, editorFooterHeight]);

  const { getRootProps, getInputProps, open } = useDropzone({
    disabled: dropHandlers.length === 0,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    // multiple: false,
    onDragOver: (e) => {
      let result: boolean;

      if (e.dataTransfer) {
        const unacceptedItems = getUnacceptedItems(
          e.dataTransfer.items,
          dropHandlers
        );
        setHasUnacceptedItems(unacceptedItems.length > 0);
        toggleDraggingError(unacceptedItems.length > 0);

        result = unacceptedItems.length === 0;
      } else {
        setHasUnacceptedItems(false);
        result = false;
      }

      toggleDragging(result);
      if (result === false) {
        e.preventDefault();
      }
      return result;
    },
    onDragEnter: (e) => {
      let result: boolean;

      if (e.dataTransfer) {
        const unacceptedItems = getUnacceptedItems(
          e.dataTransfer.items,
          dropHandlers
        );
        setHasUnacceptedItems(unacceptedItems.length > 0);
        toggleDraggingError(unacceptedItems.length > 0);

        result = unacceptedItems.length === 0;
      } else {
        setHasUnacceptedItems(false);
        result = false;
      }

      toggleDragging(result);
      if (result === false) {
        e.preventDefault();
      }
      return result;
    },
    onDragLeave: () => {
      toggleDragging(false);
    },
    onDrop: (acceptedFiles) => {
      const fileHandlers: EuiMarkdownDropHandler[] = [];

      // verify all files being dropped are supported
      preparation: for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];

        for (let j = 0; j < dropHandlers.length; j++) {
          if (dropHandlers[j].accepts(file.type)) {
            fileHandlers.push(dropHandlers[j]);
            continue preparation;
          }
        }

        // if we get here then a file isn't handled
        setHasUnacceptedItems(true);
        toggleDragging(false);
        toggleDraggingError(false);
        return;
      }

      toggleUploadingFiles(true);

      const resolved: Array<
        EuiMarkdownDragAndDropResult | Promise<EuiMarkdownDragAndDropResult>
      > = [];
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        const handler = fileHandlers[i];
        resolved.push(handler.getFormattingForItem(file));
      }

      Promise.all(resolved)
        .then((results) => {
          results.forEach(({ text, config }) => insertText(text, config));
        })
        .catch(() => {})
        .then(() => {
          toggleDragging(false);
          toggleUploadingFiles(false);
          toggleDraggingError(false);
        });
    },
  });

  return (
    <div {...getRootProps()} className={classes}>
      {children}
      <EuiMarkdownEditorFooter
        ref={setEditorFooterRef}
        uiPlugins={uiPlugins}
        openFiles={() => {
          setHasUnacceptedItems(false);
          open();
        }}
        isUploadingFiles={isUploadingFiles}
        hasUnacceptedItems={hasUnacceptedItems}
        dropHandlers={dropHandlers}
        errors={errors}
      />
      <input {...getInputProps()} />
    </div>
  );
};
