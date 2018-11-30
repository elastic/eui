export interface CommonProps {
  className?: string;
  'aria-label'?: string;
  'data-test-subj'?: string;
}

export type NoArgCallback<T> = () => T;

export type RefCallback<Element extends HTMLElement> = (
  element: Element
) => void;

// utility types:

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
