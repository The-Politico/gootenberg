import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import pkg from '../package.json';

const babelOpts = {
  babelrc: false,
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  presets: [
    ['@babel/preset-env', { modules: false }],
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
};

export default {
  input: path.resolve(process.cwd(), 'src/index.js'),
  output: [
    { file: path.resolve(process.cwd(), pkg.main), format: 'cjs' },
    { file: path.resolve(process.cwd(), pkg.module), format: 'es' },
  ],
  external: [
    ...Object.keys(pkg.dependencies),
  ],
  plugins: [
    babel(babelOpts),
    resolve({
      preferBuiltins: true,
      extensions: ['.js', '.jsx'],
      modulesOnly: true,
    }),
  ],
};
