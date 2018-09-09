const { Router } = require('express');
const queryString = require('query-string');
const createAddressService = require('../services/addressService');


const buildRoute = ({ config, db}) => {
    let addressService = createAddressService({ db });
    let routes = Router();

    routes.get('/:address', async (req, res) => {
        const { address } = req.params;
        const queryOptions = req.query;
        try {
            const addressInfo = await addressService.getAddressTxs(address, queryOptions);
            if (addressInfo !== null) {
                return res.send({ ...addressInfo });
            } else {
                return res.status(404).json({ message: 'Address information not found'});
            }
            
        } catch (error) {
            return res.status(500).json({ message: `System Error: ${error}` }); 
        }
    });

    return routes;
}

module.exports = ({ config, db}) => {
    return buildRoute({ config, db});
}