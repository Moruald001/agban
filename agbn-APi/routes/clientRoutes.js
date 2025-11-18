import express from "express";
const router = express.Router();

import validate from "../middlewares/validate.js";
import upload from "../middlewares/imagesUpload.js";
import auth from "../middlewares/authMiddleware.js";
import isCeoMiddleware from "../middlewares/isCeo.js";

import {
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
} from "../controllers/Client.controller.js";

import {
  createClientSchema,
  createListSchema,
  publishSchema,
  delivredSchema,
  archivedSchema,
} from "../utils/schema.js";

// Création
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

// Modification
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

// Suppression
router.delete("/delete-client/:id", auth, isCeoMiddleware, deleteClient);
router.delete("/delete-list/:id", auth, isCeoMiddleware, deleteList);

// Récupération
router.get("/clients", auth, getClients);
router.get("/latest-lists/:id", auth, isCeoMiddleware, getListsLatest);
router.get("/lists/:id", auth, getLists);
router.get("/latest-lists-collaborator/:id", auth, getLatestCollaboratorLists);
router.get("/lists-collaborator/:id", auth, getCollaboratorLists);

export default router;
