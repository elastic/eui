import React, {
  Component,
} from 'react';

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAppMenuOpen: false,
    };
  }

  render() {
    return (
      <EuiHeader>

        <EuiHeaderSectionItem border="none">
          <EuiHeaderLogo href="#">
            Elastic
          </EuiHeaderLogo>
        </EuiHeaderSectionItem>

        <EuiHeaderLinks>
          <EuiHeaderLink href="#" isActive>
            Products
          </EuiHeaderLink>

          <EuiHeaderLink href="#">
            Licenses
          </EuiHeaderLink>

          <EuiHeaderLink href="#">
            Usage
          </EuiHeaderLink>
        </EuiHeaderLinks>

      </EuiHeader>
    );
  }
}
