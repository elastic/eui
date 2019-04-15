import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isArray, isNil } from '../../../services/predicate';
import { keyCodes } from '../../../services';
import { EuiPropTypes } from '../../../utils/prop_types';
import { EuiPopover } from '../../popover/popover';
import { EuiPopoverTitle } from '../../popover/popover_title';
import { EuiFieldSearch } from '../../form/field_search/field_search';
import { EuiFilterSelectItem, EuiFilterButton } from '../../filter_group';
import { EuiLoadingChart } from '../../loading/loading_chart';
import { EuiSpacer } from '../../spacer/spacer';
import { EuiIcon } from '../../icon/icon';
import { Query } from '../query';

const FieldValueOptionType = PropTypes.shape({
  field: PropTypes.string,
  value: PropTypes.any.isRequired,
  name: PropTypes.string,
  view: PropTypes.node
});

const FieldValueOptionsType = PropTypes.oneOfType([
  PropTypes.func, // (query) => Promise<FieldValueOptionType[]>
  PropTypes.arrayOf(FieldValueOptionType)
]);

export const FieldValueSelectionFilterConfigType = PropTypes.shape({
  type: EuiPropTypes.is('field_value_selection').isRequired,
  field: PropTypes.string,
  autoClose: PropTypes.boolean,
  name: PropTypes.string.isRequired,
  options: FieldValueOptionsType.isRequired,
  filterWith: PropTypes.oneOfType([ PropTypes.func, PropTypes.oneOf([ 'prefix', 'includes' ]) ]),
  cache: PropTypes.number,
  multiSelect: PropTypes.oneOfType([ PropTypes.bool, PropTypes.oneOf([ 'and', 'or' ]) ]),
  loadingMessage: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  searchThreshold: PropTypes.number,
  available: PropTypes.func, // () => boolean
});

const FieldValueSelectionFilterPropTypes = {
  index: PropTypes.number.isRequired,
  config: FieldValueSelectionFilterConfigType.isRequired,
  query: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired, // (value) => void
};

const defaults = {
  config: {
    multiSelect: true,
    filterWith: 'prefix',
    loadingMessage: 'Loading...',
    noOptionsMessage: 'No options found',
    searchThreshold: 10,
  }
};

export class FieldValueSelectionFilter extends Component {

  static propTypes = FieldValueSelectionFilterPropTypes;

  static defaultProps = {
    autoClose: true,
  }

  constructor(props) {
    super(props);

    const { options } = props.config;

    const preloadedOptions = (
      isArray(options)
        ? {
          all: options,
          shown: options
        }
        : null
    );

    this.selectItems = [];
    this.state = {
      popoverOpen: false,
      error: null,
      options: preloadedOptions
    };
  }

  closePopover() {
    this.setState({ popoverOpen: false });
  }

  onButtonClick() {
    this.setState(prevState => {
      if (!prevState.popoverOpen) {
        // loading options updates the state, so we'll do that in the animation frame
        window.requestAnimationFrame(() => {
          this.loadOptions();
        });
      }
      return {
        options: null,
        error: null,
        popoverOpen: !prevState.popoverOpen
      };
    });
  }

  loadOptions() {
    const loader = this.resolveOptionsLoader();
    this.setState({ options: null, error: null });
    loader().then((options) => {
      this.setState({
        error: null,
        options: {
          all: options,
          shown: options
        }
      });
    }).catch(() => {
      this.setState({ options: null, error: `Could not load options` });
    });
  }

  filterOptions(q = '') {
    this.setState(prevState => {
      if (isNil(prevState.options)) {
        return {};
      }

      const predicate = this.getOptionFilter();

      return {
        options: {
          ...prevState.options,
          shown: prevState.options.all.filter((option, i, options) => {
            const name = this.resolveOptionName(option).toLowerCase();
            const query = q.toLowerCase();
            return predicate(name, query, options);
          })
        }
      };
    });
  }

  getOptionFilter() {
    const filterWith = this.props.config.filterWith || defaults.config.filterWith;

    if (typeof filterWith === 'function') {
      return filterWith;
    }

    if (filterWith === 'includes') {
      return (name, query) => name.includes(query);
    }

    return (name, query) => name.startsWith(query);
  }

  resolveOptionsLoader() {
    const options = this.props.config.options;
    if (isArray(options)) {
      return () => Promise.resolve(options);
    }
    if (isNil(this.props.config.cache) || this.props.config.cache <= 0) {
      return options;
    }
    return () => {
      const cachedOptions = this.state.cachedOptions;
      if (cachedOptions) {
        return Promise.resolve(cachedOptions);
      }
      if (this.props.config.cache > 0) {
        return new Promise((resolve, reject) => {
          return options().then((opts) => {
            this.setState({ cachedOptions: opts });
            this.timeoutId = setTimeout(() => {
              this.setState({ cachedOptions: null });
            }, this.props.config.cache);
            resolve(opts);
          }).catch((error) => {
            reject(error);
          });
        });
      }
    };
  }

  resolveOptionName(option) {
    return option.name || option.value.toString();
  }

  onOptionClick(field, value, checked) {
    const multiSelect = this.resolveMultiSelect();
    const { autoClose } = this.props;

    // we're closing popover only if the user can only select one item... if the
    // user can select more, we'll leave it open so she can continue selecting

    if (!multiSelect && autoClose) {
      this.closePopover();
      const query = checked ?
        this.props.query.removeSimpleFieldClauses(field) :
        this.props.query.removeSimpleFieldClauses(field).addSimpleFieldValue(field, value);

      this.props.onChange(query);
    } else {
      if (multiSelect === 'or') {
        const query = checked ?
          this.props.query.removeOrFieldValue(field, value) :
          this.props.query.addOrFieldValue(field, value);

        this.props.onChange(query);
      } else {
        const query = checked ?
          this.props.query.removeSimpleFieldValue(field, value) :
          this.props.query.addSimpleFieldValue(field, value);

        this.props.onChange(query);
      }
    }
  }

