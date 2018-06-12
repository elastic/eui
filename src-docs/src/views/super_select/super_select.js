import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
  EuiIcon,
  EuiContextMenuItem,
  EuiHorizontalRule,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: 'option_one',
        text: 'Option one',
        display: (
          <Fragment>
            <strong>Option one</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_two',
        text: (
          <span>
            <EuiIcon type="alert" /> Option two
          </span>
        ),
        display: (
          <Fragment>
            <strong>Option two</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_three',
        text: 'Option three has a super long text to see if it will truncate or what',
        display: (
          <Fragment>
            <strong>Option three</strong>
            <EuiSpacer size="xs" />
            <EuiText size="s" color="subdued">
              <p className="euiTextColor--subdued">Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
    ];

    this.state = {
      value: this.options[1].value,
      isPopoverOpen: false,
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  itemClicked = (value) => {
    this.setState({
      value: value,
      isPopoverOpen: false,
    });
  };

  render() {
    const items = this.options.map((option, index) => {
      return (
        <Fragment>
          <EuiContextMenuItem
            key={index}
            icon={this.state.value === option.value ? "check" : "empty"}
            onClick={() => this.itemClicked(option.value)}
            layoutAlign="top"
          >
            {option.display}
          </EuiContextMenuItem>
          {index < this.options.length - 1 &&
            <EuiHorizontalRule margin="none" />
          }
        </Fragment>
      );
    });

    return (
      <Fragment>
        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          isOpen={this.state.isPopoverOpen}
          aria-label="Use aria labels when no actual label is in use"
        >
          {items}
        </EuiSuperSelect>

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
        >
          {items}
        </EuiSuperSelect>

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          aria-label="Use aria labels when no actual label is in use"
        >
          {items}
        </EuiSuperSelect>

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
          aria-label="Use aria labels when no actual label is in use"
        >
          {items}
        </EuiSuperSelect>

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          compressed
        >
          {items}
        </EuiSuperSelect>
      </Fragment>
    );
  }
}
