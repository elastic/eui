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
  });

  describe('when collapsible is true', () => {
    test('will render an accordion', () => {
      const component = render(
        <EuiCollapsibleNavGroup
          collapsible={true}
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
        'icon without also passing a `title`'
      );
      expect(component).toMatchSnapshot();
    });
  });
});
