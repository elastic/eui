import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

class GroupSpec extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  static defaultProps = {
  };
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
  }
  render() {
    const { children, id } = this.props;
    return React.Children.map(children, child => {
      return React.cloneElement(child, { groupId: id });
    });
  }
}

export const Group = inject('chartStore')(GroupSpec);
