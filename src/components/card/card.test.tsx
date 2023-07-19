/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiCard, ALIGNMENTS } from './card';

import { EuiIcon, EuiAvatar, EuiI18n } from '../../components';
import { COLORS, SIZES } from '../panel/panel';

describe('EuiCard', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiCard
        title="Card title"
        description="Card description"
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(
    <EuiCard title="Card title" betaBadgeProps={{ label: 'beta' }} />,
    { childProps: ['betaBadgeProps', 'betaBadgeProps.anchorProps'] }
  );

  describe('props', () => {
    test('icon', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          icon={<EuiIcon className="myIconClass" type="apmApp" />}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('an avatar icon', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          icon={<EuiAvatar color="plain" size="xl" name="test" />}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('a null icon', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          icon={null}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('hasBorder', () => {
      const { container } = render(
        <EuiCard title="Card title" description="Card description" hasBorder />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('horizontal', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          layout="horizontal"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('image', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          image={
            <div>
              <img
                src="https://source.unsplash.com/400x200/?Nature"
                alt="Nature"
              />
            </div>
          }
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('href', () => {
      it('supports href as a link', () => {
        const { container } = render(
          <EuiCard title="Hoi" description="There" href="#" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick as a link', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiCard title="Hoi" description="There" href="#" onClick={handler} />
        );
        component.find('a').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiCard title="Hoi" description="There" onClick={handler} />
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });

      it('should only call onClick once when title is a React node', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiCard
            title={<span data-test-subj="click">Hoi</span>}
            description="There"
            onClick={handler}
          />
        );
        component.find('[data-test-subj="click"]').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });

    test('titleElement', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          titleElement="h4"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('titleElement with nodes', () => {
      const { container } = render(
        <EuiCard
          title={
            <EuiI18n token="euiCard.title" default="Card title" /> // eslint-disable-line
          }
          description="Card description"
          titleElement="h4"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('titleSize', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          titleSize="xs"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('accepts div props', () => {
      test('like style', () => {
        const { container } = render(
          <EuiCard
            title="Card title"
            description="Card description"
            style={{ minWidth: 0 }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('footer', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          footer={<span>Footer</span>}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('children', () => {
      const { container } = render(<EuiCard title="Card title">Child</EuiCard>);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('children with description', () => {
      const { container } = render(
        <EuiCard title="Card title" description="Card description">
          Child
        </EuiCard>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('textAlign', () => {
      ALIGNMENTS.forEach((textAlign) => {
        test(textAlign, () => {
          const { container } = render(
            <EuiCard
              title="Card title"
              description="Card description"
              textAlign={textAlign}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    test('isDisabled', () => {
      const { container } = render(
        <EuiCard title="Card title" description="Card description" isDisabled />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('paddingSize', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <EuiCard
              title="Card title"
              description="Card description"
              paddingSize={size}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('display', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiCard
              title="Card title"
              description="Card description"
              display={color}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    test('selectable', () => {
      const { container } = render(
        <EuiCard
          title="Card title"
          description="Card description"
          selectable={{
            onClick: () => {},
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('horizontal selectable', () => {
    const { container } = render(
      <EuiCard
        title="Card title"
        description="Card description"
        layout="horizontal"
        selectable={{
          onClick: () => {},
        }}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('betaBadgeProps renders href', () => {
    const { container } = render(
      <EuiCard
        title="Card title"
        description="Card description"
        betaBadgeProps={{
          href: 'http://www.elastic.co/',
          label: 'Link',
        }}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
