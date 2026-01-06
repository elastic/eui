/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';

import { shouldRenderCustomStyles } from '../../../../test/internal';
import {
  EuiFormAppend,
  EuiFormAppendPrepend,
  EuiFormAppendPrependProps,
  EuiFormPrepend,
} from './form_append_prepend';
import { requiredProps } from '../../../../test';
import { render } from '../../../../test/rtl';
import { EuiFieldText } from '../../field_text';

const sharedProps = {
  label: 'Label',
  'data-test-subj': 'euiFormAppendPrepend',
};

const defaultProps = {
  ...sharedProps,
  side: 'append' as EuiFormAppendPrependProps['side'],
};

describe('EuiFormAppend', () => {
  shouldRenderCustomStyles(<EuiFormAppend />);

  it('is rendered', () => {
    const { container, getByTestSubject } = render(
      <EuiFormAppend {...sharedProps} {...requiredProps} />
    );

    const classes = Object.values(
      getByTestSubject(requiredProps['data-test-subj']).classList
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(classes).toContain('euiFormAppend');
  });
});

describe('EuiFormPrepend', () => {
  shouldRenderCustomStyles(<EuiFormPrepend />);

  it('is rendered', () => {
    const { container, getByTestSubject } = render(
      <EuiFormPrepend {...defaultProps} {...requiredProps} />
    );

    const classes = Object.values(
      getByTestSubject(requiredProps['data-test-subj']).classList
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(classes).toContain('euiFormPrepend');
  });
});

describe('EuiFormAppendPrepend', () => {
  shouldRenderCustomStyles(<EuiFormAppend />);

  it('is rendered', () => {
    const { container } = render(
      <EuiFormAppend {...defaultProps} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('element', () => {
      it('renders a div', () => {
        const { getByTestSubject } = render(
          <EuiFormAppendPrepend {...defaultProps} element="div" />
        );

        const element = getByTestSubject(defaultProps['data-test-subj']);

        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('DIV');
      });

      it('renders a button', () => {
        const { getByTestSubject } = render(
          <EuiFormAppendPrepend {...defaultProps} element="button" />
        );

        const element = getByTestSubject(defaultProps['data-test-subj']);

        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('BUTTON');
      });
    });

    describe('label', () => {
      it('renders a label element', () => {
        const { getByText } = render(
          <EuiFormAppendPrepend {...defaultProps} />
        );

        const element = getByText(defaultProps.label);

        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('LABEL');
      });

      it('renders a span element for buttons', () => {
        const { getByText } = render(
          <EuiFormAppendPrepend {...defaultProps} element="button" />
        );

        const element = getByText(defaultProps.label);

        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('SPAN');
      });
    });

    describe('iconLeft', () => {
      it('renders an icon on the left side', () => {
        const { getByTestSubject } = render(
          <EuiFormAppendPrepend {...defaultProps} iconLeft="faceHappy" />
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj']).firstChild
        ).toHaveAttribute('data-euiicon-type', 'faceHappy');
      });
    });

    describe('iconRight', () => {
      it('renders an icon on the left side', () => {
        const { getByTestSubject } = render(
          <EuiFormAppendPrepend {...defaultProps} iconRight="faceHappy" />
        );

        expect(
          getByTestSubject(defaultProps['data-test-subj']).lastChild
        ).toHaveAttribute('data-euiicon-type', 'faceHappy');
      });
    });

    describe('children', () => {
      it('renders', () => {
        const { side, 'data-test-subj': dataTestSubj } = defaultProps;

        const { getByTestSubject } = render(
          <EuiFormAppendPrepend side={side} data-test-subj={dataTestSubj}>
            <span>Content</span>
          </EuiFormAppendPrepend>
        );

        const element = getByTestSubject(dataTestSubj);

        expect(element.children.length).toBe(1);
        expect(element.firstChild).toHaveTextContent('Content');
      });

      it('renders `children` as last child', () => {
        const { getByTestSubject } = render(
          <EuiFormAppendPrepend {...defaultProps}>
            <span>Content</span>
          </EuiFormAppendPrepend>
        );

        const element = getByTestSubject(defaultProps['data-test-subj']);

        expect(element.firstChild).toHaveTextContent(defaultProps.label);
        expect(element.lastChild).toHaveTextContent('Content');
      });
    });

    describe('inputId', () => {
      it('renders `for` attribute when `inputId` is passed', () => {
        const { getByText } = render(
          <EuiFormAppendPrepend {...defaultProps} inputId="testId" />
        );

        expect(getByText(defaultProps.label)).toHaveAttribute('for', 'testId');
      });

      it('does not render `for` attribute for buttons when `inputId` is passed', () => {
        const { getByText } = render(
          <EuiFormAppendPrepend
            {...defaultProps}
            inputId="testId"
            element="button"
          />
        );

        expect(getByText(defaultProps.label)).not.toHaveAttribute('for');
      });

      it('renders `for` attribute when `id` is set on the parent form element', () => {
        const { getByText } = render(
          <EuiFieldText
            id="testId"
            append={<EuiFormAppendPrepend {...defaultProps} />}
          />
        );

        expect(getByText(defaultProps.label)).toHaveAttribute('for', 'testId');
      });
    });

    describe('compressed', () => {
      it('renders compressed styles', () => {
        const { getByTestSubject } = render(
          <EuiFormAppendPrepend {...defaultProps} compressed />
        );

        const classes = Object.values(
          getByTestSubject(defaultProps['data-test-subj']).classList
        );

        expect(classes.some((clx) => clx.includes('compressed'))).toBe(true);
      });

      it('renders compressed styles when the parent form element is compressed', () => {
        const { getByTestSubject } = render(
          <EuiFieldText
            compressed
            append={<EuiFormAppendPrepend {...defaultProps} />}
          />
        );

        const classes = Object.values(
          getByTestSubject(defaultProps['data-test-subj']).classList
        );

        expect(classes.some((clx) => clx.includes('compressed'))).toBe(true);
      });
    });

    describe('onClick', () => {
      it('renders a button with click handler', () => {
        const onClick = jest.fn();

        const { getByTestSubject } = render(
          <EuiFormAppendPrepend
            {...defaultProps}
            element="button"
            onClick={onClick}
          />
        );

        const element = getByTestSubject(defaultProps['data-test-subj']);

        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('BUTTON');

        fireEvent.click(element);

        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
