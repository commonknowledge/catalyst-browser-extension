import webpack from "webpack";
import { project, gitCommit } from "./utils";
import CopyPlugin from "copy-webpack-plugin";

const env = {
  gitCommit
};

const webpackConfig: webpack.Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    manifest: project.src("static/manifest.json"),
    "js/popup": project.src("js/popup/index.tsx"),
    "js/background": project.src("js/background/index.ts"),
    "js/content": project.src("js/content/index.ts")
  },
  resolveLoader: {
    // Required for manifest-loader
    modules: [project.src("js"), "node_modules"]
  },
  resolve: {
    symlinks: false,
    extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx", ".json", ".css"],
    alias: {
      "lodash-es": "lodash",
      "date-fns-es": "date-fns"
    },
    modules: ["node_modules", project.src("js")]
  },
  output: {
    path: project.dist(),
    filename: "[name].js"
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new CopyPlugin([{ from: project.src("static"), to: project.dist() }]),
    new webpack.DefinePlugin({
      "process.env": {
        // Post whatever is in .env to compile-time
        ...Object.entries(env).reduce((dict, [key, value]) => {
          dict[key] = JSON.stringify(value);
          return dict;
        }, {})
      }
    })
  ],
  module: {
    rules: [
      {
        // Only apply these loaders to manifest.json.
        test: /manifest.json$/,
        // Loaders are applied in reverse order.
        use: [
          // Second: JSON -> JS
          // "json-loader",
          // First: partial manifest.json -> complete manifest.json
          "manifest-loader"
        ]
      },
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass|less)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000000"
      }
    ]
  }
};

export default webpackConfig;