  onKeyDown(index, event) {
    switch (event.keyCode) {

      case keyCodes.DOWN:
        if (index < this.selectItems.length - 1) {
          event.preventDefault();
          this.selectItems[index + 1].focus();
        }
        break;

      case keyCodes.UP:
        if (index < 0) {
          return; // it's coming from the search box... nothing to do... nowhere to go
        }
        if (index === 0 && this.searchInput) {
          event.preventDefault();
          this.searchInput.focus();
        } else if (index > 0) {
          event.preventDefault();
          this.selectItems[index - 1].focus();
        }
    }
  }

  resolveMultiSelect() {
    const { config } = this.props;
    return !isNil(config.multiSelect) ? config.multiSelect : defaults.config.multiSelect;
  }

  render() {
    const { index, query, config } = this.props;
    const multiSelect = this.resolveMultiSelect();

    const activeTop = this.isActiveField(config.field);
    const activeItem = this.state.options
      ? this.state.options.all.some(item => this.isActiveField(item.field))
      : false;

    const active = activeTop || activeItem;

    const button = (
      <EuiFilterButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}
        hasActiveFilters={active}
        grow
      >
        {config.name}
      </EuiFilterButton>
    );

    const searchBox = this.renderSearchBox();
    const content = this.renderContent(config.field, query, config, multiSelect);
    const threshold = this.props.config.searchThreshold || defaults.config.searchThreshold;
    const withTitle = this.state.options && this.state.options.all.length >= threshold;

    return (
      <EuiPopover
        id={`${config.type}_${index}`}
        ownFocus
        button={button}
        isOpen={this.state.popoverOpen}
        closePopover={this.closePopover.bind(this)}
        panelPaddingSize="none"
        withTitle={withTitle}
        anchorPosition="downCenter"
        panelClassName="euiFilterGroup__popoverPanel"
      >
        {searchBox}
        {content}
      </EuiPopover>
    );
  }

  renderSearchBox() {
    const threshold = this.props.config.searchThreshold || defaults.config.searchThreshold;
    if (this.state.options && this.state.options.all.length >= threshold) {
      const disabled = this.state.error;
      return (
        <EuiPopoverTitle>
          <EuiFieldSearch
            inputRef={(ref) => this.searchInput = ref}
            disabled={disabled}
            incremental={true}
            onSearch={(query) => this.filterOptions(query)}
            onKeyDown={this.onKeyDown.bind(this, -1)}
          />
        </EuiPopoverTitle>
      );
    }
  }

  renderContent(field, query, config, multiSelect) {
    if (this.state.error) {
      return this.renderError(this.state.error);
    }
    if (isNil(this.state.options)) {
      return this.renderLoader();
    }
    if (this.state.options.shown.length === 0) {
      return this.renderNoOptions();
    }
    const items = this.state.options.shown.reduce((items, option, index) => {
      const optionField = option.field || field;

      const clause = multiSelect === 'or' ?
        query.getOrFieldClause(optionField, option.value) :
        query.getSimpleFieldClause(optionField, option.value);

      const checked = this.resolveChecked(clause);
      const onClick = () => {
        // clicking a checked item will uncheck it and effective remove the filter (value = undefined)
        this.onOptionClick(optionField, option.value, checked);
      };

      const item = (
        <EuiFilterSelectItem
          key={index}
          checked={checked}
          onClick={onClick}
          ref={(ref) => this.selectItems[index] = ref}
          onKeyDown={this.onKeyDown.bind(this, index)}
        >
          {option.view ? option.view : this.resolveOptionName(option) }
        </EuiFilterSelectItem>
      );
      if (!checked) {
        items.rest.push(item);
      } else if (checked === 'on') {
        items.on.push(item);
      } else {
        items.off.push(item);
      }
      return items;
    }, { on: [], off: [], rest: [] });
    return (
      <div className="euiFilterSelect__items">
        {[...items.on, ...items.off, ...items.rest ]}
      </div>
    );
  }

  resolveChecked(clause) {
    if (clause) {
      return Query.isMust(clause) ? 'on' : 'off';
    }
  }

  renderLoader() {
    const message = this.props.config.loadingMessage || defaults.config.loadingMessage;
    return (
      <div className="euiFilterSelect__note">
        <div className="euiFilterSelect__noteContent">
          <EuiLoadingChart size="m"/>
          <EuiSpacer size="xs"/>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  renderError(message) {
    return (
      <div className="euiFilterSelect__note">
        <div className="euiFilterSelect__noteContent">
          <EuiIcon size="m" type="faceSad" color="danger"/>
          <EuiSpacer size="xs"/>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  renderNoOptions() {
    const message = this.props.config.noOptionsMessage || defaults.config.noOptionsMessage;
    return (
      <div className="euiFilterSelect__note">
        <div className="euiFilterSelect__noteContent">
          <EuiIcon type="minusInCircle"/>
          <EuiSpacer size="xs"/>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  isActiveField(field) {
    if (typeof field !== 'string') {
      return false;
    }

    const { query } = this.props;
    const multiSelect = this.resolveMultiSelect();

    if (multiSelect === 'or') {
      return query.hasOrFieldClause(field);
    }

    return query.hasSimpleFieldClause(field);
  }
}
