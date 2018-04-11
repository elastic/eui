import { defaultSyntax } from './default_syntax';
import { AST } from './ast';
import { Granularity } from './date_format';
import { isDateValue } from './date_value';
import { Random } from '../../../services/random';

const random = new Random();

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

  test('hyphen fields and values', () => {
    const query = 'name-1:dash-1 -name-2:dash-2 \\-name-3:dash-3 term-1 -term-2 \\-term-3';
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toBeDefined();
    expect(ast.clauses).toHaveLength(6);

    let clause = ast.getTermClause('term-1');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('term-1');

    clause = ast.getTermClause('term-2');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.value).toBe('term-2');

    clause = ast.getTermClause('-term-3');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('-term-3');

    clause = ast.getSimpleFieldClause('name-1', 'dash-1');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name-1');
    expect(clause.value).toBe('dash-1');

    clause = ast.getSimpleFieldClause('name-2', 'dash-2');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.field).toBe('name-2');
    expect(clause.value).toBe('dash-2');

    clause = ast.getSimpleFieldClause('-name-3', 'dash-3');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('-name-3');
    expect(clause.value).toBe('dash-3');
  });

  test('escaped chars as default clauses', () => {
    const query = '-\\: \\\\';
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getTermClause(':');
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

    const clause = ast.getSimpleFieldClause('name', 'john');
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

    const clause = ast.getSimpleFieldClause('n:ame', 'jo:hn');
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

    let clause = ast.getSimpleFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getSimpleFieldClause('age', 6);
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe(6);

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
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getSimpleFieldClause('age', 6);
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe(6);

    clause = ast.getSimpleFieldClause('age', 5);
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe(5);

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
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

    clause = ast.getSimpleFieldClause('age', 6);
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe(6);

    clause = ast.getSimpleFieldClause('age', 5);
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe(5);

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

    clause = ast.getSimpleFieldClause('name', 'john');
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

    clause = ast.getSimpleFieldClause('age', 5);
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe(5);

    clause = ast.getSimpleFieldClause('name', 'joe');
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

    clause = ast.getSimpleFieldClause('name', 'john');
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

    clause = ast.getSimpleFieldClause('age', 5);
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('age');
    expect(clause.value).toBe(5);

    clause = ast.getSimpleFieldClause('name', 'joe');
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

  test('term phrases', () => {

    const query = `"foo bar"`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getTermClause('foo bar');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('field1');
    expect(clause.value).toHaveLength(2);
    expect(clause.value).toContain('foo');
    expect(clause.value).toContain('bar baz');

    clause = ast.getSimpleFieldClause('field2');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
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
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
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
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('f');
    expect(clause.value).toHaveLength(1);
    expect(clause.value).toContain('foo');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('date eq expression', () => {

    const query = `created:'12 Jan 2010'`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('created');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isEQClause(clause)).toBe(true);
    expect(clause.field).toBe('created');
    expect(clause.value).toBeDefined();
    expect(isDateValue(clause.value)).toBe(true);
    expect(clause.value.raw).toBe('12 Jan 2010');
    expect(clause.value.text).toBe('12 Jan 2010');
    expect(clause.value.granularity).toBe(Granularity.DAY);

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('date > expression', () => {

    const query = `expires>'last week'`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('expires');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isGTClause(clause)).toBe(true);
    expect(clause.field).toBe('expires');
    expect(clause.value).toBeDefined();
    expect(isDateValue(clause.value)).toBe(true);
    expect(clause.value.raw).toBe('last week');
    expect(clause.value.text).toBe('last week');
    expect(clause.value.granularity).toBe(Granularity.WEEK);

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('date >= expression', () => {

    const query = `expires>='next year'`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('expires');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isGTEClause(clause)).toBe(true);
    expect(clause.field).toBe('expires');
    expect(clause.value).toBeDefined();
    expect(isDateValue(clause.value)).toBe(true);
    expect(clause.value.raw).toBe('next year');
    expect(clause.value.text).toBe('next year');
    expect(clause.value.granularity).toBe(Granularity.YEAR);

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('date < expression', () => {

    const query = `created<'last month'`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('created');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isLTClause(clause)).toBe(true);
    expect(clause.field).toBe('created');
    expect(clause.value).toBeDefined();
    expect(isDateValue(clause.value)).toBe(true);
    expect(clause.value.raw).toBe('last month');
    expect(clause.value.text).toBe('last month');
    expect(clause.value.granularity).toBe(Granularity.MONTH);

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('date <= expression', () => {

    const query = `created<='Sunday'`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('created');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isLTEClause(clause)).toBe(true);
    expect(clause.field).toBe('created');
    expect(clause.value).toBeDefined();
    expect(isDateValue(clause.value)).toBe(true);
    expect(clause.value.raw).toBe('Sunday');
    expect(clause.value.text).toBe('Sunday');
    expect(clause.value.granularity).toBe(Granularity.DAY);

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('boolean : expression', () => {

    const query = `active:true -closed:false`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getSimpleFieldClause('active');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isEQClause(clause)).toBe(true);
    expect(clause.field).toBe('active');
    expect(clause.value).toBe(true);

    clause = ast.getSimpleFieldClause('closed');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMust(clause)).toBe(false);
    expect(AST.Operator.isEQClause(clause)).toBe(true);
    expect(clause.field).toBe('closed');
    expect(clause.value).toBe(false);

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('number range expressions', () => {

    const query = `num1>6 -num2>=8 num3<4 -num4<=2`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(4);

    let clause = ast.getSimpleFieldClause('num1');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isGTClause(clause)).toBe(true);
    expect(clause.field).toBe('num1');
    expect(clause.value).toBe(6);

    clause = ast.getSimpleFieldClause('num2');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(AST.Operator.isGTEClause(clause)).toBe(true);
    expect(clause.field).toBe('num2');
    expect(clause.value).toBe(8);

    clause = ast.getSimpleFieldClause('num3');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isLTClause(clause)).toBe(true);
    expect(clause.field).toBe('num3');
    expect(clause.value).toBe(4);

    clause = ast.getSimpleFieldClause('num4');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(false);
    expect(AST.Operator.isLTEClause(clause)).toBe(true);
    expect(clause.field).toBe('num4');
    expect(clause.value).toBe(2);

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('strict schema - flags - listed', () => {

    const query = `is:active`;
    const schema = {
      strict: true,
      flags: [ 'active' ]
    };
    const ast = defaultSyntax.parse(query, { schema });

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getIsClause('active');
    expect(clause).toBeDefined();
    expect(AST.Is.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.flag).toBe('active');
  });

  test('strict schema - flags - listed as boolean field', () => {

    const query = `is:active`;
    const schema = {
      strict: true,
      fields: {
        active: {
          type: 'boolean'
        }
      }
    };
    const ast = defaultSyntax.parse(query, { schema });

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getIsClause('active');
    expect(clause).toBeDefined();
    expect(AST.Is.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.flag).toBe('active');
  });

  test('strict schema - flags - listed as non-boolean field', () => {

    const query = `is:active`;
    const schema = {
      strict: true,
      fields: {
        active: {
          type: random.oneOf('number', 'string', 'date')
        }
      }
    };
    expect(() => {
      defaultSyntax.parse(query, { schema });
    }).toThrow('Unknown flag `active`');
  });

  test('strict schema - flags - not listed', () => {

    const query = `is:active`;
    const schema = {
      strict: true
    };
    expect(() => {
      defaultSyntax.parse(query, { schema });
    }).toThrow('Unknown flag `active`');
  });

  test('strict schema - fields - listed', () => {

    const query = `name:foo`;
    const schema = {
      strict: true,
      fields: {
        name: {
          type: 'string'
        }
      }
    };
    const ast = defaultSyntax.parse(query, { schema });

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('name');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('foo');
  });

  test('strict schema - fields - listed - with data type mismatch', () => {

    const query = `name:foo`;
    const schema = {
      strict: true,
      fields: {
        name: {
          type: 'boolean'
        }
      }
    };
    expect(() => {
      defaultSyntax.parse(query, { schema });
    }).toThrow('Expected a boolean value for field `name`, but found `foo`');
  });

  test('strict schema - fields - listed - with data type mismatch - with value description', () => {

    const query = `name:foo`;
    const schema = {
      strict: true,
      fields: {
        name: {
          type: 'boolean',
          valueDescription: '`true` or `false`'
        }
      }
    };
    expect(() => {
      defaultSyntax.parse(query, { schema });
    }).toThrow('Expected `true` or `false` for field `name`, but found `foo`');
  });

  test('strict schema - fields - listed - with validate', () => {

    const query = `name:foo`;
    const schema = {
      strict: true,
      fields: {
        name: {
          type: 'string',
          validate: () => {
            throw new Error('invalid name!!!');
          }
        }
      }
    };
    expect(() => {
      defaultSyntax.parse(query, { schema });
    }).toThrow(/invalid name!!!/);
  });

  test('strict schema - fields - not listed', () => {

    const query = `name:foo`;
    const schema = {
      strict: true
    };
    expect(() => {
      defaultSyntax.parse(query, { schema });
    }).toThrow('Unknown field `name`');
  });

});
