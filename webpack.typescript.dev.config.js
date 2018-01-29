const webpack = require('webpack');
const globalConfigs = require('./webpack.global.configs');

const thisConfigs = {
	entry: {
		'App': './App.ts'
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
	watch: true
};

module.exports = Object.assign(globalConfigs, thisConfigs);