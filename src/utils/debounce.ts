const debounce = (func, delay = 160) => {
  let timeout_instance;
  function debounced(...args) {
    const that = this;
    const later = () => {
      func.apply(that, args);
    };
    clearTimeout(timeout_instance);
    timeout_instance = setTimeout(later, delay);
  }

  debounced.clear = () => {
    clearTimeout(timeout_instance);
  };

  return debounced;
};

export default debounce;
