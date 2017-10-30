import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

// rollup.config.js
export default {
  input: 'dist/fast-func.js',
  output: {
    file: 'dist/fast-func-umd.js',
    format: 'umd',
    name: 'FastFunc'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
