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

import React, { Component, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiFlexItem, EuiFlexGroup } from '../flex';
import { EuiI18n } from '../i18n';
import { EuiToolTip } from '../tool_tip';
import { MARKDOWN_MODE, MODE_VIEWING } from './markdown_modes';
import { EuiMarkdownEditorUiPlugin } from './markdown_types';

export type EuiMarkdownEditorToolbarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    markdownActions?: any;
    viewMode?: MARKDOWN_MODE;
    onClickPreview?: any;
    uiPlugins: EuiMarkdownEditorUiPlugin[];
  };

export class EuiMarkdownEditorToolbar extends Component<
  EuiMarkdownEditorToolbarProps
> {
  boldItalicButtons = [
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

  listButtons = [
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
  ];

  quoteCodeLinkButtons = [
    {
      id: 'mdQuote',
      label: 'Quote',
      name: 'quote',
      iconType: 'editorComment',
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

  handleMdButtonClick = (mdButtonId: string) => {
    this.props.markdownActions.do(mdButtonId);
  };

  render() {
    const { viewMode, onClickPreview, uiPlugins } = this.props;

    const isPreviewing = viewMode === MODE_VIEWING;

    return (
      <div className="euiMarkdownEditor__toolbar">
        <EuiFlexGroup
          justifyContent="spaceBetween"
          alignItems="center"
          responsive={false}>
          <EuiFlexItem
            grow={false}
            className="euiMarkdownEditor__toolbar__buttons">
            {this.boldItalicButtons.map(item => (
              <EuiToolTip key={item.id} content={item.label} delay="long">
                <EuiButtonIcon
                  color="text"
                  onClick={() => this.handleMdButtonClick(item.id)}
                  iconType={item.iconType}
                  aria-label={item.label}
                  isDisabled={isPreviewing}
                />
              </EuiToolTip>
            ))}
            <span className="euiMarkdownEditor__toolbar__divider" />
            {this.listButtons.map(item => (
              <EuiToolTip key={item.id} content={item.label} delay="long">
                <EuiButtonIcon
                  color="text"
                  onClick={() => this.handleMdButtonClick(item.id)}
                  iconType={item.iconType}
                  aria-label={item.label}
                  isDisabled={isPreviewing}
                />
              </EuiToolTip>
            ))}
            <span className="euiMarkdownEditor__toolbar__divider" />
            {this.quoteCodeLinkButtons.map(item => (
              <EuiToolTip key={item.id} content={item.label} delay="long">
                <EuiButtonIcon
                  color="text"
                  onClick={() => this.handleMdButtonClick(item.id)}
                  iconType={item.iconType}
                  aria-label={item.label}
                  isDisabled={isPreviewing}
                />
              </EuiToolTip>
            ))}
            {uiPlugins.length > 0 ? (
              <>
                <span className="euiMarkdownEditor__toolbar__divider" />
                {uiPlugins.map(({ name, button }) => (
                  <EuiToolTip key={name} content={button.label} delay="long">
                    <EuiButtonIcon
                      color="text"
                      onClick={() => this.handleMdButtonClick(name)}
                      iconType={button.iconType}
                      aria-label={button.label}
                      isDisabled={isPreviewing}
                    />
                  </EuiToolTip>
                ))}
              </>
            ) : null}
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            {/* The idea was to use the EuiButtonToggle but it doesn't work when pressing the enter key */}
            {isPreviewing ? (
              <EuiButtonEmpty
                iconType="editorCodeBlock"
                color="text"
                size="s"
                onClick={onClickPreview}>
                <EuiI18n
                  token="euiMarkdownEditorToolbar.editor"
                  default="Editor"
                />
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
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}
