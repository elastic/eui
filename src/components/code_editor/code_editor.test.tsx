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
import { mount, ReactWrapper } from 'enzyme';
import { EuiCodeEditor } from './code_editor';
import { keys } from '../../services';
import {
  findTestSubject,
  requiredProps,
  takeMountedSnapshot,
} from '../../test';

describe('EuiCodeEditor', () => {
  test('is rendered', () => {
    const component = mount(<EuiCodeEditor {...requiredProps} />);
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isReadOnly', () => {
      test('renders alternate hint text', () => {
        const component = mount(<EuiCodeEditor isReadOnly />);
        expect(takeMountedSnapshot(component)).toMatchSnapshot();
      });
    });

    describe('theme', () => {
      test('renders terminal theme', () => {
        const component = mount(<EuiCodeEditor theme="terminal" />);
        expect(takeMountedSnapshot(component)).toMatchSnapshot();
      });
    });

    describe('aria attributes', () => {
      test('allows setting aria-labelledby on textbox', () => {
        const component = mount(
          <EuiCodeEditor aria-labelledby="labelledbyid" />
        );
        expect(takeMountedSnapshot(component)).toMatchSnapshot();
      });

      test('allows setting aria-describedby on textbox', () => {
        const component = mount(
          <EuiCodeEditor aria-describedby="describedbyid" />
        );
        expect(takeMountedSnapshot(component)).toMatchSnapshot();
      });
    });
  });

  describe('behavior', () => {
    let component: ReactWrapper;

    beforeEach(() => {
      component = mount(<EuiCodeEditor />);
    });

    describe('hint element', () => {
      test('should be tabable', () => {
        const hint = findTestSubject(component, 'codeEditorHint').getDOMNode();
        expect(hint).toMatchSnapshot();
      });

      test('should be disabled when the ui ace box gains focus', () => {
        const hint = findTestSubject(component, 'codeEditorHint');
        hint.simulate('keyup', { key: keys.ENTER });
        expect(
          findTestSubject(component, 'codeEditorHint').getDOMNode()
        ).toMatchSnapshot();
      });

      test('should be enabled when the ui ace box loses focus', () => {
        const hint = findTestSubject(component, 'codeEditorHint');
        hint.simulate('keyup', { key: keys.ENTER });
        // @ts-ignore onBlurAce is known to exist and its params are only passed through to the onBlur callback
        component.instance().onBlurAce();
        expect(
          findTestSubject(component, 'codeEditorHint').getDOMNode()
        ).toMatchSnapshot();
      });
    });

    describe('interaction', () => {
      test('bluring the ace textbox should call a passed onBlur prop', () => {
        const blurSpy = jest.fn().mockName('blurSpy');
        const el = mount(<EuiCodeEditor onBlur={blurSpy} />);
        // @ts-ignore onBlurAce is known to exist and its params are only passed through to the onBlur callback
        el.instance().onBlurAce();
        expect(blurSpy).toHaveBeenCalled();
      });

      test('pressing escape in ace textbox will enable overlay', () => {
        // We cannot simulate the `commands` path, but this interaction still
        // serves as a fallback in cases where `commands` is unavailable.
        // @ts-ignore onFocusAce is known to exist
        component.instance().onFocusAce();
        // @ts-ignore onKeydownAce is known to exist and its params' values are unimportant
        component.instance().onKeydownAce({
          preventDefault: () => {},
          stopPropagation: () => {},
          key: keys.ESCAPE,
        });
        const hint = findTestSubject(component, 'codeEditorHint').getDOMNode();
        expect(hint).toBe(document.activeElement);
      });
    });
  });
});
