import React, {
  Component,
} from 'react';

import {
  EuiExpression,
  EuiExpressionButton,
  EuiPopoverTitle,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPopover,
  EuiSelect,
  EuiFieldText,
} from '../../../../src/components';

// Rise the popovers above GuidePageSideNav
const POPOVER_STYLE = { zIndex: '200' };

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      example1: {
        isOpen: false,
        value: 'count()'
      },
      example2: {
        object: 'A',
        value: '100',
        description: 'Is above'
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

  changeExample1 = (event) => {
    this.setState({ example1: { ...this.state.example1, value: event.target.value } });
  }

  changeExample2Object = (event) => {
    this.setState({ example2: { ...this.state.example2, object: event.target.value } });
  }

  changeExample2Value = (event) => {
    this.setState({ example2: { ...this.state.example2, value: event.target.value } });
  }

  changeExample2Description = (event) => {
    this.setState({ example2: { ...this.state.example2, description: event.target.value } });
  }

  renderPopover1() {
    return (
      <div style={POPOVER_STYLE}>
        <EuiPopoverTitle>When</EuiPopoverTitle>
        <EuiExpression style={{ width: 180 }}>
          <EuiSelect
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
        </EuiExpression>
      </div>
    );
  }

  renderPopover2() {
    return (
      <div style={POPOVER_STYLE}>
        <EuiPopoverTitle>{this.state.example2.description}</EuiPopoverTitle>
        <EuiExpression>
          <EuiFlexGroup style={{ maxWidth: 600 }}>
            <EuiFlexItem grow={false} style={{ width: 80 }}>
              <EuiSelect
                value={this.state.example2.object}
                onChange={this.changeExample2Object}
                options={[
                  { value: 'A', text: 'A' },
                  { value: 'B', text: 'B' },
                  { value: 'C', text: 'C' },
                ]}
              />
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ width: 150 }}>
              <EuiSelect
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
              <EuiFieldText
                value={this.state.example2.value}
                onChange={this.changeExample2Value}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiExpression>
      </div>
    );
  }

  render() {
    return (
      <EuiFlexGroup gutterSize="m">
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="popover1"
            button={(
              <EuiExpressionButton
                description="when"
                buttonValue={this.state.example1.value}
                isActive={this.state.example1.isOpen}
                onClick={this.openExample1}
              />
            )}
            isOpen={this.state.example1.isOpen}
            closePopover={this.closeExample1}
            panelPaddingSize="none"
            ownFocus
            withTitle
            anchorPosition="downLeft"
          >
            {this.renderPopover1()}
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="popover2"
            button={(
              <EuiExpressionButton
                description={this.state.example2.description}
                buttonValue={this.state.example2.value}
                isActive={this.state.example2.isOpen}
                onClick={this.openExample2}
              />
            )}
            isOpen={this.state.example2.isOpen}
            closePopover={this.closeExample2}
            panelPaddingSize="none"
            ownFocus
            withTitle
            anchorPosition="downLeft"
          >
            {this.renderPopover2()}
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
