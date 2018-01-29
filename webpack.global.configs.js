const ExtractTextPlugin = require("extract-text-webpack-plugin");

const globalConfigs = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	watchOptions: {
		ignored: (/node_modules|vclick|MyProfile/g)
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'react', 'flow'],
							plugins: [
								"transform-object-assign",
								"transform-class-properties",
								"transform-es2015-parameters",
								"transform-object-rest-spread",
								"syntax-flow"
							]
						}
					},
					{
						loader: 'ts-loader',
						options: {
							onlyCompileBundledFiles: true
						}
					}]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react', 'flow'],
						plugins: [
							"transform-object-assign",
							"transform-class-properties",
							"transform-es2015-parameters",
							"transform-object-rest-spread",
							"syntax-flow"
						]
					}
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	}
};

module.exports = globalConfigs;
