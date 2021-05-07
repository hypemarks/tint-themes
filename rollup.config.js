import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import sass from 'rollup-plugin-sass';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    copy({
      targets: [{ src: 'src/styles', dest: 'lib/' }],
    }),
    sass({
      insert: true,
    }),
    external({
      includeDependencies: true,
    }),
    resolve({ preferBuiltins: true, browser: true, modulesOnly: true }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    commonjs({
      include: ['/node_modules/**'],
      namedExports: {
        'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        lodash: ['uniqBy'],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
  ],
};