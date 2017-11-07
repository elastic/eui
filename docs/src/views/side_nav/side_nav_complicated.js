import React, {
  Component,
} from 'react';

import {
  EuiIcon,
  EuiSideNav,
  EuiSideNavItem,
  EuiSideNavTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavOpenOnMobile: false,
    };
  }

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  render() {
    return (
      <EuiSideNav
        mobileTitle="Navigate within $APP_NAME"
        toggleOpenOnMobile={this.toggleOpenOnMobile}
        isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        style={{ width: 192 }}
      >
        {/* Elasticsearch section */}

        <EuiSideNavTitle>
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiIcon type="logoElasticSearch" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              Elasticsearch
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiSideNavTitle>

        <div className="euiSideNavGroup">
          <EuiSideNavItem>
            <button onClick={() => window.alert('Button clicked')}>
              Data sources
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <a href="http://www.elastic.co">
              Users
            </a>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Roles
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Watches
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Extremely long title will become truncated when the browser is narrow enough
            </button>
          </EuiSideNavItem>
        </div>

        {/* Kibana section */}

        <EuiSideNavTitle>
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiIcon type="logoKibana" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              Kibana
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiSideNavTitle>

        <div className="euiSideNavGroup">
          <EuiSideNavItem isSelected parent>
            <button>
              Advanced settings
            </button>
          </EuiSideNavItem>

          <div className="euiSideNavGroup">
            <EuiSideNavItem>
              <button>
                General
              </button>
            </EuiSideNavItem>

            <EuiSideNavItem isSelected parent>
              <button>
                Timelion
              </button>
            </EuiSideNavItem>

            <div className="euiSideNavGroup">
              <EuiSideNavItem>
                <button>
                  Time stuff
                </button>
              </EuiSideNavItem>

              <EuiSideNavItem isSelected>
                <button>
                  Lion stuff
                </button>
              </EuiSideNavItem>
            </div>

            <EuiSideNavItem>
              <button>
                Visualizations
              </button>
            </EuiSideNavItem>
          </div>

          <EuiSideNavItem>
            <button>
              Index Patterns
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem parent>
            <button>
              Saved Objects
            </button>
          </EuiSideNavItem>

          <EuiSideNavItem>
            <button>
              Reporting
            </button>
          </EuiSideNavItem>
        </div>

        {/* Logstash section */}

        <EuiSideNavTitle>
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiIcon type="logoLogstash" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              Logstash
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiSideNavTitle>

        <div className="euiSideNavGroup">
          <EuiSideNavItem>
            <button>
              Pipeline Viewer
            </button>
          </EuiSideNavItem>
        </div>
      </EuiSideNav>
    );
  }
}
