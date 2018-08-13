import React from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../../services';
import { EuiToolTip } from '../tool_tip';

export class EuiCopy extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tooltipText: this.props.beforeCopyMsg
    };
  }

  copy = () => {
    const isCopied = copyToClipboard(this.props.textToCopy);
    if (isCopied) {
      this.setState({
        tooltipText: this.props.afterCopyMsg,
      });
    }
  }

  resetTooltipText = () => {
    this.setState({
      tooltipText: this.props.beforeCopyMsg,
    });
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <EuiToolTip
        content={this.state.tooltipText}
        onMouseOut={this.resetTooltipText}
      >
        {children(this.copy)}
      </EuiToolTip>
    );
  }
}

EuiCopy.propTypes = {
  textToCopy: PropTypes.string.isRequired,
  beforeCopyMsg: PropTypes.string,
  afterCopyMsg: PropTypes.string,
  children: PropTypes.func.isRequired,
};

EuiCopy.defaultProps = {
  beforeCopyMsg: 'Copy',
  afterCopyMsg: 'Copied',
};

