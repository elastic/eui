import React, { Component } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiFieldSearch, EuiFieldSearchProps } from '../../form';
import { getMatchingOptions } from '../matching_options';
import { EuiSelectableOption } from '../selectable_option';

export type EuiSelectableSearchProps = Omit<EuiFieldSearchProps, 'onChange'> &
  CommonProps & {
    /**
     * Passes back (matchingOptions, searchValue)
     */
    onChange?: (
      matchingOptions: EuiSelectableOption[],
      searchValue: string
    ) => void;
    options: EuiSelectableOption[];
    defaultValue: string;
    listId: string;
  };

export interface EuiSelectableSearchState {
  searchValue: string;
}

export class EuiSelectableSearch extends Component<
  EuiSelectableSearchProps,
  EuiSelectableSearchState
> {
  static defaultProps = {
    defaultValue: '',
  };

  constructor(props: EuiSelectableSearchProps) {
    super(props);

    this.state = {
      searchValue: props.defaultValue,
    };
  }

  componentDidMount() {
    const { options } = this.props;
    const { searchValue } = this.state;
    const matchingOptions = getMatchingOptions(options, searchValue);
    this.passUpMatches(matchingOptions, searchValue);
  }

  onSearchChange = (value: string) => {
    this.setState({ searchValue: value });
    const { options } = this.props;
    const matchingOptions = getMatchingOptions(options, value);
    this.passUpMatches(matchingOptions, value);
  };

  passUpMatches = (matches: EuiSelectableOption[], searchValue: string) => {
    if (this.props.onChange) {
      this.props.onChange(matches, searchValue);
    }
  };

  render() {
    const {
      className,
      onChange,
      options,
      defaultValue,
      listId,
      placeholder,
      ...rest
    } = this.props;

    const classes = classNames('euiSelectableSearch', className);

    return (
      <EuiFieldSearch
        className={classes}
        placeholder={placeholder}
        onSearch={this.onSearchChange}
        incremental
        defaultValue={defaultValue}
        fullWidth
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={listId}
        aria-owns={listId} // legacy attribute but shims support for nearly everything atm
        aria-haspopup="listbox"
        {...rest}
      />
    );
  }
}
