import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCard,
  EuiTitle,
  EuiSpacer,
  EuiPanel,
  EuiText,
  EuiTextColor,
  EuiHealth,
  EuiCallOut,
  EuiHorizontalRule,
  EuiAccordion,
  EuiFormRow,
  EuiFieldNumber,
  EuiFieldText,
  EuiSelect,
  EuiSwitch,
  EuiButton,
  EuiButtonEmpty,
} from '../../../../src/components';

const policies = [
  { name: 'Running hot', hot: true, warm: true },
  { name: 'On call', hot: true, warm: true, cold: true, remove: true},
  { name: 'Archives', hot: true, cold: true},
  { name: 'Deep storage', hot: true, cold: true, remove: true},
  { name: 'Dailies', hot: true},
  { name: 'Dailies archive', hot: true, cold: true, remove: true},
  { name: 'Weeklies', hot: true},
];

export class Step2 extends Component {

  constructor(props) {
    super(props);

  }

  renderPolicies () {
    return (
      <div className="euiAnimateContentLoad">
        <EuiFlexGroup justifyContent="spaceBetween" alignItems="flexEnd">
          <EuiFlexItem grow={false}>
            <EuiTitle>
              <h4>Select a policy to start from</h4>
            </EuiTitle>
            <EuiText>
              <p>You can edit existing policies and save them under a new name later</p>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiHealth color="danger">
                  Hot
                </EuiHealth>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiHealth color="accent">
                  Warm
                </EuiHealth>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiHealth color="primary">
                  Cold
                </EuiHealth>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiHealth color="text">
                  Delete
                </EuiHealth>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <EuiFlexGrid columns={4}>
          <EuiFlexItem>
            <EuiPanel style={{ textAlign: "center" }} onClick={this.props.onSelection}>
              <EuiIcon type="plusInCircle" />
              <EuiTitle size="s">
                <p>New policy</p>
              </EuiTitle>
            </EuiPanel>
          </EuiFlexItem>
          {policies.map(item => (
            <EuiFlexItem
              key={item.name}
            >
              <EuiPanel style={{ textAlign: "center" }} onClick={this.props.onSelection}>
                <EuiTitle size="s">
                  <p>{item.name}</p>
                </EuiTitle>
                {item.hot ? <EuiIcon type="dot" color="danger" /> : null}
                {item.warm ? <EuiIcon type="dot" color="accent" /> : null}
                {item.cold ? <EuiIcon type="dot" color="primary" /> : null}
                {item.remove ? <EuiIcon type="dot" color="text" /> : null}
              </EuiPanel>
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      </div>
    );
  }

  render() {
    const {
      onSelection,
      ...rest
    } = this.props;


    return (
      <div>
        {this.renderPolicies()}
      </div>
    );
  }
};
