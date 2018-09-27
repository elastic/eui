const { transform } = require('babel-core');
const babelOptions = {
  presets: [
    'react',
  ],
  plugins: [
    './scripts/babel/proptypes-from-ts-props',
  ]
};

describe('proptypes-from-ts-props', () => {

  describe('proptype generation', () => {

    describe('basic generation', () => {

      it('creates an empty propTypes object on the component', () => {
        const result = transform(
          `
type FooProps = {}
const FooComponent: React.SFC<FooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {};`);
      });

      it('creates the propTypes assignment at the nearest block', () => {
        const result = transform(
          `
type FooProps = {}
(function() {
  if (true) {
    const FooComponent: React.SFC<FooProps> = () => {
      return (<div>Hello World</div>);
    }
  }
})();`,
          babelOptions
        );

        expect(result.code).toBe(`
(function () {
  if (true) {
    const FooComponent = () => {
      return React.createElement(
        "div",
        null,
        "Hello World"
      );
    };
    FooComponent.propTypes = {};
  }
})();`);
      });

    });

    describe('primitive propTypes', () => {

      it('understands string props', () => {
        const result = transform(
          `
type FooProps = {bar: string}
const FooComponent: React.SFC<FooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string
};`);
      });

    });

  });

});
