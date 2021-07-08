/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCollapsibleNavGroup, BACKGROUNDS } from './collapsible_nav_group';

describe('EuiCollapsibleNavGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCollapsibleNavGroup id="id" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('title is rendered', () => {
      const component = render(
        <EuiCollapsibleNavGroup title="Title" id="id" />
      );

      expect(component).toMatchSnapshot();
    });

    test('iconType is rendered', () => {
      const component = render(
        <EuiCollapsibleNavGroup title="Title" iconType="bolt" id="id" />
      );

      expect(component).toMatchSnapshot();
    });

    test('iconSize is rendered', () => {
      const component = render(
        <EuiCollapsibleNavGroup
          title="Title"
          iconSize="s"
          iconType="bolt"
          id="id"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('iconProps renders data-test-subj', () => {
      const component = render(
        <EuiCollapsibleNavGroup
          title="Title"
          iconProps={{
            'data-test-subj': 'DTS',
          }}
          iconType="bolt"
          id="id"
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('background', () => {
      BACKGROUNDS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiCollapsibleNavGroup id="id" background={color} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    test('titleElement can change the rendered element to h2', () => {
      const component = render(
        <EuiCollapsibleNavGroup title="Title" titleElement="h2" id="id" />
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize can be larger', () => {
      const component = render(
        <EuiCollapsibleNavGroup id="id" titleSize="s" />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('when isCollapsible is true', () => {
    test('will render an accordion', () => {
      const component = render(
        <EuiCollapsibleNavGroup
          isCollapsible={true}
          initialIsOpen={false}
          title="Title"
          id="id"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('accepts accordion props', () => {
      const component = render(
        <EuiCollapsibleNavGroup
          isCollapsible={true}
          initialIsOpen={false}
          title="Title"
          id="id"
          {...requiredProps}
          buttonProps={requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
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
      const component = render(
        <EuiCollapsibleNavGroup iconType="bolt" id="id" />
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'not render an icon without `title`'
      );
      expect(component).toMatchSnapshot();
    });
  });
});
