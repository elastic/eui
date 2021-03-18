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

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { mount, render } from 'enzyme';
import html from 'html';
import { act } from 'react-dom/test-utils';
import { requiredProps } from '../../test/required_props';

import { EuiCodeBlock } from './code_block';
import { FONT_SIZES, PADDING_SIZES } from './_code_block';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlock', () => {
  test('renders a code block', () => {
    const component = render(
      <EuiCodeBlock {...requiredProps}>{code}</EuiCodeBlock>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('transparentBackground', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCodeBlock transparentBackground>{code}</EuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isCopyable', () => {
      it('is rendered', () => {
        const component = mount(<EuiCodeBlock isCopyable>{code}</EuiCodeBlock>);

        expect(component).toMatchSnapshot();
      });
    });

    describe('overflowHeight', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCodeBlock overflowHeight={200}>{code}</EuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('language', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCodeBlock language="html">{code}</EuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('fontSize', () => {
      FONT_SIZES.forEach((fontSize) => {
        test(`${fontSize} is rendered`, () => {
          const component = render(
            <EuiCodeBlock fontSize={fontSize}>{code}</EuiCodeBlock>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((paddingSize) => {
        test(`${paddingSize} is rendered`, () => {
          const component = render(
            <EuiCodeBlock paddingSize={paddingSize}>{code}</EuiCodeBlock>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('dynamic content', () => {
    it('updates DOM when input changes', (done) => {
      expect.assertions(2);

      function takeSnapshot() {
        expect(
          html.prettyPrint(appDiv.innerHTML, {
            indent_size: 2,
            unformatted: [], // Expand all tags, including spans
          })
        ).toMatchSnapshot();
      }

      // enzyme does not recreate enough of the React<->DOM interaction to reproduce this bug
      const appDiv = document.createElement('div');

      function App() {
        const [value, setValue] = useState('State 1');

        useEffect(() => {
          // Wait a tick for EuiCodeBlock internal state to update on render
          setTimeout(() => {
            takeSnapshot();
            act(() => {
              setValue('State 2');
            });
          });
        }, []);

        useEffect(() => {
          if (value === 'State 2') {
            takeSnapshot();
            done();
          }
        }, [value]);

        return (
          <div>
            <EuiCodeBlock language="javascript">
              const value = &apos;{value}&apos;
            </EuiCodeBlock>
          </div>
        );
      }

      ReactDOM.render(<App />, appDiv);
    });

    it('displays content in fullscreen mode', () => {
      const component = mount(
        <EuiCodeBlock language="javascript" overflowHeight={300}>
          const value = &quot;hello&quot;
        </EuiCodeBlock>
      );

      component.find('EuiButtonIcon[iconType="fullScreen"]').simulate('click');
      component.update();

      expect(component.find('.euiCodeBlock-isFullScreen').text()).toBe(
        'const value = "hello"'
      );
    });
  });
});
