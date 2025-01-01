import React from "react";
import ProjectCreateForm from "../components/ProjectCreateForm";
import { Toaster } from "react-hot-toast";

const ProjectCreatePage = ({ addNewProjectHandler }) => {
  return (
    <div className="mb-5">
      <h1 className="font-headingText text-2xl">
        Create Your New Project Plan
      </h1>
      <ProjectCreateForm addNewProjectHandler={addNewProjectHandler} />
      <Toaster />
    </div>
  );
};

export default ProjectCreatePage;
