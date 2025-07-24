/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { render } from '../../test/rtl';
import { requiredProps, takeMountedSnapshot } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiHeader } from '../header';
import { EuiFlyout, SIZES, PADDING_SIZES, SIDES } from './flyout';
import { EuiProvider } from '../provider';

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
    const component = mount(
      <EuiFlyout {...requiredProps} onClose={() => {}} />
    );

    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
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

  describe('props', () => {
    test('hideCloseButton', () => {
      const component = mount(<EuiFlyout onClose={() => {}} hideCloseButton />);

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    test('closeButtonProps', () => {
      const component = mount(
        <EuiFlyout onClose={() => {}} closeButtonProps={requiredProps} />
      );

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    test('closeButtonPosition can be outside', () => {
      const component = mount(
        <EuiFlyout onClose={() => {}} closeButtonPosition="outside" />
      );

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    test('accepts div props', () => {
      const component = mount(<EuiFlyout onClose={() => {}} id="imaflyout" />);

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    describe('sides', () => {
      SIDES.forEach((side) => {
        it(`${side} is rendered`, () => {
          const component = mount(<EuiFlyout onClose={() => {}} side={side} />);

          expect(
            takeMountedSnapshot(component, { hasArrayOutput: true })
          ).toMatchSnapshot();
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
      const component = mount(<EuiFlyout onClose={() => {}} as="nav" />);

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const component = mount(<EuiFlyout onClose={() => {}} size={size} />);

          expect(
            takeMountedSnapshot(component, { hasArrayOutput: true })
          ).toMatchSnapshot();
        });
      });

      it('accepts custom number', () => {
        const component = mount(<EuiFlyout onClose={() => {}} size={500} />);

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((paddingSize) => {
        it(`${paddingSize} is rendered`, () => {
          const component = mount(
            <EuiFlyout onClose={() => {}} paddingSize={paddingSize} />
          );

          expect(
            takeMountedSnapshot(component, { hasArrayOutput: true })
          ).toMatchSnapshot();
        });
      });
    });

    describe('maxWidth', () => {
      test('can be set to a default', () => {
        const component = mount(
          <EuiFlyout onClose={() => {}} maxWidth={true} />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });

      test('can be set to a custom number', () => {
        const component = mount(
          <EuiFlyout onClose={() => {}} maxWidth={1024} />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });

      test('can be set to a custom value and measurement', () => {
        const component = mount(
          <EuiFlyout onClose={() => {}} maxWidth="24rem" />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });
    });

    test('outsideClickCloses', () => {
      const component = mount(
        <EuiFlyout onClose={() => {}} outsideClickCloses />
      );

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    describe('ownFocus', () => {
      test('can be false', () => {
        const component = mount(
          <EuiFlyout onClose={() => {}} ownFocus={false} />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });

      test('can alter mask props with maskProps without throwing error', () => {
        const component = mount(
          <EuiFlyout
            onClose={() => {}}
            maskProps={{ headerZindexLocation: 'above' }}
          />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
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
});
