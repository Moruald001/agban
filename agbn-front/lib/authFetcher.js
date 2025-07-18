const apiUrl = import.meta.env.VITE_API_URL;

export const doLogin = async (data) => {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Erreur de connexion");
  }
};

export const doLogout = async () => {
  const res = await fetch(`${apiUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Erreur de connexion");
  }
};
