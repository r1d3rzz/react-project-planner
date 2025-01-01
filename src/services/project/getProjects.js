const getProjects = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + "/projects");
  const projects = await res.json();
  return projects;
};

export default getProjects;
