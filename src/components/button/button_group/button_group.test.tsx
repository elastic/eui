import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiButtonGroup, GroupButtonSize } from './button_group';
import { COLORS } from '../button';

const SIZES: GroupButtonSize[] = ['s', 'm', 'compressed'];

const options = [
  {
    id: 'button00',
    label: 'Option one',
  },
  {
    id: 'button01',
    label: 'Option two',
  },
  {
    id: 'button02',
    label: 'Option three',
  },
];

describe('EuiButtonGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonGroup onChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('options', () => {
      it('are rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} options={options} />
        );

        expect(component).toMatchSnapshot();
      });

      it('can pass down data-test-subj', () => {
        const options2 = [
          {
            id: 'button00',
            label: 'Option one',
            'data-test-subj': 'test',
          },
        ];

        const component = render(
          <EuiButtonGroup onChange={() => {}} options={options2} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonSize', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiButtonGroup
              onChange={() => {}}
              buttonSize={size}
              options={options}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} isDisabled options={options} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isFullWidth', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} isFullWidth options={options} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isIconOnly', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} isIconOnly options={options} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiButtonGroup
              onChange={() => {}}
              color={color}
              options={options}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('legend', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup
            onChange={() => {}}
            legend="legend"
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('name', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} name="name" options={options} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('idSelected', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup
            onChange={() => {}}
            idSelected="button00"
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('type of multi', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} type="multi" options={options} />
        );

        expect(component).toMatchSnapshot();
      });

      it('idToSelectedMap is rendered', () => {
        const component = render(
          <EuiButtonGroup
            onChange={() => {}}
            type="multi"
            idToSelectedMap={{ button00: true, button01: true }}
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
