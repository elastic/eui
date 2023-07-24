/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';
import { EuiEmptyPrompt, PADDING_SIZES } from './empty_prompt';
import { COLORS } from '../panel/panel';

describe('EuiEmptyPrompt', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiEmptyPrompt
        iconType="arrowUp"
        title={<h2>Title</h2>}
        body={<p>Body</p>}
        actions={<div>Actions</div>}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType', () => {
      test('renders alone', () => {
        const { container } = render(<EuiEmptyPrompt iconType="arrowUp" />);
        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders with iconColor', () => {
        const { container } = render(
          <EuiEmptyPrompt iconType="arrowUp" iconColor="danger" />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      test('renders alone', () => {
        const { container } = render(
          <EuiEmptyPrompt icon={<span>Custom icon</span>} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('title', () => {
      test('renders alone', () => {
        const { container } = render(
          <EuiEmptyPrompt title={<div>title</div>} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('body', () => {
      test('renders alone', () => {
        const { container } = render(<EuiEmptyPrompt body="body" />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('actions', () => {
      test('renders alone', () => {
        const { container } = render(<EuiEmptyPrompt actions="actions" />);
        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders an array', () => {
        const { container } = render(
          <EuiEmptyPrompt actions={['action1', 'action2']} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('footer', () => {
      test('renders alone', () => {
        const { container } = render(<EuiEmptyPrompt footer="footer" />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('layout', () => {
      test('renders alone', () => {
        const { container } = render(<EuiEmptyPrompt layout="horizontal" />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { container } = render(<EuiEmptyPrompt paddingSize={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<EuiEmptyPrompt color={color} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('styles', () => {
      test('are rendered', () => {
        const { container } = render(
          <EuiEmptyPrompt
            style={{
              background: 'yellow',
              minWidth: '200px',
              maxWidth: '600px',
            }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
