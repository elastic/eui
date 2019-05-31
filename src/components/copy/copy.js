import React from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../../services';
import { EuiToolTip } from '../tool_tip';

export class EuiCopy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipText: this.props.beforeMessage,
    };
  }

  copy = () => {
    const isCopied = copyToClipboard(this.props.textToCopy);
    if (isCopied) {
      this.setState({
        tooltipText: this.props.afterMessage,
      });
    }
  };

  resetTooltipText = () => {
    this.setState({
      tooltipText: this.props.beforeMessage,
    });
  };

  render() {
    const {
      children,
      textToCopy,
      beforeMessage,
      afterMessage,
      ...rest
    } = this.props;

    return (
      <EuiToolTip
        content={this.state.tooltipText}
        onMouseOut={this.resetTooltipText}
        {...rest}>
        {children(this.copy)}
      </EuiToolTip>
    );
  }
}

EuiCopy.propTypes = {
  /**
   * Text that will be copied to clipboard when copy function is executed.
   */
  textToCopy: PropTypes.string.isRequired,

  /**
   * Tooltip message displayed before copy function is called.
   */
  beforeMessage: PropTypes.string,

  /**
   * Tooltip message displayed after copy function is called that lets the user know that
   * 'textToCopy' has been copied to the clipboard.
   */
  afterMessage: PropTypes.string.isRequired,

  /**
   * Function that must return a component. First argument is 'copy' function.
   * Use your own logic to create the component that users interact with when triggering copy.
   */
  children: PropTypes.func.isRequired,
};

EuiCopy.defaultProps = {
  afterMessage: 'Copied',
};
