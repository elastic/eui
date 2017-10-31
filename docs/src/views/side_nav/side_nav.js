import React, {
  Component,
} from 'react';

import {
  EuiSideNav,
  EuiSideNavItem,
  EuiSideNavTitle,
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
      >
        {/* Elasticsearch section */}

        <EuiSideNavTitle>
          Elasticsearch
        </EuiSideNavTitle>

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

        {/* Kibana section */}

        <EuiSideNavTitle>
          Kibana
        </EuiSideNavTitle>

        <EuiSideNavItem isSelected>
          <button>
            Advanced settings
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem indent>
          <button>
            General
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem indent isSelected>
          <button>
            Timelion
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem indent>
          <button>
            Visualizations
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            Index Patterns
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            Saved Objects
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            Reporting
          </button>
        </EuiSideNavItem>

        {/* Logstash section */}

        <EuiSideNavTitle>
          Logstash
        </EuiSideNavTitle>

        <EuiSideNavItem>
          <button>
            Pipeline Viewer
          </button>
        </EuiSideNavItem>
      </EuiSideNav>
    );
  }
}
