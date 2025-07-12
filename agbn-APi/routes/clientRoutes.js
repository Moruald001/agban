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
const authMiddleware = require("../middlewares/auth");

router.post(
  "/add-client",
  authMiddleware,
  upload.array("images"),
  validate(createClientSchema),
  createClient
);
router.post(
  "/create-list",
  authMiddleware,
  validate(createListSchema),
  createList
);
router.put(
  "/update-client/:id",
  authMiddleware,
  validate(createClientSchema),
  updateClient
);
router.delete("/delete-client/:id", authMiddleware, deleteClient);
router.get("/clients", authMiddleware, getClients);
router.get("/lists", authMiddleware, getLists);

module.exports = router;
