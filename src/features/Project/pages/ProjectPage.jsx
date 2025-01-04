import React, { useEffect, useState } from "react";
import ProjectsList from "../components/ProjectsList";
import ProjectCreatePage from "./ProjectCreatePage";
import useSWR, { mutate, useSWRConfig } from "swr";

const ProjectPage = () => {
  const api =
    import.meta.env.VITE_API_URL + "/projects?_sort=serial&_order=ASC";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(api, fetcher);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [inProgressProjects, setInProgressProjects] = useState([]);
  const [completeProjects, setCompleteProjects] = useState([]);
  const { mutate } = useSWRConfig();
  const addNewProjectHandler = () => {
    mutate(api);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setPendingProjects(data.filter((item) => item.status === "pending"));
      setInProgressProjects(
        data.filter((item) => item.status === "in-progress")
      );
      setCompleteProjects(data.filter((item) => item.status === "complete"));
    }
  }, [data, isLoading]);
  if (error) return <div>Error loading projects</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ProjectCreatePage addNewProjectHandler={addNewProjectHandler} />
      <ProjectsList
        isLoading={isLoading}
        pendingProjects={pendingProjects}
        inProgressProjects={inProgressProjects}
        completeProjects={completeProjects}
      />
    </div>
  );
};

export default ProjectPage;
