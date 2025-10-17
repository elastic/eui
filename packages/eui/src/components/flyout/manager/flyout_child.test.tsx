/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, screen } from '../../../test/rtl';
import { EuiProvider } from '../../provider';
import { EuiFlyoutChild } from './flyout_child';
import { EuiFlyout } from '../flyout';

// Error boundary to catch validation errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: {
    children: React.ReactNode;
    onError?: (error: Error) => void;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

let consoleErrorSpy: jest.SpyInstance;

beforeAll(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  consoleErrorSpy.mockRestore();
});

describe('EuiFlyoutChild', () => {
  let originalNodeEnv: string | undefined;

  beforeAll(() => {
    originalNodeEnv = process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('Main flyout parent validation', () => {
    it('should throw an error in development when rendered without an EuiFlyoutMain parent', () => {
      process.env.NODE_ENV = 'development';

      let caughtError: Error | null = null;

      render(
        <ErrorBoundary
          onError={(error) => {
            caughtError = error;
          }}
        >
          <EuiProvider>
            <EuiFlyoutChild id="orphan-child" size="s" onClose={() => {}}>
              Orphan child content
            </EuiFlyoutChild>
          </EuiProvider>
        </ErrorBoundary>
      );

      expect(caughtError).toBeTruthy();
      expect(caughtError!.message).toContain(
        'EuiFlyoutChild must be used with an EuiFlyoutMain'
      );
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    });

    it('should log error and return null in production when rendered without an EuiFlyoutMain parent', () => {
      process.env.NODE_ENV = 'production';

      const { container } = render(
        <EuiProvider>
          <EuiFlyoutChild id="orphan-child" size="s" onClose={() => {}}>
            Orphan child content
          </EuiFlyoutChild>
        </EuiProvider>
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'EuiFlyoutChild validation failed:',
        'EuiFlyoutChild must be used with an EuiFlyoutMain. ' +
          'This usually means the main flyout was not rendered before the child flyout.'
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render normally when used with an EuiFlyoutMain parent', () => {
      const TestComponent = () => {
        const [isMainOpen] = React.useState(true);
        const [isChildOpen, setIsChildOpen] = React.useState(true);

        return (
          <EuiProvider>
            {isMainOpen && (
              <EuiFlyout
                id="main-flyout"
                session="start"
                aria-label="Main flyout"
                size="m"
                onClose={() => {}}
              >
                Main flyout content
                {isChildOpen && (
                  <EuiFlyoutChild
                    id="valid-child"
                    aria-label="Valid child flyout"
                    size="s"
                    onClose={() => setIsChildOpen(false)}
                  >
                    <div data-testid="child-flyout-content">
                      Valid child content
                    </div>
                  </EuiFlyoutChild>
                )}
              </EuiFlyout>
            )}
          </EuiProvider>
        );
      };

      render(<TestComponent />);

      expect(screen.getByTestId('child-flyout-content')).toBeInTheDocument();
    });
  });
});
