/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
      BACKGROUNDS.forEach(color => {
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
