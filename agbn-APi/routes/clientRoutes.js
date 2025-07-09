const express = require("express");
const router = express.Router();
const validate = require("../utils/validate");
const {
  createClient,
  createList,
  getClients,
  getLists,
  updateClient,
} = require("../controllers/Client.controller");
const {
  createClientSchema,
  createListSchema,
  updateClientSchema,
} = require("../utils/schema");

router.post("/add-client", validate(createClientSchema), createClient);
router.post("/create-list", validate(createListSchema), createList);
router.post("/update-client/:id", validate(updateClientSchema), updateClient);
router.get("/clients", getClients);
router.get("/lists", getLists);

module.exports = router;
