const Address = require('../db/models/address');

module.exports = ({ config, db }) => {
    const _saveAddressInfo = async (addressInfo) => {
        const { address } = addressInfo;
        const options = { upsert: true };
        const res = await Address.findOneAndUpdate({ address }, addressInfo, options);
        return addressInfo;
    };

    return {
        saveAddressInfo: _saveAddressInfo
    }
}