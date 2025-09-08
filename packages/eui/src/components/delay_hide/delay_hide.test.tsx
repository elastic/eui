/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { act } from '@testing-library/react';
import { EuiDelayHide } from './index';

const actAdvanceTimersByTime = (time: number) =>
  act(() => jest.advanceTimersByTime(time));

describe('when EuiDelayHide is visible initially', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  function getWrapper() {
    return render(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
  }

  test('it should be visible initially', async () => {
    const { container, rerender } = getWrapper();
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);
  });

  test('it should be visible after 900ms', () => {
    const { container, rerender } = getWrapper();
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    actAdvanceTimersByTime(900);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);
  });

  test('it should be hidden after 1100ms', () => {
    const { container, rerender } = getWrapper();
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    actAdvanceTimersByTime(1100);
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    ); // Re-render to trigger hide
    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });

  test('it should be visible after 1100ms regardless of prop changes in-between', () => {
    const { container, rerender } = getWrapper();
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    rerender(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    actAdvanceTimersByTime(1100);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);
  });

  test('it should hide immediately after prop change, if it has been displayed for 1100ms', () => {
    const { container, rerender } = getWrapper();
    const currentTime = Date.now();
    actAdvanceTimersByTime(1100);
    jest.spyOn(Date, 'now').mockReturnValue(currentTime + 1100);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);

    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });
});

describe('when EuiDelayHide parent updates', () => {
  it('should still hide correctly', () => {
    jest.useFakeTimers();
    const { container, rerender } = render(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    rerender(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    actAdvanceTimersByTime(1100);
    rerender(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    ); // simulate parent component re-rendering
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    actAdvanceTimersByTime(1100);

    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });
});

describe('when EuiDelayHide is hidden initially', () => {
  function getWrapper() {
    jest.useFakeTimers();
    const { container, rerender } = render(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    return { container, rerender };
  }

  test('it should be hidden initially', async () => {
    const { container } = getWrapper();
    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });

  test('it should become visible immediately after prop change', async () => {
    const { container, rerender } = getWrapper();
    rerender(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);
  });

  test('it should be visible for at least 1100ms before hiding', async () => {
    const { container, rerender } = getWrapper();
    rerender(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    actAdvanceTimersByTime(900);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);

    actAdvanceTimersByTime(200);
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });
});

describe('when EuiDelayHide is visible initially and has a minimumDuration of 2000ms ', () => {
  function getWrapper() {
    jest.useFakeTimers();
    const { container, rerender } = render(
      <EuiDelayHide
        hide={false}
        minimumDuration={2000}
        render={() => <div>Hello World</div>}
      />
    );
    rerender(
      <EuiDelayHide
        hide={true}
        minimumDuration={2000}
        render={() => <div>Hello World</div>}
      />
    );
    return { container, rerender };
  }

  test('it should be visible initially', async () => {
    const { container } = getWrapper();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);
  });

  test('it should be visible after 1900ms', () => {
    const { container } = getWrapper();
    jest.advanceTimersByTime(1900);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);
  });

  test('it should be hidden after 2100ms', () => {
    const { container, rerender } = getWrapper();
    actAdvanceTimersByTime(2100);
    rerender(
      <EuiDelayHide
        hide={true}
        minimumDuration={2000}
        render={() => <div>Hello World</div>}
      />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });
});

describe('when EuiDelayHide has been visible and become hidden', () => {
  it('should still be visible for the minimum duration the second time', () => {
    jest.useFakeTimers();
    const { container, rerender } = render(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    rerender(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    actAdvanceTimersByTime(1100);
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
    actAdvanceTimersByTime(100);
    rerender(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello World
      </div>
    `);

    actAdvanceTimersByTime(1100);
    rerender(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    ); // Re-render to trigger hide

    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });
});
