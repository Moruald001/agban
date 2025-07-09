const express = require("express");
const router = express.Router();
const validate = require("../utils/validate");
const {
  createClient,
  createList,
  getClients,
  getLists,
} = require("../controllers/Client.controller");
const { createClientSchema, createListSchema } = require("../utils/schema");

router.post("/add-client", validate(createClientSchema), createClient);
router.post("/create-list", validate(createListSchema), createList);
router.get("/clients", getClients);
router.get("/lists", getLists);

module.exports = router;
