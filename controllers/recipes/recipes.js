const e = require("express");
const { client } = require("../client");
const mongodb = require("mongodb");

const getRecipes = async () => {
  const recipes = await client
    .db("home")
    .collection("recipes")
    .find({})
    .toArray();
  return recipes;
};

const createRecipe = async (recipe) => {
  const existingRecipe = await client
    .db("home")
    .collection("recipes")
    .findOne({ title: recipe.title });
  if (existingRecipe) {
    return { error: "Recipe already exists" };
  }
  const result = await client
    .db("home")
    .collection("recipes")
    .insertOne(recipe);
  return result;
};

const updateRecipe = async (id, recipe) => {
  const result = await client
    .db("home")
    .collection("recipes")
    .updateOne(
      { _id: mongodb.ObjectId.createFromHexString(id) },
      { $set: recipe }
    );
  return result;
};

const deleteRecipe = async (id) => {
  const result = await client
    .db("home")
    .collection("recipes")
    .deleteOne({ _id: mongodb.ObjectId.createFromHexString(id) });
  return result;
};

const getRecipeById = async (id) => {
  const recipe = await client
    .db("home")
    .collection("recipes")
    .findOne({ _id: mongodb.ObjectId.createFromHexString(id) });
  return recipe;
};

module.exports = {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
};
