/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test';

import { EuiMarkdownFormat, getDefaultEuiMarkdownPlugins } from './index';

describe('EuiMarkdownFormat', () => {
  shouldRenderCustomStyles(<EuiMarkdownFormat>test</EuiMarkdownFormat>);

  it('renders', () => {
    const { container } = render(
      <EuiMarkdownFormat {...requiredProps}>**Hello world**</EuiMarkdownFormat>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('color', () => {
      const { getByTestSubject } = render(
        <>
          <EuiMarkdownFormat color="danger" data-test-subj="first">
            _Hello world_
          </EuiMarkdownFormat>
          <EuiMarkdownFormat color="#FFF" data-test-subj="second">
            ~Hello world~
          </EuiMarkdownFormat>
        </>
      );

      expect(getByTestSubject('first')).toHaveStyle({
        color: 'rgb(167, 22, 39)',
      });
      expect(getByTestSubject('second')).toHaveStyle({
        color: '#ffffff',
      });
    });

    test('textSize', () => {
      const { getByTestSubject } = render(
        <>
          <EuiMarkdownFormat textSize="xs" data-test-subj="first">
            _Hello world_
          </EuiMarkdownFormat>
          <EuiMarkdownFormat textSize="relative" data-test-subj="second">
            ~Hello world~
          </EuiMarkdownFormat>
        </>
      );

      expect(getByTestSubject('first')).toHaveStyle({
        'font-size': '0.8571rem',
      });
      expect(getByTestSubject('second')).toHaveStyle({
        'font-size': '1em',
      });
    });
  });

  describe('plugins config', () => {
    // Test utils
    const getComponent = () => document.querySelector('.euiMarkdownFormat')!;
    const getLink = () => getComponent().querySelector('.euiLink');
    const getCheckbox = () => getComponent().querySelector('.euiCheckbox');
    const getToolTip = () => getComponent().querySelector('.euiToolTipAnchor');

    const assertMarkdownBeforeAndAfter = (args: {
      markdown: string;
      config: Parameters<typeof getDefaultEuiMarkdownPlugins>[0];
      before: Function;
      after: Function;
    }) => {
      const { markdown, config, before, after } = args;

      const { rerender } = render(
        <EuiMarkdownFormat>{markdown}</EuiMarkdownFormat>
      );
      before();

      const { processingPlugins, parsingPlugins } =
        getDefaultEuiMarkdownPlugins(config);
      rerender(
        <EuiMarkdownFormat
          parsingPluginList={parsingPlugins}
          processingPluginList={processingPlugins}
        >
          {markdown}
        </EuiMarkdownFormat>
      );

      after();
    };

    describe('exclude', () => {
      test('tooltip', () => {
        assertMarkdownBeforeAndAfter({
          markdown: '!{tooltip[text](help)}',
          config: { exclude: ['tooltip'] },
          before: () => expect(getToolTip()).toBeInTheDocument(),
          after: () => expect(getToolTip()).not.toBeInTheDocument(),
        });
      });

      test('checkbox', () => {
        assertMarkdownBeforeAndAfter({
          markdown: '- [ ] TODO',
          config: { exclude: ['checkbox'] },
          before: () => expect(getCheckbox()).toBeInTheDocument(),
          after: () => expect(getCheckbox()).not.toBeInTheDocument(),
        });
      });

      test('emoji', () => {
        assertMarkdownBeforeAndAfter({
          markdown: ':smile:',
          config: { exclude: ['emoji'] },
          before: () => expect(getComponent()).toHaveTextContent('😄'),
          after: () => expect(getComponent()).toHaveTextContent(':smile:'),
        });
      });

      test('linkValidator', () => {
        assertMarkdownBeforeAndAfter({
          markdown: '[Sus link](file://)',
          config: { exclude: ['linkValidator'] },
          before: () => expect(getLink()).not.toBeInTheDocument(),
          after: () => expect(getLink()).toBeInTheDocument(),
        });
      });

      test('lineBreaks', () => {
        assertMarkdownBeforeAndAfter({
          markdown: `One
          Two`,
          config: { exclude: ['lineBreaks'] },
          before: () => expect(getComponent().innerHTML).toContain('<br>'),
          after: () => expect(getComponent().innerHTML).not.toContain('<br>'),
        });
      });
    });

    describe('processingConfig', () => {
      test('linkProps', () => {
        assertMarkdownBeforeAndAfter({
          markdown: '[link](https://elastic.co)',
          config: {
            processingConfig: { linkProps: { target: '_blank' } },
          },
          before: () => expect(getLink()).not.toHaveAttribute('target'),
          after: () => expect(getLink()).toHaveAttribute('target', '_blank'),
        });
      });
    });

    describe('parsingConfig', () => {
      it('emoji', () => {
        assertMarkdownBeforeAndAfter({
          markdown: ':)',
          config: {
            parsingConfig: { emoji: { emoticon: true } },
          },
          before: () => expect(getComponent()).toHaveTextContent(':)'),
          after: () => expect(getComponent()).toHaveTextContent('😃'),
        });
      });

      it('linkValidator', () => {
        assertMarkdownBeforeAndAfter({
          markdown: '[relative](/), [protocol](ftp://test)',
          config: {
            parsingConfig: {
              linkValidator: { allowRelative: false, allowProtocols: ['ftp:'] },
            },
          },
          before: () => expect(getLink()).toHaveTextContent('relative'),
          after: () => expect(getLink()).toHaveTextContent('protocol'),
        });
      });
    });
  });
});
