const yup = require("yup");

const roles = ["ceo", "collaborateur"];

const createClientSchema = yup.object({
  name: yup.string().required("Le nom est requis").min(4),
  contact: yup
    .string()
    .required("Le contact est requis")
    .min(8, "le contact doit etre de 8 caractère minimum")
    .matches(/^\+[0-9]+(\/\+[0-9]+)*$/, "le numero n'est pas valide "),
  description: yup.string().required("La description est requise").min(6),
  keep: yup.boolean().required("keep est soit true ou false"),
  listId: yup.number().required("list id invalide"),
});

const createListSchema = yup.object({
  name: yup.string().required("Veuillez entrer un nom ").min(4),
});

const registerUserSchema = yup.object({
  name: yup.string().required("Le nom est requis").min(4),
  email: yup.string().required("L'email  est requis").email("email invalide"),
  role: yup.string().oneOf(roles, "Role invalide").required("Role invalide"),
  password: yup
    .string()
    .required("Le mot de passe est requis est requis")
    .min(6)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])/,
      "Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial"
    ),
});

const loginSchema = yup.object({
  email: yup.string().required("L'email  est requis").email("email invalide"),
  password: yup.string().required("Le mot de passe est requis est requis"),
});

module.exports = {
  createClientSchema,
  createListSchema,
  registerUserSchema,
  loginSchema,
};
