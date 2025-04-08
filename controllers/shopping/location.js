const { client } = require("../client");
const mongodb = require("mongodb");

const getLocations = async () => {
  const locations = await client.db('home').collection('shopping-location-dictionary').find({}).toArray();
  return locations;
}

const createLocation = async (location) => {
  const result = await client.db('home').collection('shopping-location-dictionary').insertOne(location);
  return result;
}

const updateLocation = async (id, location) => {
  const result = await client.db('home').collection('shopping-location-dictionary').updateOne({ _id: mongodb.ObjectId.createFromHexString(id) }, { $set: location });
  return result;
}

const deleteLocation = async (id) => {
  const result = await client.db('home').collection('shopping-location-dictionary').deleteOne({ _id: mongodb.ObjectId.createFromHexString(id) });
  return result;
}

module.exports = { getLocations, createLocation, updateLocation, deleteLocation };