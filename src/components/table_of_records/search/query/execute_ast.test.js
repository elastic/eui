import { AST } from './ast';
import { executeAst } from './execute_ast';
import { Random } from '../../../../services/random';

const random = new Random();

describe('execute ast', () => {

  test('single matching field clause', () => {
    const items = [
      { name: 'john doe' },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must('name', 'john')
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
      AST.Field.mustNot('name', 'john')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('single non-matching field clause', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must('name', 'foo')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - non-matching', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must('name', 'john'),
      AST.Field.must('name', 'joe')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - non-matching 2', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must('name', 'foo'),
      AST.Field.must('age', '7')
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - matching', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(AST.create([
      AST.Field.must('name', 'john'),
      AST.Field.must('age', '5')
    ]), items);
    expect(result).toHaveLength(1);
  });

  test('term clauses - no default fields specified', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const value = random.oneOf([ 'john', 'doe' ]);
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
      AST.Field.must('age', '7'),
      AST.Term.must('bar'),
      AST.Term.mustNot('foo')
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('bar');
    expect(result[0].age).toBe(7);
  });

});
