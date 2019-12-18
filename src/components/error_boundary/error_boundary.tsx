import React, { Component } from 'react';
import { CommonProps } from '../common';
import PropTypes from 'prop-types';

import { EuiText } from '../text';

interface Error {
  stack?: any;
}

interface ErrorState {
  hasError: boolean;
  error: Error | undefined;
}

export type EuiErrorBoundaryProps = ErrorState & CommonProps & {};

export class EuiErrorBoundary extends Component<{}, EuiErrorBoundaryProps> {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props: EuiErrorBoundaryProps) {
    super(props);

    const errorState: ErrorState = {
      hasError: false,
      error: undefined,
    };

    this.state = errorState;
  }

  componentDidCatch(error: Error) {
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
