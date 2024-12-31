import React from "react";
import ProjectsList from "../components/ProjectsList";
import ProjectCreatePage from "./ProjectCreatePage";

const ProjectPage = () => {
  return (
    <div>
      <ProjectCreatePage />
      <ProjectsList />
    </div>
  );
};

export default ProjectPage;
