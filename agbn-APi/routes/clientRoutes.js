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

router.post(
  "/add-client",
  upload.array("images"),
  validate(createClientSchema),
  createClient
);
router.post("/create-list", validate(createListSchema), createList);
router.put("/update-client/:id", validate(createClientSchema), updateClient);
router.delete("/delete-client/:id", deleteClient);
router.get("/clients", getClients);
router.get("/lists", getLists);

module.exports = router;
