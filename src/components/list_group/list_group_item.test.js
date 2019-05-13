import React from 'react';
import { render } from 'enzyme';

import { EuiListGroupItem, SIZES } from './list_group_item';

describe('EuiListGroupItem', () => {
  test('is rendered', () => {
    const component = render(<EuiListGroupItem label="Label" />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('size', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiListGroupItem label="Label" size={size} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('isActive', () => {
      test('is rendered', () => {
        const component = render(<EuiListGroupItem label="Label" isActive />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('is rendered', () => {
        const component = render(<EuiListGroupItem label="Label" isDisabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      test('is rendered', () => {
        const component = render(
          <EuiListGroupItem label="Label" iconType="empty" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      test('is rendered', () => {
        const component = render(
          <EuiListGroupItem label="Label" icon={<span />} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    // TODO: This keeps re-rendering differently because of fake id creation
    // describe('showToolTip', () => {
    //   test('is rendered', () => {
    //     const component = render(
    //       <EuiListGroupItem label="Label" showToolTip />
    //     );

    //     expect(component).toMatchSnapshot();
    //   });
    // });

    describe('wrapText', () => {
      test('is rendered', () => {
        const component = render(<EuiListGroupItem label="Label" wrapText />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      test('is rendered', () => {
        const component = render(
          <EuiListGroupItem
            label="Label"
            extraAction={{
              iconType: 'empty',
              alwaysShow: true,
              'aria-label': 'label',
            }}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('href', () => {
      test('is rendered', () => {
        const component = render(<EuiListGroupItem label="Label" href="#" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test('is rendered', () => {
        const component = render(
          <EuiListGroupItem label="Label" onClick={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('renders a disabled button even if provided an href', () => {
    const component = render(
      <EuiListGroupItem label="Label" isDisabled href="#" />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders a disabled button even if provided an href', () => {
    const component = render(
      <EuiListGroupItem label="Label" isDisabled href="#" />
    );

    expect(component).toMatchSnapshot();
  });

  describe('throws an warning', () => {
    const oldConsoleError = console.warn;
    let consoleStub;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because EUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.
      console.warn = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.warn = oldConsoleError;
    });

    test('if both onClick and href are provided but still renders', () => {
      const component = render(
        <EuiListGroupItem label="" onClick={() => {}} href="#" />
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        '`href` and `onClick` were passed'
      );
      expect(component).toMatchSnapshot();
    });

    test('if both iconType and icon are provided but still renders', () => {
      const component = render(
        <EuiListGroupItem label="" iconType="empty" icon={<span />} />
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        '`iconType` and `icon` were passed'
      );
      expect(component).toMatchSnapshot();
    });
  });
});
