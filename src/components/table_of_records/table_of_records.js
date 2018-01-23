import React from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { EuiPropTypes } from '../../utils/prop_types';
import {
  EuiTable, EuiTableBody, EuiTableHeader, EuiTableHeaderCell, EuiTableHeaderCellCheckbox,
  EuiTableRow, EuiTableRowCell, EuiTableRowCellCheckbox
} from '../table';
import { EuiCheckbox } from '../form/checkbox';
import { ICON_TYPES } from '../icon';
import { COLORS as BUTTON_ICON_COLORS } from '../button/button_icon/button_icon';
import { EuiButtonIcon } from '../button/button_icon';
import { EuiButton, COLORS as BUTTON_COLORS } from '../button/button';
import { EuiContextMenuItem, EuiContextMenuPanel } from '../context_menu';
import { EuiSpacer } from '../spacer';
import { EuiTablePagination } from '../table/table_pagination';
import { EuiPopover } from '../popover';
import { EuiValueRenderers } from '../value_renderer';
import {
  LEFT_ALIGNMENT, RIGHT_ALIGNMENT,
  SortDirection, PropertySortType
} from '../../services';

const dataTypesProfiles = {
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

const ButtonRecordActionType = PropTypes.shape({
  type: EuiPropTypes.is('button').isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // (record, model) => void,
  visible: PropTypes.func, // (record, model) => boolean;
  enabled: PropTypes.func, // (record, model) => boolean;
  icon: PropTypes.oneOf(ICON_TYPES),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(BUTTON_COLORS),
    PropTypes.func // (record, model) => oneOf(BUTTON_COLORS)
  ])
});

const IconRecordActionType = PropTypes.shape({
  type: EuiPropTypes.is('icon').isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // (record, model) => void,
  visible: PropTypes.func, // (record, model) => boolean;
  enabled: PropTypes.func, // (record, model) => boolean;
  icon: PropTypes.oneOf(ICON_TYPES),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(BUTTON_ICON_COLORS),
    PropTypes.func // (record, model) => oneOf(ICON_BUTTON_COLORS)
  ])
});

const CustomRecordActionType = PropTypes.shape({
  type: EuiPropTypes.is('custom').isRequired,
  render: PropTypes.func.isRequired,  // (record, model, enabled) => PropTypes.node;
  visible: PropTypes.func, // (record, model) => boolean;
  enabled: PropTypes.func // (record, model) => boolean;
});

