import React from 'react';
import { inject } from 'mobx-react';

class SpecSpec extends React.PureComponent {
  componentDidMount() {
    this.updateSpecOnStore();
  }
  componentDidUpdate() {
    this.updateSpecOnStore();
  }
  componentWillUnmount() {
    this.updateSpecOnStore();
  }
  updateSpecOnStore = () => {
  }
  render() {
    return null;
  }
}

export const Spec = inject('chartStore')(SpecSpec);
