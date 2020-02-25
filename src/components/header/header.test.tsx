import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiHeader } from './header';

describe('EuiHeader', () => {
  test('is rendered', () => {
    const component = render(<EuiHeader {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <EuiHeader>
        <span>Hello!</span>
      </EuiHeader>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders sections', () => {
    const component = render(
      <EuiHeader
        sections={{
          left: [{ children: 'Left' }],
          center: [{ children: 'Center' }],
          right: [{ children: 'Right' }],
        }}
      />
    );

    expect(component).toMatchSnapshot();
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

    test('if both children and sections were passed', () => {
      const component = render(
        <EuiHeader
          sections={{
            left: [{ children: 'Left' }],
            center: [{ children: 'Center' }],
            right: [{ children: 'Right' }],
          }}>
          Child
        </EuiHeader>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'cannot accept both `children` and `sections`'
      );
      expect(component).toMatchSnapshot();
    });
  });
});
