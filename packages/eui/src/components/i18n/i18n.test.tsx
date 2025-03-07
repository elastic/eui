/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import { mount } from 'enzyme';
import { EuiContext } from '../context';
import { EuiI18n, useEuiI18n } from './i18n';

/* eslint-disable local/i18n */

describe('EuiI18n', () => {
  const mockMappingFunc = jest.fn((string: string) => string.toUpperCase());

  beforeEach(() => jest.clearAllMocks());

  describe('default rendering', () => {
    describe('rendering to dom', () => {
      it('renders a basic string to the dom', () => {
        const component = mount(
          <EuiI18n token="test" default="This is a basic string." />
        );
        expect(component).toMatchSnapshot();
      });

      it('renders a string with placeholders to the dom', () => {
        const component = mount(
          <EuiI18n
            token="test"
            default="This is a {type} with {special}."
            values={{ type: 'string', special: 'values' }}
          />
        );
        expect(component).toMatchSnapshot();
      });

      it('calls a function and renders the result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a ${type} with ${special}.`
        );
        const component = mount(
          <EuiI18n token="test" default={renderCallback} values={values} />
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });

      it('renders when value is null', () => {
        const component = mount(
          <EuiI18n token="test" default="{arg}" values={{ arg: null }} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('render prop with single token', () => {
      it('renders render prop result to the dom', () => {
        const component = mount(
          <EuiI18n token="test" default="This is a basic string.">
            {(result: ReactNode) => `A nifty thing: ${result}`}
          </EuiI18n>
        );
        expect(component).toMatchSnapshot();
      });

      it('renders render prop result with placeholders to the dom', () => {
        const component = mount(
          <EuiI18n
            token="test"
            default="This is a {type} with {special}."
            values={{ type: 'string', special: 'values' }}
          >
            {(result: ReactNode) => `Here's something cool: ${result}`}
          </EuiI18n>
        );
        expect(component).toMatchSnapshot();
      });

      it('calls a function and renders render prop result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a ${type} with ${special}.`
        );
        const component = mount(
          <EuiI18n token="test" default={renderCallback} values={values}>
            {(result: string) => `Here's something neat: ${result}`}
          </EuiI18n>
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });
    });

    describe('render prop with multiple tokens', () => {
      it('renders basic strings to the dom', () => {
        const component = mount(
          <EuiI18n
            tokens={['test1', 'test2']}
            defaults={[
              'This is the first basic string.',
              'This is the second basic string.',
            ]}
          >
            {([one, two]: ReactNode[]) => (
              <div>
                {one} {two}
              </div>
            )}
          </EuiI18n>
        );
        expect(component).toMatchSnapshot();
      });

      it('renders strings with placeholders to the dom', () => {
        const component = mount(
          <EuiI18n
            tokens={['test1', 'test2']}
            defaults={[
              'This is the first basic string.',
              'This is the a second string with a {placeholder}.',
            ]}
            values={{ placeholder: 'value' }}
          >
            {([one, two]: ReactNode[]) => (
              <div>
                {one} {two}
              </div>
            )}
          </EuiI18n>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('reading values from context', () => {
    describe('rendering to dom', () => {
      it('renders a mapped basic string to the dom', () => {
        const component = mount(
          <EuiContext i18n={{ mapping: { test: 'An overridden string.' } }}>
            <EuiI18n token="test" default="This is a basic string." />
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('renders a mapped string with placeholders to the dom', () => {
        const component = mount(
          <EuiContext
            i18n={{
              mapping: { test: 'An overridden {type} with {special}.' },
            }}
          >
            <EuiI18n
              token="test"
              default="This is a {type} with {special}."
              values={{ type: 'string', special: 'values' }}
            />
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('calls a mapped function and renders the result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a mapped ${type} with ${special}.`
        );
        const component = mount(
          <EuiContext i18n={{ mapping: { test: renderCallback } }}>
            <EuiI18n token="test" default={() => ''} values={values} />
          </EuiContext>
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });
    });

    describe('render prop with single token', () => {
      it('renders mapped render prop result to the dom', () => {
        const component = mount(
          <EuiContext i18n={{ mapping: { test: 'An overridden string.' } }}>
            <EuiI18n token="test" default="This is a basic string.">
              {(result: ReactNode) => `A nifty thing: ${result}`}
            </EuiI18n>
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('renders mapped render prop result with placeholders to the dom', () => {
        const component = mount(
          <EuiContext
            i18n={{
              mapping: { test: 'An overridden {type} with {special}.' },
            }}
          >
            <EuiI18n
              token="test"
              default="This is a {type} with {special}."
              values={{ type: 'string', special: 'values' }}
            >
              {(result: ReactNode) => `Here's something cool: ${result}`}
            </EuiI18n>
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('calls a mapped function and renders render prop result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a ${type} with ${special}.`
        );
        const component = mount(
          <EuiContext i18n={{ mapping: { test: renderCallback } }}>
            <EuiI18n token="test" default={renderCallback} values={values}>
              {(result: ReactNode) => `Here's something neat: ${result}`}
            </EuiI18n>
          </EuiContext>
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });
    });

    describe('render prop with multiple tokens', () => {
      const multipleTokens = (
        <EuiI18n
          tokens={['test1', 'test2']}
          defaults={[
            'This is the first basic string.',
            'This is the second basic string.',
          ]}
        >
          {([one, two]: ReactNode[]) => (
            <div>
              {one} {two}
            </div>
          )}
        </EuiI18n>
      );
      const multipleTokensMapping = {
        test1: 'This is the first mapped value.',
        test2: 'This is the second mapped value.',
      };

      it('renders mapped render prop result to the dom', () => {
        const component = mount(
          <EuiContext i18n={{ mapping: multipleTokensMapping }}>
            {multipleTokens}
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
      });

      it('uses the mapping function if one is provided', () => {
        const component = mount(
          <EuiContext
            i18n={{
              mapping: multipleTokensMapping,
              mappingFunc: mockMappingFunc,
            }}
          >
            {multipleTokens}
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
        expect(mockMappingFunc).toHaveBeenCalledTimes(2);
      });
    });

    describe('mappingFunc', () => {
      it('calls the mapping function with the source string', () => {
        const component = mount(
          <EuiContext
            i18n={{
              mapping: {
                test1: 'This is the mapped value.',
              },
              mappingFunc: mockMappingFunc,
            }}
          >
            <EuiI18n token="test1" default="This is the basic string.">
              {(one: string) => <div aria-label={one}>{one}</div>}
            </EuiI18n>
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
        expect(mockMappingFunc).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('useEuiI18n', () => {
    describe('unmapped', () => {
      it('handles single token without values', () => {
        const Component = () => {
          const value = useEuiI18n('token', 'placeholder');
          return <p>{value}</p>;
        };
        const component = mount(<Component />);
        expect(component).toMatchSnapshot();
      });

      it('handles single token with values', () => {
        const Component = () => {
          const value = useEuiI18n('myToken', 'first {first}, then {second}', {
            first: 'apples',
            second: 'aardvarks',
          });
          return <p>{value}</p>;
        };
        const component = mount(<Component />);
        expect(component).toMatchSnapshot();
      });

      it('handles multiple tokens', () => {
        const Component = () => {
          const [first, second] = useEuiI18n(
            ['test1', 'test2'],
            ['the first placeholder', 'the second placeholder']
          );
          return (
            <p>
              <span>{first}</span>
              <span>{second}</span>
            </p>
          );
        };
        const component = mount(<Component />);
        expect(component).toMatchSnapshot();
      });

      it('calls a function that returns JSX and renders the result to the dom', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(({ type, special }) => (
          <p>
            This is a {type} with {special}.
          </p>
        ));
        const Component = () => (
          <div>{useEuiI18n('test', renderCallback, values)}</div>
        );
        const component = mount(<Component />);
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });

      it('calls a function that returns a string and the i18n mapping function', () => {
        const values = { type: 'callback', special: 'values' };
        const renderCallback = jest.fn(
          ({ type, special }) => `This is a ${type} with ${special}`
        );
        const Component = () => (
          <div>{useEuiI18n('test', renderCallback, values)}</div>
        );

        const component = mount(
          <EuiContext i18n={{ mappingFunc: mockMappingFunc }}>
            <Component />
          </EuiContext>
        );

        expect(component).toMatchSnapshot();
        expect(renderCallback).toHaveBeenCalledWith(values);
        expect(mockMappingFunc).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('mapped tokens', () => {
    it('handles single token without values', () => {
      const Component = () => {
        const value = useEuiI18n('token', 'placeholder');
        return <p>{value}</p>;
      };
      const component = mount(
        <EuiContext
          i18n={{
            mapping: {
              token: 'This is the mapped value.',
            },
          }}
        >
          <Component />
        </EuiContext>
      );
      expect(component).toMatchSnapshot();
    });

    it('handles single token with values', () => {
      const Component = () => {
        const value = useEuiI18n('myToken', 'first {first}, then {second}', {
          first: 'apples',
          second: 'aardvarks',
        });
        return <p>{value}</p>;
      };
      const component = mount(
        <EuiContext
          i18n={{
            mapping: {
              myToken: 'In reverse order: {second}, then {first}',
            },
          }}
        >
          <Component />
        </EuiContext>
      );
      expect(component).toMatchSnapshot();
    });

    it('handles multiple tokens', () => {
      const Component = () => {
        const [first, second] = useEuiI18n(
          ['test1', 'test2'],
          ['the first placeholder', 'the second placeholder']
        );
        return (
          <p>
            <span>{first}</span>
            <span>{second}</span>
          </p>
        );
      };
      const component = mount(
        <EuiContext
          i18n={{
            mapping: {
              test1: 'first value',
              test2: 'second value',
            },
          }}
        >
          <Component />
        </EuiContext>
      );
      expect(component).toMatchSnapshot();
    });

    describe('mappingFunc', () => {
      it('calls the mapping function with the source string', () => {
        const Component = () => {
          const value = useEuiI18n('test1', 'placeholder');
          return <div aria-label={value}>{value}</div>;
        };
        const component = mount(
          <EuiContext
            i18n={{
              mapping: {
                test1: 'This is the mapped value.',
              },
              mappingFunc: mockMappingFunc,
            }}
          >
            <Component />
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('i18nRenderFunc', () => {
      it('uses user defined component render function', () => {
        const Component = () => {
          const value = useEuiI18n('test', 'placeholder {inside}', {
            inside: <span>inside</span>,
          });
          return <section>{value}</section>;
        };
        const component = mount(
          <EuiContext
            i18n={{
              render: (children) => () => <div>{children}</div>,
            }}
          >
            <Component />
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
