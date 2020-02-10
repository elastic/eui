import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import MarkdownActions from './markdown_actions';

// @ts-ignore
import showdown from 'showdown';
// @ts-ignore
import showdownHtmlEscape from 'showdown-htmlescape';
import { EuiText } from '../text';
// @ts-ignore
import { EuiTextArea } from '../form/text_area';
// import { EuiI18n } from '../i18n';

import { EuiMarkdownEditorToolbar, EuiMarkdownEditorFilePicker } from './';

export type EuiMarkdownEditorProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /** A unique ID to attach to the textarea. If one isn't provided, a random one
     * will be generated */
    editorId?: string;
  };

export interface MarkdownEditorState {
  editorContent: string;
  viewMarkdownPreview: boolean;
}

export class EuiMarkdownEditor extends Component<
  EuiMarkdownEditorProps,
  MarkdownEditorState
> {
  converter: showdown.Converter;
  editorId: string;
  markdownActions: MarkdownActions;

  constructor(props: EuiMarkdownEditorProps) {
    super(props);

    // Instantiate Showdown (for converting markdown -> html) with options
    this.converter = new showdown.Converter({
      openLinksInNewWindow: true,
      ghMentions: false,
      backslashEscapesHTMLTags: true,
      extensions: [showdownHtmlEscape],
    });
    this.converter.setFlavor('github');

    this.state = {
      editorContent: '',
      viewMarkdownPreview: false,
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

  onTogglePreview = (e: any) => {
    this.setState({ viewMarkdownPreview: e.target.checked });
  };

  render() {
    const { className, editorId, ...rest } = this.props;

    const { viewMarkdownPreview } = this.state;

    const classes = classNames('euiMarkdownEditor', className);

    return (
      <div className={classes} {...rest}>
        <EuiMarkdownEditorToolbar
          markdownActions={this.markdownActions}
          onTogglePreview={this.onTogglePreview}
          viewMarkdownPreview={viewMarkdownPreview}
        />

        {this.state.viewMarkdownPreview ? (
          <div className="euiMarkdownEditor__markdownWrapper">
            <div className="euiMarkdownEditor__previewContainer">
              <EuiText
                className="euiMarkdownEditor__displayText"
                dangerouslySetInnerHTML={{
                  __html: this.converter.makeHtml(this.state.editorContent),
                }}
                size="s"
              />
            </div>
          </div>
        ) : (
          <div className="euiMarkdownEditor__markdownWrapper">
            <EuiTextArea
              id={this.editorId}
              className="euiMarkdownEditor__textArea"
              fullWidth
              compressed
              onChange={(e: any) => {
                this.setState({ editorContent: e.target.value });
              }}
              value={this.state.editorContent}
            />
            <EuiMarkdownEditorFilePicker />
          </div>
        )}
      </div>
    );
  }
}
