module.exports = {
  presets: [
    "@babel/react",
    [
      "@babel/typescript",
      {
        isTSX: true,
        allExtensions: true
      }
    ]
  ],
  plugins: [
    "macros",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/syntax-dynamic-import"
  ]
};
