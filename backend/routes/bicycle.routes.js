module.exports = app => {
  const bicycles = require("../controllers/bicycle.controller");
  let router = require("express").Router();
  let upload = require('../multer/upload');
  const auth = require("../controllers/auth.js");

  // Create a new Bicycle
  // DECOMMENT:
  router.post("/", auth.isAuthenticated, upload.single('filename'), bicycles.create);
  // router.post("/", bicycles.create);
  // Retrieve all Bicycles
  router.get("/", auth.isAuthenticated, bicycles.findAll);
  // Retrieve a single Bicycle with id
  router.get("/:id", auth.isAuthenticated, bicycles.findOne);
  // Update a Bicycle with id
  router.put("/:id", auth.isAuthenticated, (req, res, next) => {
    upload.single('filename')(req, res, function(err) {
      if (err) console.log("Error multer:", err);
      next();
    });
  }, bicycles.update);
  // router.put("/:id", auth.isAuthenticated, bicycles.update);
  // Delete a Bicycle with id
  router.delete("/:id", auth.isAuthenticated, bicycles.delete);
  router.delete("/", auth.isAuthenticated, bicycles.deleteAll);

  app.use("/api/bicycles", router);
}