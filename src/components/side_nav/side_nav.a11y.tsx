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

const SimpleSideNav = () => {
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

const ComplexSideNav = () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Time stuff');

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name) => {
    setSelectedItem(name);
  };

  const createItem = (name, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: `${name}-id`,
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const complexSideNav = [
    createItem('Elasticsearch', {
      onClick: undefined,
      icon: <EuiIcon type="logoElasticsearch" />,
      items: [
        createItem('Data sources'),
        createItem('Users'),
        createItem('Roles'),
        createItem('Watches'),
        createItem(
          'Extremely long title will become truncated when the browser is narrow enough'
        ),
      ],
    }),
    createItem('Kibana', {
      onClick: undefined,
      icon: <EuiIcon type="logoKibana" />,
      items: [
        createItem('Advanced settings', {
          items: [
            createItem('General', { disabled: true }),
            createItem('Timelion', {
              items: [
                createItem('Time stuff', {
                  icon: <EuiIcon type="clock" />,
                }),
                createItem('Lion stuff', {
                  icon: <EuiIcon type="stats" />,
                }),
              ],
            }),
            createItem('Visualizations'),
          ],
        }),
        createItem('Index Patterns'),
        createItem('Saved Objects'),
        createItem('Reporting'),
      ],
    }),
    createItem('Logstash', {
      onClick: undefined,
      icon: <EuiIcon type="logoLogstash" />,
      items: [createItem('Pipeline viewer')],
    }),
  ];

  return (
    <EuiSideNav
      aria-label="Complex example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={complexSideNav}
      style={{ width: 192 }}
    />
  );
};

const NestedSideNav = () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState(null);

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name) => {
    setSelectedItem(name);
  };

  const createItem = (name, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: name,
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const nestedSideNav = [
    {
      name: 'Kibana',
      id: 'Kibana',
      icon: <EuiIcon type="logoKibana" />,
      items: [
        createItem('Has normal children', {
          items: [
            createItem('Without forceOpen', {
              items: [createItem('Child 1'), createItem('Child 2')],
            }),
          ],
        }),
        createItem('Normally not open', {
          items: [
            createItem('Has forceOpen:true', {
              forceOpen: true,
              items: [createItem('Child 3'), createItem('Child 4')],
            }),
          ],
        }),
        createItem('With forceOpen:true', {
          forceOpen: true,
          items: [
            createItem('Normal child', {
              items: [createItem('Child 5'), createItem('Child 6')],
            }),
          ],
        }),
        createItem('Children only, no link', {
          onClick: undefined,
          items: [
            createItem('Another child', {
              items: [createItem('Child 7'), createItem('Child 8')],
            }),
          ],
        }),
      ],
    },
  ];

  return (
    <EuiSideNav
      aria-label="Force-open example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={nestedSideNav}
      style={{ width: 192 }}
    />
  );
};

describe('Simple EuiSidenav', () => {
  beforeEach(() => {
    cy.mount(<SimpleSideNav />);
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when mobile side nav is rendered', () => {
      cy.checkAxe();
    });

    it('has zero violations when mobile side nav is expanded', () => {
      cy.get('button').contains('Basic example').click();
      cy.get('div.euiSideNav__content').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when rendered using non-mobile breakpoint', () => {
      cy.viewport('ipad-2');
      cy.get('nav.euiSideNav').should('exist');
      cy.checkAxe();
    });
  });
});

describe('Complex EuiSidenav', () => {
  beforeEach(() => {
    cy.viewport('ipad-2');
    cy.mount(<ComplexSideNav />);
    cy.get('nav.euiSideNav').should('exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when complex side nav is rendered', () => {
      cy.checkAxe();
    });
  });
});

describe('Nested EuiSidenav', () => {
  beforeEach(() => {
    cy.viewport('ipad-2');
    cy.mount(<NestedSideNav />);
    cy.get('nav.euiSideNav').should('exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations when complex side nav is rendered', () => {
      cy.checkAxe();
    });
  });
});
