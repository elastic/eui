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

export class GuideHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  render() {
    return (
      <div className="guideHeader">
        <EuiFlexGroup alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>
            <Link
              to="/"
              onClick={this.props.onShowChrome}
            >
              <EuiIcon type="logoKibana" size="m" />
            </Link>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <button
              onClick={this.props.onToggleTheme}
              className="guideHeader__link"
            >
              Theme
            </button>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <button
              onClick={this.props.onShowChrome}
            >
              <EuiIcon type="list" size="m" className="guideHeader__appListIcon" />
            </button>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

GuideHeader.propTypes = {
  isChromeVisible: PropTypes.bool,
  onToggleNav: PropTypes.func,
  onHideChrome: PropTypes.func,
  onShowChrome: PropTypes.func,
  onClickNavItem: PropTypes.func,
  routes: PropTypes.array,
  getPreviousRoute: PropTypes.func,
  components: PropTypes.array,
};
