import PropTypes from 'prop-types';

import { EuiObserver } from '../observer';

class EuiResizeObserver extends EuiObserver {
  constructor(...args) {
    super(...args);
    this.name = 'EuiResizeObserver';
    // Only Chrome and Opera support the `ResizeObserver` API at the time of writing
    this.hasResizeObserver = typeof ResizeObserver !== 'undefined';
  }

  beginObserve = () => {
    let observerOptions;
    if (this.hasResizeObserver) {
      this.observer = new ResizeObserver(this.props.onResize);
    } else {
      // MutationObserver fallback
      observerOptions = {     // [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
        attributes: true,     // Account for style changes from `className` or `style`
        characterData: true,  // Account for text content size differences
        childList: true,      // Account for adding/removing child nodes
        subtree: true         // Account for deep child nodes
      };
      this.observer = new MutationObserver(this.props.onResize);
    }
    this.observer.observe(this.childNode, observerOptions);
  }
}

EuiResizeObserver.propTypes = {
  children: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
};

export { EuiResizeObserver };
