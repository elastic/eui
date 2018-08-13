import React from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../../services';
import { EuiToolTip } from '../tool_tip';

const UNCOPIED_MSG = 'Copy';
const COPIED_MSG = 'Copied';

export class EuiCopy extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tooltipText: UNCOPIED_MSG
    };
  }

  copy = () => {
    const isCopied = copyToClipboard(this.props.textToCopy);
    if (isCopied) {
      this.setState({
        tooltipText: COPIED_MSG,
      });
    }
  }

  resetTooltipText = () => {
    this.setState({
      tooltipText: UNCOPIED_MSG,
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
  children: PropTypes.func.isRequired,
};

