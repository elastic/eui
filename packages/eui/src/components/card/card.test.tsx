/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiIcon } from '../icon';
import { EuiAvatar } from '../avatar';
import { EuiI18n } from '../i18n';
import { COLORS, SIZES } from '../panel/panel';

import { EuiCard, ALIGNMENTS } from './card';
import * as cardStyles from './card.styles';

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

  describe('style memoization', () => {
    afterEach(() => jest.restoreAllMocks());

    test('reuses theme styles across cards and rerenders', () => {
      const styleGenerators = [
        jest.spyOn(cardStyles, 'euiCardStyles'),
        jest.spyOn(cardStyles, 'euiCardTextStyles'),
        jest.spyOn(cardStyles, 'euiCardBetaBadgeStyles'),
      ];
      const cards = (paddingSize: 's' | 'l') => (
        <>
          <EuiCard title="First card" paddingSize={paddingSize} />
          <EuiCard
            title="Second card"
            betaBadgeProps={{ label: 'Beta' }}
            paddingSize={paddingSize}
          />
        </>
      );
      const { rerender } = render(cards('s'));
      styleGenerators.forEach((generator) => {
        expect(generator).toHaveBeenCalledTimes(1);
      });
      rerender(cards('l'));
      styleGenerators.forEach((generator) => {
        expect(generator).toHaveBeenCalledTimes(1);
      });
    });
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
        const { getByRole } = render(
          <EuiCard title="Hoi" description="There" href="#" onClick={handler} />
        );
        fireEvent.click(getByRole('link'));
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const { getByRole } = render(
          <EuiCard title="Hoi" description="There" onClick={handler} />
        );
        fireEvent.click(getByRole('button'));
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('should only call onClick once when title is a React node', () => {
        const handler = jest.fn();
        const { getByTestSubject } = render(
          <EuiCard
            title={<span data-test-subj="click">Hoi</span>}
            description="There"
            onClick={handler}
          />
        );
        fireEvent.click(getByTestSubject('click'));
        expect(handler).toHaveBeenCalledTimes(1);
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

    test('keeps image, icon, and badge padding independent between cards and rerenders', () => {
      const paddingSizes = [
        ['xs', '4px'],
        ['s', '8px'],
        ['m', '16px'],
        ['l', '24px'],
        ['xl', '32px'],
      ] as const;
      const cards = (reverse: boolean) => (
        <>
          {paddingSizes.map(([size], index) => (
            <EuiCard
              key={size}
              title="Card title"
              data-test-subj={`card-${size}`}
              paddingSize={
                reverse
                  ? paddingSizes[paddingSizes.length - index - 1][0]
                  : size
              }
              image={
                <img src="image.jpg" alt="" data-test-subj={`image-${size}`} />
              }
              icon={<EuiAvatar name="Icon" data-test-subj={`icon-${size}`} />}
              betaBadgeProps={{
                label: 'Beta',
                anchorProps: { 'data-test-subj': `badge-${size}` },
              }}
            />
          ))}
        </>
      );
      const { getByTestSubject, rerender } = render(cards(false));
      const assertPadding = (reverse: boolean) => {
        paddingSizes.forEach(([size, padding], index) => {
          const amount = reverse
            ? paddingSizes[paddingSizes.length - index - 1][1]
            : padding;
          const image = getByTestSubject(`image-${size}`).parentElement!;
          expect(image).toHaveStyleRule(
            'inline-size',
            `calc(100% + (${amount} * 2))`
          );
          expect(image).toHaveStyleRule('inset-inline-start', `-${amount}`);
          expect(image).toHaveStyleRule('inset-block-start', `-${amount}`);
          expect(image).toHaveStyleRule('margin-block-end', `-${amount}`);
          expect(getByTestSubject(`icon-${size}`)).toHaveStyleRule(
            'transform',
            new RegExp(
              `translate\\(\\s*-50%,\\s*calc\\(-50% \\+ -${amount}\\)\\s*\\)!important`
            )
          );
          expect(getByTestSubject(`card-${size}`)).toHaveStyleRule(
            'padding-block-start',
            `calc(${amount} + 8px)`
          );
          expect(getByTestSubject(`badge-${size}`)).toHaveStyleRule(
            'max-inline-size',
            `calc(100% - (${amount} * 2))`
          );
        });
      };
      assertPadding(false);
      rerender(cards(true));
      assertPadding(true);
    });

    test('supports adding and removing a beta badge on rerender', () => {
      const { getByTestSubject, queryByText, rerender } = render(
        <EuiCard title="Card title" data-test-subj="card" />
      );
      expect(queryByText('Beta')).not.toBeInTheDocument();
      rerender(
        <EuiCard
          title="Card title"
          data-test-subj="card"
          betaBadgeProps={{ label: 'Beta' }}
        />
      );
      expect(queryByText('Beta')).toBeInTheDocument();
      expect(getByTestSubject('card')).toHaveStyleRule(
        'padding-block-start',
        'calc(16px + 8px)'
      );
      rerender(<EuiCard title="Card title" data-test-subj="card" />);
      expect(queryByText('Beta')).not.toBeInTheDocument();
      expect(getByTestSubject('card')).not.toHaveStyleRule(
        'padding-block-start'
      );
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
