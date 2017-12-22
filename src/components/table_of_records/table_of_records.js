import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from 'lodash';
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
import { Page, PageType, LEFT_ALIGNMENT, RIGHT_ALIGNMENT } from '../../services';
import { ValueRenderers } from '../../services/value_renderer';

const dataTypesProfiles = {
  string: {
    align: LEFT_ALIGNMENT,
    render: ValueRenderers.text
  },
  number: {
    align: RIGHT_ALIGNMENT,
    render: ValueRenderers.number
  },
  boolean: {
    align: LEFT_ALIGNMENT,
    render: ValueRenderers.booleanText
  },
  date: {
    align: LEFT_ALIGNMENT,
    render: ValueRenderers.date
  }
};

const DATA_TYPES = Object.keys(dataTypesProfiles);

const ButtonRecordActionType = PropTypes.shape({
  type: PropTypes.oneOf(['button']).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // (record, model) => void,
  visible: PropTypes.func, // (record, model) => boolean;
  enabled: PropTypes.func, // (record, model) => boolean;
  icon: PropTypes.oneOf(ICON_TYPES),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(BUTTON_COLORS),
    PropTypes.func // (record, model) => BUTTON_COLORS
  ])
});

const IconRecordActionType = PropTypes.shape({
  type: PropTypes.oneOf(['icon']).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // (record, model) => void,
  visible: PropTypes.func, // (record, model) => boolean;
  enabled: PropTypes.func, // (record, model) => boolean;
  icon: PropTypes.oneOf(ICON_TYPES),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(BUTTON_ICON_COLORS),
    PropTypes.func // (record, model) => ICON_BUTTON_COLORS
  ])
});

const CustomRecordActionType = PropTypes.shape({
  type: PropTypes.oneOf(['custom']).isRequired,
  render: PropTypes.func.isRequired,  // (record, model, enabled) => PropTypes.node;
  visible: PropTypes.func, // (record, model) => boolean;
  enabled: PropTypes.func // (record, model) => boolean;
});

const SupportedRecordActionType = PropTypes.oneOfType([
  ButtonRecordActionType,
  IconRecordActionType,
  CustomRecordActionType
]);

const DataColumnType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataType: PropTypes.oneOf(DATA_TYPES),
  width: PropTypes.string,
  sortable: PropTypes.bool,
  align: PropTypes.oneOf([LEFT_ALIGNMENT, RIGHT_ALIGNMENT]),
  truncateText: PropTypes.bool,
  render: PropTypes.func // ((value, record) => PropTypes.node (also see [services/value_renderer] for basic implementations)
});

const ActionsColumnType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  width: PropTypes.string,
  actions: PropTypes.arrayOf(SupportedRecordActionType)
});

const ColumnType = PropTypes.oneOfType([DataColumnType, ActionsColumnType]);

const PaginationType = PropTypes.shape({
  onPageSizeChange: PropTypes.func.isRequired, // (pageSize: number, page: PageType) => void;
  onPageChange: PropTypes.func.isRequired, //(pageIndex: number, page: PageType) => void;,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
});

const SelectionType = PropTypes.shape({
  onSelectionChanged: PropTypes.func.isRequired, // (selection: Record[]) => void;,
  selectable: PropTypes.func // (record) => boolean;
});

const ConfigSortType = PropTypes.shape({
  onColumnSort: PropTypes.func.isRequired // (column: Column, model: Model) => void;
});

const RecordIdType = PropTypes.oneOfType([
  PropTypes.string, // the name of the record id property
  PropTypes.func    // (record) => any
]);

const ConfigType = PropTypes.shape({
  // when string, it's treated as the id property name
  // when function
  recordId: RecordIdType.isRequired,
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  selection: SelectionType,
  sort: ConfigSortType,
  pagination: PaginationType
});

export const SORT_ASC = 'asc';
export const SORT_DESC = 'desc';

const ModelSortType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  direction: PropTypes.oneOf([SORT_ASC, SORT_DESC]).isRequired
});

const ModelType = PropTypes.shape({
  page: PageType.isRequired,
  sort: ModelSortType,
  selection: PropTypes.array // Record[]
});

const defaultProps = {
  config: {
    column: {
      align: LEFT_ALIGNMENT,
      action: {
        visible: true,
        disabled: false,
        button: {
          color: 'primary'
        }
      },
      render: ValueRenderers.default
    },
    pagination: {
      pageSizeOptions: [5, 10, 20]
    }
  }
};

