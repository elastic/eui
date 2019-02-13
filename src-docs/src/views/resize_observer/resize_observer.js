import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCode,
  EuiIcon,
  EuiResizeObserver,
  EuiPanel,
  EuiSpacer,
  EuiText
} from '../../../../src/components';

export class ResizeObserverExample extends Component {
  state = {
    hasResizeObserver: typeof ResizeObserver !== 'undefined',
    lastMutation: 'no resize detected',
    paddingSize: 's',
    items: ['Item 1', 'Item 2', 'Item 3'],
  };

  togglePaddingSize = () => {
    this.setState(({ paddingSize }) => ({
      paddingSize: paddingSize === 's' ? 'l' : 's'
    }));
  }

  addItem = () => {
    this.setState(({ items }) => ({
      items: [...items, `Item ${items.length + 1}`]
    }));
  }

  onResize = ([entry]) => {
    let lastMutation;
    if (this.state.hasResizeObserver) {
      lastMutation = <EuiCode>{`height: ${entry.contentRect.height}; width: ${entry.contentRect.width}`}</EuiCode>;
    } else {
      lastMutation = entry.type === 'attributes'
        ? 'class name changed'
        : 'DOM tree changed';
    }
    this.setState({
      lastMutation
    });
  }

  render() {
    return (
      <div>
        <EuiText>
          {this.state.hasResizeObserver ? (
            <p><EuiIcon type="checkInCircleFilled" color="secondary" />  Browser supports ResizeObserver API.</p>
          ) : (
            <p>
              <EuiIcon type="crossInACircleFilled" color="danger" /> Browser does not support ResizeObserver API. Using MutationObserver.
            </p>
          )}
          <p>{this.state.lastMutation}</p>
        </EuiText>

        <EuiSpacer/>

        <EuiButton fill={true} onClick={this.togglePaddingSize}>
          Toggle container padding
        </EuiButton>

        <EuiSpacer/>

        <EuiResizeObserver
          onResize={this.onResize}
        >
          {resizeRef => (
            <div className="eui-displayInlineBlock" ref={resizeRef}>
              <EuiPanel className="eui-displayInlineBlock" paddingSize={this.state.paddingSize}>
                <ul>
                  {this.state.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                <EuiSpacer size="s"/>
                <EuiButtonEmpty onClick={this.addItem}>add item</EuiButtonEmpty>
              </EuiPanel>
            </div>
          )}
        </EuiResizeObserver>
      </div>
    );
  }
}
