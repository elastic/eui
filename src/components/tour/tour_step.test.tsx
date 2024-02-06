/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiTourStep } from './tour_step';

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: any) => children,
}));

const steps = [
  {
    step: 1,
    content: 'You are here',
  },
];

const config = {
  onFinish: () => {},
  stepsTotal: 1,
  title: 'A demo',
};

const props = { ...config, ...steps[0], ...requiredProps };

describe('EuiTourStep', () => {
  shouldRenderCustomStyles(
    <EuiTourStep {...props} isStepOpen>
      <span>Test</span>
    </EuiTourStep>
  );
  shouldRenderCustomStyles(
    <EuiTourStep {...config} {...steps[0]} isStepOpen>
      <span>Test</span>
    </EuiTourStep>,
    {
      childProps: ['panelProps'],
      skip: {
        parentTest: true,
        style: true, // EuiPopoverPanel does not allow custom `style`s
      },
    }
  );

  it('renders', () => {
    const { baseElement } = render(
      <EuiTourStep {...props} isStepOpen>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('can have subtitle', () => {
    const { getByText } = render(
      <EuiTourStep {...props} isStepOpen subtitle="Subtitle">
        <span>Test</span>
      </EuiTourStep>
    );

    expect(getByText('Subtitle')).toBeInTheDocument();
  });

  it('can be closed', () => {
    const { container } = render(
      <EuiTourStep {...props} isStepOpen={false}>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(container.querySelector('.euiTour')).not.toBeInTheDocument();
  });

  it('can change the minWidth and maxWidth', () => {
    const { container } = render(
      <EuiTourStep {...props} minWidth={240} maxWidth={420} isStepOpen>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(
      container.querySelector('.euiTour__content')?.parentElement
    ).toHaveStyle({
      'min-inline-size': '240px',
      'max-inline-size': '420px',
    });
  });

  it('can override the footer action', () => {
    const { queryByText, rerender } = render(
      <EuiTourStep {...props} isStepOpen>
        <span>Test</span>
      </EuiTourStep>
    );
    expect(queryByText('Close tour')).toBeInTheDocument();

    rerender(
      <EuiTourStep
        {...props}
        isStepOpen
        footerAction={<button onClick={() => {}}>Custom footer</button>}
      >
        <span>Test</span>
      </EuiTourStep>
    );
    expect(queryByText('Close tour')).not.toBeInTheDocument();
    expect(queryByText('Custom footer')).toBeInTheDocument();
  });

  it('accepts an array of buttons in the footerAction prop', () => {
    const { getByText } = render(
      <EuiTourStep
        {...props}
        isStepOpen
        footerAction={[
          <button onClick={() => {}}>Button 1</button>,
          <button onClick={() => {}}>Button 2</button>,
        ]}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(getByText('Button 1')).toBeInTheDocument();
    expect(getByText('Button 2')).toBeInTheDocument();
  });

  it('can turn off the beacon', () => {
    const { container, rerender } = render(
      <EuiTourStep {...props} isStepOpen>
        <span>Test</span>
      </EuiTourStep>
    );
    expect(container.querySelector('.euiTour__beacon')).toBeInTheDocument();

    rerender(
      <EuiTourStep {...props} isStepOpen decoration="none">
        <span>Test</span>
      </EuiTourStep>
    );
    expect(container.querySelector('.euiTour__beacon')).not.toBeInTheDocument();
  });

  it('applies classNames and styles to the correct locations', () => {
    const TestTour = ({ isStepOpen }: { isStepOpen?: boolean }) => (
      <EuiTourStep
        {...props}
        className="goesOnAnchor"
        style={{ color: 'blue' }}
        panelClassName="goesOnPopover"
        panelStyle={{ color: 'red' }}
        isStepOpen={isStepOpen}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    const { container, rerender } = render(<TestTour />);

    expect(container.querySelector('.goesOnPopover')).not.toBeInTheDocument();
    expect(container.querySelector('.goesOnAnchor')).toBeInTheDocument();
    expect(container.querySelector('.goesOnAnchor')).toHaveStyle({
      color: 'blue',
    });

    rerender(<TestTour isStepOpen />);
    expect(container.querySelector('.goesOnPopover')).toBeInTheDocument();
    expect(container.querySelector('.goesOnPopover')).toHaveStyle({
      color: 'red',
    });
  });
});
