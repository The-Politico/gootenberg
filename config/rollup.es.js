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

export const external = [
  ...Object.keys(pkg.dependencies),
];

export const plugins = [
  babel(babelOpts),
  resolve({
    preferBuiltins: true,
    extensions: ['.js', '.jsx'],
    modulesOnly: true,
  }),
];

export default [
  {
    input: path.resolve(process.cwd(), 'src/index.js'),
    output: [
      { file: path.resolve(process.cwd(), pkg.main), format: 'cjs' },
      { file: path.resolve(process.cwd(), pkg.module), format: 'es' },
    ],
    external,
    plugins,
  },
  {
    input: [
      path.resolve(process.cwd(), 'src/cli/index.js'),
    ],
    output: [
      {
        file: path.resolve(process.cwd(), 'dist/cli.js'),
        format: 'cjs',
        banner: '#!/usr/bin/env node',
      },
    ],
    external,
    plugins,
  },
];
