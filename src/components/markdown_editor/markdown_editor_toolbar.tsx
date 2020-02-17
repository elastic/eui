import React, { Component, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { EuiButtonToggle, EuiButtonIcon } from '../button';
import { EuiFlexItem, EuiFlexGroup } from '../flex';
import { EuiI18n } from '../i18n';

export type EuiMarkdownEditorToolbarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    markdownActions?: any;
    viewMarkdownPreview?: boolean;
    onTogglePreview?: any;
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
    const { viewMarkdownPreview, onTogglePreview } = this.props;

    return (
      <div className="euiMarkdownEditor__toolbar">
        <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
          <EuiFlexItem
            grow={false}
            className="euiMarkdownEditor__toolbar__buttons">
            {this.boldItalicButtons.map(item => (
              <EuiButtonIcon
                key={item.id}
                color="text"
                onClick={() => this.handleMdButtonClick(item.id)}
                iconType={item.iconType}
                aria-label={item.label}
                isDisabled={viewMarkdownPreview}
              />
            ))}
            <span className="euiMarkdownEditor__toolbar__divider" />
            {this.listButtons.map(item => (
              <EuiButtonIcon
                key={item.id}
                color="text"
                onClick={() => this.handleMdButtonClick(item.id)}
                iconType={item.iconType}
                aria-label={item.label}
                isDisabled={viewMarkdownPreview}
              />
            ))}
            <span className="euiMarkdownEditor__toolbar__divider" />
            {this.quoteCodeLinkButtons.map(item => (
              <EuiButtonIcon
                key={item.id}
                color="text"
                onClick={() => this.handleMdButtonClick(item.id)}
                iconType={item.iconType}
                aria-label={item.label}
                isDisabled={viewMarkdownPreview}
              />
            ))}
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButtonToggle
              color="text"
              size="s"
              label={
                viewMarkdownPreview ? (
                  <EuiI18n
                    token="euiMarkdownEditorToolbar.editor"
                    default="Editor"
                  />
                ) : (
                  <EuiI18n
                    token="euiMarkdownEditorToolbar.previewMarkdown"
                    default="Preview"
                  />
                )
              }
              iconType={viewMarkdownPreview ? 'editorCodeBlock' : 'eye'}
              onChange={onTogglePreview}
              isSelected={viewMarkdownPreview}
              isEmpty
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}
