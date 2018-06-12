import { capitalizeWord } from './text';

describe('capitalizeWord', () => {
  it('works with null values', () => {
    expect(capitalizeWord(null)).toBe('');
  });

  it('works with empty strings', () => {
    expect(capitalizeWord('')).toBe('');
  });

  it('capitalizes the first word', () => {
    expect(capitalizeWord('hello world')).toBe('Hello world');
  });
});
