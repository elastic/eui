/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../cypress/support" />

import React, {
  useState,
  useEffect,
  FunctionComponent,
  PropsWithChildren,
} from 'react';

import { EuiPortal, EuiPortalProps } from './portal';

describe('EuiPortal', () => {
  describe('insertion', () => {
    it('inserts at the bottom of body by default', () => {
      cy.realMount(<EuiPortal>Hello</EuiPortal>);

      // verify the portal element was appended to the body
      cy.get('div[data-euiportal]').then((portals) => {
        expect(portals).to.have.lengthOf(1);
        expect(portals.get(0)).to.equal(document.body.lastElementChild);
      });
    });

    it('inserts before a specified element', () => {
      const Wrapper = () => {
        const [siblingRef, setSiblingRef] = useState<HTMLElement | null>(null);
        return (
          <>
            <div id="sibling" ref={setSiblingRef} />
            {siblingRef && (
              <EuiPortal insert={{ sibling: siblingRef, position: 'before' }}>
                Hello
              </EuiPortal>
            )}
          </>
        );
      };
      cy.realMount(<Wrapper />);

      // verify the portal element was appended before the sibling
      cy.get('div[data-euiportal]').then((portals) => {
        cy.get('div#sibling').then((siblings) => {
          expect(portals).to.have.lengthOf(1);
          expect(siblings).to.have.lengthOf(1);
          expect(siblings.get(0).previousElementSibling).to.equal(
            portals.get(0)
          );
        });
      });
    });

    it('inserts after a specified element', () => {
      const Wrapper = () => {
        const [siblingRef, setSiblingRef] = useState<HTMLElement | null>(null);
        return (
          <>
            <div id="sibling" ref={setSiblingRef} />
            {siblingRef && (
              <EuiPortal insert={{ sibling: siblingRef, position: 'after' }}>
                Hello
              </EuiPortal>
            )}
          </>
        );
      };
      cy.realMount(<Wrapper />);

      // verify the portal element was appended after the sibling
      cy.get('div[data-euiportal]').then((portals) => {
        cy.get('div#sibling').then((siblings) => {
          expect(portals).to.have.lengthOf(1);
          expect(siblings).to.have.lengthOf(1);
          expect(siblings.get(0).nextElementSibling).to.equal(portals.get(0));
        });
      });
    });

    // This is not currently true of the EuiPortal class component, but may be true
    // if we convert to a function component with useEffect dependencies in the future
    it.skip('insert value can be changed', () => {
      const Wrapper = () => {
        const [siblingRef, setSiblingRef] = useState<HTMLElement | null>(null);
        const [insert, setInsert] =
          useState<EuiPortalProps['insert']>(undefined);

        return (
          <>
            <div id="sibling" ref={setSiblingRef} />
            {siblingRef && (
              <>
                <EuiPortal insert={insert}>Hello</EuiPortal>
                <button
                  onClick={() =>
                    setInsert({ sibling: siblingRef, position: 'after' })
                  }
                >
                  change insertion
                </button>
              </>
            )}
          </>
        );
      };
      cy.realMount(<Wrapper />);

      // verify the portal element was appended to the body
      cy.get('div[data-euiportal]').then((portals) => {
        expect(portals).to.have.lengthOf(1);
        expect(portals.get(0)).to.equal(document.body.lastElementChild);
      });

      cy.contains('change insertion').click();

      // verify the portal element is now appended after the sibling
      cy.get('div[data-euiportal]').then((portals) => {
        cy.get('div#sibling').then((siblings) => {
          expect(portals).to.have.lengthOf(1);
          expect(siblings).to.have.lengthOf(1);
          expect(siblings.get(0).nextElementSibling).to.equal(portals.get(0));
        });
      });
    });

    describe('`insert` inherited from EuiProvider.componentDefaults', () => {
      const sibling = document.createElement('div');
      sibling.id = 'sibling';

      const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
          document.body.appendChild(sibling);
          setMounted(true);
        }, []);

        return <>{mounted && children}</>;
      };

      it('allows configuring the default `insert` for all EuiPortal components', () => {
        cy.mount(
          <Wrapper>
            <EuiPortal>Hello</EuiPortal>
            <EuiPortal>World</EuiPortal>
          </Wrapper>,
          {
            providerProps: {
              componentDefaults: {
                EuiPortal: { insert: { sibling, position: 'before' } },
              },
            },
          }
        );

        // verify all portal elements were appended before the sibling
        cy.get('div[data-euiportal]').then((portals) => {
          cy.get('div#sibling').then((siblings) => {
            expect(portals).to.have.lengthOf(2);
            expect(siblings).to.have.lengthOf(1);
            const beforeSibling = siblings.get(0).previousElementSibling;
            expect(beforeSibling).to.equal(portals.get(1));
            expect(beforeSibling?.previousElementSibling).to.equal(
              portals.get(0)
            );
          });
        });
      });

      it('still allows overriding defaults via component props', () => {
        cy.mount(
          <Wrapper>
            <EuiPortal>Hello</EuiPortal>
            <EuiPortal insert={{ sibling: sibling, position: 'after' }}>
              World
            </EuiPortal>
          </Wrapper>,
          {
            providerProps: {
              componentDefaults: {
                EuiPortal: { insert: { sibling: sibling, position: 'before' } },
              },
            },
          }
        );

        // verify portal elements were appended before and after the sibling
        cy.get('div[data-euiportal]').then((portals) => {
          cy.get('div#sibling').then((siblings) => {
            expect(portals).to.have.lengthOf(2);
            expect(siblings).to.have.lengthOf(1);
            expect(siblings.get(0).previousElementSibling).to.equal(
              portals.get(0)
            );
            expect(siblings.get(0).nextElementSibling).to.equal(portals.get(1));
          });
        });
      });
    });
  });
});
