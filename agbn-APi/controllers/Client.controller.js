const { Client, List, Img } = require("../models");
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
      const images = req.files.map((file) => ({
        img: `/images/${file.filename}`,
        clientId: client.id,
      }));

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

//Reuperation des listes
const getLists = async (req, res) => {
  try {
    const lists = await List.findAll({
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
  try {
    const lists = await List.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
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

// modifier un client(tout sauf les images)
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

// Suppression d'un client
const deleteClient = async (req, res) => {
  const id = req.params.id;

  const client = await Client.findByPk(id);
  if (client === null) {
    res.status(400).json({
      message: "impossible de mettre à jour ce client car il est introuvable",
    });
    throw new Error(
      "impossible de mettre à jour ce client car il est introuvable"
    );
  }

  try {
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
  getListsLatest,
};
