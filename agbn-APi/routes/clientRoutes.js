const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const upload = require("../middlewares/imagesUpload");
const {
  createClient,
  createList,
  getClients,
  getLists,
  updateClient,
  deleteClient,
} = require("../controllers/Client.controller");
const { createClientSchema, createListSchema } = require("../utils/schema");
const auth = require("../middlewares/authMiddleware");

router.post(
  "/add-client",
  auth,
  upload.array("images"),
  validate(createClientSchema),
  createClient
);
router.post("/create-list", auth, validate(createListSchema), createList);
router.put(
  "/update-client/:id",
  auth,
  validate(createClientSchema),
  updateClient
);
router.delete("/delete-client/:id", auth, deleteClient);
router.get("/clients", auth, getClients);
router.get("/lists", auth, getLists);

module.exports = router;
