/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useEffect } from 'react';
import { act } from '@testing-library/react';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';

import { useInnerText, EuiInnerText } from './inner_text';
import { EuiBadge } from '../badge';

describe('useInnerText', () => {
  test('provides a callback `ref`', () => {
    let ref;
    const App = () => {
      [ref] = useInnerText();
      return <span />;
    };
    render(<App />);

    expect(ref).toBeInstanceOf(Function);
  });

  test('provides the result of `innerText`', () => {
    const text = 'Test';
    let ref;
    let innerText;
    const App = () => {
      [ref, innerText] = useInnerText();
      return <span ref={ref}>{text}</span>;
    };
    render(<App />);

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
    render(<App />);

    expect(innerText).toEqual(fallback);
  });

  test('handles updated elements', () => {
    jest.useFakeTimers();
    const timeout = 500;
    const first = 'First';
    const second = 'Second';
    let innerText;
    let ref;
    const App = () => {
      const [[thing, type], setThing] = useState([first, 'span']);
      useEffect(() => {
        setTimeout(() => {
          act(() => setThing([second, 'div']));
        }, timeout);
      }, [setThing]);
      [ref, innerText] = useInnerText();
      return (
        <div>
          {React.createElement(
            type,
            {
              ref,
              title: innerText,
            },
            thing
          )}
        </div>
      );
    };
    render(<App />);

    expect(innerText).toEqual(first);

    jest.advanceTimersByTime(timeout + 10);

    expect(innerText).toEqual(second);
  });

  test('handles updated content', () => {
    jest.useFakeTimers();
    const timeout = 500;
    const first = 'First';
    const second = 'Second';
    let innerText;
    let ref;
    const App = () => {
      const [thing, setThing] = useState(first);
      useEffect(() => {
        setTimeout(() => {
          act(() => setThing(second));
        }, timeout);
      }, [setThing]);
      [ref, innerText] = useInnerText();
      return (
        <div>
          <span ref={ref} title={innerText}>
            {thing}
          </span>
        </div>
      );
    };
    render(<App />);

    expect(innerText).toEqual(first);

    // MutationObserver polyfill institutes a 30ms mutation timeout period
    const mutationObserverPolyfillPeriod = 30;
    jest.advanceTimersByTime(timeout + mutationObserverPolyfillPeriod + 10);

    expect(innerText).toEqual(second);
  });
});

describe('EuiInnerText', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText}>
            Test
          </span>
        )}
      </EuiInnerText>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('uses innerText', () => {
    const text = 'Test';
    const { getByTestSubject } = render(
      <EuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText} data-test-subj="span">
            {text}
          </span>
        )}
      </EuiInnerText>
    );

    const span = getByTestSubject('span');
    expect(span.title).toBe(text);
  });

  test('accepts fallback prop', () => {
    const text = 'Test';
    const fallback = 'Fallback';
    const { getByTestSubject } = render(
      <EuiInnerText {...requiredProps} fallback={fallback}>
        {(_, innerText) => (
          <span title={innerText} data-test-subj="span">
            {text}
          </span>
        )}
      </EuiInnerText>
    );

    const span = getByTestSubject('span');
    expect(span.title).toBe(fallback);
  });

  test('works with wrapper and interspersed DOM elements', () => {
    const { getByTestSubject } = render(
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

    const span = getByTestSubject('span');
    expect(span.title).toBe('I can still read this');
  });
});
