import { ast } from './ast';
import { executeAst } from './execute_ast';
import { Random } from '../../../../services/random';

const random = new Random();

describe('execute ast', () => {

  test('single matching field clause', () => {
    const items = [
      { name: 'john doe' },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'field', field: 'name', value: 'john', occur: 'must' }
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john doe');
  });

  test('single matching field clause with negation', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'field', field: 'name', value: 'john', occur: 'must_not' }
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('single non-matching field clause', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'field', field: 'name', value: 'foo', occur: 'must' }
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - non-matching', () => {
    const items = [
      { name: 'john' },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'field', field: 'name', value: 'john', occur: 'must' },
      { type: 'field', field: 'name', value: 'joe', occur: 'must' }
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - non-matching 2', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'field', field: 'name', value: 'john', occur: 'must' },
      { type: 'field', field: 'age', value: '7', occur: 'must' }
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('multiple field clause - matching', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'field', field: 'name', value: 'john', occur: 'must' },
      { type: 'field', field: 'age', value: '5', occur: 'must' }
    ]), items);
    expect(result).toHaveLength(1);
  });

  test('default clauses - no default fields specified', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const value = random.oneOf([ 'john', 'doe' ]);
    const result = executeAst(ast([
      { type: 'default', value, occur: 'must' },
    ]), items);
    expect(result).toHaveLength(1);
  });

  // when no default fields specified, we automatically select all/only
  // the string fields of the objects to match against
  test('default clauses - no default fields specified 2', () => {
    const items = [
      { name: 'john', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'default', value: '5', occur: 'must' },
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('default clauses - with default fields specified - matching', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'default', value: 'john', occur: 'must' },
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(1);
  });

  test('default clauses - with default fields specified - non-matching', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'default', value: 'doe', occur: 'must' },
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(0);
  });

  test('default clauses with negation', () => {
    const items = [
      { name: 'john', description: 'doe', age: 5 },
      { name: 'joe' }
    ];
    const result = executeAst(ast([
      { type: 'default', value: 'john', occur: 'must_not' },
    ]), items, { defaultFields: [ 'name' ] });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('is clause - applied', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(ast([
      { type: 'is', flag: 'open', applied: true },
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('john');
  });

  test('is clause - not applied', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(ast([
      { type: 'is', flag: 'open', applied: false },
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('joe');
  });

  test('is clause - applied - missing field', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(ast([
      { type: 'is', flag: 'closed', applied: true },
    ]), items);
    expect(result).toHaveLength(0);
  });

  test('is clause - not applied - missing field', () => {
    const items = [
      { name: 'john', open: true },
      { name: 'joe', open: false }
    ];
    const result = executeAst(ast([
      { type: 'is', flag: 'closed', applied: false },
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
    const result = executeAst(ast([
      { type: 'is', flag: 'open', applied: false },
      { type: 'field', field: 'age', value: '7', occur: 'must' },
      { type: 'default', value: 'bar', occur: 'must' },
      { type: 'default', value: 'foo', occur: 'must_not' }
    ]), items);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('bar');
    expect(result[0].age).toBe(7);
  });

});
