import { ohmSyntax } from './ohm_syntax';

describe('ohmSyntax', () => {

  test('single field clause', () => {

    const query = `name:john`;
    const ast = ohmSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);
    const clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');
    expect(clause.occur).toBe('must');

    const printedQuery = ohmSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('multiple field clauses', () => {

    const query = `name:john age:6`;
    const ast = ohmSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);
    let clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('6');
    expect(clause.occur).toBe('must');

    const printedQuery = ohmSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('multiple field clauses of the same field', () => {

    const query = `name:john age:6 age:5`;
    const ast = ohmSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(3);

    let clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('6');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');
    expect(clause.occur).toBe('must');

    const printedQuery = ohmSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('multiple field clauses of the same field with negations', () => {

    const query = `name:john age:6 -age:5`;
    const ast = ohmSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(3);

    let clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('age', '6');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('6');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');
    expect(clause.occur).toBe('must_not');

    const printedQuery = ohmSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('default clauses', () => {

    const query = `foo bar`;
    const ast = ohmSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getDefaultClause('foo');
    expect(clause).toBeDefined();
    expect(clause.value).toBe('foo');
    expect(clause.occur).toBe('must');

    clause = ast.getDefaultClause('bar');
    expect(clause).toBeDefined();
    expect(clause.value).toBe('bar');
    expect(clause.occur).toBe('must');

    const printedQuery = ohmSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('default clauses with negation', () => {

    const query = `foo -bar`;
    const ast = ohmSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getDefaultClause('foo');
    expect(clause).toBeDefined();
    expect(clause.value).toBe('foo');
    expect(clause.occur).toBe('must');

    clause = ast.getDefaultClause('bar');
    expect(clause).toBeDefined();
    expect(clause.value).toBe('bar');
    expect(clause.occur).toBe('must_not');

    const printedQuery = ohmSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('default clauses with field clauses and negations', () => {

    const query = `foo -name:john -bar age:5 name:joe`;
    const ast = ohmSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(5);

    let clause = ast.getDefaultClause('foo');
    expect(clause).toBeDefined();
    expect(clause.value).toBe('foo');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');
    expect(clause.occur).toBe('must_not');

    clause = ast.getDefaultClause('bar');
    expect(clause).toBeDefined();
    expect(clause.value).toBe('bar');
    expect(clause.occur).toBe('must_not');

    clause = ast.getFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('name', 'joe');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('joe');
    expect(clause.occur).toBe('must');

    const printedQuery = ohmSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('default clauses, field clauses, is clauses and negations', () => {

    const query = `foo -name:john -bar age:5 name:joe is:open -is:liberal`;
    const ast = ohmSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(7);

    let clause = ast.getDefaultClause('foo');
    expect(clause).toBeDefined();
    expect(clause.value).toBe('foo');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');
    expect(clause.occur).toBe('must_not');

    clause = ast.getDefaultClause('bar');
    expect(clause).toBeDefined();
    expect(clause.value).toBe('bar');
    expect(clause.occur).toBe('must_not');

    clause = ast.getFieldClause('age', '5');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('age');
    expect(clause.value).toBe('5');
    expect(clause.occur).toBe('must');

    clause = ast.getFieldClause('name', 'joe');
    expect(clause).toBeDefined();
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('joe');
    expect(clause.occur).toBe('must');

    clause = ast.getIsClause('open');
    expect(clause).toBeDefined();
    expect(clause.applied).toBe(true);

    clause = ast.getIsClause('liberal');
    expect(clause).toBeDefined();
    expect(clause.applied).toBe(false);

    const printedQuery = ohmSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

});
