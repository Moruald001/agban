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
  getListsLatest,
} = require("../controllers/Client.controller");
const { createClientSchema, createListSchema } = require("../utils/schema");
const auth = require("../middlewares/authMiddleware");
const isCeoMiddleware = require("../middlewares/isCeo");

// creation
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
// modification
router.put(
  "/update-client/:id",
  auth,
  isCeoMiddleware,
  validate(createClientSchema),
  updateClient
);
// suppression

router.delete("/delete-client/:id", auth, isCeoMiddleware, deleteClient);
//recuperation
router.get("/clients", auth, getClients);
router.get("/lists", auth, getLists);
router.get("/latest-lists", auth, getListsLatest);

module.exports = router;
