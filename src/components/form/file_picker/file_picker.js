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
    };

    this.handleChange = this.handleChange.bind(this);
    this.removeFiles = this.removeFiles.bind(this);
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
      className
    );

    let clearButton;
    if (this.state.buttonText !== initialButtonText) {
      clearButton = <EuiButtonEmpty onClick={this.removeFiles}>Clear</EuiButtonEmpty>;
    } else {
      clearButton = null;
    }

    return (
      <div
        className={classes}
      >
        <input
          type="file"
          id={id}
          name={name}
          className="euiFilePicker__input"
          onChange={this.handleChange}
          ref={(input) => { this.fileInput = input; }}
          {...rest}
        />
        <label htmlFor={id} className="euiFilePicker__label euiButton euiButton--primary">
          <span className="euiButton__content">
            <EuiIcon
              className="euiButton__icon"
              type="exportAction"
              size="m"
              aria-hidden="true"
            />
            <span>{this.state.buttonText}</span>
          </span>
        </label>
        {clearButton}
      </div>
    );
  }
}


EuiFilePicker.defaultProps = {
  initialButtonText: 'Choose a file',
};
