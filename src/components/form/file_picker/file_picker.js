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
    initialButtonText: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    initialButtonText: 'Select or drag and drop a file',
  };

  constructor(props) {
    super(props);
    this.state = {
      buttonText: this.props.initialButtonText,
      isHoveringDrop: false,
    };
  }

  handleChange = () => {
    if (this.fileInput.files && this.fileInput.files.length > 1) {
      this.setState({ buttonText: `${this.fileInput.files.length} files selected` });
    } else if (this.fileInput.files.length === 0) {
      this.setState({ buttonText: this.props.initialButtonText });
    } else {
      this.setState({ buttonText: `Selected file ${this.fileInput.value.split('\\').pop()}` });
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
    this.setState({ isHoveringDrop: true });
  };

  hideDrop = () => {
    this.setState({ isHoveringDrop: false });
  };

  render() {
    const {
      id,
      name,
      initialButtonText,
      className,
      onChange, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames(
      'euiFilePicker',
      {
        'euiFilePicker__showDrop': this.state.isHoveringDrop,
        'euiFilePicker-hasFiles': this.state.buttonText !== initialButtonText,
      },
      className
    );

    let clearButton;
    if (this.state.buttonText !== initialButtonText) {
      // The clear button needs its own aria-label, otherwise the enclosing label is read
      // by the screen reader.
      clearButton = (
        <EuiButtonEmpty
          aria-label="Clear selected files"
          className="euiFilePicker__clearButton"
          size="s"
          onClick={this.removeFiles}
        >
          Clear
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
            {...rest}
          />
          <div className="euiFilePicker__prompt">
            <EuiIcon
              className="euiFilePicker__icon"
              type="importAction"
              size="l"
              aria-hidden="true"
            />
            <label
              className="euiFilePicker__label"
              htmlFor={id}
            >
              {this.state.buttonText}
            </label>
            {clearButton}
          </div>
        </div>
      </div>
    );
  }
}
