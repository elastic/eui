import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiSuperSelect,
  EuiSpacer,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiPopover,
  EuiText,
  EuiIcon,
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
            <EuiText size="s">
              <h3>Option one</h3>
              <p>Has a short description giving more detail to the option.</p>
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
            <EuiText size="s">
              <h3>Option Two</h3>
              <p>Has a short description giving more detail to the option.</p>
            </EuiText>
          </Fragment>
        ),
      },
      {
        value: 'option_three',
        text: 'Option three has a super long text to see if it will truncate or what',
        display: (
          <Fragment>
            <EuiText size="s">
              <h3>Option Three</h3>
              <p>Has a short description giving more detail to the option.</p>
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

  onButtonClick = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

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
    const button = (
      <EuiSuperSelect
        options={this.options}
        value={this.state.value}
        onChange={this.onChange}
        onClick={this.onButtonClick}
        aria-label="Use aria labels when no actual label is in use"
      />
    );

    const items = this.options.map((option, index) => {
      return (
        <EuiContextMenuItem
          key={index}
          icon={this.state.value === option.value ? "check" : "empty"}
          onClick={() => this.itemClicked(option.value)}
        >
          {option.display}
        </EuiContextMenuItem>
      );
    });

    return (
      <Fragment>
        <EuiPopover
          style={{ width: '100%', maxWidth: '400px' }}
          id="singlePanel"
          button={button}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover}
          panelPaddingSize="none"
          anchorPosition="downRight"
        >
          <EuiContextMenuPanel
            items={items}
            style={{ width: '100%' }}
          />
        </EuiPopover>

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiSuperSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
          compressed
        />
      </Fragment>
    );
  }
}
