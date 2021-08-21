# Building the Node Scoped Package COMMON.JS
This is to help others in creating and publishing a npmjs.com package and publish the package successfully.

## Create the project directory

    mkdir common.js
    cd common.js

## Switch to the Profile

    npmrc presspage

## Create a GIT repository

    git init
    git remote add origin https://github.com/pingleware/common.js.git

## Initialize the NPM project

    npm init --scope=@presspage

or, without prompts

    npm init --scope=@presspage -y

## Edit the PACKAGE.JSON

    Update the name of the package, if needed?
    Add a description
    Add the author name, email and url
    Add any maintainers
    Choose the appropriate license
    Add homepage, bugs, repository
    Add "private": false,
    Add "engines": { "node": ">=6.0.0" },
    Add "engineStrict": true

## Login to NPMJS.COM

    npm login --scope=@presspage --repository=https://registry.npmjs.org

## Publish the package

    npm publish --access public

## Assigned a dist-tag with stable

    npm dist-tag add @presspage/common-js@1.0.0 stable