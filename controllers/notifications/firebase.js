const firebase = require("firebase-admin");

const { getFcmTokenById } = require("./token");

const serviceAccount =
  process.env.NODE_ENV === "development"
    ? require("../../service-account.json")
    : require("/etc/home-api/service-account.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

async function sendMessageToDevice(token, message) {
  try {
    const payload = {
      token,
      notification: {
        title: message.title,
        body: message.body,
      },
    };

    const response = await firebase.messaging().send(payload);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

async function sendMessageToUser(id, message) {
  try {
    const token = await getFcmTokenById(id);
    if (!!token) {
      sendMessageToDevice(token, message);
    } else {
      console.error("No device tokens found for this user.");
    }
  } catch (error) {
    console.error("Error sending message to user:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

module.exports = sendMessageToUser;
