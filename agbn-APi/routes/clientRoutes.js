const express = require("express");
const router = express.Router();
const validate = require("../utils/validate");
const {
  createClient,
  createList,
} = require("../controllers/createClient.controller");
const { createClientSchema, createListSchema } = require("../utils/schema");

router.post("/add-client", validate(createClientSchema), createClient);
router.post("/create-list", validate(createListSchema), createList);

module.exports = router;
