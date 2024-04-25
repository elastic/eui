/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { findElementBySelectorOrRef } from './findElement';

describe('findElementBySelectorOrRef', () => {
  const element = document.createElement('div');
  element.setAttribute('id', 'element');
  document.body.appendChild(element);

  describe('when passed `undefined`', () => {
    it('should return `null`', () => {
      expect(findElementBySelectorOrRef(undefined)).toBe(null);
    });
  });

  describe('when passed an element', () => {
    it('should return the element', () => {
      expect(findElementBySelectorOrRef(element)).toBe(element);
    });
  });

  describe('when passed a function', () => {
    it('should return the result of the function', () => {
      expect(findElementBySelectorOrRef(() => element)).toBe(element);
    });
  });

  describe('when passed a DOM selector', () => {
    it('should return the result of `querySelector` if found', () => {
      expect(findElementBySelectorOrRef('#element')).toBe(element);
    });

    it('should return `null` if not found', () => {
      expect(findElementBySelectorOrRef('#doesnotexist')).toBe(null);
    });
  });
});
