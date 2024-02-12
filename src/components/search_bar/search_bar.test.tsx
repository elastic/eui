/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { fireEvent, act } from '@testing-library/react';

import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import { keys } from '../../services';

import { EuiSearchBar } from './search_bar';
import { Query } from './query';
import { SearchFilterConfig } from './search_filters';

describe('SearchBar', () => {
  test('render - no config, no query', () => {
    const props = {
      ...requiredProps,
      onChange: () => {},
    };

    const { container } = render(<EuiSearchBar {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('render - tools', () => {
    const props = {
      ...requiredProps,
      onChange: () => {},
      toolsLeft: <div>Left</div>,
      toolsRight: <div>Right</div>,
    };

    const { container } = render(<EuiSearchBar {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('render - box', () => {
    const props = {
      box: {
        placeholder: 'find something...',
        incremental: false,
        ...requiredProps,
      },
      onChange: () => {},
    };

    const { container } = render(<EuiSearchBar {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('render - provided query, filters', async () => {
    const filters: SearchFilterConfig[] = [
      {
        type: 'is',
        field: 'open',
        name: 'Open',
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: () => Promise.resolve([]),
      },
    ];

    const props = {
      ...requiredProps,
      filters,
      query: 'this is a query',
      onChange: () => {},
    };

    const { container, findByTitle } = render(<EuiSearchBar {...props} />);

    // Wait for FieldValueSelectionFilter to finish updating its state on init
    await findByTitle('Tag');

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('controlled input', () => {
    test('calls onChange callback when the query is modified', () => {
      const onChange = jest.fn();

      const { getByTestSubject } = render(
        <EuiSearchBar
          query="status:active"
          onChange={onChange}
          box={{ 'data-test-subj': 'searchbar' }}
        />
      );

      fireEvent.keyUp(getByTestSubject('searchbar'), {
        key: keys.ENTER,
        target: { value: 'status:inactive' },
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [[{ query, queryText }]] = onChange.mock.calls;
      expect(query).toBeInstanceOf(Query);
      expect(queryText).toBe('status:inactive');
    });
  });

  describe('hint', () => {
    test('renders a hint below the search bar on focus', () => {
      const { getByTestSubject, queryByTestSubject } = render(
        <EuiSearchBar
          query="status:active"
          box={{ 'data-test-subj': 'searchbar' }}
          hint={{
            content: <span data-test-subj="myHint">Hello from hint</span>,
          }}
        />
      );

      expect(queryByTestSubject('myHint')).toBeNull();

      act(() => {
        fireEvent.focus(getByTestSubject('searchbar'));
      });

      expect(queryByTestSubject('myHint')).toBeInTheDocument();
      expect(queryByTestSubject('myHint')).toHaveTextContent('Hello from hint');
    });

    test('control the visibility of the hint', () => {
      const TestComp = () => {
        const [isHintVisible, setIsHintVisible] = useState(false);

        return (
          <>
            <EuiSearchBar
              box={{ 'data-test-subj': 'searchbar' }}
              hint={{
                content: <span data-test-subj="myHint">Hello from hint</span>,
                popoverProps: {
                  isOpen: isHintVisible,
                },
              }}
            />
            <button
              data-test-subj="showHintBtn"
              onClick={() => setIsHintVisible(true)}
            >
              Show hint
            </button>
          </>
        );
      };

      const { getByTestSubject, queryByTestSubject } = render(<TestComp />);

      expect(queryByTestSubject('myHint')).toBeNull(); // Not visible on focus as it is controlled

      act(() => {
        fireEvent.focus(getByTestSubject('searchbar'));
      });

      expect(queryByTestSubject('myHint')).toBeNull(); // Not visible on focus as it is controlled

      act(() => {
        fireEvent.click(getByTestSubject('showHintBtn'));
      });

      expect(queryByTestSubject('myHint')).toBeInTheDocument();
      expect(queryByTestSubject('myHint')).toHaveTextContent('Hello from hint');
    });
  });
});
