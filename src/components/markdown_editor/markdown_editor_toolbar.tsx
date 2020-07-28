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
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  useContext,
} from 'react';
import { CommonProps } from '../common';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { EuiToolTip } from '../tool_tip';
import { MARKDOWN_MODE, MODE_VIEWING } from './markdown_modes';
import { EuiMarkdownEditorUiPlugin } from './markdown_types';
import { EuiMarkdownContext } from './markdown_context';
import MarkdownActions from './markdown_actions';
// @ts-ignore a react svg
import MarkdownCheckmarkIcon from './icons/markdown_checkmark';

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
    id: 'mdBold',
    label: 'Bold',
    name: 'bold',
    iconType: 'editorBold',
  },
  {
    id: 'mdItalic',
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
    iconType: MarkdownCheckmarkIcon,
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
    name: 'code',
    iconType: 'editorCodeBlock',
  },
  {
    id: 'mdLink',
    label: 'Link',
    name: 'link',
    iconType: 'editorLink',
  },
];

export const EuiMarkdownEditorToolbar: FunctionComponent<EuiMarkdownEditorToolbarProps> = ({
  markdownActions,
  viewMode,
  onClickPreview,
  uiPlugins,
  selectedNode,
}) => {
  const { openPluginEditor } = useContext(EuiMarkdownContext);

  const handleMdButtonClick = (mdButtonId: string) => {
    const actionResult = markdownActions.do(mdButtonId);
    if (actionResult !== true) openPluginEditor(actionResult);
  };

  const isPreviewing = viewMode === MODE_VIEWING;

  return (
    <div className="euiMarkdownEditorToolbar">
      <div className="euiMarkdownEditorToolbar__buttons">
        {boldItalicButtons.map(item => (
          <EuiToolTip key={item.id} content={item.label} delay="long">
            <EuiButtonIcon
              color="text"
              onClick={() => handleMdButtonClick(item.id)}
              iconType={item.iconType}
              aria-label={item.label}
              isDisabled={isPreviewing}
            />
          </EuiToolTip>
        ))}
        <span className="euiMarkdownEditorToolbar__divider" />
        {listButtons.map(item => (
          <EuiToolTip key={item.id} content={item.label} delay="long">
            <EuiButtonIcon
              color="text"
              onClick={() => handleMdButtonClick(item.id)}
              iconType={item.iconType}
              aria-label={item.label}
              isDisabled={isPreviewing}
            />
          </EuiToolTip>
        ))}
        <span className="euiMarkdownEditorToolbar__divider" />
        {quoteCodeLinkButtons.map(item => (
          <EuiToolTip key={item.id} content={item.label} delay="long">
            <EuiButtonIcon
              color="text"
              onClick={() => handleMdButtonClick(item.id)}
              iconType={item.iconType}
              aria-label={item.label}
              isDisabled={isPreviewing}
            />
          </EuiToolTip>
        ))}

        {uiPlugins.length > 0 ? (
          <>
            <span className="euiMarkdownEditorToolbar__divider" />
            {uiPlugins.map(({ name, button }) => {
              const isSelectedNodeType =
                selectedNode && selectedNode.type === name;
              return (
                <EuiToolTip key={name} content={button.label} delay="long">
                  <EuiButtonIcon
                    color="text"
                    {...(isSelectedNodeType
                      ? {
                          style: { background: 'rgba(0, 0, 0, 0.15)' },
                        }
                      : null)}
                    onClick={() => handleMdButtonClick(name)}
                    iconType={button.iconType}
                    aria-label={button.label}
                    isDisabled={isPreviewing}
                  />
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
          onClick={onClickPreview}>
          <EuiI18n token="euiMarkdownEditorToolbar.editor" default="Editor" />
        </EuiButtonEmpty>
      ) : (
        <EuiButtonEmpty
          iconType="eye"
          color="text"
          size="s"
          onClick={onClickPreview}>
          <EuiI18n
            token="euiMarkdownEditorToolbar.previewMarkdown"
            default="Preview"
          />
        </EuiButtonEmpty>
      )}
    </div>
  );
};
