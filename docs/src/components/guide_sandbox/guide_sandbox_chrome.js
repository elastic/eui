import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import {
  Link,
} from 'react-router';

import {
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export class GuideSandboxChrome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  render() {
    return (
      <div className="guideSandboxChrome">
        <EuiFlexGroup alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>
            <Link
              to="/"
              onClick={this.props.exitSandbox}
            >
              <EuiIcon type="logoKibana" size="m" />
            </Link>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <button
              onClick={this.props.onToggleTheme}
              className="guideSandboxChrome__link"
            >
              Theme
            </button>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <button
              onClick={this.props.exitSandbox}
            >
              <EuiIcon type="list" size="m" className="guideSandboxChrome__appListIcon" />
            </button>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

GuideSandboxChrome.propTypes = {
  exitSandbox: PropTypes.func,
  onClickNavItem: PropTypes.func,
  routes: PropTypes.array,
  getPreviousRoute: PropTypes.func,
  components: PropTypes.array,
};
