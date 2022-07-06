/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCommentList } from './comment_list';
import { shouldRenderCustomStyles } from '../../test/internal';
import { GUTTER_SIZES } from '../timeline/timeline';

const comments = [
  {
    username: 'janed',
  },
];

describe('EuiCommentList', () => {
  shouldRenderCustomStyles(
    <EuiCommentList comments={comments} {...requiredProps} />
  );

  test('is rendered', () => {
    const component = render(
      <EuiCommentList comments={comments} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('gutterSize', () => {
      GUTTER_SIZES.forEach((gutterSize) => {
        test(`${gutterSize} is rendered`, () => {
          const component = render(
            <EuiCommentList comments={comments} gutterSize={gutterSize} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
