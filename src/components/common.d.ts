declare module '@elastic/eui' {
  export type AnyProps = { [key: string]: string };

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

  type Diff<T extends string, U extends string> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T];

  type Omit<T, K extends keyof T> = { [P in Diff<keyof T, K>]: T[P] };
}
