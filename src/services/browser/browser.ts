// We don't normally use 'I' prefixes
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IBrowser {
  isEventSupported: (name: string, element: EventTarget) => boolean;
}

const BrowserImpl: IBrowser = {
  isEventSupported: (name, element): boolean => {
    return `on${name}` in element;
  },
};

export const Browser = Object.freeze(BrowserImpl);
