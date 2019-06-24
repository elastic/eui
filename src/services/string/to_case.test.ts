import { toSentenceCase } from './to_case';

describe('toSentenceCase', () => {
  it("should return the same single word with the first letter capitalized for 'single'", () => {
    expect(toSentenceCase('single')).toBe('Single');
  });

  it("should return all the words with ony the first letter of the first word capitalized for 'two words'", () => {
    expect(toSentenceCase('two words')).toBe('Two words');
  });

  it("should return all the words with ony the first letter of the first word capitalized for 'opposite Of Sentence Case'", () => {
    expect(toSentenceCase('opposite Of Sentence Case')).toBe(
      'Opposite of sentence case'
    );
  });
});
