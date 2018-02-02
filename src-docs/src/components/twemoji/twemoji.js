import { isEqual } from 'lodash';

import React, {
  Component,
} from 'react';

import {
  findDOMNode,
} from 'react-dom';

export class Twemoji extends Component {
  componentWillMount() {
    const script = document.createElement('script');

    // a nice to have for the examples, but not something we want to bundle
    script.src = 'https://twemoji.maxcdn.com/2/twemoji.min.js?2.4';
    script.async = true;
    script.onload = () => this.parseTwemoji();

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.parseTwemoji();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      this.parseTwemoji();
    }
  }

  render() {
    return <span {...this.props} />;
  }

  parseTwemoji() {
    const node = findDOMNode(this);

    if (window.twemoji) {
      window.twemoji.parse(node, { className: 'twemoji' });
    }
  }
}
