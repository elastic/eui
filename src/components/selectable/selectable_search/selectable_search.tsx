import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
// @ts-ignore
import { EuiFieldSearch } from '../../form/field_search';
// @ts-ignore
import { getMatchingOptions } from '../../combo_box/matching_options';

export type EuiSelectableSearchProps = HTMLAttributes<HTMLInputElement> &
  CommonProps & {
    /**
     * Passes back (matchingOptions, searchValue)
     */
    onChange?: (matchingOptions: [], searchValue: string) => void;
    options?: [];
  };

export class EuiSelectableSearch extends Component<EuiSelectableSearchProps> {
  constructor(props: EuiSelectableSearchProps) {
    super(props);

    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    const { options, selectedOptions } = this.props;
    const { searchValue } = this.state;
    const matchingOptions = getMatchingOptions(
      options,
      selectedOptions,
      searchValue,
      this.props.async,
      true
    );
    this.passUpMatches(matchingOptions, searchValue);
  }

  onSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value });
    const { options, selectedOptions } = this.props;
    const matchingOptions = getMatchingOptions(
      options,
      selectedOptions,
      e.target.value,
      this.props.async,
      true
    );
    this.passUpMatches(matchingOptions, e.target.value);
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
      <EuiFieldSearch
        className={classes}
        onChange={this.onSearchChange}
        {...rest}
      />
    );
  }
}
