var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')


// var Plotly = require('plotly.js')

module.exports = {
    context: __dirname,
    entry: {'start': './assets/js/index'}, 
    
    output: {
        path: path.resolve('./assets/bundles/'), 
        filename: '[name]-[hash].js',
    },
    
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}), 
        //makes jQuery available in every module
        new webpack.ProvidePlugin({ 
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' 
        })
    ],
    
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/, 
                //use the babel loader 
                loader: 'babel-loader', 
                query: {
                    //specify that we will be dealing with React code
                    presets: ['react'] 
                }
            },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
            {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
            {test: /\.html$/,loader: "html"},
            {test: /\.css$/,loader: "style-loader!css-loader"},
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    
    resolve: {
        modules: [__dirname, 'node_modules'],
        extensions: ['*', '.js', '.jsx'] 
    } 
}