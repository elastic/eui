/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { hideStorybookControls, disableStorybookControls } from './utils';

describe('hideStorybookControls', () => {
  it('outputs the expected `argTypes` object when passed prop name strings', () => {
    expect(
      hideStorybookControls(['isDisabled', 'isLoading', 'isInvalid'])
    ).toEqual({
      isDisabled: { table: { disable: true } },
      isLoading: { table: { disable: true } },
      isInvalid: { table: { disable: true } },
    });
  });

  it('throws a typescript error if a generic is passed and the prop names do not match', () => {
    type TestComponentProps = { hello: boolean; world: boolean };
    // No typescript error
    hideStorybookControls<TestComponentProps>(['hello', 'world']);
    // @ts-expect-error - will fail `yarn lint` if a TS error is *not* produced
    hideStorybookControls<TestComponentProps>(['hello', 'world', 'error']);
  });
});

describe('disableStorybookControls', () => {
  it('outputs the expected `argTypes` object when passed prop name strings', () => {
    expect(
      disableStorybookControls(['isDisabled', 'isLoading', 'isInvalid'])
    ).toEqual({
      isDisabled: { control: false },
      isLoading: { control: false },
      isInvalid: { control: false },
    });
  });

  it('throws a typescript error if a generic is passed and the prop names do not match', () => {
    type TestComponentProps = { hello: boolean; world: boolean };
    // No typescript error
    disableStorybookControls<TestComponentProps>(['hello', 'world']);
    // @ts-expect-error - will fail `yarn lint` if a TS error is *not* produced
    disableStorybookControls<TestComponentProps>(['hello', 'world', 'error']);
  });
});
