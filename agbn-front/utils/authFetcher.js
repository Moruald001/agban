import { apiFetch } from "./superFetcher";

const apiUrl = import.meta.env.VITE_API_URL;

export const doLogin = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Erreur lors de la connexion");
    }
    return await res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Serveur injoignable");
    } else {
      throw new Error(error.message);
    }
  }
};

export const doRegistration = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Erreur lors de l'inscription");
    }
    return await res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Erreur serveur injoignable");
    } else {
      throw new Error(error.message);
    }
  }
};

export const doLogout = async () => {
  const res = await apiFetch(`${apiUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Erreur lors de la déconnexion");
  }
  return await res.json();
};

export const fetchingCeos = async () => {
  const res = await fetch(`${apiUrl}/auth/ceos`);
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Erreur lors de l'inscription");
  }
  return await res.json();
};

export const verificationEmailByUser = async ({ userId, email }) => {
  const res = await fetch(`${apiUrl}/auth/profil/verify/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    credentials: "include",
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(
      errData.message || "Erreur lors de la validation de l'eamil"
    );
  }
};
