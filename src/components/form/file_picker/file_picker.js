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
  }

  constructor(props) {
    super(props);
    this.state = {
      buttonText: this.props.initialButtonText,
      isHoveringDrop: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.removeFiles = this.removeFiles.bind(this);
    this.showDrop = this.showDrop.bind(this);
    this.hideDrop = this.hideDrop.bind(this);
  }

  handleChange() {
    // event.target
    if (this.fileInput.files && this.fileInput.files.length > 1) {
      this.setState({ buttonText: this.fileInput.files.length + ' files selected' });
    } else if (this.fileInput.files.length === 0) {
      this.setState({ buttonText: this.props.initialButtonText });
    } else {
      this.setState({ buttonText: this.fileInput.value.split('\\').pop() });
    }
  }

  removeFiles() {
    this.fileInput.value = null;
    this.handleChange();
  }

  showDrop() {
    this.setState({ isHoveringDrop: true });
  }

  hideDrop() {
    this.setState({ isHoveringDrop: false });
  }

  render() {

    const {
      id,
      name,
      initialButtonText,
      className,
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
      clearButton = <EuiButtonEmpty size="s" onClick={this.removeFiles}>Clear</EuiButtonEmpty>;
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
          <label htmlFor={id} className="euiFilePicker__label">
            <EuiIcon
              className="euiFilePicker__icon"
              type="importAction"
              size="l"
              aria-hidden="true"
            />
            <div className="euiFilePicker__text">{this.state.buttonText}</div>
          </label>
        </div>
        {clearButton}
      </div>
    );
  }
}


EuiFilePicker.defaultProps = {
  initialButtonText: 'Select or drag and drop a file',
};
