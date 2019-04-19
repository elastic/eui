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

  test('unicode field and term values', () => {
    const query = 'name:👸Queen_Elizabeth 🤴King_Henry';
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    let clause = ast.getSimpleFieldClause('name', '👸Queen_Elizabeth');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('👸Queen_Elizabeth');

    clause = ast.getTermClause('🤴King_Henry');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('🤴King_Henry');
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

  test('single field clause - escaped field name', () => {

    const query = `n\\:ame:jo:h:n`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('n:ame', 'jo:h:n');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('n:ame');
    expect(clause.value).toBe('jo:h:n');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('single field clause - field name with underscore', () => {

    const query = `na_me:john`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('na_me', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('na_me');
    expect(clause.value).toBe('john');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });

  test('single field clause - escaped field value', () => {

    // - and : characters in field values can be escaped as input, but won't be when generated by the print method
    const query = `name:jo\\-h\\:n`;
    const prettyQuery = 'name:jo-h:n';
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('name', 'jo-h:n');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('jo-h:n');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(prettyQuery);
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

  describe('empty phrases', () => {
    test('empty term phrase', () => {
      const query = `""`;
      const ast = defaultSyntax.parse(query);

      expect(ast).toBeDefined();
      expect(ast.clauses).toHaveLength(1);

      const clause = ast.getTermClause('');
      expect(clause).toBeDefined();
      expect(AST.Term.isInstance(clause)).toBe(true);
      expect(AST.Match.isMustClause(clause)).toBe(true);
      expect(clause.value).toBe('');

      const printedQuery = defaultSyntax.print(ast);
      expect(printedQuery).toBe(query);
    });

    test('empty field phrase', () => {
      const query = `field:""`;
      const ast = defaultSyntax.parse(query);

      expect(ast).toBeDefined();
      expect(ast.clauses).toHaveLength(1);

      const clause = ast.getSimpleFieldClause('field', '');
      expect(clause).toBeDefined();
      expect(AST.Field.isInstance(clause)).toBe(true);
      expect(AST.Match.isMustClause(clause)).toBe(true);
      expect(clause.field).toBe('field');
      expect(clause.value).toBe('');

      const printedQuery = defaultSyntax.print(ast);
      expect(printedQuery).toBe(query);
    });
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

  test('boolean word boundary', () => {
    const query = `active:truest`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('active');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isEQClause(clause)).toBe(true);
    expect(clause.field).toBe('active');
    expect(clause.value).toBe('truest');
  });

  describe('wordChar', () => {
    test('alphanumeric characters', () => {
      const ast = defaultSyntax.parse('logstash');
      const clauses = ast.getTermClauses();
      expect(clauses).toEqual([{
        type: 'term',
        value: 'logstash',
        match: 'must',
      }]);
    });

    test('escaped characters', () => {
      const ast = defaultSyntax.parse('\\-');
      const clauses = ast.getTermClauses();
      expect(clauses).toEqual([{
        type: 'term',
        value: '-',
        match: 'must',
      }]);
    });

    test('special characters', () => {
      const ast = defaultSyntax.parse('*_-:');
      const clauses = ast.getTermClauses();
      expect(clauses).toEqual([{
        type: 'term',
        value: '*_-:',
        match: 'must',
      }]);
    });
  });

  test('exact match operator', () => {
    const query = `name=john`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('name', 'john');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(AST.Operator.isEXACTClause(clause)).toBe(true);
    expect(clause.field).toBe('name');
    expect(clause.value).toBe('john');

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

  test('number type', () => {
    const query = 'count:15';
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('count');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('count');
    expect(clause.value).toBe(15);
  });

  test('string that starts with a number', () => {
    const query = 'count:15n';
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getSimpleFieldClause('count');
    expect(clause).toBeDefined();
    expect(AST.Field.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.field).toBe('count');
    expect(clause.value).toBe('15n');
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

  test('strict schema - string fields have their values coerced', () => {
    const query = `name:15`;
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
    expect(clause.value).toBe('15');
  });

  test('OR clause', () => {
    const query = `(name:john OR name:susan) age>20`;
    const schema = {
      strict: true,
      fields: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
    };
    const ast = defaultSyntax.parse(query, { schema });

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(2);

    const ageClause = ast.getSimpleFieldClause('age');
    expect(ageClause).toBeDefined();
    expect(AST.Field.isInstance(ageClause)).toBe(true);
    expect(AST.Match.isMustClause(ageClause)).toBe(true);
    expect(ageClause.field).toBe('age');
    expect(ageClause.value).toBe(20);

    const groupClauses = ast.getGroupClauses();
    expect(groupClauses).toHaveLength(1);

    const [groupClause] = groupClauses;
    expect(groupClause).toBeDefined();
    expect(AST.Group.isInstance(groupClause)).toBe(true);
    expect(AST.Match.isMustClause(groupClause)).toBe(true);

    const [nameClauseA, nameClauseB] = groupClause.value;

    expect(AST.Field.isInstance(nameClauseA)).toBe(true);
    expect(AST.Match.isMustClause(nameClauseA)).toBe(true);
    expect(nameClauseA.field).toBe('name');
    expect(nameClauseA.value).toBe('john');

    expect(AST.Field.isInstance(nameClauseB)).toBe(true);
    expect(AST.Match.isMustClause(nameClauseB)).toBe(true);
    expect(nameClauseB.field).toBe('name');
    expect(nameClauseB.value).toBe('susan');
  });

  test('or term parsing and printing', () => {
    const query = `"or"`;
    const ast = defaultSyntax.parse(query);

    expect(ast).toBeDefined();
    expect(ast.clauses).toHaveLength(1);

    const clause = ast.getTermClause('or');
    expect(clause).toBeDefined();
    expect(AST.Term.isInstance(clause)).toBe(true);
    expect(AST.Match.isMustClause(clause)).toBe(true);
    expect(clause.value).toBe('or');

    const printedQuery = defaultSyntax.print(ast);
    expect(printedQuery).toBe(query);
  });
});
