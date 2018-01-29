const webpack = require('webpack');
const globalConfigs = require('./webpack.global.configs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const thisConfigs = {
	entry: {
		'JobDetail': './JobDetail.ts',
		'JobPost': './JobPost.ts',
		'ApplicantList': './ApplicantList.ts'
	},
	output: {
		filename: '[name].js',
		path: __dirname,
		library: '[name]',
		libraryTarget: 'window',
		libraryExport: "default"
	},
	externals: {
		jquery: 'jQuery'
	},
	watch: true,
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].css"
		})
	]
};

module.exports = Object.assign(globalConfigs, thisConfigs);