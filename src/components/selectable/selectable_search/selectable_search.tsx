import React, { Component, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiFieldSearch, EuiFieldSearchProps } from '../../form/field_search';
import { getMatchingOptions } from '../matching_options';
import { EuiSelectableOption } from '../selectable_option';

export type EuiSelectableSearchProps = Omit<
  InputHTMLAttributes<HTMLInputElement> & EuiFieldSearchProps,
  'onChange'
> &
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
    const { className, onChange, options, defaultValue, ...rest } = this.props;

    const classes = classNames('euiSelectableSearch', className);

    return (
      <EuiFieldSearch
        className={classes}
        placeholder="Filter options"
        onSearch={this.onSearchChange}
        incremental
        defaultValue={defaultValue}
        fullWidth
        {...rest}
      />
    );
  }
}
