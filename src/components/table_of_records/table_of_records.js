import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  EuiTable, EuiTableBody, EuiTableHeader, EuiTableHeaderCell, EuiTableHeaderCellCheckbox,
  EuiTableRow, EuiTableRowCell, EuiTableRowCellCheckbox
} from '../table';
import { EuiCheckbox } from '../form/checkbox';
import { ICON_TYPES } from '../icon';
import { COLORS as BUTTON_ICON_COLORS } from '../button/button_icon/button_icon';
import { EuiValueRenderers } from '../value_renderer';
import {
  LEFT_ALIGNMENT, RIGHT_ALIGNMENT,
  SortDirection, PropertySortType
} from '../../services';
import { PaginationBar } from './pagination_bar';
import { CollapsedRecordActions } from './collapsed_record_actions';
import { ExpandedRecordActions } from './expanded_record_actions';

const dataTypesProfiles = {
  default: {
    align: LEFT_ALIGNMENT,
    render: EuiValueRenderers.default
  },
  string: {
    align: LEFT_ALIGNMENT,
    render: EuiValueRenderers.text
  },
  number: {
    align: RIGHT_ALIGNMENT,
    render: EuiValueRenderers.number
  },
  boolean: {
    align: LEFT_ALIGNMENT,
    render: EuiValueRenderers.booleanText
  },
  date: {
    align: LEFT_ALIGNMENT,
    render: EuiValueRenderers.date
  }
};

const DATA_TYPES = Object.keys(dataTypesProfiles);

const DefaultRecordActionType = PropTypes.shape({
  type: PropTypes.oneOf([ 'icon', 'button' ]), // default is 'button'
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // (record, model) => void,
  available: PropTypes.func, // (record, model) => boolean;
  enabled: PropTypes.func, // (record, model) => boolean;
  icon: PropTypes.oneOfType([ // required when type is 'icon'
    PropTypes.oneOf(ICON_TYPES),
    PropTypes.func // (record, model) => oneOf(ICON_TYPES)
  ]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(BUTTON_ICON_COLORS),
    PropTypes.func // (record, model) => oneOf(ICON_BUTTON_COLORS)
  ])
});

const CustomRecordActionType = PropTypes.shape({
  render: PropTypes.func.isRequired,  // (record, model, enabled) => PropTypes.node;
  available: PropTypes.func, // (record, model) => boolean;
  enabled: PropTypes.func // (record, model) => boolean;
});

const SupportedRecordActionType = PropTypes.oneOfType([
  DefaultRecordActionType,
  CustomRecordActionType
]);

const FieldDataColumnType = PropTypes.shape({
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataType: PropTypes.oneOf(DATA_TYPES),
  width: PropTypes.string,
  sortable: PropTypes.bool,
  align: PropTypes.oneOf([LEFT_ALIGNMENT, RIGHT_ALIGNMENT]),
  truncateText: PropTypes.bool,
  render: PropTypes.func // ((value, record) => PropTypes.node (also see [services/value_renderer] for basic implementations)
});

const ComputedColumnType = PropTypes.shape({
  render: PropTypes.func.isRequired, // (record) => PropTypes.node
  name: PropTypes.string,
  description: PropTypes.string,
  width: PropTypes.string,
  truncateText: PropTypes.bool
});

const ActionsColumnType = PropTypes.shape({
  actions: PropTypes.arrayOf(SupportedRecordActionType).isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  width: PropTypes.string
});

const ColumnType = PropTypes.oneOfType([FieldDataColumnType, ComputedColumnType, ActionsColumnType]);

const PaginationType = PropTypes.shape({
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
});

const SelectionType = PropTypes.shape({
  onSelectionChanged: PropTypes.func, // (selection: Record[]) => void;,
  selectable: PropTypes.func // (record, model) => boolean;
});

const RecordIdType = PropTypes.oneOfType([
  PropTypes.string, // the name of the record id property
  PropTypes.func    // (record) => string
]);

const ConfigType = PropTypes.shape({
  // when string, it's treated as the id property name
  // when function it needs to have the following signature: (record) => string
  recordId: RecordIdType.isRequired,
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  onDataCriteriaChange: PropTypes.func,
  selection: SelectionType,
  pagination: PaginationType
});

const ModelType = PropTypes.shape({
  data: PropTypes.shape({
    records: PropTypes.array.isRequired,
    totalRecordCount: PropTypes.number
  }).isRequired,
  criteria: PropTypes.shape({
    page: PropTypes.shape({
      index: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired
    }),
    sort: PropertySortType
  })
});

const EuiTableOfRecordsPropTypes = {
  config: ConfigType.isRequired,
  model: ModelType.isRequired,
  className: PropTypes.string
};

export class EuiTableOfRecords extends React.Component {

  static propTypes = EuiTableOfRecordsPropTypes;

  constructor(props) {
    super(props);
    this.state = {
      hoverRecordId: null,
      selection: []
    };
  }

  recordId(record) {
    const id = this.props.config.recordId;
    return _.isString(id) ? record[id] : id(record);
  }

