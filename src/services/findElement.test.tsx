/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { findElementBySelectorOrRef } from './findElement';

describe('findElementBySelectorOrRef', () => {
  describe('when passed `undefined`', () => {
    it('should return `null`', () => {
      expect(findElementBySelectorOrRef(undefined)).toBe(null);
    });
  });

  describe('when passed an element', () => {
    it('should return the element', () => {
      render(<div id="element" />);
      const element = document.querySelector('#id') as HTMLElement;
      expect(findElementBySelectorOrRef(element)).toBe(element);
    });
  });

  describe('when passed a function', () => {
    it('should return the result of the function', () => {
      render(<div id="element" />);
      const element = document.querySelector('#id') as HTMLElement;
      expect(findElementBySelectorOrRef(() => element)).toBe(element);
    });
  });

  describe('when passed a DOM selector', () => {
    it('should return the result of `querySelector`', () => {
      render(<div id="element" />);
      const element = document.querySelector('#id') as HTMLElement;
      expect(findElementBySelectorOrRef('#element')).toBe(element);
    });
  });
});
