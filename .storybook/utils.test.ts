/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import * as utils from './utils';

const {
  hideStorybookControls,
  disableStorybookControls,
  moveStorybookControlsToCategory,
  enableFunctionToggleControls,
} = utils;

describe('hideStorybookControls', () => {
  it('updates the provided config with the expected `argTypes` object when passed prop name strings', () => {
    expect(
      hideStorybookControls({ argTypes: {} }, [
        'isDisabled',
        'isLoading',
        'isInvalid',
      ])
    ).toEqual({
      argTypes: {
        isDisabled: { table: { disable: true } },
        isLoading: { table: { disable: true } },
        isInvalid: { table: { disable: true } },
      },
    });
  });

  it('merges existing and new `argTypes` objects correctly', () => {
    expect(
      hideStorybookControls(
        {
          argTypes: {
            isDisabled: {
              control: { type: 'boolean' },
              table: { category: 'Additional' },
            },
          },
        },
        ['isDisabled']
      )
    ).toEqual({
      argTypes: {
        isDisabled: {
          control: { type: 'boolean' },
          table: { category: 'Additional', disable: true },
        },
      },
    });
  });

  it('throws a typescript error if a generic is passed and the prop names do not match', () => {
    type TestComponentProps = { hello: boolean; world: boolean };

    // No typescript error
    hideStorybookControls<TestComponentProps>({ argTypes: {} }, [
      'hello',
      'world',
    ]);
    hideStorybookControls<TestComponentProps>({ argTypes: {} }, [
      'hello',
      'world',
      // @ts-expect-error  - will fail `yarn lint` if a TS error is *not* produced
      'error',
    ]);
  });
});

describe('disableStorybookControls', () => {
  it('updates the provided config with the expected `argTypes` object when passed prop name strings', () => {
    expect(
      disableStorybookControls({ argTypes: {} }, [
        'isDisabled',
        'isLoading',
        'isInvalid',
      ])
    ).toEqual({
      argTypes: {
        isDisabled: { control: false },
        isLoading: { control: false },
        isInvalid: { control: false },
      },
    });
  });

  it('merges existing and new `argTypes` objects correctly', () => {
    expect(
      disableStorybookControls(
        {
          argTypes: {
            isDisabled: {
              control: { type: 'boolean' },
              table: { category: 'Additional' },
            },
          },
        },
        ['isDisabled']
      )
    ).toEqual({
      argTypes: {
        isDisabled: {
          table: { category: 'Additional' },
          control: false,
        },
      },
    });
  });

  it('throws a typescript error if a generic is passed and the prop names do not match', () => {
    type TestComponentProps = { hello: boolean; world: boolean };

    // No typescript error
    disableStorybookControls<TestComponentProps>({ argTypes: {} }, [
      'hello',
      'world',
    ]);
    disableStorybookControls<TestComponentProps>({ argTypes: {} }, [
      'hello',
      'world',
      // @ts-expect-error - will fail `yarn lint` if a TS error is *not* produced
      'error',
    ]);
  });
});

describe('moveStorybookControlsToCategory', () => {
  it('updates the provided config with the expected `argTypes` object when passed prop name strings and a custom category', () => {
    expect(
      moveStorybookControlsToCategory(
        { argTypes: {} },
        ['isDisabled', 'isLoading', 'isInvalid'],
        'New category'
      )
    ).toEqual({
      argTypes: {
        isDisabled: { table: { category: 'New category' } },
        isLoading: { table: { category: 'New category' } },
        isInvalid: { table: { category: 'New category' } },
      },
    });
  });

  it('sets a default category if none is passed', () => {
    expect(
      moveStorybookControlsToCategory({ argTypes: {} }, [
        'isDisabled',
        'isLoading',
        'isInvalid',
      ])
    ).toEqual({
      argTypes: {
        isDisabled: { table: { category: 'Additional' } },
        isLoading: { table: { category: 'Additional' } },
        isInvalid: { table: { category: 'Additional' } },
      },
    });
  });

  it('merges existing and new `argTypes` objects correctly', () => {
    expect(
      moveStorybookControlsToCategory(
        {
          argTypes: {
            isDisabled: {
              control: { type: 'boolean' },
              table: { disable: true },
            },
          },
        },
        ['isDisabled']
      )
    ).toEqual({
      argTypes: {
        isDisabled: {
          control: { type: 'boolean' },
          table: { disable: true, category: 'Additional' },
        },
      },
    });
  });

  it('throws a typescript error if a generic is passed and the prop names do not match', () => {
    type TestProps = { hello: boolean; world: boolean };

    // No typescript error
    moveStorybookControlsToCategory<TestProps>({ argTypes: {} }, [
      'hello',
      'world',
    ]);
    moveStorybookControlsToCategory<TestProps>({ argTypes: {} }, [
      'hello',
      'world',
      // @ts-expect-error - will fail `yarn lint` if a TS error is *not* produced
      'error',
    ]);
  });
});

describe('enableFunctionToggleControls', () => {
  it('updates the provided config with the expected `argTypes` object when passed function prop name strings', () => {
    expect(enableFunctionToggleControls({ argTypes: {} }, ['onClick'])).toEqual(
      {
        args: {
          onClick: true,
        },
        argTypes: {
          onClick: {
            control: 'boolean',
            mapping: { false: undefined, true: expect.any(Function) },
          },
        },
        parameters: { actions: { argTypesRegex: null } },
      }
    );
  });

  it('merges existing and new `argTypes` objects correctly', () => {
    type TestProps = { hello: boolean; onHello: () => {} };

    expect(
      enableFunctionToggleControls<TestProps>(
        {
          args: { hello: true },
          argTypes: {
            isDisabled: { control: { type: 'boolean' } },
          },
        },
        ['onHello']
      )
    ).toEqual({
      args: {
        hello: true,
        onHello: true,
      },
      argTypes: {
        isDisabled: { control: { type: 'boolean' } },
        onHello: {
          control: 'boolean',
          mapping: { false: undefined, true: expect.any(Function) },
        },
      },
      parameters: { actions: { argTypesRegex: null } },
    });
  });

  it('throws a typescript error if a generic is passed and the prop names do not match', () => {
    type TestProps = { hello: boolean; onHello: () => {} };

    // No typescript error
    enableFunctionToggleControls<TestProps>({ argTypes: {} }, [
      'hello',
      'onHello',
    ]);
    enableFunctionToggleControls<TestProps>({ argTypes: {} }, [
      'hello',
      'onHello',
      // @ts-expect-error - will fail `yarn lint` if a TS error is *not* produced
      'error',
    ]);
  });
});
