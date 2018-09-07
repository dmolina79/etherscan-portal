const { Router } = require('express');
const queryString = require('query-string');
const { fetchAddressBalance, fetchTxHistory } = require('../services/api');
const createAddressService = require('../services/addressService');


const buildRoute = ({ config, db}) => {
    let addressService = createAddressService({ db });
    let routes = Router();

    routes.get('/', async (req, res) => {
        try {
            const addressList = await Address.find({});
            return res.send({ data: addressList });
        } catch (error) {
            return res.status(500).json({ message: `System Error: ${error}` }); 
        }
    });

    routes.post('/:address', async (req, res) => {
        const { address } = req.params;

        try {

            const balanceRes = fetchAddressBalance(address);
            const txListRes = fetchTxHistory(address);

            const responses = await Promise.all([balanceRes, txListRes]);

            const result = {
                address,
                balance: responses[0].balance,
                balanceInWei: responses[0].balanceInWei,
                transactions: responses[1].transactions
            }

            await addressService.saveAddressInfo(result);

			return res.send(result);
        } catch (error) {
            return res.status(500).json({ message: `System Error: ${error}` }); 
        }
    });



    return routes;
}

module.exports = ({ config, db}) => {
    return buildRoute({ config, db});
}