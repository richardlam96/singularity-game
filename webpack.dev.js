const path = require("path");

module.exports = {
  mode: "development",
  devServer: { 
    static: "./dist"
  },
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: false
  },
  module: {
    rules: [
      {
        test: /\.(gltf|fbx|obj)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      }
    ]
  }
}
