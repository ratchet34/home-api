const { client } = require("../client");
const mongodb = require("mongodb");

const getIngredients = async () => {
  const ingredients = await client.db('home').collection('ingredient-dictionary').find({}).toArray();
  return ingredients;
}

const createIngredient = async (ingredient) => {
  const existingIngredient = await client.db('home').collection('ingredient-dictionary').findOne({ title: ingredient.title });
  if (existingIngredient) {
    return { error: 'Ingredient already exists' };
  }
  const result = await client.db('home').collection('ingredient-dictionary').insertOne(ingredient);
  return result;
}

const updateIngredient = async (id, ingredient) => {
  const result = await client.db('home').collection('ingredient-dictionary').updateOne({ _id: mongodb.ObjectId.createFromHexString(id) }, { $set: ingredient });
  return result;
}

const deleteIngredient = async (id) => {
  const result = await client.db('home').collection('ingredient-dictionary').deleteOne({ _id: mongodb.ObjectId.createFromHexString(id) });
  return result;
}

module.exports = { getIngredients, createIngredient, updateIngredient, deleteIngredient };