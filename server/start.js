const { resolve } = require('path')
const r = path => resolve(__dirname, path)

require('babel-core/register')({
    'presets': [
        'stage-3',
        'latest-node'
    ],
    'plugins': [
        'transform-decorators-legacy',
        [
            'module-alias', [
                { src: r('./'), 'expose': '~'},
                {src: r('./database/models'), 'expose': 'models'},
                {src: r('./database/controllers'), 'expose': 'controllers'},
                {src: r('./router'), 'expose': 'router'},
                {src: r('./config'), 'expose': 'config'},
                {src: r('./middlewares'), 'expose': 'middlewares'}
            ]
        ]
    ]
})

require('babel-polyfill')
require('./app')