import { ReactNode } from 'react';

import { EuiObserver } from '../observer';

interface Props {
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onMutation: MutationCallback;
  observerOptions?: MutationObserverInit;
}

export class EuiMutationObserver extends EuiObserver<Props> {
  name = 'EuiMutationObserver';

  beginObserve = () => {
    this.observer = new MutationObserver(this.props.onMutation);
    this.observer.observe(this.childNode!, this.props.observerOptions);
  };
}
