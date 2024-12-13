/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiCollapsibleNavGroup, BACKGROUNDS } from './collapsible_nav_group';

describe('EuiCollapsibleNavGroup', () => {
  shouldRenderCustomStyles(
    <EuiCollapsibleNavGroup iconType="logoElastic" title="Test" />,
    { childProps: ['iconProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiCollapsibleNavGroup id="id" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('title is rendered', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup title="Title" id="id" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('iconType is rendered', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup title="Title" iconType="bolt" id="id" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('iconSize is rendered', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup
          title="Title"
          iconSize="s"
          iconType="bolt"
          id="id"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('iconProps renders data-test-subj', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup
          title="Title"
          iconProps={{
            'data-test-subj': 'DTS',
          }}
          iconType="bolt"
          id="id"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('background', () => {
      BACKGROUNDS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiCollapsibleNavGroup id="id" background={color} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    test('titleElement can change the rendered element to h2', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup title="Title" titleElement="h2" id="id" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('titleSize can be larger', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup id="id" titleSize="s" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when isCollapsible is true', () => {
    test('will render an accordion', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup
          isCollapsible={true}
          initialIsOpen={false}
          title="Title"
          id="id"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('accepts accordion props', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup
          isCollapsible={true}
          initialIsOpen={false}
          title="Title"
          id="id"
          {...requiredProps}
          buttonProps={requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('throws a warning', () => {
    const oldConsoleError = console.warn;
    let consoleStub: jest.Mock;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because EUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.
      console.warn = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.warn = oldConsoleError;
    });

    test('if iconType is passed without a title', () => {
      const { container } = render(
        <EuiCollapsibleNavGroup iconType="bolt" id="id" />
      );

      expect(consoleStub).toHaveBeenCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'not render an icon without `title`'
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
