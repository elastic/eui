import React, { Component } from 'react';

import {
  EuiPopoverTitle,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPopover,
  EuiSelect,
  EuiFieldNumber,
} from '../../../../src/components';

import { EuiExpression } from '../../../../src/components/expression';

// Rise the popovers above GuidePageSideNav
const POPOVER_STYLE = { zIndex: '200' };

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      example1: {
        isOpen: false,
        value: 'count()',
      },
      example2: {
        value: 100,
        description: 'Is above',
      },
    };
  }

  openExample1 = () => {
    this.setState({
      example1: {
        ...this.state.example1,
        isOpen: true,
      },
      example2: {
        ...this.state.example2,
        isOpen: false,
      },
    });
  };

  closeExample1 = () => {
    this.setState({
      example1: {
        ...this.state.example1,
        isOpen: false,
      },
    });
  };

  openExample2 = () => {
    this.setState({
      example1: {
        ...this.state.example1,
        isOpen: false,
      },
      example2: {
        ...this.state.example2,
        isOpen: true,
      },
    });
  };

  closeExample2 = () => {
    this.setState({
      example2: {
        ...this.state.example2,
        isOpen: false,
      },
    });
  };

  changeExample1 = event => {
    this.setState({
      example1: { ...this.state.example1, value: event.target.value },
    });
  };

  changeExample2Value = e => {
    const sanitizedValue = parseInt(e.target.value, 10);
    this.setState({
      example2: {
        ...this.state.example2,
        value: isNaN(sanitizedValue) ? '' : sanitizedValue,
      },
    });
  };

  changeExample2Description = event => {
    this.setState({
      example2: { ...this.state.example2, description: event.target.value },
    });
  };

  renderPopover1() {
    return (
      <div style={POPOVER_STYLE}>
        <EuiPopoverTitle>When</EuiPopoverTitle>
        <EuiSelect
          compressed
          value={this.state.example1.value}
          onChange={this.changeExample1}
          options={[
            { value: 'count()', text: 'count()' },
            { value: 'average()', text: 'average()' },
            { value: 'sum()', text: 'sum()' },
            { value: 'median()', text: 'median()' },
            { value: 'min()', text: 'min()' },
            { value: 'max()', text: 'max()' },
          ]}
        />
      </div>
    );
  }

  renderPopover2() {
    return (
      <div style={POPOVER_STYLE}>
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem grow={false} style={{ width: 150 }}>
            <EuiSelect
              compressed
              value={this.state.example2.description}
              onChange={this.changeExample2Description}
              options={[
                { value: 'Is above', text: 'Is above' },
                { value: 'Is below', text: 'Is below' },
                { value: 'Is exactly', text: 'Is exactly' },
              ]}
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false} style={{ width: 100 }}>
            <EuiFieldNumber
              compressed
              value={this.state.example2.value}
              onChange={this.changeExample2Value}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }

  render() {
    return (
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="popover1"
            button={
              <EuiExpression
                description="when"
                value={this.state.example1.value}
                isActive={this.state.example1.isOpen}
                onClick={this.openExample1}
              />
            }
            isOpen={this.state.example1.isOpen}
            closePopover={this.closeExample1}
            ownFocus
            panelPaddingSize="s"
            anchorPosition="downLeft">
            {this.renderPopover1()}
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="popover2"
            panelPaddingSize="s"
            button={
              <EuiExpression
                description={this.state.example2.description}
                value={this.state.example2.value}
                isActive={this.state.example2.isOpen}
                onClick={this.openExample2}
              />
            }
            isOpen={this.state.example2.isOpen}
            closePopover={this.closeExample2}
            ownFocus
            anchorPosition="downLeft">
            {this.renderPopover2()}
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
