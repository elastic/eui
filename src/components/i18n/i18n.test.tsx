import React, { ReactChild } from 'react';
import { mount } from 'enzyme';
import { EuiContext } from '../context';
import { EuiI18n } from './i18n';

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
});
