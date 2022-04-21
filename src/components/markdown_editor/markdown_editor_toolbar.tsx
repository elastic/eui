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
import { CommonProps } from '../common';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { EuiToolTip } from '../tool_tip';
import { MARKDOWN_MODE, MODE_VIEWING } from './markdown_modes';
import { EuiMarkdownEditorUiPlugin } from './markdown_types';
import { EuiMarkdownContext } from './markdown_context';
import MarkdownActions from './markdown_actions';
import { IconType } from '../icon';

export type EuiMarkdownEditorToolbarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    selectedNode?: null | any;
    markdownActions: MarkdownActions;
    viewMode: MARKDOWN_MODE;
    onClickPreview: MouseEventHandler<HTMLButtonElement>;
    uiPlugins: EuiMarkdownEditorUiPlugin[];
  };

const boldItalicButtons = [
  {
    id: 'strong',
    label: 'Bold',
    name: 'bold',
    iconType: 'editorBold',
  },
  {
    id: 'emphasis',
    label: 'Italic',
    name: 'italic',
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
    id: 'blockquote',
    label: 'Quote',
    name: 'quote',
    iconType: 'quote',
  },
  {
    id: 'inlineCode',
    label: 'Code',
    name: 'code',
    iconType: 'editorCodeBlock',
  },
  {
    id: 'link',
    label: 'Link',
    name: 'link',
    iconType: 'editorLink',
  },
];

interface FormatSelectableButtonArgs {
  selectedNode: null | any;
  handleMdButtonClick: (mdButtonId: string) => void;
  isEditable: boolean;
  id: string;
  label: string;
  icon: IconType;
}
export const formatSelectableButton = ({
  selectedNode,
  handleMdButtonClick,
  isEditable,
  id,
  label,
  icon,
}: FormatSelectableButtonArgs) => (
  <EuiButtonIcon
    color="text"
    {...(selectedNode && selectedNode.type === id
      ? {
          style: { background: 'rgba(0, 0, 0, 0.15)' },
        }
      : null)}
    onClick={() => handleMdButtonClick(id)}
    iconType={icon}
    aria-label={label}
    isDisabled={!isEditable}
  />
);

export const EuiMarkdownEditorToolbar = forwardRef<
  HTMLDivElement,
  EuiMarkdownEditorToolbarProps
>(
  (
    { markdownActions, viewMode, onClickPreview, uiPlugins, selectedNode },
    ref: Ref<HTMLDivElement>
  ) => {
    const { openPluginEditor, readOnly } = useContext(EuiMarkdownContext);

    const handleMdButtonClick = (mdButtonId: string) => {
      const actionResult = markdownActions.do(mdButtonId);
      if (actionResult !== true) openPluginEditor(actionResult);
    };

    const isPreviewing = viewMode === MODE_VIEWING;

    const isEditable = !isPreviewing && !readOnly;

    return (
      <div ref={ref} className="euiMarkdownEditorToolbar">
        <div className="euiMarkdownEditorToolbar__buttons">
          {boldItalicButtons.map((item) => (
            <EuiToolTip key={item.id} content={item.label} delay="long">
              {formatSelectableButton({
                selectedNode,
                handleMdButtonClick,
                isEditable,
                id: item.id,
                label: item.label,
                icon: item.iconType,
              })}
            </EuiToolTip>
          ))}
          <span className="euiMarkdownEditorToolbar__divider" />
          {listButtons.map((item) => (
            <EuiToolTip key={item.id} content={item.label} delay="long">
              {formatSelectableButton({
                selectedNode,
                handleMdButtonClick,
                isEditable,
                id: item.id,
                label: item.label,
                icon: item.iconType,
              })}
            </EuiToolTip>
          ))}
          <span className="euiMarkdownEditorToolbar__divider" />
          {quoteCodeLinkButtons.map((item) => (
            <EuiToolTip key={item.id} content={item.label} delay="long">
              {formatSelectableButton({
                selectedNode,
                handleMdButtonClick,
                isEditable,
                id: item.id,
                label: item.label,
                icon: item.iconType,
              })}
            </EuiToolTip>
          ))}

          {uiPlugins.length > 0 ? (
            <>
              <span className="euiMarkdownEditorToolbar__divider" />
              {uiPlugins.map(({ name, button }) => {
                return (
                  <EuiToolTip key={name} content={button.label} delay="long">
                    {formatSelectableButton({
                      selectedNode,
                      handleMdButtonClick,
                      isEditable,
                      id: name,
                      label: button.label,
                      icon: button.iconType,
                    })}
                  </EuiToolTip>
                );
              })}
            </>
          ) : null}
        </div>

        {isPreviewing ? (
          <EuiButtonEmpty
            iconType="editorCodeBlock"
            color="text"
            size="s"
            onClick={onClickPreview}
            isDisabled={readOnly}
          >
            <EuiI18n token="euiMarkdownEditorToolbar.editor" default="Editor" />
          </EuiButtonEmpty>
        ) : (
          <EuiButtonEmpty
            iconType="eye"
            color="text"
            size="s"
            onClick={onClickPreview}
            isDisabled={readOnly}
          >
            <EuiI18n
              token="euiMarkdownEditorToolbar.previewMarkdown"
              default="Preview"
            />
          </EuiButtonEmpty>
        )}
      </div>
    );
  }
);

EuiMarkdownEditorToolbar.displayName = 'EuiMarkdownEditorToolbar';
