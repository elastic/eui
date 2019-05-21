import React, { Component } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCode,
  EuiIcon,
  EuiResizeObserver,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

export class ResizeObserverExample extends Component {
  state = {
    hasResizeObserver: typeof ResizeObserver !== 'undefined',
    height: 0,
    width: 0,
    paddingSize: 's',
    items: ['Item 1', 'Item 2', 'Item 3'],
  };

  togglePaddingSize = () => {
    this.setState(({ paddingSize }) => ({
      paddingSize: paddingSize === 's' ? 'l' : 's',
    }));
  };

  addItem = () => {
    this.setState(({ items }) => ({
      items: [...items, `Item ${items.length + 1}`],
    }));
  };

  onResize = ({ height, width }) => {
    this.setState({
      height,
      width,
    });
  };

  render() {
    return (
      <div>
        <EuiText>
          {this.state.hasResizeObserver ? (
            <p>
              <EuiIcon type="checkInCircleFilled" color="secondary" /> Browser
              supports ResizeObserver API.
            </p>
          ) : (
            <p>
              <EuiIcon type="crossInACircleFilled" color="danger" /> Browser
              does not support ResizeObserver API. Using MutationObserver.
            </p>
          )}
          <p>
            <EuiCode>{`height: ${this.state.height}; width: ${
              this.state.width
            }`}</EuiCode>
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiButton fill={true} onClick={this.togglePaddingSize}>
          Toggle container padding
        </EuiButton>

        <EuiSpacer />

        <EuiResizeObserver onResize={this.onResize}>
          {resizeRef => (
            <div className="eui-displayInlineBlock" ref={resizeRef}>
              <EuiPanel
                className="eui-displayInlineBlock"
                paddingSize={this.state.paddingSize}>
                <ul>
                  {this.state.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <EuiSpacer size="s" />
                <EuiButtonEmpty onClick={this.addItem}>add item</EuiButtonEmpty>
              </EuiPanel>
            </div>
          )}
        </EuiResizeObserver>
      </div>
    );
  }
}
