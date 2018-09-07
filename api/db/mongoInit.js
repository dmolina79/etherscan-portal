const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// init mongodb connection
module.exports = config =>
  new Promise(async (resolve, reject) => {
    try {
      console.info('Trying MongoDB connection using ', process.env.MONGO_URI);
      const res = await mongoose.connect(process.env.MONGO_URI);
      resolve(res.connection);
    } catch (err) {
      reject(err);
    }
});
