const { MongoClient } = require("mongodb");

const uri = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}:${process.env.MONGOPORT}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { tls: false });

module.exports = { client };
