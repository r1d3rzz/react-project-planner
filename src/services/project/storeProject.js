const storeProject = async (data) => {
  const res = await fetch(import.meta.env.VITE_API_URL + "/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};

export default storeProject;
