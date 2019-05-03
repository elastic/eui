import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonEmpty } from '../../button';
import { EuiIcon } from '../../icon';
import { EuiI18n } from '../../i18n';

export class EuiFilePicker extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    /**
     * The content that appears in the dropzone if no file is attached
     */
    initialPromptText: PropTypes.node,
    /**
     * Use as a callback to access the HTML FileList API
     */
    onChange: PropTypes.func,
    /**
     * Reduces the size to a typical (compressed) input
     */
    compressed: PropTypes.bool,
  };

  static defaultProps = {
    initialPromptText: 'Select or drag and drop a file',
    compressed: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      promptText: null,
      isHoveringDrop: false,
    };
  }

  handleChange = (filesSelected) => {
    if (this.fileInput.files && this.fileInput.files.length > 1) {
      this.setState({ promptText: `${this.fileInput.files.length} ${filesSelected}` });
    } else if (this.fileInput.files.length === 0) {
      this.setState({ promptText: null });
    } else {
      this.setState({ promptText: this.fileInput.value.split('\\').pop() });
    }

    const { onChange } = this.props;

    if (onChange) {
      onChange(this.fileInput.files);
    }
  };

  removeFiles = e => {
    e.stopPropagation();
    e.preventDefault();
    this.fileInput.value = null;
    this.handleChange();
  };

  showDrop = () => {
    if (!this.props.disabled) {
      this.setState({ isHoveringDrop: true });
    }
  };

  hideDrop = () => {
    this.setState({ isHoveringDrop: false });
  };

  render() {
    return (
      <EuiI18n
        tokens={['euiFilePicker.clearSelectedFiles', 'euiFilePicker.filesSelected']}
        defaults={['Clear selected files', 'files selected']}
      >
        {([clearSelectedFiles, filesSelected]) => {
          const {
            id,
            name,
            initialPromptText,
            className,
            disabled,
            compressed,
            onChange, // eslint-disable-line no-unused-vars
            ...rest
          } = this.props;

          const isOverridingInitialPrompt = this.state.promptText != null;

          const classes = classNames(
            'euiFilePicker',
            {
              'euiFilePicker__showDrop': this.state.isHoveringDrop,
              'euiFilePicker--compressed': compressed,
              'euiFilePicker-hasFiles': isOverridingInitialPrompt,
            },
            className
          );

          let clearButton;
          if (isOverridingInitialPrompt) {
            if (compressed) {
              clearButton = (
                <button
                  type="button"
                  aria-label={clearSelectedFiles}
                  className="euiFilePicker__clearButton"
                  onClick={this.removeFiles}
                >
                  <EuiIcon
                    className="euiFilePicker__clearIcon"
                    type="cross"
                  />
                </button>
              );
            } else {
              clearButton = (
                <EuiButtonEmpty
                  aria-label={clearSelectedFiles}
                  className="euiFilePicker__clearButton"
                  size="xs"
                  onClick={this.removeFiles}
                >
                  Remove
                </EuiButtonEmpty>
              );
            }
          } else {
            clearButton = null;
          }

          return (
            <div
              className={classes}
            >
              <div className="euiFilePicker__wrap">
                <input
                  type="file"
                  id={id}
                  name={name}
                  className="euiFilePicker__input"
                  onChange={() => this.handleChange(filesSelected)}
                  ref={(input) => { this.fileInput = input; }}
                  onDragOver={this.showDrop}
                  onDragLeave={this.hideDrop}
                  onDrop={this.hideDrop}
                  disabled={disabled}
                  {...rest}
                />
                <div className="euiFilePicker__prompt">
                  <EuiIcon
                    className="euiFilePicker__icon"
                    type="importAction"
                    size={compressed ? 'm' : 'l'}
                    aria-hidden="true"
                  />
                  <div
                    className="euiFilePicker__promptText"
                  >
                    {this.state.promptText || initialPromptText}
                  </div>
                  {clearButton}
                </div>
              </div>
            </div>
          );
        }}
      </EuiI18n>
    );
  }
}
