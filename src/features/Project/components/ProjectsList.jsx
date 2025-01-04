import React, { useEffect, useState } from "react";
import PendingProject from "./PendingProject";
import CompleteProject from "./CompleteProject";
import InProgressProject from "./InProgressProject";
import EmptyTask from "./EmptyTask";
import Sortable from "sortablejs";

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
    Sortable.create(pendingDashboard, {
      animation: 150,
      group: "projects",
      draggable: ".project",
      store: {
        set: (sortable) => {
          const order = sortable.toArray();
          localStorage.setItem(
            "pendingProjects",
            JSON.stringify({
              type: "pending",
              order: order.join("|"),
            })
          );
        },
      },
      onSort: function (evt) {
        setTimeout(async () => {
          const orderData = JSON.parse(localStorage.getItem("pendingProjects"));
          const res = await fetch(api);
          if (res.ok) {
            // order => project_id
            if (orderData.type === "pending") {
              orderData.order.split("|").forEach(async (order, index) => {
                await fetch(api + "/" + order, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ serial: index }),
                });
              });
            }
          }
        }, 2000);
      },
    });
    Sortable.create(inProgressDashboard, {
      animation: 150,
      group: "projects",
      draggable: ".project",
    });
    Sortable.create(completeDashboard, {
      animation: 150,
      group: "projects",
      draggable: ".project",
    });
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
              {pendingProjects.length > 0 ? (
                pendingProjects.map((project) => (
                  <PendingProject key={project.id} project={project} />
                ))
              ) : (
                <EmptyTask />
              )}
            </div>
          </div>

          <div className="col-span-1">
            <div className="font-headingText mb-3">In Progress</div>
            <div className="shadow p-3 bg-green-200" id="inProgressDashboard">
              {inProgressProjects.length > 0 ? (
                inProgressProjects.map((project) => (
                  <InProgressProject key={project.id} project={project} />
                ))
              ) : (
                <EmptyTask />
              )}
            </div>
          </div>

          <div className="col-span-1">
            <div className="font-headingText mb-3">Complete</div>
            <div className="shadow p-3 bg-blue-100" id="completeDashboard">
              {completeProjects.length > 0 ? (
                completeProjects.map((project) => (
                  <CompleteProject key={project.id} project={project} />
                ))
              ) : (
                <EmptyTask />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
