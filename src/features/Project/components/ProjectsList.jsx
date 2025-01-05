import React, { useEffect, useState } from "react";
import PendingProject from "./PendingProject";
import CompleteProject from "./CompleteProject";
import InProgressProject from "./InProgressProject";
import EmptyTask from "./EmptyTask";
import Sortable from "sortablejs";
import sortableProject from "../../../services/project/sortableProject";

const ProjectsList = ({
  isLoading,
  pendingProjects,
  inProgressProjects,
  completeProjects,
}) => {
  const api = import.meta.env.VITE_API_URL + "/projects";
  const pendingDashboard = document.getElementById("pendingDashboard");
  const inProgressDashboard = document.getElementById("inProgressDashboard");
  const completeDashboard = document.getElementById("completeDashboard");
  if (
    !isLoading &&
    pendingDashboard != null &&
    inProgressDashboard != null &&
    completeDashboard != null
  ) {
    sortableProject(pendingDashboard, "pendingDashboard", "pending", api);
    sortableProject(
      inProgressDashboard,
      "inProgressDashboard",
      "in-progress",
      api
    );
    sortableProject(completeDashboard, "completeDashboard", "complete", api);
  }
  return (
    <div>
      <h1 className="my-2 font-headingText text-xl">Types of Projects</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          <div className="col-span-1">
            <div className="font-headingText mb-3">Pending</div>
            <div className="shadow p-3 bg-yellow-100" id="pendingDashboard">
              {pendingProjects.length > 0 &&
                pendingProjects.map((project) => (
                  <PendingProject key={project.id} project={project} />
                ))}
            </div>
          </div>

          <div className="col-span-1">
            <div className="font-headingText mb-3">In Progress</div>
            <div className="shadow p-3 bg-green-200" id="inProgressDashboard">
              {inProgressProjects.length > 0 &&
                inProgressProjects.map((project) => (
                  <InProgressProject key={project.id} project={project} />
                ))}
            </div>
          </div>

          <div className="col-span-1">
            <div className="font-headingText mb-3">Complete</div>
            <div className="shadow p-3 bg-blue-100" id="completeDashboard">
              {completeProjects.length > 0 &&
                completeProjects.map((project) => (
                  <CompleteProject key={project.id} project={project} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
