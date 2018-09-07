const queryString = require('query-string');
const web3 = require('web3');

const API_KEY = process.env.ETHSCAN_API_KEY;
const API_BASE = 'https://api.etherscan.io/api';


const fetchAddressBalance = async (address) => {
    const apiParams = {
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest',
        apikey: API_KEY
    };

    const stringParams = queryString.stringify(apiParams);
    const res = await fetch(`${API_BASE}?${stringParams}`);
    const jsonRes = await res.json();

    const { result } = jsonRes;

    return { address, balance: web3.utils.fromWei(result,'ether'), balanceInWei: result  };
}

const fetchTxHistory = async address => {
    const apiParams = {
        module: 'account',
        action: 'txlist',
        address,
        apikey: API_KEY
    };

    const stringParams = queryString.stringify(apiParams);
    const res = await fetch(`${API_BASE}?${stringParams}`);
    const jsonRes = await res.json();

    const { result } = jsonRes;

    return { address, transactions: result };
}

module.exports.fetchTxHistory = fetchTxHistory;
module.exports.fetchAddressBalance = fetchAddressBalance;