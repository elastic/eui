import { defaultSyntax } from './default_syntax';
import { AST } from './ast';

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
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('-');

    clause = ast.getTermClause(':');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.value).toBe(':');

    clause = ast.getTermClause('\\');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('\\');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('single field clause', () => {

    const query = `name:john`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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

    const clause = ast.getFieldClause('n:ame', 'jo:hn');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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

    let clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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

    let clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('6');

    clause = ast.getFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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

    let clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('6');

    clause = ast.getFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
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
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo');

    clause = ast.getTermClause('bar');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo');

    clause = ast.getTermClause('bar');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
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
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo');

    clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getTermClause('bar');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.value).toBe('bar');

    clause = ast.getFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');

    clause = ast.getFieldClause('name', 'joe');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('foo');

    clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getTermClause('bar');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.value).toBe('bar');

    clause = ast.getFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');

    clause = ast.getFieldClause('name', 'joe');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('joe');

    clause = ast.getIsClause('open');
    expect(clause).toBeDefined();
    expect(AST.Is.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.flag).toBe('open');

    clause = ast.getIsClause('liberal');
    expect(clause).toBeDefined();
    expect(AST.Is.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.flag).toBe('liberal');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

});
