import React from 'react';
import { shallow, mount } from 'enzyme';
import { requiredProps, findTestSubject } from '../../test';

import { EuiTableOfRecords } from './table_of_records';

const configBase = () => ({
  recordId: 'id',
  columns: [
    {
      field: 'name',
      name: 'Name',
      description: 'description'
    }
  ],
  onDataCriteriaChange: () => {},
});

const modelBase = () => ({
  data: {
    records: [],
    totalRecordCount: 0
  }
});

const addRecordsToModel = (model, count = 2) => {
  for (let i = 0; i < count; i++) {
    model.data.records.push({
      id: i,
      name: `name${i}`,
    });
  }
  model.data.totalRecordCount = count;
  return model;
};

const addPaginationToConfig = (config) => {
  config.pagination = {};
  return config;
};

const addPaginationToModel = (model, pageIndex = 0) => {
  const pageSize = 2;
  addRecordsToModel(model, pageSize);
  // Fake that there are more records than are visible.
  model.data.totalRecordCount = pageSize * 2;
  model.criteria = {
    page: {
      index: pageIndex,
      size: pageSize,
    }
  };
  return model;
};

const addSortingToConfig = (config) => {
  config.columns[0].sortable = true;
  return config;
};

const addSortingToModel = (model) => {
  model.criteria = {
    sort: { field: 'name', direction: 'asc' }
  };
  return model;
};

const addSelectionToConfig = (config) => {
  config.selection = {
    onSelectionChanged: () => {},
  };
  return config;
};

describe('EuiTableOfRecords', () => {
  let config;
  let model;

  afterEach(() => {
    config = undefined;
    model = undefined;
  });

  test('is rendered', () => {
    config = configBase();
    model = addRecordsToModel(modelBase());

    const component = shallow(
      <EuiTableOfRecords {...requiredProps} config={config} model={model} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('pagination', () => {
    test('is rendered', () => {
      config = addPaginationToConfig(configBase());
      model = addPaginationToModel(modelBase());

      const component = shallow(
        <EuiTableOfRecords config={config} model={model} />
      );

      expect(component).toMatchSnapshot();
    });

    test('page 2 is rendered', () => {
      config = addPaginationToConfig(configBase());
      model = addPaginationToModel(modelBase(), 1);

      const component = shallow(
        <EuiTableOfRecords config={config} model={model} />
      );

      // NOTE: This component isn't responsible for figure out which rows
      // are rendered based on page index, so only the pagination state
      // will update in this snapshot.
      expect(component).toMatchSnapshot();
    });
  });

  describe('sorting', () => {
    test('is rendered', () => {
      config = addSortingToConfig(configBase());
      model = addSortingToModel(modelBase());

      const component = shallow(
        <EuiTableOfRecords config={config} model={model} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('selection', () => {
    test('is rendered', () => {
      config = addSelectionToConfig(configBase());
      model = addRecordsToModel(modelBase(), 1);

      const component = shallow(
        <EuiTableOfRecords config={config} model={model} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('column', () => {
    describe('render function', () => {
      test('renders column value', () => {
        config = configBase();
        config.columns[0].render = (name) => name.toUpperCase();
        model = addRecordsToModel(modelBase());

        const component = mount(
          <EuiTableOfRecords config={config} model={model} />
        );

        const firstRow = findTestSubject(component, 'tableRow-1');
        expect(firstRow.getDOMNode().textContent).toBe('NAME1');
      });
    });

    describe('actions', () => {
      describe('single', () => {
        test('is rendered', () => {
          config = configBase();
          config.columns.push({
            actions: [
              {
                type: 'button',
                name: 'Edit',
                description: 'edit',
                onClick: () => undefined
              }
            ]
          });
          model = addRecordsToModel(modelBase());

          const component = shallow(
            <EuiTableOfRecords config={config} model={model} />
          );

          expect(component).toMatchSnapshot();
        });
      });

      describe('multiple', () => {
        test('is rendered', () => {
          config = configBase();
          config.columns.push({
            actions: [
              {
                type: 'button',
                name: 'Edit',
                description: 'edit',
                onClick: () => undefined
              },
              {
                type: 'button',
                name: 'Delete',
                description: 'delete',
                onClick: () => undefined
              }
            ]
          });
          model = addRecordsToModel(modelBase());

          const component = shallow(
            <EuiTableOfRecords config={config} model={model} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
