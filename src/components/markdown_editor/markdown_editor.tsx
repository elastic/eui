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
import classNames from 'classnames';
import { CommonProps } from '../common';
import MarkdownActions from './markdown_actions';
import { EuiMarkdownEditorToolbar } from './markdown_editor_toolbar';
import { EuiMarkdownEditorTextArea } from './markdown_editor_text_area';
import { EuiMarkdownFormat } from './markdown_format';
import { EuiMarkdownEditorDropZone } from './markdown_editor_drop_zone';

export type EuiMarkdownEditorProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /** A unique ID to attach to the textarea. If one isn't provided, a random one
     * will be generated */
    editorId?: string;
    /** A initial markdown content */
    initialValue?: string;
    /** The height of the content/preview area */
    height: number;
  };

export interface MarkdownEditorState {
  editorContent: string;
  viewMarkdownPreview: boolean;
  files: FileList | null;
}

export class EuiMarkdownEditor extends Component<
  EuiMarkdownEditorProps,
  MarkdownEditorState
> {
  editorId: string;
  markdownActions: MarkdownActions;

  static defaultProps = {
    height: 150,
  };

  constructor(props: EuiMarkdownEditorProps) {
    super(props);

    this.state = {
      editorContent: this.props.initialValue!,
      viewMarkdownPreview: false,
      files: null,
    };

    // If an ID wasn't provided, just generate a rando
    this.editorId =
      this.props.editorId ||
      Math.random()
        .toString(35)
        .substring(2, 10);
    this.markdownActions = new MarkdownActions(this.editorId);

    this.handleMdButtonClick = this.handleMdButtonClick.bind(this);
  }

  handleMdButtonClick = (mdButtonId: string) => {
    this.markdownActions.do(mdButtonId);
  };

  onClickPreview = () => {
    this.setState({ viewMarkdownPreview: !this.state.viewMarkdownPreview });
  };

  onAttachFiles = (files: FileList | null) => {
    console.log('List of attached files -->', files);
    this.setState({
      files: files,
    });
  };

  render() {
    const { className, editorId, initialValue, height, ...rest } = this.props;

    const { viewMarkdownPreview } = this.state;

    const classes = classNames('euiMarkdownEditor', className);

    return (
      <div className={classes} {...rest}>
        <EuiMarkdownEditorToolbar
          markdownActions={this.markdownActions}
          onClickPreview={this.onClickPreview}
          viewMarkdownPreview={viewMarkdownPreview}
        />

        {this.state.viewMarkdownPreview ? (
          <div
            className="euiMarkdownEditor__previewContainer"
            style={{ height: `${height}px` }}>
            <EuiMarkdownFormat>{this.state.editorContent}</EuiMarkdownFormat>
          </div>
        ) : (
          <EuiMarkdownEditorDropZone>
            <EuiMarkdownEditorTextArea
              height={height}
              id={this.editorId}
              onChange={(e: any) => {
                this.setState({ editorContent: e.target.value });
              }}
              value={this.state.editorContent}
            />
          </EuiMarkdownEditorDropZone>
        )}
      </div>
    );
  }
}
