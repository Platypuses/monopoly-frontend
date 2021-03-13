/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// noinspection JSCheckFunctionSignatures
module.exports = merge(common, {
  mode: 'production',
});
