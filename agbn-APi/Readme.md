# Documentation de l’API  du mini gestionnaire chargement

Toutes les routes sont préfixées par `/client` et nécessitent une authentification (`Authorization: Bearer <token>`).

---

## 1. Ajouter un client

- **URL** : `/client/add-client`
- **Méthode** : `POST`
- **Body** : `multipart/form-data`
  - `name` (string, requis)
  - `contact` (string, requis)
  - `description` (string, requis)
  - `keep` (boolean, requis)
  - `images` (array de fichiers, optionnel)
- **Réponse** :
  - `201` : Client créé avec succès
  - `400/404` : Erreur de validation ou client déjà existant

---

## 2. Créer une liste

- **URL** : `/client/create-list`
- **Méthode** : `POST`
- **Body** : `application/json`
  - `name` (string, requis)
- **Réponse** :
  - `201` : Liste créée
  - `400/404` : Erreur de validation ou liste déjà existante

---

## 3. Mettre à jour un client

- **URL** : `/client/update-client/:id`
- **Méthode** : `PUT`
- **Body** : `application/json`
  - `name` (string, requis)
  - `contact` (string, requis)
  - `description` (string, requis)
  - `keep` (boolean, requis)
- **Réponse** :
  - `200` : Client mis à jour
  - `400/404` : Erreur de validation ou client introuvable

---

## 4. Supprimer un client

- **URL** : `/client/delete-client/:id`
- **Méthode** : `DELETE`
- **Réponse** :
  - `200` : Suppression réussie
  - `400/500` : Client introuvable ou erreur serveur

---

## 5. Récupérer tous les clients

- **URL** : `/client/clients`
- **Méthode** : `GET`
- **Réponse** :
  - `200` : Liste des clients

---

## 6. Récupérer toutes les listes

- **URL** : `/client/lists`
- **Méthode** : `GET`
- **Réponse** :
  - `200` : Liste des listes

---

**Remarques :**
- Toutes les routes sont protégées par authentification.
- Les images sont uploadées via le champ `images` (multipart/form-data).
- La validation des données est faite via le middleware `validate`.
- Voir le contrôleur `Client.controller` pour la logique