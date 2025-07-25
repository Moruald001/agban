const apiUrl = import.meta.env.VITE_API_URL;

export const createList = async (data) => {
  console.log(data);
  const res = await fetch(`${apiUrl}/client/create-list`, {
    method: "POST",
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
