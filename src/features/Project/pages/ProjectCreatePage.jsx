import React from "react";
import ProjectCreateForm from "../components/ProjectCreateForm";

const ProjectCreatePage = () => {
  return (
    <div className="mb-5">
      <h1 className="font-headingText text-2xl">
        Create Your New Project Plan
      </h1>
      <ProjectCreateForm />
    </div>
  );
};

export default ProjectCreatePage;
