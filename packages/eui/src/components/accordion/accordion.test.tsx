/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiAccordion } from './accordion';

let id = 0;
const getId = () => `${id++}`;

describe('EuiAccordion', () => {
  shouldRenderCustomStyles(<EuiAccordion id="styles" />, {
    childProps: ['buttonProps', 'arrowProps'],
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiAccordion id={getId()} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('element', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} element="fieldset" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('role', () => {
      const { queryByRole } = render(
        <EuiAccordion id="role-region" role="region" />
      );

      expect(queryByRole('region')).toBeInTheDocument();
      expect(queryByRole('group')).not.toBeInTheDocument();
    });

    describe('buttonContentClassName', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion
            id={getId()}
            buttonContentClassName="button content class name"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('buttonContent', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion
            id={getId()}
            buttonContent={<div>Button content</div>}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('buttonProps', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} buttonProps={requiredProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      describe('paddingSize', () => {
        (['s', 'm', 'l'] as const).forEach((paddingSize) => {
          it(paddingSize, () => {
            const { container, getByTestSubject } = render(
              <EuiAccordion
                id={getId()}
                buttonProps={{ paddingSize, 'data-test-subj': 'button' }}
              />
            );
            expect(container.firstChild).toMatchSnapshot();
            expect(getByTestSubject('button').className).toContain(paddingSize);
          });
        });
      });

      describe('arrow padding affordance', () => {
        it('removes the padding next to the side the arrow is on', () => {
          const { getByTestSubject } = render(
            <EuiAccordion
              id={getId()}
              buttonProps={{ paddingSize: 'm', 'data-test-subj': 'button' }}
              arrowDisplay="right"
            />
          );
          expect(getByTestSubject('button').className).toContain('arrowRight');
        });

        it('does not remove any padding if no arrow is displayed', () => {
          const { getByTestSubject } = render(
            <EuiAccordion
              id={getId()}
              buttonProps={{ paddingSize: 'm', 'data-test-subj': 'button' }}
              arrowDisplay="none"
            />
          );
          const buttonClass = getByTestSubject('button').className;
          expect(buttonClass).not.toContain('arrowRight');
          expect(buttonClass).not.toContain('arrowLeft');
        });
      });
    });

    describe('buttonElement', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} buttonElement="div" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion
            id={getId()}
            extraAction={<button>Extra action</button>}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('initialIsOpen', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} initialIsOpen={true}>
            <p>You can see me.</p>
          </EuiAccordion>
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(container.firstChild).not.toHaveAttribute('inert');
      });
    });

    describe('arrowDisplay', () => {
      it('right is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} arrowDisplay="right" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('none is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} arrowDisplay="none" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('arrowProps', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} arrowProps={requiredProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('forceState', () => {
      it('closed is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} forceState="closed">
            <p>You can not see me</p>
          </EuiAccordion>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('open is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} forceState="open">
            <p>You can see me</p>
          </EuiAccordion>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('accepts and calls an optional callback on click', () => {
        const onToggleHandler = jest.fn();
        const { getAllByRole } = render(
          <EuiAccordion
            id={getId()}
            onToggle={onToggleHandler}
            forceState="closed"
          />
        );

        fireEvent.click(getAllByRole('button')[0]);
        expect(onToggleHandler).toHaveBeenCalled();
        expect(onToggleHandler).toHaveBeenCalledWith(true);
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const { container } = render(<EuiAccordion id={getId()} isLoading />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isLoadingMessage', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} isLoadingMessage="Please wait" isLoading />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('isDisabled', () => {
    it('is rendered', () => {
      const { container } = render(<EuiAccordion id={getId()} isDisabled />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    const expectAccordionClosed = () => {
      const button = document.querySelector('.euiAccordion__button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      const children = document.querySelector('.euiAccordion__childWrapper')!;
      expect(children.className).toContain('isClosed');
      expect(children).toHaveAttribute('inert', '');
    };

    const expectAccordionOpen = () => {
      const button = document.querySelector('.euiAccordion__button')!;
      expect(button).toHaveAttribute('aria-expanded', 'true');

      const children = document.querySelector('.euiAccordion__childWrapper')!;
      expect(children.className).toContain('isOpen');
      expect(children).not.toHaveAttribute('inert');
    };

    it('opens when clicked once', () => {
      const { getAllByRole } = render(
        <EuiAccordion id={getId()}>
          <p>You can see me.</p>
        </EuiAccordion>
      );

      fireEvent.click(getAllByRole('button')[0]);

      expectAccordionOpen();
    });

    it('does not open when isDisabled', () => {
      const { getAllByRole } = render(
        <EuiAccordion id={getId()} isDisabled>
          <p>You cannot see me.</p>
        </EuiAccordion>
      );

      fireEvent.click(getAllByRole('button')[0]);

      expectAccordionClosed();
    });

    it('opens when div is clicked if element is a div', () => {
      const { getAllByRole } = render(
        <EuiAccordion id={getId()} element="div">
          <p>You can see me.</p>
        </EuiAccordion>
      );

      fireEvent.click(getAllByRole('button')[0]);

      expectAccordionOpen();
    });

    it('closes when clicked twice', () => {
      const { getAllByRole } = render(
        <EuiAccordion id={getId()}>
          <p>You can not see me.</p>
        </EuiAccordion>
      );

      fireEvent.click(getAllByRole('button')[0]);
      fireEvent.click(getAllByRole('button')[0]);

      expectAccordionClosed();
    });

    it('accepts and calls an optional callback on open and close', () => {
      const onToggleHandler = jest.fn();
      const { getAllByRole } = render(
        <EuiAccordion id={getId()} onToggle={onToggleHandler} />
      );

      fireEvent.click(getAllByRole('button')[0]);
      expect(onToggleHandler).toHaveBeenCalled();
      expect(onToggleHandler).toHaveBeenCalledWith(true);

      fireEvent.click(getAllByRole('button')[0]);
      expect(onToggleHandler).toHaveBeenCalled();
      expect(onToggleHandler).toHaveBeenCalledWith(false);
    });
  });
});
