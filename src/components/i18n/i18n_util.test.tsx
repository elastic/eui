import { processStringToChildren } from './i18n_util';

describe('i18n_util', () => {
  describe('processStringToChildren', () => {
    it('returns a basic string as is', () => {
      const message = 'This is a test message.';
      expect(processStringToChildren(message, {})).toEqual(message);
    });

    it('replaces placeholders with values', () => {
      expect(
        processStringToChildren('{greeting}, {name}', {
          greeting: 'Hello',
          name: 'John',
        })
      ).toEqual('Hello, John');
    });

    describe('escape characters', () => {
      it('backslash escapes opening and closing braces', () => {
        expect(
          processStringToChildren('{greeting}, \\{{name}\\}', {
            greeting: 'Hello',
            name: 'John',
          })
        ).toEqual('Hello, {John}');
      });

      it('backslash does not escape any other characters', () => {
        const message = 'Thi\\s is\\ a test \\message\\.';
        expect(processStringToChildren(message, {})).toEqual(message);
      });
    });

    describe('i18nMappingFunction', () => {
      it('calls the mapping function with the source string', () => {
        expect(
          processStringToChildren(
            'Hello, {name}',
            { greeting: 'Hello', name: 'John' },
            value => value.toUpperCase()
          )
        ).toEqual('HELLO, JOHN');
      });
    });
  });
});