export class EuiTableOfRecords extends Component {

  static propTypes = {
    config: ConfigType.isRequired,
    model: ModelType.isRequired,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      popovers: {},
      hoverRecordId: null
    };
  }

  recordId(record) {
    const id = this.props.config.recordId;
    return typeof id === 'string' ? record[id] : id(record);
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

  isPopoverOpen(id) {
    return !!this.state.popovers[id];
  }

  render() {
    const { className, ...rest } = this.props;

    const classes = classNames(
      'euiRecordsTable',
      className
    );

    const table = this.renderTable(this.props.config, this.props.model);
    const footer = this.renderFooter(this.props.config, this.props.model);

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
      const checked = model.selection && model.selection.length > 0;
      const onChange = (event) => {
        if (event.target.checked) {
          const selectableRecords = model.page.items.reduce((records, record) => {
            if (!config.selection.selectable || config.selection.selectable(record)) {
              records.push(record);
            }
            return records;
          }, []);
          config.selection.onSelectionChanged(selectableRecords);
        } else {
          config.selection.onSelectionChanged([]);
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

    config.columns.forEach((column) => {

      if (column.actions) {
        headers.push(
          <EuiTableHeaderCell
            key="_actions"
            align="right"
            width={column.width}
          >
            {column.name}
          </EuiTableHeaderCell>
        );
        return;
      }

      const align = this.resolveColumnAlign(column);
      const sortDirection = this.resolveColumnSortDirection(column, config, model);
      const onSort = this.resolveColumnOnSort(column, config, model);
      headers.push(
        <EuiTableHeaderCell
          key={column.key}
          align={align}
          isSorted={!!sortDirection}
          isSortAscending={sortDirection === 'asc'}
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
      return dataTypesProfiles[column.dataType].align;
    }
    return defaultProps.config.column.align;
  }
  resolveColumnSortDirection(column, config, model) {
    if (config.sort && column.sortable && model.sort && model.sort.key === column.key) {
      return model.sort.direction;
    }
  }
  resolveColumnOnSort(column, config, model) {
    if (config.sort && column.sortable) {
      return () => config.sort.onColumnSort(column, model);
    }
  }

  renderTableBody(config, model) {
    const rows = model.page.items.map((record) => {
      return this.renderTableRecordRow(record, config, model);
    });
    return <EuiTableBody>{rows}</EuiTableBody>;
  }

  renderTableRecordRow(record, config, model) {
    const recordId = this.recordId(record);
    const selected = model.selection && !!model.selection.find(selectedRecord => {
      return this.recordId(selectedRecord) === recordId;
    });

    const cells = [];

    if (config.selection) {
      cells.push(this.renderTableRecordSelectionCell(recordId, record, config, model, selected));
    }

    config.columns.forEach((column) => {
      if (column.actions) {
        cells.push(this.renderTableRecordActionsCell(recordId, record, column.actions, config, model));
      } else {
        cells.push(this.renderTableRecordDataCell(recordId, record, column));
      }
    });

    const onMouseOver = () => this.setState({ hoverRecordId: recordId });
    const onMouseOut = () => this.setState({ hoverRecordId: null });
    return (
      <EuiTableRow
        key={`row-${recordId}`}
        isSelected={selected}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {cells}
      </EuiTableRow>
    );
  }

  renderTableRecordDataCell(recordId, record, column) {
    const key = `${recordId}_${column.key}`;
    const align = this.resolveColumnAlign(column);
    const textOnly = !column.render;
    const value = record[column.key];
    const contentRender = this.resolveContentRender(column);
    const content = contentRender(value, record);
    return (
      <EuiTableRowCell key={key} align={align} truncateText={column.truncateText} textOnly={textOnly}>
        {content}
      </EuiTableRowCell>
    );
  }

  resolveContentRender(column) {
    if (column.render) {
      return column.render;
    }
    if (column.dataType) {
      return dataTypesProfiles[column.dataType].render;
    }
    return defaultProps.config.column.render;
  }

  renderTableRecordSelectionCell(recordId, record, config, model, selected) {
    const key = `${recordId}_selection_column`;
    const checked = selected;
    const disabled = config.selection.selectable && !config.selection.selectable(record);
    const onChange = (event) => {
      if (event.target.checked) {
        config.selection.onSelectionChanged([...model.selection, record]);
      } else {
        config.selection.onSelectionChanged(model.selection.reduce((selection, selectedRecord) => {
          if (this.recordId(selectedRecord) !== recordId) {
            selection.push(selectedRecord);
          }
          return selection;
        }, []));
      }
    };
    return (
      <EuiTableRowCellCheckbox key={key}>
        <EuiCheckbox id={`${key}-checkbox`} type="inList" disabled={disabled} checked={checked} onChange={onChange}/>
      </EuiTableRowCellCheckbox>
    );
  }

  renderTableRecordActionsCell(recordId, record,
    actions /* SupportedRecordActionType[] */,
    config /* ConfigType */,
    model /* ModelType */) {
    // when each record may potentially have more than one action we'll show these actions
    // within a context menu triggered by a single button. The idea here is that we want to keep the
    // actions on the rows clean - no more than a single button per row.
    if (actions.length > 1) {
      return this.renderTableRecordActionsCellCollapsed(recordId, record, actions, config, model);
    }
    return this.renderTableRecordActionsCellExpanded(recordId, record, actions, config, model);
  }

  renderTableRecordActionsCellExpanded(recordId, record,
    actions /* SupportedRecordActionType[] */,
    config /* ConfigType */,
    model /* ModelType */) {
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
    const key = `${recordId}_record_actions`;
    return (
      <EuiTableRowCell key={key} align="right" textOnly={false}>
        {tools}
      </EuiTableRowCell>
    );
  }

  renderTableRecordActionsCellCollapsed(recordId, record, actions /* SupportedRecordAction[] */, config, model) {

    const closePopover = () => this.closePopover(recordId);
    const isOpen = this.isPopoverOpen(recordId);

    let allDisabled = true;
    const items = actions.reduce((items, action, index) => {
      const visible = action.visible ? action.visible(record, model) : defaultProps.config.column.action.visible;
      if (!visible) {
        return items;
      }
      const disabled = action.enabled ? !action.enabled(record, model) : defaultProps.config.column.action.disabled;
      allDisabled = allDisabled && disabled;
      switch (action.type) {

        case 'icon':
        case 'button':
          const onClick = () => action.onClick(record, model);
          const item = (
            <EuiContextMenuItem
              key={`${recordId}-action-${index}`}
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
          //TODO I don't think this will work... need to figure out how to embed different components as custom items
          const enabled = action.enabled ? action.enabled(record, model) : !defaultProps.config.column.action.disabled;
          const customItem = action.render(record, model, enabled);
          items.push(customItem);
          return items;
      }
    }, []);

    const visible = this.state.hoverRecordId === recordId;
    const style = visible ? undefined : { visibility: 'hidden' };
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

    const key = `${recordId}_record_actions`;

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

  renderTableRecordButton(button, recordId, record, model, index) {
    const key = `${recordId}-action-button-${index}`;
    const visible = this.state.hoverRecordId === recordId;
    const color = this.resolveButtonColor(button, record, model);
    const disabled = button.enabled ? !button.enabled(record, model) : defaultProps.config.column.action.button.disabled;
    const icon = button.icon;
    const onClick = () => button.onClick(record, model);
    const style = !visible ? { visibility: 'hidden' } : undefined;
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

  resolveButtonColor(button, record, model) {
    if (button.color) {
      return _.isString(button.color) ? button.color : button.color(record, model);
    }
    return defaultProps.config.column.action.button.color;
  }

  renderTableRecordCustomAction(action, recordId, record, model, index) {
    const key = `${recordId}-action-custom-${index}`;
    const enabled = action.enabled ? action.enabled(record, model) : true;
    const tool = action.render(record, model, enabled);
    return <span key={key}>{tool}</span>;
  }

  renderFooter(config, model) {
    if (!config.pagination) {
      return;
    }
    return (
      <div>
        <EuiSpacer size="m"/>
        <EuiTablePagination
          activePage={model.page.index}
          itemsPerPage={model.page.size}
          itemsPerPageOptions={config.pagination.pageSizeOptions || defaultProps.config.pagination.pageSizeOptions}
          pageCount={Page.getTotalPageCount(model.page)}
          onChangeItemsPerPage={(size) => config.pagination.onPageSizeChange(size, model.page)}
          onChangePage={(index) => config.pagination.onPageChange(index, model.page)}
        />
      </div>
    );
  }

}
