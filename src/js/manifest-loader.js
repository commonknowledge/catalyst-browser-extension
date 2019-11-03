// A loader to transform a partial manifest.json file into a complete
// manifest.json file by adding entries from an NPM package.json.
module.exports = function(manifest) {
  manifest = JSON.parse(manifest);
  // ----------------------
  // Configure manifest here

  // ----------------------
  const editedJSON = JSON.stringify(manifest, null, 2);

  // In Webpack, loaders ultimately produce JavaScript. In order to produce
  // another file type (like JSON), it needs to be emitted separately.
  this.emitFile("manifest.json", editedJSON);

  // Return the processed JSON to be used by the next item in the loader chain.
  return editedJSON;
};
