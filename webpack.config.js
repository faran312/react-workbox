const HtmlWebPackPlugin = require("html-webpack-plugin");
const FileLoader = require.resolve("file-loader");
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
const workBoxPlugin = new WorkboxPlugin.InjectManifest({
	swSrc: './src/pwa/sw.js',
})

module.exports = {
	entry: {
		main: './src/index.js',
		index: './src/index.html'
	},
	output: {
		path: path.resolve("dist")
	},
	module: {
		rules: [
			{
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.less$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.svg$/
        ],
        loader: FileLoader,
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
			},
			{
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: { minimize: true }
        }
      },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: "[name]_[local]_[hash:base64]",
							sourceMap: true,
							minimize: true
						}
					}
				]
			}
		]
	},
	plugins: [
		htmlPlugin,
		workBoxPlugin
	]
}