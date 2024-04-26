 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const webpack = require('webpack'); 



 module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'script.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html')})],
    
 }