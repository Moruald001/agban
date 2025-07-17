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
const isCeoMiddleware = require("../middlewares/isCeo");

router.post(
  "/add-client",
  auth,
  isCeoMiddleware,
  upload.array("images"),
  validate(createClientSchema),
  createClient
);
router.post(
  "/create-list",
  auth,
  isCeoMiddleware,
  validate(createListSchema),
  createList
);
router.put(
  "/update-client/:id",
  auth,
  isCeoMiddleware,
  validate(createClientSchema),
  updateClient
);
router.delete("/delete-client/:id", auth, isCeoMiddleware, deleteClient);
router.get("/clients", auth, getClients);
router.get("/lists", auth, getLists);

module.exports = router;
