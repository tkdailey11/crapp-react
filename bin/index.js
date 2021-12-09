#!/usr/bin/env node

const fse = require('fs-extra')
const npm = require('npm-programmatic')

const appName = process.argv[2]
const dir = `./${appName}`

fse.ensureDir(dir)
.then(() => {
    console.log('successfully created directory')
})
.catch(err => {
    console.error(err)
})

fse.copy(__dirname + '/../resources', dir)
.then(() => {
    console.log('successfully copied files')
})
.catch(err => {
    console.error(err)
})

const json = {
    "name": appName,
    "version": "1.0.0",
    "description": "",
    "keywords": [],
    "author": "",
    "license": "MIT",
    "private": true,
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    }
}

const fileName = `${dir}/package.json`;

fse.writeJson(fileName, json)
.then(()=> {
    console.log('successfully set contents of package.json')
})
.catch(err => {
    console.error(err)
})

const packages = [
    '@types/node',
    'react',
    '@types/react',
    'react-dom',
    '@types/react-dom',
    'react-scripts',
    'typescript'
]

npm.install(packages, {
    output: true,
    cwd: dir
})
.then(() => {
    console.log('successfully installed packages')
})
.catch(err => {
    console.error(err)
})