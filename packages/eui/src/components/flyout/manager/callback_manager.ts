/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * CallbackManager coordinates the execution and unregistration of flyout callbacks
 * to prevent race conditions between callback execution and cleanup.
 */
class CallbackManager {
  private pendingExecutions = new Map<string, Promise<void>>();

  /**
   * Execute a callback with proper error handling and execution tracking
   */
  async executeCallback(
    flyoutId: string,
    callbackType: 'onClose' | 'onActive',
    callback: () => void
  ): Promise<void> {
    const key = `${flyoutId}-${callbackType}`;

    const execution = new Promise<void>((resolve) => {
      setTimeout(() => {
        try {
          callback();
        } catch (error) {
          console.error(
            `Error executing ${callbackType} callback for flyout ${flyoutId}:`,
            error
          );
        } finally {
          resolve();
        }
      }, 0);
    });

    this.pendingExecutions.set(key, execution);
    return execution;
  }

  /**
   * Unregister all callbacks for a flyout after ensuring all pending executions complete
   */
  async unregisterCallbacks(flyoutId: string): Promise<void> {
    // Wait for all pending executions to complete
    const executions = Array.from(this.pendingExecutions.entries())
      .filter(([key]) => key.startsWith(flyoutId))
      .map(([, promise]) => promise);

    await Promise.all(executions);

    // Clean up the pending executions
    Array.from(this.pendingExecutions.keys())
      .filter((key) => key.startsWith(flyoutId))
      .forEach((key) => this.pendingExecutions.delete(key));

    // Now safe to unregister - this will be handled by the caller
    // since we don't want to import the unregisterCallback function here
  }

  /**
   * Get the number of pending executions for a flyout (useful for testing)
   */
  getPendingExecutionCount(flyoutId: string): number {
    return Array.from(this.pendingExecutions.keys()).filter((key) =>
      key.startsWith(flyoutId)
    ).length;
  }

  /**
   * Clear all pending executions (useful for testing)
   */
  clearAllPendingExecutions(): void {
    this.pendingExecutions.clear();
  }
}

// Create a singleton instance
export const callbackManager = new CallbackManager();
