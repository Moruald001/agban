# Documentation de l’API – Mini Gestionnaire de Chargement

## Introduction

Cette API permet la gestion d’utilisateurs, de clients avec l'upload d'images, de listes.  
Toutes les routes (sauf authentification) nécessitent un token JWT (`Authorization: Bearer <token>`).

---

## Authentification

### 1. Inscription

- **URL** : `/auth/register`
- **Méthode** : `POST`
- **Body** : `application/json`
  - `name` (string, requis)
  - `email` (string, requis, unique)
  - `password` (string, requis)
- **Réponse** :
  - `201` : Utilisateur créé
  - `400` : Email déjà utilisé ou limite de comptes atteinte

### 2. Connexion

- **URL** : `/auth/login`
- **Méthode** : `POST`
- **Body** : `application/json`
  - `email` (string, requis)
  - `password` (string, requis)
- **Réponse** :
  - `200` : Connexion réussie, retourne un token JWT
  - `400` : Identifiants incorrects
- **Sécurité** :
  - Limitation à 5 tentatives de connexion toutes les 15 minutes par IP

---

## Gestion des clients

### 1. Ajouter un client

- **URL** : `/client/add-client`
- **Méthode** : `POST`
- **Headers** : `Authorization: Bearer <token>`
- **Body** : `multipart/form-data`
  - `name` (string, requis)
  - `contact` (string, requis)
  - `description` (string, requis)
  - `keep` (boolean, requis)
  - `images` (array de fichiers, optionnel, jpeg/png/webp, max 10 fichiers, 5Mo max/fichier)
- **Réponse** :
  - `201` : Client créé
  - `400/404` : Erreur de validation ou client existant

### 2. Mettre à jour un client

- **URL** : `/client/update-client/:id`
- **Méthode** : `PUT`
- **Headers** : `Authorization: Bearer <token>`
- **Body** : `application/json`
  - `name` (string, requis)
  - `contact` (string, requis)
  - `description` (string, requis)
  - `keep` (boolean, requis)
- **Réponse** :
  - `200` : Client mis à jour
  - `400/404` : Erreur de validation ou client introuvable

### 3. Supprimer un client

- **URL** : `/client/delete-client/:id`
- **Méthode** : `DELETE`
- **Headers** : `Authorization: Bearer <token>`
- **Réponse** :
  - `200` : Suppression réussie
  - `400/500` : Client introuvable ou erreur serveur

### 4. Récupérer tous les clients

- **URL** : `/client/clients`
- **Méthode** : `GET`
- **Headers** : `Authorization: Bearer <token>`
- **Réponse** :
  - `200` : Liste des clients (avec images associées)

---

## Gestion des listes

### 1. Créer une liste

- **URL** : `/client/create-list`
- **Méthode** : `POST`
- **Headers** : `Authorization: Bearer <token>`
- **Body** : `application/json`
  - `name` (string, requis)
- **Réponse** :
  - `201` : Liste créée
  - `400/404` : Erreur de validation ou liste existante

### 2. Récupérer toutes les listes

- **URL** : `/client/lists`
- **Méthode** : `GET`
- **Headers** : `Authorization: Bearer <token>`
- **Réponse** :
  - `200` : Liste des listes (avec clients et images associés)

---

## Gestion des images

- **Upload** : via `/client/add-client` (champ `images`)
- **Accès** : `/images/<nom_du_fichier>`
- **Formats acceptés** : jpeg, png, webp (vérification du type MIME et du contenu réel)
- **Taille max** : 5 Mo par fichier, 10 fichiers max

---

## Sécurité et bonnes pratiques

- **Validation** : Toutes les entrées sont validées côté serveur (middleware `validate.js` et schémas Yup)
- **Authentification** : JWT obligatoire pour toutes les routes sauf `/auth/register` et `/auth/login`
- **Rate limiting** : Limitation des tentatives de connexion (voir `middlewares/loginRateLimiter.js`)
- **Headers de sécurité** : Ajoutés avec Helmet
- **Logs** : Toutes les requêtes sont loggées avec Morgan
- **CORS** : Configuré dans `config/corsOption.js` (adapter l’origine en production)
- **Gestion des erreurs** : Centralisée dans le middleware d’erreurs de `server.js`
- **HTTPS** : À activer en production pour sécuriser les échanges

---
