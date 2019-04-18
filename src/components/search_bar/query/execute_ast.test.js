import { AST } from './ast';
import { executeAst } from './execute_ast';
import { Random } from '../../../services/random';

const random = new Random();

describe('execute ast', () => {

  test('single matching field clause', () => {
    const items = [
      { name: 'john doe' },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must.eq('name', 'john')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john doe');
  });

  test('single matching field clause with negation', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.mustNot.eq('name', 'john')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('single matching multi-valued field clause', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    let result = executeAst(AST.create([
      AST.Field.must.eq('name', ['john', 'doe'])
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john');

    result = executeAst(AST.create([
      AST.Field.must.eq('name', ['joe', 'doe'])
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');

    result = executeAst(AST.create([
      AST.Field.must.eq('name', ['foo', 'bar'])
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('single non-matching field clause', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must.eq('name', 'foo')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - non-matching', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must.eq('name', 'john'),
      AST.Field.must.eq('name', 'joe')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - non-matching 2', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must.eq('name', 'foo'),
      AST.Field.must.eq('age', '7')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - matching', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must.eq('name', 'john'),
      AST.Field.must.eq('age', '5')
    ]), items);
    expect(result).toHaveLength(1);
  });

  test('single exact matching field clause', () => {
    const items = [
      { name: 'john doe' },
      { name: 'joe' }
    ];
    let result = executeAst(AST.create([
      AST.Field.must.exact('name', 'john')
    ]), items);
    expect(result).toHaveLength(0);

    result = executeAst(AST.create([
      AST.Field.must.exact('name', 'john doe')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john doe');
  });

  test('term clauses - no default fields specified', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const value = random.oneOf(['john', 'doe']);
    const result = executeAst(AST.create([
      AST.Term.must(value)
    ]), items);
    expect(result).toHaveLength(1);
  });

  // when no default fields specified, we automatically select all/only
  // the string fields of the objects to match against
  test('term clauses - no default fields specified 2', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Term.must('5')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('term clauses - with default fields specified - matching', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Term.must('john')
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(1);
  });

  test('term clauses - with default fields specified - non-matching', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Term.must('doe')
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(0);
  });

  test('term clauses with negation', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Term.mustNot('john')
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('is clause - applied', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(AST.create([
      AST.Is.must('open')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john');
  });

  test('is clause - not applied', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(AST.create([
      AST.Is.mustNot('open')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('is clause - applied - missing field', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(AST.create([
      AST.Is.must('closed')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('is clause - not applied - missing field', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(AST.create([
      AST.Is.mustNot('closed')
    ]), items);
    expect(result).toHaveLength(2);
  });

  test('all clauses', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { description: 'foo', age: 6, open: false },
      { text: 'foo bar', age: 7 },
      { text: 'bar', age: 7 },
    ];
    const result = executeAst(AST.create([
      AST.Is.mustNot('open'),
      AST.Field.must.eq('age', '7'),
      AST.Term.must('bar'),
      AST.Term.mustNot('foo')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('bar');
    expect(result[0].age).toBe(7);
  });

  test('phrases', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { description: 'foo', age: 6, open: false },
      { text: 'foo bar', age: 7 },
      { text: 'bar', age: 7 },
    ];
    const result = executeAst(AST.create([
      AST.Field.must.eq('name', 'John Doe'),
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john doe');
  });

  test('or fields', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { name: 'foo', age: 6, open: false },
      { name: 'foo bar', age: 7 },
      { name: 'bar', age: 7 },
    ];
    const result = executeAst(AST.create([
      AST.Field.must.eq('name', [ 'john', 'bar' ]),
    ]), items);
    expect(result).toHaveLength(3);
    const names = result.map(item => item.name);
    expect(names).toContain('john doe');
    expect(names).toContain('bar');
    expect(names).toContain('foo bar');
  });

  test('gt fields', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { name: 'foo', age: 6, open: false },
      { name: 'foo bar', age: 7 },
      { name: 'bar', age: 7 },
    ];
    const result = executeAst(AST.create([
      AST.Field.must.gt('age', 5),
    ]), items);
    expect(result).toHaveLength(3);
    const names = result.map(item => item.name);
    expect(names).toContain('foo');
    expect(names).toContain('bar');
    expect(names).toContain('foo bar');
  });

  test('gte fields', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { name: 'foo', age: 6, open: false },
      { name: 'foo bar', age: 7 },
      { name: 'bar', age: 7 },
    ];
    const result = executeAst(AST.create([
      AST.Field.must.gte('age', 5),
    ]), items);
    expect(result).toHaveLength(4);
    const names = result.map(item => item.name);
    expect(names).toContain('john doe');
    expect(names).toContain('foo');
    expect(names).toContain('bar');
    expect(names).toContain('foo bar');
  });

  test('lt fields', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { name: 'foo', age: 6, open: false },
      { name: 'foo bar', age: 7 },
      { name: 'bar', age: 7 },
    ];
    const result = executeAst(AST.create([
      AST.Field.must.lt('age', 7),
    ]), items);
    expect(result).toHaveLength(2);
    const names = result.map(item => item.name);
    expect(names).toContain('john doe');
    expect(names).toContain('foo');
  });

  test('lte fields', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { name: 'foo', age: 6, open: false },
      { name: 'foo bar', age: 7 },
      { name: 'bar', age: 7 },
    ];
    const result = executeAst(AST.create([
      AST.Field.must.lte('age', 6),
    ]), items);
    expect(result).toHaveLength(2);
    const names = result.map(item => item.name);
    expect(names).toContain('john doe');
    expect(names).toContain('foo');
  });

  test('gt and lte fields', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { name: 'foo', age: 6, open: false },
      { name: 'foo bar', age: 7 },
      { name: 'bar', age: 8 },
    ];
    const result = executeAst(AST.create([
      AST.Field.must.gt('age', 5),
      AST.Field.must.lte('age', 7),
    ]), items);
    expect(result).toHaveLength(2);
    const names = result.map(item => item.name);
    expect(names).toContain('foo');
    expect(names).toContain('foo bar');
  });

  test('negated range queries', () => {
    const items = [
      { name: 'john doe', age: 5, open: true },
      { name: 'foo', age: 6, open: false },
      { name: 'foo bar', age: 7 },
      { name: 'bar', age: 8 },
    ];
    const result = executeAst(AST.create([
      AST.Field.mustNot.lt('age', 6),
      AST.Field.mustNot.gte('age', 7),
    ]), items);
    expect(result).toHaveLength(1);
    const names = result.map(item => item.name);
    expect(names).toContain('foo');
  });

  test('OR clause', () => {
    const items = [
      { name: 'john doe', age: 9 },
      { name: 'foo', age: 6 },
      { name: 'foo bar', age: 7 },
      { name: 'bar', age: 8 },
    ];
    const result = executeAst(AST.create([
      AST.Group.must([
        AST.Field.must.eq('name', 'john doe'),
        AST.Field.must.eq('name', 'foo'),
      ]),
      AST.Field.must.gte('age', 7),
    ]), items);
    expect(result).toHaveLength(2);
    const names = result.map(item => item.name);
    expect(names).toContain('john doe');
    expect(names).toContain('foo bar');
  });

  describe('array field values', () => {
    describe('eq operator', () => {
      test('full match', () => {
        const items = [
          { colors: ['red', 'blue'] },
          { colors: ['blue', 'black'] },
          { colors: [] },
        ];
        const result = executeAst(AST.create([
          AST.Field.must.eq('colors', 'red'),
        ]), items);
        expect(result).toEqual([items[0]]);
      });

      test('partial match', () => {
        const items = [
          { colors: ['red', 'blue'] },
          { colors: ['blue', 'black'] },
          { colors: [] },
        ];
        const result = executeAst(AST.create([
          AST.Field.must.eq('colors', 'e'),
        ]), items);
        expect(result).toEqual([items[0], items[1]]);
      });

      test('empty search phrase', () => {
        const items = [
          { colors: ['red', 'blue'] },
          { colors: ['blue', 'black'] },
          { colors: [] },
        ];
        const result = executeAst(AST.create([
          AST.Field.must.eq('colors', ''),
        ]), items);
        expect(result).toEqual(items);
      });
    });

    describe('exact operator', () => {
      test('full match', () => {
        const items = [
          { colors: ['red', 'blue'] },
          { colors: ['blue', 'black'] },
          { colors: [] },
        ];
        const result = executeAst(AST.create([
          AST.Field.must.exact('colors', 'red'),
        ]), items);
        expect(result).toEqual([items[0]]);
      });

      test('partial match', () => {
        const items = [
          { colors: ['red', 'blue'] },
          { colors: ['blue', 'black'] },
          { colors: [] },
        ];
        const result = executeAst(AST.create([
          AST.Field.must.exact('colors', 'e'),
        ]), items);
        expect(result).toHaveLength(0);
      });

      test('empty search phrase', () => {
        const items = [
          { colors: ['red', 'blue'] },
          { colors: ['blue', 'black'] },
          { colors: [] },
        ];
        const result = executeAst(AST.create([
          AST.Field.must.exact('colors', ''),
        ]), items);
        expect(result).toEqual([items[2]]);
      });
    });
  });
});
