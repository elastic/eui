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

      it('imports PropTypes and creates an empty propTypes object on the component', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {};`);
      });

      it('creates the propTypes assignment at the nearest block', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {}
(function() {
  if (true) {
    const FooComponent: React.SFC<IFooProps> = () => {
      return (<div>Hello World</div>);
    }
  }
})();`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

(function () {
  if (true) {
    const FooComponent = () => {
      return React.createElement(
        'div',
        null,
        'Hello World'
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
import React from 'react';
interface IFooProps {bar: string}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
      });

      it('understands number props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: number}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.number.isRequired
};`);
      });

      it('understands boolean props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: boolean}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.bool.isRequired
};`);
      });

      it('understands function props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {
  bar: () => void
}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.func.isRequired
};`);
      });

      it('understands optional props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar?: number}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.number
};`);
      });

      it('understands mixed props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {
  bar1: string,
  bar2?: number,
  bar3: (x: number, y: number) => string,
  bar4?: () => void,
  bar5: boolean
}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar1: PropTypes.string.isRequired,
  bar2: PropTypes.number,
  bar3: PropTypes.func.isRequired,
  bar4: PropTypes.func,
  bar5: PropTypes.bool.isRequired
};`);
      });

    });

    describe('enum / oneOf propTypes', () => {

      it('understands an enum of strings', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {flower: 'daisy' | 'daffodil' |  'dandelion'}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  flower: PropTypes.oneOf(["daisy", "daffodil", "dandelion"]).isRequired
};`);
      });

      it('understands an enum of numbers', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {prime: 2 | 3 | 5 | 7 | 11 | 13}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  prime: PropTypes.oneOf([2, 3, 5, 7, 11, 13]).isRequired
};`);
      });

      it('understands an enum of booleans', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {visible: true | false}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  visible: PropTypes.oneOf([true, false]).isRequired
};`);
      });

      it('understands a mix of primitives', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bool: true | false | 'FileNotFound'}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  bool: PropTypes.oneOf([true, false, "FileNotFound"]).isRequired
};`);
      });

      it('understands optional enums', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar?: 'hello' | 'world'}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  bar: PropTypes.oneOf(["hello", "world"])
};`);
      });

    });

    describe('array / arrayOf propTypes', () => {

      it('understands an Array of strings', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: Array<string>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string.isRequired])).isRequired
};`);
      });

    });

    describe('type and interface resolving', () => {

      it('understands inline definitions', () => {
        const result = transform(
          `
import React from 'react';
const FooComponent: React.SFC<{bar: string}> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';
const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
      });

      it('understands one level of indirection', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: string}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
      });

      it('understands two levels of indirection', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: string}
type FooProps = IFooProps
const FooComponent: React.SFC<FooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
      });

    });

  });

});
