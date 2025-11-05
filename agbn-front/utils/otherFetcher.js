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
    throw new Error(
      errData.error || "Erreur lors de la modification de la liste"
    );
  }
  return await res.json();
};

export const archivedList = async ({ data, id }) => {
  console.log(data, id);

  const res = await fetch(`${apiUrl}/client/archived-list/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
    body: JSON.stringify({ archived: data }),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(
      errData.error || "Erreur lors de la modification de la liste"
    );
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

export const updateClient = async (formData, clientId) => {
  const res = await fetch(`${apiUrl}/client/update-client/${clientId}`, {
    method: "PUT",

    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Erreur lors de la modification");
  }
  return await res.json();
};

export const deleteClient = async (clientId) => {
  const res = await fetch(`${apiUrl}/client/delete-client/${clientId}`, {
    method: "DELETE",

    credentials: "include",
  });

  if (!res.ok) throw new Error("Erreur réseau");

  return res.json();
};
