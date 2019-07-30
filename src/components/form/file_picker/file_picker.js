import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiValidatableControl } from '../validatable_control';
import { EuiButtonEmpty } from '../../button';
import { EuiProgress } from '../../progress';
import { EuiIcon } from '../../icon';
import { EuiI18n } from '../../i18n';
import { EuiLoadingSpinner } from '../../loading';

const displayToClassNameMap = {
  default: null,
  large: 'euiFilePicker--large',
};

export const DISPLAYS = Object.keys(displayToClassNameMap);

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
    /**
     * Size or type of display;
     * `default` for normal height, similar to other controls;
     * `large` for taller size
     */
    display: PropTypes.oneOf(DISPLAYS),
    fullWidth: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    initialPromptText: 'Select or drag and drop a file',
    compressed: false,
    display: 'large',
  };

  constructor(props) {
    super(props);
    this.state = {
      promptText: null,
      isHoveringDrop: false,
    };
  }

  handleChange = filesSelected => {
    if (this.fileInput.files && this.fileInput.files.length > 1) {
      this.setState({
        promptText: `${this.fileInput.files.length} ${filesSelected}`,
      });
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
        tokens={[
          'euiFilePicker.clearSelectedFiles',
          'euiFilePicker.filesSelected',
        ]}
        defaults={['Clear selected files', 'files selected']}>
        {([clearSelectedFiles, filesSelected]) => {
          const {
            id,
            name,
            initialPromptText,
            className,
            disabled,
            compressed,
            onChange,
            isInvalid,
            fullWidth,
            isLoading,
            display,
            ...rest
          } = this.props;

          const isOverridingInitialPrompt = this.state.promptText != null;

          const normalFormControl = display === 'default';

          const classes = classNames(
            'euiFilePicker',
            displayToClassNameMap[display],
            {
              euiFilePicker__showDrop: this.state.isHoveringDrop,
              'euiFilePicker--compressed': compressed,
              'euiFilePicker--fullWidth': fullWidth,
              'euiFilePicker-isInvalid': isInvalid,
              'euiFilePicker-isLoading': isLoading,
              'euiFilePicker-hasFiles': isOverridingInitialPrompt,
            },
            className
          );

          let clearButton;
          if (isLoading && normalFormControl) {
            // Override clear button with loading spinner if it is in loading state
            clearButton = (
              <EuiLoadingSpinner className="euiFilePicker__loadingSpinner" />
            );
          } else if (isOverridingInitialPrompt) {
            if (normalFormControl) {
              clearButton = (
                <button
                  type="button"
                  aria-label={clearSelectedFiles}
                  className="euiFilePicker__clearButton"
                  onClick={this.removeFiles}>
                  <EuiIcon className="euiFilePicker__clearIcon" type="cross" />
                </button>
              );
            } else {
              clearButton = (
                <EuiButtonEmpty
                  aria-label={clearSelectedFiles}
                  className="euiFilePicker__clearButton"
                  size="xs"
                  onClick={this.removeFiles}>
                  Remove
                </EuiButtonEmpty>
              );
            }
          } else {
            clearButton = null;
          }

          const loader = !normalFormControl && isLoading && (
            <EuiProgress size="xs" color="accent" position="absolute" />
          );

          return (
            <div className={classes}>
              <div className="euiFilePicker__wrap">
                <EuiValidatableControl isInvalid={isInvalid}>
                  <input
                    type="file"
                    id={id}
                    name={name}
                    className="euiFilePicker__input"
                    onChange={() => this.handleChange(filesSelected)}
                    ref={input => {
                      this.fileInput = input;
                    }}
                    onDragOver={this.showDrop}
                    onDragLeave={this.hideDrop}
                    onDrop={this.hideDrop}
                    disabled={disabled}
                    {...rest}
                  />
                </EuiValidatableControl>
                <div className="euiFilePicker__prompt">
                  <EuiIcon
                    className="euiFilePicker__icon"
                    type="importAction"
                    size={normalFormControl ? 'm' : 'l'}
                    aria-hidden="true"
                  />
                  <div className="euiFilePicker__promptText">
                    {this.state.promptText || initialPromptText}
                  </div>
                  {clearButton}
                  {loader}
                </div>
              </div>
            </div>
          );
        }}
      </EuiI18n>
    );
  }
}
