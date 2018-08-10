import React from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../../../services';
import { EuiButton } from '../button';
import { EuiToolTip } from '../../tool_tip';

const UNCOPIED_MSG = 'Copy to clipboard';
const COPIED_MSG = 'Copied';

export class EuiButtonCopy extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tooltipText: UNCOPIED_MSG
    };
  }

  copySnippet = () => {
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
      textToCopy, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    return (
      <EuiToolTip
        content={this.state.tooltipText}
        onMouseOut={this.resetTooltipText}
      >
        <EuiButton
          onClick={this.copySnippet}
          {...rest}
        >
          {children}
        </EuiButton>
      </EuiToolTip>
    );
  }
}

EuiButtonCopy.propTypes = {
  textToCopy: PropTypes.string.isRequired,
};

