## Instruction to run project

1. git clone project
2. yarn install
Rename .env file and fill up values for mongo and Etherscan API
3. mv .env.template .env 
4. yarn run dev  or npm run dev


##Querying API locally

API port is at http://localhost:5000

#Endpoints

*POST /api/address/:address
Loads a given ethereum address information into the MongoDB using information from Etherscan
*GET /api/address/:address
lists Address Information from loaded data in MongoDB
*GET /api/transactions/:address
lists Transaction Information for provided address from MongoDB
(possible query params: ?startBlock and endBlock, both need to be a number and filter the transactions according to the values. Example:
/api/transactions/0x0001?startBlock=31&endBlock=48
 )

## Demo Site

https://balance3-test.herokuapp.com/



