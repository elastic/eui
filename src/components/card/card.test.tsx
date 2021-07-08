/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiCard } from './card';

import { EuiIcon } from '../icon';
import { EuiI18n } from '../i18n';
import { COLORS, SIZES } from '../panel/panel';

describe('EuiCard', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCard
        title="Card title"
        description="Card description"
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('icon', () => {
      const component = render(
        <EuiCard
          title="Card title"
          description="Card description"
          icon={<EuiIcon className="myIconClass" type="apmApp" />}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('a null icon', () => {
      const component = render(
        <EuiCard
          title="Card title"
          description="Card description"
          icon={null}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('hasBorder', () => {
      const component = render(
        <EuiCard title="Card title" description="Card description" hasBorder />
      );

      expect(component).toMatchSnapshot();
    });

    test('horizontal', () => {
      const component = render(
        <EuiCard
          title="Card title"
          description="Card description"
          layout="horizontal"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('image', () => {
      const component = render(
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

      expect(component).toMatchSnapshot();
    });

    describe('href', () => {
      it('supports href as a link', () => {
        const component = mount(
          <EuiCard title="Hoi" description="There" href="#" />
        );

        expect(component).toMatchSnapshot();
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
    });

    test('titleElement', () => {
      const component = render(
        <EuiCard
          title="Card title"
          description="Card description"
          titleElement="h4"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('titleElement with nodes', () => {
      const component = render(
        <EuiCard
          title={
            <EuiI18n token="euiCard.title" default="Card title" /> // eslint-disable-line
          }
          description="Card description"
          titleElement="h4"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize', () => {
      const component = render(
        <EuiCard
          title="Card title"
          description="Card description"
          titleSize="xs"
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('accepts div props', () => {
      test('like style', () => {
        const component = render(
          <EuiCard
            title="Card title"
            description="Card description"
            style={{ minWidth: 0 }}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    test('footer', () => {
      const component = render(
        <EuiCard
          title="Card title"
          description="Card description"
          footer={<span>Footer</span>}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('children', () => {
      const component = render(<EuiCard title="Card title">Child</EuiCard>);

      expect(component).toMatchSnapshot();
    });

    test('children with description', () => {
      const component = render(
        <EuiCard title="Card title" description="Card description">
          Child
        </EuiCard>
      );

      expect(component).toMatchSnapshot();
    });

    test('textAlign', () => {
      const component = render(
        <EuiCard
          title="Card title"
          description="Card description"
          textAlign="right"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('isDisabled', () => {
      const component = render(
        <EuiCard title="Card title" description="Card description" isDisabled />
      );

      expect(component).toMatchSnapshot();
    });

    describe('paddingSize', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiCard
              title="Card title"
              description="Card description"
              paddingSize={size}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('display', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiCard
              title="Card title"
              description="Card description"
              display={color}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    test('selectable', () => {
      const component = render(
        <EuiCard
          title="Card title"
          description="Card description"
          selectable={{
            onClick: () => {},
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('horizontal selectable', () => {
    const component = render(
      <EuiCard
        title="Card title"
        description="Card description"
        layout="horizontal"
        selectable={{
          onClick: () => {},
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('betaBadgeProps renders href', () => {
    const component = render(
      <EuiCard
        title="Card title"
        description="Card description"
        betaBadgeProps={{
          href: 'http://www.elastic.co/',
        }}
        betaBadgeLabel="Link"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
