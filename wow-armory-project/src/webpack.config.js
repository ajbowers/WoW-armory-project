module.exports = {
     entry: './src/app.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js'
     }, 
     rules: [
        { test: /\.json$/, loader: 'json' },
   // other loaders 
]
 };