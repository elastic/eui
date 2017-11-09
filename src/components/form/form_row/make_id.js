export default function makeId() {
  return Math.random().toString(36).slice(-8);
}
