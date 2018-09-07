const { Router } = require('express');

const buildRoute = ({ config, db}) => {
    console.log('build address route');

    let routes = Router();

    return routes;
}

module.exports = ({ config, db}) => {
    return buildRoute({ config, db});
}