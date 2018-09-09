const Address = require('../db/models/address');

module.exports = ({ config, db }) => {
    const _saveAddressInfo = async (addressInfo) => {
        const { address } = addressInfo;
        const options = { upsert: true };
        const res = await Address.findOneAndUpdate({ address }, addressInfo, options);
        return addressInfo;
    };

    const _getAddressInfo = async (queryAddress) => {
        const addressInfo = await Address.findOne({ address: queryAddress });

        if (addressInfo === null) {
            return null;
        }

        const { address, balance, balanceInWei, transactions } = addressInfo;
        return {
            address,
            balance,
            balanceInWei,
            totalTransactions: transactions.length
        }
    }

    const _getAddressTxs = async (queryAddress, queryOptions) => {
        const query = _buildQuery(queryAddress, queryOptions);
        console.log('query', query._conditions);    
        const addressInfo = await query.exec();
        console.log('addressInfo', addressInfo);

        if (addressInfo === null || addressInfo.length === 0 || addressInfo[0] === null) {
            return null;
        }

        const { address, transactions } = addressInfo[0];
        return {
            address,
            totalTransactions: transactions.length,
            transactions
        }
    }

    const _buildQuery = (queryAddress, queryOptions) => {
        let query;
        let match = { '$and': [] };

        if (queryOptions) {
            if (queryAddress) {
                match['$and'].push({ address: queryAddress }); 
            } else {
                throw Error('Error: Argument address expected');
            }
            if (queryOptions.startBlock) {
                // match['$and'].push({ transactions: { "$elemMatch": { timeStamp: { "$gte": parseInt(queryOptions.startBlock) } } } }); 
                match['$and'].push({ 'transactions.blockNumber' : { "$eq": queryOptions.startBlock } }); 
            }
        }

        console.log('match', match);

        if (queryOptions && queryOptions.limit) {
            query = Address.find(match, { transactions : { $slice: -parseInt(queryOptions.limit) } });
        } else {
            query = Address.find(match);
        }
        
        // if (queryOptions) {
        //     if (queryAddress) {
        //         query.where('address', queryAddress);
        //     } else {
        //         throw Error('Error: Argument address expected');
        //     }
        //     if (queryOptions.startBlock) {
        //         query.where('transactions.blockNumber').gt(parseInt(queryOptions.startBlock));
        //     }
        //     if (queryOptions.sort) {
        //         if (queryOptions.sort ==='DES') {
        //             query.sort('-transactions.blockNumber');
        //         }   
        //     }
        // }

        return query;
    }

    return {
        saveAddressInfo: _saveAddressInfo,
        getAddressInfo: _getAddressInfo,
        getAddressTxs: _getAddressTxs
    }
}