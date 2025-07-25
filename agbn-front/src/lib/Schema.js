import * as yup from "yup";

export const schemaRegister = yup.object().shape({
  name: yup.string().required("le pseudo est requis").min(3),
  email: yup.string().required("L'email  est requis").email("email invalide"),
  password: yup
    .string()
    .required("Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]$/,
      "Le mot de passe doit contenir au moins une lettre, un chiffre, un caractère spécial et avoir 8 caractères minimum"
    ),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Le mot de passe entré ne correspond pas au mot de passe"
    ),
  role: yup.string().required("Veuillez selectionnner votre rôle svp"),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Email invalide")
    .required("Ce champs ne peut etre vide"),
  password: yup.string().required("Veuillez entrer votre mot de passe svp"),
});

export const createListSchema = yup.object().shape({
  name: yup
    .string()
    .required("Veuillez entrer un nom ")
    .matches(
      /^[a-zA-Z0-9\s]+$/,

      " le nom ne peut contenir que des lettres et des chiffres"
    ),
});
