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
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiIconTip } from './icon_tip';

describe('EuiIconTip', () => {
  shouldRenderCustomStyles(
    <EuiIconTip content="test" iconProps={{ 'data-test-subj': 'trigger' }} />,
    {
      childProps: ['iconProps'],
      renderCallback: ({ getByTestSubject }) => {
        fireEvent.mouseOver(getByTestSubject('trigger'));
      },
    }
  );

  it('is rendered', () => {
    const { container } = render(
      <EuiIconTip title="title" id="id" content="content" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    it('renders a different icon for each type', () => {
      const { container: defaultContainer } = render(
        <EuiIconTip content="content" />
      );
      const { container: warningContainer } = render(
        <EuiIconTip type="warning" content="content" />
      );

      expect(
        defaultContainer.querySelector('[data-euiicon-type]')
      ).toHaveAttribute('data-euiicon-type', 'question');
      expect(
        warningContainer.querySelector('[data-euiicon-type]')
      ).toHaveAttribute('data-euiicon-type', 'warning');
    });

    it('renders a different icon for each color', () => {
      const { container: defaultContainer } = render(
        <EuiIconTip content="content" />
      );
      const { container: colorContainer } = render(
        <EuiIconTip color="warning" content="content" />
      );

      expect(
        defaultContainer.querySelector('[data-euiicon-type]')
      ).not.toHaveAttribute('color');
      expect(
        colorContainer.querySelector('[data-euiicon-type]')
      ).toHaveAttribute('color', 'warning');
    });
  });

  describe('aria-label', () => {
    // In the test environment EuiIcon renders aria-label as its text content
    it('uses "Info" as the default aria-label', () => {
      const { container } = render(<EuiIconTip content="content" />);

      expect(container.querySelector('[data-euiicon-type]')).toHaveTextContent(
        'Info'
      );
    });

    it('uses a custom aria-label when provided', () => {
      const { container } = render(
        <EuiIconTip content="content" aria-label="More information" />
      );

      expect(container.querySelector('[data-euiicon-type]')).toHaveTextContent(
        'More information'
      );
    });
  });

  it('shows tooltip content on hover', () => {
    const { container, getByRole } = render(
      <EuiIconTip content="Tooltip content" />
    );

    fireEvent.mouseOver(container.querySelector('[data-euiicon-type]')!);

    expect(getByRole('tooltip')).toHaveTextContent('Tooltip content');
  });
});
