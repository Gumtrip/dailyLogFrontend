'use strict'

var fs = require('fs');
var gulp = require('gulp')
var GulpSSH = require('gulp-ssh')

var config = {
    host: '39.108.77.72',
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync('./authkey.pem')
}

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
})