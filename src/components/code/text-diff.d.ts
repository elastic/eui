declare module 'text-diff' {
  interface ConstructorProps {
    timeout: number;
  }

  type DiffElement = [-1 | 0 | 1, string];

  class Diff {
    constructor({ timeout }: ConstructorProps);
    main: (initialText: string, currentText: string) => DiffElement[];
  }
  export = Diff;
}
