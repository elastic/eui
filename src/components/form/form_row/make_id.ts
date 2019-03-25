// Generate statistically almost-certainly-unique `id`s for associating form
// inputs with their labels and other descriptive text elements.
function makeId(): string {
  return Math.random()
    .toString(36)
    .slice(-8);
}

export default makeId;
