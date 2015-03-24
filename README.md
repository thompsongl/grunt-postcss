# grunt-postcss

PostCSS + cssnext + BEM Linter + (optional) prefixer

## Example

```
postcss: {
  options: {
    bemLinter: true,
    browsers: [
      'Last 2 versions',
      'IE >= 9'
    ],
    import: {
      path: './src'
    },
    namespace: {
      prefix: 'twt-',
      options: {
        ignore: /^is\-/
      }
    }
  },
  dist: {
    files: {
      'dist/assets/css/style.css': ['./src/index.css']
    }
  }
}
```

## Tests

TBD

## License

MIT
