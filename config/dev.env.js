'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    HOST: '""',
    BASE_PATH: '"http://localhost:8080"',
    EDITOR_IMG_UPLOAD: '"http://ganttask.damon.com/api/v1/task/upload"',
    VERSION: '"v1.0.4"',
    Mock: true
})
