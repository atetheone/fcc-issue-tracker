const mongoose = require("mongoose");
const runner = require('./test-runner');
require("dotenv").config();

mongoose.set('strictQuery', true);
const startDB = async (app, port) => {
  const mongo_uri = process.env.MONGO_URI || "";
  try {
    await mongoose.connect(mongo_uri);
    console.log("Connected successfully to the DB");
    app.listen(port, () => {
      console.log('Your app is listening on port ' + port);
      if (process.env.NODE_ENV === 'test') {
        console.log('Running Tests...');
        setTimeout(function () {
          try {
            runner.run();
          } catch(e) {
            console.log('Tests are not valid:');
            console.error(e);
          }
        }, 15000);
      }
    });
  } catch (err) {
    console.log("Unable to connect to the DB");
  }
};

module.exports = startDB;