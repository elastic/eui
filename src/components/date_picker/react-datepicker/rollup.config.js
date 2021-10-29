import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { list as babelHelpersList } from 'babel-helpers';
import pkg from './package.json';

const config = {
  output: {
    format: process.env.BABEL_ENV
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      extensions: ['.js', '.jsx']
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      externalHelpersWhitelist: babelHelpersList.filter(
        helperName => helperName !== 'asyncGenerator'
      )
    }),
    commonjs({
      include: 'node_modules/**',
    })
  ],
  external: [
    'react',
    'react-dom',
    'classnames',
    'prop-types',
    'moment'
  ]
};

export default config;
