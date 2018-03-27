export const Browser = Object.freeze({

  isEventSupported: (name, element) => {
    return `on${name}` in element;
  }

});
