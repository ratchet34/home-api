const { client } = require("../client");
const mongodb = require("mongodb");

const getShoppingItems = async () => {
  const tasks = await client.db('home').collection('shopping-list').find({}).toArray();
  return tasks;
}

const createShoppingItem = async (task) => {
  const result = await client.db('home').collection('shopping-list').insertOne(task);
  return result;
}

const updateShoppingItem = async (id, task) => {
  const result = await client.db('home').collection('shopping-list').updateOne({ _id: mongodb.ObjectId.createFromHexString(id) }, { $set: task });
  return result;
}

const deleteShoppingItem = async (id) => {
  const result = await client.db('home').collection('shopping-list').deleteOne({ _id: mongodb.ObjectId.createFromHexString(id) });
  return result;
}

module.exports = { getShoppingItems, createShoppingItem, updateShoppingItem, deleteShoppingItem };
