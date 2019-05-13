import PropTypes from 'prop-types';

import { EuiObserver } from '../observer';

class EuiMutationObserver extends EuiObserver {
  constructor(...args) {
    super(...args);
    this.name = 'EuiMutationObserver';
  }
  beginObserve = () => {
    this.observer = new MutationObserver(this.props.onMutation);
    this.observer.observe(this.childNode, this.props.observerOptions);
  };
}

EuiMutationObserver.propTypes = {
  children: PropTypes.func.isRequired,
  observerOptions: PropTypes.shape({
    // matches a [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
    attributeFilter: PropTypes.arrayOf(PropTypes.string),
    attributeOldValue: PropTypes.bool,
    attributes: PropTypes.bool,
    characterData: PropTypes.bool,
    characterDataOldValue: PropTypes.bool,
    childList: PropTypes.bool,
    subtree: PropTypes.bool,
  }).isRequired,
  onMutation: PropTypes.func.isRequired,
};

export { EuiMutationObserver };
