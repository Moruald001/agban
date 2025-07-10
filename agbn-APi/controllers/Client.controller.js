const express = require("express");
const { Client, List, Img } = require("../models");

// Creation d'une liste
const createList = async (req, res) => {
  const { name } = req.body;
  const ListExist = await List.findOne({ where: { name } });

  if (ListExist !== null) {
    res.status(404).json({
      message: "Cette liste existe déjà",
    });
    throw new Error("Cette liste existe déjà");
  }

  try {
    const response = await List.create({
      name,
    });

    if (response === undefined) {
      res
        .status(400)
        .json({ message: "erreur lors de la creation de la liste" });
      throw new Error("erreur lors de la creation de la liste");
    }
    console.log("Liste crée avec succès");
    const list = response.toJSON();
    console.log(list);
    res.status(201).json({
      message: `Liste crée avec succès`,
      list,
    });
  } catch (error) {
    res.status(500).json({ message: `erreur serveur ${error} ` });
  }
};

//Ajout d'un client

const createClient = async (req, res) => {
  const { name, contact, description, keep } = req.body;

  // on verifie si le numero ou le nom  existe exist déjà ?
  const clientExist = await Client.findOne({ where: { name } });
  const clientNumberExist = await Client.findOne({ where: { contact } });

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
    });

    if (response === undefined) {
      res.status(400).json({ message: "erreur lors de l'ajout du client" });
      throw new Error("erreur lors de l'ajout du client");
    }

    const client = response.toJSON();

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        name: `/images/${file.filename}`,
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

    res.status(200).json({ "liste ": lists });
  } catch (error) {
    res.status(500).json({ error: "erreur serveur" }, error);
  }
};

// modifier un client(contact et keep)
const updateClient = async (req, res) => {
  const id = req.params.id;
  const { keep, contact } = req.body;

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
    await Client.update(
      { contact, keep },
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

module.exports = {
  createClient,
  createList,
  getClients,
  getLists,
  updateClient,
};
