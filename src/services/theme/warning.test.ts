/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  setEuiDevProviderWarning,
  getEuiDevProviderWarning,
  emitEuiProviderWarning,
} from './warning';

describe('EUI provider dev warnings', () => {
  const defaultWarningLevel = getEuiDevProviderWarning();
  afterEach(() => {
    setEuiDevProviderWarning(defaultWarningLevel);
    jest.resetAllMocks();
  });

  describe('getting and setting the current dev warning level', () => {
    describe('getEuiDevProviderWarning', () => {
      it('defaults to undefined', () => {
        expect(getEuiDevProviderWarning()).toEqual(undefined);
      });
    });

    describe('setEuiDevProviderWarning', () => {
      it('allows configuring the global provider warning level', () => {
        setEuiDevProviderWarning('log');
        expect(getEuiDevProviderWarning()).toEqual('log');
      });
    });
  });

  describe('emitEuiProviderWarning', () => {
    // Silence logs and warnings from CLI output
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    afterAll(() => {
      consoleLogSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    const providerMessage = 'hello world';

    it('does nothing if the warning level is undefined', () => {
      emitEuiProviderWarning(providerMessage);

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('emits a console log when level is log', () => {
      setEuiDevProviderWarning('log');

      emitEuiProviderWarning(providerMessage);

      expect(consoleLogSpy).toHaveBeenCalledWith('hello world');
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('emits a console warning when level is warn', () => {
      setEuiDevProviderWarning('warn');

      emitEuiProviderWarning(providerMessage);

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith('hello world');
    });

    it('throws an error when level is error', () => {
      setEuiDevProviderWarning('error');

      expect(() => emitEuiProviderWarning(providerMessage)).toThrowError(
        'hello world'
      );

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });
});
