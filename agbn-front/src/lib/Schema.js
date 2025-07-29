import * as yup from "yup";

const FILE_SIZE_LIMIT = 6 * 1024 * 1024; // 6MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

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

export const createClientSchema = yup.object({
  name: yup.string().required("Le nom est requis").min(4),
  contact: yup
    .string()
    .required("Le contact est requis")
    .min(8, "le contact doit etre de 8 caractère minimum")
    .matches(/^\+[0-9]+$/, "le numero n'est pas valide "),
  description: yup.string().required("La description est requise").min(6),
  images: yup
    .mixed()
    .required("Au moins une image est requise")
    .test(
      "maxFiles",
      "Maximum 10 fichiers",
      (value) => value && value.length <= 10
    )
    .test(
      "fileSize",
      "Chaque fichier doit faire moins de 6MB",
      (value) =>
        value && Array.from(value).every((file) => file.size < FILE_SIZE_LIMIT)
    )
    .test(
      "fileFormat",
      "Seuls les formats JPEG et PNG sont acceptés",
      (value) =>
        value &&
        Array.from(value).every((file) => SUPPORTED_FORMATS.includes(file.type))
    ),
  keep: yup.boolean().required("keep est soit true ou false"),
});
