import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
// @ts-ignore
import { EuiFieldSearch } from '../../form/field_search';
// @ts-ignore
import { getMatchingOptions } from '../../combo_box/matching_options';
import { Option } from '../types';

export type EuiSelectableSearchProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Passes back (matchingOptions, searchValue)
     */
    onChange?: (matchingOptions: [], searchValue: string) => void;
    options?: Option[];
    selectedOptions?: Option[];
    async?: boolean;
  };

export interface EuiSelectableSearchState {
  searchValue: string;
}

export class EuiSelectableSearch extends Component<
  EuiSelectableSearchProps,
  EuiSelectableSearchState
> {
  constructor(props: EuiSelectableSearchProps) {
    super(props);

    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    const { options, selectedOptions, async } = this.props;
    const { searchValue } = this.state;
    const matchingOptions = getMatchingOptions(
      options,
      selectedOptions,
      searchValue,
      async,
      true
    );
    this.passUpMatches(matchingOptions, searchValue);
  }

  onSearchChange = (value: string) => {
    this.setState({ searchValue: value });
    const { options, selectedOptions, async } = this.props;
    const matchingOptions = getMatchingOptions(
      options,
      selectedOptions,
      value,
      async,
      true
    );
    this.passUpMatches(matchingOptions, value);
  };

  passUpMatches = (matches: [], searchValue: string) => {
    if (this.props.onChange) {
      this.props.onChange(matches, searchValue);
    }
  };

  render() {
    const {
      className,
      onChange,
      options,
      selectedOptions,
      ...rest
    } = this.props;

    const classes = classNames('euiSelectableSearch', className);

    return (
      <div>
        <EuiFieldSearch
          className={classes}
          onSearch={this.onSearchChange}
          incremental
          {...rest}
        />
      </div>
    );
  }
}
