import * as yup from "yup";

export const schemaRegister = yup.object().shape({
  pseudo: yup.string().required("le pseudo est requis"),
  email: yup.string().required("L'email  est requis").email("email invalide"),
  password: yup
    .string()
    .required("Le mot de passe est requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])/,
      "Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial"
    ),
  confirmePassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Le mot de passe entré ne correspond pas au mot de passe"
    ),
});

export const schemaLogin = yup.object().shape({
  pseudo: yup.string().required("Ce champs ne peut etre vide"),
  password: yup.string().required("Veuillez entrer votre mot de passe svp"),
});
