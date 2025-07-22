/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';

import { useEuiMemoizedStyles } from '../../services';
import { useResizeObserver } from '../observer/resize_observer';

import { EuiMarkdownContext } from './markdown_context';
import { EuiMarkdownEditorFooter } from './markdown_editor_footer';
import {
  EuiMarkdownEditorUiPlugin,
  EuiMarkdownParseError,
  EuiMarkdownDropHandler,
  EuiMarkdownStringTagConfig,
  EuiMarkdownDragAndDropResult,
} from './markdown_types';
import { euiMarkdownEditorDropZoneStyles } from './markdown_editor_drop_zone.styles';

interface EuiMarkdownEditorDropZoneProps extends PropsWithChildren {
  uiPlugins: EuiMarkdownEditorUiPlugin[];
  errors: EuiMarkdownParseError[];
  dropHandlers: EuiMarkdownDropHandler[];
  insertText: (text: string, config: EuiMarkdownStringTagConfig) => void;
  hasUnacceptedItems: boolean;
  setHasUnacceptedItems: (hasUnacceptedItems: boolean) => void;
  setEditorFooterHeight: (height: number) => void;
  isEditing: boolean;
  showFooter?: boolean;
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
> = (props) => {
  const { readOnly } = useContext(EuiMarkdownContext);

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
    showFooter,
  } = props;

  const classes = classNames('euiMarkdownEditorDropZone');

  const styles = useEuiMemoizedStyles(euiMarkdownEditorDropZoneStyles);
  const cssStyles = [
    styles.euiMarkdownEditorDropZone,
    isDragging && !isDraggingError && styles.isDragging,
    isDraggingError && styles.isDraggingError,
    (hasUnacceptedItems || errors.length > 0) && styles.hasError,
  ];

  const [editorFooterRef, setEditorFooterRef] =
    React.useState<HTMLDivElement | null>(null);

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
    disabled: dropHandlers.length === 0 || readOnly,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    preventDropOnDocument: false,
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

  const rootProps = { ...getRootProps() };
  if (readOnly) rootProps.role = undefined; // Unset the default `role="button"` attribute which sets a misleading pointer icon

  return (
    <div {...rootProps} css={cssStyles} className={classes}>
      {children}
      {showFooter && (
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
      )}

      <input {...getInputProps()} />
    </div>
  );
};
