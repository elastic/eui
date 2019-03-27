import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableList } from './selectable_list';
import { Option } from '../types';

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../../services/accessibility/html_id_generator', () => ({
  // @ts-ignore
  htmlIdGenerator: () => suffix => `htmlid_${suffix}`,
}));

const options: Option[] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label: 'Mimas',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
];

// tslint:disable:no-empty
describe('EuiSelectableListItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelectableList
        options={options}
        onOptionClick={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
  describe('props', () => {
    test('visibleOptions', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          visibleOptions={options.slice(2)}
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('searchValue', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          searchValue="Mi"
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('searchValue', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          searchValue="Mi"
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('renderOption', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          renderOption={(option: Option, searchValue?: string) => {
            return (
              <span>
                {searchValue} => {option.label}
              </span>
            );
          }}
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('height is forced', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          height={200}
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('height is full', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          height="full"
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('allowExclusions', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          allowExclusions
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('activeOptionIndex', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          activeOptionIndex={2}
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('rowHeight', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          rowHeight={20}
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('showIcons can be turned off', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          showIcons={false}
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('singleSelection can be turned on', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          singleSelection={true}
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('singleSelection can be forced so that at least one must be selected', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          singleSelection="always"
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('bordered', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          bordered
          onOptionClick={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
