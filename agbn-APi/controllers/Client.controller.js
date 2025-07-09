const express = require("express");
const { Client, List } = require("../models");

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
    console.log("client ajouté avec succès");
    const client = response.toJSON();
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
      attributes: ["name", "contact", "description", "keep"],
    });
    res.status(200).json({ "liste des clients": clientsList });
  } catch (error) {
    res.status(500).json({ error: "erreur serveur" }, error);
  }
};

module.exports = { createClient, createList, getClients };
