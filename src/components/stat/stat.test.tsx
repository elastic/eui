import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiStat, COLORS, ALIGNMENTS } from './stat';
import { TITLE_SIZES } from '../title/title';

jest.mock(`./../form/form_row/make_id`, () => () => `generated-id`);

describe('EuiStat', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStat title="title" description="description" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('loading is rendered', () => {
      const component = render(
        <EuiStat
          title="title"
          description="description"
          isLoading
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('title and description are reversed', () => {
      const component = render(
        <EuiStat title="title" description="description" reverse />
      );

      expect(component).toMatchSnapshot();
    });

    ALIGNMENTS.forEach(alignment => {
      test(`${alignment} is rendered`, () => {
        const component = render(
          <EuiStat
            title="title"
            description="description"
            textAlign={alignment}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    COLORS.forEach(color => {
      test(`${color} is rendered`, () => {
        const component = render(
          <EuiStat title="title" description="description" titleColor={color} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    TITLE_SIZES.forEach(size => {
      test(`${size} is rendered`, () => {
        const component = render(
          <EuiStat title="title" description="description" titleSize={size} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
