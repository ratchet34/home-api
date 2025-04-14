const { client } = require("../client");
const mongodb = require("mongodb");

async function getFcmTokenById(id) {
  try {
    const result = await client
      .db("home")
      .collection("users")
      .findOne({ _id: mongodb.ObjectId.createFromHexString(id) });
    if (result.deviceToken) {
      return result.deviceToken;
    } else {
      console.error("No device tokens found for this user.");
    }
  } catch (error) {
    console.error("Error fetching FCM token:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

async function addTokenToUser(id, token) {
  try {
    const result = await client
      .db("home")
      .collection("users")
      .updateOne(
        { _id: mongodb.ObjectId.createFromHexString(id) },
        { $set: { deviceToken: token } }
      );
    return result;
  } catch (error) {
    console.error("Error adding token to user:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

module.exports = {
  getFcmTokenById,
  addTokenToUser,
};
