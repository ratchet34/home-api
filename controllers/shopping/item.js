const { client } = require("../client");
const mongodb = require("mongodb");

const getShoppingItems = async () => {
  const items = await client
    .db("home")
    .collection("shopping-list")
    .find({})
    .toArray();
  return items;
};

const createShoppingItem = async (item) => {
  const result = await client
    .db("home")
    .collection("shopping-list")
    .insertOne(item);
  return result;
};

const updateShoppingItem = async (id, item) => {
  const result = await client
    .db("home")
    .collection("shopping-list")
    .updateOne(
      { _id: mongodb.ObjectId.createFromHexString(id) },
      { $set: item }
    );
  return result;
};

const deleteShoppingItem = async (id) => {
  const result = await client
    .db("home")
    .collection("shopping-list")
    .deleteOne({ _id: mongodb.ObjectId.createFromHexString(id) });
  return result;
};

module.exports = {
  getShoppingItems,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
};
