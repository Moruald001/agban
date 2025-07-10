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
const {
  createClientSchema,
  createListSchema,
  updateClientSchema,
} = require("../utils/schema");

router.post(
  "/add-client",
  validate(createClientSchema),
  upload.array("images"),
  createClient
);
router.post("/create-list", validate(createListSchema), createList);
router.put("/update-client/:id", validate(updateClientSchema), updateClient);
router.delete("/delete-client/:id", deleteClient);
router.get("/clients", getClients);
router.get("/lists", getLists);

module.exports = router;
