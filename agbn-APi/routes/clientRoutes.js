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
  updateList,
  deleteClient,
  deleteList,
  getListsLatest,
  publishList,
  delivredList,
  archivedList,
  delivredClient,
  getLatestCollaboratorLists,
  getCollaboratorLists,
} = require("../controllers/Client.controller");
const {
  createClientSchema,
  createListSchema,
  publishSchema,
  delivredSchema,
  archivedSchema,
} = require("../utils/schema");
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

router.put(
  "/update-list/:id",
  auth,
  isCeoMiddleware,
  validate(createListSchema),
  updateList
);

router.put(
  "/publish-list/:id",
  auth,
  isCeoMiddleware,
  validate(publishSchema),
  publishList
);

router.put("/delivred-list/:id", auth, validate(delivredSchema), delivredList);

router.put(
  "/delivred-client/:id",
  auth,
  validate(delivredSchema),
  delivredClient
);

router.put("/archived-list/:id", auth, validate(archivedSchema), archivedList);

// suppression

router.delete("/delete-client/:id", auth, isCeoMiddleware, deleteClient);
router.delete("/delete-list/:id", auth, isCeoMiddleware, deleteList);

//recuperation
router.get("/clients", auth, getClients);
router.get("/latest-lists/:id", auth, isCeoMiddleware, getListsLatest);
router.get("/lists/:id", auth, getLists);
router.get("latest-lists-collaborator", auth, getLatestCollaboratorLists);
router.get("lists-collaborator", auth, getCollaboratorLists);

module.exports = router;
