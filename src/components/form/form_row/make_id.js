// Generate statistically almost-certainly-unique `id`s for associating form
// inputs with their labels and other descriptive text elements.
export default function makeId() {
  return Math.random().toString(36).slice(-8);
}
