import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EuiText } from '../text';

export class EuiErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  componentDidCatch(error) {
    // Display fallback UI
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    const { children, ...rest } = this.props;

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="euiErrorBoundary" {...rest}>
          <div className="euiErrorBoundary__text">
            <EuiText size="xs">
              <h1>Error</h1>
              <pre className="euiErrorBoundary__stack">
                <p>{this.state.error && this.state.error.stack}</p>
              </pre>
            </EuiText>
          </div>
        </div>
      );
    }

    return children;
  }
}
