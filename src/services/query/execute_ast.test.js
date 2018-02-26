import { Ast } from './ast';
import { executeAst } from './execute_ast';
import { Random } from '../random';

const random = new Random();

describe('execute ast', () => {

  test('single matching field clause', () => {
    const items = [
      { name: 'john doe' },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Field.must('name', 'john')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john doe');
  });

  test('single matching field clause with negation', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Field.mustNot('name', 'john')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('single matching multi-valued field clause', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    let result = executeAst(Ast.create([
      Ast.Field.must('name', ['john', 'doe'])
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john');

    result = executeAst(Ast.create([
      Ast.Field.must('name', ['joe', 'doe'])
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');

    result = executeAst(Ast.create([
      Ast.Field.must('name', ['foo', 'bar'])
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('single non-matching field clause', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Field.must('name', 'foo')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - non-matching', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Field.must('name', 'john'),
      Ast.Field.must('name', 'joe')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - non-matching 2', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Field.must('name', 'foo'),
      Ast.Field.must('age', '7')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - matching', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Field.must('name', 'john'),
      Ast.Field.must('age', '5')
    ]), items);
    expect(result).toHaveLength(1);
  });

  test('term clauses - no default fields specified', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const value = random.oneOf(['john', 'doe']);
    const result = executeAst(Ast.create([
      Ast.Term.must(value)
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
    const result = executeAst(Ast.create([
      Ast.Term.must('5')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('term clauses - with default fields specified - matching', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Term.must('john')
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(1);
  });

  test('term clauses - with default fields specified - non-matching', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Term.must('doe')
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(0);
  });

  test('term clauses with negation', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(Ast.create([
      Ast.Term.mustNot('john')
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('is clause - applied', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(Ast.create([
      Ast.Is.must('open')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john');
  });

  test('is clause - not applied', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(Ast.create([
      Ast.Is.mustNot('open')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('is clause - applied - missing field', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(Ast.create([
      Ast.Is.must('closed')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('is clause - not applied - missing field', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(Ast.create([
      Ast.Is.mustNot('closed')
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
    const result = executeAst(Ast.create([
      Ast.Is.mustNot('open'),
      Ast.Field.must('age', '7'),
      Ast.Term.must('bar'),
      Ast.Term.mustNot('foo')
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
    const result = executeAst(Ast.create([
      Ast.Field.must('name', 'John Doe'),
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
    const result = executeAst(Ast.create([
      Ast.Field.must('name', [ 'john', 'bar' ]),
    ]), items);
    expect(result).toHaveLength(3);
    const names = result.map(item => item.name);
    expect(names).toContain('john doe');
    expect(names).toContain('bar');
    expect(names).toContain('foo bar');
  });

});
