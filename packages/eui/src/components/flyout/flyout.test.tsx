/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiHeader } from '../header';
import {
  EuiFlyout,
  FLYOUT_PADDING_SIZES,
  FLYOUT_SIDES,
  FLYOUT_SIZES,
} from './flyout';
import { EuiProvider } from '../provider';
import { EuiFlyoutManager } from './manager';

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: ({ headerZindexLocation, maskRef, ...props }: any) => (
    <div {...props} ref={maskRef} />
  ),
}));

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: any }) => children,
}));

describe('EuiFlyout', () => {
  shouldRenderCustomStyles(
    <EuiFlyout {...requiredProps} onClose={() => {}} />,
    { childProps: ['closeButtonProps', 'maskProps'] }
  );

  test('is rendered', () => {
    const { baseElement } = render(
      <EuiFlyout {...requiredProps} onClose={() => {}} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders extra screen reader instructions when fixed EuiHeaders headers exist on the page', () => {
    const { baseElement, queryByText, rerender } = render(
      <>
        <EuiHeader position="fixed" />
        <EuiFlyout {...requiredProps} onClose={() => {}} />
      </>
    );

    expect(baseElement).toMatchSnapshot();
    expect(
      queryByText('You can still continue tabbing through', { exact: false })
    ).toBeTruthy();

    // Should not shard or render instructions when `includeFixedHeadersInFocusTrap={false}
    rerender(
      <>
        <EuiHeader position="fixed" />
        <EuiFlyout onClose={() => {}} includeFixedHeadersInFocusTrap={false} />
      </>
    );
    expect(
      queryByText('You can still continue tabbing through', {
        exact: false,
      })
    ).toBeFalsy();
  });

  it('renders extra screen reader instructions when specified selector exists on the page', () => {
    const { queryByText } = render(
      <>
        <div data-custom-sidebar />
        <EuiFlyout
          {...requiredProps}
          onClose={() => {}}
          includeSelectorInFocusTrap={'[data-custom-sidebar]'}
          includeFixedHeadersInFocusTrap={false}
        />
      </>
    );

    expect(
      queryByText('You can still continue tabbing through', { exact: false })
    ).toBeTruthy();
  });

  it('allows setting custom aria-describedby attributes', () => {
    const { getByTestSubject } = render(
      <>
        <EuiFlyout
          onClose={() => {}}
          aria-describedby="custom-test-id"
          data-test-subj="flyout"
        />
        <div id="custom-test-id" hidden>
          This flyout does X, Y, and Z
        </div>
      </>
    );
    expect(getByTestSubject('flyout')).toHaveAttribute(
      'aria-describedby',
      'generated-id custom-test-id'
    );
  });

  describe('aria-labelledby and flyout menu integration', () => {
    it('sets aria-labelledby when flyout has a menu with title', () => {
      const { getByTestSubject } = render(
        <EuiFlyout
          onClose={() => {}}
          flyoutMenuProps={{ title: 'Test Menu Title' }}
          data-test-subj="flyout"
        />
      );

      const flyout = getByTestSubject('flyout');
      const ariaLabelledBy = flyout.getAttribute('aria-labelledby');

      // Should have a generated ID for the menu title
      expect(ariaLabelledBy).toBeTruthy();
      expect(ariaLabelledBy).toMatch(/^generated-id/);
    });

    it('uses custom titleId when provided in flyoutMenuProps', () => {
      const customTitleId = 'my-custom-title-id';
      const { getByTestSubject } = render(
        <EuiFlyout
          onClose={() => {}}
          flyoutMenuProps={{
            title: 'Test Menu Title',
            titleId: customTitleId,
          }}
          data-test-subj="flyout"
        />
      );

      const flyout = getByTestSubject('flyout');
      expect(flyout).toHaveAttribute('aria-labelledby', customTitleId);
    });

    it('combines flyout menu ID with existing aria-labelledby', () => {
      const customTitleId = 'my-custom-title-id';
      const existingAriaLabelledBy = 'existing-label-id';

      const { getByTestSubject } = render(
        <EuiFlyout
          onClose={() => {}}
          flyoutMenuProps={{
            title: 'Test Menu Title',
            titleId: customTitleId,
          }}
          aria-labelledby={existingAriaLabelledBy}
          data-test-subj="flyout"
        />
      );

      const flyout = getByTestSubject('flyout');
      expect(flyout).toHaveAttribute(
        'aria-labelledby',
        `${customTitleId} ${existingAriaLabelledBy}`
      );
    });

    it('does not set aria-labelledby when flyout has no menu', () => {
      const { getByTestSubject } = render(
        <EuiFlyout onClose={() => {}} data-test-subj="flyout" />
      );

      const flyout = getByTestSubject('flyout');
      expect(flyout).not.toHaveAttribute('aria-labelledby');
    });

    it('only uses existing aria-labelledby when no menu is present', () => {
      const existingAriaLabelledBy = 'existing-label-id';

      const { getByTestSubject } = render(
        <EuiFlyout
          onClose={() => {}}
          aria-labelledby={existingAriaLabelledBy}
          data-test-subj="flyout"
        />
      );

      const flyout = getByTestSubject('flyout');
      expect(flyout).toHaveAttribute('aria-labelledby', existingAriaLabelledBy);
    });
  });

  describe('props', () => {
    test('hideCloseButton', () => {
      const { baseElement } = render(
        <EuiFlyout onClose={() => {}} hideCloseButton />
      );

      expect(baseElement).toMatchSnapshot();
    });

    test('closeButtonProps', () => {
      const { baseElement } = render(
        <EuiFlyout onClose={() => {}} closeButtonProps={requiredProps} />
      );

      expect(baseElement).toMatchSnapshot();
    });

    test('closeButtonPosition can be outside', () => {
      const { baseElement } = render(
        <EuiFlyout onClose={() => {}} closeButtonPosition="outside" />
      );

      expect(baseElement).toMatchSnapshot();
    });

    test('accepts div props', () => {
      const { baseElement } = render(
        <EuiFlyout onClose={() => {}} id="imaflyout" />
      );

      expect(baseElement).toMatchSnapshot();
    });

    describe('sides', () => {
      FLYOUT_SIDES.forEach((side) => {
        it(`${side} is rendered`, () => {
          const { baseElement } = render(
            <EuiFlyout onClose={() => {}} side={side} />
          );

          expect(baseElement).toMatchSnapshot();
        });
      });
    });

    describe('push flyouts', () => {
      it('renders', () => {
        const { getByTestSubject } = render(
          <EuiFlyout
            data-test-subj="flyout"
            onClose={() => {}}
            type="push"
            pushMinBreakpoint="xs"
          />
        );

        expect(getByTestSubject('flyout')).toMatchSnapshot();
      });

      it('can render with animations', () => {
        const { getByTestSubject } = render(
          <EuiFlyout
            data-test-subj="flyout"
            onClose={() => {}}
            type="push"
            pushMinBreakpoint="xs"
            pushAnimation={true}
          />
        );

        expect(getByTestSubject('flyout').className).not.toContain(
          'noAnimation'
        );
      });
    });

    test('is rendered as nav', () => {
      const { baseElement } = render(<EuiFlyout onClose={() => {}} as="nav" />);

      expect(baseElement).toMatchSnapshot();
    });

    describe('size', () => {
      FLYOUT_SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { baseElement } = render(
            <EuiFlyout onClose={() => {}} size={size} />
          );

          expect(baseElement).toMatchSnapshot();
        });
      });

      it('accepts custom number', () => {
        const { baseElement } = render(
          <EuiFlyout onClose={() => {}} size={500} />
        );

        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('paddingSize', () => {
      FLYOUT_PADDING_SIZES.forEach((paddingSize) => {
        it(`${paddingSize} is rendered`, () => {
          const { baseElement } = render(
            <EuiFlyout onClose={() => {}} paddingSize={paddingSize} />
          );

          expect(baseElement).toMatchSnapshot();
        });
      });
    });

    describe('maxWidth', () => {
      test('can be set to a default', () => {
        const { baseElement } = render(
          <EuiFlyout onClose={() => {}} maxWidth={true} />
        );

        expect(baseElement).toMatchSnapshot();
      });

      test('can be set to a custom number', () => {
        const { baseElement } = render(
          <EuiFlyout onClose={() => {}} maxWidth={1024} />
        );

        expect(baseElement).toMatchSnapshot();
      });

      test('can be set to a custom value and measurement', () => {
        const { baseElement } = render(
          <EuiFlyout onClose={() => {}} maxWidth="24rem" />
        );

        expect(baseElement).toMatchSnapshot();
      });
    });

    test('outsideClickCloses', () => {
      const { baseElement } = render(
        <EuiFlyout onClose={() => {}} outsideClickCloses />
      );

      expect(baseElement).toMatchSnapshot();
    });

    describe('ownFocus', () => {
      test('can be false', () => {
        const { baseElement } = render(
          <EuiFlyout onClose={() => {}} ownFocus={false} />
        );

        expect(baseElement).toMatchSnapshot();
      });

      test('can alter mask props with maskProps without throwing error', () => {
        const { baseElement } = render(
          <EuiFlyout
            onClose={() => {}}
            maskProps={{ headerZindexLocation: 'above' }}
          />
        );

        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('body class', () => {
      it('adds `.euiBody--hasFlyout` class on mount', () => {
        render(<EuiFlyout onClose={() => {}} />);
        expect(document.body).toHaveClass('euiBody--hasFlyout');
      });

      it('removes `.euiBody--hasFlyout` class on unmount', () => {
        const { unmount } = render(<EuiFlyout onClose={() => {}} />);
        unmount();
        expect(document.body).not.toHaveClass('euiBody--hasFlyout');
      });

      // Regression testing
      it('should not remove and re-add `.euiBody--hasFlyout` class on resize', async () => {
        const add = jest.spyOn(document.body.classList, 'add');
        const remove = jest.spyOn(document.body.classList, 'remove');
        const { rerender } = render(
          <EuiFlyout onClose={() => {}} size={500} />
        );

        expect(add).toHaveBeenCalledTimes(1);
        expect(add).toHaveBeenLastCalledWith('euiBody--hasFlyout');

        rerender(<EuiFlyout onClose={() => {}} size={600} />);
        expect(add).toHaveBeenCalledTimes(1);
        expect(remove).not.toHaveBeenCalled();
      });
    });
  });

  describe('component defaults', () => {
    test('includeSelectorInFocusTrap', () => {
      const { queryByText } = render(
        <EuiProvider
          componentDefaults={{
            EuiFlyout: {
              includeSelectorInFocusTrap: ['[data-custom-sidebar]'],
            },
          }}
        >
          <div data-custom-sidebar />
          <EuiFlyout {...requiredProps} onClose={() => {}} />
        </EuiProvider>,
        {
          wrapper: undefined,
        }
      );

      expect(
        queryByText('You can still continue tabbing through', { exact: false })
      ).toBeTruthy();
    });

    test('includeFixedHeadersInFocusTrap', () => {
      const { queryByText } = render(
        <EuiProvider
          componentDefaults={{
            EuiFlyout: {
              includeFixedHeadersInFocusTrap: false,
            },
          }}
        >
          <EuiHeader position="fixed" />
          <EuiFlyout {...requiredProps} onClose={() => {}} />
        </EuiProvider>,
        {
          wrapper: undefined,
        }
      );

      expect(
        queryByText('You can still continue tabbing through', { exact: false })
      ).not.toBeTruthy();
    });
  });

  describe('flyout routing logic', () => {
    it('routes to child flyout when session is undefined and there is an active session', () => {
      // First render with just the main flyout to establish a session
      const { rerender, getByTestSubject } = render(
        <EuiFlyoutManager>
          <EuiFlyout
            onClose={() => {}}
            session="start"
            flyoutMenuProps={{ title: 'Main Flyout' }}
            data-test-subj="main-flyout"
          />
        </EuiFlyoutManager>
      );

      // Now render with the child flyout added - it should detect the active session
      rerender(
        <EuiFlyoutManager>
          <EuiFlyout
            onClose={() => {}}
            session="start"
            flyoutMenuProps={{ title: 'Main Flyout' }}
            data-test-subj="main-flyout"
          />
          <EuiFlyout
            onClose={() => {}}
            data-test-subj="child-flyout"
            // session is undefined (not explicitly set)
          />
        </EuiFlyoutManager>
      );

      // Should render as child flyout (EuiFlyoutChild)
      const childFlyout = getByTestSubject('child-flyout');
      expect(childFlyout).toHaveAttribute('data-managed-flyout-level', 'child');
    });

    it('routes to main flyout when session is explicitly true', () => {
      const { getByTestSubject } = render(
        <EuiFlyoutManager>
          <EuiFlyout
            onClose={() => {}}
            data-test-subj="flyout"
            session="start" // Explicitly creating a new session
            flyoutMenuProps={{ title: 'Test Main Flyout' }} // Required for managed flyouts
          />
        </EuiFlyoutManager>
      );

      // Should render as main flyout (EuiFlyoutMain)
      const flyout = getByTestSubject('flyout');
      expect(flyout).toHaveAttribute('data-managed-flyout-level', 'main');
    });

    it('routes to standard flyout when session is explicitly "never" and there is an active session', () => {
      const { getByTestSubject } = render(
        <EuiFlyoutManager>
          {/* Create an active session */}
          <EuiFlyout
            onClose={() => {}}
            session="start"
            flyoutMenuProps={{ title: 'Main Flyout' }}
            data-test-subj="main-flyout"
          />
          {/* This flyout explicitly opts out of session management */}
          <EuiFlyout
            onClose={() => {}}
            data-test-subj="standard-flyout"
            session="never" // Explicitly opts out of session management
          />
        </EuiFlyoutManager>
      );

      // Should render as standard flyout (EuiFlyoutComponent)
      const flyout = getByTestSubject('standard-flyout');
      expect(flyout).not.toHaveAttribute('data-managed-flyout-level');
    });

    it('routes to child flyout when in managed context and there is an active session', () => {
      // First render with just the main flyout to establish a session
      const { rerender, getByTestSubject } = render(
        <EuiFlyoutManager>
          <EuiFlyout
            onClose={() => {}}
            session="start"
            flyoutMenuProps={{ title: 'Main Flyout' }}
            data-test-subj="main-flyout"
          />
        </EuiFlyoutManager>
      );

      // Now render with the child flyout added - it should detect the active session
      rerender(
        <EuiFlyoutManager>
          <EuiFlyout
            onClose={() => {}}
            session="start"
            flyoutMenuProps={{ title: 'Main Flyout' }}
            data-test-subj="main-flyout"
          />
          <EuiFlyout
            onClose={() => {}}
            data-test-subj="child-flyout"
            session={undefined} // Not explicitly set, should inherit
          />
        </EuiFlyoutManager>
      );

      // Should render as child flyout (EuiFlyoutChild)
      const flyout = getByTestSubject('child-flyout');
      expect(flyout).toHaveAttribute('data-managed-flyout-level', 'child');
    });

    it('routes to standard flyout when there is no active session', () => {
      const { getByTestSubject } = render(
        <EuiFlyout
          onClose={() => {}}
          data-test-subj="flyout"
          session={undefined} // Not explicitly set
        />
      );

      // Should render as standard flyout (EuiFlyoutComponent) - no manager context
      const flyout = getByTestSubject('flyout');
      expect(flyout).not.toHaveAttribute('data-managed-flyout-level');
    });
  });
});
