/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiFormControlLayout } from './form_control_layout';
import { ICON_SIDES } from './form_control_layout_icons';

jest.mock('../../', () => ({
  EuiIcon: 'eui_icon',
  EuiLoadingSpinner: 'eui_loading_spinner',
}));

describe('EuiFormControlLayout', () => {
  shouldRenderCustomStyles(<EuiFormControlLayout />, {
    childProps: ['wrapperProps'],
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiFormControlLayout {...requiredProps}>
        <input />
      </EuiFormControlLayout>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      describe('is rendered', () => {
        test('as a string', () => {
          const { container } = render(<EuiFormControlLayout icon="error" />);

          expect(container.firstChild).toMatchSnapshot();
        });

        test('as an object', () => {
          const icon = {
            type: 'error',
            className: 'customClass',
            'data-test-subj': 'myIcon',
          };

          const { container } = render(<EuiFormControlLayout icon={icon} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      describe('side', () => {
        ICON_SIDES.forEach((side) => {
          test(`${side} is rendered`, () => {
            const icon = {
              type: 'error',
              side,
            };

            const { container } = render(<EuiFormControlLayout icon={icon} />);

            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });

      describe('onClick', () => {
        test('is called when clicked', () => {
          const icon = {
            type: 'error',
            onClick: jest.fn(),
            'data-test-subj': 'myIcon',
          };

          const { getByTestSubject } = render(
            <EuiFormControlLayout icon={icon} />
          );

          fireEvent.click(getByTestSubject('myIcon'));
          expect(icon.onClick).toHaveBeenCalled();
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

          const { container } = render(<EuiFormControlLayout clear={clear} />);

          expect(container.firstChild).toMatchSnapshot();
        });

        test('is called when clicked', () => {
          const clear = {
            onClick: jest.fn(),
            'data-test-subj': 'clearButton',
          };

          const { getByTestSubject } = render(
            <EuiFormControlLayout clear={clear} />
          );

          fireEvent.click(getByTestSubject('clearButton'));
          expect(clear.onClick).toHaveBeenCalled();
        });
      });
    });

    test('isLoading is rendered', () => {
      const { container } = render(<EuiFormControlLayout isLoading />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const { container } = render(<EuiFormControlLayout isInvalid />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isDropdown is rendered', () => {
      const { container } = render(<EuiFormControlLayout isDropdown />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('iconsPosition', () => {
      const { container } = render(
        <EuiFormControlLayout
          iconsPosition="static"
          icon="calendar"
          isLoading
          isInvalid
          {...requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('compressed', () => {
      it('renders small-sized icon, clear button, and loading spinner', () => {
        const { container } = render(
          <EuiFormControlLayout
            compressed
            icon={{ type: 'error' }}
            clear={{ onClick: jest.fn() }}
            isLoading
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('fullWidth is rendered', () => {
      const { container } = render(<EuiFormControlLayout fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('readOnly is rendered', () => {
      const { container } = render(<EuiFormControlLayout readOnly />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one prepend node is rendered', () => {
      const { container } = render(
        <EuiFormControlLayout prepend={<span>1</span>} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one prepend node is rendered with className', () => {
      const { container } = render(
        <EuiFormControlLayout prepend={<span className="myClass">1</span>} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one prepend string is rendered', () => {
      const { container } = render(<EuiFormControlLayout prepend="1" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one append node is rendered', () => {
      const { container } = render(
        <EuiFormControlLayout append={<span>1</span>} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('one append string is rendered', () => {
      const { container } = render(<EuiFormControlLayout append="1" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('multiple prepends are rendered', () => {
      const { container } = render(
        <EuiFormControlLayout prepend={[<span>1</span>, <span>2</span>]} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('multiple appends are rendered', () => {
      const { container } = render(
        <EuiFormControlLayout append={[<span>1</span>, <span>2</span>]} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { baseElement } = render(
        <EuiForm fullWidth>
          <EuiFormControlLayout />
        </EuiForm>
      );

      const layout = baseElement.querySelector('.euiFormControlLayout');

      expect(layout).toBeDefined();
      expect(layout!.className).toContain('fullWidth');
    });
  });
});
