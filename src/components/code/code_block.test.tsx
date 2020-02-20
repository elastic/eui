import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper } from 'enzyme';
import html from 'html';
import { requiredProps } from '../../test/required_props';

import { EuiCodeBlock } from './code_block';
import { FONT_SIZES, PADDING_SIZES } from './_code_block';

function snapshotCodeBlock(component: ReactWrapper) {
  // Get the Portal's sibling and return its html
  const renderedHtml = component.find('Portal + *').html();
  const container = document.createElement('div');
  container.innerHTML = renderedHtml;
  return container.firstChild;
}

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlock', () => {
  test('renders a code block', () => {
    const component = mount(
      <EuiCodeBlock {...requiredProps}>{code}</EuiCodeBlock>
    );

    expect(snapshotCodeBlock(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('transparentBackground', () => {
      it('is rendered', () => {
        const component = mount(
          <EuiCodeBlock transparentBackground>{code}</EuiCodeBlock>
        );

        expect(snapshotCodeBlock(component)).toMatchSnapshot();
      });
    });

    describe('isCopyable', () => {
      it('is rendered', () => {
        const component = mount(<EuiCodeBlock isCopyable>{code}</EuiCodeBlock>);

        expect(snapshotCodeBlock(component)).toMatchSnapshot();
      });
    });

    describe('overflowHeight', () => {
      it('is rendered', () => {
        const component = mount(
          <EuiCodeBlock overflowHeight={200}>{code}</EuiCodeBlock>
        );

        expect(snapshotCodeBlock(component)).toMatchSnapshot();
      });
    });

    describe('language', () => {
      it('is rendered', () => {
        const component = mount(
          <EuiCodeBlock language="html">{code}</EuiCodeBlock>
        );

        expect(snapshotCodeBlock(component)).toMatchSnapshot();
      });
    });

    describe('fontSize', () => {
      FONT_SIZES.forEach(fontSize => {
        test(`${fontSize} is rendered`, () => {
          const component = mount(
            <EuiCodeBlock fontSize={fontSize}>{code}</EuiCodeBlock>
          );

          expect(snapshotCodeBlock(component)).toMatchSnapshot();
        });
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach(paddingSize => {
        test(`${paddingSize} is rendered`, () => {
          const component = mount(
            <EuiCodeBlock paddingSize={paddingSize}>{code}</EuiCodeBlock>
          );

          expect(snapshotCodeBlock(component)).toMatchSnapshot();
        });
      });
    });
  });

  describe('dynamic content', () => {
    it('updates DOM when input changes', done => {
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
          takeSnapshot();
          setValue('State 2');
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
  });
});
