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
        const addressInfo = await query.exec();

        if (addressInfo === null || addressInfo.length === 0 || addressInfo[0] === null) {
            return null;
        }

        const { address, transactions } = addressInfo[0];
        return {
            address: queryAddress,
            totalTransactions: transactions.length,
            transactions
        }
    }

    const _buildQuery = (queryAddress, queryOptions) => {
        let query;
        let match = [];

        if (queryOptions) {
            if (queryAddress) {
                match.push({ $match: { address: queryAddress} }); 
            } else {
                throw Error('Error: Argument address expected');
            }
            match.push({ $unwind: '$transactions' });
            if (queryOptions.startBlock) {              
                match.push({ $match: { 'transactions.blockNumber': { $gte: parseInt(queryOptions.startBlock) } } });                   
            }
            if (queryOptions.endBlock) {
                match.push({ $match: { 'transactions.blockNumber': { $lte: parseInt(queryOptions.endBlock) } } }); 
            }
            match.push({ $group: { _id: '$_id$',  transactions: { $push: '$transactions'} } }); 
        }

        query = Address.aggregate(match);

        return query;
    }

    return {
        saveAddressInfo: _saveAddressInfo,
        getAddressInfo: _getAddressInfo,
        getAddressTxs: _getAddressTxs
    }
}