  changeSelection(selection) {
    if (!this.props.config.selection) {
      return;
    }
    this.setState({ selection });
    if (this.props.config.selection.onSelectionChanged) {
      this.props.config.selection.onSelectionChanged(selection);
    }
  }

  clearSelection() {
    this.changeSelection([]);
  }

  onPageSizeChange(size) {
    this.clearSelection();
    const criteria = {
      ...this.props.model.criteria,
      page: {
        ...this.props.model.criteria.page,
        index: 0, // when page size changes, we take the user back to the first page
        size
      }
    };
    this.props.config.onDataCriteriaChange(criteria);
  }

  onPageChange(index) {
    this.clearSelection();
    const criteria = {
      ...this.props.model.criteria,
      page: {
        ...this.props.model.criteria.page,
        index
      }
    };
    this.props.config.onDataCriteriaChange(criteria);
  }

  onColumnSortChange(column) {
    this.clearSelection();
    const currentCriteria = this.props.model.criteria;
    let direction = SortDirection.ASC;
    if (currentCriteria && currentCriteria.sort && currentCriteria.sort.field === column.field) {
      direction = SortDirection.reverse(currentCriteria.sort.direction);
    }
    const criteria = {
      ...currentCriteria,
      // resetting the page if the criteria has one
      page: !currentCriteria.page ? undefined : {
        index: 0,
        size: currentCriteria.page.size
      },
      sort: {
        field: column.field,
        direction
      }
    };
    this.props.config.onDataCriteriaChange(criteria);
  }

  onRecordHover(recordId) {
    this.setState({ hoverRecordId: recordId });
  }

  clearRecordHover() {
    this.setState({ hoverRecordId: null });
  }

  render() {
    const { className, config, model, ...rest } = this.props;

    const classes = classNames(
      'euiRecordsTable',
      className
    );

    const table = this.renderTable(config, model);
    const paginationBar = this.renderPaginationBar(config, model);

    return (
      <div className={classes} {...rest}>
        {table}
        {paginationBar}
      </div>
    );
  }

  renderTable(config, model) {
    const head = this.renderTableHead(config, model);
    const body = this.renderTableBody(config, model);
    return <EuiTable>{head}{body}</EuiTable>;
  }

  renderTableHead(config, model) {

    const headers = [];

    if (config.selection) {
      const checked = this.state.selection && this.state.selection.length > 0;
      const onChange = (event) => {
        if (event.target.checked) {
          const selectableRecords = model.data.records.filter((record) =>
            !config.selection.selectable || config.selection.selectable(record, model));
          this.changeSelection(selectableRecords);
        } else {
          this.changeSelection([]);
        }
      };
      headers.push(
        <EuiTableHeaderCellCheckbox key="_selection_column" width="24px">
          <EuiCheckbox
            id="_selection_column-checkbox"
            type="inList"
            checked={checked}
            onChange={onChange}
          />
        </EuiTableHeaderCellCheckbox>
      );
    }

    config.columns.forEach((column, index) => {

      // actions column
      if (column.actions) {
        headers.push(
          <EuiTableHeaderCell
            key={`_actions_${index}`}
            align="right"
            width={column.width}
          >
            {column.name}
          </EuiTableHeaderCell>
        );
        return;
      }

      const align = this.resolveColumnAlign(column);

      // computed column
      if (!column.field) {
        headers.push(
          <EuiTableHeaderCell
            key={`_computed_${index}`}
            align={align}
            width={column.width}
          >
            {column.name}
          </EuiTableHeaderCell>
        );
        return;
      }

      // field data column
      const sortDirection = this.resolveColumnSortDirection(column, config, model);
      const onSort = this.resolveColumnOnSort(column, config);
      const isSorted = !!sortDirection;
      const isSortAscending = SortDirection.isAsc(sortDirection);
      headers.push(
        <EuiTableHeaderCell
          key={`${column.field}_${index}`}
          align={align}
          isSorted={isSorted}
          isSortAscending={isSortAscending}
          onSort={onSort}
          width={column.width}
        >
          {column.name}
        </EuiTableHeaderCell>
      );
    });

    return <EuiTableHeader>{headers}</EuiTableHeader>;
  }

