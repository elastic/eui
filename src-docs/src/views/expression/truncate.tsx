import React, { Component, HTMLAttributes } from 'react';
import { CommonProps } from '../../../../src/components/common';
import { EuiExpression } from '../../../../src/components/expression';
import { EuiToolTip } from '../../../../src/components/tool_tip';
import { EuiPanel } from '../../../../src/components/panel';
import {
  EuiPopoverTitle,
  EuiPopover,
} from '../../../../src/components/popover';
import { EuiSelect } from '../../../../src/components/form/select';

export type TruncateProps = HTMLAttributes<HTMLDivElement> & CommonProps & {};

interface TruncateState {
  isOpen: boolean;
  value: string;
}

export default class extends Component<TruncateProps, TruncateState> {
  state = {
    isOpen: false,
    value: 'products.discount_percentage',
  };

  togglePopover = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  closeExample = () => {
    this.setState({
      isOpen: false,
    });
  };

  changeExample = (event: any) => {
    this.setState({
      value: event.target.value,
    });
    this.closeExample();
  };

  renderPopover = () => (
    <div style={{ zIndex: 200 }}>
      <EuiPopoverTitle>Average of</EuiPopoverTitle>
      <EuiSelect
        compressed
        value={this.state.value}
        onChange={e => this.changeExample(e)}
        options={[
          {
            value: 'products.base_price',
            text: 'products.base_price',
          },
          {
            value: 'products.base_unit_price',
            text: 'products.base_unit_price',
          },
          {
            value: 'products.discount_percentage',
            text: 'products.discount_percentage',
          },
          { value: 'day_of_week_i', text: 'day_of_week_i' },
        ]}
      />
    </div>
  );

  render() {
    const popOver = (
      <EuiPopover
        button={
          <EuiExpression
            truncate={true}
            style={{ maxWidth: '220px' }}
            description="Average of"
            value={this.state.value}
            isActive={this.state.isOpen}
            onClick={() => this.togglePopover()}
          />
        }
        isOpen={this.state.isOpen}
        closePopover={() => this.closeExample()}
        ownFocus
        panelPaddingSize="s"
        anchorPosition="downLeft">
        {this.renderPopover()}
      </EuiPopover>
    );

    return (
      <EuiPanel
        paddingSize="l"
        style={{ paddingRight: '32px', width: '260px' }}>
        {this.state.isOpen ? (
          popOver
        ) : (
          <EuiToolTip content={this.state.value}>{popOver}</EuiToolTip>
        )}
      </EuiPanel>
    );
  }
}
