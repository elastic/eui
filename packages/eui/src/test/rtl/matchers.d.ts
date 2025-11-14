declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace,no-redeclare */
  namespace jest {
    interface Matchers<R> {
      /**
       * Custom matcher to check the disabled state of a DOM element.
       * Ensures that both `disabled` and `aria-disabled` attributes are checked.
       */
      toBeEuiDisabled(): R;
      /**
       * Custom matcher to check a DOM element is enabled (= not disabled).
       * Ensures that both `disabled` and `aria-disabled` attributes are checked.
       */
      toBeEuiEnabled(): R;
    }
  }
}

export declare const toBeEuiDisabled: (element: HTMLElement) => {
  message: () => string;
  pass: boolean;
};

export declare const toBeEuiEnabled: (element: HTMLElement) => {
  message: () => string;
  pass: boolean;
};

export declare const isEuiDisabled: (element: HTMLElement) => boolean;

export declare const euiMatchers: {
  toBeEuiDisabled: typeof toBeEuiDisabled;
  toBeEuiEnabled: typeof toBeEuiEnabled;
};

export declare const setupEuiMatchers: () => void;