  resolveColumnAlign(column) {
    if (column.align) {
      return column.align;
    }
    const dataType = column.dataType || 'default';
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(`Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(', ')}]`);
    }
    return profile.align;
  }

  resolveColumnSortDirection(column, config, model) {
    const modelCriteriaSort = model.criteria ? model.criteria.sort : undefined;
    if (column.sortable && modelCriteriaSort && modelCriteriaSort.field === column.field) {
      return modelCriteriaSort.direction;
    }
  }

  resolveColumnOnSort(column, config) {
    if (column.sortable) {
      if (!config.onDataCriteriaChange) {
        throw new Error(`The table of records is configured to be sortable on column [${column.field}] but
          [onDataCriteriaChange] is not configured. This callback must be implemented to handle to handle the
          sort requests`);
      }
      return () => this.onColumnSortChange(column);
    }
  }

  renderTableBody(config, model) {
    const rows = model.data.records.map((record, index) => {
      return this.renderTableRecordRow(record, config, model, index);
    });
    return <EuiTableBody>{rows}</EuiTableBody>;
  }

  renderTableRecordRow(record, config, model, rowIndex) {
    const recordId = this.recordId(record);
    const selected = this.state.selection && !!this.state.selection.find(selectedRecord => {
      return this.recordId(selectedRecord) === recordId;
    });

    const cells = [];

    if (config.selection) {
      cells.push(this.renderTableRecordSelectionCell(recordId, record, config, model, selected));
    }

    config.columns.forEach((column, columnIndex) => {
      if (column.actions) {
        cells.push(this.renderTableRecordActionsCell(recordId, record, column.actions, config, model, columnIndex));
      } else if (column.field) {
        cells.push(this.renderTableRecordFieldDataCell(recordId, record, column, columnIndex));
      } else {
        cells.push(this.renderTableRecordComputedCell(recordId, record, column, model, columnIndex));
      }
    });

    const onMouseOver = () => this.onRecordHover(recordId);
    const onMouseOut = () => this.clearRecordHover();
    return (
      <EuiTableRow
        key={`row_${recordId}_${rowIndex}`}
        isSelected={selected}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {cells}
      </EuiTableRow>
    );
  }

  renderTableRecordFieldDataCell(recordId, record, column, index) {
    const key = `${recordId}_${column.field}_${index}`;
    const align = this.resolveColumnAlign(column);
    const textOnly = !column.render;
    const value = _.get(record, column.field);
    const contentRenderer = this.resolveContentRenderer(column);
    const content = contentRenderer(value, record);
    return (
      <EuiTableRowCell key={key} align={align} truncateText={column.truncateText} textOnly={textOnly}>
        {content}
      </EuiTableRowCell>
    );
  }

  renderTableRecordComputedCell(recordId, record, column, model, index) {
    const key = `${recordId}_computed_${index}`;
    const align = this.resolveColumnAlign(column);
    const contentRenderer = this.resolveContentRenderer(column);
    const content = contentRenderer(record, model);
    return (
      <EuiTableRowCell key={key} align={align} truncateText={column.truncateText} textOnly={false}>
        {content}
      </EuiTableRowCell>
    );
  }

  resolveContentRenderer(column) {
    if (column.render) {
      return column.render;
    }
    const dataType = column.dataType || 'default';
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(`Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(', ')}]`);
    }
    return profile.render;
  }

  renderTableRecordSelectionCell(recordId, record, config, model, selected) {
    const key = `${recordId}_selection_column`;
    const checked = selected;
    const disabled = config.selection.selectable && !config.selection.selectable(record);
    const title = config.selection.selectableMessage && config.selection.selectableMessage(record);
    const onChange = (event) => {
      if (event.target.checked) {
        this.changeSelection([...this.state.selection, record]);
      } else {
        this.changeSelection(this.state.selection.reduce((selection, selectedRecord) => {
          if (this.recordId(selectedRecord) !== recordId) {
            selection.push(selectedRecord);
          }
          return selection;
        }, []));
      }
    };

    return (
      <EuiTableRowCellCheckbox key={key}>
        <EuiCheckbox
          id={`${key}-checkbox`}
          type="inList"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          title={title}
        />
      </EuiTableRowCellCheckbox>
    );
  }

  renderTableRecordActionsCell(recordId, record, actions, config, model, columnIndex) {

    const visible = this.state.hoverRecordId === recordId;

    const actionEnabled = (action) =>
      this.state.selection.length === 0 && (!action.enabled || action.enabled(record, model));

    let actualActions = actions;
    if (actions.length > 1) {

      // if we have more than 1 action, we don't show them all in the cell, instead we
      // put them all in a popover tool. This effectively means we can only have a maximum
      // of one tool per row (it's either and normal action, or it's a popover that shows multiple actions)
      //
      // here we create a single custom action that triggers the popover with all the configured actions

      actualActions = [
        {
          name: 'Actions',
          render: (record, model) => {
            return (
              <CollapsedRecordActions
                actions={actions}
                visible={visible}
                recordId={recordId}
                record={record}
                model={model}
                actionEnabled={actionEnabled}
              />
            );
          }
        }
      ];
    }

    const tools = (
      <ExpandedRecordActions
        actions={actualActions}
        visible={visible}
        recordId={recordId}
        record={record}
        model={model}
        actionEnabled={actionEnabled}
      />
    );

    // when each record may potentially have more than one action we'll show these actions
    // within a context menu triggered by a single button. The idea here is that we want to keep the
    // actions on the rows clean - no more than a single button per row.

    const key = `record_actions_${recordId}_${columnIndex}`;
    return (
      <EuiTableRowCell key={key} align="right" textOnly={false}>
        {tools}
      </EuiTableRowCell>
    );
  }

  renderPaginationBar(config, model) {
    if (config.pagination) {
      return (
        <PaginationBar
          config={config}
          model={model}
          onPageSizeChange={this.onPageSizeChange.bind(this)}
          onPageChange={this.onPageChange.bind(this)}
        />
      );
    }
  }

}
