const firebase = require("firebase-admin");

const { getFcmTokenById } = require("./token");

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

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
