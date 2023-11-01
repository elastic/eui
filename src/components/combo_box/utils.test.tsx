/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';

import { EuiComboBoxOptionAppendPrepend } from './utils';

describe('EuiComboBoxOptionAppendPrepend', () => {
  it('renders the option append/prepend content if they exist', () => {
    expect(
      render(
        <EuiComboBoxOptionAppendPrepend
          option={{ label: '', prepend: 'Hello' }}
          classNamePrefix="testA"
        >
          Hello world
        </EuiComboBoxOptionAppendPrepend>
      ).container
    ).toMatchInlineSnapshot(`
      <div>
        <span
          class="testA__prepend"
        >
          Hello
        </span>
        Hello world
      </div>
    `);

    expect(
      render(
        <EuiComboBoxOptionAppendPrepend
          option={{ label: '', append: 'world' }}
          classNamePrefix="testB"
        >
          Hello world
        </EuiComboBoxOptionAppendPrepend>
      ).container
    ).toMatchInlineSnapshot(`
      <div>
        Hello world
        <span
          class="testB__append"
        >
          world
        </span>
      </div>
    `);

    expect(
      render(
        <EuiComboBoxOptionAppendPrepend
          option={{ label: '', prepend: 'Hello', append: 'world' }}
          classNamePrefix="testC"
        >
          Hello world
        </EuiComboBoxOptionAppendPrepend>
      ).container
    ).toMatchInlineSnapshot(`
      <div>
        <span
          class="testC__prepend"
        >
          Hello
        </span>
        Hello world
        <span
          class="testC__append"
        >
          world
        </span>
      </div>
    `);
  });

  it('only renders children if no option exists', () => {
    const { container } = render(
      <EuiComboBoxOptionAppendPrepend>
        Hello world
      </EuiComboBoxOptionAppendPrepend>
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        Hello world
      </div>
    `);
  });
});
