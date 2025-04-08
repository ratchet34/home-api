const { client } = require("../client");
const mongodb = require("mongodb");

const getTasks = async () => {
  const tasks = await client.db('home').collection('tasks').find({}).toArray();
  return tasks;
}

const createTask = async (task) => {
  const result = await client.db('home').collection('tasks').insertOne(task);
  return result;
}

const updateTask = async (id, task) => {
  const result = await client.db('home').collection('tasks').updateOne({ _id: mongodb.ObjectId.createFromHexString(id) }, { $set: task });
  return result;
}

const deleteTask = async (id) => {
  const result = await client.db('home').collection('tasks').deleteOne({ _id: mongodb.ObjectId.createFromHexString(id) });
  return result;
}

const getUserTasks = async (userId) => {
  const tasks = await client.db('home').collection('tasks').find({ owner: userId }).toArray();
  return tasks;
}

module.exports = { getTasks, createTask, updateTask, deleteTask, getUserTasks };
