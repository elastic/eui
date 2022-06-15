/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { replaceEmotionPrefix } from './emotion-prefix';

describe('replaceEmotionPrefix', () => {
  it('matches EUI component Emotion classes', () => {
    expect(replaceEmotionPrefix('css-abc1234-euiComponent')).toBe(
      'emotion-euiComponent'
    );
  });
  it('matches EUI component Emotion classes with variants', () => {
    expect(replaceEmotionPrefix('css-abc1234-euiComponent-primary-m')).toBe(
      'emotion-euiComponent-primary-m'
    );
  });
  it('matches EUI component Emotion classes with descendents', () => {
    expect(replaceEmotionPrefix('css-abc1234-euiComponent__child')).toBe(
      'emotion-euiComponent__child'
    );
  });
  it('matches chained EUI component Emotion classes', () => {
    expect(
      replaceEmotionPrefix('css-abc1234-euiComponentStyles-EuiComponent')
    ).toBe('emotion-euiComponentStyles-EuiComponent');
  });
  it('matches EUI component Emotion classes with uppercase start', () => {
    expect(replaceEmotionPrefix('css-abc1234-EuiComponent')).toBe(
      'emotion-EuiComponent'
    );
  });
  it('does not match EUI Sass classes', () => {
    expect(replaceEmotionPrefix('euiMark')).toBe('euiMark');
    expect(replaceEmotionPrefix('euiButton--primary')).toBe(
      'euiButton--primary'
    );
  });
  it('does not match non-EUI classes', () => {
    expect(replaceEmotionPrefix('css-euiMark')).toBe('css-euiMark');
    expect(
      replaceEmotionPrefix('css-abc123-kibanaClassName-euiMockComponent')
    ).toBe('css-abc123-kibanaClassName-euiMockComponent');
    expect(replaceEmotionPrefix('kibanaClassName-euiMockComponent')).toBe(
      'kibanaClassName-euiMockComponent'
    );
  });
});
