import React from 'react';
import { Random } from '../../../../src/services/random';
import {
  EuiSearchBar,
  Query
} from '../../../../src/components/search_bar';
import { EuiHealth } from '../../../../src/components/health';

const random = new Random();

const tags = [
  { value: 'bug', view: (<EuiHealth color="danger">bug</EuiHealth>) },
  { value: 'issue', view: (<EuiHealth color="primary">issue</EuiHealth>) },
  { value: 'feature', view: (<EuiHealth color="success">feature</EuiHealth>) },
  { value: 'discuss', view: (<EuiHealth color="success">discuss</EuiHealth>) },
  { value: 'enhancement', view: (<EuiHealth color="success">enhancement</EuiHealth>) },
  { value: 'test', view: (<EuiHealth color="warning">test</EuiHealth>) }
];

const loadTags = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tags);
    }, random.number({ min: 0, max: 2000 }));
  });
};

const executeSearch = (query) => {
  // to execute the search on an array of objects
  const items = []; // list of items
  Query.execute(query, items); // returns the found items

  // to build an Elasticsearch query out of it
  Query.toESQuery(query); // returns a query structure that can be placed in an ES search request body
};

export const SearchBar = () => {
  return (
    <div>
      <EuiSearchBar
        box={{
          placeholder: 'e.g. tag:bug -is:fixed website',
          incremental: true
        }}
        filters={[
          {
            type: 'is',
            field: 'fixed',
            name: 'Fixed',
            negatedName: 'Open'
          },
          {
            type: 'field_value_selection',
            field: 'tag',
            name: 'Tag',
            cache: 10000,
            options: () => loadTags()
          }
        ]}
        onChange={executeSearch.bind(null)}
      />
    </div>
  );
};
