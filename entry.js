// Setup babel
require('ignore-styles');
require('@babel/polyfill');
require('@babel/register')({
    presets: ["@babel/preset-env", "@babel/preset-react"],
    ignore: [/node_modules/]
});

// Start a server
require('./server/index').start(process.env);
