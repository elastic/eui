import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSelectable } from './selectable';
import { Option } from './types';

const options: Option[] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
];

describe('EuiSelectable', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelectable options={options} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('searchable', () => {
      const component = render(<EuiSelectable options={options} searchable />);

      expect(component).toMatchSnapshot();
    });

    test('singleSelection', () => {
      const component = render(
        <EuiSelectable options={options} singleSelection />
      );

      expect(component).toMatchSnapshot();
    });

    test('allowExclusions', () => {
      const component = render(
        <EuiSelectable options={options} allowExclusions />
      );

      expect(component).toMatchSnapshot();
    });

    test('isLoading', () => {
      const component = render(<EuiSelectable options={options} isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('height can be forced', () => {
      const component = render(
        <EuiSelectable options={options} height={200} />
      );

      expect(component).toMatchSnapshot();
    });

    test('height can be full', () => {
      const component = render(
        <EuiSelectable options={options} height="full" />
      );

      expect(component).toMatchSnapshot();
    });

    test('renderOption', () => {
      const component = render(
        <EuiSelectable
          options={options}
          renderOption={(option: Option, searchValue?: string) => {
            return (
              <span>
                {searchValue} => {option.label}
              </span>
            );
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
