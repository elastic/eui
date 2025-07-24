/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  MouseEventHandler,
  useContext,
  forwardRef,
  Ref,
} from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { IconType } from '../icon';
import { EuiI18n } from '../i18n';
import { EuiToolTip } from '../tool_tip';

import { MARKDOWN_MODE, MODE_VIEWING } from './markdown_modes';
import { EuiMarkdownEditorUiPlugin } from './markdown_types';
import { EuiMarkdownContext } from './markdown_context';
import MarkdownActions from './markdown_actions';
import { euiMarkdownEditorToolbarStyles } from './markdown_editor_toolbar.styles';

export type EuiMarkdownEditorToolbarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    selectedNode?: null | any;
    markdownActions: MarkdownActions;
    viewMode: MARKDOWN_MODE;
    onClickPreview: MouseEventHandler<HTMLButtonElement>;
    uiPlugins: EuiMarkdownEditorUiPlugin[];
    right?: React.ReactNode;
  };

const boldItalicButtons = [
  {
    id: 'mdBold',
    label: 'Bold',
    name: 'strong',
    iconType: 'editorBold',
  },
  {
    id: 'mdItalic',
    label: 'Italic',
    name: 'emphasis',
    iconType: 'editorItalic',
  },
];

const listButtons = [
  {
    id: 'mdUl',
    label: 'Unordered list',
    name: 'ul',
    iconType: 'editorUnorderedList',
  },
  {
    id: 'mdOl',
    label: 'Ordered list',
    name: 'ol',
    iconType: 'editorOrderedList',
  },
  {
    id: 'mdTl',
    label: 'Task list',
    name: 'tl',
    iconType: 'editorChecklist',
  },
];

const quoteCodeLinkButtons = [
  {
    id: 'mdQuote',
    label: 'Quote',
    name: 'quote',
    iconType: 'quote',
  },
  {
    id: 'mdCode',
    label: 'Code',
    name: 'inlineCode',
    iconType: 'code',
  },
  {
    id: 'mdLink',
    label: 'Link',
    name: 'link',
    iconType: 'editorLink',
  },
];

interface EuiMarkdownEditorToolbarButtonProps {
  selectedNode: null | any;
  handleMdButtonClick: (mdButtonId: string) => void;
  isEditable: boolean;
  isDisabled?: boolean;
  id: string;
  nodeId: string;
  label: string;
  icon: IconType;
}
const EuiMarkdownEditorToolbarButton = ({
  selectedNode,
  handleMdButtonClick,
  isEditable,
  isDisabled,
  id,
  nodeId,
  label,
  icon,
}: EuiMarkdownEditorToolbarButtonProps) => {
  const isSelected = selectedNode && selectedNode.type === nodeId;
  return (
    <EuiButtonIcon
      color="text"
      {...(isSelected
        ? {
            style: { background: 'rgba(0, 0, 0, 0.15)' },
          }
        : null)}
      data-test-subj={`euiMarkdownEditorToolbarButton${
        isSelected ? ' pressed' : ''
      }`}
      onClick={() => handleMdButtonClick(id)}
      iconType={icon}
      aria-label={label}
      isDisabled={!isEditable || isDisabled}
    />
  );
};

export const EuiMarkdownEditorToolbar = forwardRef<
  HTMLDivElement,
  EuiMarkdownEditorToolbarProps
