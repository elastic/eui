import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, Omit } from '../../common';
// @ts-ignore
import { EuiFieldSearch } from '../../form/field_search';
// @ts-ignore
import { getMatchingOptions } from '../../combo_box/matching_options';
import { Option } from '../types';

export type EuiSelectableSearchProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> &
  CommonProps & {
    /**
     * Passes back (matchingOptions, searchValue)
     */
    onChange?: (matchingOptions: [], searchValue: string) => void;
    options?: Option[];
    async?: boolean;
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
    const { options, async } = this.props;
    const { searchValue } = this.state;
    const matchingOptions = getMatchingOptions(
      options,
      [],
      searchValue,
      async,
      true
    );
    this.passUpMatches(matchingOptions, searchValue);
  }

  onSearchChange = (value: string) => {
    this.setState({ searchValue: value });
    const { options, async } = this.props;
    const matchingOptions = getMatchingOptions(options, [], value, async, true);
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
      async,
      defaultValue,
      ...rest
    } = this.props;

    const classes = classNames('euiSelectableSearch', className);

    return (
      <div>
        <EuiFieldSearch
          className={classes}
          onSearch={this.onSearchChange}
          incremental
          defaultValue={defaultValue}
          {...rest}
        />
      </div>
    );
  }
}
