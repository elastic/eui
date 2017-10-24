import React, {
  Component,
} from 'react';

import {
  EuiSideNav,
  EuiSideNavItem,
  EuiSideNavTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavOpenOnMobile: false,
    };
  }

  toggleOpenOnMobile() {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  }

  render() {
    const sideNav = (
      <EuiSideNav
        mobileTitle="Navigate my favorite comic books"
        toggleOpenOnMobile={this.toggleOpenOnMobile.bind(this)}
        isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        type="inPanel"
      >
        <EuiSideNavTitle>
          My favorite comic books
        </EuiSideNavTitle>

        <EuiSideNavItem>
          <button>
            Watchmen
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            Batman: The Dark Knight Returns
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem isSelected>
          <button>
            Elektra: Assassin
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            V for Vendetta
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            Superman: Red Son
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            New Mutants
          </button>
        </EuiSideNavItem>
      </EuiSideNav>
    );

    return (
      <EuiFlexGroup>
        <EuiFlexItem grow={false} style={{ width: 200 }}>
          {sideNav}
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText>
            <h2>Elektra: Assassin</h2>
            <p>
              Elektra: Assassin is an eight-issue limited series published by Epic Comics,
              an imprint of Marvel Comics, between August 1986 and March 1987. Written
              by Frank Miller and illustrated by Bill Sienkiewicz, Elektra: Assassin
              satirizes ultra-violence, politics, comic book clichés like ninjas and
              cyborgs, and the portrayal of women.
            </p>
            <p>
              Elektra: Assassin is an eight-issue limited series published by Epic Comics,
              an imprint of Marvel Comics, between August 1986 and March 1987. Written
              by Frank Miller and illustrated by Bill Sienkiewicz, Elektra: Assassin
              satirizes ultra-violence, politics, comic book clichés like ninjas and
              cyborgs, and the portrayal of women.
            </p>
            <p>
              Elektra: Assassin is an eight-issue limited series published by Epic Comics,
              an imprint of Marvel Comics, between August 1986 and March 1987. Written
              by Frank Miller and illustrated by Bill Sienkiewicz, Elektra: Assassin
              satirizes ultra-violence, politics, comic book clichés like ninjas and
              cyborgs, and the portrayal of women.
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
