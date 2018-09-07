const { Router } = require('express');
const address = require('./routes/address');

module.exports = ({ config, db }) => {
    let api = Router();

    
    api.get('/', (req, res) => {
        res.json({ message: 'API is healthy' });
    });

    // mount the api resource
    api.use('/address', address({ config, db }));

   

    return api;
}