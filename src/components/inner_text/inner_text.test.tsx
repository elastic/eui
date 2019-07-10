import React from 'react';
import { render, mount } from 'enzyme';
import { findTestSubject, requiredProps } from '../../test';

import { useInnerText, EuiInnerText } from './inner_text';
import { EuiBadge } from '../badge';

describe('useInnerText', () => {
  test('provides a `ref`', () => {
    let ref;
    const App = () => {
      [ref] = useInnerText();
      return <span />;
    };
    mount(<App />);

    expect(ref).toEqual(React.createRef());
  });

  test('provides the result of `innerText`', () => {
    const text = 'Test';
    let ref;
    let innerText;
    const App = () => {
      [ref, innerText] = useInnerText();
      return <span ref={ref}>{text}</span>;
    };
    mount(<App />);

    expect(innerText).toEqual(text);
  });

  test('accepts a fallback value', () => {
    const text = 'Test';
    const fallback = 'Fallback';
    let innerText;
    const App = () => {
      [, innerText] = useInnerText(fallback);
      return <span>{text}</span>;
    };
    mount(<App />);

    expect(innerText).toEqual(fallback);
  });
});

describe('EuiInnerText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText}>
            Test
          </span>
        )}
      </EuiInnerText>
    );

    expect(component).toMatchSnapshot();
  });

  test('uses innerText', () => {
    const text = 'Test';
    const component = mount(
      <EuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText} data-test-subj="span">
            {text}
          </span>
        )}
      </EuiInnerText>
    );

    const span = findTestSubject(component, 'span');
    expect(span.props().title).toBe(text);
  });

  test('accepts fallback prop', () => {
    const text = 'Test';
    const fallback = 'Fallback';
    const component = mount(
      <EuiInnerText {...requiredProps} fallback={fallback}>
        {(ref, innerText) => (
          <span data-ref={ref} title={innerText} data-test-subj="span">
            {text}
          </span>
        )}
      </EuiInnerText>
    );

    const span = findTestSubject(component, 'span');
    expect(span.props().title).toBe(fallback);
  });

  test('works with wrapper and interspersed DOM elements', () => {
    const component = mount(
      <EuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText} data-test-subj="span">
            <div>
              I{' '}
              <span>
                can{' '}
                <em>
                  still <strong>read </strong>
                  <EuiBadge>this</EuiBadge>
                </em>
              </span>
            </div>
          </span>
        )}
      </EuiInnerText>
    );

    const span = findTestSubject(component, 'span');
    expect(span.props().title).toBe('I can still read this');
  });
});
