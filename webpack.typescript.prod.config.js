const webpack = require('webpack');
const globalConfigs = require('../../../webpack.global.configs');

const thisConfigs = {
	entry: {
		'globalOnBoardingModals': './js/jobseekers/globalOnboardingModals/globalOnBoardingModals.ts',
		'globalForgotPassword': './js/jobseekers/globalOnboardingModals/globalForgotPassword.ts'
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
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		})
	]
};

module.exports = Object.assign(globalConfigs, thisConfigs);