const SupportedRecordActionType = PropTypes.oneOfType([
  ButtonRecordActionType,
  IconRecordActionType,
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
  selectable: PropTypes.func // (record) => boolean;
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
    totalRecordCount: PropTypes.number.isRequired
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

const defaultProps = {
  config: {
    column: {
      align: LEFT_ALIGNMENT,
      action: {
        visible: true,
        enabled: true,
        button: {
          color: 'primary'
        }
      },
      render: EuiValueRenderers.default
    },
    pagination: {
      pageSizeOptions: [5, 10, 20]
    }
  }
};

export class EuiTableOfRecords extends React.Component {

  static propTypes = EuiTableOfRecordsPropTypes;

  constructor(props) {
    super(props);
    this.state = {
      popovers: {},
      hoverRecordId: null,
      selection: []
    };
  }

  recordId(record) {
    const id = this.props.config.recordId;
    return _.isString(id) ? record[id] : id(record);
  }

  isPopoverOpen(id) {
    return !!this.state.popovers[id];
  }

  togglePopover(id) {
    this.setState((prevState) => ({
      ...prevState,
      popovers: { ...prevState.popovers, [id]: !prevState.popovers[id] }
    }));
  }

  closePopover(id) {
    this.setState((prevState) => ({
      ...prevState,
      popovers: { ...prevState.popovers, [id]: undefined }
    }));
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
      ...this.props.model.criteria,
      page: {
        ...this.props.model.criteria.page,
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
    const footer = this.renderFooter(config, model);

    return (
      <div className={classes} {...rest}>
        {table}
        {footer}
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
          const selectableRecords = model.data.records.reduce((records, record) => {
            if (!config.selection.selectable || config.selection.selectable(record)) {
              records.push(record);
            }
            return records;
          }, []);
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
    if (column.dataType) {
      const dataTypeProfile = dataTypesProfiles[column.dataType];
      if (!dataTypeProfile) {
        throw new Error(`Unknown dataType [${column.dataType}]. The supported data types are [${DATA_TYPES.join(', ')}]`);
      }
      return dataTypeProfile.align;
    }
    return defaultProps.config.column.align;
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
        cells.push(this.renderTableRecordComputedCell(recordId, record, column, columnIndex));
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
    const value = record[column.field];
    const contentRenderer = this.resolveContentRenderer(column);
    const content = contentRenderer(value, record);
    return (
      <EuiTableRowCell key={key} align={align} truncateText={column.truncateText} textOnly={textOnly}>
        {content}
      </EuiTableRowCell>
    );
  }

  renderTableRecordComputedCell(recordId, record, column, index) {
    const key = `${recordId}_computed_${index}`;
    const align = this.resolveColumnAlign(column);
    const contentRenderer = this.resolveContentRenderer(column);
    const content = contentRenderer(record);
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
    if (column.dataType) {
      const dataTypeProfile = dataTypesProfiles[column.dataType];
      if (!dataTypeProfile) {
        throw new Error(`Unknown dataType [${column.dataType}]. The supported data types are [${DATA_TYPES.join(', ')}]`);
      }
      return dataTypeProfile.render;
    }
    return defaultProps.config.column.render;
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

    // when each record may potentially have more than one action we'll show these actions
    // within a context menu triggered by a single button. The idea here is that we want to keep the
    // actions on the rows clean - no more than a single button per row.
    if (actions.length > 1) {
      return this.renderTableRecordActionsCellCollapsed(recordId, record, actions, config, model, columnIndex);
    }
    return this.renderTableRecordActionsCellExpanded(recordId, record, actions, config, model, columnIndex);
  }

  // yes, even though based on the logic above, actions is a single item array, we'll keep this
  // code generic enough so it can easily accommodate changes in this logic later on,
  renderTableRecordActionsCellExpanded(recordId, record, actions, config, model, columnIndex) {
    const tools = actions.reduce((tools, action, index) => {
      const visible = action.visible ? action.visible(record, model) : true;
      if (!visible) {
        return tools;
      }
      switch (action.type) {

        case 'icon':
        case 'button':
          const button = this.renderTableRecordButton(action, recordId, record, model, index);
          tools.push(button);
          return tools;

        case 'custom':
          const customAction = this.renderTableRecordCustomAction(action, recordId, record, model, index);
          tools.push(customAction);
          return tools;
      }
    }, []);
    const key = `${recordId}_record_actions_${columnIndex}`;
    return (
      <EuiTableRowCell key={key} align="right" textOnly={false}>
        {tools}
      </EuiTableRowCell>
    );
  }

  renderTableRecordButton(button, recordId, record, model, index) {
    const key = `${recordId}_action_button_${index}`;
    const visible = this.state.hoverRecordId === recordId;
    const color = this.resolveButtonColor(button, record, model);
    const disabled = !this.resolveActionEnabled(button, record, model);
    const icon = button.icon;
    const onClick = () => button.onClick(record, model);
    const style = !visible ? { opacity: 0 } : undefined;
    const onHover = () => this.setState({ hoverRecordId: recordId });
    if (button.type === 'icon') {
      return (
        <EuiButtonIcon
          key={key}
          aria-label={button.name}
          isDisabled={disabled}
          color={color}
          iconType={icon}
          title={button.description}
          style={style}
          onClick={onClick}
          onMouseOver={onHover}
        />
      );
    }
    return (
      <EuiButton
        key={key}
        size="s"
        isDisabled={disabled}
        color={color}
        iconType={icon}
        fill={false}
        title={button.description}
        style={style}
        onClick={onClick}
        onMouseOver={onHover}
      >
        {button.name}
      </EuiButton>
    );
  }

  renderTableRecordActionsCellCollapsed(recordId, record, actions /* SupportedRecordAction[] */, config, model, columnIndex) {

    const closePopover = () => this.closePopover(recordId);
    const isOpen = this.isPopoverOpen(recordId);

    let allDisabled = true;
    const items = actions.reduce((items, action, index) => {
      const key = `${recordId}_action_${index}`;
      const visible = action.visible ? action.visible(record, model) : defaultProps.config.column.action.visible;
      if (!visible) {
        return items;
      }
      const disabled = !this.resolveActionEnabled(action, record, model);
      allDisabled = allDisabled && disabled;
      switch (action.type) {

        case 'icon':
        case 'button':
          const onClick = () => action.onClick(record, model);
          const item = (
            <EuiContextMenuItem
              key={key}
              disabled={disabled}
              icon={action.icon}
              onClick={onClick}
            >
              {action.name}
            </EuiContextMenuItem>
          );
          items.push(item);
          return items;

        case 'custom':
          const enabled = action.enabled ? action.enabled(record, model) : !defaultProps.config.column.action.disabled;
          const customItem = action.render(record, model, enabled);
          const itemWrapper = (
            <div key={key} className="euiContextMenuItem">{customItem}</div>
          );
          items.push(itemWrapper);
          return items;
      }
    }, []);

    const visible = this.state.hoverRecordId === recordId;
    const style = !visible ? { opacity: 0 } : undefined;
    const popoverButton = (
      <EuiButtonIcon
        aria-label="Actions"
        iconType="gear"
        color="text"
        style={style}
        isDisabled={allDisabled}
        onClick={() => this.togglePopover(recordId)}
      />
    );

    const key = `${recordId}_record_actions_${columnIndex}`;

    return (
      <EuiTableRowCell key={key} align="right" textOnly={false}>
        <EuiPopover
          id={`${recordId}-actions`}
          isOpen={isOpen}
          button={popoverButton}
          closePopover={closePopover}
          panelPaddingSize="none"
          anchorPosition="leftCenter"
        >
          <EuiContextMenuPanel items={items}/>
        </EuiPopover>
      </EuiTableRowCell>
    );
  }

  resolveButtonColor(button, record, model) {
    if (button.color) {
      return _.isString(button.color) ? button.color : button.color(record, model);
    }
    return defaultProps.config.column.action.button.color;
  }

  renderTableRecordCustomAction(action, recordId, record, model, index) {
    const key = `${recordId}_action_custom_${index}`;
    const enabled = this.resolveActionEnabled(action, record, model);
    const tool = action.render(record, model, enabled);
    return <span key={key}>{tool}</span>;
  }

  resolveActionEnabled(action, record, model) {
    if (this.state.selection.length > 0) {
      return false; // record actions can only be enabled if there's no selection
    }
    if (action.enabled) {
      return action.enabled(record, model);
    }
    return defaultProps.config.column.action.enabled;
  }

  renderFooter(config, model) {
    if (!config.pagination) {
      return;
    }
    if (!model.criteria || !model.criteria.page) {
      throw new Error(`The table of records is configured to show pagination but the provided
        model is missing page criteria. Make sure the page criteria (index and size) is specified
        under model.criteria.page`);
    }
    if (!config.onDataCriteriaChange) {
      throw new Error(`The table of records is provided with a paginated model but [onDataCriteriaChange] is
        not configured. This callback must be implemented to handle pagination changes`);
    }
    const pageSizeOptions = config.pagination.pageSizeOptions ?
      config.pagination.pageSizeOptions :
      defaultProps.config.pagination.pageSizeOptions;
    return (
      <div>
        <EuiSpacer size="m"/>
        <EuiTablePagination
          activePage={model.criteria.page.index}
          itemsPerPage={model.criteria.page.size}
          itemsPerPageOptions={pageSizeOptions}
          pageCount={this.computeTotalPageCount(model.criteria.page, model.data.totalRecordCount)}
          onChangeItemsPerPage={(size) => this.onPageSizeChange(size)}
          onChangePage={(index) => this.onPageChange(index)}
        />
      </div>
    );
  }

  computeTotalPageCount(page, totalCount) {
    return Math.ceil(totalCount / page.size);
  }

}
