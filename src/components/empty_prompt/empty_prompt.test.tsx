/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiEmptyPrompt } from './empty_prompt';

describe('EuiEmptyPrompt', () => {
  test('is rendered', () => {
    const component = render(
      <EuiEmptyPrompt
        iconType="arrowUp"
        title={<h2>Title</h2>}
        body={<p>Body</p>}
        actions={<div>Actions</div>}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType', () => {
      test('renders alone', () => {
        const component = render(<EuiEmptyPrompt iconType="arrowUp" />);
        expect(component).toMatchSnapshot();
      });

      test('renders with iconColor', () => {
        const component = render(
          <EuiEmptyPrompt iconType="arrowUp" iconColor="danger" />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      test('renders alone', () => {
        const component = render(
          <EuiEmptyPrompt icon={<span>Custom icon</span>} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('title', () => {
      test('renders alone', () => {
        const component = render(<EuiEmptyPrompt title={<div>title</div>} />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('body', () => {
      test('renders alone', () => {
        const component = render(<EuiEmptyPrompt body="body" />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('actions', () => {
      test('renders alone', () => {
        const component = render(<EuiEmptyPrompt actions="actions" />);
        expect(component).toMatchSnapshot();
      });

      test('renders an array', () => {
        const component = render(
          <EuiEmptyPrompt actions={['action1', 'action2']} />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
