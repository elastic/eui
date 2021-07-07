/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactChild } from 'react';
import { mount } from 'enzyme';
import { EuiContext } from '../context';
import { EuiI18n, useEuiI18n } from './i18n';

/* eslint-disable local/i18n */

describe('EuiI18n', () => {
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
            {(result: ReactChild) => `A nifty thing: ${result}`}
          </EuiI18n>
        );
        expect(component).toMatchSnapshot();
      });

      it('renders render prop result with placeholders to the dom', () => {
        const component = mount(
          <EuiI18n
            token="test"
            default="This is a {type} with {special}."
            values={{ type: 'string', special: 'values' }}>
            {(result: ReactChild) => `Here's something cool: ${result}`}
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
      it('renders render prop result to the dom', () => {
        const component = mount(
          <EuiI18n
            tokens={['test1', 'test2']}
            defaults={[
              'This is the first basic string.',
              'This is the second basic string.',
            ]}>
            {([one, two]: ReactChild[]) => (
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
            }}>
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
              {(result: ReactChild) => `A nifty thing: ${result}`}
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
            }}>
            <EuiI18n
              token="test"
              default="This is a {type} with {special}."
              values={{ type: 'string', special: 'values' }}>
              {(result: ReactChild) => `Here's something cool: ${result}`}
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
              {(result: ReactChild) => `Here's something neat: ${result}`}
            </EuiI18n>
          </EuiContext>
        );
        expect(component).toMatchSnapshot();

        expect(renderCallback).toHaveBeenCalledWith(values);
      });
    });

    describe('render prop with multiple tokens', () => {
      it('renders mapped render prop result to the dom', () => {
        const component = mount(
          <EuiContext
            i18n={{
              mapping: {
                test1: 'This is the first mapped value.',
                test2: 'This is the second mapped value.',
              },
            }}>
            <EuiI18n
              tokens={['test1', 'test2']}
              defaults={[
                'This is the first basic string.',
                'This is the second basic string.',
              ]}>
              {([one, two]: ReactChild[]) => (
                <div>
                  {one} {two}
                </div>
              )}
            </EuiI18n>
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
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
              mappingFunc: (value: string) => value.toUpperCase(),
            }}>
            <EuiI18n token="test1" default="This is the basic string.">
              {(one: string) => <div aria-label={one}>{one}</div>}
            </EuiI18n>
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
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

      it('calls a function and renders the result to the dom', () => {
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
          }}>
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
          }}>
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
          }}>
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
              mappingFunc: (value: string) => value.toUpperCase(),
            }}>
            <Component />
          </EuiContext>
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
