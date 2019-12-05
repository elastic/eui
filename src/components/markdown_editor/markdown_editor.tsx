import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import MarkdownActions from './markdown_actions';

// @ts-ignore
import showdown from 'showdown';
// @ts-ignore
import showdownHtmlEscape from 'showdown-htmlescape';

import { EuiHideFor } from '../responsive';
import { EuiText } from '../text';
// @ts-ignore
import { EuiTextArea } from '../form/text_area';
import { EuiButtonGroup, EuiButtonEmpty } from '../button';
import { EuiFlexItem, EuiFlexGroup } from '../flex';
import { EuiI18n } from '../i18n';

export type EuiMarkdownEditorProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /** A unique ID to attach to the textarea. If one isn't provided, a random one
     * will be generated */
    editorID?: string;
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
  editorID: string;
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
    this.editorID =
      this.props.editorID ||
      Math.random()
        .toString(35)
        .substring(2, 10);
    this.markdownActions = new MarkdownActions(this.editorID);

    this.handleMdButtonClick = this.handleMdButtonClick.bind(this);
  }

  getBoldItalicButtons = () => [
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

  getQuoteCodeLinkButtons = () => [
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

  getListButtons = () => [
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

  handleMdButtonClick = (mdButtonId: string) => {
    this.markdownActions.do(mdButtonId);
  };

  render() {
    const { className, ...rest } = this.props;

    const classes = classNames('euiMarkdownEditor', className);

    return (
      <div className={classes} {...rest}>
        <EuiHideFor sizes={['xs', 's']}>
          <div className="euiMarkdownEditor__actionBar">
            <EuiFlexGroup
              justifyContent="spaceBetween"
              alignItems="center"
              className="euiMarkdownEditor__actionBarItems">
              <EuiFlexItem grow={false}>
                <EuiI18n
                  token="euiMarkdownEditor.boldStyles"
                  default="Bold and italic styles">
                  {(legend: string) => (
                    <EuiButtonGroup
                      isDisabled={
                        this.state.viewMarkdownPreview ? true : undefined
                      }
                      legend={legend}
                      options={this.getBoldItalicButtons()}
                      idToSelectedMap={{}}
                      onChange={this.handleMdButtonClick}
                      type="multi"
                      isIconOnly
                    />
                  )}
                </EuiI18n>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiI18n
                  token="euiMarkdownEditor.quoteStyles"
                  default="Quote, code and link styles">
                  {(legend: string) => (
                    <EuiButtonGroup
                      isDisabled={
                        this.state.viewMarkdownPreview ? true : undefined
                      }
                      legend={legend}
                      options={this.getQuoteCodeLinkButtons()}
                      idToSelectedMap={{}}
                      onChange={this.handleMdButtonClick}
                      type="multi"
                      isIconOnly
                    />
                  )}
                </EuiI18n>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiI18n
                  token="euiMarkdownEditor.listStyles"
                  default="Unordered and ordered list styles">
                  {(legend: string) => (
                    <EuiButtonGroup
                      isDisabled={
                        this.state.viewMarkdownPreview ? true : undefined
                      }
                      legend={legend}
                      options={this.getListButtons()}
                      idToSelectedMap={{}}
                      onChange={this.handleMdButtonClick}
                      type="multi"
                      isIconOnly
                    />
                  )}
                </EuiI18n>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  className="euiMarkdownEditor__previewToggleButton"
                  size="xs"
                  onClick={() => {
                    this.setState({
                      viewMarkdownPreview: !this.state.viewMarkdownPreview,
                    });
                  }}>
                  {this.state.viewMarkdownPreview ? (
                    <EuiI18n token="euiMarkdownEditor.edit" default="Edit" />
                  ) : (
                    <EuiI18n
                      token="euiMarkdownEditor.previewMarkdown"
                      default="Preview markdown"
                    />
                  )}
                </EuiButtonEmpty>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </EuiHideFor>
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
          <div>
            <EuiTextArea
              id={this.editorID}
              fullWidth
              onChange={(e: any) => {
                this.setState({ editorContent: e.target.value });
              }}
              value={this.state.editorContent}
            />
          </div>
        )}
      </div>
    );
  }
}
