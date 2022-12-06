/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiSideNav } from './side_nav';
import { EuiIcon } from '../icon';
import { htmlIdGenerator } from '../../services';

describe('EuiSideNav', () => {
  describe('Mobile EuiSideNav', () => {
    const MobileSideNav = () => {
      const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);
      const toggleOpenOnMobile = () => {
        setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
      };
      const basicSideNav = [
        {
          name: 'Root item',
          id: htmlIdGenerator('basicExample')(),
          items: [
            {
              name: 'Item with onClick',
              id: htmlIdGenerator('basicExample')(),
            },
            {
              name: 'Item with href',
              id: htmlIdGenerator('basicExample')(),
              href: '/#/navigation/side-nav',
            },
            {
              name: 'Selected item',
              id: htmlIdGenerator('basicExample')(),
              isSelected: true,
            },
            {
              name: 'Disabled item',
              id: htmlIdGenerator('basicExample')(),
              disabled: true,
            },
          ],
        },
      ];

      return (
        <EuiSideNav
          aria-label="Basic example"
          mobileTitle="Basic example"
          toggleOpenOnMobile={() => toggleOpenOnMobile()}
          isOpenOnMobile={isSideNavOpenOnMobile}
          style={{ width: 192 }}
          items={basicSideNav}
        />
      );
    };

    beforeEach(() => {
      cy.viewport(375, 667); // small breakpoint
      cy.mount(<MobileSideNav />);
    });

    describe('Automated accessibility check', () => {
      it('has zero violations when mobile side nav is rendered', () => {
        cy.checkAxe();
      });

      it('has zero violations when mobile side nav is expanded', () => {
        cy.get('button').contains('Basic example').realClick();
        cy.get('div.euiSideNav__content').should('exist');
        cy.checkAxe();
      });
    });
  });

  describe('Simple EuiSideNav', () => {
    const SimpleSideNav = () => {
      const basicSideNav = [
        {
          name: 'Root item',
          id: htmlIdGenerator('basicExample')(),
          items: [
            {
              name: 'Item with onClick',
              id: htmlIdGenerator('basicExample')(),
            },
            {
              name: 'Item with href',
              id: htmlIdGenerator('basicExample')(),
              href: '/#/navigation/side-nav',
            },
            {
              name: 'Selected item',
              id: htmlIdGenerator('basicExample')(),
              isSelected: true,
            },
            {
              name: 'Disabled item',
              id: htmlIdGenerator('basicExample')(),
              disabled: true,
            },
          ],
        },
      ];

      return (
        <EuiSideNav
          aria-label="Basic example"
          style={{ width: 192 }}
          items={basicSideNav}
        />
      );
    };

    beforeEach(() => {
      cy.viewport(768, 1024); // medium breakpoint
      cy.mount(<SimpleSideNav />);
      cy.get('nav.euiSideNav').should('exist');
    });

    describe('Automated accessibility check', () => {
      it('has zero violations when rendered using non-mobile breakpoint', () => {
        cy.get('nav.euiSideNav').should('exist');
        cy.checkAxe();
      });
    });
  });

  describe('Nested EuiSideNav', () => {
    const NestedSideNav = () => {
      const nestedSideNav = [
        {
          name: 'Kibana',
          id: 'kibana-1',
          icon: <EuiIcon type="logoKibana" />,
          isSelected: false,
          items: [
            {
              name: 'Has normal children',
              id: 'has-normal-children-1',
              isSelected: false,
            },
            {
              name: 'Normally not open',
              id: 'normally-not-open-1',
              isSelected: false,
              items: [
                {
                  name: 'Open by override',
                  id: 'open-by-override-1',
                  isSelected: false,
                  forceOpen: true,
                  items: [
                    {
                      name: 'Child 3',
                      id: 'child-3-1',
                      isSelected: true,
                    },
                    {
                      name: 'Child 4',
                      id: 'child-4-1',
                      isSelected: false,
                    },
                    {
                      name: 'Child 5',
                      id: 'child-5-1',
                      isSelected: false,
                    },
                    {
                      name: 'Child 6',
                      id: 'child-6-1',
                      isSelected: false,
                      disabled: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'Has expanded children',
              id: 'has-expanded-children-1',
              isSelected: false,
              forceOpen: true,
              items: [
                {
                  name: 'Child 7',
                  id: 'child-7-1',
                  isSelected: false,
                },
              ],
            },
          ],
        },
      ];

      return (
        <EuiSideNav
          aria-label="Force-open example"
          items={nestedSideNav}
          style={{ width: 192 }}
        />
      );
    };

    beforeEach(() => {
      cy.viewport(768, 1024); // medium breakpoint
      cy.mount(<NestedSideNav />);
      cy.get('nav.euiSideNav').should('exist');
    });

    describe('Automated accessibility check', () => {
      it('has zero violations when complex side nav is rendered', () => {
        cy.checkAxe();
      });
    });
  });

  describe('Complex EuiSideNav', () => {
    const ComplexSideNav = () => {
      const complexSideNav = [
        {
          name: 'Elasticsearch',
          id: 'elasticsearch-1',
          icon: <EuiIcon type="logoElasticsearch" />,
          isSelected: false,
          items: [
            {
              name: 'Data sources',
              id: 'data-sources-1',
              isSelected: false,
            },
            {
              name: 'Users',
              id: 'users-1',
              isSelected: false,
            },
            {
              name: 'Roles',
              id: 'roles-1',
              isSelected: false,
            },
            {
              name: 'Watches',
              id: 'watches-1',
              isSelected: false,
            },
            {
              name:
                'Extremely long title will become truncated when the browser is narrow enough',
              id: 'extremely-long-title-1',
              isSelected: false,
            },
          ],
        },
        {
          name: 'Kibana',
          id: 'kibana-1',
          icon: <EuiIcon type="logoKibana" />,
          isSelected: false,
          items: [
            {
              name: 'Advanced settings',
              id: 'advanced-settings-1',
              isSelected: false,
              items: [
                {
                  name: 'General',
                  id: 'general-1',
                  isSelected: false,
                  disabled: true,
                },
                {
                  name: 'Timelion',
                  id: 'timelino-1',
                  isSelected: false,
                  items: [
                    {
                      name: 'Time stuff',
                      id: 'time-stuff-1',
                      icon: <EuiIcon type="clock" />,
                      isSelected: true,
                    },
                    {
                      name: 'Lion stuff',
                      id: 'lion-stuff-1',
                      icon: <EuiIcon type="stats" />,
                      isSelected: false,
                    },
                  ],
                },
                {
                  name: 'Visualizations',
                  id: 'visualizations-1',
                  isSelected: false,
                },
              ],
            },
            {
              name: 'Index patterns',
              id: 'index-patterns-1',
              isSelected: false,
            },
            {
              name: 'Saved objects',
              id: 'saved-objects-1',
              isSelected: false,
            },
            {
              name: 'Reporting',
              id: 'reporting-1',
              isSelected: false,
            },
          ],
        },
        {
          name: 'Logstash',
          id: 'logstash-1',
          icon: <EuiIcon type="logoLogstash" />,
          isSelected: false,
          items: [
            {
              name: 'Pipeline viewer',
              id: 'data-sources-1',
              isSelected: false,
            },
          ],
        },
      ];

      return (
        <EuiSideNav
          aria-label="Complex example"
          items={complexSideNav}
          style={{ width: 192 }}
        />
      );
    };

    beforeEach(() => {
      cy.viewport(768, 1024); // medium breakpoint
      cy.mount(<ComplexSideNav />);
      cy.get('nav.euiSideNav').should('exist');
    });

    describe('Automated accessibility check', () => {
      it('has zero violations when complex side nav is rendered', () => {
        cy.checkAxe();
      });
    });
  });
});
