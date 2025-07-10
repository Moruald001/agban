const yup = require("yup");

const createClientSchema = yup.object({
  name: yup.string().required("Le nom est requis").min(4),
  contact: yup
    .string()
    .required("Le contact est requis")
    .min(8, "le contact doit etre de 8 caractère minimum")
    .matches(/^\+[0-9]+$/, "le numero n'est pas valide "),
  description: yup.string().required("La description est requise").min(6),
  keep: yup.boolean().required("Le mot de passe est requis"),
});

const createListSchema = yup.object({
  name: yup.string().required("Veuillez entrer un nom ").min(4),
});

const updateClientSchema = yup.object({
  contact: yup
    .string()
    .required("Le contact est requis")
    .min(8, "le contact doit etre de 8 caractère minimum")
    .matches(/^\+[0-9]+$/, "le numero n'est pas valide "),
  keep: yup.boolean().required("keep est soit true ou false"),
});

module.exports = { createClientSchema, createListSchema, updateClientSchema };
