import typescript from 'rollup-plugin-typescript2';

/** @type {import('rollup').RollupOptions} */
const commonOptions = {
  input: 'src/index.ts',
  external: 'cross-fetch/polyfill',
  plugins: [typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: 'dist/types',
      },
    },
  })],
};

/** @type {import('rollup').RollupOptions} */
const optionsForNode = {
  ...commonOptions,
  output: [
    {
      file: 'dist/node/index.cjs.js',
      format: 'cjs',
    },
    {
      dir: 'dist/node/esm',
      format: 'esm',
      preserveModules: true,
    },
  ],
};

/** @type {import('rollup').RollupOptions} */
const optionsForBrowsers = {
  ...commonOptions,
  treeshake: { moduleSideEffects: 'no-external' },
  output: [
    {
      file: 'dist/browser/index.umd.js',
      format: 'umd',
      name: 'Dynalist',
    },
    {
      file: 'dist/browser/index.esm.js',
      format: 'esm',
    },
  ],
};

export default [optionsForNode, optionsForBrowsers];
