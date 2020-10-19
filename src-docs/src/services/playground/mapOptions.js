export const mapOptions = (optionArray) => {
  const options = {};

  for (let i = 0; i < optionArray.length; i++) {
    const val = optionArray[i];
    options[val] = val;
  }
  return options;
};
