const apiUrl = import.meta.env.VITE_API_URL;

export const createList = async ({ data }) => {
  const name = { ...data };
  const res = await fetch(`${apiUrl}/client/create-list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
    body: JSON.stringify(name),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Erreur lors de la creation de la liste");
  }
  return await res.json();
};

export const updateList = async ({ data, id }) => {
  const res = await fetch(`${apiUrl}/client/update-list/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Erreur lors de la creation de la liste");
  }
  return await res.json();
};

export const getListLatest = async () => {
  const res = await fetch(`${apiUrl}/client/latest-lists`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erreur réseau");

  return res.json();
};

export const getList = async () => {
  const res = await fetch(`${apiUrl}/client/lists`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erreur réseau");

  return res.json();
};

export const deleteList = async (id) => {
  const res = await fetch(`${apiUrl}/client/delete-list/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erreur réseau");

  return res.json();
};

export const createClient = async (formData) => {
  const res = await fetch(`${apiUrl}/client/add-client`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Erreur lors de la creation de la liste");
  }
  return await res.json();
};

export const getClients = async () => {
  const res = await fetch(`${apiUrl}/client/lists`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erreur réseau");

  return res.json();
};
