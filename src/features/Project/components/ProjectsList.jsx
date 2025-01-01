import React, { useEffect, useState } from "react";
import PendingProject from "./PendingProject";
import CompleteProject from "./CompleteProject";
import InProgressProject from "./InProgressProject";
import { ReactSortable } from "react-sortablejs";
import EmptyTask from "./EmptyTask";
import useSWR from "swr";

const ProjectsList = ({
  isLoading,
  pendingProjects,
  inProgressProjects,
  completeProjects,
  setCompleteProjects,
  setInProgressProjects,
  setPendingProjects,
}) => {
  return (
    <div>
      <h1 className="my-2 font-headingText text-xl">Types of Projects</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          <div className="col-span-1">
            <div className="font-headingText mb-3">Pending</div>
            <div className="shadow p-3 bg-yellow-100">
              <ReactSortable
                group="task"
                ghostClass="sortable-ghost"
                chosenClass="sortable-chosen"
                dragClass="sortable-drag"
                list={pendingProjects}
                setList={setPendingProjects}
              >
                {pendingProjects.length > 0 ? (
                  pendingProjects.map((project) => (
                    <PendingProject key={project.id} project={project} />
                  ))
                ) : (
                  <EmptyTask />
                )}
              </ReactSortable>
            </div>
          </div>

          <div className="col-span-1">
            <div className="font-headingText mb-3">In Progress</div>
            <div className="shadow p-3 bg-green-200">
              <ReactSortable
                group="task"
                list={inProgressProjects}
                setList={setInProgressProjects}
              >
                {inProgressProjects.length > 0 ? (
                  inProgressProjects.map((project) => (
                    <InProgressProject key={project.id} project={project} />
                  ))
                ) : (
                  <EmptyTask />
                )}
              </ReactSortable>
            </div>
          </div>

          <div className="col-span-1">
            <div className="font-headingText mb-3">Complete</div>
            <div className="shadow p-3 bg-blue-100">
              <ReactSortable
                group="task"
                list={completeProjects}
                setList={setCompleteProjects}
              >
                {completeProjects.length > 0 ? (
                  completeProjects.map((project) => (
                    <CompleteProject key={project.id} project={project} />
                  ))
                ) : (
                  <EmptyTask />
                )}
              </ReactSortable>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
