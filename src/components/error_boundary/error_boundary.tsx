/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { useEuiMemoizedStyles } from '../../services';
import { EuiTitle } from '../title';
import { EuiCodeBlock } from '../code';
import { EuiI18n } from '../i18n';

import { euiErrorBoundaryStyles } from './error_boundary.styles';

interface EuiErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

export type EuiErrorBoundaryProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onError'> & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;

    /**
     * Callback that fires when an error is caught. Passes back the full error
     */
    onError?: (error: Error) => void;
  };

export class EuiErrorBoundary extends Component<
  EuiErrorBoundaryProps,
  EuiErrorBoundaryState
> {
  constructor(props: EuiErrorBoundaryProps) {
    super(props);

    const errorState: EuiErrorBoundaryState = {
      hasError: false,
      errorMessage: undefined,
    };

    this.state = errorState;
  }

  componentDidCatch(error: Error) {
    // Display fallback UI
    // Only Chrome includes the `message` property as part of `stack`.
    // For consistency, rebuild the full error text from the Error subparts.
    const { message, stack } = error;
    const idx = stack?.indexOf(message) || -1;
    const stackStr =
      idx > -1 ? stack?.substring(idx + message.length + 1) : stack;
    const errorMessage = `Error: ${message}
${stackStr}`;
    this.setState({
      hasError: true,
      errorMessage,
    });

    // Pass back the error to the consumer
    this.props.onError?.(error);
  }

  render() {
    const { children, ...rest } = this.props;
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return <EuiErrorMessage {...rest} errorMessage={errorMessage} />;
    }

    return children;
  }
}

/**
 * Split out into a separate styling-only component for easier use of hooks,
 * and also for internal re-use by EUI's docs/playgrounds
 */
export const EuiErrorMessage: FunctionComponent<
  CommonProps & { errorMessage?: string }
> = ({ errorMessage, className, 'data-test-subj': dataTestSubj, ...rest }) => {
  const styles = useEuiMemoizedStyles(euiErrorBoundaryStyles);

  return (
    <div
      css={styles.euiErrorBoundary}
      className={classNames('euiErrorBoundary', className)}
      data-test-subj={classNames('euiErrorBoundary', dataTestSubj)}
      {...rest}
    >
      <EuiCodeBlock>
        <EuiTitle size="xs">
          <p>
            <EuiI18n token="euiErrorBoundary.error" default="Error" />
          </p>
        </EuiTitle>
        {errorMessage}
      </EuiCodeBlock>
    </div>
  );
};