>(
  (
    {
      markdownActions,
      viewMode,
      onClickPreview,
      uiPlugins,
      selectedNode,
      right,
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const { openPluginEditor, readOnly } = useContext(EuiMarkdownContext);

    const handleMdButtonClick = (mdButtonId: string) => {
      const actionResult = markdownActions.do(mdButtonId);
      if (actionResult !== true) openPluginEditor(actionResult);
    };

    const isPreviewing = viewMode === MODE_VIEWING;

    const isEditable = !isPreviewing && !readOnly;

    const styles = useEuiMemoizedStyles(euiMarkdownEditorToolbarStyles);

    return (
      <div
        ref={ref}
        css={styles.euiMarkdownEditorToolbar}
        className="euiMarkdownEditorToolbar"
        data-test-subj="euiMarkdownEditorToolbar"
      >
        <div
          css={styles.euiMarkdownEditorToolbar__buttons}
          className="euiMarkdownEditorToolbar__buttons"
        >
          {boldItalicButtons.map((item) => (
            <EuiToolTip key={item.id} content={item.label} delay="long">
              <EuiMarkdownEditorToolbarButton
                selectedNode={selectedNode}
                handleMdButtonClick={handleMdButtonClick}
                isEditable={isEditable}
                id={item.id}
                nodeId={item.name}
                label={item.label}
                icon={item.iconType}
              />
            </EuiToolTip>
          ))}
          <span
            css={styles.euiMarkdownEditorToolbar__divider}
            className="euiMarkdownEditorToolbar__divider"
          />
          {listButtons.map((item) => (
            <EuiToolTip key={item.id} content={item.label} delay="long">
              <EuiMarkdownEditorToolbarButton
                selectedNode={selectedNode}
                handleMdButtonClick={handleMdButtonClick}
                isEditable={isEditable}
                id={item.id}
                nodeId={item.name}
                label={item.label}
                icon={item.iconType}
              />
            </EuiToolTip>
          ))}
          <span
            css={styles.euiMarkdownEditorToolbar__divider}
            className="euiMarkdownEditorToolbar__divider"
          />
          {quoteCodeLinkButtons.map((item) => (
            <EuiToolTip key={item.id} content={item.label} delay="long">
              <EuiMarkdownEditorToolbarButton
                selectedNode={selectedNode}
                handleMdButtonClick={handleMdButtonClick}
                isEditable={isEditable}
                id={item.id}
                nodeId={item.name}
                label={item.label}
                icon={item.iconType}
              />
            </EuiToolTip>
          ))}

          {uiPlugins.length > 0 ? (
            <>
              <span
                css={styles.euiMarkdownEditorToolbar__divider}
                className="euiMarkdownEditorToolbar__divider"
              />
              {uiPlugins.map(({ name, button }) => {
                return (
                  <EuiToolTip key={name} content={button.label} delay="long">
                    <EuiMarkdownEditorToolbarButton
                      selectedNode={selectedNode}
                      handleMdButtonClick={handleMdButtonClick}
                      isEditable={isEditable}
                      isDisabled={button.isDisabled}
                      id={name}
                      nodeId={name}
                      label={button.label}
                      icon={button.iconType}
                    />
                  </EuiToolTip>
                );
              })}
            </>
          ) : null}
        </div>

        {right ?? (
          <PreviewEditorSwitch
            isPreviewing={isPreviewing}
            onClickPreview={onClickPreview}
            readOnly={readOnly}
          />
        )}
      </div>
    );
  }
);

const PreviewEditorSwitch = ({
  isPreviewing,
  onClickPreview,
  readOnly,
}: {
  isPreviewing: boolean;
  onClickPreview: MouseEventHandler<HTMLButtonElement>;
  readOnly?: boolean;
}) => {
  return (
    <EuiButtonEmpty
      iconType={isPreviewing ? 'code' : 'eye'}
      color="text"
      size="s"
      onClick={onClickPreview}
      isDisabled={readOnly}
      data-test-subj={
        isPreviewing
          ? 'markdown_editor_preview_button'
          : 'markdown_editor_edit_button'
      }
    >
      {isPreviewing ? (
        <EuiI18n token="euiMarkdownEditorToolbar.editor" default="Editor" />
      ) : (
        <EuiI18n
          token="euiMarkdownEditorToolbar.previewMarkdown"
          default="Preview"
        />
      )}
    </EuiButtonEmpty>
  );
};

EuiMarkdownEditorToolbar.displayName = 'EuiMarkdownEditorToolbar';
