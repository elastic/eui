import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';

import { findTestSubject, requiredProps } from '../../../test';

import { EuiFormControlLayout, ICON_SIDES } from './form_control_layout';

jest.mock('../../', () => ({
  EuiIcon: 'eui_icon',
  EuiLoadingSpinner: 'eui_loading_spinner',
}));

describe('EuiFormControlLayout', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormControlLayout {...requiredProps}>
        <input />
      </EuiFormControlLayout>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      describe('is rendered', () => {
        test('as a string', () => {
          const component = render(<EuiFormControlLayout icon="alert" />);

          expect(component).toMatchSnapshot();
        });

        test('as an object', () => {
          const icon = {
            type: 'alert',
            className: 'customClass',
            'data-test-subj': 'myIcon',
          };

          const component = render(<EuiFormControlLayout icon={icon} />);

          expect(component).toMatchSnapshot();
        });
      });

      describe('side', () => {
        ICON_SIDES.forEach(side => {
          test(`${side} is rendered`, () => {
            const icon = {
              type: 'alert',
              side,
            };

            const component = render(<EuiFormControlLayout icon={icon} />);

            expect(component).toMatchSnapshot();
          });
        });
      });

      describe('onClick', () => {
        test('is called when clicked', () => {
          const icon = {
            type: 'alert',
            onClick: sinon.spy(),
            'data-test-subj': 'myIcon',
          };

          const component = mount(<EuiFormControlLayout icon={icon} />);

          const closeButton = findTestSubject(component, 'myIcon');
          closeButton.simulate('click');
          expect(icon.onClick.called).toBe(true);
        });
      });
    });

    describe('clear', () => {
      describe('onClick', () => {
        test('is rendered', () => {
          const clear = {
            onClick: () => {},
            className: 'customClass',
            'data-test-subj': 'clearButton',
          };

          const component = render(<EuiFormControlLayout clear={clear} />);

          expect(component).toMatchSnapshot();
        });

        test('is called when clicked', () => {
          const clear = {
            onClick: sinon.spy(),
            'data-test-subj': 'clearButton',
          };

          const component = mount(<EuiFormControlLayout clear={clear} />);

          const closeButton = findTestSubject(component, 'clearButton');
          closeButton.simulate('click');
          expect(clear.onClick.called).toBe(true);
        });
      });
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiFormControlLayout isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<EuiFormControlLayout fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('one prepend is rendered', () => {
      const component = render(
        <EuiFormControlLayout prepend={<span>1</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('one append is rendered', () => {
      const component = render(
        <EuiFormControlLayout append={<span>1</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('multiple prepends are rendered', () => {
      const component = render(
        <EuiFormControlLayout prepend={[<span>1</span>, <span>2</span>]} />
      );

      expect(component).toMatchSnapshot();
    });

    test('multiple appends are rendered', () => {
      const component = render(
        <EuiFormControlLayout append={[<span>1</span>, <span>2</span>]} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
