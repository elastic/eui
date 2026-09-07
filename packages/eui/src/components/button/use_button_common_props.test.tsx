/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook } from '../../test/rtl';

import { EuiButtonContext, EuiButtonResetProvider } from './button_context';
import { useEuiButtonCommonProps } from './use_button_common_props';

const defaultInput = {
  size: 'm' as const,
  color: 'primary' as const,
};

describe('useEuiButtonCommonProps', () => {
  describe('with no context', () => {
    it('returns local prop values', () => {
      const { result } = renderHook(() =>
        useEuiButtonCommonProps({ ...defaultInput, fullWidth: true })
      );

      expect(result.current.size).toBe('m');
      expect(result.current.color).toBe('primary');
      expect(result.current.fullWidth).toBe(true);
      expect(result.current.isDisabled).toBe(false);
    });

    it('resolves isDisabled from isDisabled prop', () => {
      const { result } = renderHook(() =>
        useEuiButtonCommonProps({ ...defaultInput, isDisabled: true })
      );

      expect(result.current.isDisabled).toBe(true);
    });

    it('resolves isDisabled from native disabled prop', () => {
      const { result } = renderHook(() =>
        useEuiButtonCommonProps({ ...defaultInput, disabled: true })
      );

      expect(result.current.isDisabled).toBe(true);
    });

    it('resolves isDisabled from isLoading', () => {
      const { result } = renderHook(() =>
        useEuiButtonCommonProps({ ...defaultInput, isLoading: true })
      );

      expect(result.current.isDisabled).toBe(true);
    });
  });

  describe('with EuiButtonContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <EuiButtonContext.Provider
        value={{
          size: 's',
          color: 'success',
          fullWidth: false,
          isDisabled: true,
        }}
      >
        {children}
      </EuiButtonContext.Provider>
    );

    it('context values override local props', () => {
      const { result } = renderHook(
        () =>
          useEuiButtonCommonProps({
            size: 'm',
            color: 'primary',
            fullWidth: true,
          }),
        { wrapper }
      );

      expect(result.current.size).toBe('s');
      expect(result.current.color).toBe('success');
      expect(result.current.fullWidth).toBe(false);
    });

    it('context isDisabled ORs with local isDisabled', () => {
      const { result } = renderHook(
        () => useEuiButtonCommonProps({ ...defaultInput }),
        { wrapper }
      );

      expect(result.current.isDisabled).toBe(true);
    });

    it('local isDisabled can independently disable the button', () => {
      const enabledWrapper = ({ children }: { children: React.ReactNode }) => (
        <EuiButtonContext.Provider value={{ size: 's', color: 'success' }}>
          {children}
        </EuiButtonContext.Provider>
      );

      const { result } = renderHook(
        () => useEuiButtonCommonProps({ ...defaultInput, isDisabled: true }),
        { wrapper: enabledWrapper }
      );

      expect(result.current.isDisabled).toBe(true);
    });

    it('context does not override local props when context key is absent', () => {
      const partialWrapper = ({ children }: { children: React.ReactNode }) => (
        <EuiButtonContext.Provider value={{ size: 's' }}>
          {children}
        </EuiButtonContext.Provider>
      );

      const { result } = renderHook(
        () =>
          useEuiButtonCommonProps({
            ...defaultInput,
            color: 'danger',
            fullWidth: true,
          }),
        { wrapper: partialWrapper }
      );

      expect(result.current.size).toBe('s');
      expect(result.current.color).toBe('danger');
      expect(result.current.fullWidth).toBe(true);
    });
  });

  describe('with EuiButtonResetProvider', () => {
    const outerWrapper = ({ children }: { children: React.ReactNode }) => (
      <EuiButtonContext.Provider
        value={{
          size: 's',
          color: 'success',
          fullWidth: false,
          isDisabled: true,
        }}
      >
        <EuiButtonResetProvider>{children}</EuiButtonResetProvider>
      </EuiButtonContext.Provider>
    );

    it('resets inherited context so local props take effect', () => {
      const { result } = renderHook(
        () =>
          useEuiButtonCommonProps({
            size: 'm',
            color: 'primary',
            fullWidth: true,
          }),
        { wrapper: outerWrapper }
      );

      expect(result.current.size).toBe('m');
      expect(result.current.color).toBe('primary');
      expect(result.current.fullWidth).toBe(true);
      expect(result.current.isDisabled).toBe(false);
    });
  });
});
