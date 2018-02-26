import { defaultSyntax } from './default_syntax';
import { Ast } from './ast';

describe('defaultSyntax', () => {

  test('empty query', () => {
    const query = '';
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toBeDefined();
    expect(ast.clauses).toHaveLength(0);

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('escaped chars as default clauses', () => {
    const query = '\\- -\\: \\\\';
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toBeDefined();
    expect(ast.clauses).toHaveLength(3);

    let clause = ast.getTermClause('-');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('-');

    clause = ast.getTermClause(':');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.value).toBe(':');

    clause = ast.getTermClause('\\');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('\\');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('single field clause', () => {

    const query = `name:john`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('single field clause - escaped', () => {

    const query = `n\\:ame:jo\\:hn`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('n:ame', 'jo:hn');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('n:ame');
    expect(clause.value).toBe('jo:hn');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('multiple field clauses', () => {

    const query = `name:john age:6`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getSimpleFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getSimpleFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('6');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('multiple field clauses of the same field', () => {

    const query = `name:john age:6 age:5`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(3);

    let clause = ast.getSimpleFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getSimpleFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('6');

    clause = ast.getSimpleFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('multiple field clauses of the same field with negations', () => {

    const query = `name:john age:6 -age:5`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(3);

    let clause = ast.getSimpleFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getSimpleFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('6');

    clause = ast.getSimpleFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('default clauses', () => {

    const query = `foo bar`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getTermClause('foo');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo');

    clause = ast.getTermClause('bar');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('bar');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('default clauses with negation', () => {

    const query = `foo -bar`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getTermClause('foo');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo');

    clause = ast.getTermClause('bar');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.value).toBe('bar');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('default clauses with field clauses and negations', () => {

    const query = `foo -name:john -bar age:5 name:joe`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(5);

    let clause = ast.getTermClause('foo');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo');

    clause = ast.getSimpleFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getTermClause('bar');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.value).toBe('bar');

    clause = ast.getSimpleFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');

    clause = ast.getSimpleFieldClause('name', 'joe');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('joe');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('default clauses, field clauses, is clauses and negations', () => {

    const query = `foo -name:john -bar age:5 name:joe is:open -is:liberal`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(7);

    let clause = ast.getTermClause('foo');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo');

    clause = ast.getSimpleFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getTermClause('bar');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.value).toBe('bar');

    clause = ast.getSimpleFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');

    clause = ast.getSimpleFieldClause('name', 'joe');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('joe');

    clause = ast.getIsClause('open');
    expect(clause).toBeDefined();
    expect(Ast.Is.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.flag).toBe('open');

    clause = ast.getIsClause('liberal');
    expect(clause).toBeDefined();
    expect(Ast.Is.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.flag).toBe('liberal');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('term phrases', () => {

    const query = `"foo bar"`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getTermClause('foo bar');
    expect(clause).toBeDefined();
    expect(Ast.Term.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo bar');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('field phrases', () => {

    const query = `field:"foo bar"`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('field', 'foo bar');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('field');
    expect(clause.value).toBe('foo bar');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('field or clause', () => {

    const query = `field:(foo or bar)`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getOrFieldClause('field');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('field');
    expect(clause.value).toHaveLength(2);
    expect(clause.value).toContain('foo');
    expect(clause.value).toContain('bar');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('field or & and clause & phrases', () => {

    const query = `field1:(foo or "bar baz") -field2:baz`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getOrFieldClause('field1');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('field1');
    expect(clause.value).toHaveLength(2);
    expect(clause.value).toContain('foo');
    expect(clause.value).toContain('bar baz');

    clause = ast.getSimpleFieldClause('field2');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(false);
    expect(clause.field).toBe('field2');
    expect(clause.value).toBe('baz');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('relaxed phrases with spaces', () => {

    const query = `f:" this is a relaxed phrase \t"`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('f');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('f');
    expect(clause.value).toBe('this is a relaxed phrase');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(`f:"this is a relaxed phrase"`);
  });

  test('single term or expression', () => {

    const query = `f:(foo)`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getOrFieldClause('f');
    expect(clause).toBeDefined();
    expect(Ast.Field.isInstance(clause)).toBe(true);
    expect(Ast.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('f');
    expect(clause.value).toHaveLength(1);
    expect(clause.value).toContain('foo');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

});
