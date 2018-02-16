import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonEmpty } from '../../button';
import { EuiIcon } from '../../icon';

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
  };

  static defaultProps = {
    initialPromptText: 'Select or drag and drop a file',
  };

  constructor(props) {
    super(props);
    this.state = {
      promptText: this.props.initialPromptText,
      isHoveringDrop: false,
    };
  }

  handleChange = () => {
    if (this.fileInput.files && this.fileInput.files.length > 1) {
      this.setState({ promptText: `${this.fileInput.files.length} files selected` });
    } else if (this.fileInput.files.length === 0) {
      this.setState({ promptText: this.props.initialPromptText });
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
    const {
      id,
      name,
      initialPromptText,
      className,
      disabled,
      onChange, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames(
      'euiFilePicker',
      {
        'euiFilePicker__showDrop': this.state.isHoveringDrop,
        'euiFilePicker-hasFiles': this.state.promptText !== initialPromptText,
      },
      className
    );

    let clearButton;
    if (this.state.promptText !== initialPromptText) {
      clearButton = (
        <EuiButtonEmpty
          aria-label="Clear selected files"
          className="euiFilePicker__clearButton"
          size="xs"
          onClick={this.removeFiles}
        >
          Remove
        </EuiButtonEmpty>
      );
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
            onChange={this.handleChange}
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
              size="l"
              aria-hidden="true"
            />
            <div
              className="euiFilePicker__promptText"
            >
              {this.state.promptText}
            </div>
            {clearButton}
          </div>
        </div>
      </div>
    );
  }
}
