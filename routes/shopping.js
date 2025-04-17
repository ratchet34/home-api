const {
  getShoppingItems,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
} = require("../controllers/shopping/item");
const {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/shopping/ingredient");
const {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/shopping/location");

const createShoppingItemsRoutes = (app) => {
  app.get("/shopping/items", async (req, res) => {
    const items = await getShoppingItems();
    res.send(items);
  });

  app.put("/shopping/item", async (req, res) => {
    const item = req.body;
    const result = await createShoppingItem(item);
    res.send(result);
  });

  app.patch("/shopping/item/:id", async (req, res) => {
    const { id } = req.params;
    const item = req.body;
    const result = await updateShoppingItem(id, item);
    res.send(result);
  });

  app.delete("/shopping/item/:id", async (req, res) => {
    const { id } = req.params;
    const result = await deleteShoppingItem(id);
    res.send(result);
  });
};

const createShoppingIndredientsRoutes = (app) => {
  app.get("/shopping/ingredients", async (req, res) => {
    const items = await getIngredients();
    res.send(items);
  });

  app.put("/shopping/ingredient", async (req, res) => {
    const item = req.body;
    const result = await createIngredient(item);
    res.send(result);
  });

  app.patch("/shopping/ingredient/:id", async (req, res) => {
    const { id } = req.params;
    const item = req.body;
    const result = await updateIngredient(id, item);
    res.send(result);
  });

  app.delete("/shopping/ingredient/:id", async (req, res) => {
    const { id } = req.params;
    const result = await deleteIngredient(id);
    res.send(result);
  });
};

const createShoppingLocationsRoutes = (app) => {
  app.get("/shopping/locations", async (req, res) => {
    const items = await getLocations();
    res.send(items);
  });

  app.put("/shopping/location", async (req, res) => {
    const item = req.body;
    const result = await createLocation(item);
    res.send(result);
  });

  app.patch("/shopping/location/:id", async (req, res) => {
    const { id } = req.params;
    const item = req.body;
    const result = await updateLocation(id, item);
    res.send(result);
  });

  app.delete("/shopping/location/:id", async (req, res) => {
    const { id } = req.params;
    const result = await deleteLocation(id);
    res.send(result);
  });
};

module.exports = {
  createShoppingItemsRoutes,
  createShoppingIndredientsRoutes,
  createShoppingLocationsRoutes,
};
