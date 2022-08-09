/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { FunctionComponent } from 'react';

import { EuiProvider } from '../../components/provider';
import { _EuiThemeBreakpoint } from '../../global_styling/variables/breakpoint';
import {
  useIsWithinBreakpoints,
  useIsWithinMaxBreakpoint,
  useIsWithinMinBreakpoint,
} from './is_within_hooks';

describe('useIsWithinBreakpoints', () => {
  const MockComponent: FunctionComponent<{
    sizes: _EuiThemeBreakpoint[];
    isResponsive?: boolean;
  }> = ({ sizes, isResponsive }) => {
    const isWithinBreakpoints = useIsWithinBreakpoints(sizes, isResponsive);
    return isWithinBreakpoints ? <strong data-test-subj>true</strong> : null;
  };

  it('returns true if the current breakpoint size is in the passed sizes array', () => {
    cy.viewport(300, 600);
    cy.mount(
      <EuiProvider>
        <MockComponent sizes={['xs', 's', 'm']} />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('exist');
  });

  it('returns false if the current breakpoint size is outside the passed sizes array', () => {
    cy.viewport(1400, 600);
    cy.mount(
      <EuiProvider>
        <MockComponent sizes={['xs', 's', 'm']} />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('not.exist');
  });

  it('returns false always if isResponsive is passed as false', () => {
    cy.viewport(300, 600);
    cy.mount(
      <EuiProvider>
        <MockComponent sizes={['xs', 's', 'm']} isResponsive={false} />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('not.exist');
  });

  it('correctly handles custom breakpoint sizes', () => {
    cy.viewport(1500, 600);
    cy.mount(
      <EuiProvider
        modify={{
          breakpoint: {
            xs: 0,
            s: 500,
            m: 1000,
            l: 1500,
            xl: 2000,
          },
        }}
      >
        <MockComponent sizes={['l']} />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('exist');
  });
});

describe('useIsWithinMaxBreakpoint', () => {
  const MockComponent: FunctionComponent<{
    size: _EuiThemeBreakpoint;
  }> = ({ size }) => {
    const isWithinMaxBreakpoint = useIsWithinMaxBreakpoint(size);
    return isWithinMaxBreakpoint ? <strong data-test-subj>true</strong> : null;
  };

  it('returns true if the current breakpoint size is smaller than the passed max size', () => {
    cy.viewport(300, 600);
    cy.mount(
      <EuiProvider>
        <MockComponent size="m" />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('exist');
  });

  it('returns false if the current breakpoint size is larger than the passed max size', () => {
    cy.viewport(1400, 600);
    cy.mount(
      <EuiProvider>
        <MockComponent size="m" />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('not.exist');
  });

  it('correctly handles custom breakpoint sizes', () => {
    cy.viewport(1400, 600);
    cy.mount(
      <EuiProvider
        modify={{
          breakpoint: {
            m: 1500,
            l: 1800,
            xl: 2000,
          },
        }}
      >
        <MockComponent size="m" />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('exist');
  });
});

describe('useIsWithinMinBreakpoint', () => {
  const MockComponent: FunctionComponent<{
    size: _EuiThemeBreakpoint;
  }> = ({ size }) => {
    const isWithinMinBreakpoint = useIsWithinMinBreakpoint(size);
    return isWithinMinBreakpoint ? <strong data-test-subj>true</strong> : null;
  };

  it('returns true if the current breakpoint size is larger than the passed min size', () => {
    cy.viewport(800, 600);
    cy.mount(
      <EuiProvider>
        <MockComponent size="m" />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('exist');
  });

  it('returns false if the current breakpoint size is smaller than the passed min size', () => {
    cy.viewport(600, 600);
    cy.mount(
      <EuiProvider>
        <MockComponent size="m" />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('not.exist');
  });

  it('correctly handles custom breakpoint sizes', () => {
    cy.viewport(600, 600);
    cy.mount(
      <EuiProvider
        modify={{
          breakpoint: {
            m: 600,
            l: 800,
            xl: 1000,
          },
        }}
      >
        <MockComponent size="m" />
      </EuiProvider>
    );
    cy.get('[data-test-subj]').should('exist');
  });
});
