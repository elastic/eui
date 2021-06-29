/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCommentList } from './comment_list';

const comments = [
  {
    username: 'janed',
  },
];

describe('EuiCommentList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCommentList comments={comments} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
