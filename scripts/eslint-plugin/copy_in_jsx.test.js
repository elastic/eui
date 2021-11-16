const { join } = require('path');
const rule = require('./copy_in_jsx');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: join(__dirname, 'fixtures'),
    project: './tsconfig-eslint.json',
  },
});

const valid = [
  // no children
  '<button />', // self-closed
  '<button></button>', // with closing tag

  // one child
  '<button><span /></button>', // JSX child
  '<button children={<span />} />', // children attribute
  '<button children="5"><span></span></button>', // like React, prefer JSX children over the attribute

  // multiple children
  '<button><span /><div /><input /></button>', // JSX children
  '<button children={[<span />, <div />, <input />]}></button>', // children attribute

  // literals
  '<span>{5}</span>', // numeric
  '<span>{false}</span>', // boolean

  // variables
  'const value = <span />; <button>{value}</button>', // variable is not a string
  'function Component({ name }: { name: string }) { return <span>{name}</span> }', // variable comes from an argument

  // CallExpression
  '<span>{callback()}</span>', // unknown return type
  'const callback = () => 5; <span>{callback()}</span>', // valid return type

  // useEuiI18n allowances
  'const useEuiI18n: () => ""; const stuff = useEuiI18n(); <span>{stuff}</span>', // used outside of JSX
  'const useEuiI18n: () => ""; <span>{useEuiI18n()}</span>', // used inside of JSX

  // MemberExpression
  'const vals = { numeric: 5 };<span>{vals.numeric}</span>',

  // edge cases
  '<Component {...rest} />', // JSXSpreadAttribute
  '<span>\n\t </span>', // whitespace-only characters
  '<Component>{isTrue ? 1 : 0}</Component>', // ConditionalExpression
  'const condition = 5; <div>{condition && <Component/>}</div>', // LogicalExpression
  '<Component>{value === true ? 1 : 0}</Component>', // BinaryExpression
  '<span>{/* This is a comment */}</span>', // JSXEmptyExpression
  '<div>&hellip; <EuiIcon type="arrowDown" size="s" /></div>', // escaped entities
  'const isRead = true; <span>{!isRead}</span>', // UnaryExpression
  '<div className={buttonClasses}>{[...additionalButtons, expandButton]}</div>', // SpreadElement
  '<span><></></span>', // JSXFragment
  `
  function Component(props: { val: string }) {
    const { val } = props;
    return <span>{val}</span>
  }
  `, // destructured value
  `
  class Component {
    props: { stringValue: string } = null;
    render() {
      const { stringValue } = this.props;
      return <div>{stringValue}</div>;
    }
  }
  `, // destructured from this.props
];

const invalid = [
  {
    code: '<button>Content</button>',
    errors: [
      {
        message: 'Text is not allowed as children within JSX, use i18n instead (https://elastic.github.io/eui/#/utilities/i18n)',
      },
    ],
  },
  {
    code: '<button>{"Content"}</button>',
    errors: [
      {
        message: 'String literals are not allowed within JSX',
      },
    ],
  },
  {
    code: '<button><span>Content</span></button>',
    errors: [
      {
        message: 'Text is not allowed as children within JSX, use i18n instead (https://elastic.github.io/eui/#/utilities/i18n)',
      },
    ],
  },
  {
    code: 'const content = "Content"; <button>{content}</button>',
    errors: [
      {
        message: 'String-type variables are not allowed as children within JSX',
      },
    ],
  },

  // CallExpression
  {
    code: 'const callback = () => "5"; <span>{callback()}</span>',
    errors: [
      {
        message: 'Functions with a string return type cannot be used within JSX',
      },
    ],
  },
  {
    code: 'const callback = (): number | string => "5"; <span>{callback()}</span>',
    errors: [
      {
        message: 'Functions with a string return type cannot be used within JSX',
      },
    ],
  },

  // MemberExpression
  {
    code: 'const vals = { string: "" };<span>{vals.string}</span>',
    errors: [
      {
        message: 'String-type variables are not allowed as children within JSX',
      },
    ],
  },

  // edge cases
  {
    code: 'const text = "zero"; <Component>{isTrue ? "one" : text}</Component>',
    errors: [
      {
        message: 'String literals are not allowed within JSX',
      },
      {
        message: 'String-type variables are not allowed as children within JSX',
      },
    ],
  },
  {
    code: 'const stringThatMightHaveLength = ""; <div>{stringThatMightHaveLength && "Copy"}</div>',
    errors: [
      {
        message: 'String-type variables are not allowed as children within JSX',
      },
      {
        message: 'String literals are not allowed within JSX',
      },
    ],
  },
];

ruleTester.run('copy-in-jsx', rule, {
  valid: valid.map(insertFilename),
  invalid: invalid.map(insertFilename),
});

function insertFilename(test) {
  if (typeof test === 'string') {
    return {
      code: test,
      filename: 'code.tsx'
    };
  } else {
    test.filename = 'code.tsx';
    return test;
  }
}
