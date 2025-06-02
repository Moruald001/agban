import * as yup from "yup";

export const schema = yup.object().shape({
  pseudo: yup.string().required("le pseudo est requis"),
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
