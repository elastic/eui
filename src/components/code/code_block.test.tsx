/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { mount, render, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { requiredProps } from '../../test/required_props';

import { EuiCodeBlock, FONT_SIZES, PADDING_SIZES } from './code_block';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlock', () => {
  it('renders a code block', () => {
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
        const component = render(
          <EuiCodeBlock isCopyable>{code}</EuiCodeBlock>
        );

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

    describe('whiteSpace', () => {
      it('renders a pre block tag with a css class modifier', () => {
        const component = render(
          <EuiCodeBlock whiteSpace="pre" {...requiredProps}>
            {code}
          </EuiCodeBlock>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('dynamic content', () => {
    it('updates DOM when input changes', (done) => {
      expect.assertions(2);

      function takeSnapshot() {
        const snapshot = render(
          <div dangerouslySetInnerHTML={{ __html: appDiv.innerHTML }} />
        );
        expect(snapshot).toMatchSnapshot();
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
          <EuiCodeBlock language="javascript">
            const value = &apos;{value}&apos;
          </EuiCodeBlock>
        );
      }

      ReactDOM.render(<App />, appDiv);
    });
  });

  describe('fullscreen', () => {
    it('displays content in fullscreen mode', () => {
      const component = mount(
        <EuiCodeBlock
          {...requiredProps}
          language="javascript"
          overflowHeight={300}
        >
          const value = &quot;hello&quot;
        </EuiCodeBlock>
      );
      component.find('button[aria-label="Expand"]').simulate('click');
      component.update();
      expect(
        component.find('div.euiCodeBlockFullScreen').render()
      ).toMatchSnapshot();
    });

    it('closes fullscreen mode when the escape key is pressed', () => {
      const component = mount(
        <EuiCodeBlock
          {...requiredProps}
          language="javascript"
          overflowHeight={300}
        >
          const value = &quot;world&quot;
        </EuiCodeBlock>
      );
      component.find('button[aria-label="Expand"]').simulate('click');
      component.update();
      component
        .find('div.euiCodeBlockFullScreen')
        .find('pre.euiCodeBlock__pre')
        .simulate('keyDown', { key: 'Escape' });
      expect(component.find('.euiCodeBlockFullScreen')).toHaveLength(0);
    });
  });

  describe('virtualization', () => {
    it('renders a virtualized code block', () => {
      const component = render(
        <EuiCodeBlock
          isVirtualized={true}
          overflowHeight="50%"
          {...requiredProps}
        >
          {code}
        </EuiCodeBlock>
      );
      expect(component).toMatchSnapshot();
    });

    it('correctly copies virtualized text', () => {
      const component = render(
        <EuiCodeBlock
          isCopyable
          isVirtualized={true}
          overflowHeight="50%"
          {...requiredProps}
        >
          {code}
        </EuiCodeBlock>
      );
      expect(component.find('.euiCodeBlock__copyButton')).toHaveLength(1);
    });

    describe('type checks', () => {
      it('requires overflowHeight', () => {
        // @ts-expect-error should expect overflowHeight
        shallow(<EuiCodeBlock isVirtualized overflowHeight={undefined} />);
      });

      it('only allows whiteSpace of pre', () => {
        shallow(
          // @ts-expect-error should only accept "pre"
          <EuiCodeBlock
            isVirtualized
            overflowHeight={50}
            whiteSpace="pre-wrap"
          />
        );
        // OK
        shallow(
          <EuiCodeBlock isVirtualized overflowHeight={50} whiteSpace="pre" />
        );
      });
    });
  });

  describe('line numbers', () => {
    it('renders line numbers', () => {
      const component = render(
        <EuiCodeBlock lineNumbers {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );
      expect(component).toMatchSnapshot();
    });

    it('renders line numbers with a start value', () => {
      const component = render(
        <EuiCodeBlock lineNumbers={{ start: 10 }} {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );
      expect(component).toMatchSnapshot();
    });

    it('renders highlighted line numbers', () => {
      const component = render(
        <EuiCodeBlock lineNumbers={{ highlight: '1' }} {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );
      expect(component).toMatchSnapshot();
    });

    it('renders annotated line numbers', () => {
      const component = render(
        <EuiCodeBlock
          lineNumbers={{ annotations: { 1: 'hello world' } }}
          {...requiredProps}
        >
          {code}
        </EuiCodeBlock>
      );
      expect(component).toMatchSnapshot();
    });
  });
});
