declare module '@elastic/eui' {
  export const accessibleClickKeys: { [keyCode: number]: string };
  export const cascadingMenuKeyCodes: { [keyCodeName: string]: keyCodes };
  export const comboBoxKeyCodes: { [keyCodeName: string]: keyCodes };
  export const htmlIdGenerator: (prefix?: string) => (suffix?: string) => string;
}
