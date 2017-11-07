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

      </EuiSideNav>
    );
  }
}
