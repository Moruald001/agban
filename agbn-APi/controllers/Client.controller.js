const { Client, List, Img } = require("../models");
const cloudinary = require("../config/cloudinary");
const fs = require("fs").promises;
const path = require("path");
const { fileTypeFromBuffer } = require("file-type");
const uploadToCloudinary = require("../utils/uploadedCloudinary");
const { log } = require("console");

//Ajout d'un client

const createClient = async (req, res) => {
  const { name, contact, description, keep, listId } = req.body;
  console.log(listId);

  // on verifie si la liste ,le numero ou le nom  existe exist déjà ?
  const list = await List.findByPk(listId);

  const clientExist = await Client.findOne({ where: { name } });
  const clientNumberExist = await Client.findOne({ where: { contact } });

  if (!list) {
    return res.status(404).json({
      message: "list id invalide",
    });
  }

  if (clientExist !== null) {
    res.status(404).json({
      message: "ce client existe déjà, modifier le si vous le souhaitez",
    });
    throw new Error("ce client existe déjà");
  }

  if (clientNumberExist !== null) {
    res.status(404).json({
      message: "ce numero exist déjà ",
    });
    throw new Error("ce client existe déjà");
  }
  // ajout du client
  try {
    const response = await Client.create({
      name,
      contact,
      description,
      keep,
      listId,
    });

    if (response === undefined) {
      res.status(400).json({ message: "erreur lors de l'ajout du client" });
      throw new Error("erreur lors de l'ajout du client");
    }

    const client = response.toJSON();

    if (req.files && req.files.length > 0) {
      const images = await Promise.all(
        req.files.map(async (file) => {
          if (!file.buffer) throw new Error("file.buffer est undefined !");

          const type = await fileTypeFromBuffer(file.buffer);
          if (
            !type ||
            !["image/jpeg", "image/png", "image/webp"].includes(type.mime)
          ) {
            throw new Error("Contenu du fichier image invalide");
          }

          // Upload sur Cloudinary et récupère le secure_url
          const result = await uploadToCloudinary(file.buffer);

          return {
            img: result.secure_url,
            publicId: result.public_id,
            clientId: client.id,
          };
        })
      );

      // On enregistre toutes les images en base
      await Img.bulkCreate(images);
    }
    console.log("client ajouté avec succès");

    console.log(client);
    res.status(201).json({
      message: `le client a été ajouté avec succès`,
      client,
    });
  } catch (error) {
    res.status(500).json({ message: `erreur serveur ${error} ` });
  }
};

//Recuperation des clients

