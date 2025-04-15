const { client } = require("../controllers/client");
const { addTokenToUser } = require("../controllers/notifications/token");
const { checkLogin, listUsers } = require("../controllers/users/users");

const createUsersRoutes = (app) => {
  app.post("/users/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await checkLogin(username, password);
    if (result) {
      req.session.regenerate(function (err) {
        if (err) next(err);

        // store user information in session, typically a user id
        req.session.user = result._id.toString();
        req.session.username = result.username;

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err);
          res.send(result);
        });
      });
    } else {
      res.status(401).send("Invalid username or password.");
    }
  });

  app.get("/users/logout", (req, res) => {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);

      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err);
        res.redirect("/login");
      });
    });
  });

  app.get("/users/check-auth", (req, res) => {
    if (req.session.user) {
      res.send({
        user: {
          _id: req.session.user,
          username: req.session.username,
          notificationsEnabled: !!req.session.deviceTokens,
        },
        loggedIn: true,
      });
    } else {
      res.status(401).send({ loggedIn: false });
    }
  });

  app.get("/users", async (req, res) => {
    const users = await listUsers();
    res.send(users);
  });

  app.patch("/users/:id/notifications-token", async (req, res) => {
    const { id } = req.params;
    const { token } = req.body;
    try {
      addTokenToUser(id, token);
    } catch (error) {
      console.error("Error adding token to user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = { createUsersRoutes };
