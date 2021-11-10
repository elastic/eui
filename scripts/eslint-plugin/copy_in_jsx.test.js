const rule = require('./copy_in_jsx');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
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

  // variables
  'const value = <span />; <button>{value}</button>',
];

const invalid = [
  {
    code: '<button>Content</button>',
    errors: [
      {
        message: 'Literal values are not allowed as JSX children',
      },
    ],
  },
  {
    code: '<button><span>Content</span></button>',
    errors: [
      {
        message: 'Literal values are not allowed as JSX children',
      },
    ],
  },

];

ruleTester.run('copy-in-jsx', rule, {
  valid,
  invalid,
});
