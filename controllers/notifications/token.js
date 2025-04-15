const { client } = require("../client");
const mongodb = require("mongodb");

async function getFcmTokenById(id) {
  try {
    const result = await client
      .db("home")
      .collection("users")
      .findOne({ _id: mongodb.ObjectId.createFromHexString(id) });
    if (result.deviceTokens && result.deviceTokens.length > 0) {
      return result.deviceTokens;
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
    const user = await client
      .db("home")
      .collection("users")
      .findOne({ _id: mongodb.ObjectId.createFromHexString(id) });

    if (user && user.deviceTokens && user.deviceTokens.includes(token)) {
      console.log("Token already exists for this user.");
      return { acknowledged: true, modifiedCount: 0 };
    }

    const result = await client
      .db("home")
      .collection("users")
      .updateOne(
        { _id: mongodb.ObjectId.createFromHexString(id) },
        { $addToSet: { deviceTokens: token } }
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
