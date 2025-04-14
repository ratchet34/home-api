const { client } = require("../client");
const mongodb = require("mongodb");
const sendMessageToUser = require("../notifications/firebase");

const getTasks = async (showDone = false) => {
  const tasks = await client
    .db("home")
    .collection("tasks")
    .find({ done: { $ne: !showDone } })
    .toArray();
  return tasks;
};

const createTask = async (task) => {
  const result = await client.db("home").collection("tasks").insertOne(task);
  if (!result.error) {
    task.owner.forEach((userId) => {
      sendMessageToUser(userId, {
        title: "New task created for you",
        body: `${task.title}`,
        path: "/tasks",
      });
      return result;
    });
  }
};

const updateTask = async (id, task) => {
  console.log("updateTask", id, task);
  const result = await client
    .db("home")
    .collection("tasks")
    .updateOne(
      { _id: mongodb.ObjectId.createFromHexString(id) },
      { $set: task }
    );
  return result;
};

const deleteTask = async (id) => {
  const result = await client
    .db("home")
    .collection("tasks")
    .deleteOne({ _id: mongodb.ObjectId.createFromHexString(id) });
  return result;
};

const getUserTasks = async (userId) => {
  const tasks = await client
    .db("home")
    .collection("tasks")
    .find({ owner: userId })
    .toArray();
  return tasks;
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getUserTasks };
