import React, { Component, Fragment } from 'react';

import { EuiButtonEmpty } from '../../../../src/components/button';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Option } from '../../../../src/components/selectable/types';
import { Options } from './data';

export default class extends Component<{}, { options: Option[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      options: Options as Option[],
    };
  }

  onChange = (options: Option[]) => {
    this.setState({
      options,
    });
  };

  render() {
    const { options } = this.state;

    return (
      <Fragment>
        <EuiButtonEmpty
          onClick={() => {
            this.setState({
              options: Options.map(option => ({
                ...option,
                checked: undefined,
              })),
            });
          }}>
          Deselect all
        </EuiButtonEmpty>
        <EuiSelectable
          searchable
          searchProps={{
            'data-test-subj': 'selectableSearchHere',
          }}
          options={options}
          onChange={this.onChange}>
          {(list, search) => (
            <Fragment>
              {search}
              {list}
            </Fragment>
          )}
        </EuiSelectable>
      </Fragment>
    );
  }
}