const getClients = async (req, res) => {
  try {
    const clientsList = await Client.findAll({
      attributes: ["id", "name", "contact", "description", "keep"],
      include: [Img],
    });
    res.status(200).json({ "liste des clients": clientsList });
  } catch (error) {
    res.status(500).json({ error: "erreur serveur" }, error);
  }
};
// modifier
const updateClient = async (req, res) => {
  const id = req.params.id;
  const { name, description, contact, keep } = req.body;

  const client = await Client.findByPk(id);
  if (client === null) {
    res.status(400).json({
      message: "impossible de mettre à jour ce client, il est introuvable",
    });
    throw new Error(
      "impossible de mettre à jour ce client car il est introuvable"
    );
  }
  try {
    await Client.update(
      { name, description, contact, keep },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "info client mise à jour " });
  } catch (error) {
    console.error("❌ Erreur update client:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
const delivredClient = async (req, res) => {
  const id = req.params.id;
  const { delivred } = req.body;

  const client = await Client.findByPk(id);
  if (client === null) {
    res.status(400).json({
      message: "impossible de mettre à jour ce client, il est introuvable",
    });
    throw new Error(
      "impossible de mettre à jour ce client car il est introuvable"
    );
  }
  try {
    await Client.update(
      { delivred },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "info client mise à jour " });
  } catch (error) {
    console.error("❌ Erreur update client:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
// Suppression d'un client
const deleteClient = async (req, res) => {
  const id = req.params.id;

  try {
    const client = await Client.findByPk(id, { include: Img });

    if (client === null) {
      res.status(400).json({
        message: "Erreur lors de la suppression ",
      });
      throw new Error(
        "impossible de supprimer  ce client car il est introuvable"
      );
    }
    // 2. Supprimer les images sur Cloudinary
    const destroyImagesPromises = client.imgs.map((img) =>
      cloudinary.uploader.destroy(img.publicId)
    );
    await Promise.all(destroyImagesPromises);
    const response = await Client.destroy({
      where: {
        id,
      },
      force: true,
    });

    if (!response) {
      res.status(500).json({ erreur: "la suppression à echoué" });
      throw new Error("la suppression à echoué");
    }
    res
      .status(200)
      .json({ message: "la suppression à été effectué avec succès", client });
  } catch (error) {
    console.log("erreur serveur ", error);
    res.status(500).json({ erreur: "la suppression à echoué " });
  }
};

// Creation d'une liste
const createList = async (req, res) => {
  const { name } = req.body;
  const user = req.user;
  const ListExist = await List.findOne({ where: { name } });

  if (ListExist !== null) {
    return res.status(404).json({
      message: "Cette liste existe déjà",
    });
  }

  try {
    const response = await List.create({
      name,
      userId: user.id,
    });

    if (response === undefined) {
      return res
        .status(400)
        .json({ message: "erreur lors de la creation de la liste" });
    }

    console.log("Liste crée avec succès");
    const list = response.toJSON();
    res.status(201).json({
      message: `Liste crée avec succès`,
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `erreur serveur  ` });
  }
};

//Reuperation des listes
const getLists = async (req, res) => {
  const id = req.params.id;
  try {
    const lists = await List.findAll({
      where: { userId: id },
      include: [
        {
          model: Client,
          include: [Img],
        },
      ],
    });

    res.status(200).json({ lists });
  } catch (error) {
    res.status(500).json({ error: "erreur serveur" }, error);
  }
};
const getListsLatest = async (req, res) => {
  const id = req.params.id;
  try {
    const lists = await List.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
      where: { userId: id },

      include: [
        {
          model: Client,
          include: [Img],
        },
      ],
    });

    res.status(200).json({ lists });
  } catch (error) {
    res.status(500).json({ error: "erreur serveur" }, error);
  }
};
// modification de liste
const updateList = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const list = await List.findByPk(id);
  if (list === null) {
    return res.status(400).json({
      message: "impossible de mettre à jour cette liste",
    });
  }
  try {
    await List.update(
      { name },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "info liste mise à jour " });
  } catch (error) {
    console.error("❌ Erreur update liste:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const publishList = async (req, res) => {
  const id = req.params.id;
  const { publish } = req.body;

  const list = await List.findByPk(id);
  if (list === null) {
    return res.status(400).json({
      message: "impossible de mettre à jour cette liste",
    });
  }
  try {
    await List.update(
      { publish },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "info liste mise à jour " });
  } catch (error) {
    console.error("❌ Erreur update liste:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const delivredList = async (req, res) => {
  const id = req.params.id;
  const { delivred } = req.body;

  const list = await List.findByPk(id);
  if (list === null) {
    return res.status(400).json({
      message: "impossible de mettre à jour cette liste",
    });
  }
  try {
    await List.update(
      { delivred },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "info liste mise à jour " });
  } catch (error) {
    console.error("❌ Erreur update liste:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
const archivedList = async (req, res) => {
  const id = req.params.id;
  const { archived } = req.body;

  const list = await List.findByPk(id);
  if (list === null) {
    return res.status(400).json({
      message: "impossible de mettre à jour cette liste",
    });
  }
  try {
    await List.update(
      { archived },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "info liste mise à jour " });
  } catch (error) {
    console.error("❌ Erreur update liste:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Suppression d'un list
const deleteList = async (req, res) => {
  const id = req.params.id;

  const list = await List.findByPk(id);
  if (list === null) {
    return res.status(400).json({
      message: "impossible de mettre à jour cette ",
    });
  }

  try {
    const response = await List.destroy({
      where: {
        id,
      },
      force: true,
    });

    if (!response) {
      res.status(500).json({ erreur: "la suppression à echoué" });
      throw new Error("la suppression à echoué");
    }
    res
      .status(200)
      .json({ message: "la suppression à été effectué avec succès", list });
  } catch (error) {
    console.log("erreur serveur ", error);
    res.status(500).json({ erreur: "la suppression à echoué" });
  }
};

module.exports = {
  createClient,
  createList,
  getClients,
  getLists,
  updateClient,
  deleteClient,
  deleteList,
  getListsLatest,
  updateList,
  publishList,
  delivredList,
  archivedList,
};
